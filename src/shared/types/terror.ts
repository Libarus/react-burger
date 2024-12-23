// Тип для возвращаемой функции обработчика ошибок
export type TErrorFn = (e: Error) => void;

export type TError = {
    message: string;
};
