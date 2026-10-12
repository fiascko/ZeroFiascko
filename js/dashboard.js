const projectTitle = document.getElementById("projectTitle");
const board = document.getElementById("board");
const closeButton = document.getElementById("closeButton");
const saveProjectButton = document.getElementById("saveProjectButton");
const cardDialog = document.getElementById("cardDialog");
const cardForm = document.getElementById("cardForm");
const cardDialogTitle = document.getElementById("cardDialogTitle");
const cardTitleInput = document.getElementById("cardTitle");
const cardTypeInput = document.getElementById("cardType");
const cardDescriptionInput = document.getElementById("cardDescription");
const cardTagsSection = document.getElementById("cardTagsSection");
const cardTagsList = document.getElementById("cardTagsList");
const cancelCardButton = document.getElementById("cancelCardButton");
const deleteCardButton = document.getElementById("deleteCardButton");
const archiveCardButton = document.getElementById("archiveCardButton");
let currentProject = loadProjectFromLocalStorage();
let selectedCard = null;
let selectedLaneId = null;

function initializeDashboard() {
    if (!currentProject) {
        window.location.href = "./index.html";
        return;
    }

    initializeDashboardEvents();
    projectTitle.textContent = currentProject.project.title;
    renderDashboard();
}

function initializeDashboardEvents() {
    cardForm.addEventListener("submit", saveCard);
    cancelCardButton.addEventListener("click", closeCardDialog);
    deleteCardButton.addEventListener("click", deleteSelectedCard);
    archiveCardButton.addEventListener("click", archiveSelectedCard);
    saveProjectButton.addEventListener("click", downloadCurrentProject);
    closeButton.addEventListener("click", closeDashboard);
    cardTypeInput.addEventListener("change", updateCardDialogStyle);
}

function renderDashboard() {
    renderProjectInfo(currentProject);
    renderBoard();
    renderStatistics(currentProject);
    renderNotes(currentProject);
    renderArchive(currentProject);
}

function renderBoard() {
    board.replaceChildren();

    currentProject.lanes.forEach((lane) => {
        board.appendChild(createLaneElement(lane));
    });
}

function createLaneElement(lane) {
    const laneElement = document.createElement("section");
    laneElement.className = "board-lane";
    laneElement.id = lane.id;

    const cards = getActiveCardsByLane(lane.id);
    const header = createLaneHeader(lane, cards.length);
    const cardList = createCardList(cards);
    const addCardButton = createAddCardButton(lane.id);

    laneElement.appendChild(header);
    laneElement.appendChild(cardList);
    laneElement.appendChild(addCardButton);

    return laneElement;
}

function getActiveCardsByLane(laneId) {
    return currentProject.cards.filter(
        (card) => card.lane === laneId && !card.archived
    );
}

function createLaneHeader(lane, cardCount) {
    const header = document.createElement("header");
    header.className = "lane-header";

    const title = document.createElement("h2");
    title.textContent = lane.name;

    const count = document.createElement("span");
    count.className = "lane-count";
    count.textContent = cardCount;

    header.appendChild(title);
    header.appendChild(count);

    return header;
}

function createCardList(cards) {
    const cardList = document.createElement("div");
    cardList.className = "card-list";

    cards.forEach((card) => {
        cardList.appendChild(createCardElement(card));
    });

    return cardList;
}

function createAddCardButton(laneId) {
    const addCardButton = document.createElement("button");
    addCardButton.className = "add-card-button";
    addCardButton.type = "button";
    addCardButton.textContent = "+";
    addCardButton.title = "Add card";

    addCardButton.addEventListener("click", () => {
        openNewCardDialog(laneId);
    });

    return addCardButton;
}

function createCardElement(card) {
    const cardElement = document.createElement("article");
    cardElement.className = "board-card";
    cardElement.id = card.id;

    if (card.type === CARD_TYPES.BUG) {
        cardElement.classList.add("board-card-bug");
    }

    const title = createCardTitle(card);
    const tags = createCardTags(card);
    const actions = createCardActions(card);

    cardElement.appendChild(title);

    if (tags) {
        cardElement.appendChild(tags);
    }

    cardElement.appendChild(actions);

    return cardElement;
}

function createCardTitle(card) {
    const title = document.createElement("h3");
    title.textContent = card.title;

    title.addEventListener("click", () => {
        openCardDialog(card);
    });

    return title;
}

function createCardTags(card) {
    const tags = currentProject.tags.filter(
        (tag) => card.tags.includes(tag.id)
    );

    if (tags.length === 0) {
        return null;
    }

    const container = document.createElement("div");
    container.className = "card-tags";

    tags.forEach((tag) => {
        const element = document.createElement("span");
        element.className = "card-tag";
        element.textContent = tag.name;
        container.appendChild(element);
    });

    return container;
}

function createCardActions(card) {
    const actions = document.createElement("div");
    actions.className = "card-actions";

    const laneIndex = currentProject.lanes.findIndex(
        (lane) => lane.id === card.lane
    );

    if (laneIndex > 0) {
        actions.appendChild(
            createMoveCardButton(
                card,
                -1,
                "←",
                "card-move-back",
                "Move to previous lane"
            )
        );
    }

    if (laneIndex < currentProject.lanes.length - 1) {
        actions.appendChild(
            createMoveCardButton(
                card,
                1,
                "→",
                "card-move-next",
                "Move to next lane"
            )
        );
    }

    return actions;
}

function createMoveCardButton(card, direction, text, className, title) {
    const button = document.createElement("button");
    button.className = `card-move-button ${className}`;
    button.type = "button";
    button.textContent = text;
    button.title = title;

    button.addEventListener("click", () => {
        moveCard(card, direction);
    });

    return button;
}

function renderCardTags(selectedTagIds = []) {
    cardTagsList.replaceChildren();

    cardTagsSection.hidden = currentProject.tags.length === 0;

    if (cardTagsSection.hidden) {
        return;
    }

    currentProject.tags.forEach((tag) => {
        const label = document.createElement("label");
        label.className = "card-tag-option";

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.value = tag.id;
        checkbox.checked = selectedTagIds.includes(tag.id);

        const name = document.createElement("span");
        name.textContent = tag.name;

        label.appendChild(checkbox);
        label.appendChild(name);
        cardTagsList.appendChild(label);
    });
}

function getSelectedCardTags() {
    return Array.from(
        cardTagsList.querySelectorAll('input[type="checkbox"]:checked')
    ).map((checkbox) => checkbox.value);
}

function openNewCardDialog(laneId) {
    selectedCard = null;
    selectedLaneId = laneId;

    cardDialogTitle.textContent = "New Card";
    cardTitleInput.value = "";
    cardTypeInput.value = CARD_TYPES.STORY;
    cardDescriptionInput.value = "";

    renderCardTags();

    deleteCardButton.hidden = true;
    archiveCardButton.hidden = true;

    updateCardDialogStyle();
    cardDialog.showModal();
    cardTitleInput.focus();
}

function openCardDialog(card) {
    selectedCard = card;
    selectedLaneId = null;

    cardDialogTitle.textContent = "Card";
    cardTitleInput.value = card.title;
    cardTypeInput.value = card.type;
    cardDescriptionInput.value = card.description;

    renderCardTags(card.tags);

    deleteCardButton.hidden = false;
    archiveCardButton.hidden = false;

    updateCardDialogStyle();
    cardDialog.showModal();
    cardTitleInput.focus();
}

function closeCardDialog() {
    cardDialog.close();
}

function saveCard(event) {
    event.preventDefault();

    const title = cardTitleInput.value.trim();
    const type = cardTypeInput.value;
    const description = cardDescriptionInput.value.trim();
    const tags = getSelectedCardTags();

    if (!title) {
        return;
    }

    if (selectedCard) {
        updateSelectedCard(title, description, type, tags);
    }
    else {
        createCard(title, description, type, tags);
    }

    saveProject();
    closeCardDialog();
    renderDashboard();
}

function updateSelectedCard(title, description, type, tags) {
    selectedCard.title = title;
    selectedCard.type = type;
    selectedCard.description = description;
    selectedCard.tags = tags;
}

function createCard(title, description, type, tags) {
    const card = {
        id: generateCardId(),
        title: title,
        description: description,
        lane: selectedLaneId,
        type: type,
        tags: tags,
        archived: false
    };

    currentProject.cards.push(card);
}

function deleteSelectedCard() {
    if (!selectedCard) {
        return;
    }

    currentProject.cards = currentProject.cards.filter(
        (card) => card.id !== selectedCard.id
    );

    saveProject();
    closeCardDialog();
    renderDashboard();
}

function archiveSelectedCard() {
    if (!selectedCard) {
        return;
    }

    selectedCard.archived = true;

    saveProject();
    closeCardDialog();
    renderDashboard();
}

function moveCard(card, direction) {
    const currentLaneIndex = currentProject.lanes.findIndex(
        (lane) => lane.id === card.lane
    );

    const newLaneIndex = currentLaneIndex + direction;

    if (newLaneIndex < 0 || newLaneIndex >= currentProject.lanes.length) {
        return;
    }

    card.lane = currentProject.lanes[newLaneIndex].id;

    saveProject();
    renderDashboard();
}

function saveProject() {
    currentProject.project.updatedAt = new Date().toISOString();
    saveProjectToLocalStorage(currentProject);
}

function downloadCurrentProject() {
    saveProject();
    downloadProjectFile(currentProject);
}

function closeDashboard() {
    window.location.href = "./index.html";
}

function updateCardDialogStyle() {
    cardDialog.classList.toggle(
        "dialog-bug",
        cardTypeInput.value === CARD_TYPES.BUG
    );
}

initializeDashboard();
