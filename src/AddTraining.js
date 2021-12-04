import React from "react";
import { useState } from "react";
import { Modal } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import AddTrainingFields from "./components/formfields/AddTrainingFields";
import { message } from "antd";

function AddTraining(props) {
    const [visible, setVisible] = useState(false);
    const [newActivity, setNewActivity] = useState({
        date: '',
        activity: '',
        duration: '',
        customer: ''
    });

    const addActivity = (activity) => {
        fetch('https://customerrest.herokuapp.com/api/trainings',
        {
            method: 'POST',
            headers: {'Content-type':'application/json'},
            body: JSON.stringify(activity)
        })
        .then(_ => {
            props.fetchTrainings() // called to update the available activities in case one was added
            message.success('Activity added!')
        })
        .catch(err => console.error(err))
    };

    // form handling
    const showForm = () => {
        setVisible(true);
        setNewActivity({...newActivity, customer: props.customerlink});
    };

    const handleSave = () => {
        addActivity(newActivity);
        setVisible(false);
        clearActivity();
    };

    const handleCancel = () => {
        setVisible(false);
        clearActivity();
    };

    // clearing the activity state object
    const clearActivity = () => {
        setNewActivity({
        date: '',
        activity: '',
        duration: '',
        customer: ''
        })
    };

    return(<div>
        <PlusOutlined style={{color: "#135200"}} onClick={showForm} />
        <Modal
        title={'Add training activity for ' + props.customer.data.firstname + ' ' 
        + props.customer.data.lastname}
        visible={visible}
        onOk={handleSave}
        okText="Save"
        onCancel={handleCancel}
        >
        <AddTrainingFields activities={props.activities} newActivity={newActivity}
        setNewActivity={setNewActivity} />
        </Modal>
    </div>)
}

export default AddTraining;