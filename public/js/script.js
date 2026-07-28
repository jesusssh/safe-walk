var map = L.map('map').setView([13.6929, -89.2182], 15);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: 'OpenStreetMap'
}).addTo(map);

// Marcador rojo
L.marker([13.695,-89.220])
.addTo(map)
.bindPopup("Robo reportado");

// Marcador amarillo
L.marker([13.692,-89.217])
.addTo(map)
.bindPopup("Robo reportado");

// Marcador verde
L.marker([13.689,-89.223])
.addTo(map)
.bindPopup("Zona segura");



