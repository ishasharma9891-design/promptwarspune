describe('Beginner Learning Flow', () => {
  beforeEach(() => {
    // Visit the app
    cy.visit('/');
  });

  it('completes a full beginner learning sequence', () => {
    // 1. Initial Greeting
    cy.contains('Welcome back').should('be.visible');
    
    // 2. Ask a question
    cy.get('input[placeholder*="Type your response"]').type('Tell me about JavaScript variables{enter}');
    
    // 3. Verify AI Response structure
    cy.get('.glass-panel').should('exist');
    cy.contains('Explanation').should('be.visible');
    cy.contains('Analogy').should('be.visible');
    cy.contains('Q:').should('be.visible');
    
    // 4. Verify level badge
    cy.contains('Intermediate').should('exist'); // Default level in mock
  });

  it('navigates to dashboard to check progress', () => {
    cy.get('nav').contains('Dashboard').click();
    cy.url().should('include', '/'); // Single page app check
    cy.contains('Your Dashboard').should('be.visible');
    cy.contains('Total XP').should('be.visible');
  });
});
