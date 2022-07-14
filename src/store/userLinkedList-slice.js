import { createSlice } from "@reduxjs/toolkit";


const initialList = {
    users: [],
    clickedOnLinkedList: false
}

const userLinkedListSlice = createSlice({
    name: 'userLinkedList',
    initialState: initialList,
    reducers: {
        addUser(state, action){
            let updatedList = state.users.concat(action.payload);
            state.users = updatedList;
        },
        checkClick(state, action){
            state.clickedOnLinkedList = action.payload;
        }
    }
})

export const userLinkiedListActions = userLinkedListSlice.actions
export default userLinkedListSlice