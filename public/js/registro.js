window.addEventListener("load", () => {

    const card = document.querySelector(".registro-card");

    card.style.transition = "all 0.8s ease";

    setTimeout(() => {
        card.style.opacity = "1";
        card.style.transform = "translateY(0)";
    }, 200);

});