import React from 'react';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import BackDrop from '../../UI/Backdrop/Backdrop';
import styles from './SideDrawer.module.css';

const SideDrawer = props => {
    let attachedClasses = [styles.SideDrawer, styles.Close]
    if (props.open) {
        attachedClasses = [styles.SideDrawer, styles.Open]
    }
    return (
        <React.Fragment>
            <BackDrop show={props.open} click={props.close} />
            <div className={attachedClasses.join(' ')}>
                <div className={styles.Logo}>
                    <Logo />
                </div>
                <nav>
                    <NavigationItems />
                </nav>
            </div>
        </React.Fragment>
    )
}

export default SideDrawer;