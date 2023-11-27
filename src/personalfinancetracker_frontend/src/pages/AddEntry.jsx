import React from "react";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import "./AddEntry.css";

const AddEntry = () => {
  const navigate = useNavigate();

  const onButtonClick = useCallback(() => {
    navigate("/");
  }, [navigate]);

  const onButton1Click = useCallback(() => {
    navigate("/add-entry");
  }, [navigate]);

  const onButton2Click = useCallback(() => {
    navigate("/getdata");
  }, [navigate]);

  const onButton3Click = useCallback(() => {
    navigate("/addincomepage");
  }, [navigate]);

  const onButton4Click = useCallback(() => {
    navigate("/addexpensepage");
  }, [navigate]);

  return (
    <div className="add-entry1">
      <Header
        headerAlignSelf="stretch"
        onButtonClick={onButtonClick}
        onButton1Click={onButton1Click}
        onButton2Click={onButton2Click}
      />
      <div className="frame1">
        <div className="buttonframe1">
          <button
            className="button12"
            onClick={onButton3Click}
          >
            <div className="button13">Add Income</div>
          </button>
          <button
            className="button12"
            onClick={onButton4Click}
          >
            <div className="button13">Add Expense</div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddEntry;
