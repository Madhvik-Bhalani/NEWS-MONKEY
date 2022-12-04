import React, { Component } from 'react'
import loader from '../asset/loader.gif'

export class Spinner extends Component {
    render() {
        return (
            <>
                <div style={{ height: "450px" }} className="container box d-flex justify-content-center align-items-center">
                    <img src={loader} alt="Spinner" />
                </div>
            </>
        )
    }
}

export default Spinner