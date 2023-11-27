import React from "react";
import { useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./NavDrawer.css";

const NavDrawer = ({ onClose }) => {
  const navigate = useNavigate();
  useEffect(() => {
    const scrollAnimElements = document.querySelectorAll(
      "[data-animate-on-scroll]"
    );
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting || entry.intersectionRatio > 0) {
            const targetElement = entry.target;
            targetElement.classList.add("animate");
            observer.unobserve(targetElement);
          }
        }
      },
      {
        threshold: 0.15,
      }
    );

    for (let i = 0; i < scrollAnimElements.length; i++) {
      observer.observe(scrollAnimElements[i]);
    }

    return () => {
      for (let i = 0; i < scrollAnimElements.length; i++) {
        observer.unobserve(scrollAnimElements[i]);
      }
    };
  }, []);

  const onHomeSectionClick = useCallback(() => {
    navigate("/");
  }, [navigate]);

  const onAddEntrySectionClick = useCallback(() => {
    navigate("/add-entry");
  }, [navigate]);

  const onGetDataSectionClick = useCallback(() => {
    navigate("/getdata");
  }, [navigate]);

  return (
    <div
      className="navdrawer"
      data-animate-on-scroll
    >
      <button
        className="homesection"
        onClick={onHomeSectionClick}
      >
        <img
          className="homeicon"
          alt=""
          src="/homeicon.svg"
        />
        <div className="home">Home</div>
      </button>
      <button
        className="addentrysection"
        onClick={onAddEntrySectionClick}
      >
        <img
          className="homeicon"
          alt=""
          src="/addentryicon.svg"
        />
        <div className="home">Add Entry</div>
      </button>
      <button
        className="addentrysection"
        onClick={onGetDataSectionClick}
      >
        <img
          className="homeicon"
          alt=""
          src="/getdataicon.svg"
        />
        <div className="home">Get Data</div>
      </button>
    </div>
  );
};

export default NavDrawer;
