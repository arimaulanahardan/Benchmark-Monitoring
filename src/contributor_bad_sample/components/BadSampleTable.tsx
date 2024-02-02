import React from "react";
import { useSelector } from "react-redux";
import { IBadSampleTable } from "../interfaces/BadSampleTable";
import { css } from "@emotion/css";
import { Button, Table } from "antd";
import { DownloadOutlined } from "@ant-design/icons";
import { State } from "../../store";
import { useSelectFilter } from "../../filter/hooks/useSelectFilter";

interface BadSampleTableProps {
  kpi: string;
  data: IBadSampleTable[];
}

const BadSampleTable: React.FC<BadSampleTableProps> = ({ kpi, data }) => {
  const isDarkMode = useSelector<State, boolean>(
    (state) => state.theme.isDarkMode
  );

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
    <div className="p-2 pb-4 bg-white dark:bg-[#343541] rounded-lg relative top-1">
      <h1 className="h-[38px] bg-gradient-to-tl from-blue-50 to-blue-100 dark:from-[#292f38] dark:to-[#414C5E] dark:text-white rounded-lg flex items-center px-2 font-bold text-sm">
        {kpi.replace(/_/g, " ").toUpperCase()}
      </h1>
      <Button
        aria-label="download-csv"
        className="p-0"
        icon={<DownloadOutlined />}
        style={{
          position: "absolute",
          top: 12,
          right: 15,
          width: "30px",
          height: "30px",
        }}
        // onClick={downloadCsv}
      />
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
            align: "center",
          },
          {
            title: "Site ID",
            dataIndex: "site_id",
            key: "site_id",
            align: "center",
          },
          {
            title: "Bad Sample",
            dataIndex: "bad_sample",
            key: "bad_sample",
            align: "center",
          },
          {
            title: "Sample Quality",
            dataIndex: "sample_quality",
            key: "sample_quality",
            align: "center",
          },
          {
            title: "Good Quality",
            dataIndex: "good_quality",
            key: "good_quality",
            align: "center",
          },
          {
            title: "Funneling Issue",
            dataIndex: "funneling_issue",
            key: "funneling_issue",
            align: "center",
          },
        ]}
        pagination={false}
        className={className}
        footer={undefined}
      />
    </div>
  );
};

export default BadSampleTable;
