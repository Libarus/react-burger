import AppHeader from "./components/header/app-header/app-header";
import BurgerConstructor from "./components/constructor/burger-constructor/burger-constructor";
import BurgerIngredients from "./components/ingredients/burger-ingredients/burger-ingredients";

const App = () => {
  return (
    <>
        <AppHeader />
        <div style={{display: 'flex', flexDirection: 'row', maxWidth: '1200px', margin: '0 auto'}} className="gap-4">
            <BurgerIngredients />
            <BurgerConstructor />
        </div>
    </>
  );
}

export default App;
