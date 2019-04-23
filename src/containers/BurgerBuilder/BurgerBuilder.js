import React from 'react';
import Burger from '../../components/Burger/Burger';
import BuildControllers from '../../components/Burger/BuildControllers/BuildControllers';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-order';
import Spinner from '../../components/UI/Spinner/Spinner';
import WithErrorHandler from '../hoc/WithErrorHandler/WithErrorHandler';

const INGREDIENT_PRICE = {
    salad: 0.5,
    bacon: 0.7,
    meat: 1.3,
    cheese: 0.4
}
class BurgerBuilder extends React.Component {
    state = {
        ingredients: null,
        totalPrice: 4,
        purchasable: false,
        purchasing: false,
        loading: false,
        error: false
    }
    componentDidMount() {
        axios.get('https://burger-5f08f.firebaseio.com/ingredients.json')
            .then(response => {
                this.setState({
                    ingredients: response.data
                })
            })
            .catch(error => { this.setState({ error }) })
    }

    updatePurchaseHandler = () => {
        const ingredients = {
            ...this.state.ingredients
        }
        const sum = Object.keys(ingredients)
            .map(key => ingredients[key])
            .reduce((sum, el) => {
                return sum + el
            }, 0)
        this.setState({
            purchasable: sum > 0
        })
    }

    addIngredientHandler = (type) => {
        const oldIngCount = this.state.ingredients[type];
        const updatedIngCount = oldIngCount + 1;
        const updatedIngredients = {
            ...this.state.ingredients
        }
        updatedIngredients[type] = updatedIngCount;
        const priceAddition = INGREDIENT_PRICE[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition
        this.setState({
            ingredients: updatedIngredients,
            totalPrice: newPrice
        }, () => this.updatePurchaseHandler())

    }

    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        if (oldCount <= 0) {
            return null;
        }
        const updatedCount = oldCount - 1;
        const updatedIngredients = {
            ... this.state.ingredients
        }
        updatedIngredients[type] = updatedCount;
        const price = INGREDIENT_PRICE[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - price;
        this.setState({
            ingredients: updatedIngredients,
            totalPrice: newPrice
        }, () => this.updatePurchaseHandler())
    }

    purchaseHandler = () => {
        this.setState({
            purchasing: true
        })
    }
    purchaseCancelHandler = () => {
        this.setState({
            purchasing: false
        })
    }
    purchaseContinueHandler = () => {
        this.setState({
            loading: true
        })
        const order = {
            ingredients: this.state.ingredients,
            price: this.state.totalPrice,
            customer: {
                name: 'Max',
                address: {
                    street: 'New LA',
                    zipcode: '1234',
                    country: 'Germany'
                },
                email: 'test@test.com'
            },
            devileryMethod: 'fastest'
        }
        axios.post('orders.json', order)
            .then(() => this.setState({ loading: false, purchasing: false }))
            .catch(() => this.setState({ loading: false, purchasing: false }))
    }
    render() {
        const disabledInfo = {
            ...this.state.ingredients
        }
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }
        return (
            <React.Fragment>
                <Modal
                    show={this.state.purchasing}
                    click={this.purchaseCancelHandler}
                >
                    {this.state.loading ? <Spinner /> :
                        this.state.ingredients &&
                        <OrderSummary
                            ingredients={this.state.ingredients}
                            cancel={this.purchaseCancelHandler}
                            continue={this.purchaseContinueHandler}
                            totalPrice={this.state.totalPrice.toFixed(2)}
                        />
                    }
                </Modal>
                {this.state.error ? <p>Ingredients can't be loaded</p> :
                    (this.state.ingredients ?
                        <React.Fragment>
                            <Burger ingredients={this.state.ingredients} />
                            <BuildControllers
                                price={this.state.totalPrice}
                                addIngredient={this.addIngredientHandler}
                                removeIngredient={this.removeIngredientHandler}
                                disabledInfo={disabledInfo}
                                showOrderNow={this.state.purchasable}
                                purchasing={this.purchaseHandler}
                            />
                        </React.Fragment> : <Spinner />

                    )}
            </React.Fragment>
        )
    }
}

export default WithErrorHandler(BurgerBuilder, axios);