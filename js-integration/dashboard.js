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
            folders: ['Event propagation', 'Kanban Task Manager'] 
        },
        { 
            id: "maths", 
            name: 'Mathematics', 
            folders: ['Maths'] 
        }
    ];

    let grandTotalQuestions = 0;
    let grandTotalCompleted = 0;

    const allKeys = Object.keys(localStorage);
    const completedKeys = allKeys.filter(key => 
        key.startsWith('status_') && localStorage.getItem(key) === 'completed'
    );

    const topicCards = document.querySelectorAll('.topic-grid .topic-card');
    
    subjects.forEach((subject, index) => {
        const storedTotal = localStorage.getItem(`total_questions_${subject.id}`);
        const inheritedTotal = parseInt(storedTotal) || 0; 
        
        let subjectCompleted = 0;

        completedKeys.forEach(key => {
            if (subject.folders.some(folder => key.toLowerCase().includes(folder.toLowerCase()))) {
                subjectCompleted++;
            }
        });

        if (inheritedTotal > 0) subjectCompleted = Math.min(subjectCompleted, inheritedTotal);

        const subjectPercent = inheritedTotal > 0 ? Math.round((subjectCompleted / inheritedTotal) * 100) : 0;
        
        grandTotalQuestions += inheritedTotal;
        grandTotalCompleted += subjectCompleted;

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

    let globalPercent = 0;
    if (grandTotalQuestions > 0) {
        globalPercent = Math.round((grandTotalCompleted / grandTotalQuestions) * 100);
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
