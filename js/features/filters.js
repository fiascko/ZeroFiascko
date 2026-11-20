/* Copyright (c) Fiascko. All rights reserved. | Project: ZeroFiascko | File: filters.js */

const cardFilters = {
    board: {
        search: document.getElementById("boardSearch"),
        type: document.getElementById("boardTypeFilter"),
        priority: document.getElementById("boardPriorityFilter"),
        risk: document.getElementById("boardRiskFilter"),
        tag: document.getElementById("boardTagFilter"),
        clear: document.getElementById("boardClearFilters"),
        count: document.getElementById("boardFilterCount")
    },
    archive: {
        search: document.getElementById("archiveSearch"),
        type: document.getElementById("archiveTypeFilter"),
        priority: document.getElementById("archivePriorityFilter"),
        risk: document.getElementById("archiveRiskFilter"),
        tag: document.getElementById("archiveTagFilter"),
        clear: document.getElementById("archiveClearFilters"),
        count: document.getElementById("archiveFilterCount")
    }
};

function initializeCardFilters() {
    initializeCardFilter("board", renderBoard);
    initializeCardFilter("archive", () => renderArchive(currentProject));
    renderCardFilterTags();
}

function initializeCardFilter(section, render) {
    const filters = cardFilters[section];

    [filters.search, filters.type, filters.priority, filters.risk, filters.tag].forEach((filter) => {
        filter.addEventListener(filter === filters.search ? "input" : "change", render);
    });

    filters.clear.addEventListener("click", () => {
        [filters.search, filters.type, filters.priority, filters.risk, filters.tag].forEach((filter) => {
            filter.value = "";
        });

        render();
    });
}

function renderCardFilterTags() {
    Object.values(cardFilters).forEach((filters) => {
        const selectedTag = filters.tag.value;

        filters.tag.replaceChildren();

        const allTagsOption = document.createElement("option");
        allTagsOption.value = "";
        allTagsOption.textContent = "All Tags";
        filters.tag.appendChild(allTagsOption);

        currentProject.tags.forEach((tag) => {
            const option = document.createElement("option");
            option.value = tag.id;
            option.textContent = tag.name;
            filters.tag.appendChild(option);
        });

        filters.tag.value = selectedTag;

        if (filters.tag.selectedIndex === -1) {
            filters.tag.value = "";
        }
    });
}

function filterCards(cards, section) {
    const filters = cardFilters[section];

    const search = filters.search.value.trim().toLowerCase();
    const type = filters.type.value;
    const priority = filters.priority.value;
    const risk = filters.risk.value;
    const tag = filters.tag.value;

    return cards.filter((card) => {
        const searchableText = `#${card.id.slice(4)} ${card.title}`.toLowerCase();

        return (
            searchableText.includes(search) &&
            (!type || card.type === type) &&
            (!priority || card.priority === Number(priority)) &&
            (!risk || card.risk === Number(risk)) &&
            (!tag || card.tags.includes(tag))
        );
    });
}

function updateCardFilterCount(section, visibleCount, totalCount) {
    const count = cardFilters[section].count;

    count.textContent = `${visibleCount} of ${totalCount} cards`;
}
