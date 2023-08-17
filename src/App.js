import logo from './logo.svg';
import './App.css';
import { Routes, Route, useParams } from 'react-router-dom';
import Home from './components/Home';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Table from './components/extraAgGrid/Table';
import SalaryStructure from './components/modules/staffModule/Salary/SalaryStructure';
import WorkLocationInfo from './components/modules/staffModule/workLocation/WorkLocationInfo';
import SalaryTable from './components/modules/staffModule/Salary/SalaryTable';
import LeaveMaster from './components/modules/staffModule/leaves/LeaveMaster';
import LeaveForm from './components/modules/staffModule/leaves/LeaveForm';
import LeaveMasterTable from './components/modules/staffModule/leaves/LeaveMasterTable';
import LeaveFormTable from './components/modules/staffModule/leaves/LeaveFormTable';

import SalaryInformation from './components/modules/staffModule/SalaryInfo/SalaryInformation';
import StaffMaster from './components/modules/staffModule/staffMaster/StaffMaster';
import StaffMasterData from './components/modules/staffModule/staffMaster/StaffMasterTable';
import StaffMasterTable from './components/modules/staffModule/staffMaster/StaffMasterTable';
import ExpenseClaim from './components/modules/staffModule/ExpenseClaim/ExpenseClaim';
import WorkLocationTable from './components/modules/staffModule/workLocation/WorkLocationTable';
import SalaryInformationTable from './components/modules/staffModule/SalaryInfo/SalaryInformationTable';
// import { Payslip } from './components/modules/staffModule/Payslip/Payslip';
import MonthlyAttendance from './components/modules/staffModule/MonthlyAttendance/MonthlyAttendance';
import TimeSheet from './components/modules/staffModule/TimeSheetReport/Timesheet';
import SalaryProcess from './components/modules/staffModule/SalaryProcess/SalaryProcess';
import { Salaryslip } from './components/modules/staffModule/Payslip/Salaryslip';
import ExpenseTable from './components/modules/staffModule/ExpenseClaim/ExpenseTable';
import EmpNameCode from './share/EmpNameCode';
import SalaryStructureWithSharedComponent from './components/modules/staffModule/Salary/SalaryStructureWithSharedComponent';
import Attendence from './components/modules/staffModule/AttendanceMarking/Attendence';
import SalaryAdvances from './components/modules/staffModule/salarayAdvances/SalaryAdvances';
import SalaryAdvancesTable from './components/modules/staffModule/salarayAdvances/SalaryAdvancesTable';
import PostSalary from './components/modules/staffModule/PostSalary/PostSalary';
import RePaymentLoanInfo from './components/modules/staffModule/salarayAdvances/RePaymentLoanInfo';
import PersonMaster from './components/modules/master/personMaster/PersonMaster';
import PurchaseMaster from './components/modules/purchase/PurchaseMaster';
import PurchaseMasterTable from './components/modules/purchase/PurchaseMasterTable';
import RawMaterial from './components/modules/master/RawMaterialMaster/RawMaterial';
import Stock from './components/modules/stockModule/Stock';
import RawMaterialTable from './components/modules/master/RawMaterialMaster/RawMaterialTable';
import { CompanyMasterTable } from './components/modules/master/companyMaster/CompanyMasterTable';
import CompanyMaster from './components/modules/master/companyMaster/CompanyMaster';
import PersonMasterTable from './components/modules/master/personMaster/PersonMasterTable';
import StockTable from './components/modules/stockModule/StockTable';
import VendorMaster from './components/modules/master/vendorMaster/VendorMaster';
import VendorMasterTable from './components/modules/master/vendorMaster/VendorMasterTable';
import CustomerMaster from './components/modules/master/customerMaster/CustomerMaster';
import CustomerMasterTable from './components/modules/master/customerMaster/CustomerMasterTable';
import StockConsumptionTable from './components/modules/stockModule/stockConsumptionModule/StockConsumptionTable';
import StockConsumption from './components/modules/stockModule/stockConsumptionModule/StockConsumption';
import GoodsReceiptTable from './components/modules/goodsReceipt/GoodsReceiptTable';
import GoodsReceipt from './components/modules/goodsReceipt/GoodsReceipt';
import UnitMaster from './components/modules/master/unitMaster/UnitMaster';
import PlantMaster from './components/modules/master/PlantMaster/PlantMaster'; 
import { PlantMasterTable } from './components/modules/master/PlantMaster/PlantMasterTable'; 
import UnitMasterTable from './components/modules/master/unitMaster/UnitMasterTable';

function App() {
  return (
    <div className="App">
      {/*<EmpNameCode />*/}
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/table" element={<Table />} />
        <Route path="/salary-data" element={<SalaryTable />} />
        <Route path="/salary-structure/:empcode" element={<SalaryStructure />} />
        {/* <Route path="/salary-structure/:empcode" element={<SalaryStructureWithSharedComponent />} />*/}
        <Route path="/worklocation-data" element={<WorkLocationTable />} />
        {/* <Route path="/worklocation" element={<WorkLocationInfo />} /> */}
        <Route path="/attendance" element={<Attendence />} />
        <Route path="leaveMaster" element={<LeaveMaster />} />
        <Route path='leaveMaster/:id' element={<LeaveMaster />} />
        <Route path="leaveMasterTable" element={<LeaveMasterTable />} />
        <Route path='leaveForm' element={<LeaveForm />} />
        <Route path="leaveForm/:id" element={<LeaveForm />} />
        <Route path="leaveForm/:employee" element={<LeaveForm />} />
        <Route path="leaveFormTable" element={<LeaveFormTable />} />
        <Route path="/worklocation/:empcode" element={<WorkLocationInfo />} />
        <Route path="/salary-info-table" element={<SalaryInformationTable />} />
        <Route path='/salary-info' element={<SalaryInformation />} />
        <Route path='/salary-info/:id' element={<SalaryInformation />} />
        <Route path="/expenseClaimTable" element={<ExpenseTable />} />
        <Route path="/staffMasterdata" element={<StaffMasterTable />} />
        <Route path="/staffMaster/:id" element={<StaffMaster />} />
        {/* <Route path="/expenseclaim" element={<ExpenseClaim />} /> */}
        <Route path="/expenseclaim/:ClaimNo" element={<ExpenseClaim />} />
        <Route path="/salaryprocess" element={<SalaryProcess />} />
        {/* <Route path="/payslip" element={<Payslip />} /> */}
        <Route path="/salaryslip" element={<Salaryslip />} />
        <Route path="/salaryslip/:data" element={<Salaryslip />} />
        <Route path="/monthlyattendance" element={<MonthlyAttendance />} />
        <Route path="/timesheet" element={<TimeSheet />} />
        <Route path="/salaryAdvances/:LoanNo" element={<SalaryAdvances />} />
        <Route path="/salaryAdvancesData" element={<SalaryAdvancesTable />} />
        <Route path="/rePayLoanInfo/:LoanNo" element={<RePaymentLoanInfo />} />
        <Route path="/postsalary" element={<PostSalary />} />
        <Route path="/personMaster" element={<PersonMaster />} />
        <Route path="/personMaster/:id" element={<PersonMaster />} />
        <Route path="/personMasterTable" element={<PersonMasterTable />} />
        <Route path="/customerMaster" element={<CustomerMaster />} />
        <Route path="/customerMaster/:id" element={<CustomerMaster />} />
        <Route path="/customerMasterTable" element={<CustomerMasterTable />} />
        <Route path="/vendorMaster" element={<VendorMaster />} />
        <Route path="/vendorMaster/:id" element={<VendorMaster />} />
        <Route path="/vendorMasterTable" element={<VendorMasterTable />} />
        <Route path="/companyMaster" element={<CompanyMaster />} />
        <Route path='companyMaster/:id' element={<CompanyMaster />} />
        <Route path="CompanyMasterTable" element={<CompanyMasterTable />} />
        <Route path="/rawMaterialTable" element={<RawMaterialTable />} />
        <Route path="/rawMaterial" element={<RawMaterial />} />
        <Route path="/rawMaterial/:materialId" element={<RawMaterial />} />
        <Route path="/purchase-order-table" element={<PurchaseMasterTable />} />
        <Route path="/rawMaterial/:materialId" element={<RawMaterial />} />
        <Route path="/purchase-order-table" element={<PurchaseMasterTable />} />
        <Route path="/purchase-master/:pId" element={<PurchaseMaster />} />

        <Route path="/goods-receipt-table" element={<GoodsReceiptTable />} />
        <Route path="/goods-receipt/:pId" element={<GoodsReceipt />} />

        <Route path="/goods-receipt-table" element={<GoodsReceiptTable />} />
        <Route path="/goods-receipt/:pId" element={<GoodsReceipt />} />

        <Route path="/stock/:stockId" element={<Stock />} />
        <Route path="/stockData" element={<StockTable />} />
        <Route path="/stockConsumption/:stockConsumId" element={<StockConsumption />} />
        <Route path="/stockConsumptionData" element={<StockConsumptionTable />} />
        <Route path="/unitMaster" element={<UnitMaster />} />
        <Route path="/unitMaster/:id" element={<UnitMaster />} />
        <Route path="/unitMasterTable" element={<UnitMasterTable />} />
        <Route path="/PlantMaster" element={<PlantMaster />} />
        <Route path='PlantMaster/:id' element={<PlantMaster />} />
        <Route path="PlantMasterTable" element={<PlantMasterTable />} />



      </Routes>

      <Footer />
    </div>
  );
}

export default App;
