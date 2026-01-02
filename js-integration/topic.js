//create a sub-topic question list of each topic as somewhat like a dropdown but working through a js mechanism

const viewButtons = document.querySelectorAll('.view-btn');
let AllTopicGrps = document.querySelectorAll('.topic-group');
            AllTopicGrps.forEach(function(grp){
                grp.classList.add('active');
            })
viewButtons.forEach(function(button){
    button.addEventListener('click', function(){
        let parentCont = button.closest('.topic-group');
        let targetSubMenu = parentCont.querySelector('.sub-menu');
        
        let isCurrentlyOpen = targetSubMenu.classList.contains('active');
       
        if(isCurrentlyOpen){
            targetSubMenu.classList.remove('active');
            button.innerText = 'View';
            AllTopicGrps.forEach(function(grp){
                grp.classList.add('active');
            })
        }
        else{
            AllTopicGrps.forEach(function(grp){
                grp.classList.remove('active');
            })
            targetSubMenu.classList.add('active');
            parentCont.classList.add('active')
            
            button.innerText = 'Close';
        }
    })
})