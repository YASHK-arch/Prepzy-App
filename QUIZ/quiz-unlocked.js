const totalProgress = document.querySelector('.progress-fill');

const milestoneCont1 = document.querySelector('#gift1');
const milestoneCont2 = document.querySelector('#gift2');

const contText = document.querySelectorAll('.unlocked-text');
const viewButton = document.querySelectorAll('.view-btn.special');
const quizLink1 = document.querySelector('#quix1');

let isUnlocked = false;

function lockMilestone() {
    isUnlocked = false;
    milestoneCont1.onclick = showAlert;
    quizLink1.href = "javascript:void(0)";
    quizLink1.style.pointerEvents = "none";
}

function unlockMilestone() {
    isUnlocked = true;
    milestoneCont1.onclick = null;
    quizLink1.href = "../QUIZ/quiz.html";
    quizLink1.style.pointerEvents = "auto";
}

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

function showAlert() {
    alert("To unlock this quiz, make at least 60% revision progress!");
}

unlockIfEligible();

const observer = new MutationObserver(unlockIfEligible);

observer.observe(totalProgress, {
    attributes: true,
    attributeFilter: ["style"]
});
