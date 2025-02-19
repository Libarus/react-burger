import { base_api_url } from '../../src/shared/constants';

function getScenaAttrib(id) {
    return `[data-cy=${id}]`;
}

const BI_ITEM = 'bi_item'; // элементы ингредиенты
const CI_DROP = 'ci_drop'; // блок для сброса ингредиента
const BUN_ITEM1 = 'bun_item1'; // элемент булки top
const BUN_ITEM2 = 'bun_item2'; // элемент булки bottom
const MODAL_WINDOW = 'modal_window'; // модальное окно
const MODAL_TITLE = 'modal_title'; // заголовок ингредиента в модальном окне
const CLOSE_BUTTON = 'close_button'; // кнопка закрытия модального окна
const ORDER_BUTTON = 'order_button'; // кнопка заказа

describe('constructor', () => {
    beforeEach(() => {
        // cy.intercept('GET', `${base_api_url}/auth/user`, { fixture: 'user_data.json' });
        // cy.intercept('POST', `${base_api_url}/orders`, { fixture: 'order_data.json' }).as('make-order');
        // cy.setCookie('accessToken', 'test-access-token');
        // cy.setCookie('refreshToken', 'test-refresh-token');
        // window.localStorage.setItem('accessToken', 'test-access-token');
        // window.localStorage.setItem('refreshToken', 'test-refresh-token');
        // cy.fixture('user_data.json').then(data => {
        //     const jsonAsString = JSON.stringify(data);
        //     window.localStorage.setItem('user', jsonAsString);
        // });
        cy.visit('/');
    });

    it('d&d', () => {
        cy.get(getScenaAttrib(BI_ITEM) + ` [data-ingedient-title]`)
            .eq(1)
            .invoke('text')
            .then(text => {
                const title = text;
                cy.log(title); // Логируем текст элемента в консоль

                cy.get(getScenaAttrib(BI_ITEM)).eq(1).trigger('dragstart');
                cy.get(getScenaAttrib(CI_DROP)).trigger('drop');

                cy.get(getScenaAttrib(BUN_ITEM1) + ' .constructor-element__text')
                    .invoke('text')
                    .should('eq', title);
                cy.get(getScenaAttrib(BUN_ITEM2) + ' .constructor-element__text')
                    .invoke('text')
                    .should('eq', title);
            });
    });

    it('modal', () => {
        const num = Math.round(Math.random() * 10);
        cy.log(`Num element: ${num}`);
        cy.get(getScenaAttrib(BI_ITEM) + ` [data-ingedient-title]`)
            .eq(num)
            .invoke('text')
            .then(text => {
                const title = text;
                cy.log(title); // Логируем текст элемента в консоль

                cy.get(getScenaAttrib(BI_ITEM)).eq(num).click();

                cy.get(getScenaAttrib(MODAL_WINDOW)).should('be.visible');

                cy.get(getScenaAttrib(MODAL_TITLE))
                    .invoke('text')
                    .should('eq', title);

                cy.log('Close modal window');
                cy.get(getScenaAttrib(CLOSE_BUTTON)).click();
                cy.get(getScenaAttrib(MODAL_WINDOW)).should('not.exist');
            });
    });

    it('order', () => {
        cy.request({
            method: 'POST',
            url: `${base_api_url}/auth/login`,
            body: {
                email: 'ton@ton.ton',
                password: '123454321',
            },
        }).then(response => {
            const accessToken = response.body.accessToken;
            const refreshToken = response.body.refreshToken;

            window.localStorage.setItem('accessToken', accessToken);
            window.localStorage.setItem('refreshToken', refreshToken);

            cy.log(window.localStorage.getItem('accessToken'));
            cy.log(window.localStorage.getItem('refreshToken'));

            const num = Math.round(Math.random() * 3);
            cy.log(`Num element: ${num}`);
            for (let i = 0; i < num; i++) {
                cy.get(getScenaAttrib(BI_ITEM))
                    .eq(i + 2)
                    .trigger('dragstart');
                cy.get(getScenaAttrib(CI_DROP)).trigger('drop');
            }

            cy.get(getScenaAttrib(ORDER_BUTTON)).click();
            cy.get(getScenaAttrib(MODAL_WINDOW), { timeout: 30000 }).should('exist');

            cy.log('Close modal window');
            cy.get(getScenaAttrib(CLOSE_BUTTON)).click();
            cy.get(getScenaAttrib(MODAL_WINDOW)).should('not.exist');
        });
    });
});
