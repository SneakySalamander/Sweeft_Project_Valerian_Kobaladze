import React from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'

import { userLinkiedListActions } from '../store/userLinkedList-slice'


const UserLinkedList = (props) => {
  const dispatch = useDispatch()

  const clickHandler = () => {
    dispatch(userLinkiedListActions.checkClick(true));
  }

  return (
    <div>
        {props.visitedUsers.length > 0 && <p>{props.visitedUsers.map((user, i) => {
            return <span onClick={clickHandler} key={i}> 
              {user !== props.visitedUsers[0] && '>'} <Link to={`/user/${user.id}`}>{user.prefix} {user.name} {user.lastName}</Link>
            </span>
        })}</p>}
    </div>
  )
}

export default UserLinkedList