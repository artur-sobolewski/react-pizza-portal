import { Component } from 'react';
import { NavLink } from 'react-router-dom';
import ComposingContext from './ComposingContext';
import Pizza from '../models/Pizza';
import { NotificationManager } from 'react-notifications';

class CustomPizza extends Component {

    constructor(props) {
        super(props);
        this.state = { 
            id: this.props.id,
            name: this.props.name,
            ingredients: [],
            isComposed: false,
            selectedOption: "medium",
            smallPc: this.props.smallPc,
            mediumPc: this.props.mediumPc,
            bigPc: this.props.bigPc,
        };
        this.onValueChange = this.onValueChange.bind(this);
        this.addOrderHandle = this.addOrderHandle.bind(this);
        this.addOrder = this.props.callback;
        this.createNotification = this.createNotification.bind(this);
    }

    static contextType = ComposingContext

    componentDidMount() {
        const ingredients = this.context
        var comp = false;
        var ing = [];
        ingredients.ingredients.forEach(i => {
            if (i.isSelected) {
                ing.push(i.name)
                comp = true;
            }
        })
        this.setState({
            ingredients: ing,
            isComposed: comp,
            smallPc: this.state.smallPc + ingredients.totalCost,
            mediumPc: this.state.mediumPc + ingredients.totalCost,
            bigPc: this.state.bigPc + ingredients.totalCost
        })
    }

    onValueChange = (event) => {
        this.setState({
            selectedOption: event.target.value
        });
    };

    addOrderHandle() {
        var pc = 0;
        if (this.state.selectedOption === "small"){
            pc = this.state.smallPc;
        }
        else if (this.state.selectedOption === "medium"){
            pc = this.state.mediumPc;
        }
        else if (this.state.selectedOption === "big"){
            pc = this.state.bigPc;
        }
        this.addOrder(
            new Pizza(this.state.id, this.state.name, this.state.selectedOption, pc, this.state.ingredients)
        );
        this.createNotification();
    }

    createNotification = () => {
        NotificationManager.success('', 'Pizza added to order', 3000);
    }
    
    
    render () {
        const listToRender = this.state.ingredients.map((ingredient, index) => (
            <li key={index + 10} style={{display: "inline"}}>{ingredient} </li>
        ));
        return (
                <div className="pizza-box">
                    <div className="pizza-img-box">
                        <img src={this.props.pic} className="pizza-img" alt="custom pizza"/>
                    </div>
                    <div className="pizza-desc">
                        <br></br>
                        <h4>{this.props.name}</h4>
                        <div className="ingredients-box">
                            <p>{listToRender}</p>
                        </div>
                        <form>
                            <label htmlFor={"small" + this.props.id}>
                                <input 
                                    type="radio" 
                                    id={"small" + this.props.id} 
                                    name="size"
                                    value="small"
                                    checked={this.state.selectedOption === "small"}
                                    onChange={this.onValueChange}
                                />
                                <div className="size">
                                    Small {this.state.smallPc}$
                                </div>
                            </label>
                            <label htmlFor={"medium" + this.props.id}>
                                <input 
                                    type="radio"
                                    id={"medium" + this.props.id}
                                    name="radio-group"
                                    value="medium"
                                    checked={this.state.selectedOption === "medium"}
                                    onChange={this.onValueChange}
                                />
                                <div className="size">
                                    Medium {this.state.mediumPc}$
                                </div>
                            </label>
                            <label htmlFor={"big" + this.props.id}>
                                <input
                                    type="radio"
                                    id={"big" + this.props.id}
                                    name="radio-group"
                                    value="big"
                                    checked={this.state.selectedOption === "big"}
                                    onChange={this.onValueChange}
                                />
                                <div className="size">
                                    Big {this.state.bigPc}$
                                </div>
                            </label>
                        </form>
                        {/* <button className="add-order-button">Choose Your ingredients</button> */}
                        {
                            this.state.isComposed ?
                            <div>
                                <button className="add-order-button" 
                                    onClick={this.addOrderHandle}>
                                        Add to order
                                </button>
                                <NavLink to="/compose">
                                    <button className="add-order-button">Edit</button>
                                </NavLink>
                            </div>
                            :
                            <NavLink to="/compose">
                                <button className="add-order-button">Choose ingredients</button>
                            </NavLink>
                        }
                        
                    </div>
                </div>
        );
    };
}
export default CustomPizza;