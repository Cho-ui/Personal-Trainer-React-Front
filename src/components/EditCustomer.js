import React from "react";
import { useState } from "react";
import { Modal, message } from 'antd';
import { ToolOutlined } from "@ant-design/icons";
import EditCustomerFields from "./formfields/EditCustomerFields";

function EditCustomer(props) {
    const [customer, setCustomer] = useState({
        firstname: '',
        lastname: '',
        streetaddress: '',
        postcode: '',
        city: '',
        email: '',
        phone: ''
    });

    const [visible, setVisible] = useState(false);


    // field monitoring, clearing & edit functionality

    const inputChanged = e => {
        setCustomer({...customer, [e.target.name]: e.target.value})
    };

    const clearCustomer = () => {
        setCustomer({
        firstname: '',
        lastname: '',
        streetaddress: '',
        postcode: '',
        city: '',
        email: '',
        phone: ''
        });
    };

    const editCustomer = (url, updatedCustomer) => {
        fetch(url, {
            method: 'PUT',
            headers: {'Content-type':'application/json'},
            body: JSON.stringify(updatedCustomer)
        })
        .then(_ => {
            props.fetchCustomers()
            message.success('Customer edit successful!')
        })
        .catch(err => console.error(err))
    }

    // form pre-fill and handling
    const showForm = () => {
        setCustomer({
        firstname: props.customer.data.firstname,
        lastname: props.customer.data.lastname,
        streetaddress: props.customer.data.streetaddress,
        postcode: props.customer.data.postcode,
        city: props.customer.data.city,
        email: props.customer.data.email,
        phone: props.customer.data.phone
        })
        setVisible(true);
    };

    // Saving a customer to db, closing the form and clearing the customer state
    const handleSave = () => {
        editCustomer(props.customerlink, customer);
        setVisible(false);
        clearCustomer();
    };

    // closing the form and clearing the customer state
    const handleCancel = () => {
        setVisible(false);
        clearCustomer();
    };

    return (
        <div>
            <ToolOutlined style={{color: "#597ef7"}} onClick={showForm} />
                <Modal
                title="Edit Customer Info"
                visible={visible}
                onOk={handleSave}
                okText="Save"
                onCancel={handleCancel}>
                <EditCustomerFields customer={customer} 
                setCustomer={setCustomer} inputChanged={inputChanged} />
            </Modal>
        </div>
    );
};

export default EditCustomer;