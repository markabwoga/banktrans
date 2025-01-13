
import React, { useState } from "react"

const Receipts = () => {
    //initial values in my receipt
    const [inputData, setInputData] = useState({
        Date: "",
        Description: "",
        category: "",
        Amount: "",

    });
    //values after submitting data

    const [tableData, setTableData] = useState([]);

    //function for input change

    const onInputChange = (e) => {
        const {name, value} = e.target;
        setInputData({...inputData, [name]: value})
    };

    //function for submission

    const onSubmitData = (e) => {
        e.preventDefault();

        setTableData([...tableData, inputData]);

        setInputData({
            Date: "",
            Description: "",
            category: "",
            Amount: "",
        })
    };


    return (
        <>
        <div class="tittlediv">
            <h1>The Royal bank of Flatiron</h1>
        </div>
        <div class="searchdiv">
            <input class="searchdiv" ></input>
        </div>
        <div class="formdiv">
        <form onSubmit={onSubmitData}>
            <div class="inputdiv">
               <lable>Date</lable>
               <input 
                type="Date"
                name= "Date"
                value={inputData.Date}
                onChange={onInputChange}
               />
              <lable></lable>
               <input 
                type="text"
                name= "Description"
                value={inputData.Description}
                onChange={onInputChange}
                placeholder="Description"
               />
              <lable></lable>
               <input 
                type="text"
                name= "category"
                value={inputData.category}
                onChange={onInputChange}
                placeholder="category"
               />
              <lable></lable>
               <input 
                type="number"
                name= "Amount"
                value={inputData.Amount}
                onChange={onInputChange}
                placeholder="Amount"
               />
               </div>

               <div class="submitbutton"> <button type="submit">Add Transactions</button></div>

            </form>     
        </div>
   
        <div class="receiptdiv">
            <table border = "1">
                <thead>
                    <tr>
                        <td class="tcell">Date</td>
                        <td class="tcell">Description</td>
                        <td class="tcell">category</td>
                        <td class="tcell">Amount</td>
                    </tr>
                </thead>
                <tbody>
             {tableData.map((data, index) => (
                <tr key={index}>
                  <td>{data.Date}</td>
                  <td>{data.Description}</td>
                  <td>{data.category}</td>
                  <td>{data.Amount}</td>
               </tr>
          ))}
                  
                    
                </tbody>
            </table>
        </div>

        </>

    )
}

export default Receipts;