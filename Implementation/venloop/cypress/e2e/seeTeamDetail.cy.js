describe("Universal QR Flow", () => {
    const testTeamId = "cypress-test-team";

    beforeEach(() => {
        cy.createTestTeam(testTeamId);
    });

    it("allows user to join a team and see team detail", () => {
        cy.visit("https://venloop-ee862.web.app/team-join/view");

        // Verify the team appears
        cy.contains("Test Team").should("exist");

        // Click the team join button (adjust selector based on your markup)
        cy.contains("Test Team").click();

        // Should redirect to team detail page
        cy.url().should("include", `/team-detail/view?id=${testTeamId}`);

        // Check team details displayed
        cy.contains("Test Team").should("exist");
    });
});