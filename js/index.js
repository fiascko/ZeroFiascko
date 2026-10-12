const newProjectButton = document.getElementById("newProjectButton");
const openProjectButton = document.getElementById("openProjectButton");
const projectFileInput = document.getElementById("projectFileInput");
const newProjectDialog = document.getElementById("newProjectDialog");
const newProjectForm = document.getElementById("newProjectForm");
const projectTitleInput = document.getElementById("projectTitle");
const cancelProjectButton = document.getElementById("cancelProjectButton");

function initializeIndex() {
    newProjectButton.addEventListener(
        "click",
        openNewProjectDialog
    );
    cancelProjectButton.addEventListener(
        "click",
        closeNewProjectDialog
    );
    newProjectForm.addEventListener(
        "submit",
        createNewProject
    );
    openProjectButton.addEventListener(
        "click",
        openProjectFilePicker
    );
    projectFileInput.addEventListener(
        "change",
        openExistingProject
    );
}

function openNewProjectDialog() {
    projectTitleInput.value = "";
    newProjectDialog.showModal();
    projectTitleInput.focus();
}

function closeNewProjectDialog() {
    newProjectDialog.close();
}

function createNewProject(event) {
    event.preventDefault();

    const title = projectTitleInput.value.trim();

    if (!title) {
        return;
    }

    const project = createProject(title);
    saveProjectToLocalStorage(project);
    openDashboard();
}

function openProjectFilePicker() {
    projectFileInput.click();
}

async function openExistingProject() {
    const file = projectFileInput.files[0];

    if (!file) {
        return;
    }

    try {
        const project = await loadProjectFile(file);
        saveProjectToLocalStorage(project);
        openDashboard();
    }
    catch {
        showAlert(
            "Invalid Project",
            "This file is not a valid ZeroFiascko project."
        );
    }
    finally {
        projectFileInput.value = "";
    }
}

function openDashboard() {
    window.location.href = "./dashboard.html";
}

initializeIndex();
