import React from 'react'
import { Link } from 'react-router-dom'

import classes from './UserCard.module.css'


const UserCard = (props) => {
  return (
    <Link className='btn' to={`/user/${props.id}`}>
        <div className={classes.card}>
            <img src={props.imageUrl + '?v=' + props.id} alt='No Img' />
            <h4>{props.prefix} {props.name} {props.lastName}</h4>
            <p>{props.title}</p>
        </div>
    </Link>
  )
}

export default UserCard