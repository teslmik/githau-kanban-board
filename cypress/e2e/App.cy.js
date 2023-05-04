describe('App E2E', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should have a form', () => {
    cy.get('input[type="text"]').should('have.value', '');
    cy.get('button').should('have.text', 'Load Issue');
  });

  it('should have three columns', () => {
    cy.get('div.issues-column').should('have.length', 3);
    cy.get('div.issues-column > div > div > article > h3.ant-typography')
      .should('have.length', 3)
      .each(($el, index) => {
        const titles = ['ToDo', 'In Progress', 'Done'];
        expect($el).to.have.text(titles[index]);
      });
  });

  it('should load github repo & drag and drop', () => {
    cy.intercept('GET', 'https://api.github.com/repos/facebook/react/*').as('load');
    cy.get('input[type="text"]').type('https://github.com/facebook/react');
    cy.get('input[type="text"]').should('have.value', 'https://github.com/facebook/react');
    cy.contains('Load Issue').click();
    cy.wait('@load');
    cy.get('input[type="text"]').should('have.value', '');
    cy.get('div.ant-col.css-dev-only-do-not-override-yp8pcc')
      .find('div[role="button"]')
      .should('exist');

    cy.get('[data-test-card-id="1664953332"]').mouseMoveBy(0, 200);
    cy.get('[data-test-card-id="1695567116"]').mouseMoveBy(0, 200);
    cy.get('[data-test-card-id="1696386038"]').mouseMoveBy(0, 200);
    cy.get('[data-test-card-id="1694656163"]').mouseMoveBy(0, -200);

    cy.get('input[type="text"]').type('https://github.com/clauderic/react-sortable-hoc');
    cy.contains('Load Issue').click();
    cy.wait('@load');
    cy.get('div.ant-col.css-dev-only-do-not-override-yp8pcc')
      .find('div[role="button"]')
      .should('exist');

    cy.get('input[type="text"]').type('https://github.com/facebook/react');
    cy.contains('Load Issue').click();
    cy.wait('@load');
    cy.get('div.ant-col.css-dev-only-do-not-override-yp8pcc')
      .find('div[role="button"]')
      .should('exist');
  });
});
