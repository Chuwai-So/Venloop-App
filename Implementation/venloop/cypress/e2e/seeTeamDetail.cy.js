describe("Universal QR Flow", () => {
    const testTeamId = "-ORg82dMWd6i2vqEZO0g";


    it("allows user to join a team and see team detail", () => {
        cy.on('window:confirm', (message) => {
            expect(message).to.include("Are you sure you want to leave this team?");
            return true; // Automatically "OK"
        });

        cy.on('window:alert', (message) => {
            expect(message).to.include("You have left the team.");
        });
        cy.visit("https://venloop-ee862.web.app/team-join/view");
        cy.pause();
        cy.get('button').contains('Ik begrijp het').should('be.visible').click();

        // Step 2: Wait for overlay to disappear (optional safety)


        // Verify the team appears
        cy.contains("Task Team").should("exist");

        // Click the team join button (adjust selector based on your markup)
        cy.contains("Task Team").parents("div").find("button").click();

        // Should redirect to team detail page
        cy.url().should("include", `/team-detail/view?id=${testTeamId}`);
        cy.contains("Task Team").should("exist");
        cy.get('button').contains('Team verlaten').should('be.visible').click();

        // Confirm redirected back to /team-join/view
        cy.url().should("include", "/team-join/view");
        // Check team details displayed

    });
});