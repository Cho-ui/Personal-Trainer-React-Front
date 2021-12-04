import React from "react";
import { useState, useEffect } from "react";
import {DatePicker, TimePicker, Input, Select, InputNumber, Button } from "antd";
import moment from "moment";

function AddTrainingFields(props) {
    const [isNew, setIsNew] = useState(false); // boolean for observing a typed activity
    const [ddValue, setDDValue] = useState(); // value for resetting dropdown menu
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');

    const { Option } = Select;

    // deconstructed props for use effects
    const { setNewActivity, newActivity } = props; 

    /* if either time or date are changed, and the other field is not empty,
    the fields are concatenated into an iso string format derivative 
    used by the back end --> TODO: change to GMT programmatically */

    useEffect(() => {
        if (date.length > 0 && time.length > 0) {
            const isoDate = date + time + '+00:00';
            setNewActivity({...newActivity, date: isoDate});
        }
    }, [date, time, props])

  /*  useEffect(() => {
        if (date.length > 0 && time.length > 0) {
            const isoDate = date + time + '+00:00';
            setNewActivity({...newActivity, date: isoDate});
        }
    }, [time]) */

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
        setTime(moment(value._d).format('[T]HH:mm:ss.SSS'));
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
        <InputNumber placeholder="0" />
        </div>
    )
}

export default AddTrainingFields;