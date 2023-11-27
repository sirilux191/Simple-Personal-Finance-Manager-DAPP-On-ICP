// Import necessary libraries
import React from "react";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import "./AddIncomePage.css";
//DIFFERENCE 1
// Connect2ic: Import Connect2ic library to interact with the backend canister
import { useCanister } from "@connect2ic/react";
//
//DIFFERENCE 1

const AddIncomePage = () => {
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

  // Function to add an income
  const addIncome = async (event) => {
    event.preventDefault();

    // Call the backend to add an income
    const value = await personalfinancetracker_backend.addIncome(
      Number(event.target.incomeamount.value),
      event.target.incomedescription.value,
      event.target.incomecategory.value
    );
    Object.keys(value).forEach((key) => {
      alert(value[key]);
    });
  };
  //DIFFERENCE 3
  return (
    <div className="addincomepage">
      <Header
        headerAlignSelf="stretch"
        onButtonClick={onButtonClick}
        onButton1Click={onButton1Click}
        onButton2Click={onButton2Click}
      />
      <section className="incomeform">
        <h1 className="add-your-income">Add Your Income Details</h1>
        <form
          // DIFFERENCE 4
          id="inputIncomeForm"
          onSubmit={addIncome}
          // DIFFERENCE 4
          className="form"
        >
          <div className="formpart">
            <div className="input-field-base">
              <label className="income-amount">Income Amount</label>
              <div className="inputfield">
                <input
                  //DIFFERENCE 5
                  className="income-amount1"
                  placeholder="Income Amount"
                  type="number"
                  id="incomeamount"
                  required
                />
              </div>
            </div>
            <div className="input-field-base">
              <label className="income-amount">Income Description</label>
              <div className="inputfield">
                <input
                  //DIFFERENCE 6
                  className="income-amount1"
                  placeholder="Income Description"
                  type="text"
                  id="incomedescription"
                  required
                />
              </div>
            </div>
            <div className="input-field-base">
              <label className="income-amount">Income Category</label>
              <div className="inputfield">
                <input
                  //DIFFERENCE 7
                  className="income-amount1"
                  placeholder="Income Category"
                  type="text"
                  id="incomecategory"
                  required
                />
              </div>
            </div>
          </div>
        </form>
        <button
          //DIFFERENCE 8
          type="submit"
          form="inputIncomeForm"
          className="button16"
        >
          <div className="update">Update</div>
        </button>
      </section>
    </div>
  );
};

export default AddIncomePage;
