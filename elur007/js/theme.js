// theme.js — used on businessdetails.html and e-sevai.html
document.addEventListener("DOMContentLoaded", function () {
    const themeToggler = document.querySelector(".theme-toggler");
    const toggleBtn    = document.querySelector(".toggle-btn");

    if (!themeToggler || !toggleBtn) return;

    function openClose() {
        themeToggler.classList.toggle("active");
    }
    toggleBtn.addEventListener("click", openClose);
    toggleBtn.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") openClose();
    });

    const themeButtons = document.querySelectorAll(".theme-btn");
    themeButtons.forEach(btn => {
        function applyColor() {
            const color = btn.getAttribute("data-color");
            document.documentElement.style.setProperty("--pumpkin-spice", color);
            document.documentElement.style.setProperty("--button-bg", color);
            themeButtons.forEach(b => b.style.outline = "none");
            btn.style.outline = "3px solid #333";
        }
        btn.addEventListener("click", applyColor);
        btn.addEventListener("keydown", (e) => {
            if (e.key === "Enter" || e.key === " ") applyColor();
        });
    });
});
