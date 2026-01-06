var questions = [
    {
        question: "What will be the output of this code?",
        code: `int[] arr = {5, 4, 3, 2, 1};
for (int i = 1; i < arr.length; i++) {
    int key = arr[i];
    int j = i - 1;
    while (j >= 0 && arr[j] > key) {
        arr[j + 1] = arr[j];
        j--;
    }
    arr[j + 1] = key;
}`,
        options: ["1 2 3 4 5", "5 4 3 2 1", "Runtime Error", "No Output"],
        answer: 0
    },
    {
        question: "Which language is used for styling web pages?",
        code: `body {
    background-color: red;
}`,
        options: ["HTML", "JQuery", "CSS", "XML"],
        answer: 2
    },
    {
        question: "Which is not a JavaScript framework?",
        code: "",
        options: ["React", "Angular", "Vue", "Django"],
        answer: 3
    },
    {
        question: "Inside which HTML element do we put JS?",
        code: "",
        options: ["<js>", "<script>", "<javascript>", "<code>"],
        answer: 1
    },
    {
        question: "Which keyword declares a variable in JS?",
        code: "",
        options: ["var", "int", "string", "float"],
        answer: 0
    }
];

var index = 0;
var score = 0;
var timeLeft = 15;
var timerId;

var questionEl = document.getElementById("question");
var optionsEl = document.getElementById("options");
var timeEl = document.getElementById("time");
var nextBtn = document.getElementById("nextBtn");
var currentEl = document.getElementById("current");
var totalEl = document.getElementById("total");
var codeBlock = document.getElementById("codeBlock");
var codeBox = document.querySelector(".code");

totalEl.innerText = questions.length;

startQuiz();

function startQuiz() {
    loadQuestion();
}

function loadQuestion() {
    clearInterval(timerId);
    optionsEl.innerHTML = "";
    nextBtn.disabled = true;

    var q = questions[index];

    questionEl.innerText = q.question;
    currentEl.innerText = index + 1;

    if (q.code && q.code.trim() !== "") {
        codeBox.style.display = "block";
        codeBlock.textContent = q.code;

        if (!codeBlock.classList.contains("hljs")) {
            hljs.highlightElement(codeBlock);
        }
    } else {
        codeBox.style.display = "none";
        codeBlock.textContent = "";
    }

    for (var i = 0; i < q.options.length; i++) {
        var btn = document.createElement("button");
        btn.innerText = q.options[i];
        btn.dataset.index = i;
        btn.onclick = checkAnswer;
        optionsEl.appendChild(btn);
    }

    startTimer();
}

function startTimer() {
    timeLeft = 15;
    timeEl.innerText = timeLeft;

    timerId = setInterval(function () {
        timeLeft--;
        timeEl.innerText = timeLeft;

        if (timeLeft === 0) {
            clearInterval(timerId);
            disableOptions();
            nextBtn.disabled = false;
        }
    }, 1000);
}

function checkAnswer() {
    clearInterval(timerId);

    var selected = Number(this.dataset.index);
    var correct = questions[index].answer;
    var buttons = optionsEl.children;

    for (var i = 0; i < buttons.length; i++) {
        buttons[i].disabled = true;
    }

    if (selected === correct) {
        this.classList.add("correct");
        score++;
    } else {
        this.classList.add("wrong");
        buttons[correct].classList.add("correct");
    }

    nextBtn.disabled = false;
}

function disableOptions() {
    var buttons = optionsEl.children;
    for (var i = 0; i < buttons.length; i++) {
        buttons[i].disabled = true;
    }
}

nextBtn.onclick = function () {
    index++;
    if (index < questions.length) {
        loadQuestion();
    } else {
        showResult();
    }
};

function showResult() {
    document.querySelector(".quiz-container").innerHTML = `
        <h2>Quiz Completed 🎉</h2>
        <p>Your Score: <strong>${score}/${questions.length}</strong></p>
        <button onclick="location.reload()">Restart Quiz</button>
    `;
}
