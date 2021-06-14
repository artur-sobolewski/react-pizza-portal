import { Component } from 'react';
import { auth, saveCart, deleteCart } from '../firebase'
import PizzaBox from './PizzaBox';
import CustomPizza from './CustomPizza';
import './Menu.css';
import original from "../images/original.png";
import meatDeluxe from "../images/meat deluxe.png";
import neapolitan from "../images/neapolitan.png";
import pepperoni from "../images/pepperoni.png";
import periPeri from "../images/peri peri.png";
import tropical from "../images/tropical.png";
import OrderContext from './OrderContext';


class Menu extends Component {

    constructor(props) {
        super(props);
        this.state = { 
            pizzas: [],
            show: true,
        };
        this.updateOrder = this.updateOrder.bind(this);
        this.storageCart = this.storageCart.bind(this);
    }

    storageCart(cartPizza){
        var pizzasCollection = [];
        cartPizza.forEach((p) => {
            var data = {
                id: p.id,
                name: p.name,
                size: p.size,
                pizzaCost: p.price,
                ingredients: [...p.ingredients]
            }
            pizzasCollection.push(data);
        });
        saveCart(auth.currentUser, pizzasCollection);
    }

    static contextType = OrderContext

    updateOrder(pizza){
        const order = this.context;
        var sum = 0;
        var pizzasPom = [];

        order.pizzas.forEach((p) => {
            pizzasPom.push(p);
            sum = sum + p.price;
        })
        pizzasPom.push(pizza);
        sum = sum + pizza.price;

        order.setPizzas(pizzasPom);

        deleteCart(auth.currentUser.uid);
        this.storageCart(pizzasPom);

        order.setOrderTotalCost(sum);

    };

    render () {
        return (
            <>
            <div className="pizza-grid">
                <CustomPizza
                    pic={neapolitan}
                    name="Custom"
                    id={0}
                    smallPc={3}
                    mediumPc={5}
                    bigPc={7}
                    callback={this.updateOrder}
                />
                <PizzaBox 
                    pic={original}
                    name="Original"
                    id={1}
                    ingredients={["sausage", "cheese", "cucumber", "onion", "tomato", "parsley"]}
                    smallPc={8}
                    mediumPc={10}
                    bigPc={12}
                    callback={this.updateOrder}
                />
                <PizzaBox 
                    pic={meatDeluxe}
                    name="Meat Deluxe"
                    id={2}
                    ingredients={["kebab meat", "ham", "bacon", "peperoni", "cheese"]}
                    smallPc={10}
                    mediumPc={12}
                    bigPc={14}
                    callback={this.updateOrder}
                />
                <PizzaBox
                    pic={tropical}
                    name="Tropical"
                    id={3}
                    ingredients={["chicken", "cheese", "ham", "jalapeno", "pepper", "pineapple", "cheese"]}
                    smallPc={8}
                    mediumPc={10}
                    bigPc={12}
                    callback={this.updateOrder}
                />
                <PizzaBox
                    pic={pepperoni}
                    name="Pepperoni"
                    id={4}
                    ingredients={["pepperoni", "gouda cheese", "cheddar"]}
                    smallPc={6}
                    mediumPc={8}
                    bigPc={10}
                    callback={this.updateOrder}
                />
                <PizzaBox
                    pic={periPeri}
                    name="Peri Peri"
                    id={5}
                    ingredients={["ham", "olives", "mushrooms", "pepper", "oregano", "basil"]}
                    smallPc={9}
                    mediumPc={11}
                    bigPc={13}
                    callback={this.updateOrder}
                />
            </div>
            </>
        );
    }
}
export default Menu;