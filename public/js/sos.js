var map = L.map('map').setView([13.6929,-89.2182],14);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png',{
    maxZoom:19
}).addTo(map);

var circulo=L.circle([0,0],{

    radius:40,
    color:"blue",
    fillColor:"blue",
    fillOpacity:.4

}).addTo(map);

var marcador=L.marker([0,0]).addTo(map);

document.getElementById("btnSOS").addEventListener("click",function(){

    navigator.geolocation.getCurrentPosition(function(pos){

        const lat=pos.coords.latitude;
        const lng=pos.coords.longitude;

        marcador.setLatLng([lat,lng]);

        circulo.setLatLng([lat,lng]);

        map.setView([lat,lng],18);

        alert("🚨 SOS enviado.\n\nUbicación:\n"+lat+", "+lng);

    });

});