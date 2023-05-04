describe('App E2E', () => {
  it('should have a form', () => {
    cy.visit('/');

    cy.get('input').should('have.value', '');
    cy.get('button').should('have.text', 'Load Issue');
  });

  it('should load github repo', () => {
    
  })
});