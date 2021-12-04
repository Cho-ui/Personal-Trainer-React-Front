import React from "react";
import { useState, useEffect } from "react";
import { AgGridReact } from 'ag-grid-react';
import { Space } from "antd";
import AddCustomer from "./AddCustomer";

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import EditCustomer from "./EditCustomer";
import DeleteCustomer from "./DeleteCustomer";
import AddTraining from "../AddTraining";

function Customers() {
    const [customers, setCustomers] = useState([]);
    const [trainings, setTrainings] = useState([]);
    const [activities, setActivities] = useState([]);

    useEffect(() => {
        fetchCustomers();
        fetchTrainings();
    }, []);

    // observe the trainings-state, and create a state array of unique activities based on its changes
    useEffect(() => {
        const rawArray = trainings.map(session => session.activity);
        const filteredArray = [...new Set(rawArray)];
        setActivities(filteredArray);
    }, [trainings]);

    function fetchCustomers() {
        fetch('https://customerrest.herokuapp.com/api/customers')
        .then(response => response.json())
        .then(data => setCustomers(data.content))
        .catch(err => console.error(err))
    };

    function fetchTrainings() {
        fetch('https://customerrest.herokuapp.com/api/trainings')
        .then(response => response.json())
        .then(data => setTrainings(data.content))
        .catch(err => console.error(err))
    };

    const columns = [
        {field: 'firstname', headerName: 'First Name', sortable: true, filter: true, width: 120},
        {field: 'lastname', headerName: 'Last Name', sortable: true, filter: true, width: 120},
        {field: 'streetaddress', headerName: 'Street Address', sortable: true, filter: true},
        {field: 'postcode', headerName: 'Post Code', sortable: true, filter: true, width: 120},
        {field: 'email', headerName: 'Email', sortable: true, filter: true},
        {field: 'phone', headerName: 'Telephone', sortable: true, filter: true, width: 120},
        {field: 'city', headerName: 'City', sortable: true, filter: true, width: 120},
        {field: 'links.0.href', headerName: '', sortable: false, filter: true, width: 50,
        cellRendererFramework: params => <AddTraining customer={params} customerlink={params.value}
        activities={activities} fetchTrainings={fetchTrainings} />},
        {field: 'links.0.href', headerName: '', sortable: false, filter: false, width: 50,
        cellRendererFramework: params => <EditCustomer customer={params} customerlink={params.value}
    fetchCustomers={fetchCustomers} />},
        {field: 'links.0.href', headerName: '', sortable: false, filter: false, width: 50, 
        cellRendererFramework: params => <DeleteCustomer customerlink={params.value}
        fetchCustomers={fetchCustomers} />}
    ];

    return (
        <div>
            <div className="ag-theme-alpine" 
            style={{ marginTop: 10, height: 500, width: '95%'}}>
            <Space style={{ marginBottom: 10 }}>
                <AddCustomer fetchCustomers={fetchCustomers} />
            </Space>
            <AgGridReact
                    rowData={customers}
                    columnDefs={columns}
                    pagination={true}
                    paginationPageSize={10}
                    suppressCellSelection={true}
                />
            </div>
        </div>
    );
};

export default Customers;