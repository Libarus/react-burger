import AppHeader from "./components/app-header/app-header";
import BurgerConstructor from "./components/burger-constructor/burger-constructor";
import BurgerIngredients from "./components/burger-ingredients/burger-ingredients";

const App = () => {
  return (
    <>
        <AppHeader />
        <div style={{display: 'flex', flexDirection: 'row', maxWidth: '1200px', margin: '0 auto'}} className="gap-4">
            <BurgerConstructor />
            <BurgerIngredients />
        </div>
    </>
  );
}

export default App;
