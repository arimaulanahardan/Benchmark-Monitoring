import { IWinningCitiesTableSummary } from "../interfaces/WinningCitiesTableSummary";
import { Table } from "antd";
import { useSelector } from "react-redux";
import { State } from "../../store";
import { css } from "@emotion/css";
import React from "react";
import { Skeleton } from "antd";

interface WinningCitiesTableSummaryProps {
  data: IWinningCitiesTableSummary[];
  loading?: boolean;
  kpi: string;
}

const WinningCitiesTableSummary: React.FC<WinningCitiesTableSummaryProps> = ({
  data,
  loading,
  kpi,
}) => {
  const isDarkMode = useSelector<State, boolean>(
    (state) => state.theme.isDarkMode
  );

  const getTitleSample = (kpi: string) : string => {
    if (kpi === "good_quality"){
    return "SAMPLE QUALITY MATCH";
  } else if (kpi === "game_score"){
    return "SAMPLE GAME MATCH";
  } else if (kpi === "video_score_netflix"){
    return "SAMPLE VIDEO MATCH";
  }
  return "SAMPLE MATCH"
}

  if (loading) {
    return (
      <div className="p-2 bg-white dark:bg-[#343541] rounded-lg mb-2">
        <Skeleton active />
      </div>
    );
  }

  const getStatusCellStyle = (statusWin: string) =>
    ({
      win: "bg-green-100 text-green-600",
      lose: "bg-red-100 text-red-600",
    }[statusWin] || "");

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
          title: "CITY",
          dataIndex: "city",
          key: "city",
        },
        {
          title: "STATUS WIN",
          dataIndex: "status_win",
          key: "status_win",
          render: (statusWin: string) => (
            <span className={`rounded p-1 ${getStatusCellStyle(statusWin)}`}>
              {statusWin}
            </span>
          ),
        },
        {
          title: "OPERATOR WIN",
          dataIndex: "operator_win",
          key: "operator_win",
        },
        {
          title: "SMA TSEL",
          dataIndex: "sma_tsel",
          key: "sma_tsel",
        },
        {
          title: "UPPER LEVEL COMP",
          dataIndex: "upper_level_comp",
          key: "upper_level_comp",
        },
        {
          title: getTitleSample(kpi),
          dataIndex: "sample_quality_match",
          key: "sample_quality_match",
        },
        {
          title: "GAP SMA TO UPPER LEVEL COMP",
          dataIndex: "gap_sma_upper_level_comp",
          key: "gap_sma_upper_level_comp",
        },
        {
          title: "TARGET SAMPLE BAD",
          dataIndex: "target_sample_bad",
          key: "target_sample_bad",
        },
        {
          title: "TOTAL TARGET CLEAR BAD SAMPLE",
          dataIndex: "total_target_clear_bad_sample",
          key: "total_target_clear_bad_sample",
        },
      ]}
      pagination={false}
      className={className}
      footer={undefined}
    />
  );
};

export default WinningCitiesTableSummary;
