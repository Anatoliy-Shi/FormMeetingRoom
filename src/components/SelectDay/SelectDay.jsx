import {useDispatch, useSelector} from "react-redux";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {setStartDate, setEndDate} from "../../store/slice/formSlice";
import {setHours, setMinutes} from "date-fns";
import {forwardRef, useEffect, useState} from "react";
import {Box, FormControl, TextField} from "@mui/material";
import {maxTime, minTime} from "../../constant/time";


export const SelectDay = () => {
    const {startDate, endDate} = useSelector((state) => state.form)
    const dispatch = useDispatch()

    const [endMinutes, setEndMinutes] = useState()
    const [endHours, setEndHours] = useState()


    useEffect(() => {
        setEndMinutes(startDate?.getMinutes() + 1)
        setEndHours(startDate?.getHours())
    }, [startDate])

    const handeChangeDate = (date) => {
        if (date?.getHours() !== 0) {
            dispatch(setStartDate(date))
            dispatch(setEndDate(date))
        }

    }

    const handleSetStartDate = (date) => {
        dispatch(setStartDate(date))
    }
    const handleSetEndDate = (date) => {
        dispatch(setEndDate(date))
    }

    const CustomInput = forwardRef(({onClick, value, label}, ref) => (
        <>
            <Box sx={{ width: 251 }}>
                <FormControl fullWidth>
            <TextField sx={{
                textAlign: 'center',
                width: '100%'
            }} value={value}
                       onClick={onClick}
                       ref={ref}
                       label={label}
            />
                </FormControl>
            </Box>
        </>
    ));

    return (
        <div className={'dataPickerContainer'}>
            <DatePicker
                selected={startDate}
                onChange={(date) => handeChangeDate(date)}
                inline
                minDate={Date.now()}
            />
            <div className={'dataPickerContainer__time'}>
                <DatePicker
                    customInput={<CustomInput label={'начало'}/>}
                    selected={startDate}
                    onChange={(date) => handleSetStartDate(date)}
                    showTimeSelect
                    showTimeSelectOnly
                    timeIntervals={15}
                    timeCaption="Начало"
                    dateFormat="HH:mm"
                    timeFormat="HH:mm"
                    minTime={setHours(setMinutes(new Date(), 0), minTime)}
                    maxTime={setHours(setMinutes(new Date(), 0), maxTime)}
                />
                <span className={'span-margin'}>-</span>
                <DatePicker
                    customInput={<CustomInput label={'конец'}/>}
                    disabled={!startDate}
                    selected={endDate}
                    onChange={(date) => handleSetEndDate(date)}
                    showTimeSelect
                    showTimeSelectOnly
                    timeIntervals={15}
                    timeCaption="Конец"
                    dateFormat="HH:mm"
                    timeFormat="HH:mm"
                    minTime={setHours(setMinutes(new Date(), endMinutes), endHours)}
                    maxTime={setHours(setMinutes(new Date(), 15), maxTime)}
                />
            </div>
        </div>
    );
};