module.exports = {
    // Указываем, что будем использовать TypeScript
    preset: 'ts-jest',

    // Настраиваем пути к тестируемым файлам
    testMatch: ['<rootDir>/src/**/*.test.(js|jsx|ts|tsx)'],

    // Модули, которые нужно игнорировать при сборке тестов
    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/src/$1',
        '^@shared/(.*)$': '<rootDir>/src/shared/$1',
        '^@services/(.*)$': '<rootDir>/src/services/$1',
        '^@pages/(.*)$': '<rootDir>/src/components/app/pages/$1',
    },

    // Расширения файлов, которые будут использоваться для поиска тестов
    extensionsToTreatAsEsm: ['.ts', '.tsx'],

    // Префиксы для именования тестов
    testPathIgnorePatterns: ['/node_modules/', '/dist/'],

    // Включаем поддержку ESM модулей
    transform: {
        '^.+\\.[jt]sx?$': 'babel-jest',
    },
};