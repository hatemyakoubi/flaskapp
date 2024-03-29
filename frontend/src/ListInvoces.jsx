import React from 'react'
import {useState, useEffect} from 'react';

const ListInvoces = () => {
  const [invoces, setInvoce] = useState([]);

  useEffect(() =>{
    fetch('http://127.0.0.1:5000/get',{
      'methods' : 'GET',
      headers:{
        'Content-Type' : 'application/json'
      }
    })
    .then(resp =>resp.json())
    .then(resp =>setInvoce(resp))
    .catch(error =>console.log(error))
  },[]);
    return(
    <div className='container'>
        <h1>List of Invoces</h1>
        <table className='table table-hover'>
              <tr>
                <th>ID</th>
                <th>Description</th>
                <th>Image</th>
                <th>Date</th>
              </tr>
              {invoces.map(invoce=>{
                return (
                  <tr key={invoce.id}>
                  <td>{invoce.id}</td>
                  <td>{invoce.description}</td>
                  <td>{invoce.image}</td>
                  <td>{invoce.date ? invoce.date:'-'}</td>
                </tr>
                )
              })}
        </table>
    </div>
    ) ;

  };

export default ListInvoces