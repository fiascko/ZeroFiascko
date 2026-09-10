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

    if (!Array.isArray(data.cards)) {
        return false;
    }

    if (!data.cards.every(isValidCard)) {
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
        typeof card.archived === "boolean"
    );
}
