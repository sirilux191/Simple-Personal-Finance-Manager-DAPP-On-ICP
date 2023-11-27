import React from "react";
import { useState, useMemo, useCallback } from "react";
import NavDrawer from "./NavDrawer";
import PortalDrawer from "./PortalDrawer";
import "./Header.css";

const Header = ({
  headerAlignSelf,
  onButtonClick,
  onButton1Click,
  onButton2Click,
}) => {
  const headerStyle = useMemo(() => {
    return {
      alignSelf: headerAlignSelf,
    };
  }, [headerAlignSelf]);

  const [isNavDrawerOpen, setNavDrawerOpen] = useState(false);

  const openNavDrawer = useCallback(() => {
    setNavDrawerOpen(true);
  }, []);

  const closeNavDrawer = useCallback(() => {
    setNavDrawerOpen(false);
  }, []);

  return (
    <>
      <header
        className="header"
        style={headerStyle}
      >
        <section className="top-container">
          <div
            className="sirilux-logo"
            id="SiriluxLogo"
          >
            <p className="personal-finance-manager">Personal Finance Manager</p>
          </div>
          <nav className="navigation-right">
            <nav className="navigation-menu">
              <button
                className="button2"
                onClick={onButtonClick}
              >
                <div className="button3">Home</div>
              </button>
              <button
                className="button2"
                onClick={onButton1Click}
              >
                <div className="button3">Add Entry</div>
              </button>
              <button
                className="button2"
                onClick={onButton2Click}
              >
                <div className="button3">Get Data</div>
              </button>
            </nav>
            <div className="responsive">
              <img
                className="hamburger-menu-icon"
                alt=""
                src="/notification.svg"
                onClick={openNavDrawer}
              />
            </div>
          </nav>
        </section>
      </header>
      {isNavDrawerOpen && (
        <PortalDrawer
          overlayColor="rgba(113, 113, 113, 0.3)"
          placement="Left"
          onOutsideClick={closeNavDrawer}
        >
          <NavDrawer onClose={closeNavDrawer} />
        </PortalDrawer>
      )}
    </>
  );
};

export default Header;
