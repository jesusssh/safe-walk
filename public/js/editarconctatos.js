document.addEventListener('DOMContentLoaded', () => {

    const parametros = new URLSearchParams(window.location.search);

    const contacto = parametros.get('contacto');

    if (contacto === 'mama') {

        document.getElementById('nombreContacto').value = 'Mamá';

        document.getElementById('numContacto').value = '+52 55 1234 5678';

    }

});


function guardarContacto() {

    const nombre = document.getElementById('nombreContacto').value.trim();

    const numero = document.getElementById('numContacto').value.trim();


    if (!nombre || !numero) {

        alert('Por favor completa todos los campos.');

        return;
    }


    alert('Cambios guardados correctamente.');

}


function volverContactos() {

    window.location.href = 'contac.html';

}