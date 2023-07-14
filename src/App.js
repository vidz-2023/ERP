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
import SalaryProcess from './components/modules/staffModule/SalaryProcess/SalaryProcess';

function App() {
  return (

    <div className="App">
      {/*<Login />*/}
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/table" element={<Table />} />
        <Route path="/salary-data" element={<SalaryTable />} />
        <Route path="/worklocation" element={<WorkLocationInfo />} />
        <Route path="/salaryprocess" element={<SalaryProcess />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
