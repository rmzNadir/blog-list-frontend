describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3001/api/testing/reset');
    const user = {
      name: 'Diego González',
      username: 'rmzNadir',
      password: 'bababooey',
    };
    cy.request('POST', 'http://localhost:3001/api/users', user);
    cy.visit('http://localhost:2999');
  });

  it('Login form is shown', function () {
    cy.get('html')
      .should('contain', 'Log in to the app')
      .and('not.contain', 'logged in');
  });

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.get('#username').type('rmzNadir');
      cy.get('#password').type('bababooey');
      cy.get('#submitButton').click();

      cy.get('html')
        .should('not.contain', 'Log in to the app')
        .and('contain', 'Diego González logged in');
    });

    it('fails with wrong credentials', function () {
      cy.get('#username').type('rmzNadir');
      cy.get('#password').type('not so bababooey');
      cy.get('#submitButton').click();

      cy.get('.error')
        .should('contain', 'Login failed, check your username and password')
        .and('have.css', 'color', 'rgb(255, 0, 0)');

      cy.get('html')
        .should('contain', 'Log in to the app')
        .and('not.contain', 'Diego González logged in');
    });
  });
});
