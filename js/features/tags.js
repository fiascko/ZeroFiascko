
const manageTagsButton = document.getElementById("manageTagsButton");
const tagsDialog = document.getElementById("tagsDialog");
const tagForm = document.getElementById("tagForm");
const tagNameInput = document.getElementById("tagName");
const tagsList = document.getElementById("tagsList");
const saveTagButton = document.getElementById("saveTagButton");
const cancelTagEditButton = document.getElementById("cancelTagEditButton");
const closeTagsButton = document.getElementById("closeTagsButton");

let selectedTag = null;

function initializeTags() {
    manageTagsButton.addEventListener("click", openTagsDialog);
    closeTagsButton.addEventListener("click", closeTagsDialog);
    cancelTagEditButton.addEventListener("click", resetTagForm);
    tagForm.addEventListener("submit", saveTag);
}

function openTagsDialog() {
    resetTagForm();
    renderTags();
    tagsDialog.showModal();
    tagNameInput.focus();
}

function closeTagsDialog() {
    tagsDialog.close();
    resetTagForm();
}

function renderTags() {
    tagsList.replaceChildren();

    currentProject.tags.forEach((tag) => {
        tagsList.appendChild(createTagElement(tag));
    });
}

function createTagElement(tag) {
    const element = document.createElement("div");
    element.className = "tag-item";

    const name = document.createElement("span");
    name.className = "tag-name";
    name.textContent = tag.name;

    const actions = document.createElement("div");
    actions.className = "tag-actions";

    const editButton = document.createElement("button");
    editButton.className = "btn btn-secondary";
    editButton.type = "button";
    editButton.textContent = "Rename";
    editButton.addEventListener("click", () => editTag(tag));

    const deleteButton = document.createElement("button");
    deleteButton.className = "btn btn-danger";
    deleteButton.type = "button";
    deleteButton.textContent = "Delete";
    deleteButton.addEventListener("click", () => deleteTag(tag));

    actions.appendChild(editButton);
    actions.appendChild(deleteButton);

    element.appendChild(name);
    element.appendChild(actions);

    return element;
}

function editTag(tag) {
    selectedTag = tag;
    tagNameInput.value = tag.name;
    saveTagButton.textContent = "Save";
    cancelTagEditButton.hidden = false;
    tagNameInput.focus();
}

function resetTagForm() {
    selectedTag = null;
    tagForm.reset();
    saveTagButton.textContent = "Add Tag";
    cancelTagEditButton.hidden = true;
}

function saveTag(event) {
    event.preventDefault();

    const name = tagNameInput.value.trim();

    if (!name) {
        return;
    }

    const duplicate = currentProject.tags.some((tag) =>
        tag.name.toLowerCase() === name.toLowerCase() &&
        tag.id !== selectedTag?.id
    );

    if (duplicate) {
        showAlert(
            "Tag Already Exists",
            "A tag with this name already exists. Please choose a different name."
        );
        return;
    }

    if (selectedTag) {
        selectedTag.name = name;
    }
    else {
        currentProject.tags.push({
            id: generateTagId(),
            name: name
        });
    }

    saveProject();
    renderDashboard();
    renderTags();
    resetTagForm();
}

function generateTagId() {
    let index = 1;

    while (currentProject.tags.some((tag) => tag.id === `Tag${index}`)) {
        index++;
    }

    return `Tag${index}`;
}

function deleteTag(tag) {
    currentProject.tags = currentProject.tags.filter(
        (item) => item.id !== tag.id
    );

    currentProject.cards.forEach((card) => {
        card.tags = card.tags.filter(
            (tagId) => tagId !== tag.id
        );
    });

    if (selectedTag?.id === tag.id) {
        resetTagForm();
    }

    saveProject();
    renderDashboard();
    renderTags();
}

initializeTags();
