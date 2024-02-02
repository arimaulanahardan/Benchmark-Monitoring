import { css } from "@emotion/css";
import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import { State } from "../store";
import { Table } from "antd";
import { useFetchData } from "./hooks/useFetchData";
import { getTextColorByTarget } from "../common/utils/getTextColorByTarget";
import { useSelectFilter } from "../filter/hooks/useSelectFilter";
import { getLastTwoYearweek } from "../common/utils/getLastTwoYearweek";
import { getQuarterFromYearWeek } from "./utils/quarter-yearweek";

interface AchievementTableProps {} 

const AchievementTable: React.FC<AchievementTableProps> = () => {
  const isDarkMode = useSelector<State, boolean>(
    (state) => state.theme.isDarkMode
  );
  const { yearweek, pastYearweek } = useSelectFilter();
  const className = css`
    & thead > tr > th {
      color: ${isDarkMode ? "white" : "black"} !important;
      background: ${isDarkMode ? "#414C5E" : "#dbeafe"} !important;
      font-size: 11px;
    }
    & tbody > tr > td {
      background: ${isDarkMode ? "#323647" : "white"};
      color: ${isDarkMode ? "white" : "black"};
      font-weight: 600;
    }
    & tbody > tr:hover > td {
      background: ${isDarkMode ? "#414C5E" : "#fafafa"} !important;
    }
  `;
  const { achievement, loading } = useFetchData();
  const quarter = useMemo(() => getQuarterFromYearWeek(yearweek), [yearweek]);

  return (
    <Table
      bordered
      size="small"
      rowClassName="text-xs"
      dataSource={achievement?.map((d, k) => ({ key: k, ...d }))}
      loading={loading}
      columns={[
        {
          title: "REGION",
          dataIndex: "region",
          key: "region",
        },
        {
          title: `WIN CITY W${getLastTwoYearweek(pastYearweek)}`,
          children: [
            {
              title: "#",
              dataIndex: "win_city_prev",
              key: "win_city_prev",
              align: "right",
              render(value, record) {
                return (
                  <div
                    className={getTextColorByTarget(
                      value,
                      record.Q1_target_city,
                      isDarkMode
                    )}
                  >
                    {value}
                  </div>
                );
              },
            },
            {
              title: "%",
              dataIndex: "win_city_prev_percent",
              key: "win_city_prev_percent",
              align: "right",
              render(value) {
                return Math.round(value);
              },
            },
          ],
        },
        {
          title: `WIN CITY W${getLastTwoYearweek(yearweek)}`,
          children: [
            {
              title: "#",
              dataIndex: "win_city",
              key: "win_city",
              align: "right",
              render(value, record) {
                return (
                  <div
                    className={getTextColorByTarget(
                      value,
                      record.Q1_target_city,
                      isDarkMode
                    )}
                  >
                    {value}
                  </div>
                );
              },
            },
            {
              title: "%",
              dataIndex: "win_city_percent",
              key: "win_city_percent",
              align: "right",
              render(value) {
                return Math.round(value);
              },
            },
          ],
        },
        {
          title: `Q${quarter}-Target City`,
          align: "right",
          dataIndex: "Q1_target_city",
          key: "Q1_target_city",
        },
        {
          title: "Ach",
          align: "right",
          dataIndex: "achievement",
          key: "achievement",
          render(value) {
            return Math.round(value);
          },
        },
      ]}
      className={className}
      pagination={false}
      footer={undefined}
    />
  );
};

export default AchievementTable;
