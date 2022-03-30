import React from "react";
import "./style.scss"

import closeButton from "../../../images/projectReportIcons/closeButton.svg";
import DownloadIc from "../../../images/download_ic.svg"
import ArchiveIc from "../../../images/archive1.svg"


function WindowInfo({title, children, close, download, id, onArchivedPress}) {
    return <div className="main_container">
        <div className="header">
            <div className="container-edit__modal">
                <div className="row align-items-center">
                    <div className="col-8">
                        <div className="title">{title}</div>
                    </div>
                    <div className="col-4">
                        <div className="row align-content-right justify-content-end">
                            <div className="control_btn" onClick={() => {
                                download(id)
                            }}>
                                <img src={DownloadIc} alt=""/>
                            </div>
                            <div
                              className="control_btn archive-modal"
                              onClick={onArchivedPress}
                            >
                                {/*<Tooltip*/}
                                {/*    // options*/}
                                {/*    title="Archive the project"*/}
                                {/*    position="top"*/}

                                {/*>*/}
                                    <img src={ArchiveIc} alt=""/>
                                {/*</Tooltip>*/}
                            </div>
                            <div className="vert_row" />
                            <div className="control_btn close_button"  onClick={close}>
                                <img src={closeButton}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        {children}
    </div>
}

export default WindowInfo;
