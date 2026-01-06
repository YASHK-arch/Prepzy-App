window.addEventListener('load', function() {
    updateDynamicProgress();
});

function updateDynamicProgress() {
    const topicGroups = document.querySelectorAll('.topic-group');
    const allQuestionsOnPage = document.querySelectorAll('.question-item');

    const pathParts = window.location.pathname.split("/");
    const subjectName = pathParts.pop().replace(".html", ""); 

    localStorage.setItem(`total_questions_${subjectName}`, allQuestionsOnPage.length);

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
                    const parts = hrefPath.split("/");
                    const fileName = parts.pop(); 
                    const folderName = decodeURIComponent(parts.pop()); 
                    
                    const storageKey = `status_${folderName}_${fileName}`;

                    if (localStorage.getItem(storageKey) === 'completed') {
                        groupCompleted++;
                        
                        const qName = q.querySelector('.q-name');
                        if (qName && !qName.innerHTML.includes('fa-circle-check')) {
                            qName.style.color = '#4CAF50';
                            qName.innerHTML += ' <i class="fa-solid fa-circle-check" style="margin-left: 8px;"></i>';
                        }
                    }
                }
            }
        });

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
