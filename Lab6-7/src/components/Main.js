import { Switch, Route } from 'react-router-dom';
import Starting from './Starting';
import SignIn from './SignIn';
import SignUp from './SignUp';
import Menu from './Menu';
import Order from './Order';
import ComposePizza from './ComposePizza';
import User from './User';

const Main = () => {

    return (
        <Switch>
            <Route path="/" exact> 
                <Starting />
            </Route>
            <Route path="/order"> 
                <Order />
            </Route>
            <Route path="/menu"> 
                <Menu />
            </Route>
            <Route path="/signin">
                <SignIn message="User Login" location=""/>
            </Route>
            <Route path="/signup"> 
                <SignUp />
            </Route>
            <Route path="/compose"> 
                <ComposePizza />
            </Route>
            <Route path="/user"> 
                <User />
            </Route>
            <Route>
                <div className="user-message">
                    <h1>404 Not Found</h1>
                </div>
            </Route>
        </Switch>
    )
}

export default Main;