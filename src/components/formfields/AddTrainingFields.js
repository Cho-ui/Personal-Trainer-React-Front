import React from "react";
import { useState, useEffect } from "react";
import {DatePicker, TimePicker, Input, Select, InputNumber, Button } from "antd";

function AddTrainingFields(props) {
    const [isNew, setIsNew] = useState(false); // boolean for observing a typed activity
    const [ddValue, setDDValue] = useState(); // value for resetting dropdown menu
    const [date, setDate] = useState(''); // extracted datepicker value
    const [time, setTime] = useState(''); // extracted timepicker value

    // moment and moment-timezone import, default tz set to GMT
    const moment = require('moment-timezone');
    moment.tz.setDefault("Europe/London");

    const { Option } = Select;

    // deconstructed props for use effects
    const { setNewActivity, newActivity } = props; 

    /* if either time or date are changed, and the other field is not empty,
    the fields are concatenated into an iso string format derivative 
    used by the back end. SetNewActivity and newActivity warnings from dep array
    are removed by disabling the es-linter, as React ensures setState function
    doesn't change and the state object is changed via spread operator which keeps
    the existing object values intact */

    useEffect(() => {
        if (date.length > 0 && time.length > 0) {
            const isoDate = date + time;
            setNewActivity({...newActivity, date: isoDate});
        }
    }, 
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [date, time])

    // if a new activity is typed in, the activity dropdown menu is disabled.
    useEffect(() => {
        if (newActivity.activity.length > 0) {
            setIsNew(true)
        } else {
            setIsNew(false)
        }
    }, [newActivity]);

    // the activity text inputfield is monitored here
    const inputChanged = e => {
        setNewActivity({...newActivity, [e.target.name]: e.target.value})
    };

    // the dropdown menu is monitored here
    const dropdownChanged = (value) => {
        setNewActivity({...newActivity, activity: value})
        setDDValue(value);
    };

    // clears the monitored activity attribute and resets the dropdown menu
    const clearActivity = () => {
        setNewActivity({...newActivity, activity: ''})
        setDDValue(undefined);
    };

    // datepicker date value save
    const dateChanged = (value) => {
        setDate(moment(value._d).format('YYYY-MM-DD'));
    }

    // timepicker time value save
    const timeChanged = (value) => {
        setTime(moment(value._d).format('[T]HH:mm:ss.SSSZ'));
    }

    // duration field is monitored here
    const durationChanged = (value) => {
        setNewActivity({...newActivity, duration: value})
    }

    return (
        <div>
        <div style={{marginTop:5, marginBottom: 5}}>Select date and time:</div>
        <Input.Group compact>
        <DatePicker style={{width: '50%'}} format='DD-MM-YYYY' onChange={(value) => dateChanged(value)} />
        <TimePicker style={{width: '50%'}} format='HH:mm' onChange={(value) => timeChanged(value)} 
        showNow={false} />
        </Input.Group>
        <div style={{marginTop:5, marginBottom: 5}}>Select a training activity, or input a new one:</div>
        <Input.Group compact>
        <Select value={ddValue} placeholder="Select an activity" disabled={isNew}
        onChange={(value) => dropdownChanged(value)}>
            {props.activities.map((activity, i) => {
                return (
                    <Option value={activity} key={i} name="activity">{activity}</Option>
                )
            })}
        </Select>
        <Input placeholder="Input a new activity" style={{width: '40%', marginLeft: 10}}
        name="activity" value={newActivity.activity} onChange={inputChanged} 
        ></Input>
        <Button onClick={clearActivity}>Clear</Button>
        </Input.Group>
        <div style={{marginTop:5, marginBottom: 5}}>Select duration(min):</div>
        <InputNumber placeholder="0" type="number" onChange={(value) => durationChanged(value)}
        min={15} max={180} step={15} />
        </div>
    )
}

export default AddTrainingFields;