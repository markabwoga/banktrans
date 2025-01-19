
import React, { useState, useEffect } from "react"

const Receipts = () => {
    //initial values in my receipt
    const [inputData, setInputData] = useState({
        Date: "",
        Description: "",
        category: "",
        Amount: "",

    });
    const [searchTerm, setSearchTerm] = useState("")
    //values after submitting data

    const [tableData, setTableData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("http://localhost:5000/transactions");
                const data = await response.json();
                setTableData(data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []); // Empty dependency array to run only on mount


    //function for input change

    const onInputChange = (e) => {
        const {name, value} = e.target;
        setInputData({...inputData, [name]: value})
    };

    //function for submission
    const onSubmitData = async (e) => {
        e.preventDefault();
        
        if (inputData.Amount > 0) {
            try {
                // Send a POST request to add the new receipt to db.json
                const response = await fetch("http://localhost:5000/transactions", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(inputData),
                });
    
                // After adding, fetch updated data
                const newReceipt = await response.json();
                setTableData((prevData) => [...prevData, newReceipt]);
    
                // Reset input fields
                setInputData({
                    Date: "",
                    Description: "",
                    category: "",
                    Amount: "",
                });
            } catch (error) {
                console.error("Error adding transaction:", error);
            }
        } else {
            alert("Amount must be a positive number");
        }
    };
    

    const onSearchChange = (e) => {
        setSearchTerm(e.target.value);  
    };
     
    const filteredTableData = tableData.filter((data) =>
        data.Description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        data.category.toLowerCase().includes(searchTerm.toLowerCase())
    );



    return (
        <>
        <div class="tittlediv">
            <h1>The Royal bank of Flatiron</h1>
        </div>
        <div class="searchdiv">
            <input class="searchdiv"
             className="searchDiv"
             placeholder="Search transactions"
             value={searchTerm}
             onChange={onSearchChange}
            >   
            </input>
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
                        {filteredTableData.map((data, index) => (
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