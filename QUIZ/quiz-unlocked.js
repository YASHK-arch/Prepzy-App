
const totalProgress = document.querySelector('.progress-fill');

const milestoneCont1 = document.querySelector('#gift1');
const milestoneCont2 = document.querySelector('#gift2');

const contText = document.querySelectorAll('.unlocked-text');
const viewButton = document.querySelectorAll('.view-btn.special');
const quizLink1 = document.querySelector('#quix1');
const quizLink2 = document.querySelector('#quix2');

let isUnlocked = false;

// ===============================
// LOCK / UNLOCK HANDLERS
// ===============================
function lockMilestone() {
    isUnlocked = false;

    // Show alert only when locked
    milestoneCont1.onclick = showAlert;

    // Disable navigation
    quizLink1.href = "javascript:void(0)";
    quizLink1.style.pointerEvents = "none";
    quizLink2.href = "javascript:void(0)";
    quizLink2.style.pointerEvents = "none";
}

function unlockMilestone() {
    isUnlocked = true;

    // Remove alert completely
    milestoneCont1.onclick = null;

    // Enable navigation
    quizLink1.href = "../QUIZ/quiz.html";
    quizLink1.style.pointerEvents = "auto";
     quizLink2.href = "../QUIZ/quiz.html";
    quizLink2.style.pointerEvents = "auto";
}

// ===============================
// CORE UNLOCK LOGIC
// ===============================
function unlockIfEligible() {
    const percent = parseInt(totalProgress.style.width);
    console.log("Progress checked:", percent);

    if (!isNaN(percent) && percent >= 60) {

        unlockMilestone();

        milestoneCont1.classList.add("gift1");
        milestoneCont2.classList.add("gift2");

        viewButton.forEach(btn => {
            btn.style.background = "#c8ff00ff";
            btn.innerText = "View";
            btn.style.color = "black";
        });

        contText.forEach(text => {
            text.classList.add("shake");
            text.innerText = "⭐ Milestone Quiz Unlocked!";
        });

        showToast("New Quiz is Unlocked!", "success");

        console.log("Milestone unlocked");

    } else {
        lockMilestone();
    }
}

// ===============================
// ALERT (LOCKED STATE)
// ===============================
function showAlert() {
    alert("To unlock this quiz, make at least 60% revision progress!");
}

// ===============================
// INITIAL RUN
// ===============================
unlockIfEligible();

// ===============================
// OBSERVE PROGRESS BAR CHANGES
// ===============================
const observer = new MutationObserver(unlockIfEligible);

observer.observe(totalProgress, {
    attributes: true,
    attributeFilter: ["style"]
});
