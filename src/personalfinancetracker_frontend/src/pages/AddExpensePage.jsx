// Import necessary libraries
import React from "react";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import "./AddExpensePage.css";
//DIFFERENCE 1
// Connect2ic: Import Connect2ic library to interact with the backend canister
import { useCanister } from "@connect2ic/react";
//
//DIFFERENCE 1

const AddExpensePage = () => {
  //DIFFERENCE 2
  // Connect2ic: Use the "personalfinancetracker_backend" canister
  const [personalfinancetracker_backend] = useCanister(
    "personalfinancetracker_backend"
  );
  //
  //DIFFERENCE 2

  // Initialize navigation hook for routing
  const navigate = useNavigate();

  // Define callback functions for navigation
  const onButtonClick = useCallback(() => {
    navigate("/");
  }, [navigate]);

  const onButton1Click = useCallback(() => {
    navigate("/add-entry");
  }, [navigate]);

  const onButton2Click = useCallback(() => {
    navigate("/getdata");
  }, [navigate]);
  //DIFFERENCE 3
  // Function to add an expense
  const addExpense = async (event) => {
    event.preventDefault();

    // Call the backend to add an expense
    const value = await personalfinancetracker_backend.addExpense(
      Number(event.target.expenseamount.value),
      event.target.expensedescription.value,
      event.target.expensecategory.value
    );
    Object.keys(value).forEach((key) => {
      alert(value[key]);
    });
  };
  //DIFFERENCE 3

  // Render the component
  return (
    <div className="addexpensepage">
      <Header
        headerAlignSelf="stretch"
        onButtonClick={onButtonClick}
        onButton1Click={onButton1Click}
        onButton2Click={onButton2Click}
      />
      <section className="expenseform">
        <h1 className="add-your-expense">Add Your Expense Details</h1>
        <form
          //DIFFERENCE 4
          id="expenseInputForm"
          onSubmit={addExpense}
          className="form1"
        >
          <div className="formpart1">
            <div className="input-field-base3">
              <label className="expense-amount">Expense Amount</label>
              <div className="inputfield3">
                <input
                  //DIFFERENCE 5
                  className="expense-amount1"
                  placeholder="Expense Amount"
                  type="number"
                  id="expenseamount"
                  required
                />
              </div>
            </div>
            <div className="input-field-base3">
              <label className="expense-amount">Expense Description</label>
              <div className="inputfield3">
                <input
                  //DIFFERENCE 6
                  className="expense-amount1"
                  placeholder="Expense Description"
                  type="text"
                  id="expensedescription"
                  required
                />
              </div>
            </div>
            <div className="input-field-base3">
              <label className="expense-amount">Expense Category</label>
              <div className="inputfield3">
                <input
                  //DIFFERENCE 7
                  className="expense-amount1"
                  placeholder="Expense Category"
                  type="text"
                  id="expensecategory"
                  required
                />
              </div>
            </div>
          </div>
        </form>
        <button
          //DIFFERENCE 8
          type="submit"
          form="expenseInputForm"
          className="button17"
        >
          <div className="update1">Update</div>
        </button>
      </section>
    </div>
  );
};

export default AddExpensePage;
