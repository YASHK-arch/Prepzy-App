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
            folders: ['JS'] 
        },
        { 
            id: "maths", 
            name: 'Mathematics', 
            folders: ['Maths'] 
        }
    ];

    let grandTotalQuestions = 0;
    let grandTotalCompleted = 0;

    // Filter all keys for those marked 'completed'
    const allKeys = Object.keys(localStorage);
    const completedKeys = allKeys.filter(key => 
        key.startsWith('status_') && localStorage.getItem(key) === 'completed'
    );

    const topicCards = document.querySelectorAll('.topic-grid .topic-card');
    
    subjects.forEach((subject, index) => {
        // --- 1. Get Totals from LocalStorage ---
        const storedTotal = localStorage.getItem(`total_questions_${subject.id}`);
        const inheritedTotal = parseInt(storedTotal) || 0; 
        
        let subjectCompleted = 0;

        // --- 2. Calculate Completed for this Subject ---
        completedKeys.forEach(key => {
            if (subject.folders.some(folder => key.toLowerCase().includes(folder.toLowerCase()))) {
                subjectCompleted++;
            }
        });

        // Safety: Completed should not exceed total
        if (inheritedTotal > 0) subjectCompleted = Math.min(subjectCompleted, inheritedTotal);

        const subjectPercent = inheritedTotal > 0 ? Math.round((subjectCompleted / inheritedTotal) * 100) : 0;
        
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
    const globalPercent = grandTotalQuestions > 0 ? Math.round((grandTotalCompleted / grandTotalQuestions) * 100) : 0;
    
    // Update text percentage
    const globalPercentDisplay = document.getElementById('overall-percent');
    if (globalPercentDisplay) globalPercentDisplay.innerText = `${globalPercent}%`;

    // Update bar width
    const globalBarFill = document.querySelector('.main-progress .progress-bar-fill');
    if (globalBarFill) {
        globalBarFill.style.width = `${globalPercent}%`;
        // Use green fill for high contrast inside the violet card
        globalBarFill.style.backgroundColor = '#4CAF50'; 
    }
}