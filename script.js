window.onload = function () {
    initializeHouseHover();
    initializeHouseClick();
    initializeSnow();
}

function initializeHouseHover() {

    const houses = document.querySelectorAll('.house');

    houses.forEach(house => {
        house.addEventListener('mouseover', () => {
            console.log('Mouseover event on house' + house.id);
            const newSrc = house.src.replace('_idle', '_hover'); 
            house.src = newSrc;
        });

        house.addEventListener('mouseout', () => {
            const originalSrc = house.src.replace('_hover', '_idle'); 
            house.src = originalSrc;
        });
    });
}

function initializeHouseClick() {
    const houses = document.querySelectorAll('.house');
    const today = new Date();
    const currentDay = today.getDate();
    const currentYear = today.getFullYear();

    // Create modal and overlay elements
    const overlay = document.createElement('div');
    overlay.classList.add('overlay');
    document.body.appendChild(overlay);

    const modal = document.createElement('div');
    modal.classList.add('modal');
    document.body.appendChild(modal);

    const modalLink = document.createElement('a');
    modalLink.target = "_blank"; // Open link in a new tab
    modal.appendChild(modalLink);
    
    const modalImg = document.createElement('img');
    modalLink.appendChild(modalImg);

    // function styleModalAndOverlay() {
    //     overlay.style.position = 'fixed';
    //     overlay.style.top = 0;
    //     overlay.style.left = 0;
    //     overlay.style.width = '100%';
    //     overlay.style.height = '100%';
    //     overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
    //     overlay.style.zIndex = 990;
    //     overlay.style.display = 'none';
        
    //     modal.style.position = 'fixed';
    //     modal.style.top = '50%';
    //     modal.style.left = '50%';
    //     modal.style.transform = 'translate(-50%, -50%)';
    //     overlay.style.zIndex = 999;
    //     modal.style.display = 'none';

    //     modalImg.style.maxWidth = '90%';
    //     modalImg.style.maxHeight = '90%';
    //     modal.appendChild(modalImg);
    // }

    // styleModalAndOverlay();


    houses.forEach(house => {
        const houseId = parseInt(house.id.split('-')[1], 10); // Get number from html id
        
        house.addEventListener('click', () => {
            if (currentYear != 2025 || houseId <= currentDay || currentDay > 24) {
                // All dors are open after 24th December
                let imagePath;
                if (houseId == 5) {
                    imagePath = `assets/images/letters/letter_${houseId}.gif`;
                } else {
                    imagePath = `assets/images/letters/letter_${houseId}.png`;
                }
                modalImg.src = imagePath;
                overlay.style.display = 'block';
                modal.style.display = 'block';

                if (houseId != 2) {
                    modalLink.removeAttribute("href"); // Remove link for other houses
                    modalLink.style.pointerEvents = "none"; // Disable link behavior
                } else {
                    modalLink.href = "https://youtu.be/IujCYIXhcjA?si=8hnoA-g3FWD7iJ_J"; 
                    modalLink.style.pointerEvents = "auto"; 
                }
            }
        })

    });
    overlay.addEventListener('click', () => {
        overlay.style.display = 'none';
        modal.style.display = 'none';
        modalImg.src = '';
    });
}


function initializeSnow () {
    const snowContainer = document.querySelector('.snow-container');
    const calendar = document.querySelector('.advent-calendar');

    // Get dimensions of the calendar
    const calendarWidth = calendar.offsetWidth;

    // Create snowflakes dynamically
    function createSnowflake() {
        const snowflake = document.createElement('div');
        snowflake.classList.add('snowflake');

        // Randomize properties
        const size = Math.random() * 12 + 2; // Between sum and the right most value
        const duration = Math.random() * 6 + 6; // Between sum and the right most value
        const delay = Math.random() * 5; // Between 0s and 5s
        const drift = (Math.random() * 200 - 100) + 'px'; 

        // Apply styles dynamically
        snowflake.style.width = `${size}px`;
        snowflake.style.height = `${size}px`;
        snowflake.style.left = Math.random() * calendarWidth + 'px'; // Random position across the screen
        snowflake.style.animationDuration = `${duration}s`;
        snowflake.style.animationDelay = `${delay}s`;
        snowflake.style.setProperty('--drift', drift);

        // Append snowflake to container
        snowContainer.appendChild(snowflake);

        // Remove snowflake after animation to prevent memory leaks
        setTimeout(() => snowflake.remove(), (duration + delay) * 1000);
    }

    // Continuously create snowflakes
    function generateSnowflakes() {
        createSnowflake();
        setTimeout(generateSnowflakes, 10); // Generate a new snowflake every 200ms
    }

    generateSnowflakes();
};

// Disable keyboard zooming (Ctrl + +/-)
document.addEventListener('keydown', function (e) {
    if ((e.ctrlKey || e.metaKey) && (e.key === '+' || e.key === '-' || e.key === '=')) {
        e.preventDefault();
    }
});

// Disable zoom with scroll wheel + Ctrl
document.addEventListener('wheel', function (e) {
    if (e.ctrlKey || e.metaKey) {
        e.preventDefault();
    }
}, { passive: false });


// Select the bulb and lights
const bulb = document.getElementById("bulb");
const lights = document.querySelector(".lights");
const title = document.querySelector(".title");

// Toggle state
let lightsOn = false;

bulb.addEventListener("click", () => {
    lightsOn = !lightsOn;

    // Adjust position for the bulb
    if (lightsOn) {
        bulb.src = "assets/images/ambience/bulb-on.png";
        lights.src = "assets/images/ambience/lights-on.png";
        bulb.style.top = "30px"; 
        bulb.style.right = "45px"; 
        title.src = "assets/images/text/title-lights-on.png";
    } else {
        bulb.src = "assets/images/ambience/bulb-off.png";
        lights.src = "assets/images/ambience/lights-off.png";
        bulb.style.top = "40px";
        bulb.style.right = "70px";
        title.src = "assets/images/text/title-lights-off.png";
    }

});

const body = document.querySelector("body");

// Function to set the background based on the time
function setBackgroundBasedOnTime() {
    const currentTime = new Date();
    const currentHour = currentTime.getHours();

    // Change background image based on the hour
    if (currentHour >= 8 && currentHour < 16) {
        body.style.backgroundImage = "url('./assets/images/skyes/day.png')";
    } else {
        body.style.backgroundImage = "url('./assets/images/skyes/night.png')";
    }
}

// Call the function to set the initial background
setBackgroundBasedOnTime();

// Optional: Update the background dynamically at every hour
setInterval(setBackgroundBasedOnTime, 3600000); // Updates every hour

function scaleCalendar() {
    const calendar = document.querySelector('.advent-calendar');
    const wrapper = document.querySelector('.calendar-wrapper');
    const scale = Math.min(
        wrapper.clientWidth / calendar.offsetWidth,
        wrapper.clientHeight / calendar.offsetHeight
    );

    calendar.style.transform = `scale(${scale})`;
}

// Call on page load and resize
window.addEventListener('resize', scaleCalendar);
window.addEventListener('load', scaleCalendar);