
document.addEventListener('DOMContentLoaded', function() {
// Variables
const levels = document.querySelectorAll('.level');
const progressBar = document.getElementById('progressBar');
const closeBtn = document.querySelector('.close-btn');
const skipBtns = document.querySelectorAll('.skip-btn');
const checkBtns = document.querySelectorAll('.check-btn');
const options = document.querySelectorAll('.option');
const resultModal = document.getElementById('resultModal');
const modalTitle = document.getElementById('modalTitle');
const modalMessage = document.getElementById('modalMessage');
const modalBtn = document.getElementById('modalBtn');

let currentLevel = 0;
let totalLevels = levels.length;
let selectedOption = null;
let isCorrect = false;
let reorderSelection = [];


// Inicializar
updateProgressBar();

// Event listeners
const confirmExitModal = document.getElementById('confirmExitModal');
const confirmExitBtn = document.getElementById('confirmExitBtn');
const cancelExitBtn = document.getElementById('cancelExitBtn');

closeBtn.addEventListener('click', function() {
  confirmExitModal.style.display = 'flex';
});

confirmExitBtn.addEventListener('click', function() {
  window.location.href = 'Lecciones.html'; // o la ruta que corresponda
});

cancelExitBtn.addEventListener('click', function() {
  confirmExitModal.style.display = 'none';
});

// Asignar eventos a los botones de saltar
skipBtns.forEach(btn => {
btn.addEventListener('click', skipLevel);
});

// Asignar eventos a los botones de revisar
checkBtns.forEach(btn => {
btn.addEventListener('click', function() {
// Comportamiento especial para el nivel 1 (explicación)
if(currentLevel === 0) {
nextLevel();
} else {
checkAnswer();
}
});
});

options.forEach(option => {
    option.addEventListener('click', function() {
      // Si estamos en el nivel 5 (ordenar señas)
      if (levels[currentLevel].getAttribute('data-level') === '5') {
        const letter = option.getAttribute('data-letter');
  
        if (!option.classList.contains('selected')) {
          option.classList.add('selected');
          option.style.border = '3px solid #007bff'; // Azul para mostrar selección
          reorderSelection.push(letter);
        } else {
          option.classList.remove('selected');
          option.style.border = 'none';
          reorderSelection = reorderSelection.filter(l => l !== letter);
        }
      } else {
        // Lógica general para otros niveles
        options.forEach(opt => opt.style.backgroundColor = '#f5f5f5');
        this.style.backgroundColor = '#d4edda';
        selectedOption = this;
      }
    });
  });
  

// Evento para el botón del modal
modalBtn.addEventListener('click', function() {
resultModal.style.display = 'none';
if(isCorrect) {
nextLevel();
}
});

// Funciones
function updateProgressBar() {
const progress = (currentLevel / totalLevels) * 100;
progressBar.style.width = `${progress}%`;
}

function skipLevel() {
if(currentLevel < totalLevels - 1) {
levels[currentLevel].classList.remove('active');
currentLevel++;
levels[currentLevel].classList.add('active');
updateProgressBar();
} else {
showCompletion();
}
}

function checkAnswer() {
    // Evaluar nivel 5 (ordenar señas)
    if (levels[currentLevel].getAttribute('data-level') === '5') {
      const correctOrder = ['S', 'O', 'L'];
      
      // Validar que se seleccionaron al menos 3 letras
      if (reorderSelection.length !== correctOrder.length) {
        alert('Por favor selecciona todas las letras en el orden correcto.');
        return;
      }
  
      isCorrect = JSON.stringify(reorderSelection) === JSON.stringify(correctOrder);
  
    } else {
      // Validación general
      if (!selectedOption && currentLevel !== 0) {
        showWarningModal();

        return;
      }
  
      isCorrect = selectedOption ? selectedOption.getAttribute('data-correct') === 'true' : true;
    }
  
    // Mostrar resultado
    if (isCorrect) {
      modalTitle.textContent = '¡Correcto!';
      modalTitle.className = 'modal-title correct';
      modalMessage.textContent = '¡Buen trabajo! Avanzando al siguiente nivel.';
      resultModal.style.display = 'flex';
    } else {
      modalTitle.textContent = 'Incorrecto';
      modalTitle.className = 'modal-title incorrect';
      modalMessage.textContent = 'Inténtalo de nuevo. ¡Tú puedes!';
      resultModal.style.display = 'flex';
    }
  }
  

function nextLevel() {
    if (currentLevel < totalLevels - 1) {
      // Ocultar el nivel actual
      levels[currentLevel].classList.remove('active');
      
      // Avanzar al siguiente nivel
      currentLevel++;
      levels[currentLevel].classList.add('active');
      
      // Actualizar barra de progreso
      updateProgressBar();
  
      // Resetear selección estándar
      selectedOption = null;
      if (options.length > 0) {
        options.forEach(opt => opt.style.backgroundColor = '#f5f5f5');
      }
  
      // Resetear selección por orden (específico para nivel 5)
      reorderSelection = [];
      document.querySelectorAll('.option.selected').forEach(opt => {
        opt.classList.remove('selected');
        opt.style.border = 'none';
      });
  
    } else {
      showCompletion();
    }
  }
  

  function showCompletion() {
    modalTitle.textContent = '¡Lección completada!';
    modalTitle.className = 'modal-title correct';
    modalMessage.textContent = 'Felicidades, has completado esta lección.';
    modalBtn.textContent = 'Finalizar';
    resultModal.style.display = 'flex';
  
    // Cargar confetti
    tsParticles.load({
      id: "tsparticles",
      options: {
        fullScreen: { zIndex: 999 },
        emitters: {
          position: { x: 50, y: 100 },
          rate: {
            quantity: 5,
            delay: 0.15
          }
        },
        particles: {
          color: {
            value: ["#1E00FF", "#FF0061", "#E1FF00", "#00FF9E"]
          },
          move: {
            decay: 0.05,
            direction: "top",
            enable: true,
            gravity: { enable: true },
            outModes: {
              top: "none",
              default: "destroy"
            },
            speed: { min: 50, max: 100 }
          },
          number: { value: 0 },
          opacity: { value: 1 },
          rotate: {
            value: { min: 0, max: 360 },
            direction: "random",
            animation: { enable: true, speed: 30 }
          },
          tilt: {
            direction: "random",
            enable: true,
            value: { min: 0, max: 360 },
            animation: { enable: true, speed: 30 }
          },
          size: {
            value: 3,
            animation: {
              enable: true,
              startValue: "min",
              count: 1,
              speed: 16,
              sync: true
            }
          },
          roll: {
            darken: { enable: true, value: 25 },
            enlighten: { enable: true, value: 25 },
            enable: true,
            speed: { min: 5, max: 15 }
          },
          wobble: {
            distance: 30,
            enable: true,
            speed: { min: -7, max: 7 }
          },
          shape: {
            type: ["circle", "square"]
          }
        },
        responsive: [
          {
            maxWidth: 1024,
            options: {
              particles: {
                move: {
                  speed: { min: 33, max: 66 }
                }
              }
            }
          }
        ]
      }
    });
  
    // Eliminar partículas después de 5 segundos (opcional)
    setTimeout(() => {
      tsParticles.domItem(0)?.destroy();
    }, 5000);
  
    // Botón para finalizar: redirige y destruye partículas
    modalBtn.addEventListener('click', function () {
      tsParticles.domItem(0)?.destroy(); // Limpieza extra por si no se hizo aún
      window.location.href = 'Lecciones.html';
    }, { once: true });
  }
  
});

function showWarningModal() {
  document.getElementById('warningModal').style.display = 'flex';
}

function closeWarningModal() {
  document.getElementById('warningModal').style.display = 'none';
}

const video = document.getElementById('webcam');

navigator.mediaDevices.getUserMedia({ video: true })
  .then((stream) => {
    video.srcObject = stream;
  })
  .catch((err) => {
    console.error("Error accediendo a la cámara:", err);
  });

  // Función para inicializar una webcam específica
function initWebcam(videoElement) {
  navigator.mediaDevices.getUserMedia({ video: true })
    .then((stream) => {
      videoElement.srcObject = stream;
    })
    .catch((err) => {
      console.error("Error accediendo a la cámara:", err);
    });
}

// Inicializar todas las webcams cuando la página cargue
document.addEventListener('DOMContentLoaded', function() {
  // Obtener todos los elementos de video de webcam
  const webcams = document.querySelectorAll('.webcam-panel video');
  
  // Inicializar cada una
  webcams.forEach(webcam => {
    initWebcam(webcam);
  });
});
  
