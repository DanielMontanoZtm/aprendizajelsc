
    function togglePassword() {
        const password = document.getElementById("password");
        const icon = document.getElementById("eye-icon");

        if (password.type === "password") {
            password.type = "text";
            icon.classList.remove("fa-eye");
            icon.classList.add("fa-eye-slash");
        } else {
            password.type = "password";
            icon.classList.remove("fa-eye-slash");
            icon.classList.add("fa-eye");
        }
    }

    // Validar login
    document.getElementById("login-button").addEventListener("click", function () {
        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value.trim();

        if (email === "est.danielf.lopez@unimilitar.edu.co" && password === "12345678") {
            window.location.href = "Iniciogeneral.html";
        } else {
            alert("Correo o contraseña incorrectos.");
        }
    });

