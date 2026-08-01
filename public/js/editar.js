console.log("editar.js cargado");

document.addEventListener('DOMContentLoaded', () => {
    // 1. Cargar y aplicar Modo Oscuro
    const temaGuardado = localStorage.getItem('temaApp') || 'claro';
    if (temaGuardado === 'oscuro') {
        document.body.classList.add('dark-mode');
    } else {
        document.body.classList.remove('dark-mode');
    }

    // 2. Cargar Idioma y aplicar traducciones
    const idiomaGuardado = localStorage.getItem('idioma') || 'es';
    const lang = (idiomaGuardado === 'English' || idiomaGuardado === 'en') ? 'en' : 'es';

    // Traduce etiquetas, botones y títulos
    document.querySelectorAll('[data-es]').forEach(elem => {
        if (elem.dataset[lang]) {
            elem.textContent = elem.dataset[lang];
        }
    });

    // Traduce los placeholders de los correos si cambia a inglés
    const correo1 = document.getElementById("correo1");
    const correo2 = document.getElementById("correo2");
    if (correo1 && correo2) {
        const placeholderEmail = (lang === 'en') ? "email@example.com" : "correo@ejemplo.com";
        correo1.placeholder = placeholderEmail;
        correo2.placeholder = placeholderEmail;
    }

    // 3. Cargar datos desde localStorage en los campos
    if (document.getElementById("nombre1")) document.getElementById("nombre1").value = localStorage.getItem("nombre1") || "";
    if (document.getElementById("parentesco1")) document.getElementById("parentesco1").value = localStorage.getItem("parentesco1") || "";
    if (document.getElementById("telefono1")) document.getElementById("telefono1").value = localStorage.getItem("telefono1") || "";
    if (document.getElementById("correo1")) document.getElementById("correo1").value = localStorage.getItem("correo1") || "";

    if (document.getElementById("nombre2")) document.getElementById("nombre2").value = localStorage.getItem("nombre2") || "";
    if (document.getElementById("parentesco2")) document.getElementById("parentesco2").value = localStorage.getItem("parentesco2") || "";
    if (document.getElementById("telefono2")) document.getElementById("telefono2").value = localStorage.getItem("telefono2") || "";
    if (document.getElementById("correo2")) document.getElementById("correo2").value = localStorage.getItem("correo2") || "";

    // 4. Guardar datos al presionar el botón
    const btnGuardar = document.getElementById("guardar");
    if (btnGuardar) {
        btnGuardar.addEventListener("click", function () {
            const telefono1 = document.getElementById("telefono1").value;
            const telefono2 = document.getElementById("telefono2").value;

            // Validación de los 8 dígitos
            if (!/^\d{8}$/.test(telefono1) || !/^\d{8}$/.test(telefono2)) {
                const msgError = (lang === 'en') 
                    ? "Phone numbers must be exactly 8 digits." 
                    : "Los teléfonos deben tener exactamente 8 números.";
                alert(msgError);
                return;
            }

            // Guardar en localStorage
            localStorage.setItem("nombre1", document.getElementById("nombre1").value);
            localStorage.setItem("parentesco1", document.getElementById("parentesco1").value);
            localStorage.setItem("telefono1", telefono1);
            localStorage.setItem("correo1", document.getElementById("correo1").value);

            localStorage.setItem("nombre2", document.getElementById("nombre2").value);
            localStorage.setItem("parentesco2", document.getElementById("parentesco2").value);
            localStorage.setItem("telefono2", telefono2);
            localStorage.setItem("correo2", document.getElementById("correo2").value);

            // Mensaje de confirmación traducido
            const msgExito = (lang === 'en') 
                ? "Contacts saved successfully." 
                : "Contactos guardados correctamente.";
            alert(msgExito);

            // Volver a SOS
            window.location.href = "sos.html"; 
        });
    }
});