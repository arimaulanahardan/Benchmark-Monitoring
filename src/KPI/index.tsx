import React from "react";
import KPIChart from "./components/KPIChart";
import { useFetchData } from "./hooks/useFetchData";
import { InsightTemplate } from "./components/InsightTemplate";
import KPITable from "./components/KPITable";
import { css } from "@emotion/css";
import { useSelectFilter } from "../filter/hooks/useSelectFilter";
import { getLastTwoYearweek } from "../common/utils/getLastTwoYearweek";
import { getKPIColorInsight } from "./utils/kpi-color";

interface KPIProps {
  kpi: string;
  useTable?: boolean;
}

const KPI: React.FC<KPIProps> = ({ kpi, useTable = false }) => {
  const { chart, insight, table } = useFetchData(kpi);

  const { yearweek } = useSelectFilter();
  if (!chart || !insight || !table) return null;
  const { category, series, summary } = chart;
  
  return (
    <div className="flex flex-col relative">
      <KPIChart
        id={`${kpi}-${useTable ? "second" : "first"}`}
        kpi={kpi}
        unit={summary.unit}
        title={
          <p className="text-sm">
            {`${summary.kpi} (${summary.unit}), Ach: `}
            <span
              className={`font-bold ${getKPIColorInsight(
                summary.kpi,
                summary.deviation
              )}`}
            >{`${summary.ach.toFixed(2)} (${
              summary.deviation > 0 ? "+" : ""
            }${summary.deviation.toFixed(2)})`}</span>
          </p>
        }
        data={{ category, series }}
      />
      {useTable && <KPITable data={table} kpi={summary.kpi} />}
      <div
        className={`
        backdrop-blur 
        shadow-glasses 
        bg-gradient-to-t 
        from-blue-50/90 
        to-blue-100/90 
        dark:from-slate-800/90 
        dark:to-slate-900/90 min-h-[150px] 
        dark:text-white 
        text-sm 
        rounded-b-lg 
        p-2 ${css`
          span {
            font-weight: 700;
            font-size: 14px;
            background-color: yellow;
            padding: 2px;
            border-radius: 3px;
            color: black;
          }
        `}`}
      >
        {InsightTemplate(`${kpi}_${useTable ? "second" : "first"}`, {
          ...insight,
          week: `W${getLastTwoYearweek(yearweek)}`,
        })}
      </div>
    </div>
  );
};
export default KPI;
