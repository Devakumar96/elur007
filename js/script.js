
// ==========================================
// COPY PHONE NUMBER
// ==========================================

function copyNumber(number) {

    navigator.clipboard.writeText(number);

    alert(number + " copied");

}
// ==========================================
// GET ALL CARDS
// ==========================================

const cards =
    document.querySelectorAll(".bus-card");


// ==========================================
// FIND NEXT BUS
// ==========================================


function getNextBus(schedule) {

    const now =
        new Date();

    let nextBus = null;

    for (let bus of schedule) {

        const [hours, minutes] =
            bus.time.split(":");

        const busTime =
            new Date();

        // Today's Bus Time
        busTime.setHours(hours);
        busTime.setMinutes(minutes);
        busTime.setSeconds(0);

        // Future Bus Found
        if (busTime > now) {

            nextBus = {

                ...bus,

                busTime

            };

            break;

        }

    }


    // ==========================================
    // IF NO BUS LEFT TODAY
    // TAKE FIRST BUS OF NEXT DAY
    // ==========================================

    if (!nextBus) {

        const firstBus =
            schedule[0];

        const [hours, minutes] =
            firstBus.time.split(":");

        const tomorrowBusTime =
            new Date();

        // Add Next Day
        tomorrowBusTime.setDate(
            tomorrowBusTime.getDate() + 1
        );

        tomorrowBusTime.setHours(hours);
        tomorrowBusTime.setMinutes(minutes);
        tomorrowBusTime.setSeconds(0);

        nextBus = {

            ...firstBus,

            busTime: tomorrowBusTime

        };

    }

    return nextBus;

}


// ==========================================
// UPDATE SINGLE CARD
// ==========================================

function updateCard(card, schedule) {

    const nextBus =
        getNextBus(schedule);

    const busNumber =
        card.querySelector(".bus-number");

    const routeText =
        card.querySelector(".route-text");

    const countdown =
        card.querySelector(".countdown");


  

    // Update Bus Details

    busNumber.innerText =
        nextBus.busNumber;

    routeText.innerText =
        nextBus.route;


    // Time Difference

    const now =
        new Date().getTime();

    const distance =
        nextBus.busTime.getTime() - now;


    // Hours

    const hours =
        Math.floor(
            distance / (1000 * 60 * 60)
        );

    // Minutes

    const minutes =
        Math.floor(
            (distance % (1000 * 60 * 60))
            / (1000 * 60)
        );

    // Seconds

    const seconds =
        Math.floor(
            (distance % (1000 * 60))
            / 1000
        );


    // Display

    countdown.innerText =
        `${hours}h ${minutes}m ${seconds}s`;

}


// ==========================================
// LIVE UPDATE
// ==========================================

function startLiveCountdown() {

    // Card 1 → Gobi to Sathy

    updateCard(
        cards[0],
        busSchedule
    );

    // Card 2 → Sathy to Gobi

    updateCard(
        cards[1],
        சத்திToகோபிSchedule
    );

}


// Initial Load

startLiveCountdown();


// Update Every Second

setInterval(() => {

    startLiveCountdown();

}, 1000);

// ==========================================
// THEME TOGGLER
// ==========================================

const themeToggler =
    document.querySelector(".theme-toggler");

const toggleBtn =
    document.querySelector(".toggle-btn");


// Open / Close

toggleBtn.onclick = () => {

    themeToggler.classList.toggle("active");

};


// ==========================================
// COLOR CHANGE
// ==========================================

const themeButtons =
    document.querySelectorAll(".theme-btn");


themeButtons.forEach(button => {

    button.onclick = () => {

        const color =
            button.getAttribute("data-color");

        // Change Main Theme Color

        document.documentElement.style.setProperty(
            "--pumpkin-spice",
            color
        );

    };

});