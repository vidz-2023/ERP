import React, { useEffect, useState } from 'react'
import { AgGridReact } from 'ag-grid-react'
import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-alpine.css'
import { getOfficialInfo } from '../../../../services/salaryInfoService'
import { useNavigate } from 'react-router-dom'
import DeleteEditSalaryInfo from './DeleteEditSalaryInfo'

const SalaryInformationTable = () => {
  const [officialInfo, setOfficialInfo] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    handleSalaryTableData()
  }, [])

  const handleSalaryTableData = () => {
    getOfficialInfo().then(res => {
      console.log(res.data)
      setOfficialInfo(res.data)
    })
  }

  const columns = [
    {
      headerName: 'Emp Code',
      field: 'empCode'
    },
    // {
    //   headerName: 'CityType',
    //   field: 'CityType'
    // },
    {
      headerName: 'Joining Date',
      field: 'JoiningDate'
    },
    // {
    //   headerName: 'ConfirmationDate',
    //   field: 'ConfirmationDate'
    // },
    // {
    //   headerName: 'ProbationMonths',
    //   field: 'ProbationMonths'
    // },
    // {
    //   headerName: 'NoticeDays',
    //   field: 'NoticeDays'
    // },
    // {
    //   headerName: 'SalaryWages',
    //   field: 'SalaryWages'
    // },
    // {
    //   headerName: 'Sourcing',
    //   field: 'Sourcing'
    // },
    // {
    //   headerName: 'SkillSet',
    //   field: 'SkillSet'
    // },
    {
      headerName: 'PAN No',
      field: 'PANNo'
    },
    {
      headerName: 'UAN No',
      field: 'UANNo'
    },
    {
      headerName: 'VoterID No',
      field: 'VoterIDNo'
    },
    {
      headerName: 'Aadhar Card No',
      field: 'AadharCardNo'
    },
    {
      headerName: 'Passport No',
      field: 'PassportNo'
    },
    // {
    //   headerName: 'PassportValidUpto',
    //   field: 'PassportValidUpto'
    // },
    // {
    //   headerName: 'DLNo',
    //   field: 'DLNo'
    // },
    // {
    //   headerName: 'DLValidupto',
    //   field: 'DLValidupto'
    // }
    {
      headerName: 'Action',
      field: 'empCode',
      cellRenderer: DeleteEditSalaryInfo,
      cellRendererParams: {
        funGetSalaryInfo: handleSalaryTableData
      }
    }
  ]

  const defaultColDef = {
    sortable: true,
    filter: true,
    flex: 1
  }

  const handleSalaryInfo = () => {
    navigate('/salary-info/0')
  }

  return (
    <>
      <div className='container-fluid mt-4'>
        <div className='row justify-content-md-center'>
          <button
            type='button'
            className='btn btn-info w-25'
            onClick={() => {
              handleSalaryInfo()
            }}
          >
            Add Data
          </button>
        </div>
        <div className='ag-theme-alpine my-3' style={{ height: 300 }}>
          <AgGridReact
            rowData={officialInfo}
            columnDefs={columns}
            defaultColDef={defaultColDef}
          />
        </div>
      </div>
    </>
  )
}

export default SalaryInformationTable
