import React from 'react'
import { NavLink } from 'react-router-dom'

function Header() {
    return (
        <div>
            <nav className="navbar bg-dark border-bottom border-bottom-dark navbar-expand-lg bg-primary-subtle">
                <div className="container-fluid">
                    <NavLink className="navbar-brand" href="#">ERP</NavLink>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav">

                            <li className="nav-item dropdown">
                                <NavLink className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Staff Module
                                </NavLink>
                                <ul className="dropdown-menu">
                                    <li><NavLink className="dropdown-item" href="#">Staff Master</NavLink></li>
                                    <li><NavLink className="dropdown-item" href="#">Salary Information</NavLink></li>
                                    <li><NavLink className="dropdown-item" href="#">Staff Other Information</NavLink></li>
                                    <li><NavLink className="dropdown-item" href="#">Salary Structure</NavLink></li>
                                    <li><NavLink className="dropdown-item" href="#">Leaves</NavLink></li>
                                    <li><NavLink className="dropdown-item" href="#">Work Location Information</NavLink></li>
                                    <li><NavLink className="dropdown-item" href="#">Timesheet Report</NavLink></li>
                                    <li><NavLink className="dropdown-item" href="#">Expense Claim</NavLink></li>
                                    <li><NavLink className="dropdown-item" href="#">Exit Management System</NavLink></li>
                                    <li><NavLink className="dropdown-item" href="#">Loans and Advances</NavLink></li>
                                    <li><NavLink className="dropdown-item" href="#">Salary Appraisal</NavLink></li>
                                    <li><NavLink className="dropdown-item" href="#">Salary Process</NavLink></li>
                                    <li><NavLink className="dropdown-item" href="#">Payslip</NavLink></li>
                                    <li><NavLink className="dropdown-item" href="#">Post Salary in Finance</NavLink></li>
                                    <li><NavLink className="dropdown-item" href="#">Monthly attendance Process</NavLink></li>
                                    <li><NavLink className="dropdown-item" href="#">Apply Leaves</NavLink></li>
                                </ul>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link active" href="#">Goods Module</NavLink>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">Stock Module</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">Product Module</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link">Goods Transfer</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link">Reports</a>
                            </li>

                        </ul>

                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Header