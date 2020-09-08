import React from 'react'
import classes from './BuildControl.css'

const buildControl = (props) =>{
    return(
        <div className={classes.BuildControl}>
            <div className={classes.Label}>{props.label}</div>
            <button className={classes.Less} 
                onClick={props.remove}
                disabled={props.islessDisabled}>Less</button>
            <button className={classes.More} 
                onClick={props.added}
                disabled={props.ismoreDisabled}>More</button>
        </div>
    )
}
export default buildControl