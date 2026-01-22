/**
 * dashboard.js
 * Synchronizes individual subject cards and the global progress bar.
 * Inherits total question counts from localStorage (saved by data.js).
 */

document.addEventListener('DOMContentLoaded', () => {
    updateGlobalDashboard();
});

function updateGlobalDashboard() {
    const subjects = [
        {
            id: "java",
            name: 'DSA',
            folders: ['Prefix sum', 'Carry Forward', 'Contribution technique', 'Sliding Window', 'OOPS', 'INTERVIEW', 'Strings']
        },
        {
            id: "js",
            name: 'Web Dev: Javascript',
            folders: ['Asynchronous Programming - 1', 'Asynchronous Programming - 2', 'Kanban Task Manager', 'working with promises', 'async and await', 'Event Propagation and Delegation']
        },
        {
            id: "maths",
            name: 'Mathematics',
            folders: ['Maths']
        }
    ];

    let grandTotalQuestions = 0;
    let grandTotalCompleted = 0;


    const topicCards = document.querySelectorAll('.topic-grid .topic-card');

    subjects.forEach((subject, index) => {
        // --- 1. Get Totals from LocalStorage ---
        const storedTotal = localStorage.getItem(`total_questions_${subject.id}`);
        const inheritedTotal = parseInt(storedTotal) || 0;

        // >>> FIX START (REPLACED LOGIC)
        const storedCompleted = localStorage.getItem(`completed_questions_${subject.id}`);
        const subjectCompleted = parseInt(storedCompleted) || 0;
        // >>> FIX END

        const subjectPercent = inheritedTotal > 0
            ? Math.round((subjectCompleted / inheritedTotal) * 100)
            : 0;

        // Add to Global Counters
        grandTotalQuestions += inheritedTotal;
        grandTotalCompleted += subjectCompleted;

        // --- 3. Update Subject Card UI ---
        const card = topicCards[index];
        if (card) {
            const countText = card.querySelector('.count');
            const barFill = card.querySelector('.progress-bar-fill');
            const percentLabel = card.querySelector('.percentage-label');

            if (countText) {
                countText.innerText = inheritedTotal > 0
                    ? `${subjectCompleted}/${inheritedTotal} Questions Mastered`
                    : "Visit page to sync";
            }
            if (barFill) barFill.style.width = `${subjectPercent}%`;
            if (percentLabel) percentLabel.innerText = `${subjectPercent}%`;
        }
    });

    // --- 4. UPDATE GLOBAL (VIOLET) PROGRESS BAR ---
    let globalPercent = 0;
    if (grandTotalQuestions > 0) {
        globalPercent = Math.round(
            (grandTotalCompleted / grandTotalQuestions) * 100
        );
    }

    const globalPercentDisplay = document.getElementById('overall-percent');
    if (globalPercentDisplay) globalPercentDisplay.innerText = `${globalPercent}%`;

    const globalBarFill = document.querySelector('.main-progress .progress-bar-fill');
    if (globalBarFill) {
        globalBarFill.style.width = `${globalPercent}%`;
        globalBarFill.style.backgroundColor = '#4CAF50';
    }
}

document.getElementById("syllabusBtn").onclick = () => {
    window.open(
        "https://docs.google.com/spreadsheets/d/153n2HUcNhMuUvMSzId3rEAQrg5ltmuzFIV_j_6TmGiQ/edit?gid=77917834#gid=77917834",
        "_blank"
    );
};
