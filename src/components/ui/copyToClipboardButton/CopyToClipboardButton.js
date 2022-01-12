import React from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';
import copy from 'images/copy.svg'

const CopyToClipboardButton = (props) => {
    const {text, onCopy} = props

    return (
        <CopyToClipboard text={text} onCopy={onCopy}>
            <img src={copy} alt="" className="copy_img" />
        </CopyToClipboard>
    )
}

export default CopyToClipboardButton;
