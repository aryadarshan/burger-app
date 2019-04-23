import React from 'react';
import styles from './BuildControllers.module.css';
import BuildController from './BuildController/BuildController';

const controls = [
    { label: 'Salad', type: 'salad' },
    { label: 'Meat', type: 'meat' },
    { label: 'Cheese', type: 'cheese' },
    { label: 'Bacon', type: 'bacon' }
]
const BuildControllers = (props) => (
    <div className={styles.BuildControls}>
        <p>Current Price $ <strong>{props.price.toFixed(2)}</strong></p>
        {controls.map(control =>
            <BuildController
                label={control.label}
                key={control.label}
                add={() => props.addIngredient(control.type)}
                remove={() => props.removeIngredient(control.type)}
                disable={props.disabledInfo[control.type]}
            />
        )}
        <button
            className={styles.OrderButton}
            disabled={!props.showOrderNow}
            onClick={props.purchasing}
        >
            Order now
        </button>
    </div>
)

export default BuildControllers;