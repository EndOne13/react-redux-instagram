import React from 'react';
import Button from "../Button/Button";

import './style.css'

const TextArea = ({value, onChange, placeholder, isLoading, onSubmit, buttonText}) => {
    return (
        <div className='cnTextAreaWrapper'>
            <textarea
                value={value}
                onChange={e => onChange(e.target.value)}
                className='cnTextArea'
                placeholder={placeholder}
            />
            <Button  className='cnSendButton' onClick={onSubmit}>{buttonText}</Button>
        </div>
    );
};

export default TextArea;