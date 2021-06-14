import { useContext, useState, useEffect } from 'react';
import { auth, addOrder, saveCart, deleteCart, db } from '../firebase';
import OrderContext from './OrderContext';
import './Order.css'
import original from "../images/original.png";
import meatDeluxe from "../images/meat deluxe.png";
import neapolitan from "../images/neapolitan.png";
import pepperoni from "../images/pepperoni.png";
import periPeri from "../images/peri peri.png";
import tropical from "../images/tropical.png";
import SignIn from './SignIn';
import { NotificationManager } from 'react-notifications';
import Pizza from '../models/Pizza';

const Order = () => {

    const { pizzas, setPizzas, orderTotalCost, setOrderTotalCost } = useContext(OrderContext);
    const [user, setUser] = useState(false);

    const [street, setStreet] = useState("");
    const [building, setBuilding] = useState("");
    const [local, setLocal] = useState("");

    const createSuccessNotification = (message) => {
        NotificationManager.success('', message, 3000);
    }

    const createErrorNotification = (message) => {
        NotificationManager.error(message, 'Error', 4000);
    }

    const storageCart = (cartPizza) => {
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

    useEffect(() => {
        var sum = 0;

        const unsubscribe = auth.onAuthStateChanged(
            authUser => {
                if (authUser) {
                    
                    var pCol = [];
                    db.collection('cart').doc(auth.currentUser.uid).get().then((doc) => {
                        if (doc && doc.exists){

                            const myData = doc.data();
                            for (var i = 0; i < myData.pizzas.length; i++){
                                var p = myData.pizzas[i];

                                pCol.push(new Pizza(p.id, p.name, p.size, Number(p.pizzaCost), p.ingredients));
                                sum += Number(p.pizzaCost);
                            }
                            if (pCol.length !== 0) {
                                setPizzas(pCol);
                                setOrderTotalCost(sum);
                            }
                            else {
                                setPizzas([]);
                                setOrderTotalCost(0);
                            }
                        }
                    });

                    setUser(true);
                    
                } else {
                    setUser(false);
                }
            },
        );
        return () => {
            unsubscribe();
        }
    })

    const makeOrder = () => {
        var data = {};
        var pizzasCollection = [];
        pizzas.forEach((p) => {
            data = {
                name: p.name,
                size: p.size,
                pizzaCost: p.price,
                ingredients: [...p.ingredients]
            }
            pizzasCollection.push(data);
        });

        if (user) {
            if (pizzas.length === 0) {
                createErrorNotification("You didn't select any pizza");
            } 
            else if (street === "" || building === "" || local === ""){
                createErrorNotification("You have to fill all address fields");
            } else {

                var address = {
                    street: street,
                    building: building,
                    local: local,
                };

                addOrder(auth.currentUser, address, pizzasCollection, orderTotalCost)

                setPizzas([]);
                storageCart([]);
                // setOrderTotalCost(0);

                // deleteCart(auth.currentUser);

                // setStreet("");
                // setBuilding("");
                // setLocal("");

                createSuccessNotification('Order has been made');
            }
        } else {
            createErrorNotification("You can't make order without logging");
        }
    }

    const deletePizza = (item) => {
        var sum = 0;
        var newPizzas = [];
        pizzas.forEach((pizza) => {
            if (pizza !== item) {
                newPizzas.push(pizza);
                sum += pizza.price;
            }
        })
        setPizzas(newPizzas);

        setOrderTotalCost(sum);


        deleteCart(auth.currentUser);

        storageCart(newPizzas);
    }

    const renderSwitchPic = (param) => {
        switch(param) {
            case 'Custom':
                return <img src={neapolitan} className="order-pizza-img" alt="neapolitan"/>;
            case 'Original':
                return <img src={original} className="order-pizza-img" alt="original"/>;
            case 'Meat Deluxe':
                return <img src={meatDeluxe} className="order-pizza-img" alt="meat deluxe"/>;
            case 'Tropical':
                return <img src={tropical} className="order-pizza-img" alt="tropical"/>;
            case 'Pepperoni':
                return <img src={pepperoni} className="order-pizza-img" alt="pepperoni"/>;
            case 'Peri Peri':
                return <img src={periPeri} className="order-pizza-img" alt="peri peri"/>;
            default:
                return <></>;
        }
      }

    const renderItems = pizzas.map((pizza, index) => (

        <div key={index} className="order-pizza-box">
            <div className="order-pizza-img-box">
                {renderSwitchPic(pizza.name)}
            </div>
            <div className="order-pizza-desc">
                <h4 key={index + 10}>{pizza.name} - {pizza.size} - {pizza.price}$</h4>
                <br></br>
                <div className="ingredients-box">
                    <p>
                        {pizza.ingredients.map((ing, index) => (
                            <li key={index + 100} style={{display: "inline"}}>{ing} </li>
                        ))}
                    </p>
                </div>

                <button className="delete-order-button" onClick={() =>
                    deletePizza(pizza)}>
                        Delete
                </button>
            </div>
        </div>
    ));

    return(
        <div className="main-grid">
            
            <div className="info-panel">
                <div className="centered-text">
                    <h3>Total pizzas: <p className="green-text">{pizzas.length}</p>  </h3>
                </div>
                <div className="centered-text">
                    <h3>Total cost: <p className="green-text">{orderTotalCost}$</p>  </h3>
                </div>
                <div className="accept-button-box">
                    <button className="accept-button centered-text"  onClick={makeOrder}>
                        Make order
                    </button>
                </div>
            </div>
            <div className="order-pizza-grid">
                {
                    pizzas.length > 0 ?
                    <div className="order-pizza-list">
                        {renderItems}
                    </div>
                    :
                    <div className="order-pizza-list">
                        <h2>Choose your pizza from menu!</h2>
                    </div>
                }



                <div>
                    {
                        user ?
                        <div className="signIn-signUp">
                            <h1>Fill in the address fields</h1>
                            <div className="form">
                                <label htmlFor="street">Street: </label>
                                <input
                                    className="form-input"
                                    placeholder="Street"
                                    value={street}
                                    id="street"
                                    required
                                    onChange={e => setStreet(e.target.value)}
                                />
                                <label htmlFor="building">Building number: </label>
                                <input
                                    className="form-input"
                                    placeholder="Building number"
                                    id="building"
                                    value={building}
                                    onChange={e => setBuilding(e.target.value)}
                                />
                                <label htmlFor="local">Local number: </label>
                                <input
                                    className="form-input"
                                    placeholder="Local number"
                                    id="local"
                                    value={local}
                                    onChange={e => setLocal(e.target.value)}
                                />
                                <button className="accept-button" onClick={makeOrder}>
                                    Make order
                                </button>
                            </div>
                        </div>
                        :
                        <SignIn message="You have to be logged to make order" location="order"/>
                    }
                    
                </div>
            </div>
        </div>
    );
}
export default Order;