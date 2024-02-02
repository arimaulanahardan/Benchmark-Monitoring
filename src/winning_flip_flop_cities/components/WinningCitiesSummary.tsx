import React from "react";
import { useSelector } from "react-redux";
import { State } from "../../store";
import { ArrowDownOutlined, ArrowUpOutlined } from "@ant-design/icons";
import { Statistic } from "antd";
import Skeleton from "antd/es/skeleton";
import { IWinningCitiesTableSummary } from "../interfaces/WinningCitiesTableSummary";

interface WinningCitiesSummaryProps {
  name: string;
  value: number;
  showArrow?: boolean;
  percentage?: boolean;
  loading?: boolean;
  status_win: IWinningCitiesTableSummary["status_win"];
}

const WinningCitiesSummary: React.FC<WinningCitiesSummaryProps> = ({
  name,
  value,
  showArrow,
  percentage,
  loading,
  status_win,
}) => {
  const isDarkMode = useSelector<State, Boolean>(
    (state) => state.theme.isDarkMode
  );

  if (loading) {
    return (
      <div className="p-2 bg-white dark:bg-[#343541] rounded-lg">
        <Skeleton active />
      </div>
    );
  }

  const isPositive = value > 0;
  const arrowIcon = isPositive ? <ArrowUpOutlined /> : <ArrowDownOutlined />;
  const textColor = percentage
    ? isPositive
      ? "green"
      : "red"
    : isDarkMode
      ? "white"
      : "black";

  if (status_win === "win") {
    return (
      <div className="flex">
        <div className="pb-6 bg-slate-50 rounded-lg bg-white dark:bg-[#343541] shadow-md w-full">
          <div className="dark:bg-[#343541] rounded-t-lg relative">
            <h1
              className={`bg-gradient-to-tl from-blue-50 to-blue-100 dark:from-[#292f38] dark:to-[#414C5E] dark:text-white rounded-lg flex items-center justify-center p-2 text-sm sm:text-xs sm:leading-3 text-center font-semibold`}
            >
              {name}
            </h1>
          </div>
          <Statistic
            style={{ marginTop: "20px", textAlign: "center" }}
            value="Status Win"
            valueStyle={{
              fontSize: "1.2rem",
              fontWeight: "bold",
              color: "#38a169",
              padding: "1px",
              borderRadius: "0.5rem",
              textAlign: "center",
              marginTop: "20px",
            }}
          />
        </div>
      </div>

    );
  } else {
    return (
      <div className="flex">
        <div className="h-[120px] bg-slate-50 rounded-lg bg-white dark:bg-[#343541] shadow-md w-full">
          <div className="h-[50px] bg-gradient-to-tl from-blue-50 to-blue-100 dark:from-[#292f38] dark:to-[#414C5E] dark:text-white rounded-lg flex items-center justify-center">
            <h1
              className="md:text-sm text-xs leading-3 text-center font-semibold"
            >
              {name}
            </h1>
          </div>
          <div className="mt-4 items-center justify-center text-xs">
            <Statistic
              value={value}
              style={{ textAlign: "center" }}
              valueStyle={{ color: textColor, fontWeight: "medium" }}
              prefix={showArrow ? arrowIcon : null}
              suffix={percentage ? "%" : null}
            />
          </div>
        </div>
      </div>

    );
  }
};

export default WinningCitiesSummary;
