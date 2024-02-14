import React from 'react'
import "./error500Style.css"
export default function Error500() {
    return (
        <div className='parent-container'>
            <div className="child-container">
                <img src="https://i.imgur.com/qIufhof.png" alt="logo" />
                <h1>
                    <span>500</span> <br />
                    Internal server error
                </h1>
                <p>We are currently trying to fix the problem.</p>
            </div>
        </div>
    )
}
