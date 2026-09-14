document.addEventListener("DOMContentLoaded", () => {

    let tipoSeleccionado = null;
    let mapa = null;
    let marcador = null;
    let stream = null;

    const botonesTipo = document.querySelectorAll(".tipo-btn");
    const latitudInput = document.getElementById("latitud");
    const longitudInput = document.getElementById("longitud");
    const descripcion = document.getElementById("descripcion");
    const contador = document.getElementById("contador");

    const video = document.getElementById("video");
    const canvas = document.getElementById("canvas");
    const foto = document.getElementById("foto");

    const botonCapturar = document.getElementById("capturar");
    const botonApagar = document.getElementById("apagar");
    const botonEnviar = document.getElementById("btnEnviar");

    const mensaje = document.getElementById("mensajeReporte");



    function seleccionarTipo() {

        botonesTipo.forEach(boton => {

            boton.addEventListener("click", () => {

                botonesTipo.forEach(btn => {
                    btn.classList.remove("activo");``
                });

                boton.classList.add("activo");

                tipoSeleccionado = boton.dataset.id;
            });

        });
    }



    function contadorDescripcion() {

        descripcion.addEventListener("input", () => {

            contador.textContent = descripcion.value.length;

        });
    }


    function iniciarMapa() {

        mapa = L.map("mapaIncidente").setView([13.6929, -89.2182], 13);

        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
            maxZoom: 19,
            attribution: "&copy; OpenStreetMap"
        }).addTo(mapa);


        mapa.on("click", function (evento) {

            const lat = evento.latlng.lat;
            const lng = evento.latlng.lng;

            latitudInput.value = lat;
            longitudInput.value = lng;

            if (marcador) {
                mapa.removeLayer(marcador);
            }

            marcador = L.marker([lat, lng])
                .addTo(mapa)
                .bindPopup("Ubicación del incidente")
                .openPopup();

        });
    }



    async function activarCamara() {

        try {

            stream = await navigator.mediaDevices.getUserMedia({
                video: true,
                audio: false
            });

            video.srcObject = stream;

        } catch (error) {

            mostrarMensaje(
                "No se pudo acceder a la cámara.",
                "danger"
            );

            console.error(error);
        }
    }


    function capturarFoto() {

        if (!stream) {

            mostrarMensaje(
                "Primero debes activar la cámara.",
                "warning"
            );

            return;
        }

        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;

        const contexto = canvas.getContext("2d");

        contexto.drawImage(
            video,
            0,
            0,
            canvas.width,
            canvas.height
        );

        foto.src = canvas.toDataURL("image/jpeg", 0.8);

        foto.style.display = "block";

        mostrarMensaje(
            "Fotografía tomada correctamente.",
            "success"
        );
    }



    function apagarCamara() {

        if (stream) {

            stream.getTracks().forEach(track => {
                track.stop();
            });

            stream = null;
            video.srcObject = null;

            mostrarMensaje(
                "Cámara desactivada.",
                "success"
            );
        }
    }



    function mostrarMensaje(texto, tipo) {

        mensaje.innerHTML = `
            <div class="alert alert-${tipo}" role="alert">
                ${texto}
            </div>
        `;
    }


    async function enviarReporte() {

        try {

            mensaje.innerHTML = "";


            if (!tipoSeleccionado) {

                mostrarMensaje(
                    "Debes seleccionar un tipo de incidente.",
                    "warning"
                );

                return;
            }


            const textoDescripcion = descripcion.value.trim();

            if (textoDescripcion === "") {

                mostrarMensaje(
                    "Debes escribir una descripción.",
                    "warning"
                );

                descripcion.focus();

                return;
            }

            if (
                latitudInput.value === "" ||
                longitudInput.value === ""
            ) {

                mostrarMensaje(
                    "Debes seleccionar la ubicación del incidente en el mapa.",
                    "warning"
                );

                return;
            }

            const datos = {

                id_tipo_riesgo: tipoSeleccionado,

                descripcion: textoDescripcion,

                latitud: latitudInput.value,

                longitud: longitudInput.value,

                imagen: foto.src || null
            };


            botonEnviar.disabled = true;

            botonEnviar.textContent = "Enviando...";

            const respuesta = await fetch("reportes/create.php", {

                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify(datos)

            });


            if (!respuesta.ok) {

                throw new Error(
                    "El servidor respondió con un error."
                );
            }


            const resultado = await respuesta.json();


            if (resultado.success) {

                mostrarMensaje(
                    resultado.message,
                    "success"
                );

                limpiarFormulario();

            } else {

                mostrarMensaje(
                    resultado.message,
                    "danger"
                );
            }


        } catch (error) {

            console.log(error);

            mostrarMensaje(
                "No se pudo enviar el reporte. Intenta nuevamente.",
                "danger"
            );

        } finally {

            botonEnviar.disabled = false;

            botonEnviar.textContent = "Enviar Reporte";
        }
    }


    function limpiarFormulario() {

        tipoSeleccionado = null;

        botonesTipo.forEach(boton => {
            boton.classList.remove("seleccionado");
        });

        descripcion.value = "";

        contador.textContent = "0";

        latitudInput.value = "";
        longitudInput.value = "";

        if (marcador) {

            mapa.removeLayer(marcador);

            marcador = null;
        }

        foto.src = "";
        foto.style.display = "none";
    }

    seleccionarTipo();

    contadorDescripcion();

    iniciarMapa();

    activarCamara();

    botonCapturar.addEventListener(
        "click",
        capturarFoto
    );

    botonApagar.addEventListener(
        "click",
        apagarCamara
    );

    botonEnviar.addEventListener(
        "click",
        enviarReporte
    );

});
