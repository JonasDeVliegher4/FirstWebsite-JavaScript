describe('Add afspraak', () => {
  
  beforeEach(() => {
    cy.login('devliegherjonas@gmail.com', '12345678');
  });
  
  it('should add a afspraak', () => {
    cy.visit('http://localhost:5173/afspraken/add');


    cy.get('[data-cy=typeAfspraak_input]').select("Klassieke gelaatsverzorging");
    cy.get('[data-cy=date_input]').type("2024-08-21");
    cy.get('[data-cy=time_input]').select('17:00');
    cy.get('[data-cy=submit_afspraken]').click();

    cy.visit('http://localhost:5173/afspraken');
    
    cy.get('[data-cy=afspraken_date_input]').type("2024-08-18");
    cy.get('[data-cy=afspraken_date_btn]').click();

    cy.get('[data-cy=afspraak_user]').contains("Jonas De Vliegher");
    cy.get('[data-cy=afspraak_typeAfspraken]').contains("Klassieke gelaatsverzorging");
    cy.get('[data-cy=afspraak_date]').contains("21/08/2024");
    cy.get('[data-cy=data-cy=afspraak_time]').contains("17:00 - 18:00");
  });
});