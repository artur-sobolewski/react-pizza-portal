import './User.css';
import { auth } from '../firebase';
import { NavLink, Switch, Route } from 'react-router-dom';
import OrderHistory from './OrdersHistory';
import { useEffect, useState } from 'react';
import Settings from './Settings';


const User = () => {

    const [user, setUser] = useState(false);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(
            authUser => {
                if (authUser) {
                    setUser(true);
                } else {
                    setUser(false);
                }
            },
        );
        return () => {
            unsubscribe();
        }
    }, [])

    return (
        <div>
            <div >
                <nav className="user-nav-box">
                    <NavLink to="/user/history" className="user-nav-elem-left" activeClassName='is-active' exact>Order history</NavLink>
                    <NavLink to="/user/settings" className="user-nav-elem-right" activeClassName='is-active'>Settings</NavLink>
                </nav>
            </div>
            <Switch>
            <Route path="/user" exact>
                {
                    user ?
                    <div className="user-message">
                        <h1>You are logged as {auth.currentUser.displayName}</h1>
                        <h2>See your orders history or change settings</h2>
                    </div>
                    :
                    <div className="user-message">
                        <h1>You are not logged</h1>
                    </div>
                }
                
            </Route>
            <Route path="/user/history" exact> 
                <OrderHistory />
            </Route>
            <Route path="/user/settings"> 
                <Settings />
            </Route>
            </Switch>
        </div>
    )
}

export default User;