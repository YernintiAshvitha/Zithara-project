import React, {  useEffect, useState } from 'react';
import './App.css'; // Import CSS file for styling
import axios from 'axios';
import DataTable from 'react-data-table-component';

const customStyle={
  headRow:{
    style: {
      backgroundColor: '#51e2f5',
      color: 'white'
    },
  },
  headcells:{
    style:{
      forntSize: '18px',
      fontWeight: '800',
      textTransform: 'uppercase'
      
    },
  },
  cellls:{
    style:{
      forntSize:"22px",
      backgroundColor: '#ffdead'
    },
  },
}


function App() {
  // State to store fetched data
  const column = [
    {
      name:"SNo",
      selector: row => row.Sno,
      sortable: true
    },
    {
      name:"Customer Name",
      selector : row => row.customer_name
    },
    {
      name:"Age",
      selector : row => row.age
    },
    {
      name:"Phone Number",
      selector : row => row.phone
    },
    {
      name:"Location",
      selector : row => row.location
    },
    {
      name: "Date",
      selector: row => {
        const dateTime = new Date(row.created_at);
        return dateTime.toLocaleDateString();
      },
      sortable: true
    },
    {
      name: "Time",
      selector: row => {
        const dateTime = new Date(row.created_at);
        return dateTime.toLocaleTimeString();
      },
      sortable: true
    }
  ]
    

  // Effect hook to fetch data from backend
  useEffect(() => {
    const fetchData = async () => {
        axios.get('http://localhost:3000/api/customer')
        .then(res => {
          setRecords(res.data)
          setfRecords(res.data)
          
        })
        .catch(err => console.log(err))
    }
    fetchData();
  }, [])

  // Function to fetch data from backend
  
  
const [records,setRecords] = useState([])

const [frecords,setfRecords] = useState([])

const handleFilter = (event) =>{
  const newData = frecords.filter(row => row.customer_name.toLowerCase().includes( event.target.value.toLowerCase() ) || row.location.toLowerCase().includes( event.target.value.toLowerCase() ))
  setRecords(newData);
}
  return (
    
    <div style={{padding: "50px 10%", backgroundColor: "#ffa8B6"}}>
      <h1 className='h1'>
       Customer Details Table 
      </h1>
      <div style={{display:'flex',justifyContent:'right'}}>
        <input className='search-bar' type="text" placeholder='Search by Name or Location' onChange={handleFilter}style={{padding:'6px 10px' , backgroundColor: "#fbe3e8"}} />
      </div >
      <DataTable className='table'
      columns={column}
      data={records}
      customStyles={customStyle}
      pagination
     

     


  
      
      >

      </DataTable>
    </div>
  )
};


export default App;