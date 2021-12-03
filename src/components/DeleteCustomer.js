import React from "react";
import { useState } from "react";
import { DeleteFilled } from "@ant-design/icons";
import { Popconfirm, message } from "antd";

function DeleteCustomer(props) {
const [visible, setVisible] = useState(false);

// delete functionality
const deleteCustomer = url => {
    fetch(url, {method: 'DELETE'})
            .then(response => {
                if (response.ok) {
                    props.fetchCustomers();
                    message.success('Customer deleted!')
                } 
                else 
                message.error('Could not delete customer!');
                })
            .catch(err => console.error(err))
};


//  confirmation popup and delete confirmation handling
const showConfirm = () => {
    setVisible(true);
};

const handleDelete = () => {
    deleteCustomer(props.customerlink)
    setVisible(false);
}

const handleCancel = () => {
    setVisible(false);
}

    return(
        <div>
            <DeleteFilled style={{color: "#f5222d"}} onClick={showConfirm} />
            <Popconfirm title="Do you wish to delete this customer?" okText="Delete"
            visible={visible}
            onConfirm={handleDelete}
            onCancel={handleCancel} />
        </div>
    )
}

export default DeleteCustomer;