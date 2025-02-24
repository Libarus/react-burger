// {project}/cypress/integration/is-available.spec.js

describe('service is available', function () {
    it('should be available on localhost:5173', function () {
        cy.visit('http://localhost:5173');
    });
});
