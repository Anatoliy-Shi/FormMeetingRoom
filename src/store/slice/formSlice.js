import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    tower: '',
    floor: '',
    meetingRoom: '',
    comment: '',
    startDate: null,
    endDate: null
}

export const formSlice = createSlice({
    name: 'form',
    initialState,
    reducers: {
        setTower: (state, action) => {
            state.tower = action.payload
        },
        setFloor: (state, action) => {
            state.floor = action.payload
        },
        setMeetingRoom: (state, action) => {
            state.meetingRoom = action.payload
        },
        setComment: (state, action) => {
            state.comment = action.payload
        },
        setStartDate: (state, action) => {
            state.startDate = new Date(action.payload)
        },
        setEndDate: (state, action) => {
            state.endDate = new Date(action.payload)
        },
        getData: (state) => {
            console.log(JSON.stringify(state))
        },
        setClearData: (state) => {
            state.tower = ''
            state.floor = ''
            state.meetingRoom = ''
            state.comment = ''
            state.startDate = null
            state.endDate = null
        },
    },
})
export const { setTower, setFloor, setMeetingRoom, setClearData, setComment, getData, setStartDate, setEndDate } = formSlice.actions

export default formSlice.reducer