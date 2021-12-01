import React from "react";
import { useState } from "react";
import { Modal, Button } from 'antd';
import AddCustomerFields from "./formfields/AddCustomerFields";

function AddCustomer(props) {
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


    // field monitoring, clearing & add functionality

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

    const addCustomer = (customer) => {
        fetch('https://customerrest.herokuapp.com/api/customers',
        {
            method: 'POST',
            headers: {'Content-type':'application/json'},
            body: JSON.stringify(customer)
        })
        .then(_ => props.fetchCustomers())
        .catch(err => console.error(err))
    };

    // form handling
    const showForm = () => {
        setVisible(true);
    };

    // Saving a customer to db, closing the form and clearing the customer state
    const handleSave = () => {
        addCustomer(customer);
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
            <Button type="primary" onClick={showForm}>
                Add Customer
                </Button>
                <Modal
                title="Add Customer"
                visible={visible}
                onOk={handleSave}
                okText="Save"
                onCancel={handleCancel}>
                <AddCustomerFields customer={customer} 
                setCustomer={setCustomer} inputChanged={inputChanged} />
            </Modal>
        </div>
    );
};

export default AddCustomer;