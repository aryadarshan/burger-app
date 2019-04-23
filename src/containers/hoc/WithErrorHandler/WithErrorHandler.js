import React from 'react';
import Modal from '../../../components/UI/Modal/Modal';

const WithErrorHandler = (WrappedComponnet, axios) => {
    return class extends React.Component {
        state = {
            error: null
        }
        componentWillMount() {
            this.reqInterceptor = axios.interceptors.request.use(request => {
                this.setState({ error: null })
                return request;
            })
            this.resInterCeptor = axios.interceptors.response.use(request => request, error => this.setState({ error: error }))
        }
        componentWillUnmount() {
            axios.interceptors.request.eject(this.reqInterceptor)
            axios.interceptors.response.eject(this.resInterCeptor)
        }
        errorHandler = () => {
            this.setState({
                error: null
            })
        }
        render() {
            return (
                <React.Fragment>
                    {this.state.error &&
                        <Modal
                            show={this.state.error}
                            click={this.errorHandler}
                        >
                            {this.state.error.message}
                        </Modal>
                    }
                    <WrappedComponnet />
                </React.Fragment>
            )
        }
    }
}

export default WithErrorHandler;