import React from "react";
import { useState } from "react";
import { DeleteFilled } from "@ant-design/icons";
import { Popconfirm, message } from "antd";

function DeleteTraining(props) {
    const [visible, setVisible] = useState(false);


    // delete functionality
    const deleteActivity = id => {
        fetch(`https://customerrest.herokuapp.com/api/trainings/${id}`, {method: 'DELETE'})
                .then(response => {
                    if (response.ok) {
                        props.fetchTrainings();
                        message.success('Activity deleted!')
                    } 
                    else 
                    message.error('Could not delete activity!');
                    })
                .catch(err => console.error(err))
    };


    const showConfirm = () => {
        setVisible(true);
    }

    const handleDelete = () => {
        deleteActivity(props.activityid);
        setVisible(false);
    }

    const handleCancel = () => {
        setVisible(false);
    }


    return(
        <div>
            <DeleteFilled style={{color: "#f5222d"}} onClick={showConfirm} />
            <Popconfirm title="Do you wish to delete this activity?" okText="Delete"
            visible={visible}
            onConfirm={handleDelete}
            onCancel={handleCancel}>
            </Popconfirm>
        </div>
    )
}

export default DeleteTraining;