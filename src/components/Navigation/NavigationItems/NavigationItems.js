import React from 'react'
import NavigationItem from './NavigationItem/NavigationItem'
import classes from './NavigationItems.css'
import Backdrop from '../../UI/Backdrop/Backdrop'

const navigationItems = (props) => {
    let auth = <NavigationItem link="/auth">Sign In</NavigationItem>
    if(props.isAuthenticated){
        auth = <NavigationItem link="/logout">LogOut</NavigationItem>
    }
    return (
        <ul className={classes.NavigationItems}>
            <NavigationItem link="/" active onClick={()=><Backdrop show={false}/>}>Burger Builder</NavigationItem>
           {props.isAuthenticated ? <NavigationItem link="/orders">Cart</NavigationItem> : null }
            {auth}
        </ul>
    )}
export default navigationItems;