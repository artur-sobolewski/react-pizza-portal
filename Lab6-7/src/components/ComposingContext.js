import { createContext } from "react";


const ComposingContext = createContext({
    ingredients: [],
    setIngredients: () => {},
    totalCost: 0,
    setTotalCost: () => {},
});


export default ComposingContext;