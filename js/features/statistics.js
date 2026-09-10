const statistics = document.getElementById("statistics");

function renderStatistics(project) {
    statistics.replaceChildren();
    const activeCards = getActiveCards(project);
    const archivedCardsCount = getArchivedCardsCount(project);
    const completedCards = getCompletedCardsCount(activeCards);
    const totalCards = activeCards.length;
    const remainingCards = totalCards - completedCards;
    const completionPercentage = getCompletionPercentage(
        completedCards,
        totalCards
    );

    const summary = createStatisticsSummary(
        totalCards,
        completedCards,
        remainingCards,
        archivedCardsCount,
        completionPercentage
    );

    const progressSection = createProgressSection(
        completionPercentage
    );

    const lanesSection = createLaneStatistics(
        project,
        activeCards
    );

    statistics.appendChild(summary);
    statistics.appendChild(progressSection);
    statistics.appendChild(lanesSection);
}

function getActiveCards(project) {
    return project.cards.filter(
        (card) => !card.archived
    );
}

function getArchivedCardsCount(project) {
    return project.cards.filter(
        (card) => card.archived
    ).length;
}

function getCompletedCardsCount(activeCards) {
    return activeCards.filter(
        (card) => card.lane === LANE_IDS.DONE
    ).length;
}

function getCompletionPercentage(completedCards, totalCards) {
    if (totalCards === 0) {
        return 0;
    }

    return Math.round(
        (completedCards / totalCards) * 100
    );
}

function createStatisticsSummary(
    totalCards,
    completedCards,
    remainingCards,
    archivedCardsCount,
    completionPercentage
) {
    const summary = document.createElement("div");
    summary.className = "statistics-summary";

    summary.appendChild(
        createStatisticCard("Total Cards", totalCards)
    );

    summary.appendChild(
        createStatisticCard("Completed", completedCards)
    );

    summary.appendChild(
        createStatisticCard("Remaining", remainingCards)
    );

    summary.appendChild(
        createStatisticCard("Archived", archivedCardsCount)
    );

    summary.appendChild(
        createStatisticCard(
            "Progress",
            `${completionPercentage}%`
        )
    );

    return summary;
}

function createStatisticCard(label, value) {
    const card = document.createElement("div");
    card.className = "statistic-card";

    const valueElement = document.createElement("strong");
    valueElement.className = "statistic-value";
    valueElement.textContent = value;

    const labelElement = document.createElement("span");
    labelElement.className = "statistic-label";
    labelElement.textContent = label;

    card.appendChild(valueElement);
    card.appendChild(labelElement);

    return card;
}

function createProgressSection(percentage) {
    const section = document.createElement("div");
    section.className = "statistics-progress";

    const header = document.createElement("div");
    header.className = "statistics-progress-header";

    const title = document.createElement("span");
    title.textContent = "Project Completion";

    const value = document.createElement("strong");
    value.textContent = `${percentage}%`;

    header.appendChild(title);
    header.appendChild(value);

    const progressBar = document.createElement("div");
    progressBar.className = "progress-bar";

    const progressFill = document.createElement("div");
    progressFill.className = "progress-bar-fill";
    progressFill.style.width = `${percentage}%`;

    progressBar.appendChild(progressFill);
    section.appendChild(header);
    section.appendChild(progressBar);

    return section;
}

function createLaneStatistics(project, activeCards) {
    const section = document.createElement("div");
    section.className = "statistics-lanes";

    const title = document.createElement("h3");
    title.textContent = "Cards by Lane";

    const lanes = document.createElement("div");
    lanes.className = "statistics-lane-list";

    project.lanes.forEach((lane) => {
        lanes.appendChild(
            createLaneStatistic(lane, activeCards)
        );
    });

    section.appendChild(title);
    section.appendChild(lanes);

    return section;
}

function createLaneStatistic(lane, activeCards) {
    const count = activeCards.filter(
        (card) => card.lane === lane.id
    ).length;

    const item = document.createElement("div");
    item.className = "statistics-lane";

    const name = document.createElement("span");
    name.textContent = lane.name;

    const value = document.createElement("strong");
    value.textContent = count;

    item.appendChild(name);
    item.appendChild(value);

    return item;
}
