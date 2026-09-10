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

function initializeFooter() {
    const currentYear = document.getElementById("currentYear");
    const backToTop = document.getElementById("backToTop");

    if (!currentYear || !backToTop) {
        return;
    }

    currentYear.textContent = new Date().getFullYear();

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
