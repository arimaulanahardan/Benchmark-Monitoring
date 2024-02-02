import React from "react";
import { IWinningCitiesTable } from "../interfaces/WinningCitiesTable";
import { Table } from "antd";
import { useSelector } from "react-redux";
import { State } from "../../store";
import { css } from "@emotion/css";
import { Skeleton } from "antd";
import { IWinningCitiesTableSummary } from "../interfaces/WinningCitiesTableSummary";

interface WinningCitiesTableProps {
  data: IWinningCitiesTable[];
  loading?: boolean;
  status_win: IWinningCitiesTableSummary["status_win"];
}

const WinningCitiesTable: React.FC<WinningCitiesTableProps> = ({
  data,
  loading,
  status_win,
}) => {
  const isDarkMode = useSelector<State, boolean>(
    (state) => state.theme.isDarkMode
  );

  if (loading) {
    return (
      <div className="p-2 pt-16 pb-16 bg-white dark:bg-[#343541] rounded-lg mb-2">
        <Skeleton active />
      </div>
    );
  }

  const className = css`
    & {
      overflow-x: auto;
    }
    & thead > tr > th {
      color: ${isDarkMode ? "white" : "black"} !important;
      background: ${isDarkMode ? "#414C5E" : "#bdd5ea"} !important;
      font-size: 11px;
      min-width: 100px;
    }
    & tbody > tr > td {
      background: ${isDarkMode ? "#323647" : "white"};
      color: ${isDarkMode ? "white" : "black"};
      font-weight: 600;
      min-width: 100px;
    }
    & tbody > tr:hover > td {
      background: ${isDarkMode ? "#414C5E" : "#fafafa"} !important;
    }
  `;

  if (status_win === "win") {
    return (
      <div className="p-40 bg-white dark:bg-[#343541] rounded-lg mb-2 mt-2">
        <div className="flex justify-center items-center">
          <h1 className="text-2xl font-bold bg-green-100 text-green-600 p-4 rounded-lg">Status Win Cities</h1>
        </div>
      </div>
      );
    } else {
      return (
      <Table
        bordered
        size="small"
        rowClassName="text-xs"
        dataSource={data?.map((d, k) => ({ key: k, ...d }))}
        columns={[
          {
            title: "YEARWEEK",
            dataIndex: "yearweek",
            key: "yearweek",
          },
          {
            title: "SITE ID",
            dataIndex: "site_id",
            key: "site_id",
          },
          {
            title: "BAD SAMPLE",
            dataIndex: "bad_sample",
            key: "bad_sample",
          },
          {
            title: "SAMPLE QUALITY",
            dataIndex: "sample_quality",
            key: "sample_quality",
          },
          {
            title: "GOOD QUALITY",
            dataIndex: "good_quality",
            key: "good_quality",
          },
          {
            title: "FUNNELING ISSUE",
            dataIndex: "funneling_issue",
            key: "pfunneling_issue",
          },
          {
            title: "PAYLOAD",
            dataIndex: "payload",
            key: "payload",
          },
          {
            title: "DELTA PAYLOAD",
            dataIndex: "delta_payload",
            key: "delta_payload",
          },
          {
            title: "THROUGHPUT",
            dataIndex: "throughput",
            key: "throughput",
          },
          {
            title: "DELTA THROUGHPUT",
            dataIndex: "delta_throughput",
            key: "delta_throughput",
          },
        ]}
        pagination={false}
        scroll={{ x: true, y: 370 }}
        className={className}
      />
      
    );
  }
};

export default WinningCitiesTable;
