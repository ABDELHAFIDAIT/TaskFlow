// Fonction permettant d'ouvrir le Formulaire pour Ajouter une Tache
function ouvrirPopup() {
    document.getElementById('add-task-popup').classList.remove('hidden');
}


// Fonction permettant de fermer le Formulaire d'Ajout d'une Tache lors de clique sur "Annuler" ou bien après la création de la tache
function fermerPopup() {
    document.getElementById('add-task-popup').classList.add('hidden');
}


//Fonction de Création du "div" d'une Nouvelle Tache
function creerTache(titre, priority, date , tache){
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
                                    <button type="button" id="btn-delete" class="py-1 px-2 bg-gray-900 text-white rounded-sm">Supprimer</button>
                                </div>
                            </div>` ;
}


//Fonction permettant de définir le couleur de border-left selon la priorité de la tache
function themePriority(priority, tache){
    if(priority == "P1"){
        tache.classList.add('border-l-8', 'border-red-600');
    }else if(priority == "P2"){
        tache.classList.add('border-l-8', 'border-orange-400');
    }else{
        tache.classList.add('border-l-8', 'border-green-600');
    }
}


//Fonction permettant d'ajouter une Nouvelle Tache à la liste convenable (toDo, Doing, Done)
function ajouterTache(){
    const formulaire = document.getElementById("add-task-form");
    const titre = formulaire['titre'].value;
    const description = formulaire['description'].value;
    const status = formulaire['status'].value;
    const priority = formulaire['priority'].value;
    const date = formulaire['date'].value;

    const validation = validerForm(titre, description);

    if(validation==1){
        if(status == "To Do"){
            var list = document.getElementById('to-do-tasks');
        }else if(status == "Doing"){
            var list = document.getElementById('doing-tasks');
        }else{
            var list = document.getElementById('done-tasks');
        }
    
        const tache = document.createElement('div');
    
        creerTache(titre , priority , date, tache);
    
        list.appendChild(tache);
        formulaire.reset();
        fermerPopup();
    
        themePriority(priority , tache);
    
        supprimerTache(tache);
    }

    
}


//Fonction permettant de Supprimer une tache
function supprimerTache(tache){
    tache.querySelector("#btn-delete").addEventListener("click", function(){
        const confirmation = confirm("Do you really want to delete this task ?");
        if(confirmation==true){
            tache.remove();
        }
    })
}


//Fonction de Validation des Champs de Formulaire d'Ajout d'une Nouvelle Tache
function validerForm(titre, description) {
    let valid = 1;
    titre = titre.trim();
    description = description.trim();

    if (titre.length == 0) {
        document.getElementById("titre").classList.add("placeholder:text-red-600", "placeholder:font-medium");
        valid = 0 ;
        return valid ;
    }else{
        document.getElementById("titre").classList.remove("placeholder:text-red-600", "placeholder:font-medium");
    }

    if (description.length == 0) {
        document.getElementById("description").classList.add("placeholder:text-red-600", "placeholder:font-medium");
        valid = 0 ;
        return valid ;
    }else{
        document.getElementById("description").classList.remove("placeholder:text-red-600", "placeholder:font-medium");
    }

    return valid; 
}