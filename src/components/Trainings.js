import React from "react";
import { useState, useEffect } from "react";
import {AgGridReact} from 'ag-grid-react';
//import dayjs from "dayjs";

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

function Trainings() {
const [trainings, setTrainings] = useState([]);

const dayjs = require('dayjs');

useEffect(() => {
    fetchTrainings();
}, []);

function fetchTrainings() {
    fetch('https://customerrest.herokuapp.com/gettrainings')
    .then(response => response.json())
    .then(data => setTrainings(data))
    .catch(err => console.error(err))
};

const columns = [
    {field: 'customer.firstname', headerName: 'First Name', sortable: true, filter: true},
    {field: 'customer.lastname', headerName: 'Last Name', sortable: true, filter: true},
    {field: 'activity', headerName: 'Activity', sortable: true, filter: true},
    {field: 'duration', headerName: 'Duration (minutes)', sortable: true, filter: true},
    {field: 'date', headerName: 'Date', sortable: true, filter: true,
    cellRendererFramework: params => dayjs(params.value).format("DD.MM.YYYY HH:mm a")}
];

    return (
        <div>
            <div className="ag-theme-alpine" 
            style={{ marginTop: 10, height: 500, width: '95%'}}>
            <AgGridReact
                    rowData={trainings}
                    columnDefs={columns}
                    pagination={true}
                    paginationPageSize={10}
                    rowSelection="single"
                    suppressCellSelection={true}
                />
            </div>
        </div>
    );
};

export default Trainings;