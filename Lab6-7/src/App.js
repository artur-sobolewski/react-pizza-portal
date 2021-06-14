import './App.css';
import Main from "./components/Main";
import Header from './components/Header';
import { BrowserRouter } from "react-router-dom";
import ComposingContext from './components/ComposingContext';
import OrderContext from './components/OrderContext';
import { useState } from 'react';
import Ingredient from './models/Ingredient';
import ham from "./images/ham.png";
import cheese from "./images/cheese.png";
import mushrooms from "./images/mushrooms.png";
import onion from "./images/onion.png";
import olives from "./images/olives.png";
import pepperoni_ing from "./images/pepperoni_ing.png";
import bacon from "./images/bacon.png";
import jalapeno from "./images/jalapeno.png";
import pepper from "./images/pepper.png";
import tomato from "./images/tomato.png";


import {NotificationContainer} from 'react-notifications';


function App() {

  const [ ingredients, setIngredients ] = useState([
    new Ingredient(1, "ham", 2, false, ham),
    new Ingredient(2, "pepperoni", 2, false, pepperoni_ing),
    new Ingredient(3, "bacon", 3, false, bacon),
    new Ingredient(4, "cheese", 1, false, cheese),
    new Ingredient(5, "mushrooms", 1, false, mushrooms),
    new Ingredient(6, "onion", 1, false, onion),
    new Ingredient(7, "olives", 2, false, olives),
    new Ingredient(8, "jalapeno", 2, false, jalapeno),
    new Ingredient(9, "pepper", 1, false, pepper),
    new Ingredient(10, "tomato", 1, false, tomato)
  ]);
  const [ totalCost, setTotalCost ] = useState(0);
  const [ pizzas, setPizzas ] = useState([]);
  const [ orderTotalCost, setOrderTotalCost ] = useState(0);


  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <ComposingContext.Provider value={{ingredients, setIngredients, totalCost, setTotalCost}}>
        <OrderContext.Provider value={{pizzas, setPizzas, orderTotalCost, setOrderTotalCost}}>
          <div className="message">
          <NotificationContainer />
          </div>
          <div className="main-panel">
            <Header />
            <Main />
            {/* <Footer /> */}
          </div>
        </OrderContext.Provider>
      </ComposingContext.Provider>
    </BrowserRouter>
  );
}

export default App;
