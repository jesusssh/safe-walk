// Redirigir a Configuración desde miperfil.html
document.getElementById("btnConfiguracion")?.addEventListener("click", () => {
    window.location.href = "configuracion.html";
});

// Regresar a la pantalla de perfil desde configuracion.html
function volverPerfil() {
    window.location.href = "miperfil.html";
}
