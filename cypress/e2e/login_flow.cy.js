describe('Login + MFA Flow', () => {
  // Runs before all tests
  before(() => {
    // Make sure dev server is running
    cy.visit('/login'); 
  });

  it('Blocks access to protected route without login', () => {
    // Use full URL or baseUrl in config
    cy.visit('/dashboard');
    // React Router should redirect unauthenticated users to /login
    cy.url().should('include', '/login');
  });

  it('Allows login with valid credentials and MFA', () => {
    cy.visit('/login');

    // Enter valid email/password
    cy.get('input[name="email"]').type('user1@example.com');
    cy.get('input[name="password"]').type('password123');
    cy.get('button[type="submit"]').click();

    // Should be redirected to MFA page
    cy.url().should('include', '/mfa');

    // Enter valid MFA code
    cy.get('input[name="otp"]').type('123456');
    cy.get('button[type="submit"]').click();

    // Should be redirected to dashboard
    cy.url().should('include', '/dashboard');

    // Dashboard should display something only logged-in users can see
    cy.contains('Welcome, user1@example.com');
  });

  it('Prevents read-only user from seeing edit actions', () => {
    cy.visit('/login');
    cy.get('input[name="email"]').type('user1@example.com');
    cy.get('input[name="password"]').type('password123');
    cy.get('button[type="submit"]').click();
    cy.get('input[name="otp"]').type('123456');
    cy.get('button[type="submit"]').click();

    // Check that edit actions are hidden
    cy.url().should('include', '/dashboard');
    cy.get('[data-cy=read-only-msg]').should('exist');
    cy.get('[data-cy=edit-action]').should('not.exist');
  });

  it('Allows read/write user to see edit actions', () => {
    cy.visit('/login');
    cy.get('input[name="email"]').type('admin@example.com');
    cy.get('input[name="password"]').type('admin123');
    cy.get('button[type="submit"]').click();
    cy.get('input[name="otp"]').type('123456');
    cy.get('button[type="submit"]').click();

    // Check that edit actions are visible
    cy.url().should('include', '/dashboard');
    cy.get('[data-cy=edit-action]').should('exist');
    cy.get('[data-cy=read-only-msg]').should('not.exist');
  });
});
