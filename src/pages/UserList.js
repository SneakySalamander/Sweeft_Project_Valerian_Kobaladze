import React, {useState, useEffect, useCallback} from 'react'

import classes from './UserList.module.css'
import UserCard from '../components/UserCard';



const UserList = () => {
  const[isFetching, setIsFetching] = useState(true);
  const[users, setUsers] = useState([]);
  const[pageCounter, setPageCounter] = useState(1);
  
  const handleScroll = useCallback((event) => {
    if(window.innerHeight + event.target.documentElement.scrollTop + 1 >= event.target.documentElement.scrollHeight){
      setPageCounter(pageCounter + 1);
      setIsFetching(true);
    }
  },[pageCounter])
  
  useEffect(()=>{
    const loadMoreUsers = async () => {
      const response = await fetch(`http://sweeftdigital-intern.eu-central-1.elasticbeanstalk.com/user/${pageCounter}/20`)
      const data = await response.json();
      if(!response.ok){
        throw new Error('Could not fetch data')
      }
      const updatedUsers = data.list.map(user => {
        return {
          id: user.id,
          name: user.name,
          lastName: user.lastName,
          prefix: user.prefix,
          title: user.title,
          imageUrl: user.imageUrl
        }
      })
      setUsers(prev => {return [...prev, ...updatedUsers]});
      setIsFetching(false);
    }
    loadMoreUsers().catch(console.error);
    window.addEventListener('scroll', handleScroll);    
  }, [pageCounter, handleScroll])

  
  return (
    <div className={classes.container}>
      {users.length > 0 
        && 
        <ul>
          {users.map((user, i) => 
            (<li key={i}>
              <UserCard id={user.id}
                        name={user.name}
                        lastName={user.lastName}
                        prefix={user.prefix}
                        title={user.title}
                        imageUrl={user.imageUrl}/>
            </li>))}
        </ul>}
      {isFetching && <h3>Loading...</h3>}
    </div>
  )
}

export default UserList