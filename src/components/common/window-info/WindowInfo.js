import React, { useState } from 'react'
import './style.scss'
import HintWindow from 'components/ui/HintWindow'

import closeButton from 'images/projectReportIcons/closeButton.svg'
import DownloadIc from 'images/download_ic.svg'
import ArchiveIc from 'images/archive1.svg'

function WindowInfo({ title, children, close, download, id, onArchivedPress, isProjectArchived }) {
    const [showHintExport, setShowHintExport] = useState(false)
    const [showHintArchive, setShowHintArchive] = useState(false)
    const [showHintClose, setShowHintClose] = useState(false)

    const archiveButtonText = isProjectArchived ? "Unarchive the project" : "Archive the project"

    return <div className="main_container">
        <div className="header">
            <div className="container-edit__modal">
                <div className="row align-items-center">
                    <div className="col-8">
                        <div className="title">{title}</div>
                    </div>
                    <div className="col-4">
                        <div className="row align-content-right justify-content-end">
                            <div className="control_btn"
                                onClick={() => download(id)}
                                onMouseEnter={() => setShowHintExport(true)}
                                onMouseLeave={() => setShowHintExport(false)}
                            >
                                <img src={DownloadIc} alt="" />
                                {showHintExport && <HintWindow text={'Export'} />}
                            </div>
                            <div
                                className="control_btn archive-modal"
                                onClick={onArchivedPress}
                                onMouseEnter={() => setShowHintArchive(true)}
                                onMouseLeave={() => setShowHintArchive(false)}
                            >
                                <img src={ArchiveIc} alt={archiveButtonText} />
                                {showHintArchive && <HintWindow text={archiveButtonText} />}
                            </div>
                            <div className="vert_row" />
                            <div className="control_btn close_button"
                                onClick={close}
                                onMouseEnter={() => setShowHintClose(true)}
                                onMouseLeave={() => setShowHintClose(false)}>
                                <img src={closeButton} alt="Close" />
                                {showHintClose && <HintWindow text={'Close'} />}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        {children}
    </div>
}

export default WindowInfo
