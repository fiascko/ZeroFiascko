const projectInfoTitleDisplay = document.getElementById("projectInfoTitleDisplay");
const projectInfoDescriptionDisplay = document.getElementById("projectInfoDescriptionDisplay");
const projectCreatedAt = document.getElementById("projectCreatedAt");
const projectUpdatedAt = document.getElementById("projectUpdatedAt");
const editProjectInfoButton = document.getElementById("editProjectInfoButton");
const projectInfoDialog = document.getElementById("projectInfoDialog");
const projectInfoForm = document.getElementById("projectInfoForm");
const projectInfoTitle = document.getElementById("projectInfoTitle");
const projectInfoDescription = document.getElementById("projectInfoDescription");
const cancelProjectInfoButton = document.getElementById("cancelProjectInfoButton");

function initializeProjectInfo() {
    editProjectInfoButton.addEventListener(
        "click",
        openProjectInfoDialog
    );
    cancelProjectInfoButton.addEventListener(
        "click",
        closeProjectInfoDialog
    );
    projectInfoForm.addEventListener(
        "submit",
        saveProjectInfo
    );
}

function renderProjectInfo(project) {
    projectInfoTitleDisplay.textContent = project.project.title;
    projectInfoDescriptionDisplay.textContent = project.project.description || "No description.";
    projectCreatedAt.textContent = formatProjectDate(project.project.createdAt);
    projectUpdatedAt.textContent = formatProjectDate(project.project.updatedAt);
}

function formatProjectDate(date) {
    return new Date(date).toLocaleString();
}

function openProjectInfoDialog() {
    projectInfoTitle.value = currentProject.project.title;
    projectInfoDescription.value = currentProject.project.description;
    projectInfoDialog.showModal();
    projectInfoTitle.focus();
}

function closeProjectInfoDialog() {
    projectInfoDialog.close();
}

function saveProjectInfo(event) {
    event.preventDefault();
    const title = projectInfoTitle.value.trim();
    const description = projectInfoDescription.value.trim();

    if (!title) {
        return;
    }

    currentProject.project.title = title;
    currentProject.project.description = description;

    saveProject();
    projectTitle.textContent = currentProject.project.title;

    closeProjectInfoDialog();
    renderProjectInfo(currentProject);
}

initializeProjectInfo();
