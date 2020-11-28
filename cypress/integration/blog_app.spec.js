describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3001/api/testing/reset');
    const user = {
      name: 'Diego González',
      username: 'rmzNadir',
      password: 'bababooey',
    };
    cy.request('POST', 'http://localhost:3001/api/users', user);
    cy.visit('http://localhost:3000');
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

  describe('When logged in', function () {
    beforeEach(function () {
      cy.login({ username: 'rmzNadir', password: 'bababooey' });
    });

    it('A blog can be created', function () {
      cy.get('#showForm').click();

      cy.get('#titleInput').type('Title');
      cy.get('#authorInput').type('Author');
      cy.get('#urlInput').type('URL');

      cy.get('#submitButton').click();

      cy.get('html')
        .should('contain', 'Title by Author')
        .should('contain', ' blog Title successfully created')
        .and('not.contain', 'Create new');
    });

    describe('and a blog exists', function () {
      beforeEach(function () {
        cy.createBlog({ title: 'Title', author: 'Author', url: 'URL' });
      });

      it('it can be liked', function () {
        cy.get('#toggleInfo').click();

        cy.get('.likesDiv').should('contain', 'Likes: 0');

        cy.get('#likeButton').click();

        cy.get('.likesDiv').should('contain', 'Likes: 1');
      });

      it('it can be deleted by its owner', function () {
        cy.get('#toggleInfo').click();

        cy.get('.blog')
          .should('contain', 'Poster: rmzNadir')
          .and('contain', 'Remove');

        cy.get('#removeButton').click();

        cy.get('html').should('not.contain', '.blog');
      });

      it('it cannot be deleted by someone other than the owner', function () {
        cy.logout();

        const user = {
          name: 'Diego Ramírez',
          username: 'notNadir',
          password: 'hehe',
        };
        cy.request('POST', 'http://localhost:3001/api/users', user);

        cy.login({ username: 'notNadir', password: 'hehe' });

        cy.get('#toggleInfo').click();

        cy.get('html').should('contain', 'Diego Ramírez logged in.');

        cy.get('.blog')
          .should('contain', 'Poster: rmzNadir')
          .and('not.contain', 'Remove')
          .and('not.contain', '#removeButton');
      });
    });

    describe('and multiple blogs exists', function () {
      beforeEach(function () {
        cy.createBlog({
          title: 'Title 1',
          author: 'Author 1',
          url: 'URL 1',
          likes: 3,
        });
        cy.createBlog({
          title: 'Title 2',
          author: 'Author 2',
          url: 'URL 2',
          likes: 1,
        });
        cy.createBlog({
          title: 'Title 3',
          author: 'Author 3',
          url: 'URL 3',
          likes: 5,
        });
      });

      it('they are ordered according to the number of likes', function () {
        cy.request('GET', 'http://localhost:3001/api/blogs')
          .then(({ body }) => {
            const likes = body.map((blog) => blog.likes);
            return !!likes.reduce(
              (acc, likes) => acc !== false && likes <= acc && likes
            );

            // console.log('isSorted', isSorted);
            // console.log('likes', likes);
          })
          .should('equal', true);
      });
    });
  });
});
