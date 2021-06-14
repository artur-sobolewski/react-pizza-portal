import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { auth } from '../firebase';
import logo from "../images/pizza-logo.png";

const Header = () => {

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

    const signOut = () => {
        auth.signOut();
    }

    if (!user) {
        return (
            <header className="header">
                <div className="logo-box">
                    <NavLink to="/" exact >
                        <img src={logo} className="logo" alt="logo"/>
                    </NavLink> 
                </div>
                <nav className="nav-box">
                    <NavLink to="/" className="nav-elem" activeClassName='is-active' exact >Start</NavLink>
                    <NavLink to="/order" className="nav-elem" activeClassName='is-active'>Order</NavLink>
                    <NavLink to="/menu" className="nav-elem" activeClassName='is-active'>Menu</NavLink>
                    <NavLink to="/compose" className="nav-elem" activeClassName='is-active'>Compose</NavLink>
                </nav>
                <div className="buttons-box">
                    <div className="login-box">
                        <NavLink to="/signin" className="link" activeClassName='is-active-link'>Sign In</NavLink>
                    </div>
                    <NavLink to="/signup" className="sign-button" activeClassName='is-active-button'>Sign Up</NavLink>
                </div>
            </header>
        )
    } 
    return (
        <header className="header">
            <div className="logo-box">
                <NavLink to="/" exact >
                    <img src={logo} className="logo" alt="logo"/>
                </NavLink> 
            </div>
            <nav className="nav-box">
                <NavLink to="/" className="nav-elem" activeClassName='is-active' exact >Start</NavLink>
                <NavLink to="/order" className="nav-elem" activeClassName='is-active'>Order</NavLink>
                <NavLink to="/menu" className="nav-elem" activeClassName='is-active'>Menu</NavLink>
                <NavLink to="/compose" className="nav-elem" activeClassName='is-active'>Compose</NavLink>
            </nav>
            <div className="buttons-box">
                <div className="login-box">
                    <NavLink to="/user" className="user-name" activeClassName='is-active-link'>
                        Welcome {auth.currentUser.displayName}
                    </NavLink>
                </div>
                <NavLink to="/" className="signout-button" onClick={signOut}
                activeClassName='is-active-button'>SignOut</NavLink>
            </div>
        </header>
    )
    
}

export default Header;