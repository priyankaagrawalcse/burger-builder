import React, { Component } from 'react'
import {connect} from 'react-redux'
import { Redirect } from 'react-router-dom'
import Input from '../../components/UI/Forms/Input/Input'
import Button from '../../components/UI/Button/Button'
import Constant from '../BurgerConstants'
import Spinner from '../../components/UI/Spinner/Spinner'
import classes from './Auth.css'
import * as actions from '../../store/actions/index'
import {updateObject, checkValidity} from '../../shared/utility'

class Auth extends Component {
    state = {
        controls: {
            email: {
                elementType : 'input',
                elementConfig: {
                    type : 'email',
                    placeholder : 'Mail Address'
                },
                value: "",
                validation: {
                    required : true,
                    isEmail : true
                },
                isValid : false,
                touched : false
            },
            password : {
                elementType : 'input',
                elementConfig : {
                    type : 'password',
                    placeholder : 'Password'
                },
                value: '',
                validation: {
                    required : true,
                    minLength : 6
                },
                valid : false,
                touched : false
            }
        },
        isSignUp: true
    }

    componentDidMount(){
        if((!this.props.building && this.props.redirectPath!=='/') || this.props.isAuthenticated ){
            this.props.onSetAuthRedirectPath();
        }
    }
    
    inputChangedHandler = (event, controlName) => {
        const updatedControls = updateObject(this.state.controls, {
            [controlName]: updateObject(this.state.controls[controlName],{
                value: event.target.value,
                valid : checkValidity(event.target.value, this.state.controls[controlName].validation),
                touched : true
            })      
        })
        
        this.setState({controls : updatedControls});
    }

    submitHandler = (event) => {
        event.preventDefault();
        const email = this.state.controls.email.value;
        const password = this.state.controls.password.value;
        const isSignUp = this.state.isSignUp;
        this.props.onFormSubmit(email, password, isSignUp)
        if(this.props.isAuthenticated){
            this.props.onSetAuthRedirectPath();
        }
    }

    switchAuthModeHandler = () => {
        this.setState(prevState => {
            return {isSignUp : !prevState.isSignUp}
        })
    }

    render () {
        const formElementArray = [];
        for(let key in this.state.controls){
            formElementArray.push({
                id: key,
                config : this.state.controls[key]
            });
        }
        
        let form = formElementArray.map(formElement => (
            <Input key={formElement.id}
                    element = {formElement.id}
                    elementType = {formElement.config.elementType}
                    elementConfig = {formElement.config.elementConfig}
                    value = {formElement.config.value}
                    inValid = {formElement.config.valid}
                    shouldValidate = {formElement.config.validation}
                    touched = {formElement.config.touched}
                    changed={(event) => {this.inputChangedHandler(event, formElement.id)}}
            />
        ))
        if(this.props.loading){
            form = <Spinner />
        }
        let errormsg = null;
        if(this.props.error){
        errormsg = <p style={{color: 'red'}}><strong>{this.props.error.message}</strong></p>
        }
        let authRedirect = null
        if(this.props.isAuthenticated){
            authRedirect = <Redirect to={this.props.redirectPath} />
        }
        return(
            <div className={ classes.Auth }>
                {authRedirect}
                {errormsg}
                <form onSubmit={this.submitHandler}>
                    {form}
                    <Button btnType={Constant.BUTTON_TYPE_SUCCESS}>SUBMIT</Button>
                </form>
                <Button 
                    clicked={this.switchAuthModeHandler}
                    btnType={Constant.BUTTON_TYPE_DANGER}>SWITCH TO {this.state.isSignUp ? 'SIGNIN' : 'SIGNUP'}</Button>
            </div>
        )
    }
}
const mapStateToProps = state => {
    return{
        loading : state.auth.loading,
        error : state.auth.error,
        isAuthenticated : state.auth.token !== null,
        building : state.burgerBuilder.building,
        redirectPath : state.auth.setRedirectPath
    }
}

const mapDispatchToProps = dispatch => {
    return{
        onFormSubmit: (email, password, isSignUp) => dispatch(actions.auth(email, password, isSignUp)),
        onSetAuthRedirectPath : () => dispatch(actions.setAuthRedirectPath('/'))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth)