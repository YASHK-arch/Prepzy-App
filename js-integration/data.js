/**
 * data.js
 * Handles dynamic progress calculation on subject pages (java.html, js.html, etc.)
 * Reports total counts to the main dashboard.
 */

window.addEventListener('load', function() {
    updateDynamicProgress();
});

function updateDynamicProgress() {
    const topicGroups = document.querySelectorAll('.topic-group');
    const allQuestionsOnPage = document.querySelectorAll('.question-item');
    
    // -------------------------------------------------------------------------
    // 1. REPORT TOTALS TO DASHBOARD
    // -------------------------------------------------------------------------
    // Extract subject name from filename (e.g., "java.html" -> "java")
    const pathParts = window.location.pathname.split("/");
    const subjectName = pathParts.pop().replace(".html", ""); 
    
    // Save the count of all .question-item elements for the main index page to inherit
    localStorage.setItem(`total_questions_${subjectName}`, allQuestionsOnPage.length);

    // -------------------------------------------------------------------------
    // 2. CALCULATE PROGRESS FOR THIS PAGE
    // -------------------------------------------------------------------------
    let totalQuestionsCount = 0;
    let totalCompletedCount = 0;

    topicGroups.forEach(function(group){
        const questionsInGroup = group.querySelectorAll('.question-item');
        if (questionsInGroup.length === 0) return;

        let groupCompleted = 0;
        let groupTotal = questionsInGroup.length;

        questionsInGroup.forEach(function(q){
            const link = q.querySelector('a');
            if (link) {
                const hrefPath = link.getAttribute('href');
                if (hrefPath && hrefPath !== "") {
                    // Extract folder and filename from the link href to match storageKey
                    const parts = hrefPath.split("/");
                    const fileName = parts.pop(); 
                    const folderName = decodeURIComponent(parts.pop()); 
                    
                    const storageKey = `status_${folderName}_${fileName}`;

                    if (localStorage.getItem(storageKey) === 'completed') {
                        groupCompleted++;
                        
                        // Add green checkmark UI feedback
                        const qName = q.querySelector('.q-name');
                        if (qName && !qName.innerHTML.includes('fa-circle-check')) {
                            qName.style.color = '#4CAF50';
                            qName.innerHTML += ' <i class="fa-solid fa-circle-check" style="margin-left: 8px;"></i>';
                        }
                    }
                }
            }
        });

        // Update Topic Group UI (Individual folder bars)
        const groupPercentage = Math.round((groupCompleted / groupTotal) * 100);
        const barFill = group.querySelector('.item-bar-fill');
        const percentageText = group.querySelector('.percentage');

        if (barFill) barFill.style.width = groupPercentage + "%";
        if (percentageText) {
            percentageText.innerText = `${groupCompleted} of ${groupTotal} completed (${groupPercentage}%)`;
        }

        totalQuestionsCount += groupTotal;
        totalCompletedCount += groupCompleted;
    });

    // -------------------------------------------------------------------------
    // 3. UPDATE SUBJECT HEADER STATS
    // -------------------------------------------------------------------------
    const overallPercentage = totalQuestionsCount > 0 ? Math.round((totalCompletedCount / totalQuestionsCount) * 100) : 0;
    const overallFill = document.querySelector('.progress-fill');
    const statsText = document.querySelector('.stats-text');

    if (overallFill) overallFill.style.width = overallPercentage + "%";
    if (statsText) {
        statsText.innerHTML = `
            <span>Overall Progress: ${totalCompletedCount} completed out of ${totalQuestionsCount} questions</span>
            <span>${totalCompletedCount} of ${totalQuestionsCount} completed (${overallPercentage}%)</span>
        `;
    }
    
    console.log(`Sync complete for ${subjectName}: Reporting ${allQuestionsOnPage.length} total questions.`);
}