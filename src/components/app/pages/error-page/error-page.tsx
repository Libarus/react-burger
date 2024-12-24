import { isRouteErrorResponse, useRouteError } from 'react-router-dom';

const errorMessages: Record<number, { title: string; code: string; message?: string }> = {
    404: {
        title: 'Oh No!',
        code: '#404',
        message: 'You’ve hit a block that doesn’t exist.',
    },
    500: {
        title: 'Something went wrong!',
        code: '#500',
        message: 'We know about it and we’re working on it!',
    },
    1000: {
        title: 'Panic!',
        code: 'Panic!!',
    },
};

export const ErrorPage = () => {
    const error = useRouteError();

    let msg = '';
    let errorCode = 1000;

    if (isRouteErrorResponse(error)) {
        switch (error.status) {
            case 404:
                errorCode = 404;
                break;
            case 500:
                errorCode = 500;
                break;
            default:
                msg = error.statusText;
        }
    } else {
        msg = error as string;
    }

    const { title, code, message = msg } = errorMessages[errorCode];

    return (
        <div className='min-h-screen bg-background'>
            <div className='min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4'>
                {title}
                {code}
                {message}
            </div>
        </div>
    );
};
