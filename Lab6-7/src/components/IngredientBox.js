import { Component } from 'react';

class IngredientBox extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: this.props.name,
            pc: this.props.pc,
        };
    }
    
    
    render () {

        return (
            <div className="ingredient-box">
                <div className="ingredient-img-box">
                    <img src={this.props.pic} className="ingredient-img" alt={this.state.name + "pic"}/>
                </div>
                <div className="ingredient-desc">
                    <br></br>
                    <h4>{this.state.name}</h4>
                    <h4>Price: {this.state.pc}$</h4>
                </div>
            </div>
        );
    }
}
export default IngredientBox;