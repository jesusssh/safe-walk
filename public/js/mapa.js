var map = L.map('map').setView([13.6929,-89.2182],13);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png',{
    attribution:'© OpenStreetMap contributors'
}).addTo(map);

L.marker([13.693,-89.218])
.addTo(map)
.bindPopup("<b>🚨 Robo reportado</b><br>Hace 20 minutos");

L.marker([13.690,-89.214])
.addTo(map)
.bindPopup("<b>⚠️ Acoso reportado</b><br>Hace 5 minutos");