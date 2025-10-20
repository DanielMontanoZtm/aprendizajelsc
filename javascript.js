document.addEventListener('DOMContentLoaded', function() {

});

document.addEventListener('DOMContentLoaded', function() {
    // ===== BLOQUE 1: Lógica del menú activo =====
    (function initMenu() {
        const currentPage = location.pathname.split('/').pop();
        document.querySelectorAll('.menu-item').forEach(item => {
            if (item.getAttribute('href') === currentPage) {
                item.classList.add('active');
                const img = item.querySelector('img');
                if (img) img.src = img.src.replace('_blanco.png', '_negro.png');
            }
        });
    })();

    // ===== BLOQUE 2: Lógica del acordeón FAQ =====
    (function initFAQ() {
        const faqQuestions = document.querySelectorAll('.faq-question');
        if (faqQuestions.length === 0) return;

        faqQuestions.forEach(question => {
            question.addEventListener('click', () => {
                const item = question.parentElement;
                item.classList.toggle('open');
                
                // Animación opcional
                const answer = item.querySelector('.faq-answer');
                if (answer) {
                    answer.style.maxHeight = item.classList.contains('open') 
                        ? answer.scrollHeight + 'px' 
                        : '0';
                }
            });
        });
    })();

    // ===== BLOQUE 3: Lógica del flipbook =====
    (function initFlipbook() {
        if (!document.querySelector('#book')) return;

        const prevBtn = document.querySelector('#prev-btn');
        const nextBtn = document.querySelector('#next-btn');
        const book = document.querySelector('#book');
        const paper1 = document.querySelector('#p1');
        const paper2 = document.querySelector('#p2');
        const paper3 = document.querySelector('#p3');

        if (!prevBtn || !nextBtn || !book || !paper1 || !paper2 || !paper3) return;

        let currentState = 1;
        const numOfPapers = 3;
        const maxState = numOfPapers + 1;

        prevBtn.addEventListener("click", goPrevious);
        nextBtn.addEventListener("click", goNext);

        function openBook() {
            book.style.transform = "translateX(50%)";
            prevBtn.style.transform = "translateX(-180px)";
            nextBtn.style.transform = "translateX(180px)";
        }

        function closeBook(isFirstPage) {
            book.style.transform = isFirstPage ? "translateX(0%)" : "translateX(100%)";
            prevBtn.style.transform = "translateX(0px)";
            nextBtn.style.transform = "translateX(0px)";
        }

        function goNext() {
            if (currentState >= maxState) return;
            
            switch(currentState) {
                case 1:
                    openBook();
                    paper1.classList.add("flipped");
                    paper1.style.zIndex = 1;
                    break;
                case 2:
                    paper2.classList.add("flipped");
                    paper2.style.zIndex = 2;
                    break;
                case 3:
                    closeBook(false);
                    paper3.classList.add("flipped");
                    paper3.style.zIndex = 3;
                    break;
            }
            currentState++;
        }

        function goPrevious() {
            if (currentState <= 1) return;
            
            switch(currentState) {
                case 2:
                    closeBook(true);
                    paper1.classList.remove("flipped");
                    paper1.style.zIndex = 3;
                    break;
                case 3:
                    paper2.classList.remove("flipped");
                    paper2.style.zIndex = 2;
                    break;
                case 4: 
                    openBook();
                    paper3.classList.remove("flipped");
                    paper3.style.zIndex = 1;
                    break;
            }
            currentState--;
        }
    })();
});


document.addEventListener('DOMContentLoaded', function() {
    const videoWrapper = document.getElementById('video-wrapper');
    const dynamicVideo = document.getElementById('dynamic-video');
    const closeBtn = document.getElementById('close-video');
    const videoPlaceholder = document.getElementById('video-placeholder');

    // Mapeo de letras a videos 
    const letterVideos = {
        'A': 'Imagenes/glosario/abecedario_videos/a.mp4',
        'B': 'Imagenes/glosario/abecedario_videos/b.mp4',
        'C': 'Imagenes/glosario/abecedario_videos/c.mp4',
        'D': 'Imagenes/glosario/abecedario_videos/d.mp4',
        'E': 'Imagenes/glosario/abecedario_videos/e.mp4',
        'F': 'Imagenes/glosario/abecedario_videos/f.mp4',
        'G': 'Imagenes/glosario/abecedario_videos/g.mp4',
        'H': 'Imagenes/glosario/abecedario_videos/h.mp4',
        'I': 'Imagenes/glosario/abecedario_videos/i.mp4',
        'J': 'Imagenes/glosario/abecedario_videos/j.mp4',
        'K': 'Imagenes/glosario/abecedario_videos/k.mp4',
        'L': 'Imagenes/glosario/abecedario_videos/l.mp4',
        'M': 'Imagenes/glosario/abecedario_videos/m.mp4',
        'N': 'Imagenes/glosario/abecedario_videos/n.mp4',
        'NIE': 'Imagenes/glosario/abecedario_videos/nie.mp4',
        'O': 'Imagenes/glosario/abecedario_videos/o.mp4',
        'P': 'Imagenes/glosario/abecedario_videos/p.mp4',
        'Q': 'Imagenes/glosario/abecedario_videos/q.mp4',
        'R': 'Imagenes/glosario/abecedario_videos/r.mp4',
        'S': 'Imagenes/glosario/abecedario_videos/s.mp4',
        'T': 'Imagenes/glosario/abecedario_videos/t.mp4',
        'U': 'Imagenes/glosario/abecedario_videos/u.mp4',
        'V': 'Imagenes/glosario/abecedario_videos/v.mp4',
        'W': 'Imagenes/glosario/abecedario_videos/w.mp4',
        'X': 'Imagenes/glosario/abecedario_videos/x.mp4',
        'Y': 'Imagenes/glosario/abecedario_videos/y.mp4',
        'Z': 'Imagenes/glosario/abecedario_videos/z.mp4'
    };

    // Click en letras
    document.querySelectorAll('.letter-item').forEach(item => {
        item.addEventListener('click', function() {
            const letter = this.getAttribute('data-letter');
            const videoPath = letterVideos[letter];
            
            if (videoPath) {
                videoPlaceholder.style.display = 'none';
                videoWrapper.style.display = 'block';
                dynamicVideo.src = videoPath;
                dynamicVideo.play();
            }
        });
    });

    // Botón cerrar
    closeBtn.addEventListener('click', function() {
        videoWrapper.style.display = 'none';
        videoPlaceholder.style.display = 'block';
        dynamicVideo.pause();
        dynamicVideo.currentTime = 0;
    });
});
document.addEventListener('DOMContentLoaded', function() {
    // Configuración para números
    const numVideoWrapper = document.getElementById('video-wrapper2');
    const numVideo = document.getElementById('dynamic-video2');
    const numCloseBtn = document.getElementById('close-video2');
    const numPlaceholder = document.getElementById('video-placeholder2');

    // Función de cierre infalible
    function cerrarVideoNumeros() {
        numVideo.pause();
        numVideo.currentTime = 0;
        numVideoWrapper.style.display = 'none';
        numPlaceholder.style.display = 'block';
    }

    // Asignación de eventos robusta
    numCloseBtn.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        cerrarVideoNumeros();
    });

    // Controlador para números
    document.querySelectorAll('.letter-item2').forEach(item => {
        item.addEventListener('click', function() {
            const numero = this.getAttribute('data-letter');
            numVideo.src = `Imagenes/glosario/numeros_videos/${numero}.mp4`;
            
            numPlaceholder.style.display = 'none';
            numVideoWrapper.style.display = 'block';
            
            // Precarga y reproducción
            numVideo.load();
            numVideo.play().catch(e => console.log("Error al reproducir:", e));
        });
    });

    // Debugging
    console.log("Configuración números lista:", {
        video: numVideo,
        botonCerrar: numCloseBtn,
        funciona: true
    });
});

