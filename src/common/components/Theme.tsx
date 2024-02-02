import React from "react";
import { useSelector } from "react-redux";
import { ConfigProvider } from "antd";
import { State } from "../../store";

interface ThemeProps {
  children: React.ReactNode;
}

const Theme: React.FC<ThemeProps> = ({ children }) => {
  const isDarkMode = useSelector<State, boolean>(
    (state) => state.theme.isDarkMode
  );
  return (
    <ConfigProvider
      theme={{
        components: {
          Radio: {
            colorPrimary: "#2A4061",
            colorTextLabel: "black",
            colorPrimaryHover: "#2A4061",
            colorPrimaryActive: "#2A4061",
            colorText: "black",
          },
          Breadcrumb: {
            colorBgTextHover: isDarkMode ? "#414C5E" : "#F0F3FF",
            colorText: isDarkMode ? "rgba(255, 255, 255, 0.45)" : "black",
          },
          Modal: {
            colorBgElevated: isDarkMode ? "#414C5E" : "white",
            colorTextHeading: isDarkMode ? "white" : "black",
          },
        },
      }}
    >
      <div className={`${isDarkMode ? "dark" : ""}`}>{children}</div>
    </ConfigProvider>
  );
};

export default Theme;
