import React from 'react';
import styles from './Button.module.css';

const Button = props => (
    <button onClick={props.click} className={[styles.Button, styles[props.btnType]].join(' ')}>
        {props.children}
    </button>
)

export default Button;