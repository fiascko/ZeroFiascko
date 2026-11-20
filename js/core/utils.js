/* Copyright (c) Fiascko. All rights reserved. | Project: ZeroFiascko | File: utils.js */

function sanitizeFileName(fileName) {
    const sanitizedFileName = fileName
        .trim()
        .replace(/[<>:"/\\|?*\x00-\x1F]/g, "")
        .replace(/\s+/g, "");

    return sanitizedFileName || "ZeroFiasckoProject";
}

function getLaneName(project, laneId) {
    const lane = project.lanes.find(
        (lane) => lane.id === laneId
    );

    return lane?.name ?? laneId;
}

function generateCardId() {
    let highestId = 0;
    const project = loadProjectFromLocalStorage();

    if (!project) {
        return "Card1";
    }

    project.cards.forEach((card) => {
        const match = card.id.match(/^Card(\d+)$/);

        if (!match) {
            return;
        }

        const id = Number(match[1]);

        if (id > highestId) {
            highestId = id;
        }
    });

    return `Card${highestId + 1}`;
}

function sortCardsByPriority(cards) {
    return [...cards].sort((first, second) => {
        const priorityDifference = second.priority - first.priority;

        if (priorityDifference !== 0) {
            return priorityDifference;
        }

        return Number(first.id.slice(4)) - Number(second.id.slice(4));
    });
}

function initializeFooter() {
    const currentYear = document.getElementById("currentYear");
    const currentVersion = document.getElementById("currentVersion");
    const backToTop = document.getElementById("backToTop");

    if (!currentYear || !currentVersion || !backToTop) {
        return;
    }

    currentYear.textContent = new Date().getFullYear();
    currentVersion.textContent = PROJECT_VERSION;

    function updateBackToTopVisibility() {
        if (window.scrollY > 100) {
            backToTop.classList.add("visible");
        }
        else {
            backToTop.classList.remove("visible");
        }
    }

    window.addEventListener(
        "scroll",
        updateBackToTopVisibility
    );

    backToTop.addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });

    updateBackToTopVisibility();
}

initializeFooter();
