function ouvrirPopup() {
    document.getElementById('add-task-popup').classList.remove('hidden');
}

function fermerPopup() {
    document.getElementById('add-task-popup').classList.add('hidden');
}

function creerCard(titre, priority, date , tache){
    tache.className = "to-do-card bg-white h-36 m-2 rounded-md flex flex-col justify-between p-3";
        
    tache.innerHTML = `<h1 class="font-medium cursor-pointer">${titre}</h1>
                            
                            <div class="flex items-center gap-5">
                                <svg width="24px" height="64px" viewBox="0 0 1024 1024" class="icon" version="1.1" xmlns="http://www.w3.org/2000/svg" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M960 224v608c0 35.3-28.7 64-64 64H128c-35.3 0-64-28.7-64-64V224c0-17.7 14.3-32 32-32h832c17.7 0 32 14.3 32 32z" fill="#3D5AFE"></path><path d="M832 480.2c0 17.7-14.3 32-32 32H224c-17.7 0-32-14.3-32-32s14.3-32 32-32h576c17.7 0 32 14.4 32 32zM832 672.2c0 17.7-14.3 32-32 32H224c-17.7 0-32-14.3-32-32s14.3-32 32-32h576c17.7 0 32 14.4 32 32z" fill="#FFEA00"></path><path d="M224 319.8c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32s32 14.3 32 32v127.8c0 17.7-14.3 32-32 32zM800 319.8c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32s32 14.3 32 32v127.8c0 17.7-14.3 32-32 32z" fill="#536DFE"></path><path d="M660.8 704.3H224c-17.7 0-32-14.3-32-32s14.3-32 32-32h461.4c12.1-40.6 18.6-83.5 18.6-128H224c-17.7 0-32-14.3-32-32s14.3-32 32-32h475.5c-14.2-99.8-61.3-189-130-256.3H256v95.8c0 17.7-14.3 32-32 32s-32-14.3-32-32V192H96c-17.7 0-32 14.3-32 32v608c0 35.3 28.7 64 64 64h358.9c75.1-45.2 135.9-112 173.9-191.7z" fill="#536DFE"></path><path d="M192 480.3c0 17.7 14.3 32 32 32h480v-0.2c0-21.6-1.5-42.9-4.5-63.8H224c-17.7 0-32 14.3-32 32zM192 672.3c0 17.7 14.3 32 32 32h436.8c9.8-20.5 18-41.9 24.6-64H224c-17.7 0-32 14.3-32 32z" fill="#FFFF00"></path><path d="M192 287.8c0 17.7 14.3 32 32 32s32-14.3 32-32V192h-64v95.8z" fill="#8C9EFF"></path></g></svg>
                                <h1>${date}</h1>
                            </div>

                            <div class="flex justify-between">
                                <h1>${priority}</h1>
                                <div>
                                    <button type="button" class="py-1 px-2 bg-yellow-500 rounded-sm">Modifier</button>
                                    <button type="button" class="py-1 px-2 bg-gray-900 text-white rounded-sm">Supprimer</button>
                                </div>
                            </div>` ;
}

function themePriority(priority, tache){
    if(priority == "P1"){
        tache.classList.add('border-l-8');
        tache.classList.add('border-red-600');
    }else if(priority == "P2"){
        tache.classList.add('border-l-8');
        tache.classList.add('border-orange-400');
    }else{
        tache.classList.add('border-l-8');
        tache.classList.add('border-green-600');
    }
}

function ajouterTache(){
    const tacheForm = document.getElementById("add-task-form");
    const titre = tacheForm['titre'].value;
    const description = tacheForm['description'].value;
    const status = tacheForm['status'].value;
    const priority = tacheForm['priority'].value;
    const date = tacheForm['date'].value;

    if(status == "To Do"){
        const toDoList = document.getElementById('to-do-tasks');
        const toDoTache = document.createElement('div');

        creerCard(titre , priority , date, toDoTache);

        toDoList.appendChild(toDoTache);
        tacheForm.reset();
        fermerPopup();

        themePriority(priority , toDoTache);

    }else if(status == "Doing"){
        const doingList = document.getElementById('doing-tasks');
        const doingTache = document.createElement('div');

        creerCard(titre , priority , date, doingTache);

        doingList.appendChild(doingTache);
        tacheForm.reset();
        fermerPopup();

        themePriority(priority , doingTache);
    }else{
        const doneList = document.getElementById('done-tasks');
        const doneTache = document.createElement('div');

        creerCard(titre , priority , date, doneTache);

        doneList.appendChild(doneTache);
        tacheForm.reset();
        fermerPopup();

        themePriority(priority , doneTache);
    }
}