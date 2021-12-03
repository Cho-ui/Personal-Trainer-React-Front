import React from "react";
import { useState, useEffect } from "react";
import {DatePicker, TimePicker, Input, Select, InputNumber, Button } from "antd";

function AddTrainingFields(props) {
    const [isNew, setIsNew] = useState(false); // boolean for observing a typed activity
    const [ddValue, setDDValue] = useState(); // value for resetting dropdown menu

    const { Option } = Select;

    // if a new activity is typed in, the activity dropdown menu is disabled.
    useEffect(() => {
        if (props.newActivity.activity.length > 0) {
            setIsNew(true)
        } else {
            setIsNew(false)
        }
    }, [props.newActivity]);

    // the activity text inputfield is monitored here
    const inputChanged = e => {
        props.setNewActivity({...props.newActivity, [e.target.name]: e.target.value})
    };

    // the dropdown menu is monitored here
    const dropdownChanged = (value) => {
        props.setNewActivity({...props.newActivity, activity: value})
        setDDValue(value);
    };

    // clears the monitored activity attribute and resets the dropdown menu
    const clearActivity = () => {
        props.setNewActivity({...props.newActivity, activity: ''})
        setDDValue(undefined);
    };

    return (
        <div>
        <div style={{marginTop:5, marginBottom: 5}}>Select date and time:</div>
        <Input.Group compact>
        <DatePicker style={{width: '50%'}} format='DD-MM-YYYY' />
        <TimePicker style={{width: '50%'}} format='HH:mm' showNow={false} />
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
        name="activity" value={props.newActivity.activity} onChange={inputChanged} 
        ></Input>
        <Button onClick={clearActivity}>Clear</Button>
        </Input.Group>
        <div style={{marginTop:5, marginBottom: 5}}>Select duration(min):</div>
        <InputNumber placeholder="0" />
        </div>
    )
}

export default AddTrainingFields;