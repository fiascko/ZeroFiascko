function isValidProject(data) {
    if (!data || typeof data !== "object" || Array.isArray(data)) {
        return false;
    }

    if (data.format !== PROJECT_FORMAT) {
        return false;
    }

    if (data.version !== PROJECT_VERSION) {
        return false;
    }

    if (!isValidProjectInfo(data.project)) {
        return false;
    }

    if (!isValidLanes(data.lanes)) {
        return false;
    }

    if (!isValidTags(data.tags)) {
        return false;
    }

    if (!Array.isArray(data.cards)) {
        return false;
    }

    if (!data.cards.every(isValidCard)) {
        return false;
    }

    const validTagIds = new Set(
        data.tags.map((tag) => tag.id)
    );

    if (!data.cards.every((card) =>
        card.tags.every((tagId) => validTagIds.has(tagId))
    )) {
        return false;
    }

    return true;
}

function isValidProjectInfo(project) {
    return (
        project &&
        typeof project === "object" &&
        !Array.isArray(project) &&
        typeof project.title === "string" &&
        project.title.trim() !== "" &&
        typeof project.description === "string" &&
        typeof project.notes === "string" &&
        typeof project.createdAt === "string" &&
        project.createdAt.trim() !== "" &&
        typeof project.updatedAt === "string" &&
        project.updatedAt.trim() !== ""
    );
}

function isValidLanes(lanes) {
    if (!Array.isArray(lanes)) {
        return false;
    }

    if (lanes.length !== LANES.length) {
        return false;
    }

    return LANES.every((expectedLane) => {
        return lanes.some((lane) => {
            return (
                lane &&
                typeof lane === "object" &&
                !Array.isArray(lane) &&
                lane.id === expectedLane.id &&
                lane.name === expectedLane.name
            );
        });
    });
}

function isValidTags(tags) {
    if (!Array.isArray(tags)) {
        return false;
    }

    const ids = new Set();
    const names = new Set();

    for (const tag of tags) {
        if (
            !tag ||
            typeof tag !== "object" ||
            Array.isArray(tag) ||
            typeof tag.id !== "string" ||
            tag.id.trim() === "" ||
            typeof tag.name !== "string" ||
            tag.name.trim() === ""
        ) {
            return false;
        }

        const normalizedName = tag.name.trim().toLowerCase();

        if (ids.has(tag.id) || names.has(normalizedName)) {
            return false;
        }

        ids.add(tag.id);
        names.add(normalizedName);
    }

    return true;
}

function isValidCard(card) {
    return (
        card &&
        typeof card === "object" &&
        !Array.isArray(card) &&
        typeof card.id === "string" &&
        card.id.trim() !== "" &&
        typeof card.title === "string" &&
        card.title.trim() !== "" &&
        typeof card.description === "string" &&
        typeof card.lane === "string" &&
        VALID_LANE_IDS.includes(card.lane) &&
        typeof card.type === "string" &&
        VALID_CARD_TYPES.includes(card.type) &&
        Array.isArray(card.tags) &&
        card.tags.every((tagId) =>
            typeof tagId === "string" &&
            tagId.trim() !== ""
        ) &&
        new Set(card.tags).size === card.tags.length &&
        typeof card.archived === "boolean"
    );
}
