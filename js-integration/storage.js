document.addEventListener('DOMContentLoaded', function(){
    const doneBtn = document.querySelector('.done');
    const doneStatus = document.querySelector('.done-status');
    
    const pathParts = window.location.pathname.split("/");
    const fileName = pathParts.pop();
    const folderName = decodeURIComponent(pathParts.pop());
    
    const storageKey = `status_${folderName}_${fileName}`;

    if (localStorage.getItem(storageKey) === 'completed') {
        if (doneStatus) doneStatus.style.display = 'block';
        if (doneBtn) {
            doneBtn.innerText = "COMPLETED ✅";
            doneBtn.style.opacity = "0.6";
            doneBtn.style.pointerEvents = "none";
        }
    }

    if (doneBtn) {
        doneBtn.addEventListener('click', function(){
            localStorage.setItem(storageKey, 'completed');
            
            if (doneStatus) doneStatus.style.display = 'block';
            
            doneBtn.innerText = "SAVED ✅";
            doneBtn.style.backgroundColor = "#4CAF50";
            doneBtn.style.opacity = "1";
            
            console.log(`Progress saved for: ${folderName} -> ${fileName}`);
        });
    }
});
