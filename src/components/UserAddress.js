import React from 'react'
import classes from './UserAddress.module.css'


const UserAddress = (props) => {
  return (
    <div>
      <fieldset style={{border:"1px grey solid"}}>
        <legend>Address</legend>
          <h4>{props.company.name} {props.company.suffix}</h4>
          <br />
          <div className={classes.container}>
            <p><span>City</span>: {props.address.city}</p>
            <p><span>Country</span>: {props.address.country}</p>
            <p><span>State</span>: {props.address.state}</p>
            <p><span>Street Address</span>: {props.address.streetAddress}</p>
            <p><span>ZIP</span>: {props.address.zipCode}</p>
          </div>
      </fieldset>
    </div>
  )
}

export default UserAddress