import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import './App.css';

type Props = {
    router: ReturnType<typeof createBrowserRouter>;
};

/**
 * Компонент App - корневой компонент приложения.
 */
function App({ router }: Props) {
    return <RouterProvider router={router} future={{ v7_startTransition: true }} />;
}

export default App;
