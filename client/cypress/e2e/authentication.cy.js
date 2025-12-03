describe('Authentication Tests', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  describe('Sign In Page', () => {
    it('should navigate to sign in page', () => {
      cy.get('a[href="/signin"]').click();
      cy.url().should('include', '/signin');
      cy.contains('Sign In').should('be.visible');
    });

    it('should display sign in form elements', () => {
      cy.visit('/signin');
      cy.get('input[type="email"]').should('be.visible');
      cy.get('input[type="password"]').should('be.visible');
      cy.get('button[type="submit"]').should('be.visible');
    });

    it('should show error for invalid credentials', () => {
      cy.visit('/signin');
      cy.get('input[type="email"]').type('invalid@email.com');
      cy.get('input[type="password"]').type('wrongpassword');
      cy.get('button[type="submit"]').click();
      cy.contains('User not found').should('be.visible');
    });

    it('should login successfully with valid credentials', () => {
      cy.visit('/signin');
      cy.get('input[type="email"]').type('admin@portfolio.com');
      cy.get('input[type="password"]').type('admin123');
      cy.get('button[type="submit"]').click();
      cy.url().should('eq', Cypress.config().baseUrl + '/');
      cy.contains('Admin').should('be.visible');
    });

    it('should have link to sign up page', () => {
      cy.visit('/signin');
      cy.contains("Don't have an account?").should('be.visible');
      cy.get('a[href="/signup"]').should('be.visible');
    });
  });

  describe('Sign Up Page', () => {
    it('should navigate to sign up page', () => {
      cy.get('a[href="/signup"]').click();
      cy.url().should('include', '/signup');
      cy.contains('Sign Up').should('be.visible');
    });

    it('should display sign up form elements', () => {
      cy.visit('/signup');
      cy.get('input[placeholder="Your Name"]').should('be.visible');
      cy.get('input[type="email"]').should('be.visible');
      cy.get('input[placeholder="At least 6 characters"]').should('be.visible');
      cy.get('input[placeholder="Confirm your password"]').should('be.visible');
      cy.get('button[type="submit"]').should('be.visible');
    });

    it('should show error for mismatched passwords', () => {
      cy.visit('/signup');
      cy.get('input[placeholder="Your Name"]').type('Test User');
      cy.get('input[type="email"]').type('test@example.com');
      cy.get('input[placeholder="At least 6 characters"]').type('password123');
      cy.get('input[placeholder="Confirm your password"]').type('differentpassword');
      cy.get('button[type="submit"]').click();
      cy.contains('Passwords do not match').should('be.visible');
    });

    it('should have link to sign in page', () => {
      cy.visit('/signup');
      cy.contains('Already have an account?').should('be.visible');
      cy.get('a[href="/signin"]').should('be.visible');
    });
  });

  describe('Sign Out', () => {
    it('should sign out successfully', () => {
      // First login
      cy.visit('/signin');
      cy.get('input[type="email"]').type('admin@portfolio.com');
      cy.get('input[type="password"]').type('admin123');
      cy.get('button[type="submit"]').click();
      cy.url().should('eq', Cypress.config().baseUrl + '/');

      // Then sign out
      cy.contains('Sign Out').click();
      cy.get('a[href="/signin"]').should('be.visible');
      cy.get('a[href="/signup"]').should('be.visible');
    });
  });
});
