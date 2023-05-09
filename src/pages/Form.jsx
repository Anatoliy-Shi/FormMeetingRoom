import {useDispatch, useSelector} from "react-redux";
import {setComment, setFloor, setMeetingRoom, setTower} from "../store/slice/formSlice";
import {SelectItems} from "../components/SelectItems/SelectItems";
import {SelectDay} from "../components/SelectDay/SelectDay";
import {Buttons} from "../components/Buttons/Buttons";


export const Form = () => {

    const {tower, floor, meetingRoom, comment} = useSelector((state) => state.form)
    const dispatch = useDispatch()

    const handleChangeTower = (event) => {
        dispatch(setTower(event.target.value))
    }
    const handleChangeFloor = (event) => {
        dispatch(setFloor(event.target.value))
    }
    const handleChangeMeetingRoom = (event) => {
        dispatch(setMeetingRoom(event.target.value))
    }
    const handleChangeComment = (event) => {
        dispatch(setComment(event.target.value))
    }

    return (
        <>
            <h1 className={'header-name'}>Бронирование переговорной</h1>
            <SelectItems value={tower} count={1} length={2} name={'Башня'}
                         change={handleChangeTower}/>
            <SelectItems value={floor} count={3} length={25} name={'Этаж'}
                         change={handleChangeFloor}/>
            <SelectItems value={meetingRoom} count={1} length={10} name={'Переговорная'}
                         change={handleChangeMeetingRoom}/>
            <SelectDay/>
            <textarea className={'comment'} cols="30" rows="4" placeholder={'введите коментарий'}
                      onChange={(event) => handleChangeComment(event)} value={comment}/>
            <Buttons/>
        </>
    );
}

