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
import { Payslip } from './components/modules/staffModule/Payslip/Payslip';
import MonthlyAttendance from './components/modules/staffModule/MonthlyAttendance/MonthlyAttendance';
import TimeSheet from './components/modules/staffModule/TimeSheetReport/Timesheet';
import EmpNameCode from './share/EmpNameCode';
import SalaryStructureWithSharedComponent from './components/modules/staffModule/Salary/SalaryStructureWithSharedComponent';
import Attendence from './components/modules/staffModule/AttendanceMarking/Attendence';
import SalaryAdvances from './components/modules/staffModule/salarayAdvances/SalaryAdvances';
import SalaryAdvancesTable from './components/modules/staffModule/salarayAdvances/SalaryAdvancesTable';

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
        <Route path="/worklocation" element={<WorkLocationInfo />} />
        <Route path="/attendance" element={<Attendence />} />
        <Route path="leaveMaster" element={<LeaveMaster />} />
        <Route path='leaveMaster/:id' element={<LeaveMaster />} />
        <Route path="leaveMasterTable" element={<LeaveMasterTable />} />
        <Route path='leaveForm' element={<LeaveForm />} />
        <Route path="leaveForm/:id" element={<LeaveForm />} />
        <Route path="leaveFormTable" element={<LeaveFormTable />} />
        <Route path="/worklocation/:empcode" element={<WorkLocationInfo />} />
        <Route path="/salary-info-table" element={<SalaryInformationTable />} />
        <Route path='/salary-info' element={<SalaryInformation />} />
        <Route path='/salary-info/:id' element={<SalaryInformation />} />
        <Route path="/expenseclaim" element={<ExpenseClaim />} />
        <Route path="/staffMasterdata" element={<StaffMasterTable />} />
        <Route path="/staffMaster/:id" element={<StaffMaster />} />
        <Route path="/expenseclaim" element={<ExpenseClaim />} />
        <Route path="/payslip" element={<Payslip />} />
        <Route path="/monthlyattendance" element={<MonthlyAttendance />} />
        <Route path="/timesheet" element={<TimeSheet />} />
        <Route path="/salaryAdvances/:empcode" element={<SalaryAdvances />} />
        <Route path="/salaryAdvancesData" element={<SalaryAdvancesTable />} />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
