console.log("🔥 SOS.JS CARGADO CORRECTAMENTE");

function aplicarIdiomaYTraduccion() {
    // 1. Cargar Tema (Claro / Oscuro)
    const temaGuardado = localStorage.getItem('temaApp') || localStorage.getItem('tema') || 'claro';
    if (temaGuardado === 'oscuro' || temaGuardado === 'dark') {
        document.body.classList.add('dark-mode');
    } else {
        document.body.classList.remove('dark-mode');
    }

    // 2. Buscar idioma en TODAS las posibles claves de localStorage
    const valorIdioma = (
        localStorage.getItem('idioma') ||
        localStorage.getItem('lang') ||
        localStorage.getItem('language') ||
        localStorage.getItem('idiomaApp') ||
        'es'
    ).toString().toLowerCase().trim();

    console.log("🌐 Valor de idioma hallado en memoria:", valorIdioma);

    // Evalúa cualquier variante común de inglés ('en', 'english', 'ingles', 'inglés', '2')
    const esIngles = (
        valorIdioma.includes('en') ||
        valorIdioma.includes('ing') ||
        valorIdioma === 'english' ||
        valorIdioma === '2'
    );

    console.log("🇺🇸 ¿Aplicar idioma Inglés?:", esIngles);

    // 3. Traducir todos los elementos con data-es y data-en
    const elementosTraduccion = document.querySelectorAll('[data-es][data-en]');
    elementosTraduccion.forEach(el => {
        const textoTraducido = esIngles ? el.getAttribute('data-en') : el.getAttribute('data-es');
        if (textoTraducido) {
            el.textContent = textoTraducido;
        }
    });

    // 4. Contactos de emergencia
    const nombre1 = document.getElementById("nombre1");
    if (nombre1) nombre1.textContent = localStorage.getItem("nombre1") || "Juan";

    const parentesco1 = document.getElementById("parentesco1");
    if (parentesco1) {
        const p1Guardado = localStorage.getItem("parentesco1");
        if (p1Guardado && p1Guardado !== "Papá" && p1Guardado !== "Dad") {
            parentesco1.textContent = p1Guardado;
        } else {
            parentesco1.textContent = esIngles ? "Dad" : "Papá";
        }
    }

    const telefono1 = document.getElementById("telefono1");
    if (telefono1) telefono1.textContent = localStorage.getItem("telefono1") || "+503 7777-1111";

    const correo1 = document.getElementById("correo1");
    if (correo1) correo1.textContent = localStorage.getItem("correo1") || "juan@gmail.com";

    const nombre2 = document.getElementById("nombre2");
    if (nombre2) nombre2.textContent = localStorage.getItem("nombre2") || "Ana";

    const parentesco2 = document.getElementById("parentesco2");
    if (parentesco2) {
        const p2Guardado = localStorage.getItem("parentesco2");
        if (p2Guardado && p2Guardado !== "Mamá" && p2Guardado !== "Mom") {
            parentesco2.textContent = p2Guardado;
        } else {
            parentesco2.textContent = esIngles ? "Mom" : "Mamá";
        }
    }

    const telefono2 = document.getElementById("telefono2");
    if (telefono2) telefono2.textContent = localStorage.getItem("telefono2") || "+503 7777-2222";

    const correo2 = document.getElementById("correo2");
    if (correo2) correo2.textContent = localStorage.getItem("correo2") || "ana@gmail.com";

    // 5. Mapa (Leaflet)
    try {
        if (typeof L !== 'undefined' && document.getElementById('map')) {
            var map = L.map('map').setView([13.6929, -89.2182], 14);

            L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
                maxZoom: 19
            }).addTo(map);

            var circulo = L.circle([0, 0], {
                radius: 40,
                color: "blue",
                fillColor: "blue",
                fillOpacity: 0.4
            }).addTo(map);

            var marcador = L.marker([0, 0]).addTo(map);
        }
    } catch (err) {
        console.warn("Aviso sobre el mapa:", err);
    }

    // 6. Enviar SOS
    const btnSOS = document.getElementById("btnSOS");
    if (!btnSOS) return;

    btnSOS.addEventListener("click", function () {
        if (!navigator.geolocation) {
            alert(esIngles ? "⚠️ Your browser does not support geolocation." : "⚠️ Tu navegador no soporta geolocalización.");
            return;
        }

        const correo1Val = localStorage.getItem("correo1") || "";
        const correo2Val = localStorage.getItem("correo2") || "";

        if (!correo1Val && !correo2Val) {
            alert(
                esIngles
                    ? "⚠️ You don't have any emergency contacts configured."
                    : "⚠️ No tienes ningún correo de emergencia configurado."
            );
            return;
        }

        btnSOS.disabled = true;
        btnSOS.querySelector("h1").textContent = esIngles ? "Sending..." : "Enviando...";

        navigator.geolocation.getCurrentPosition(
            function (pos) {
                const lat = pos.coords.latitude;
                const lng = pos.coords.longitude;

                fetch("../sos/enviar_sos.php", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    credentials: "include",
                    body: JSON.stringify({
                        latitud: lat,
                        longitud: lng,
                        mensaje: "Necesito ayuda",
                        correo1: correo1Val,
                        correo2: correo2Val
                    })
                })
                .then(async response => {
                    const texto = await response.text();
                    try { return JSON.parse(texto); } catch (e) { throw new Error(texto); }
                })
                .then(data => {
                    if (data.success) {
                        alert((esIngles ? "Alert sent successfully.\n\nLocation:\n" : "La alerta fue enviada a tus contactos de emergencia.\n\nUbicación:\n") + lat + ", " + lng);
                    } else {
                        alert("ERROR PHPMailer:\n\n" + data.error_correo);
                    }
                })
                .catch(error => {
                    alert((esIngles ? "⚠️ An error occurred while sending the SOS alert.\n\n" : "⚠️ Ocurrió un error al enviar la alerta SOS.\n\n") + error.message);
                })
                .finally(() => {
                    btnSOS.disabled = false;
                    btnSOS.querySelector("h1").textContent = "SOS";
                });
            },
            function (error) {
                alert((esIngles ? "⚠️ Could not get location.\n\nError: " : "⚠️ No se pudo obtener la ubicación.\n\nError: ") + error.message);
                btnSOS.disabled = false;
                btnSOS.querySelector("h1").textContent = "SOS";
            },
            { enableHighAccuracy: true, timeout: 15000, maximumAge: 0 }
        );
    });
}

// Ejecución garantizada
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', aplicarIdiomaYTraduccion);
} else {
    aplicarIdiomaYTraduccion();
}