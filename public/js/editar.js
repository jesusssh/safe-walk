console.log("editar.js cargado");

// Cargar datos
document.getElementById("nombre1").value = localStorage.getItem("nombre1") || "";
document.getElementById("parentesco1").value = localStorage.getItem("parentesco1") || "";
document.getElementById("telefono1").value = localStorage.getItem("telefono1") || "";
document.getElementById("correo1").value = localStorage.getItem("correo1") || "";

document.getElementById("nombre2").value = localStorage.getItem("nombre2") || "";
document.getElementById("parentesco2").value = localStorage.getItem("parentesco2") || "";
document.getElementById("telefono2").value = localStorage.getItem("telefono2") || "";
document.getElementById("correo2").value = localStorage.getItem("correo2") || "";

document.getElementById("guardar").addEventListener("click", function () {

    const telefono1 = document.getElementById("telefono1").value;
    const telefono2 = document.getElementById("telefono2").value;

    if (!/^\d{8}$/.test(telefono1) || !/^\d{8}$/.test(telefono2)) {
        alert("Los teléfonos deben tener exactamente 8 números.");
        return;
    }

    localStorage.setItem("nombre1", document.getElementById("nombre1").value);
    localStorage.setItem("parentesco1", document.getElementById("parentesco1").value);
    localStorage.setItem("telefono1", telefono1);
    localStorage.setItem("correo1", document.getElementById("correo1").value);

    localStorage.setItem("nombre2", document.getElementById("nombre2").value);
    localStorage.setItem("parentesco2", document.getElementById("parentesco2").value);
    localStorage.setItem("telefono2", telefono2);
    localStorage.setItem("correo2", document.getElementById("correo2").value);

    alert("Contactos guardados correctamente.");

    window.location.href = "sos.html"; 
});



document.addEventListener('DOMContentLoaded', () => {
    const temaGuardado = localStorage.getItem('temaApp') || 'claro';
    if (temaGuardado === 'oscuro') {
        document.body.classList.add('dark-mode');
    } else {
        document.body.classList.remove('dark-mode');
    }
});
