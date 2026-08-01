document.addEventListener('DOMContentLoaded', () => {
    // 1. Cargar y aplicar Tema Guardado
    const temaGuardado = localStorage.getItem('temaApp') || 'claro';
    if (temaGuardado === 'oscuro') {
        document.body.classList.add('dark-mode');
    } else {
        document.body.classList.remove('dark-mode');
    }

    // 2. Cargar y aplicar Idioma Guardado
    const idiomaGuardado = localStorage.getItem('idioma') || 'es';
    const lang = (idiomaGuardado === 'English' || idiomaGuardado === 'en') ? 'en' : 'es';

    document.querySelectorAll('[data-es]').forEach(elem => {
        if (elem.dataset[lang]) {
            elem.textContent = elem.dataset[lang];
        }
    });
});




var map = L.map('map').setView([13.6929,-89.2182],14);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png',{
maxZoom:19
}).addTo(map);

var circulo = L.circle([0,0],{
radius:40,
color:"blue",
fillColor:"blue",
fillOpacity:.4
}).addTo(map);

var marcador = L.marker([0,0]).addTo(map);

document.getElementById("btnSOS").addEventListener("click", function(){

if (!navigator.geolocation) {
alert("Tu navegador no soporta geolocalización.");
return;
}

navigator.geolocation.getCurrentPosition(
function(pos){
const lat = pos.coords.latitude;
const lng = pos.coords.longitude;

marcador.setLatLng([lat,lng]);
circulo.setLatLng([lat,lng]);
map.setView([lat,lng],18);

alert("🚨 SOS enviado.\n\nUbicación:\n" + lat + ", " + lng);
},
function(error){
// Si el usuario deniega el permiso o falla la señal
alert("⚠️ No se pudo obtener la ubicación. Por favor activa el GPS y dale permisos a la página. Error: " + error.message);
}
);

});

document.addEventListener('DOMContentLoaded', () => {
const temaGuardado = localStorage.getItem('temaApp') || 'claro';
if (temaGuardado === 'oscuro') {
document.body.classList.add('dark-mode');
} else {
document.body.classList.remove('dark-mode');
}
}); 
