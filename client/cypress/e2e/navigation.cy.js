describe('Navigation Tests', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should load the home page', () => {
    cy.contains("Hi, I'm Nischal").should('be.visible');
  });

  it('should navigate to About page', () => {
    cy.get('a[href="/about"]').click();
    cy.url().should('include', '/about');
    cy.contains('About').should('be.visible');
  });

  it('should navigate to Education page', () => {
    cy.get('a[href="/education"]').click();
    cy.url().should('include', '/education');
    cy.contains('Education').should('be.visible');
  });

  it('should navigate to Services page', () => {
    cy.get('a[href="/services"]').click();
    cy.url().should('include', '/services');
    cy.contains('Services').should('be.visible');
  });

  it('should navigate to Projects page', () => {
    cy.get('a[href="/projects"]').click();
    cy.url().should('include', '/projects');
    cy.contains('Projects').should('be.visible');
  });

  it('should navigate to Contact page', () => {
    cy.get('a[href="/contact"]').click();
    cy.url().should('include', '/contact');
    cy.contains('Get In Touch').should('be.visible');
  });

  it('should navigate using View My Work button', () => {
    cy.contains('View My Work').click();
    cy.url().should('include', '/projects');
  });

  it('should navigate using Contact Me button', () => {
    cy.contains('Contact Me').click();
    cy.url().should('include', '/contact');
  });
});
