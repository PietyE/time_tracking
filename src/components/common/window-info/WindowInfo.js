import React from "react";
import "./style.scss"
import 'react-tippy/dist/tippy.css';
import {
    Tooltip,
} from 'react-tippy';


import closeButton from "../../../images/projectReportIcons/closeButton.svg";
import calendar from "../../../images/inHouseEmployees/calendar-userData.svg";
import dot from "../../../images/inHouseEmployees/dot.svg";
import cash from "../../../images/inHouseEmployees/cash.svg";
import ProjectData from "../../project-report-new-design/components/ProjectData/ProjectData";
import CreateComment from "../../in-house-employees/components/CreateComment/CreateComment";
import DownloadIc from "../../../images/download_ic.svg"
import ArchiveIc from "../../../images/archive1.svg"


function WindowInfo({title, children, close, download, id}) {
    return <div className="main_container">
        <div className="header">
            <div className="container">
                <div className="row">
                    <div className="col-lg-8">
                        <div className="title">{title}</div>
                    </div>
                    <div className="col-lg-4">
                        <div className="row align-content-center">
                            <div className="control_btn" onClick={() => {
                                download(id)
                            }}>
                                <img src={DownloadIc} alt=""/>
                            </div>
                            <div className="control_btn archive-modal">
                                <Tooltip
                                    // options
                                    title="Archive the project"
                                    position="top"

                                >
                                    <img src={ArchiveIc} alt=""/>
                                </Tooltip>
                            </div>
                            <div className="vert_row"/>
                            <img src={closeButton} className="close_button" onClick={close}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        {children}
    </div>
}

export default WindowInfo;