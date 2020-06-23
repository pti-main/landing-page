import React from 'react';

const SummaryTile = ({title, amount}:any) => {
    return (
        <div className="summary__container">
            <div className="summary">
                <div className="summary__title">{title}</div>
                <div className="summary__text">{amount}</div>
            </div>
        </div>
    );
}

export default SummaryTile;