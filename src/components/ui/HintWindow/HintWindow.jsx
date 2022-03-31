import React from 'react'

import './hintWindow.scss'

const HintWindow = ({ text }) => {
    return (
        <div className='hint-window'>
            <span className='hint-text'>
                {text}
            </span> 
        </div>
    )
}

export default HintWindow