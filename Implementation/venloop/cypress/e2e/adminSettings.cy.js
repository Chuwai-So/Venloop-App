describe("Admin Settings Page", () => {
    beforeEach(() => {
        // Log in and confirm redirection to /admin-landing
        cy.adminLogin();

        // Navigate to /admin-settings using the visible Event Settings button
        cy.get('[data-cy="admin-settings-button"]')
            .should("be.visible")
            .click();

        // Confirm route change
        cy.url({ timeout: 10000 }).should("include", "/admin-settings");
    });

    it("displays all admin controls", () => {
        cy.contains("Delete all teams").should("exist");
        cy.contains("Delete all tasks").should("exist");
        cy.contains("Delete picture submission").should("exist");
        cy.contains("Restart Event").should("exist");
        cy.contains("Set Data Deletion Timeframe").should("exist");
        cy.contains("Info").should("exist");
    });


    /*it("allows selecting a team from the dropdown", () => {
        cy.get("select")
            .first()
            .should("exist")
            .select(0) // Select the first option ("Select team")
            .invoke("val")
            .should("not.be.empty");
    });*/

    it("sets a data deletion timeframe", () => {
        cy.contains("Set Data Deletion Timeframe")
            .parent()
            .within(() => {
                cy.get("select").select("14").should("have.value", "14");
            });

        cy.contains("Set Data Deletion Timeframe").click();
    });

    it("handles deleting all teams", () => {
        cy.window().then(win => cy.stub(win, "confirm").returns(true));
        cy.window().then(win => cy.stub(win, "alert").as("alert"));
        cy.contains("Delete all teams").click();
        cy.get("@alert").should("have.been.called");
    });

    it("handles deleting all tasks", () => {
        cy.window().then(win => cy.stub(win, "confirm").returns(true));
        cy.window().then(win => cy.stub(win, "alert").as("alert"));
        cy.contains("Delete all tasks").click();
        cy.get("@alert").should("have.been.called");
    });

    it("handles restarting the event", () => {
        cy.window().then(win => cy.stub(win, "confirm").returns(true));
        cy.window().then(win => cy.stub(win, "alert").as("alert"));
        cy.contains("Restart Event").click();
        cy.get("@alert").should("have.been.called");
    });

    it("warns when deleting picture submission with no team selected", () => {
        cy.window().then(win => cy.stub(win, "alert").as("alert"));
        cy.contains("Delete picture submission").click();
        cy.get("@alert").should("have.been.calledWith", "Please select a team first.");
    });
});
