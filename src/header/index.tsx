import { Button, Tooltip } from "antd";
import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { State } from "../store";
import { ThemeAction } from "../common/reducers/ThemeReducer";
import { BiMoon, BiSun } from "react-icons/bi";
import Filter from "../filter";
import { useLocation } from 'react-router-dom';
import { useState } from "react";
import FilterMobile from "../filter/indexMobile";
import { FiMenu } from 'react-icons/fi';
import { BiArrowFromRight } from 'react-icons/bi';

interface HeaderProps { }

const Header: React.FC<HeaderProps> = () => {
  const isDarkMode = useSelector<State, boolean>(
    (state) => state.theme.isDarkMode
  );
  const dispatch = useDispatch();
  const location = useLocation();

  const [isVisible, setIsVisible] = useState(false);
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };
  const [isMobileMode, setIsMobileMode] = useState(() => {
    const mediaQuery = window.matchMedia("(max-width: 500px)");
    return mediaQuery.matches;
  });


  const headerText = useMemo(() => {
    switch (location.pathname) {
      case "/tutela/summary":
        return "Monitoring Benchmark";
      case "/tutela/kpi-details":
        return "Performa Details";
      case "/tutela/fail-contributor":
        return "Fail Performence";
      case "/tutela/day-monitoring":
        return "Daily Performance";
      case "/tutela/week-monitoring":
        return "Week Performance";
      case "/tutela/month-monitoring":
        return "Month Performance";
      case "/tutela/flip-flop":
        return "Flip Flop Winning Cities";
      default:
        return "Monitoring Benchmark";
    }
  }, [location.pathname]);

  const handleScroll = () => {
    if (window.scrollY > 100) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    const handleResize = () => {
      setIsMobileMode(document.documentElement.clientWidth <= 500);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <header className={`header md:w-full py-6 flex bg-red-600 justify-between items-center rounded-lg  backdrop-blur-md bg-opacity-25 border border-white p-4 mb-4 ${isVisible ? "fixed top-0 left-0 right-0 z-10" : ""
        }`}>
        {isMobileMode && (
          <button onClick={toggleSidebar} className="p-2 rounded hover:bg-gray-700">
            <FiMenu size={24} />
          </button>
        )}
        <p className={`text-white font-bold md:text-2xl sm:text-sm drop-shadow-glasses md:text-left text-center w-full ${document.documentElement.clientWidth <= 500 ? "text-center" : ""}`}>
          {headerText}
        </p>
        <div className="flex gap-4">
          {document.documentElement.clientWidth > 500 && (
            <Filter />
          )}
          <Tooltip title={isDarkMode ? "Dark Mode" : "Light Mode"}>
            <Button
              shape="circle"
              className="flex justify-center items-center"
              onClick={() => {
                dispatch(ThemeAction.setDarkMode(!isDarkMode));
              }}
              icon={isDarkMode ? <BiMoon /> : <BiSun />}
            />
          </Tooltip>
        </div>
      </header>
      {isSidebarVisible || isMobileMode && (
        <div className="fixed top-1 left-1 h-full w-64 z-50 transition-all transform rounded-lg  backdrop-blur-md bg-opacity-25 border border-white p-4">
          <button className="p-2 rounded hover:bg-gray-700 mb-8">
            <BiArrowFromRight onClick={toggleSidebar} className=" cursor-pointer" size={24} />
          </button>
          {isMobileMode && <FilterMobile />}
        </div>
      )}
    </>
  );
};

export default Header;
