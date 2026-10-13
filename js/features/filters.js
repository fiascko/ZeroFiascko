const cardFilters = {
    board: {
        search: document.getElementById("boardSearch"),
        type: document.getElementById("boardTypeFilter"),
        tag: document.getElementById("boardTagFilter"),
        clear: document.getElementById("boardClearFilters"),
        count: document.getElementById("boardFilterCount")
    },
    archive: {
        search: document.getElementById("archiveSearch"),
        type: document.getElementById("archiveTypeFilter"),
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

    filters.search.addEventListener("input", render);
    filters.type.addEventListener("change", render);
    filters.tag.addEventListener("change", render);

    filters.clear.addEventListener("click", () => {
        filters.search.value = "";
        filters.type.value = "";
        filters.tag.value = "";

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
    const tag = filters.tag.value;

    return cards.filter((card) => {
        const matchesSearch = card.title.toLowerCase().includes(search);
        const matchesType = !type || card.type === type;
        const matchesTag = !tag || card.tags.includes(tag);

        return matchesSearch && matchesType && matchesTag;
    });
}

function updateCardFilterCount(section, visibleCount, totalCount) {
    const count = cardFilters[section].count;

    count.textContent = `${visibleCount} of ${totalCount} cards`;
}
