const notesDisplay = document.getElementById("notesDisplay");
const editNotesButton = document.getElementById("editNotesButton");
const notesDialog = document.getElementById("notesDialog");
const notesForm = document.getElementById("notesForm");
const notesTextarea = document.getElementById("notesTextarea");
const cancelNotesButton = document.getElementById("cancelNotesButton");

function initializeNotes() {
    editNotesButton.addEventListener(
        "click",
        openNotesDialog
    );
    cancelNotesButton.addEventListener(
        "click",
        closeNotesDialog
    );
    notesForm.addEventListener(
        "submit",
        saveNotes
    );
}

function renderNotes(project) {
    const notes = project.project.notes.trim();

    notesDisplay.textContent = notes || "No notes yet.";
}

function openNotesDialog() {
    notesTextarea.value = currentProject.project.notes;
    notesDialog.showModal();
    notesTextarea.focus();
}

function closeNotesDialog() {
    notesDialog.close();
}

function saveNotes(event) {
    event.preventDefault();
    currentProject.project.notes = notesTextarea.value.trim();

    saveProject();
    closeNotesDialog();
    renderNotes(currentProject);
    renderProjectInfo(currentProject);
}

initializeNotes();
