import React from 'react';
import styles from './Layout.module.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

class Layout extends React.Component {
    state = {
        showSideDrawer: false
    }
    sideDrawerHandler = () => {
        this.setState({
            showSideDrawer: !this.state.showSideDrawer
        })
    }
    render() {
        return (
            <React.Fragment>
                <SideDrawer close={this.sideDrawerHandler} open={this.state.showSideDrawer} />
                <Toolbar showSideDrawer={this.sideDrawerHandler} />
                <div className={styles.content}>
                    {this.props.children}
                </div>
            </React.Fragment>
        )
    }
}

export default Layout;