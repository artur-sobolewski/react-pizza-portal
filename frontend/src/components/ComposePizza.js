import { useContext, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import IngredientBox from './IngredientBox';
import './ComposePizza.css'

import ComposingContext from './ComposingContext';



const ComposePizza = () => {

    const { ingredients, setIngredients, totalCost, setTotalCost } = useContext(ComposingContext);


    useEffect(() => {
        var sum = 0;
        ingredients.forEach(i => {
            if (i.isSelected){
                sum += i.price;
            }
        });

        setTotalCost(sum);
    });

  
    function onValueChange(event) {
        var items = [...ingredients];
        items.forEach((i) => {
            if (i.name.toLowerCase() === event.target.value.toLowerCase()){
                if (i.isSelected){
                    i.isSelected = false;
                } else {
                    i.isSelected = true;
                }
            }
        })
        setIngredients(items);
    }

    const renderIngredients = ingredients.map((ingredient, index) => (

        <label key={index} htmlFor={ingredient.name} className="ingredient-box">
            <input 
                type="checkbox"
                name="ingredients"
                value={ingredient.name}
                id={ingredient.name}
                onChange={onValueChange}
                checked={ingredient.isSelected}
            />
            <IngredientBox
                pic={ingredient.pic}
                name={ingredient.name}
                pc={ingredient.price}
                className="ingredients"
            />
        </label>
    ));

    return (

        
        <div className="main-grid">
            <div className="info-panel">
                <div></div>
                <div className="info-box centered-text">
                    <h3>Total cost: <p className="green-text">{totalCost}$</p>  </h3>
                </div>
                <div className="accept-button-box">
                    <NavLink to="/menu" className="accept-button centered-text">
                        Accept
                    </NavLink>
                </div>
            </div>

            <form className="ingredient-grid" id="ingredients">
                {renderIngredients}
            </form>
        </div>
    );
}

export default ComposePizza;