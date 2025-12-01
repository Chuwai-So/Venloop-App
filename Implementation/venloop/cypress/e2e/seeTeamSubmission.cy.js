describe('Team Submission Flow', () => {
    it('Team should submit task and redirect back' ,() => {
        cy.visit('https://venloop-ee862.web.app'); // Adjust this URL to your actual admin login route

        // Fill in the form
        cy.get('input[type="email"]').type('test@v.com');
        cy.get('input[type="password"]').type('123456');

        // Submit the form
        cy.get('button[type="submit"]').click(); // Adjust selector

        // Expect to be redirected to admin dashboard
        cy.url().should('include', 'https://venloop-ee862.web.app/admin-landing');

        cy.get('button').contains('Tasks').should('exist');
        cy.get('button').contains('Teams').should('exist');
        cy.get('button').contains('Event Settings').should('exist');
        cy.get('button').contains('Leaderboard').should('exist');

        cy.get('button').contains('Tasks').click();
        cy.contains('Create Task').should('exist');
        cy.contains('Edit Tasks').should('exist');
        cy.contains('Submissions').should('exist');

        cy.get('button').contains('Teams').click();
        cy.contains('Create Team').should('exist');
        cy.contains('Team Menu').should('exist');

        cy.visit("https://venloop-ee862.web.app/task-submission/view?id=-ORk3YZjwCDhCK255aBz");

    })
})