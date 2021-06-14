import { createContext } from "react";

const OrderContext = createContext({
    pizzas: [],
    setPizzas: () => {},
    orderTotalCost: 0,
    setOrderTotalCost: () => {}
});


export default OrderContext;