import { createContext } from "react";


const MyContext = createContext({
    message = "",
    setMessage = () => {}
});