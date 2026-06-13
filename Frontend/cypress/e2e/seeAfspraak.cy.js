describe('See afspraak', () => {
  
    beforeEach(() => {
      cy.login('vervaetsofie@gmail.com', '12345678');
    });
    
    it('should see a afspraak', () => {
  
      cy.visit('http://localhost:5173/afspraken');
      
      cy.get('[data-cy=afspraken_date_input]').type("2024-08-30");
      cy.get('[data-cy=afspraken_date_btn]').click();
  
      cy.get('[data-cy=afspraak_user]').contains("Kris De Vliegher");
      cy.get('[data-cy=afspraak_typeAfspraken]').contains("Intensieve gelaatsverzorging");
      cy.get('[data-cy=afspraak_date]').contains("30/08/2024");
      cy.get('[data-cy=afspraak_time]').contains("15:00 - 16:30");
    });
  });