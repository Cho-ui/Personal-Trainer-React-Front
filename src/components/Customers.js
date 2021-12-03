import React from "react";
import { useState, useEffect } from "react";
import { AgGridReact } from 'ag-grid-react';
import { Space } from "antd";
import AddCustomer from "./AddCustomer";

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import EditCustomer from "./EditCustomer";
import DeleteCustomer from "./DeleteCustomer";

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
    };

    const columns = [
        {field: 'firstname', headerName: 'First Name', sortable: true, filter: true, width: 120},
        {field: 'lastname', headerName: 'Last Name', sortable: true, filter: true, width: 120},
        {field: 'streetaddress', headerName: 'Street Address', sortable: true, filter: true},
        {field: 'postcode', headerName: 'Post Code', sortable: true, filter: true, width: 120},
        {field: 'email', headerName: 'Email', sortable: true, filter: true},
        {field: 'phone', headerName: 'Telephone', sortable: true, filter: true, width: 120},
        {field: 'city', headerName: 'City', sortable: true, filter: true, width: 120},
        {field: 'links.0.href', headerName: '', sortable: false, filter: false, width: 120,
        cellRendererFramework: params => <EditCustomer customer={params} customerlink={params.value}
    fetchCustomers={fetchCustomers} />},
        {field: 'links.0.href', headerName: '', sortable: false, filter: false, width: 120, 
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