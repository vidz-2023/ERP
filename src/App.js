import logo from './logo.svg';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Table from './components/extraAgGrid/Table';
import SalaryStructure from './components/modules/staffModule/Salary/SalaryStructure';
import WorkLocationInfo from './components/modules/staffModule/workLocation/WorkLocationInfo';
import SalaryTable from './components/modules/staffModule/Salary/SalaryTable';
import SalaryInformation from './components/modules/staffModule/SalaryInfo/SalaryInformation';
import StaffMaster from './components/modules/staffModule/staffMaster/StaffMaster';
import StaffMasterData from './components/modules/staffModule/staffMaster/StaffMasterTable';
import StaffMasterTable from './components/modules/staffModule/staffMaster/StaffMasterTable';
import ExpenseClaim from './components/modules/staffModule/ExpenseClaim/ExpenseClaim';
import WorkLocationTable from './components/modules/staffModule/workLocation/WorkLocationTable';
import SalaryInformationTable from './components/modules/staffModule/SalaryInfo/SalaryInformationTable';

function App() {
  return (

    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/table" element={<Table />} />
        <Route path="/salary-data" element={<SalaryTable />} />
        <Route path="/salary-structure/:empcode" element={<SalaryStructure />} />
        <Route path="/worklocation-data" element={<WorkLocationTable />} />
        <Route path="/worklocation" element={<WorkLocationInfo />} />
        <Route path="/worklocation/:empcode" element={<WorkLocationInfo />} />
        <Route path="/salary-info-table" element={<SalaryInformationTable />} />
        <Route path='/salary-info' element={<SalaryInformation />} />
        <Route path='/salary-info/:id' element={<SalaryInformation />} />
        <Route path="/expenseclaim" element={<ExpenseClaim />} />
        <Route path="/staffMasterdata" element={<StaffMasterTable />} />
        <Route path="/staffMaster" element={<StaffMaster />} />
        <Route path="/expenseclaim" element={<ExpenseClaim />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
