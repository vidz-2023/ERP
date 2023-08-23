import React from 'react'
import { NavLink } from 'react-router-dom'

function Sidebar() {
    return (
        <>
            {/* <!-- ====================================
            ——— LEFT SIDEBAR WITH OUT FOOTER
        ===================================== --> */}
            <aside class="left-sidebar sidebar-dark" id="left-sidebar">
                <div id="sidebar" class="sidebar sidebar-with-footer">
                    {/* <!-- Aplication Brand --> */}
                    <div class="app-brand">
                        <a href="/index.html">
                            <img src="images/logo.png" alt="erp" />
                            <span class="brand-name">ERP</span>
                        </a>
                    </div>
                    {/* <!-- begin sidebar scrollbar --> */}
                    <div class="sidebar-left" data-simplebar style={{ height: "100%;" }}>
                        {/* <!-- sidebar menu --> */}
                        <ul class="nav sidebar-inner" id="sidebar-menu">
                            <li class="active">
                                <a class="sidenav-item-link" href="index.html">
                                    <i class="mdi mdi-briefcase-account-outline"></i>
                                    <span class="nav-text">Business Dashboard</span>
                                </a>
                            </li>

                            <li>
                                <a class="sidenav-item-link" href="analytics.html">
                                    <i class="mdi mdi-chart-line"></i>
                                    <span class="nav-text">Analytics Dashboard</span>
                                </a>
                            </li>

                            <li class="section-title">
                                Apps
                            </li>

                            <li class="has-sub">
                                <a class="sidenav-item-link" data-toggle="collapse" data-target="#master"
                                    aria-expanded="false" aria-controls="master">
                                    <i class="mdi mdi-database"></i>
                                    <span class="nav-text">Master</span> <b class="caret"></b>
                                </a>
                                <ul class="collapse" id="master" data-parent="#sidebar-menu">
                                    <div class="sub-menu">
                                        <li>
                                            <NavLink class="sidenav-item-link" to="CompanyMasterTable">
                                                <span class="nav-text">Company Master</span>
                                            </NavLink>
                                        </li>

                                        <li>
                                            <NavLink class="sidenav-item-link" to="PlantMasterTable">
                                                <span class="nav-text">Branch Master</span>

                                            </NavLink>
                                        </li>

                                        <li>
                                            <NavLink class="sidenav-item-link" to="vendorMasterTable">
                                                <span class="nav-text">Vendor Master</span>

                                            </NavLink >
                                        </li>


                                        <li>
                                            <NavLink class="sidenav-item-link" to="customerMasterTable">
                                                <span class="nav-text">Customer Master</span>

                                            </NavLink >
                                        </li>


                                        <li>
                                            <NavLink class="sidenav-item-link" to="rawMaterialTable">
                                                <span class="nav-text">Raw Material Master</span>

                                            </NavLink >
                                        </li>


                                        <li>
                                            <NavLink class="sidenav-item-link" to="storageLocMasterTable">
                                                <span class="nav-text">Storage Location Master</span>

                                            </NavLink>
                                        </li>
                                        <li>
                                            <NavLink class="sidenav-item-link" to="unitMasterTable">
                                                <span class="nav-text">Unit Of Measurement</span>

                                            </NavLink>
                                        </li>

                                        <li>
                                            <NavLink class="sidenav-item-link" href="email-compose.html">
                                                <span class="nav-text">Bill of Material</span>

                                            </NavLink>
                                        </li>

                                    </div>
                                </ul>
                            </li>

                            <li class="has-sub">
                                <a class="sidenav-item-link" data-toggle="collapse" data-target="#transactions"
                                    aria-expanded="false" aria-controls="transactions">
                                    <i class="mdi mdi-bank"></i>
                                    <span class="nav-text">Transactions</span> <b class="caret"></b>
                                </a>
                                <ul class="collapse" id="transactions" data-parent="#sidebar-menu">
                                    <div class="sub-menu">
                                        <li>
                                            <NavLink class="sidenav-item-link" to="materialVendorConfigTable">
                                                <span class="nav-text">Material Vendor Config</span>
                                            </NavLink>
                                        </li>

                                        <li>
                                            <NavLink class="sidenav-item-link" to="purchase-order-table">
                                                <span class="nav-text">Purchase Order</span>

                                            </NavLink>
                                        </li>

                                        <li>
                                            <NavLink class="sidenav-item-link" to="goods-receipt-table">
                                                <span class="nav-text">Goods Receipt</span>

                                            </NavLink>
                                        </li>


                                        <li>
                                            <NavLink class="sidenav-item-link" to="">
                                                <span class="nav-text">Stock Listing</span>

                                            </NavLink>
                                        </li>


                                        <li>
                                            <NavLink class="sidenav-item-link" to="stockData">
                                                <span class="nav-text">Stock Transfer</span>

                                            </NavLink>
                                        </li>


                                        <li>
                                            <NavLink class="sidenav-item-link" to="stockConsumptionData">
                                                <span class="nav-text">Stock Consumption</span>

                                            </NavLink>
                                        </li>
                                        <li>
                                            <NavLink class="sidenav-item-link" href="email-compose.html">
                                                <span class="nav-text">Sales List</span>

                                            </NavLink>
                                        </li>

                                        <li>
                                            <NavLink class="sidenav-item-link" href="email-compose.html">
                                                <span class="nav-text">Sales Entry</span>

                                            </NavLink>
                                        </li>

                                    </div>
                                </ul>
                            </li>

                            <li class="has-sub">
                                <a class="sidenav-item-link" data-toggle="collapse" data-target="#staffs"
                                    aria-expanded="false" aria-controls="staffs">
                                    <i class="mdi mdi-bank"></i>
                                    <span class="nav-text">Staff Module</span> <b class="caret"></b>
                                </a>
                                <ul class="collapse" id="staffs" data-parent="#sidebar-menu">
                                    <div class="sub-menu">
                                        <li>
                                            <NavLink class="sidenav-item-link" to="staffMasterdata">
                                                <span class="nav-text">Staff Master</span>
                                            </NavLink>
                                        </li>

                                        <li>
                                            <NavLink class="sidenav-item-link" to="salary-info-table">
                                                <span class="nav-text">Salary Information</span>

                                            </NavLink>
                                        </li>

                                        <li>
                                            <NavLink class="sidenav-item-link" to="salary-data">
                                                <span class="nav-text">Salary Structure</span>

                                            </NavLink>
                                        </li>


                                        <li>
                                            <NavLink class="sidenav-item-link" to="attendance">
                                                <span class="nav-text">Attendance</span>

                                            </NavLink>
                                        </li>

                                        <li>
                                            <NavLink class="sidenav-item-link" to="leaveMasterTable">
                                                <span class="nav-text">Leave Master</span>

                                            </NavLink>
                                        </li>

                                        <li>
                                            <NavLink class="sidenav-item-link" to="leaveFormTable">
                                                <span class="nav-text">Apply Leaves</span>

                                            </NavLink>
                                        </li>

                                        <li>
                                            <NavLink class="sidenav-item-link" to="worklocation-data">
                                                <span class="nav-text">Work Location Data</span>

                                            </NavLink>
                                        </li>
                                        <li>
                                            <NavLink class="sidenav-item-link" to="timesheet">
                                                <span class="nav-text">Timesheet</span>

                                            </NavLink>
                                        </li>
                                        <li>
                                            <NavLink class="sidenav-item-link" to="expenseClaimTable">
                                                <span class="nav-text">Expense Claim Table</span>

                                            </NavLink>
                                        </li>
                                        <li>
                                            <NavLink class="sidenav-item-link" to="salaryAdvancesData">
                                                <span class="nav-text">Salary Advances</span>

                                            </NavLink>
                                        </li>
                                        <li>
                                            <NavLink class="sidenav-item-link" to="salaryAdvancesData">
                                                <span class="nav-text">Salary Advances</span>

                                            </NavLink>
                                        </li>
                                        <li>
                                            <NavLink class="sidenav-item-link" to="salaryprocess">
                                                <span class="nav-text">Salary Process</span>

                                            </NavLink>
                                        </li>
                                        <li>
                                            <NavLink class="sidenav-item-link" to="postsalary">
                                                <span class="nav-text">Post Salary</span>

                                            </NavLink>
                                        </li>

                                        <li>
                                            <NavLink class="sidenav-item-link" to="monthlyattendance">
                                                <span class="nav-text">Monthly Attendance</span>

                                            </NavLink>
                                        </li>

                                        <li>
                                            <NavLink class="sidenav-item-link" to="">
                                                <span class="nav-text">Staff Other Information</span>

                                            </NavLink>
                                        </li>

                                        <li>
                                            <NavLink class="sidenav-item-link" to="">
                                                <span class="nav-text">Exit Management System</span>

                                            </NavLink>
                                        </li>


                                        <li>
                                            <NavLink class="sidenav-item-link" to="">
                                                <span class="nav-text">Salary Appraisal</span>

                                            </NavLink>
                                        </li>

                                        <li>
                                            <NavLink class="sidenav-item-link" to="">
                                                <span class="nav-text">Payslip</span>
                                            </NavLink>
                                        </li>


                                    </div>
                                </ul>
                            </li>

                            <li class="has-sub">
                                <a class="sidenav-item-link" data-toggle="collapse" data-target="#reports"
                                    aria-expanded="false" aria-controls="reports">
                                    <i class="mdi mdi-bank"></i>
                                    <span class="nav-text">Reports</span> <b class="caret"></b>
                                </a>
                                <ul class="collapse" id="reports" data-parent="#sidebar-menu">
                                    <div class="sub-menu">
                                        <li>
                                            <NavLink class="sidenav-item-link" to="materialVendorConfigTable">
                                                <span class="nav-text">Purchase Order Report </span>
                                            </NavLink>
                                        </li>

                                        <li>
                                            <NavLink class="sidenav-item-link" to="purchase-order-table">
                                                <span class="nav-text">Stock Report  Order</span>

                                            </NavLink>
                                        </li>

                                        <li>
                                            <NavLink class="sidenav-item-link" to="goods-receipt-table">
                                                <span class="nav-text">Goods Receipt Report</span>

                                            </NavLink>
                                        </li>


                                        <li>
                                            <NavLink class="sidenav-item-link" to="">
                                                <span class="nav-text">Stock Listing Report</span>

                                            </NavLink>
                                        </li>


                                        <li>
                                            <NavLink class="sidenav-item-link" to="stockData">
                                                <span class="nav-text">Stock Transfer Report</span>

                                            </NavLink>
                                        </li>


                                        <li>
                                            <NavLink class="sidenav-item-link" to="stockConsumptionData">
                                                <span class="nav-text">Stock Consumption Report</span>

                                            </NavLink>
                                        </li>
                                        <li>
                                            <NavLink class="sidenav-item-link" href="email-compose.html">
                                                <span class="nav-text">Sales List Report </span>

                                            </NavLink>
                                        </li>

                                        <li>
                                            <NavLink class="sidenav-item-link" href="email-compose.html">
                                                <span class="nav-text">Sales Entry Report</span>

                                            </NavLink>
                                        </li>

                                    </div>
                                </ul>
                            </li>



                            <li class="has-sub">
                                <a class="sidenav-item-link" href="javascript:void(0)" data-toggle="collapse" data-target="#charts"
                                    aria-expanded="false" aria-controls="charts">
                                    <i class="mdi mdi-chart-pie"></i>
                                    <span class="nav-text">Charts</span> <b class="caret"></b>
                                </a>
                                <ul class="collapse" id="charts" data-parent="#sidebar-menu">
                                    <div class="sub-menu">



                                        <li>
                                            <a class="sidenav-item-link" href="apex-charts.html">
                                                <span class="nav-text">Apex Charts</span>

                                            </a>
                                        </li>




                                    </div>
                                </ul>
                            </li>

                        </ul>

                    </div>

                    <div class="sidebar-footer">
                        <div class="sidebar-footer-content">
                            <ul class="d-flex ">
                                <li>
                                    <a href="user-account-settings.html" data-toggle="tooltip" title="Profile settings"><i
                                        class="mdi mdi-settings"></i></a>
                                </li>
                                <li>
                                    <a href="#" data-toggle="tooltip" title="No chat messages"><i class="mdi mdi-chat-processing"></i></a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </aside>


        </>
    )
}

export default Sidebar