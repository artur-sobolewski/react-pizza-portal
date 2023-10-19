import { useEffect, useState } from 'react';
import { auth, getOrders } from '../firebase';
import OrderM from '../models/OrderModel';
import './User.css';


const OrderHistory = () => {

    const [user, setUser] = useState(false);
    const [ orders, setOrders ] = useState([]);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(
            authUser => {
                if (authUser) {
                    setUser(true);
                    var newOrd = [];
                    getOrders(auth.currentUser).then((querySnapshot) => {
                        querySnapshot.forEach((doc) => {
                            
                            const orderData = doc.data();

                            const date = new Date(orderData.orderDate.seconds * 1000).toString().split(" ");
                            const newDate = []
                            for(var i = 0; i < date.length; i++){
                                newDate.push( date[i] )
                            }    
                            const address = [];
                            address.push(orderData.address.street)
                            address.push(orderData.address.building)
                            address.push(orderData.address.local)

                            newOrd.push(new OrderM( newDate, orderData.totalCost,
                                address, orderData.pizzas))
                        });
                        setOrders(newOrd);
                    })

                } else {
                    setUser(false);
                }
            },
        );
        return () => {
            unsubscribe();
        }
    }, []);


    const renderOrders = orders.map((order, index) => (

        <div key={index} className="order-box">
            <div className="order-date-box">
                <p>{order.orderDate[2]} {order.orderDate[1]} {order.orderDate[3]}</p>
                <p>{order.orderDate[0]}</p>
                <p>{order.orderDate[4]}</p>
            </div>
            <div className="order-desc">
                
                {
                    order.pizzas.map((p, index1) => (
                        <div  key={index1 + 100} className="pizza-in-history">
                            <p>{p.name} - {p.size} - {p.pizzaCost}$</p>
                            <p>
                                {p.ingredients.map((ing, index2) => (
                                    <li key={index2 + 10000} style={{display: "inline"}}>{ing} </li>
                                ))}
                            </p>
                        </div>
                    ))
                }
            </div>
            <div className="address-box">
                <div className="my-col">
                    <h5 className="light">Street: </h5>
                    <p>{order.address[0]}</p>
                </div>
                <div className="my-col">
                    <h5 className="light">Builging: </h5>
                    <p>{order.address[1]}</p>
                </div>
                <div className="my-col">
                    <h5 className="light">Local: </h5>
                    <p>{order.address[2]}</p>
                </div>
            </div>
            <div className="cost-box">
                <p>Total cost:</p>
                <h4 key={index + 10}>{order.totalCost}$</h4>
            </div>

        </div>
    ));

    return (
        
        user ?
        <div className="order-grid">    
            {renderOrders}
        </div>
        :
        <div className="user-message">
            <h1>You are not logged</h1>
        </div>
        
    );

}
export default OrderHistory;