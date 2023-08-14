import React from 'react'
import { NavLink } from 'react-router-dom'

function Header() {
    return (
        <div>
            <nav className="navbar  bg-info-subtle">
                <div className="container-fluid justify-content-start">
                    <button class="btn btn-primary" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasExample">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <NavLink className="navbar-brand" to="/">ERP</NavLink>
                    {/* <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button> */}

                    <div class="offcanvas offcanvas-start bg-primary-subtle" tabindex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
                        <div class="offcanvas-header">
                            <h5 class="offcanvas-title" id="offcanvasNavbarLabel">ERP</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                        </div>
                        <div class="offcanvas-body">
                            {/* <div className="collapse navbar-collapse" id="navbarNav"> */}
                            {/* Todo: this div is optional, need to removed if no impacts */}
                            <ul className="navbar-nav justify-content-start flex-grow-1 ps-3">

                                <li className="nav-item dropdown">
                                    <NavLink className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        Master
                                    </NavLink>
                                    <ul className="dropdown-menu dropdown-menu-right" >
                                        <li><NavLink className="dropdown-item" to="CompanyMasterTable">Company Master</NavLink></li>
                                        <li><NavLink className="dropdown-item" to="CompanyMasterTable">Plant Master</NavLink></li>
                                        <li><NavLink className="dropdown-item" to="vendorMasterTable">Vendor Master </NavLink></li>
                                        <li><NavLink className="dropdown-item" to="customerMasterTable">Customer Master </NavLink></li>
                                        <li><NavLink className="dropdown-item" to="rawMaterialTable">Raw Material Master</NavLink></li>
                                        <li><NavLink className="dropdown-item" to="">Storage Location Master</NavLink></li>
                                        <li><NavLink className="dropdown-item" to="">Unit of Measurement </NavLink></li>

                                    </ul>
                                </li>

                                <li className="nav-item dropdown">
                                    <NavLink className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        Transactions
                                    </NavLink>
                                    <ul className="dropdown-menu dropdown-menu-right" >
                                        <li><NavLink className="dropdown-item" to="">Material Vendor Configuration</NavLink></li>
                                        <li><NavLink className="dropdown-item" to="purchase-master-table">Purchase Order </NavLink></li>
                                        <li><NavLink className="dropdown-item" to="">Goods Receipt </NavLink></li>
                                        <li><NavLink className="dropdown-item" to="">Stock Listing</NavLink></li>
                                        <li><NavLink className="dropdown-item" to="stockData">Stock Transfer</NavLink></li>
                                        <li><NavLink className="dropdown-item" to="">Stock Consumption</NavLink></li>
                                    </ul>
                                </li>

                                <li className="nav-item dropdown">
                                    <NavLink className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        Reports
                                    </NavLink>
                                    <ul className="dropdown-menu dropdown-menu-right" >
                                        <li><NavLink className="dropdown-item" to="personMasterTable">Purchase Order Report </NavLink></li>
                                        <li><NavLink className="dropdown-item" to="CompanyMasterTable">Stock Report </NavLink></li>
                                        <li><NavLink className="dropdown-item" to="CompanyMasterTable">Stock Daily Consumption Report </NavLink></li>
                                        <li><NavLink className="dropdown-item" to="rawMaterialTable">Location wise Stock Report</NavLink></li>
                                    </ul>
                                </li>
                                <li className="nav-item dropdown">
                                    <NavLink className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        Staff Module
                                    </NavLink>
                                    <ul className="dropdown-menu dropdown-menu-right" >
                                        <li><NavLink className="dropdown-item" to="staffMasterdata">Staff Master</NavLink></li>
                                        <li><NavLink className="dropdown-item" to="salary-info-table">Salary Information</NavLink></li>
                                        <li><NavLink className="dropdown-item" to="" >Staff Other Information</NavLink></li>
                                        <li><NavLink className="dropdown-item" to="salary-data">Salary Structure</NavLink></li>
                                        <li><NavLink className="dropdown-item" to="attendance">Attendance</NavLink></li>
                                        <li><NavLink className="dropdown-item" to="leaveMasterTable">LeavesMaster</NavLink></li>
                                        <li><NavLink className="dropdown-item" to="leaveFormTable">Apply Leaves</NavLink></li>
                                        <li><NavLink className="dropdown-item" to="worklocation-data">Work Location Information</NavLink></li>
                                        <li><NavLink className="dropdown-item" to="timesheet">Timesheet Report</NavLink></li>
                                        <li><NavLink className="dropdown-item" to="expenseClaimTable">Expense Claim</NavLink></li>
                                        <li><NavLink className="dropdown-item" to="" >Exit Management System</NavLink></li>
                                        <li><NavLink className="dropdown-item" to="salaryAdvancesData">Loans and Advances</NavLink></li>
                                        <li><NavLink className="dropdown-item" to="" >Salary Appraisal</NavLink></li>
                                        <li><NavLink className="dropdown-item" to="salaryprocess">Salary Process</NavLink></li>
                                        <li><NavLink className="dropdown-item" to="">Payslip</NavLink></li>
                                        <li><NavLink className="dropdown-item" to="postsalary">Post Salary in Finance</NavLink></li>
                                        <li><NavLink className="dropdown-item" to="monthlyattendance">Monthly attendance Process</NavLink></li>
                                        {/* <li><NavLink className="dropdown-item" href="#">Apply Leaves</NavLink></li>
                                    <li><NavLink className="dropdown-item" href="#">Leaves</NavLink></li>
                                    <li><NavLink className="dropdown-item" to="worklocation">Work Location Information</NavLink></li> */}

                                    </ul>
                                </li>

                                <li className="nav-item">
                                    <NavLink className="nav-link active" to="purchase-master-table">Purchase Master</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink className="nav-link active" href="#">Goods Module</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink className="nav-link " to="stockData">Stock Module</NavLink>
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

                            {/* </div> */}
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Header