import Transaction from './component/Transaction';
import FormComponent from './component/FormComponent1';
import './App.css';
import React, { useEffect } from 'react';
import { useState } from 'react';
import DataContext from './data/DataContext';
import ReportComponent from './component/ReportComponent';
import { BrowserRouter as Router,Routes,Route,Link } from 'react-router-dom';
 
function App() {

  const initData = [
    // {id:1,title:"Salary",amount:20000},
    // {id:2,title:"Shopping",amount:-2000},
    // {id:3,title:"Car insurance",amount:-4000},
    // {id:4,title:"Drug store",amount:-200},
    // {id:5,title:"Rent",amount:-6000},
    // {id:6,title:"Bonus",amount:30000},
  ]
  const [items,setItems] = useState(initData)

  const [reportIncome,setReportIncome] = useState(0)
  const [reportExpense,setReportExpense] = useState(0)
  const onAddNewItem = (newItem)=>{ //note1 สร้าง function ขึ้นเพื่อรับข้อมูลจากFormComponent
    setItems((prevItem)=>{
      return [newItem,...prevItem]
    })
  }
  useEffect(()=>{
    const amounts = items.map(items=>items.amount)
    const income = amounts.filter(element=>element>0).reduce((total,element)=>total+=element,0)
    const expense = (amounts.filter(element=>element<0).reduce((total,element)=>total+=element,0))*-1
    setReportIncome(income.toFixed(2))
    setReportExpense(expense.toFixed(2))//toFixed คือให้มีทศนิยม2ตำแหน่ง
  },[items,reportIncome,reportExpense])



  return (
    <DataContext.Provider value={{income : reportIncome,expense : reportExpense}}>
      <div className='bar'></div>
      <div className='container'>
        
        <h1 className='head'>Income and Expense</h1>
        <Router>
          <div>
            <ul className='horizontal-menu'>
              <li>
                  <Link to="/">ข้อมูลบัญชี</Link>
              </li>
              <li>
                  <Link to="/insert">บันทึกข้อมูล</Link>
              </li>
            </ul>
            <Routes>
              <Route path='/' element={
                <ReportComponent/>
                }>
              </Route>
              <Route path='/insert' element={
                <>
                    <FormComponent onAddItem={onAddNewItem}/> {/* note1 */}
                </>}>
              </Route>
            </Routes>
            <Transaction items={items}/> {/* //สร้าง prop เพื่อให้ส่งข้อมูลไปที่ Transaction ได้ */}
          </div>
        </Router>


      
      </div>
    
    
    </DataContext.Provider>
   
);
}

export default App;
