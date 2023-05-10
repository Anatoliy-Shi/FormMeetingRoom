import {useDispatch, useSelector} from "react-redux";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {setStartDate, setEndDate} from "../../store/slice/formSlice";
import {setHours, setMinutes} from "date-fns";
import {forwardRef, useEffect, useState} from "react";
import {Box, FormControl, TextField} from "@mui/material";
import {intervalTime, maxTime, minTime} from "../../constant/time";


export const SelectDay = () => {
    const {startDate, endDate} = useSelector((state) => state.form)
    const dispatch = useDispatch()

    const [minMinutes, setMinMinutes] = useState(null)
    const [minHours, setMinHours] = useState(null)


    useEffect(() => {
        setMinMinutes(startDate?.getMinutes() + intervalTime)
        setMinHours(startDate?.getHours())
        if (startDate?.getHours() >= endDate?.getHours()) {
            if(startDate?.getMinutes() >= endDate?.getMinutes()) {
                dispatch(setEndDate(setHours(setMinutes(startDate, startDate.getMinutes() + intervalTime),
                    startDate.getMinutes()+intervalTime === 60
                        ? startDate.getHours() + 1
                        : startDate.getHours())))
            }
        }
    }, [startDate, endDate, dispatch])

    const handeChangeDate = (date) => {
        dispatch(setStartDate(date))
        if (!startDate) {
            dispatch(setStartDate(setHours(date, minTime)))
        }
        if (!endDate) {
            // dispatch(setEndDate(setHours(setMinutes(date, intervalTime), minTime)))

            dispatch(setEndDate(setHours(setMinutes(startDate, startDate.getMinutes() + intervalTime),
                startDate.getMinutes()+intervalTime === 60
                    ? startDate.getHours() + 1
                    : startDate.getHours())))
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
            <Box sx={{width: 251}}>
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
                    minTime={setHours(setMinutes(new Date(), minMinutes), minHours)}
                    maxTime={setHours(setMinutes(new Date(), intervalTime), maxTime)}
                />
            </div>
            <p className={'notation'}>*минимальный промежуток времени 15 минут</p>
        </div>
    );
};