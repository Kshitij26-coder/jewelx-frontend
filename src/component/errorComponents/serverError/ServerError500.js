import React from 'react'
import "./style.css"
import { Link } from 'react-router-dom'
const ServerError500 = () => {
    return (
        <div className='parent-container'>
            <div className="child-container">
                <img src="https://i.imgur.com/qIufhof.png" alt="logo" />
                <h1>
                    <span>500</span> <br />
                    Internal server error
                </h1>
                <p>We are currently trying to fix the problem.</p>
                <Link className='a' to="/">Go To Homepage</Link>
            </div>
        </div>
    )
}

export default ServerError500
