const botones = document.querySelectorAll(".tipo-btn");

botones.forEach(btn => {

    btn.addEventListener("click", () => {

        botones.forEach(b => {
            b.classList.remove("activo");
        });

        btn.classList.add("activo");

    });

});

const descripcion = document.getElementById("descripcion");
const contador = document.getElementById("contador");

descripcion.addEventListener("input", () => {

    contador.textContent = descripcion.value.length;

});