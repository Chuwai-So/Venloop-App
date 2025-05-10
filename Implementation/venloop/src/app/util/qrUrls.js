const BASE_URL = "https://venloop-ee862.web.app";
// const BASE_URL = "https://localhost:3000";

const qrUrls = {
    teamDetail: (teamId) => `${BASE_URL}/team-detail/view?id=${teamId}`,
    taskDetail: (taskId) => `${BASE_URL}/task-submission/view?id=${taskId}`,
    teamJoin: () => `${BASE_URL}/team-join/view`
};

export default qrUrls;
