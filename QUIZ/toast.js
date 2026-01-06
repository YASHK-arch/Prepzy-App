let milestoneToast = null;

function showToast(message, type = "info") {
    const container = document.getElementById("toast-container");
    if (!container || milestoneToast) return;

    const toast = document.createElement("div");
    toast.className = `toast ${type}`;

    toast.innerHTML = `
        <span>${message}</span>
        <div class="close">&times;</div>
    `;

    toast.querySelector(".close").onclick = () => {
        toast.remove();
        milestoneToast = null;
    };

    container.appendChild(toast);
    milestoneToast = toast;
}

function removeToast() {
    if (milestoneToast) {
        milestoneToast.remove();
        milestoneToast = null;
    }
}

(function watchDSAProgress() {

    const interval = setInterval(() => {

        const dsaCard = document.querySelector('.topic-grid .topic-card');
        if (!dsaCard) return;

        const percentLabel = dsaCard.querySelector('.percentage-label');
        if (!percentLabel) return;

        const percent = parseInt(percentLabel.innerText);
        console.log("DSA Progress:", percent);

        if (!isNaN(percent) && percent >= 60) {
            showToast("🎉 DSA Milestone Quiz Unlocked!", "success");
        } else {
            removeToast();
        }

    }, 300);

})();
