import { Component } from 'react';
import { NavLink } from 'react-router-dom';
import pizza from "../images/pizza.png"

class Starting extends Component {

    render () {
        return (
            <div className="starting">
                <div className="starting-desc">
                    <p>&#128512;  EASY WAY TO ORDER YOUR FOOD</p>
                    <h1 className="white-text">Order Tasty & </h1>
                    <h1 className="white-text">Fresh Food</h1>
                    <h1 className="red-text">anytime!</h1>
                    <p>Just confirm your order and enjoy our</p>
                    <p>delicious fastest delivery.</p>

                    <div className="buttons-box">
                        <NavLink to="/order" className="order-button" activeClassName='is-active'>Order Now</NavLink>
                        <NavLink to="/menu" className="menu-link" activeClassName='is-active-link'>See menu</NavLink>
                    </div>
                </div>
                <div className="logo-box">
                    <img src={pizza} className="starting-pic" alt="pizza"/>
                </div>
            </div>
        );
    }
}
export default Starting;