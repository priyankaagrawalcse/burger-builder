import React, {Component} from 'react'
import { connect } from 'react-redux'
import classes from './ContactData.css'
import Button from '../../../components/UI/Button/Button'
import BurgerConstant from '../../BurgerConstants'
import axios from '../../../axios'
import Spinner from '../../../components/UI/Spinner/Spinner'
import Input from '../../../components/UI/Forms/Input/Input'
import ErrorHandler from '../../../hoc/ErrorHandler/ErrorHandler'
import * as actions from '../../../store/actions/index'
import { updateObject, checkValidity } from '../../../shared/utility'

class ContactData extends Component{
    state = {
        orderForm: {
            name: {
                elementType : 'input',
                elementConfig: {
                    type : 'text',
                    placeholder : 'Your Name'
                },
                value: "",
                validation: {
                    required : true
                },
                isValid : false,
                touched : false
            },
            street: {
                elementType : 'input',
                elementConfig: {
                    type : 'text',
                    placeholder : 'Street'
                },
                value: "",
                validation: {
                    required : true
                },
                isValid : false,
                touched : false
            },
            zipCode: {
                elementType : 'input',
                elementConfig: {
                    type : 'text',
                    placeholder : 'Zip COde'
                },
                value: "",
                validation: {
                    required : true,
                    minLength : 5,
                    maxLength : 5,
                    isNumeric : true
                },
                isValid : false,
                touched : false
            },
            country: {
                elementType : 'input',
                elementConfig: {
                    type : 'text',
                    placeholder : 'Country'
                },
                value: "",
                validation: {
                    required : true
                },
                isValid : false,
                touched : false
            },
            email: {
                elementType : 'input',
                elementConfig: {
                    type : 'email',
                    placeholder : 'Your Email'
                },
                value: "",
                validation: {
                    required : true,
                    isEmail : true
                },
                isValid : false,
                touched : false
            },
            deliveryMethod: {
                elementType : 'select',
                elementConfig: {
                    options : [
                        {value: 'fastest', displayValue: 'Fastest'},
                        {value: 'cheapest', displayValue: 'Cheapest'}
                    ]
                },
                value: "fastest",
                validation : {},
                isValid : true
            }
        },
        formIsValid : false
    }

    orderDetailsHandler = (event) => {
        event.preventDefault();
        let formData = {};
        for(let formEleIdentifier in this.state.orderForm){
            formData[formEleIdentifier] = this.state.orderForm[formEleIdentifier].value;
        }
        const order = {
            ingredients : this.props.ing,
            price : this.props.tPrice,
            customer : formData,
            userId : this.props.userId
        }
        this.props.onOrderBurger(order, this.props.token);
    }

    inputChangedHandler = (event, inputIdentifier) =>{
        const updatedFormElement = updateObject(this.state.orderForm[inputIdentifier],{
            value: event.target.value,
            isValid : checkValidity(event.target.value, this.state.orderForm[inputIdentifier].validation),
            touched : true
        })
        const updateOrderForm = updateObject(this.state.orderForm, {
            [inputIdentifier] : updatedFormElement
        })
        let formIsValid = true;
        for(let inputIdentifier in updateOrderForm){
            formIsValid = updateOrderForm[inputIdentifier].isValid && formIsValid;
        }
        this.setState({orderForm : updateOrderForm, formIsValid : formIsValid})
    }

    render(){
        let formElements = [];
        for(let key in this.state.orderForm){
            formElements.push({
                id: key,
                config : this.state.orderForm[key]
            })
        }
        let form = (
        <form onSubmit={this.orderDetailsHandler}>
            {formElements.map(element =>(
                <Input key={element.id}
                        element={element.id}
                        elementType={element.config.elementType}
                        elementConfig={element.config.elementConfig}
                        value={element.config.value}
                        inValid={!element.config.isValid} 
                        shouldValidate={element.config.validation}
                        touched={element.config.touched}
                        changed={(event)=>{this.inputChangedHandler(event, element.id)}} />
            ))}
            <Button btnType={BurgerConstant.BUTTON_TYPE_SUCCESS} disabled={!this.state.formIsValid}>Order</Button>
        </form>)
        if(this.props.loading){
            form = <Spinner />
        }
        return(
            <div className={classes.ContactData}>
                <h1>Enter your Contact Details: </h1>
                {form}
            </div>
        ); 
    }
}

const mapStateToProps = state => {
    return {
        ing : state.burgerBuilder.ingredients,
        tPrice : state.burgerBuilder.totalPrice,
        loading : state.order.loading,
        token : state.auth.token,
        userId : state.auth.userId
    }
}
const mapDispatchToProps = dispatch => {
    return{
        onOrderBurger : (orderData, token) => dispatch(actions.purchaseBurger(orderData, token))
    } 
}
export default connect(mapStateToProps, mapDispatchToProps)(ErrorHandler(ContactData, axios))