import React from "react";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import "./Home.css";

const Home = () => {
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

  return (
    <div className="home1">
      <Header
        headerAlignSelf="stretch"
        onButtonClick={onButtonClick}
        onButton1Click={onButton1Click}
        onButton2Click={onButton2Click}
      />
      <section className="content-section">
        <div className="heading">
          <div className="your-personal-finance">
            Your Personal Finance Manager
          </div>
        </div>
        <div className="cards-container">
          <div className="card">
            <div className="carddetails">
              <div className="text-wrapper">
                <div className="info">
                  You can add information of about Income
                </div>
                <div className="info">You can add information of Expense</div>
                <div className="info">Track your balance</div>
                <div className="info">Track your expenses</div>
                <div className="info">Get List of Incomes</div>
                <div className="info">Get List of Expenses</div>
              </div>
            </div>
            <img
              className="homepageimage-icon"
              alt=""
              src="/homepageimage@2x.png"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
