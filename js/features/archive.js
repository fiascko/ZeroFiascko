const archive = document.getElementById("archive");

function renderArchive(project) {
    archive.replaceChildren();

    const archivedCards = project.cards.filter(
        (card) => card.archived
    );

    if (archivedCards.length === 0) {
        archive.appendChild(
            createArchiveEmptyMessage()
        );

        return;
    }

    const archiveGrid = document.createElement("div");
    archiveGrid.className = "archive-grid";

    archivedCards.forEach((card) => {
        archiveGrid.appendChild(
            createArchivedCardElement(card, project)
        );
    });

    archive.appendChild(archiveGrid);
}

function createArchiveEmptyMessage() {
    const emptyMessage = document.createElement("p");
    emptyMessage.className = "archive-empty";
    emptyMessage.textContent = "No archived cards.";
    return emptyMessage;
}

function createArchivedCardElement(card, project) {
    const cardElement = document.createElement("article");
    cardElement.className = "archive-card";

    const title = document.createElement("h3");
    title.textContent = card.title;

    const lane = document.createElement("span");
    lane.className = "archive-card-lane";
    lane.textContent = getLaneName(project, card.lane);

    const actions = createArchiveCardActions(card);
    cardElement.appendChild(title);
    cardElement.appendChild(lane);
    cardElement.appendChild(actions);

    return cardElement;
}

function createArchiveCardActions(card) {
    const actions = document.createElement("div");
    actions.className = "archive-card-actions";

    const deleteButton = document.createElement("button");
    deleteButton.className = "btn btn-danger";
    deleteButton.type = "button";
    deleteButton.textContent = "Delete";

    deleteButton.addEventListener("click", () => {
        deleteArchivedCard(card);
    });

    const unarchiveButton = document.createElement("button");
    unarchiveButton.className = "btn btn-secondary";
    unarchiveButton.type = "button";
    unarchiveButton.textContent = "Unarchive";

    unarchiveButton.addEventListener("click", () => {
        unarchiveCard(card);
    });

    actions.appendChild(deleteButton);
    actions.appendChild(unarchiveButton);

    return actions;
}

function unarchiveCard(card) {
    card.archived = false;
    saveProject();
    renderDashboard();
}

function deleteArchivedCard(card) {
    currentProject.cards = currentProject.cards.filter(
        (currentCard) => currentCard.id !== card.id
    );

    saveProject();
    renderDashboard();
}
