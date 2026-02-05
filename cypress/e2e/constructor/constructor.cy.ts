describe('Конструктор бургера', () => {
  beforeEach(() => {
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' }).as(
      'getIngredients'
    );
    cy.visit('/');
    cy.wait('@getIngredients');
  });

  it('Добавление ингредиента в конструктор', () => {
    const bun = 'Краторная булка N-200i';
    const main = 'Биокотлета из марсианской Магнаты';
    const sauce = 'Соус традиционный галактический';

    cy.contains(bun).parent().find('button').click();
    cy.get('[data-cy="constructor-bun-top"]').should('contain', bun);
    cy.get('[data-cy="constructor-bun-bottom"]').should('contain', bun);

    cy.contains(main).parent().find('button').click();
    cy.get('[data-cy="constructor-main"]').should('contain', main);

    cy.contains(sauce).parent().find('button').click();
    cy.get('[data-cy="constructor-main"]').should('contain', sauce);
  });

  describe('Модальное окно ингредиента', () => {
    it('Открывается по клику на ингредиент', () => {
      cy.contains('Краторная булка N-200i').click();
      cy.get('[data-cy="modal"]').should('be.visible');
      cy.get('[data-cy="modal-title"]').should('contain', 'Детали ингредиента');
    });

    it('Закрывается по клику на крестик', () => {
      cy.contains('Краторная булка N-200i').click();
      cy.get('[data-cy="modal-close"]').click();
      cy.get('[data-cy="modal"]').should('not.exist');
    });

    it('Закрывается по клику на оверлей', () => {
      cy.contains('Краторная булка N-200i').click();
      cy.get('[data-cy="modal-overlay"]').click({ force: true });
      cy.get('[data-cy="modal"]').should('not.exist');
    });
  });

  describe('Оформление заказа', () => {
    beforeEach(() => {
      cy.login();
      cy.intercept('POST', 'api/auth/user', { fixture: 'user.json' }).as(
        'getUser'
      );
      cy.intercept('POST', 'api/orders', { fixture: 'order.json' }).as(
        'createOrder'
      );
    });

    it('Оформление заказа и проверка модального окна', () => {
      cy.contains('Краторная булка N-200i').parent().find('button').click();
      cy.contains('Биокотлета из марсианской Магнаты')
        .parent()
        .find('button')
        .click();

      cy.get('[data-cy="order-button"]').contains('Оформить заказ').click();

      cy.get('[data-cy="modal"]').should('be.visible');
      cy.get('[data-cy="order-number"]').should('contain', '12345');

      cy.get('[data-cy="modal-close"]').click();
      cy.get('[data-cy="modal"]').should('not.exist');

      cy.get('[data-cy="constructor-bun-top"]').should(
        'not.contain.text',
        'Краторная булка'
      );
      cy.get('[data-cy="constructor-main"]').should(
        'not.contain.text',
        'Биокотлета'
      );
    });
  });
});
