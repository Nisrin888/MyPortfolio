describe('Contact Form Tests', () => {
  beforeEach(() => {
    cy.visit('/contact');
  });

  it('should display contact page heading', () => {
    cy.contains('Get In Touch').should('be.visible');
  });

  it('should display contact form', () => {
    cy.get('input[placeholder="First Name"]').should('be.visible');
    cy.get('input[placeholder="Last Name"]').should('be.visible');
    cy.get('input[placeholder="you@example.com"]').should('be.visible');
    cy.get('textarea[placeholder="Your message"]').should('be.visible');
    cy.contains('Send Message').should('be.visible');
  });

  it('should display contact information', () => {
    cy.contains("Let's Connect").should('be.visible');
    cy.contains('Email').should('be.visible');
    cy.contains('Location').should('be.visible');
  });

  it('should allow typing in form fields', () => {
    cy.get('input[placeholder="First Name"]').type('John');
    cy.get('input[placeholder="Last Name"]').type('Doe');
    cy.get('input[placeholder="you@example.com"]').type('john@example.com');
    cy.get('textarea[placeholder="Your message"]').type('This is a test message');

    cy.get('input[placeholder="First Name"]').should('have.value', 'John');
    cy.get('input[placeholder="Last Name"]').should('have.value', 'Doe');
    cy.get('input[placeholder="you@example.com"]').should('have.value', 'john@example.com');
    cy.get('textarea[placeholder="Your message"]').should('have.value', 'This is a test message');
  });

  it('should submit contact form successfully', () => {
    cy.get('input[placeholder="First Name"]').type('John');
    cy.get('input[placeholder="Last Name"]').type('Doe');
    cy.get('input[placeholder="you@example.com"]').type('john@example.com');
    cy.get('textarea[placeholder="Your message"]').type('This is a test message from Cypress');

    cy.contains('Send Message').click();

    // Wait for success message
    cy.contains('Message sent successfully', { timeout: 10000 }).should('be.visible');
  });

  it('should clear form after successful submission', () => {
    cy.get('input[placeholder="First Name"]').type('Jane');
    cy.get('input[placeholder="Last Name"]').type('Smith');
    cy.get('input[placeholder="you@example.com"]').type('jane@example.com');
    cy.get('textarea[placeholder="Your message"]').type('Another test message');

    cy.contains('Send Message').click();

    cy.contains('Message sent successfully', { timeout: 10000 }).should('be.visible');

    // Form should be cleared
    cy.get('input[placeholder="First Name"]').should('have.value', '');
    cy.get('input[placeholder="Last Name"]').should('have.value', '');
    cy.get('input[placeholder="you@example.com"]').should('have.value', '');
    cy.get('textarea[placeholder="Your message"]').should('have.value', '');
  });
});
