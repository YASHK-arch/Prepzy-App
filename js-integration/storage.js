/**
 * storage.js
 * Handles saving individual question progress using unique Topic + File keys.
 */

document.addEventListener('DOMContentLoaded', () => {
    const doneBtn = document.querySelector('.done');
    const doneStatus = document.querySelector('.done-status');
    
    // 1. Generate a unique key using FolderName + FileName
    // Example: /JAVA/Prefix%20sum/Q1.html -> ["JAVA", "Prefix sum", "Q1.html"]
    const pathParts = window.location.pathname.split("/");
    const fileName = pathParts.pop();             // e.g., "Q1.html"
    const folderName = decodeURIComponent(pathParts.pop()); // e.g., "Prefix sum"
    
    // The unique key prevents conflicts between different topics
    const storageKey = `status_${folderName}_${fileName}`; 

    // 2. Check if already completed on load to update UI
    if (localStorage.getItem(storageKey) === 'completed') {
        if (doneStatus) doneStatus.style.display = 'block';
        if (doneBtn) {
            doneBtn.innerText = "COMPLETED ✅";
            doneBtn.style.opacity = "0.6";
            doneBtn.style.pointerEvents = "none"; // Optional: disable further clicks
        }
    }

    // 3. Save progress when 'Done' is clicked
    if (doneBtn) {
        doneBtn.addEventListener('click', () => {
            localStorage.setItem(storageKey, 'completed');
            
            if (doneStatus) doneStatus.style.display = 'block';
            
            doneBtn.innerText = "SAVED ✅";
            doneBtn.style.backgroundColor = "#4CAF50";
            doneBtn.style.opacity = "1";
            
            console.log(`Progress saved for: ${folderName} -> ${fileName}`);
        });
    }
});