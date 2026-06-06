// ==========================================
// COPY PHONE NUMBER
// ==========================================
function copyNumber(number) {
    navigator.clipboard.writeText(number).then(() => {
        alert(number + " copied!");
    }).catch(() => {
        alert(number + " - please copy manually.");
    });
}

// ==========================================
// RUN ON DOM READY
// ==========================================
document.addEventListener("DOMContentLoaded", function () {

    // ---- NVR READ MORE TOGGLE ----
    const nvrToggleBtn = document.getElementById("nvrToggleBtn");
    if (nvrToggleBtn) {
        const nvrDots = document.getElementById("nvr-dots");
        const nvrMore = document.getElementById("nvr-more");

        nvrToggleBtn.addEventListener("click", function () {
            const isHidden = nvrMore.style.display === "none";
            nvrMore.style.display = isHidden ? "inline" : "none";
            nvrDots.style.display = isHidden ? "none" : "inline";
            nvrToggleBtn.innerHTML = isHidden
                ? '<i class="fas fa-angle-up"></i>'
                : '<i class="fas fa-angle-down"></i>';
            nvrToggleBtn.setAttribute("aria-expanded", isHidden ? "true" : "false");
        });
    }

    // ---- BUS COUNTDOWN (only on index page) ----
    const cards = document.querySelectorAll(".bus-card");
    if (cards.length >= 2) {
        function getNextBus(schedule) {
            const now = new Date();
            for (let bus of schedule) {
                const [hours, minutes] = bus.time.split(":");
                const busTime = new Date();
                busTime.setHours(hours, minutes, 0, 0);
                if (busTime > now) {
                    return { ...bus, busTime };
                }
            }
            // No more buses today — show first bus tomorrow
            const first = schedule[0];
            const [h, m] = first.time.split(":");
            const tomorrow = new Date();
            tomorrow.setDate(tomorrow.getDate() + 1);
            tomorrow.setHours(h, m, 0, 0);
            return { ...first, busTime: tomorrow };
        }

        function updateCard(card, schedule) {
            const nextBus = getNextBus(schedule);
            const now = new Date().getTime();
            const diff = nextBus.busTime.getTime() - now;

            const hours   = Math.floor(diff / (1000 * 60 * 60));
            const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((diff % (1000 * 60)) / 1000);

            card.querySelector(".bus-number").innerText = nextBus.busNumber;
            card.querySelector(".route-text").innerText  = nextBus.route;
            card.querySelector(".countdown").innerText   =
                `${hours}h ${minutes}m ${seconds}s`;
        }

        function tick() {
            updateCard(cards[0], busSchedule);
            updateCard(cards[1], சத்திToகோபிSchedule);
        }

        tick();
        setInterval(tick, 1000);
    }

    // ---- THEME TOGGLER ----
    const themeToggler = document.querySelector(".theme-toggler");
    const toggleBtn    = document.querySelector(".toggle-btn");

    if (themeToggler && toggleBtn) {
        // Open / Close panel
        function openClose() {
            themeToggler.classList.toggle("active");
        }
        toggleBtn.addEventListener("click", openClose);
        toggleBtn.addEventListener("keydown", (e) => {
            if (e.key === "Enter" || e.key === " ") openClose();
        });

        // Color buttons
        const themeButtons = document.querySelectorAll(".theme-btn");
        themeButtons.forEach(btn => {
            function applyColor() {
                const color = btn.getAttribute("data-color");
                document.documentElement.style.setProperty("--pumpkin-spice", color);
                // Also update navbar, button, footer, countdown and info-icon
                document.documentElement.style.setProperty("--button-bg", color);
                // Store so toggler stays consistent visually
                themeButtons.forEach(b => b.style.outline = "none");
                btn.style.outline = "3px solid #333";
            }
            btn.addEventListener("click", applyColor);
            btn.addEventListener("keydown", (e) => {
                if (e.key === "Enter" || e.key === " ") applyColor();
            });
        });
    }

});
