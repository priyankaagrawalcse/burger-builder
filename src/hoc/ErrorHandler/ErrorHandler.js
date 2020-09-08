import React, {Component} from 'react'
import Aux from '../Auxiliary/Auxiliary'
import Modal from '../../components/UI/Modal/Modal'

const errorHandler = (WrappedComponent, axios) =>{
    return class extends Component {
        state = {
            error : null
        }
        UNSAFE_componentWillMount(){
            this.reqIterceptors = axios.interceptors.request.use(req=>{
                this.setState({error : null})
                return req;
            })
            this.resIterceptors = axios.interceptors.response.use(res=> res, error=>{
                this.setState({error: error})
            })
        }

        componentWillUnmount(){
            axios.interceptors.request.eject(this.reqIterceptors);
            axios.interceptors.response.eject(this.resIterceptors)
        }
        errorConfirmedHandler = () =>{
            this.setState({error : null})
        }
        render(){
            return (
                <Aux>
                    <Modal show={this.state.error}
                            modalClosed={this.errorConfirmedHandler}>
                        <p style={{textAlign : 'center', color: 'red', fontWeight: 'bolder'}}>
                            {this.state.error ? this.state.error.message : null}
                        </p>
                    </Modal>
                    <WrappedComponent {...this.props} />
                </Aux>    
            )
        }
    }
}
export default errorHandler