describe('Add typeAfspraak', () => {


    it('should see the type afspraken', () => {

        cy.visit('http://localhost:5173/soortenAfspraken');

        cy.get('[data-cy=category_name]').contains("Gelaatsverzorging");

        cy.get('[data-cy=typeAfspraak_name]').contains("Gelaatsverzorging voor de gevoelige huid");
        cy.get('[data-cy=typeAfspraak_description]').contains("Een kalmerende en hypoallergene verzorging voor de gevoelige huid.");
        cy.get('[data-cy=typeAfspraak_price]').contains("65€");
        cy.get('[data-cy=typeAfspraak_time]').contains("60 min");
    })
})