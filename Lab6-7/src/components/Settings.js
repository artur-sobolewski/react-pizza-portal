import { useEffect, useState } from 'react';
import { auth } from '../firebase';
import './User.css';


const Settings = () => {

    const [user, setUser] = useState(false);
    const [name, setName] = useState("");

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(
            authUser => {
                if (authUser) {
                    setUser(true);
                    setName(auth.currentUser.displayName)
                }else {
                    setUser(false);
                }
            },
        );
        return () => {
            unsubscribe();
        }
    }, []);


    const updateProfile = () => {
        if (auth.currentUser){
            auth.currentUser.updateProfile({
                displayName: name,
            })
            setName("");
        }
    }

    return (
        
        user ?   
        <div className="signIn-signUp">
            <h1>Change Settings</h1>
            <div className="form">

                <label htmlFor="name">Name: </label>
                <input
                    className="form-input"
                    placeholder="Name"
                    value={name}
                    id="name"
                    required
                    onChange={e => setName(e.target.value)}
                />
                <button className="signin-button" onClick={updateProfile}
                activeclassname='is-active-button'>Save</button>
            </div>
        </div>
        :
        <div className="user-message">
            <h1>You are not logged</h1>
        </div>
        
    );

}
export default Settings;