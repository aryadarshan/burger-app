import React from 'react';
import BurgerLogo from '../../assest/burger-logo.png';
import styles from './Logo.module.css';

const Logo = () => (
    <div className={styles.Logo}>
        <img src={BurgerLogo} alt="Burger Logo" />
    </div>
)

export default Logo;