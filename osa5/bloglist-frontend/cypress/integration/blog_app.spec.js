describe('Blog app', function() {
    beforeEach(function() {
        cy.request('POST', 'http://localhost:3001/api/testing/reset')
        const user = {
            name: 'Matti Luukkainen',
            username: 'mluukkai',
            password: 'salainen'
        }
        cy.request('POST', 'http://localhost:3001/api/users/', user)
        cy.visit('http://localhost:3000')
    })

    it('Login form is shown', function() {
        cy.contains('Login')
        cy.get('#username').parent().should('contain', 'username')
        cy.get('#password').parent().should('contain', 'password')
    })

    describe('Login',function() {
        it('succeeds with correct credentials', function() {
            cy.get('#username').type('mluukkai')
            cy.get('#password').type('salainen')
            cy.get('#login-button').click()

            cy.contains('Matti Luukkainen logged in')
        })

        it('fails with wrong credentials', function() {
            cy.get('#username').type('mluukkai')
            cy.get('#password').type('wrong')
            cy.get('#login-button').click()

            cy.get('.error')
                .should('contain', 'wrong username or password')
                .and('have.css', 'color', 'rgb(255, 0, 0)')

            cy.get('html').should('not.contain', 'Matti Luukkainen logged in')
        })
    })

    describe('When logged in', function() {
        beforeEach(function() {
            cy.login({ username: 'mluukkai', password: 'salainen' })
        })

        it('A blog can be created', function() {
            cy.contains('new blog').click()
            cy.get('#title').type('A blog created by cypress')
            cy.get('#author').type('C. Ypress')
            cy.get('#url').type('cypr.es')
            cy.get('#create').click()

            cy.contains('A blog created by cypress')
            cy.contains('C. Ypress')
        })

        describe('and a blog exists', function() {
            beforeEach(function() {
                cy.createBlog({ title: 'Another blog by cypress', author: 'C. Y. Pres', url: 'cy.pr', likes: 0 })
            })

            it('it can be liked', function() {
                cy.contains('view').click()
                cy.contains('like').click()
                cy.contains('likes 1')
            })

            it('it can be removed by the user who created it', function() {
                cy.contains('view').click()
                cy.contains('remove').click()
                cy.get('.blogs').should('not.contain', 'Another blog by cypress')
            })
        })

        describe('and multiple blogs exist', function () {
            beforeEach(function() {
                cy.createBlog({ title: 'First blog', author: 'First Author', url: 'first.url', likes: 23 })
                cy.createBlog({ title: 'Second blog', author: 'Second Author', url: 'second.url', likes: 56 })
                cy.createBlog({ title: 'Third blog', author: 'Third Author', url: 'third.url', likes: 101 })
            })

            it('the blogs are ordered by their number of likes, the blog with the most likes first', function() {
                cy.get('.viewButton').eq(0).click()
                cy.get('.viewButton').eq(1).click()
                cy.get('.viewButton').eq(2).click()
                cy.get('.blog').eq(0).contains('likes 101')
                cy.get('.blog').eq(1).contains('likes 56')
                cy.get('.blog').eq(2).contains('likes 23')
            })
        })
    })
})