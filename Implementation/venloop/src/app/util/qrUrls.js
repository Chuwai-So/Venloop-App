const BASE_URL = "https://venloop-ee862.web.app";

const qrUrls = {
    teamDetail: (teamId) => `${BASE_URL}/team-detail/view?id=${teamId}`,
    taskDetail: (taskId) => `${BASE_URL}/task-submission/view?id=${taskId}`,
    teamJoin: (eventToken) => `${BASE_URL}/team-join/view?event=${eventToken}`
};

export default qrUrls;
