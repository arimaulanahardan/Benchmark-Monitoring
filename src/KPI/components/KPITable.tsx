import React from "react";
import { useSelector } from "react-redux";
import { State } from "../../store";
import { css } from "@emotion/css";
import { IKpiTable } from "../interfaces/KpiTable";
import { Table } from "antd";
import { BsFillTriangleFill } from "react-icons/bs";
import { useSelectFilter } from "../../filter/hooks/useSelectFilter";
import { getLastTwoYearweek } from "../../common/utils/getLastTwoYearweek";
import { getKPIColorTable, getRotateColor } from "../utils/kpi-color";

interface KPITableProps {
  kpi: string;
  data: IKpiTable[];
}

const KPITable: React.FC<KPITableProps> = ({ kpi, data }) => {
  const isDarkMode = useSelector<State, boolean>(
    (state) => state.theme.isDarkMode
  );
  const { yearweek } = useSelectFilter();

  const className = css`
    & {
      overflow-x: auto;
    }
    & thead > tr > th {
      color: ${isDarkMode ? "white" : "black"} !important;
      background: ${isDarkMode ? "#414C5E" : "#bdd5ea"} !important;
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

  return (
    <Table
      bordered
      size="small"
      rowClassName="text-xs"
      dataSource={data?.map((d, k) => ({ key: k, ...d }))}
      columns={[
        {
          title: "REGION",
          dataIndex: "region",
          key: "region",
        },
        {
          title: `W${getLastTwoYearweek(yearweek)}`,
          dataIndex: "current_week",
          key: "current_week",
          align: "center",
          render(value) {
            return Number.parseFloat(value).toFixed(2);
          },
        },
        {
          title: `INCR`,
          dataIndex: "incr",
          key: "incr",
          align: "center",
          render(value, record) {
            return (
              <div
                className={`flex gap-2 items-center justify-center ${getKPIColorTable(
                  kpi,
                  record.incr
                )}`}
              >
                <div className={getRotateColor(kpi, record.incr)}>
                  <BsFillTriangleFill />
                </div>

                {Math.abs(value)}
              </div>
            );
          },
        },
        {
          title: "WIN CITY",
          children: [
            {
              title: `#`,
              dataIndex: "win_city",
              key: "win_city",
              align: "center",
              render(value) {
                return (
                  <div className={"dark:text-green-400 text-green-600"}>
                    {parseInt(value).toFixed(0)}
                  </div>
                );
              },
            },
            {
              title: `%`,
              dataIndex: "win_city_percent",
              key: "win_city_percent",
              align: "center",
              render(value) {
                return (
                  <div className={"dark:text-green-400 text-green-600"}>
                    {value}
                  </div>
                );
              },
            },
          ],
        },
        {
          title: `Win To Lose`,
          dataIndex: "win_to_lose",
          key: "win_to_lose",
          align: "center",
          render(value) {
            return (
              <div className={"dark:text-[#e45656] text-red-600"}>
                {value?.replace(/\.(\d+)/g, "") ?? ""}
              </div>
            );
          },
        },
        {
          title: `Lose To Win`,
          dataIndex: "lose_to_win",
          key: "lose_to_win",
          align: "center",
          render(value) {
            return (
              <div className={"dark:text-green-400 text-green-600"}>
                {value?.replace(/\.(\d+)/g, "") ?? ""}
              </div>
            );
          },
        },
      ]}
      className={className}
      pagination={false}
      footer={undefined}
    />
  );
};

export default KPITable;
