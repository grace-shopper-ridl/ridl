import React from 'react';

const Ratings = (props) => {
    let arr = [];
    let keys = 0;
    for (let i = 1; i <= props.rating; i++) arr.push(<img key={keys++} src="https://cdn2.iconfinder.com/data/icons/flat-game-ui-buttons-icons-1/512/10-512.png" />)
    return (
        <div className="stars" >
            {arr}
        </div>
    )
}

export default Ratings
