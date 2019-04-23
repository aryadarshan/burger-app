import React from 'react';
import styles from './Modal.module.css';
import Backdrop from '../Backdrop/Backdrop';

class Modal extends React.Component {

    shouldComponentUpdate(prevProps, prevState) {
        return prevProps.show !== this.props.show || prevProps.children !== this.props.children
    }
    render() {
        return (
            <React.Fragment>
                <Backdrop show={this.props.show} click={this.props.click} />
                <div
                    className={styles.Modal}
                    style={{
                        transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
                        opacity: this.props.show ? '1' : '0'
                    }}
                >
                    {this.props.children}
                </div>
            </React.Fragment>
        )
    }
}
export default Modal;