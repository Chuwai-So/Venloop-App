//import TeamService from "@/app/service/TeamService/teamService";

// Create a test team
/*Cypress.Commands.add("createTestTeam", (teamId) => {
    const testTeamData = {
        id: teamId,
        name: "Test Team",
        captain: null,
        occupied: false,
        completedTasks: {},
        pendingTasks: {},
    };

    return TeamService.createTeam(testTeamData);
});

// Reset a test team
Cypress.Commands.add("resetTestTeam", (teamId) => {
    return TeamService.updateTeam(teamId, {
        captain: null,
        occupied: false,
        completedTasks: null,
        pendingTasks: null,
    });
});

 */

Cypress.Commands.add("adminLogin", () => {
    cy.visit('https://venloop-ee862.web.app'); // adjust if needed

    cy.get('input[type="email"]').type('test@v.com');
    cy.get('input[type="password"]').type('123456');
    cy.get('button[type="submit"]').click();

    // Confirm login succeeded
    cy.url().should('include', '/admin-landing');
});
