describe("Task Creation Page", () => {
    beforeEach(() => {
        // Visit login page
        cy.visit("https://venloop-ee862.web.app/login");

        // Login with correct credentials
        cy.get('input[type="email"]').should("exist").type("test@v.com");
        cy.get('input[type="password"]').type("123456");
        cy.get('button').contains("Log In").click();

        // Wait for redirect to admin dashboard
        cy.url({ timeout: 10000 }).should("include", "/admin-landing");

        // Navigate to Create Task page
        cy.contains("Tasks").should("be.visible").click();
        cy.contains("Create Task").should("be.visible").click();

        // Confirm Task Creation page loaded
        cy.url().should("include", "/task-creation");
        cy.get('input[placeholder="Task Name"]').should("exist");
    });

    it("fills out and submits a task with all features and saves as template", () => {
        // Task name
        cy.get('input[placeholder="Task Name"]').type("E2E Test Task");

        // Description
        cy.contains("div", "description").find("button").click();
        cy.get("textarea").should("exist").type("This is an end-to-end test task.");

        // Timer
        cy.contains("div", "timer").find("button").click();
        cy.get('input[type="number"]').clear().type("60");

        // Input
        cy.contains("div", "input").find("button").click();
        cy.get('input[placeholder="Input"]').should("exist").type("E2E Answer");

        // Choice
        cy.contains("div", "choice").find("button").click();
        cy.get("button").contains("Add Option").click();
        cy.get('input[placeholder="Option 1"]').should("exist").type("Option A");

        // Picture
        cy.contains("div", "picture").find("button").click();
        cy.get('input[type="file"]').selectFile("cypress/fixtures/test.png", { force: true });

        // Save as template
        cy.get("#isTemplate").check();

        // Submit task
        cy.get("button").contains("Submit Task").click();

        // Check for success alert and QR code
        cy.on("window:alert", (text) => {
            expect(text).to.include("Task created successfully");
        });
        cy.get('#qr-wrapper-task-creation svg').should("be.visible");
        cy.contains("Hide QR Code").click();
    });

    it("toggles and untoggles features correctly", () => {
        // Description toggle
        cy.contains("div", "description").find("button").click();
        cy.get("textarea").should("exist");
        cy.contains("div", "description").find("button").click();
        cy.get("textarea").should("not.exist");

        // Timer toggle
        cy.contains("div", "timer").find("button").click();
        cy.get('input[type="number"]').should("exist");
        cy.contains("div", "timer").find("button").click();
        cy.get('input[type="number"]').should("not.exist");

        // Input toggle
        cy.contains("div", "input").find("button").click();
        cy.get('input[placeholder="Input"]').should("exist");
        cy.contains("div", "input").find("button").click();
        cy.get('input[placeholder="Input"]').should("not.exist");

        // Choice toggle
        cy.contains("div", "choice").find("button").click();
        cy.get("button").contains("Add Option").click();
        cy.get('input[placeholder="Option 1"]').should("exist");
        cy.contains("div", "choice").find("button").click();
        cy.get('input[placeholder="Option 1"]').should("not.exist");

        // Picture toggle
        cy.contains("div", "picture").find("button").click();
        cy.get('input[type="file"]').should("exist");
        cy.contains("div", "picture").find("button").click();
        cy.get('input[type="file"]').should("not.exist");
    });
});
