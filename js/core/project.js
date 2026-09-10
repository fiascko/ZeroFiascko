function createProject(title) {
    const now = new Date().toISOString();

    return {
        format: PROJECT_FORMAT,
        version: PROJECT_VERSION,
        project: {
            title: title.trim(),
            description: "",
            notes: "",
            createdAt: now,
            updatedAt: now
        },
        lanes: LANES.map((lane) => ({
            id: lane.id,
            name: lane.name
        })),
        cards: []
    };
}

async function loadProjectFile(file) {
    if (!file) {
        throw new Error("No project file selected.");
    }

    let project;
    try {
        const text = await file.text();
        project = JSON.parse(text);
    }
    catch {
        throw new Error("Invalid JSON file.");
    }

    if (!isValidProject(project)) {
        throw new Error("Invalid ZeroFiascko project.");
    }

    return project;
}

function saveProjectToLocalStorage(project) {
    localStorage.setItem(
        LOCAL_STORAGE_PROJECT_KEY,
        JSON.stringify(project)
    );
}

function loadProjectFromLocalStorage() {
    const data = localStorage.getItem(
        LOCAL_STORAGE_PROJECT_KEY
    );

    if (!data) {
        return null;
    }

    try {
        const project = JSON.parse(data);

        if (!isValidProject(project)) {
            return null;
        }

        return project;
    }
    catch {
        return null;
    }
}

function clearProjectFromLocalStorage() {
    localStorage.removeItem(
        LOCAL_STORAGE_PROJECT_KEY
    );
}

function downloadProjectFile(project) {
    const json = JSON.stringify(project, null, 2);

    const blob = new Blob(
        [json],
        { type: "application/json" }
    );

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = `${sanitizeFileName(project.project.title)}.json`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
}
