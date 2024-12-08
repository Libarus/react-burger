# react-burger

Учебный проект на Яндекс.практикуме - React разработчик

# Sprint 2 / Step 1 - открыт

Реализация без промежуточного шага

**(!) Для ревьювера. Если вопрос принципиален, чтобы финальная ветка называлась sprint_2/step_2 готов переделать**

- [+] 1. Обновление инфраструктуры приложения
- [+] 2. Подготовка хранилища (Redux Toolkit)
- [+] 3. Создание первых экшенов и редьюсеров
- [+] 4. Доработка интерфейса навигации по ингредиентам (Redux Toolki, React-dnd)
- [+] 5. Реализация перетаскивания ингредиентов
- [+] 6. Подсчёт итоговой стоимости бургера
- [+] 8. Вложенная сортировка ингредиентов в BurgerConstructor
- [+] 9. Проверка типизации

# Sprint 1 / Step 2 - закрыт

URL для получения данных

- [+] Реализовано получение данных с сервера. Сервис запросов /shared/api/*
- [+] Вывод данных в компоненты BurgerConstructor и BurgerIngredients
- [+] Создан компонент ErrorBoundry для отлова ошибок
- [+] Реализовано модальное окно Modal с фоном ModalOverlay через портал
- [+] Реализованы компоненты IngredientDetails и OrderDetails
- [+] Добавлены во все компоненты, которые принимают значение проверку типов через PropTypes
- [+] Проект проверен по чек-листу


# Sprint 1 / Step 1 - закрыт

Создана структура проекта через CRA на чистом JS

## Паки и файлы

- src *- основная папка проекта*
    - components *- папка с компонентами*
        - app *- основной стартовй компонент*
        - header *- содерджит компоненты для шапки*
        - constructor *- содерджит компоненты для правой части с конструктором*
        - ingredients *- содержит компоненты для левой части с ингридиентами*
    - font *-шрифты (пустая)*
    - images *- изображения (пустая)*
    - mock-data *- моковые (тестовые) данные*