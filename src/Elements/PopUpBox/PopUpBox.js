import React from 'react';
import './PopUpBox.css'

const PopUpWindow = ({children}) => {
    return (
        <div className='PopUpWindow' style={{display: 'flex'}}>
            {children}
        </div>
    );
}

export default PopUpWindow;