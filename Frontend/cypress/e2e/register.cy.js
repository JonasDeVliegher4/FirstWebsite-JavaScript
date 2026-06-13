describe('Register a user', () => {

    it('register user', () => {
  
        cy.visit('http://localhost:5173/register');

        cy.get('[data-cy=register_name]').type("Lotte De Vliegher");
        cy.get('[data-cy=register_email]').type("lottedevliegher@gmail.com");
        cy.get('[data-cy=register_phoneNr]').type(324444444);
        cy.get('[data-cy=register_password]').type("12345678");
        cy.get('[data-cy=register_confirmPassword]').type("12345678");

        cy.get('[data-cy=register_btn]').click();

        cy.get('[data-cy=no_afspraken_message]').contains("Er zijn nog geen afspraken.");

    });

});