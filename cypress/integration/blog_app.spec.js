describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3001/api/testing/reset');
    cy.visit('http://localhost:2999');
  });

  it('Login form is shown', function () {
    cy.get('html')
      .should('contain', 'Log in to the app')
      .and('not.contain', 'logged in');
  });
});
