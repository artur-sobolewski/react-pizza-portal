import { useState } from 'react';
import { auth, provider, fs } from '../firebase';
import { Redirect } from 'react-router-dom';


const SignIn = (props) => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [redirect, setRedirect] = useState(false);


    const login = () => {

        if (email !== "" && password !== "")    {
            var result = auth.signInWithEmailAndPassword(email, password).then(() => {
                
                if (result !== null){
                    setRedirect(true);
                    console.log("zalogowano");
                } 
            }).catch(error => {
                console.log(error);
            })
            
            setEmail("");
            setPassword("");
        }
    };

    const loginFB = () => {

        fs
        .auth()
        .signInWithPopup(provider)
        .then((result) => {
            if (result !== null){
                setRedirect(true);
                console.log("zalogowano");
            } 
        })
        .catch((error) => {
            console.log(error)
        });
      
    };

    if (redirect){
        return <Redirect to={"/" + props.location }/>
    }

    return (
        <div className="signIn-signUp">
            <h1>{props.message}</h1>
            <div className="form">
                <label htmlFor="email">Email: </label>
                <input
                    className="form-input"
                    placeholder="Email"
                    value={email}
                    id="email"
                    // pattern="[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{1,63}$" 
                    required
                    onChange={e => setEmail(e.target.value)}
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
                <button className="signin-button" onClick={login} >Sign In</button>
                <button className="signin-button" onClick={loginFB} >Facebook Sign In</button>
            </div>
        </div>
    );
}
export default SignIn;