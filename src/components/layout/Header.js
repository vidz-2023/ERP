import React from 'react'
import { NavLink } from 'react-router-dom'

function Header() {
    return (
        <div>
            <nav className="navbar  border-bottom border-bottom-dark navbar-expand-lg bg-info-subtle">
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
                                <ul className="dropdown-menu dropdown-menu-right" >
                                    <li><NavLink className="dropdown-item" to="staffMasterdata">Staff Master</NavLink></li>
                                    <li><NavLink className="dropdown-item" to="salary-info-table">Salary Information</NavLink></li>
                                    <li><NavLink className="dropdown-item" href="#">Staff Other Information</NavLink></li>
                                    <li><NavLink className="dropdown-item" to="salary-data">Salary Structure</NavLink></li>
                                    <li><NavLink className="dropdown-item" to="attendance">Attendance</NavLink></li>
                                    <li><NavLink className="dropdown-item" to="leaveMasterTable">LeavesMaster</NavLink></li>
                                    <li><NavLink className="dropdown-item" to="leaveFormTable">Apply Leaves</NavLink></li>
                                    <li><NavLink className="dropdown-item" to="worklocation-data">Work Location Information</NavLink></li>
                                    <li><NavLink className="dropdown-item" to="timesheet">Timesheet Report</NavLink></li>
                                    <li><NavLink className="dropdown-item" to="expenseClaimTable">Expense Claim</NavLink></li>
                                    <li><NavLink className="dropdown-item" href="#">Exit Management System</NavLink></li>
                                    <li><NavLink className="dropdown-item" to="salaryAdvancesData">Loans and Advances</NavLink></li>
                                    <li><NavLink className="dropdown-item" href="#">Salary Appraisal</NavLink></li>
                                    <li><NavLink className="dropdown-item" to="salaryprocess">Salary Process</NavLink></li>
                                    <li><NavLink className="dropdown-item" to="payslip">Payslip</NavLink></li>
                                    <li><NavLink className="dropdown-item" href="#">Post Salary in Finance</NavLink></li>
                                    <li><NavLink className="dropdown-item" to="monthlyattendance">Monthly attendance Process</NavLink></li>
                                    <li><NavLink className="dropdown-item" href="#">Apply Leaves</NavLink></li>
                                    <li><NavLink className="dropdown-item" href="#">Leaves</NavLink></li>
                                    <li><NavLink className="dropdown-item" to="worklocation">Work Location Information</NavLink></li>

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

                            <li className="nav-item">
                                <NavLink className="nav-link" to="/table">AG-Grid Table</NavLink>
                            </li>

                        </ul>

                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Header