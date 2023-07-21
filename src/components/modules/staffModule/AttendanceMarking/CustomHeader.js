import React from 'react';

const CustomHeader = (props) => {

    return (
        <div>
            <div className="customHeaderLabel">{props.displayName}</div>
        </div>
    );
};

export default CustomHeader