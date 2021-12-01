import React from "react";
import { Input } from "antd";

function EditCustomerFields(props) {

    return (
        <div>
            <Input style={{marginBottom: 5}} 
            name="firstname"
            value={props.customer.firstname}
            onChange={props.inputChanged}
            placeholder="First Name" /> 
            <Input style={{marginBottom: 5}}
            name="lastname"
            value={props.customer.lastname}
            onChange={props.inputChanged}
             placeholder="Last Name" />
            <Input style={{marginBottom: 5}}
            name="phone"
            value={props.customer.phone}
            onChange={props.inputChanged}
             placeholder="Phone Number" />
            <Input style={{marginBottom: 5}}
            name="email"
            value={props.customer.email}
            onChange={props.inputChanged}
             placeholder="Email" />
            <Input style={{marginBottom: 5}}
            name="streetaddress"
            value={props.customer.streetaddress}
            onChange={props.inputChanged}
             placeholder="Street Address" />
            <Input style={{marginBottom: 5}}
            name="postcode"
            value={props.customer.postcode}
            onChange={props.inputChanged}
             placeholder="Post Code" />
            <Input style={{marginBottom: 5}}
            name="city"
            value={props.customer.city}
            onChange={props.inputChanged}
             placeholder="City" />
        </div>
    )
}
export default EditCustomerFields;