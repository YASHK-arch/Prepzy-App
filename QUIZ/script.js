var questions = [
    {
        question: "What will be the output of this code?",
        code: `class Account {
    private double balance = 5000;

    void withdraw(double amount) {
        if (amount <= balance)
            balance -= amount;
    }

    void showBalance() {
        System.out.println(balance);
    }
}

public class Test {
    public static void main(String[] args) {
        Account a = new Account();
        a.balance = 10000; // line X
        a.withdraw(2000);
        a.showBalance();
    }
}`,
        options: ["3000", "5000", "Compilation Error at line X", "10000"],
        answer: 2
    },
    {
        question: "What is the output of the following code?",
        code: 
`class GuessTheOuput
{
    GuessTheOuput()
    { System.out.print("Inside Constructor. "); }

    { System.out.print("Inside the instance block. "); }

    static
    { System.out.print("Inside the static block. "); }
}

public class Main {
    public static void main(String[] args) {
        GuessTheOuput obj = new GuessTheOuput();
    }
}
`,
        options: ["Inside Constructor. Inside the instance block. Inside the static block.", "Inside the instance block. Inside Constructor. Inside the static block.", "Inside the static block. Inside Constructor. Inside the instance block.", "Inside the static block. Inside the instance block. Inside Constructor."],
        answer: 3
    },
    {
        question: `What is true about static methods?

i. They can be overloaded
ii. They can be overridden

Which of the following is correct?`,
        code: "",
        options: ["Both are correct", "Both are incorrect", "i is correct, ii is incorrect", "i is incorrect, ii is correct"],
        answer: 2
    },
    {
        question: "What will be the output of this code?",
        code: `class Student {
    private int marks = 85;

    public int getMarks() {
        return marks;
    }

    public void setMarks(int marks) {
        if (marks > 0 && marks <= 100)
            this.marks = marks;
    }
}

class Test {
    public static void main(String[] args) {
        Student s = new Student();
        s.setMarks(105);
        System.out.println(s.getMarks());
    }
}`,
        options: ["105", "85", "Compilation Error", "0"],
        answer: 1
    },
    {
        question: "What will be the output of following code snippet?",
        code: `import java.util.*;
public class Test {
    public static void main(String[] args) {
        ArrayList<Integer> list = new ArrayList<>();
        list.add(1);
        list.add(2);
        list.add(1, 5);
        list.remove(Integer.valueOf(1));
        System.out.println(list);
    }
}`,
        options: ["[1,5]", "[2,5]", "[5,2]", "[1,2]"],
        answer: 2
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

    codeBlock.removeAttribute("data-highlighted");
    codeBlock.className = "language-java";

    hljs.highlightElement(codeBlock);
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
