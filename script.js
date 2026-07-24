(function () {
  const profiles = Array.isArray(window.cohortProfiles)
    ? window.cohortProfiles
    : [];
  const cardsEl = document.querySelector("#cards");
  const template = document.querySelector("#profile-card-template");
  const searchInput = document.querySelector("#profile-search");
  const filterButtons = Array.from(document.querySelectorAll(".filter-button"));
  const totalCount = document.querySelector("#total-count");
  const leaderCount = document.querySelector("#leader-count");
  const memberCount = document.querySelector("#member-count");

  let activeFilter = "all";

  function searchableText(profile) {
    const leaderAnswers = profile.leaderAnswers
      ? Object.values(profile.leaderAnswers)
      : [];

    return [
      profile.name,
      profile.username,
      profile.genMate,
      profile.roleIntent,
      profile.strength,
      profile.growthGoal,
      profile.workingStyle,
      profile.availability,
      profile.teammateValue,
      profile.projectIdea,
      ...(profile.interests || []),
      ...leaderAnswers,
    ]
      .join(" ")
      .toLowerCase();
  }

  function matchesFilter(profile) {
    if (activeFilter === "all") {
      return true;
    }

    return profile.roleIntent === activeFilter;
  }

  function matchesSearch(profile) {
    const query = searchInput.value.trim().toLowerCase();

    if (!query) {
      return true;
    }

    return searchableText(profile).includes(query);
  }

  function initials(name) {
    return name
      .split(" ")
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part[0])
      .join("")
      .toUpperCase();
  }

  function renderLeaderAnswers(container, answers) {
    container.innerHTML = "";

    const labels = {
      motivation: "Why I am volunteering",
      decisionMaking: "Decision-making",
      conflict: "Conflict and blockers",
      culture: "Team culture",
      notResponsibleFor: "Not responsible for",
    };

    Object.entries(labels).forEach(([key, label]) => {
      const wrapper = document.createElement("div");
      const term = document.createElement("dt");
      const detail = document.createElement("dd");

      term.textContent = label;
      detail.textContent = answers[key] || "Not answered yet.";

      wrapper.append(term, detail);
      container.append(wrapper);
    });
  }

  function renderCard(profile) {
    const node = template.content.firstElementChild.cloneNode(true);
    const isLeader = profile.roleIntent === "leader";

    node.classList.toggle("is-leader", isLeader);
    node.querySelector(".avatar").textContent = initials(profile.name);
    node.querySelector("h2").textContent = profile.name;
    node.querySelector(".role-label").textContent = isLeader
      ? `${profile.username || "Team Leader candidate"} · GenMate ${
          profile.genMate || "-"
        }`
      : `${profile.username || "Team Member profile"} · GenMate ${
          profile.genMate || "-"
        }`;

    const tagList = node.querySelector(".tag-list");
    const genMateTag = document.createElement("span");
    genMateTag.textContent = `GenMate ${profile.genMate || "-"}`;
    tagList.append(genMateTag);

    (profile.interests || []).forEach((interest) => {
      const tag = document.createElement("span");
      tag.textContent = interest;
      tagList.append(tag);
    });

    node.querySelectorAll("[data-field]").forEach((field) => {
      field.textContent = profile[field.dataset.field] || "Not answered yet.";
    });

    const leaderSection = node.querySelector(".leader-section");
    if (isLeader) {
      leaderSection.hidden = false;
      renderLeaderAnswers(
        node.querySelector(".leader-answers"),
        profile.leaderAnswers || {},
      );
    }

    return node;
  }

  function render() {
    const visibleProfiles = profiles.filter(
      (profile) => matchesFilter(profile) && matchesSearch(profile),
    );

    cardsEl.innerHTML = "";

    if (visibleProfiles.length === 0) {
      const empty = document.createElement("p");
      empty.className = "empty-state";
      empty.textContent = "No cards match the current search.";
      cardsEl.append(empty);
      return;
    }

    visibleProfiles.forEach((profile) => {
      cardsEl.append(renderCard(profile));
    });
  }

  function renderStats() {
    totalCount.textContent = profiles.length;
    leaderCount.textContent = profiles.filter(
      (profile) => profile.roleIntent === "leader",
    ).length;
    memberCount.textContent = profiles.filter(
      (profile) => profile.roleIntent === "member",
    ).length;
  }

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      activeFilter = button.dataset.filter;
      filterButtons.forEach((item) =>
        item.classList.toggle("is-active", item === button),
      );
      render();
    });
  });

  searchInput.addEventListener("input", render);

  renderStats();
  render();
})();
