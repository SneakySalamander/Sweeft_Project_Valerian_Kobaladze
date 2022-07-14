import React from 'react'
import classes from './UserInfo.module.css'


const UserInfo = (props) => {
  return (
    <div>
      <fieldset style={{border:"1px grey solid"}}>
        <legend>Info</legend>
        <h4>{props.userDetail.prefix} {props.userDetail.name} {props.userDetail.lastName}</h4>
        <p className={classes.title}>{props.userDetail.title}</p>
        <br />
        <div className={classes.container}>    
          <p><span>Email</span>: {props.userDetail.email}</p>
          <p><span>Ip Address</span>: {props.userDetail.ip}</p>
          <p><span>Job Area</span>: {props.userDetail.jobArea}</p>
          <p><span>Job Type</span>: {props.userDetail.jobType}</p>
        </div>
      </fieldset>
    </div>
  )
}

export default UserInfo