import React, { useEffect, useState, useCallback } from 'react'

import classes from './UserFriendsList.module.css'
import UserCard from './UserCard';


const UserFriendList = (props) => {
  const[isFetching, setIsFetching] = useState(true);
  const[pageCounter, setPageCounter] = useState(1);
  const[friends, setFriends] = useState([]);

  const handleScroll = useCallback((event) => {
    if(window.innerHeight + event.target.documentElement.scrollTop + 1 >= event.target.documentElement.scrollHeight){
      setPageCounter(pageCounter + 1);
      setIsFetching(true);
    }
  },[pageCounter])

  const fetchFriends = useCallback(async () => {
    const response = await fetch(`http://sweeftdigital-intern.eu-central-1.elasticbeanstalk.com/user/${props.id}/friends/${pageCounter}/20}`)
    if(!response.ok){
      throw new Error('Could not fetch data')
    }
    const data = await response.json()  
    return data.list.map(user => {
        return {
            id: user.id,
            name: user.name,
            lastName: user.lastName,
            prefix: user.prefix,
            title: user.title,
            imageUrl: user.imageUrl
            }
    })
  },[props.id, pageCounter]);

  useEffect(() => {
    fetchFriends().then(data => {
      setFriends(data);
    });
    setIsFetching(false);       
    setPageCounter(1);
  },[props.id])

  useEffect(() => {
    if(pageCounter > 1){
      fetchFriends().then(data =>{
        setFriends(prev => {return [...prev, ...data]})
        setIsFetching(false);
      })
    }
    window.addEventListener('scroll', handleScroll); 
  },[handleScroll, pageCounter])

  const resetScrollPosition = () => {
    window.scrollTo(0,0);  
  }

  return (
    <div className={classes.container}>
      <h2>Friends:</h2>
        {friends.length > 0
         && 
          <ul>
            {friends.map((friend, i) => 
              (<li onClick={resetScrollPosition} key={i}>
                <UserCard id={friend.id}
                            name={friend.name}
                            lastName={friend.lastName}
                            prefix={friend.prefix}
                            title={friend.title}
                            imageUrl={friend.imageUrl}/>
            </li>))}
        </ul>}
      {isFetching && <h3>Loading...</h3>}
    </div>
  )
}

export default UserFriendList