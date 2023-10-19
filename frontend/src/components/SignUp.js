import { useState } from 'react';
import { auth } from '../firebase';
import { NavLink } from 'react-router-dom';
import { Redirect } from 'react-router-dom';

const SignUp = () => {

    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [repeatPassword, setReapeatPassword] = useState("");
    const [redirect, setRedirect] = useState("");


    const signUp = () => {
        auth.createUserWithEmailAndPassword(email, password)
            .then(() => {
                auth.signInWithEmailAndPassword(email, password)
                .then((loggedUser) => {
                    loggedUser.user.updateProfile({
                        displayName: name,
                    })
                })
                .catch(error => {
                    console.log(error);
                })
                setRedirect(true);
            })
            .catch(error => {
                console.log(error);
            })
    };

    if (redirect){
        return <Redirect to="/" />
    }

    return (
        <div className="signIn-signUp">
            <h1>Regiseter User</h1>
            <div className="form">
                <label htmlFor="email">Email: </label>
                <input
                    className="form-input"
                    placeholder="Email"
                    type="email" 
                    id="email"
                    value={email}
                    pattern="[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{1,63}$" 
                    required
                    onChange={e => setEmail(e.target.value)}
                />
                <label htmlFor="name">Name: </label>
                <input
                    className="form-input"
                    placeholder="Name"
                    value={name}
                    id="name"
                    required
                    onChange={e => setName(e.target.value)}
                />
                <label htmlFor="password">Password: </label>
                <input
                    className="form-input"
                    placeholder="Password"
                    type="password"
                    id="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                />
                <label htmlFor="repeatPassword">Repeat password: </label>
                <input
                    className="form-input"
                    placeholder="Repeat password"
                    type="password"
                    id="repeatPassword"
                    value={repeatPassword}
                    onChange={e => setReapeatPassword(e.target.value)}
                />
                <NavLink to="/" className="signin-button" onClick={signUp}
                activeClassName='is-active-button'>Sign Up</NavLink>
            </div>
        </div>
    );
}
export default SignUp;