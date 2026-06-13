describe("mijn eerste test", () => {
  it("draait de applicatie", () => {
    cy.visit('http://localhost:5173');
    cy.get("h1").should("exist"); 
  });

  it("should login and logout again", () => {
    cy.login('vervaetsofie@gmail.com', '12345678');

    cy.logout();
  });

}); 