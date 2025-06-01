describe("Scanning Team QR code should let user see a list of team to join", () => {
    it("should display a list of teams when visiting the universal QR page", () => {
        cy.visit("https://venloop-ee862.web.app/team-join/view");
        cy.get("button").contains("Ik begrijp het").click();
        cy.get("h1").should("contain", "Teams zijn bezet"); // Check the header is there
    });
});