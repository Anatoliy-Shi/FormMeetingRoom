import {Stack, Button} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import DeleteIcon from "@mui/icons-material/Delete";
import {getData, setClearData} from "../../store/slice/formSlice";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";


export const Buttons = () => {
    const {tower, floor, meetingRoom, comment, endDate, startDate} = useSelector((state) => state.form)
    const dispatch = useDispatch()

    const [disabledClear, setDisabledClear] = useState(true)
    const [disabledSend, setDisabledSend] = useState(true)

    const handleClick = () => {
        dispatch(getData())
        dispatch(setClearData())
    }

    const handleClear = () => {
        dispatch(setClearData())
    }

    useEffect(() => {
        if (tower || floor || meetingRoom || comment || endDate || startDate ) {
            setDisabledClear(false)
        } else {
            setDisabledClear(true)
        }
    }, [tower, floor, meetingRoom, comment, endDate, startDate])

    useEffect(() => {
        if (tower && floor && meetingRoom && comment && endDate && startDate) {
            setDisabledSend(false)
        } else {
            setDisabledSend(true)
        }
    }, [tower, floor, meetingRoom, comment, endDate, startDate])

    return (
        <Stack direction="row" sx={{
            justifyContent: 'space-evenly'
        }} spacing={2}>
            <Button
                sx={{
                    width: '160px',
                    height: '50px',
                    '&:hover, &.Mui-focusVisible': {
                        boxShadow: `0px 0px 0px 1px #0249ff`,
                        color: '#0249ff',
                        backgroundColor: 'white',
                        transition: 'background-color 0.4s'
                    },
                    color: 'white',
                    backgroundColor: '#0249ff',
                    border: 'none',
                    marginRight: '16px'
                }}
                 disabled={disabledSend} onClick={handleClick}
                    variant="contained" endIcon={<SendIcon/>}>
                отправить
            </Button>
            <Button
                sx={{
                    width: '160px',
                    height: '50px',
                    '&:hover, &.Mui-focusVisible': {
                        boxShadow: `0px 0px 0px 1px #0249ff`,
                        color: '#0249ff',
                        backgroundColor: 'white',
                        transition: 'background-color 0.4s'
                    },
                }}
                    disabled={disabledClear} onClick={handleClear} variant="outlined" startIcon={<DeleteIcon/>}>
                очистить
            </Button>
        </Stack>
    )
}