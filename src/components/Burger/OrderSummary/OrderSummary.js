import React from 'react';
import Button from '../../UI/Button/Button';

class OrderSummary extends React.Component {
    render() {
        const ingredients = Object.keys(this.props.ingredients)
            .map(ingredient => (
                <li key={ingredient}>
                    <span style={{ textTransform: "capitalize" }}>
                        {ingredient}
                    </span>:{this.props.ingredients[ingredient]}
                </li>
            ))
        return (

            <React.Fragment>
                <h3>Your order summary</h3>
                <p>A delicious burger with following ingrediemts</p>
                <ul>
                    {ingredients}
                </ul>
                <p><strong>Total price is {this.props.totalPrice}</strong></p>
                <p>Continue to checkout?</p>
                <Button btnType="Danger" click={this.props.cancel}>CANCEL</Button>
                <Button btnType="Success" click={this.props.continue}>CONTINUE</Button>
            </React.Fragment>
        )
    }
}

export default OrderSummary;