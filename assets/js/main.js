//Fonction permettant de définir un min pour la Date d'une Tache
const today = new Date().toISOString().split("T")[0];
document.getElementById("date").setAttribute("min", today);
document.getElementById("edit-date").setAttribute("min", today);



// Fonction permettant d'ouvrir le Formulaire pour Ajouter une Tache
function ouvrirPopup() {
    document.getElementById('add-task-popup').classList.remove('hidden');
}


// Fonction permettant de fermer le Formulaire d'Ajout d'une Tache lors de clique sur "Annuler" ou bien après la création de la tache
function fermerPopup() {
    document.getElementById('add-task-popup').classList.add('hidden');
}


//Fonction de Création du "div" d'une Nouvelle Tache
function creerTache(titre, description, priority, date, status, tache) {
    tache.className = "to-do-card bg-white m-2 rounded-md flex flex-col justify-between p-3";

    tache.innerHTML = `<h1 id="display" class="task-title font-medium cursor-pointer hover:underline hover:text-blue-500">${titre}</h1>
                       <p class="task-description hidden">${description}</p>
                            <div class="flex items-center gap-5">
                                <svg width="24px" height="64px" viewBox="0 0 1024 1024" class="icon" version="1.1" xmlns="http://www.w3.org/2000/svg" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M960 224v608c0 35.3-28.7 64-64 64H128c-35.3 0-64-28.7-64-64V224c0-17.7 14.3-32 32-32h832c17.7 0 32 14.3 32 32z" fill="#3D5AFE"></path><path d="M832 480.2c0 17.7-14.3 32-32 32H224c-17.7 0-32-14.3-32-32s14.3-32 32-32h576c17.7 0 32 14.4 32 32zM832 672.2c0 17.7-14.3 32-32 32H224c-17.7 0-32-14.3-32-32s14.3-32 32-32h576c17.7 0 32 14.4 32 32z" fill="#FFEA00"></path><path d="M224 319.8c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32s32 14.3 32 32v127.8c0 17.7-14.3 32-32 32zM800 319.8c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32s32 14.3 32 32v127.8c0 17.7-14.3 32-32 32z" fill="#536DFE"></path><path d="M660.8 704.3H224c-17.7 0-32-14.3-32-32s14.3-32 32-32h461.4c12.1-40.6 18.6-83.5 18.6-128H224c-17.7 0-32-14.3-32-32s14.3-32 32-32h475.5c-14.2-99.8-61.3-189-130-256.3H256v95.8c0 17.7-14.3 32-32 32s-32-14.3-32-32V192H96c-17.7 0-32 14.3-32 32v608c0 35.3 28.7 64 64 64h358.9c75.1-45.2 135.9-112 173.9-191.7z" fill="#536DFE"></path><path d="M192 480.3c0 17.7 14.3 32 32 32h480v-0.2c0-21.6-1.5-42.9-4.5-63.8H224c-17.7 0-32 14.3-32 32zM192 672.3c0 17.7 14.3 32 32 32h436.8c9.8-20.5 18-41.9 24.6-64H224c-17.7 0-32 14.3-32 32z" fill="#FFFF00"></path><path d="M192 287.8c0 17.7 14.3 32 32 32s32-14.3 32-32V192h-64v95.8z" fill="#8C9EFF"></path></g></svg>
                                <h1 class="task-date">${date}</h1>
                            </div>

                            <div class="flex justify-between">
                                <h1 class="task-priority">${priority}</h1>
                                <p class="task-status hidden">${status}</p>
                                <div>
                                    <button type="button" id="btn-edit" class="py-1 px-2 bg-yellow-500 rounded-sm">Modifier</button>
                                    <button type="button" id="btn-delete" class="py-1 px-2 bg-gray-900 text-white rounded-sm">Supprimer</button>
                                </div>
                            </div>` ;
}


//Fonction permettant de définir le couleur de border-left selon la priorité de la tache
function themePriority(priority, tache) {
    if (priority == "P1") {
        tache.classList.add('border-l-8', 'border-red-600');
    } else if (priority == "P2") {
        tache.classList.add('border-l-8', 'border-orange-400');
    } else {
        tache.classList.add('border-l-8', 'border-green-600');
    }
}


//Fonction permettant d'ajouter une Nouvelle Tache à la liste convenable (toDo, Doing, Done)
function ajouterTache() {
    const formulaire = document.getElementById("add-task-form");
    const titre = formulaire['titre'].value;
    const description = formulaire['description'].value;
    const status = formulaire['status'].value;
    const priority = formulaire['priority'].value;
    const date = formulaire['date'].value;

    const validation = validerForm(titre, description, date);

    if (validation == 1) {
        if (status == "To Do") {
            var list = document.getElementById('to-do-tasks');
        } else if (status == "Doing") {
            var list = document.getElementById('doing-tasks');
        } else {
            var list = document.getElementById('done-tasks');
        }

        const tache = document.createElement('div');

        creerTache(titre, description, priority, date, status, tache);

        list.appendChild(tache);
        formulaire.reset();
        fermerPopup();

        updateCompteur();

        themePriority(priority, tache);

        afficherDetails(tache, titre, description, status, priority, date);

        modifierTache(tache);

        supprimerTache(tache);

        supprimerListe();
    }
}


//Fonction de Mise à Jour des Compteurs de Chaque Liste
function updateCompteur() {
    document.getElementById('to-do-list').querySelector(".count").textContent = document.getElementById("to-do-tasks").childElementCount;
    document.getElementById('doing-list').querySelector(".count").textContent = document.getElementById("doing-tasks").childElementCount;
    document.getElementById('done-list').querySelector(".count").textContent = document.getElementById("done-tasks").childElementCount;
}


//Fonction permettant d'Afficher les détails d'une tache
function afficherDetails(tache, titre, description, status, priority, date) {
    tache.querySelector("#display").addEventListener("click", function () {
        document.getElementById("details-title").textContent = titre;
        document.getElementById("details-description").textContent = description;
        document.getElementById("details-status").textContent = status;
        document.getElementById("details-priority").textContent = priority;
        document.getElementById("details-date").textContent = date;
        document.getElementById("display-details").classList.remove("hidden");
    });

    document.getElementById("close-display").onclick = function () {
        document.getElementById("display-details").classList.add("hidden");
    }
}


//Fonction de Modification d'une Tache
function modifierTache(tache) {
    const editForm = document.getElementById("edit-task-form");
    tache.querySelector("#btn-edit").addEventListener("click", function () {

        let editTitre = tache.querySelector(".task-title");
        let editDescription = tache.querySelector(".task-description");
        let editPriority = tache.querySelector(".task-priority");
        let editStatus = tache.querySelector(".task-status");
        let editDate = tache.querySelector(".task-date");

        const newTitre = editForm.querySelector("#edit-title");
        const newDesc = editForm.querySelector("#edit-description");
        const newStatus = editForm.querySelector("#edit-status");
        const newPriority = editForm.querySelector("#edit-priority");
        const newDate = editForm.querySelector("#edit-date");

        newTitre.value = editTitre.textContent;
        newDesc.value = editDescription.textContent;
        newStatus.value = editStatus.textContent;
        newPriority.value = editPriority.textContent;
        newDate.value = editDate.textContent;

        document.getElementById("edit-task-popup").classList.remove("hidden");

        editForm.querySelector("#btn-confirm-edit").onclick = function () {
            const validEdit = validerEditForm(newTitre.value, newDesc.value, newDate.value);
            if (validEdit == 1) {
                editTitre.textContent = newTitre.value;
                editDescription.textContent = newDesc.value;
                editPriority.textContent = newPriority.value;
                editDate.textContent = newDate.value;
                editStatus.textContent = newStatus.value;

                if (newStatus.value == "To Do") {
                    document.getElementById('to-do-tasks').appendChild(tache);
                } else if (newStatus.value == "Doing") {
                    document.getElementById('doing-tasks').appendChild(tache);
                } else {
                    document.getElementById('done-tasks').appendChild(tache);
                }

                if (newPriority.value == "P1") {
                    tache.classList.add('border-red-600');
                    tache.classList.remove('border-orange-400');
                    tache.classList.remove('border-green-600');
                } else if (newPriority.value == "P2") {
                    tache.classList.add('border-orange-400');
                    tache.classList.remove('border-red-600');
                    tache.classList.remove('border-green-600');
                } else {
                    tache.classList.add('border-green-600');
                    tache.classList.remove('border-orange-400');
                    tache.classList.remove('border-red-600');
                }

                document.getElementById("edit-task-popup").classList.add("hidden");
                editForm.reset();

                afficherDetails(tache, editTitre.textContent, editDescription.textContent, editStatus.textContent, editPriority.textContent, editDate.textContent);

                updateCompteur();
            }
        }
    });

    document.getElementById("btn-cancel-edit").onclick = function () {
        document.getElementById("edit-task-popup").classList.add("hidden");
        editForm.reset();
    }
}


//Fonction permettant de Supprimer une tache
function supprimerTache(tache) {
    tache.querySelector("#btn-delete").addEventListener("click", function () {
        const confirmation = confirm("Do you really want to delete this task ?");
        if (confirmation == true) {
            tache.remove();
            updateCompteur();
        }
    })
}


//Fonction permettant de Supprimer tous les Taches d'une Liste
function supprimerListe() {
    //Vider la Liste To Do
    if(document.getElementById('to-do-list').querySelector(".count").innerHTML !== "0") {
        document.querySelector("#clear-todo-list").onclick = function () {
            const valid = confirm("Voulez-vous vraiment supprimer toutes les Taches de cette liste ?");
            if (valid) {
                document.getElementById("to-do-tasks").innerHTML = "";
                updateCompteur();
            }
        }
    }
    //Vider la Liste Doing
    if(document.getElementById('doing-list').querySelector(".count").innerHTML !== "0") {
        document.querySelector("#clear-doing-list").onclick = function () {
            const valid = confirm("Voulez-vous vraiment supprimer toutes les Taches de cette liste ?");
            if (valid) {
                document.getElementById("doing-tasks").innerHTML = "";
                updateCompteur();
            }
        }
    }
    //Vider la Liste Done
    if(document.getElementById('done-list').querySelector(".count").innerHTML !== "0") {
        document.querySelector("#clear-done-list").onclick = function () {
            const valid = confirm("Voulez-vous vraiment supprimer toutes les Taches de cette liste ?");
            if (valid) {
                document.getElementById("done-tasks").innerHTML = "";
                updateCompteur();
            }
        }
    }
}


//Fonction de Validation des Champs de Formulaire d'Ajout d'une Nouvelle Tache
function validerForm(titre, description, date) {
    let valid = 1;
    titre = titre.trim();
    description = description.trim();

    if (titre.length == 0) {
        document.getElementById("titre").classList.add("placeholder:text-red-600", "placeholder:font-medium");
        valid = 0;
        return valid;
    } else {
        document.getElementById("titre").classList.remove("placeholder:text-red-600", "placeholder:font-medium");
    }

    if (description.length == 0) {
        document.getElementById("description").classList.add("placeholder:text-red-600", "placeholder:font-medium");
        valid = 0;
        return valid;
    } else {
        document.getElementById("description").classList.remove("placeholder:text-red-600", "placeholder:font-medium");
    }

    if (!date) {
        document.getElementById("date").classList.add("text-red-600", "font-medium");
        valid = 0;
        return valid;
    } else {
        document.getElementById("date").classList.remove("text-red-600", "font-medium");
    }

    return valid;
}


//Fonction de Validation des Champs de Formulaire de Modification d'une Nouvelle Tache
function validerEditForm(titre, description, date) {
    let valid = 1;
    titre = titre.trim();
    description = description.trim();

    if (titre.length == 0) {
        document.getElementById("edit-title").classList.add("placeholder:text-red-600", "placeholder:font-medium");
        valid = 0;
        return valid;
    } else {
        document.getElementById("edit-title").classList.remove("placeholder:text-red-600", "placeholder:font-medium");
    }

    if (description.length == 0) {
        document.getElementById("edit-description").classList.add("placeholder:text-red-600", "placeholder:font-medium");
        valid = 0;
        return valid;
    } else {
        document.getElementById("edit-description").classList.remove("placeholder:text-red-600", "placeholder:font-medium");
    }

    if (!date) {
        document.getElementById("edit-date").classList.add("text-red-600", "font-medium");
        valid = 0;
        return valid;
    } else {
        document.getElementById("edit-date").classList.remove("text-red-600", "font-medium");
    }

    return valid;
}
