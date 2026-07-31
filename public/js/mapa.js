var map = L.map('map').setView([13.6929, -89.2182], 12);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19
}).addTo(map);


// Círculo azul de ubicación
var circulo = L.circle([0,0],{
    radius:50,
    color:"blue",
    fillColor:"blue",
    fillOpacity:0.3
}).addTo(map);



var marcador = L.marker([0,0]).addTo(map);



navigator.geolocation.watchPosition(function(posicion){

    const lat = posicion.coords.latitude;
    const lng = posicion.coords.longitude;

    circulo.setLatLng([lat,lng]);
    marcador.setLatLng([lat,lng]);

    map.setView([lat,lng],17);

}, function(error){

    console.log("Error de ubicación:", error);

});



L.marker([13.693,-89.218])
.addTo(map)
.bindPopup("<b>🚨 Robo reportado</b><br>Hace 20 minutos");


L.marker([13.690,-89.214])
.addTo(map)
.bindPopup("<b>⚠️ Acoso reportado</b><br>Hace 5 minutos");





document.addEventListener('DOMContentLoaded', () => {
    const temaGuardado = localStorage.getItem('temaApp') || 'claro';
    if (temaGuardado === 'oscuro') {
        document.body.classList.add('dark-mode');
    } else {
        document.body.classList.remove('dark-mode');
    }
});