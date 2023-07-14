import React from 'react'
import { NavLink } from 'react-router-dom'

function Footer() {
    return (
        <nav className="navbar fixed-bottom bg-body-tertiary bg-info-subtle">
            <div className="container-fluid  d-flex justify-content-center">
                <NavLink className="navbar-brand " href="#">ERP &copy; copyright</NavLink>
            </div>
        </nav>
    )
}

export default Footer