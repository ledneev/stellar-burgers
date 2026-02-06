declare namespace Cypress {
  interface Chainable {
    /**
     * Команда для логина через мок токенов
     * @example cy.login()
     */
    login(): Chainable<void>;
  }
}
