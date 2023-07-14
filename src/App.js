import logo from './logo.svg';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Table from './components/extraAgGrid/Table';
import SalaryStructure from './components/modules/staffModule/Salary/SalaryStructure';
import WorkLocationInfo from './components/modules/staffModule/WorkLocationInfo';
import Login from './components/extraAgGrid/Login';
import SalaryTable from './components/modules/staffModule/Salary/SalaryTable';
import StaffMasterData from './components/modules/staffModule/staffMaster/StaffMasterTable';
import StaffMasterTable from './components/modules/staffModule/staffMaster/StaffMasterTable';
import StaffMaster from './components/modules/staffModule/staffMaster/StaffMaster';
import ExpenseClaim from './components/modules/staffModule/ExpenseClaim/ExpenseClaim';

function App() {
  return (

    <div className="App">
      {/*<Login />*/}
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/table" element={<Table />} />
        <Route path="/salary-data" element={<SalaryTable />} />
        <Route path="/salary-structure/:empcode" element={<SalaryStructure />} />
        <Route path="/worklocation" element={<WorkLocationInfo />} />
        <Route path= "/expenseclaim" element={<ExpenseClaim />}/>

      </Routes>
      <Footer />
    </div>
  );
}

export default App;
