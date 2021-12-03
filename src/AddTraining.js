import React from "react";
import { useState } from "react";
import { Modal } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import AddTrainingFields from "./components/formfields/AddTrainingFields";

function AddTraining(props) {
    const [visible, setVisible] = useState(false);
    const [newActivity, setNewActivity] = useState({
        date: '',
        activity: '',
        duration: '',
        customer: ''
    });

    // tänne propsina asiakas. Treenifetch täällä, se propsina eteenpäin.

    // form handling
    const showForm = () => {
        setVisible(true);
    };

    const handleSave = () => {
        //todo
        setVisible(false);
    };

    const handleCancel = () => {
        //todo
        setVisible(false);
        console.log(newActivity);
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