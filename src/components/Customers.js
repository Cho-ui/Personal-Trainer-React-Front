import React from "react";
import { useState, useEffect } from "react";
import {AgGridReact} from 'ag-grid-react';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

function Customers() {
    const [customers, setCustomers] = useState([]);

    useEffect(() => {
        fetchCustomers();
    }, []);

    function fetchCustomers() {
        fetch('https://customerrest.herokuapp.com/api/customers')
        .then(response => response.json())
        .then(data => setCustomers(data.content))
        .catch(err => console.error(err))
    }

    const columns = [
        {field: 'firstname', headerName: 'First Name', sortable: true, filter: true},
        {field: 'lastname', headerName: 'Last Name', sortable: true, filter: true},
        {field: 'streetaddress', headerName: 'Street Address', sortable: true, filter: true},
        {field: 'postcode', headerName: 'Post Code', sortable: true, filter: true},
        {field: 'email', headerName: 'Email', sortable: true, filter: true},
        {field: 'phone', headerName: 'Phone Number', sortable: true, filter: true},
        {field: 'city', headerName: 'City', sortable: true, filter: true}
    ]

    return (
        <div>
            <div className="ag-theme-alpine" 
            style={{ marginTop: 10, height: 500, width: '95%'}}>
            <AgGridReact
                    rowData={customers}
                    columnDefs={columns}
                    pagination={true}
                    paginationPageSize={10}
                    rowSelection="single"
                    suppressCellSelection={true}
                />
            </div>
        </div>
    )
}

export default Customers;