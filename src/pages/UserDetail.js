import React, { useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux/es/exports';
import { userLinkiedListActions } from '../store/userLinkedList-slice';

import classes from './UserDetail.module.css'
import UserInfo from '../components/UserInfo';
import UserAddress from '../components/UserAddress';
import UserFriendList from '../components/UserFriendList';
import UserLinkedList from '../components/UserLinkedList';


const UserDetail = (props) => {
  const param = useParams();
  const[userDetail, setUserDetail] = useState();

  const userLinkedList = useSelector(state => state.userLinkedList.users)
  const clickedOnLinkedList = useSelector(state => state.userLinkedList.clickedOnLinkedList)
  const dispatch = useDispatch();

  useEffect(() => {
    const loadUser = async() => {
      const response = await fetch(`http://sweeftdigital-intern.eu-central-1.elasticbeanstalk.com/user/${param.userId}`);
      const data = await response.json();
      if(!response.ok){
        throw new Error('Could not fetch data')
      }
      setUserDetail(data);
      if(!clickedOnLinkedList){
        dispatch(userLinkiedListActions.addUser(data));
        dispatch(userLinkiedListActions.checkClick(false));
      }
    }
    loadUser().catch(console.error);
  }, [param, dispatch, clickedOnLinkedList]);

  return (
    <>
      {userDetail != null 
        && 
        <div className={classes.container}>
          <div className={classes.userDetail}>
            <img className={classes.userImage} src={userDetail.imageUrl + '?v=' + userDetail.id} alt='No Img'/>
            <UserInfo userDetail={userDetail} />  
            <UserAddress id={userDetail.id}
                         company={userDetail.company}
                         address={userDetail.address} />
          </div>
          <div>
            <UserLinkedList visitedUsers={userLinkedList} />
          </div>
          <div className={classes.friendList}>
            <UserFriendList id={userDetail.id}/>
          </div>
        </div>}
    </>
  )
}

export default UserDetail