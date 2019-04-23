import React from 'react';
import styles from './BuildController.module.css';

const BuildController = (props) => (
    <div className={styles.BuildControl}>
        <div className={styles.Label}>{props.label}</div>
        <button className={styles.Less} onClick={props.add}>+</button>
        <button className={styles.More} onClick={props.remove} disabled={props.disable}>-</button>
    </div>
)

export default BuildController;