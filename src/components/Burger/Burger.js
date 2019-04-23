import React from 'react';
import styles from './Burger.module.css'
import BurgerIngredients from './BurgerIngredients/BurgerIngredients';

const Burger = (props) => {
    let ingredients = Object.keys(props.ingredients)
        .map(ingredient => {
            //console.log(ingredient, props.ingredients[ingredient], [...Array(props.ingredients[ingredient])]);
            return ([...Array(props.ingredients[ingredient])]
                .map((_, index) =>
                    <BurgerIngredients key={ingredient + index} type={ingredient} />
                )
            )
        })
        .reduce((prev, cur) => {
            return prev.concat(cur)
        }, []);
    //console.log(ingredients);
    if (ingredients.length === 0) {
        ingredients = <p>Please start adding ingredients..</p>
    }

    return (
        <div className={styles.Burger}>
            <BurgerIngredients type="breadTop" />
            {ingredients}
            <BurgerIngredients type="breadBottom" />
        </div>
    )
}

export default Burger;