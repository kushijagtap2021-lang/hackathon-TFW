
/* -------------------------
   CROP DATABASE
------------------------- */

const crops = [
    {
        name: "Lettuce",
        space: ["windowsill", "balcony"],
        light: ["medium", "lots"],
        level: ["beginner", "pro"],
        image: "https://images.pexels.com/photos/1656666/pexels-photo-1656666.jpeg",
        reason: "Fast-growing and perfect for hydroponic beginners."
    },

    {
        name: "Spinach",
        space: ["windowsill", "balcony"],
        light: ["low", "medium"],
        level: ["beginner", "pro"],
        image: "https://images.pexels.com/photos/2329440/pexels-photo-2329440.jpeg",
        reason: "Thrives even with moderate lighting."
    },

    {
        name: "Basil",
        space: ["windowsill", "balcony"],
        light: ["lots"],
        level: ["beginner", "pro"],
        image: "https://images.pexels.com/photos/4750270/pexels-photo-4750270.jpeg",
        reason: "Aromatic herb that loves sunlight."
    },

    {
        name: "Mint",
        space: ["windowsill", "balcony"],
        light: ["low", "medium"],
        level: ["beginner", "pro"],
        image: "https://images.pexels.com/photos/6157054/pexels-photo-6157054.jpeg",
        reason: "Extremely easy and productive hydroponic crop."
    },

    {
        name: "Strawberries",
        space: ["balcony", "room"],
        light: ["lots"],
        level: ["pro"],
        image: "https://images.pexels.com/photos/89778/strawberries-frisch-ripe-sweet-89778.jpeg",
        reason: "High-value fruit crop for experienced growers."
    },

    {
        name: "Cherry Tomatoes",
        space: ["room"],
        light: ["lots"],
        level: ["pro"],
        image: "https://images.pexels.com/photos/533280/pexels-photo-533280.jpeg",
        reason: "Produces abundant harvests indoors."
    },

    {
        name: "Kale",
        space: ["balcony", "room"],
        light: ["medium", "lots"],
        level: ["beginner", "pro"],
        image: "https://images.pexels.com/photos/51372/kale-vegetables-brassica-oleracea-var-sabellica-green-51372.jpeg",
        reason: "Nutrient-rich and hydroponic-friendly."
    },

    {
        name: "Cilantro",
        space: ["windowsill", "balcony"],
        light: ["medium"],
        level: ["beginner"],
        image: "https://images.pexels.com/photos/4198024/pexels-photo-4198024.jpeg",
        reason: "Compact herb ideal for small setups."
    }
];

/* -------------------------
   QUESTIONS
------------------------- */

const questions = [
    {
        question: "🏠 How much space do you have?",
        key: "space",
        options: ["windowsill", "balcony", "room"]
    },

    {
        question: "☀️ How much light do you get?",
        key: "light",
        options: ["low", "medium", "lots"]
    },

    {
        question: "🌱 What's your experience level?",
        key: "level",
        options: ["beginner", "pro"]
    },

    {
        question: "💧 How often can you care for plants?",
        key: "care",
        options: ["rarely", "sometimes", "daily"]
    }
];

let currentQuestion = 0;
let answers = {};
let ecoScore = 0;

/* -------------------------
   START QUIZ
------------------------- */

function startQuiz() {

    document.querySelector(".hero").style.display = "none";

    document.getElementById("quiz").style.display = "block";

    showQuestion();

}

/* -------------------------
   SHOW QUESTION
------------------------- */

function showQuestion() {

    const q = questions[currentQuestion];

    document.getElementById("question").textContent =
        q.question;

    const options =
        document.getElementById("options");

    options.innerHTML = "";

    q.options.forEach(option => {

        const button =
            document.createElement("div");

        button.className = "option";

        button.textContent = option;

        button.addEventListener("click", () => {

            selectOption(option);

        });

        options.appendChild(button);

    });

    updateProgress();

}

/* -------------------------
   SELECT ANSWER
------------------------- */

function selectOption(option) {

    const current =
        questions[currentQuestion];

    answers[current.key] = option;

    ecoScore += 25;

    document.getElementById("ecoScore").textContent =
        ecoScore;

    currentQuestion++;

    if (currentQuestion < questions.length) {

        showQuestion();

    } else {

        showResults();

    }

}

/* -------------------------
   PROGRESS
------------------------- */

function updateProgress() {

    const percent =
        (currentQuestion / questions.length) * 100;

    const progress =
        document.getElementById("progress");

    const meter =
        document.getElementById("meterFill");

    if (progress) {

        progress.style.width = percent + "%";

    }

    if (meter) {

        meter.style.width =
            Math.min(percent + 20, 100) + "%";

    }

}

/* -------------------------
   RECOMMENDATIONS
------------------------- */

function getRecommendations() {

    let matches = crops.filter(crop =>

        crop.space.includes(answers.space) &&
        crop.light.includes(answers.light) &&
        crop.level.includes(answers.level)

    );

    if (matches.length === 0) {

        matches =
            [...crops].sort(() =>
                Math.random() - 0.5
            );

    }

    return matches.slice(0, 3);

}

/* -------------------------
   RESULTS
------------------------- */

function showResults() {

    document.getElementById("quiz").style.display =
        "none";

    document.getElementById("resultsSection").style.display =
        "block";

    const grid =
        document.getElementById("resultsGrid");

    grid.innerHTML = "";

    const recommendations =
        getRecommendations();

    recommendations.forEach((crop, index) => {

        const card =
            document.createElement("div");

        card.className = "crop-card";

        card.style.animation =
            `fadeUp .8s ease ${index * 0.2}s forwards`;

        card.innerHTML = `

<img src="${crop.image}" alt="${crop.name}">

<div class="card-content">

<div class="crop-name">
${crop.name}
</div>

<div class="crop-reason">
${crop.reason}
</div>

<button class="grow-btn">
🌱 Grow This Crop
</button>

</div>

`;

        grid.appendChild(card);

    });

    growPlant();

    launchConfetti();

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}

/* -------------------------
   GROWTH ANIMATION
------------------------- */

function growPlant() {

    const plant =
        document.getElementById("plant");

    if (!plant) return;

    setTimeout(() => {

        plant.style.transform =
            "translateX(-50%) scale(1)";

    }, 300);

}

/* -------------------------
   CONFETTI
------------------------- */

function launchConfetti() {

    const colors = [
        "#8cff9f",
        "#ffd166",
        "#06d6a0",
        "#118ab2",
        "#ffffff"
    ];

    for (let i = 0; i < 180; i++) {

        const confetti =
            document.createElement("div");

        confetti.className = "confetti";

        confetti.style.left =
            Math.random() * 100 + "vw";

        confetti.style.background =
            colors[Math.floor(
                Math.random() * colors.length
            )];

        confetti.style.animationDuration =
            (Math.random() * 3 + 2) + "s";

        document.body.appendChild(confetti);

        setTimeout(() => {

            confetti.remove();

        }, 6000);

    }

}

/* -------------------------
   DARK MODE
------------------------- */

function toggleTheme() {

    document.body.classList.toggle("light");

    const toggle =
        document.querySelector(".toggle");

    if (toggle) {

        toggle.textContent =
            document.body.classList.contains("light")
                ? "☀️"
                : "🌙";

    }

}

/* -------------------------
   FLOATING LEAVES
------------------------- */

function createLeaves() {

    const container =
        document.getElementById("leaves");

    if (!container) return;

    const leaves =
        ["🍃", "🌿", "🍀"];

    for (let i = 0; i < 30; i++) {

        const leaf =
            document.createElement("div");

        leaf.className = "leaf";

        leaf.innerHTML =
            leaves[Math.floor(
                Math.random() * leaves.length
            )];

        leaf.style.left =
            Math.random() * 100 + "vw";

        leaf.style.fontSize =
            (Math.random() * 25 + 15) + "px";

        leaf.style.opacity =
            Math.random();

        leaf.style.animationDuration =
            (Math.random() * 15 + 10) + "s";

        container.appendChild(leaf);

    }

}

/* -------------------------
   PARALLAX
------------------------- */

window.addEventListener("mousemove", (e) => {

    const bg =
        document.querySelector(".parallax-bg");

    if (!bg) return;

    const x = e.clientX / 40;
    const y = e.clientY / 40;

    bg.style.transform =
        `translate(${-x}px,${-y}px)`;

});

/* -------------------------
   INITIALIZE
------------------------- */

window.addEventListener("DOMContentLoaded", () => {

    createLeaves();

    console.log(
        "🌱 Crop Finder Loaded Successfully"
    );

});