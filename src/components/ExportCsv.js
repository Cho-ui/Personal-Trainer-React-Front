import React from "react";
import { Button } from "antd";
import { DownloadOutlined } from "@ant-design/icons";

function ExportCsv(props) {

    const { exportCsv } = props;

    return(
        <div>
            <Button icon={ <DownloadOutlined /> } onClick={exportCsv}>Export</Button>
        </div>
    )
}

export default ExportCsv;