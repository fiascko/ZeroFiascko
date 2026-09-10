const PROJECT_FORMAT = "ZeroFiascko";
const PROJECT_VERSION = 1;
const LOCAL_STORAGE_PROJECT_KEY = "ZeroFiasckoProject";

const LANE_IDS = {
    BACKLOG: "Backlog",
    ANALYSE: "Analyse",
    IN_PROGRESS: "InProgress",
    QA: "QA",
    DONE: "Done"
};

const LANES = [
    {
        id: LANE_IDS.BACKLOG,
        name: "Backlog"
    },
    {
        id: LANE_IDS.ANALYSE,
        name: "Analyse"
    },
    {
        id: LANE_IDS.IN_PROGRESS,
        name: "In Progress"
    },
    {
        id: LANE_IDS.QA,
        name: "QA"
    },
    {
        id: LANE_IDS.DONE,
        name: "Done"
    }
];

const VALID_LANE_IDS = Object.values(LANE_IDS);
