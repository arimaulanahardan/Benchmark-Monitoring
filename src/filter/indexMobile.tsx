import { Button, Select } from "antd";
import React from "react";
import { useSelectFilter } from "./hooks/useSelectFilter";
import { FilterAction } from "./reducers/FilterReducer";
import { useDispatch } from "react-redux";
import { selectOptionTransform } from "../common/utils/selectOptionTransform";
import { useFetchData } from "./hooks/useFetchData";
import { useNavigate } from "react-router-dom";
import _ from "lodash";
import DayMonitoringFilter from "./components/DayMonitoringFilter";
import FailContributorFilter from "./components/FailContributorFilter";
import WinningFlipFlopFilter from "./components/WinningFlipFlopFilter";
import { DownloadOutlined } from "@ant-design/icons";
import BadSampleFilter from "./components/BadSampleFilter";
import { useFetchDownloadFlipFlopTable } from "../winning_flip_flop_cities/hooks/useFecthDownloadTable";
import WeekMonitoringFilter from "./components/WeekMonitoringFilter";
import { useFetchDownloadCsv } from "../month_monitoring/hooks/useFetchDownloadCsv";


interface FilterProps { }

const FilterMobile: React.FC<FilterProps> = ({ }) => {
  const navigate = useNavigate();
  const state = useSelectFilter();
  const { downloadFlipFlopTable } = useFetchDownloadFlipFlopTable();
  const { downloadCsv } = useFetchDownloadCsv();
  const { yearweeks, yearweekOpenSignals } = useFetchData();
  const dispatch = useDispatch();

  return (
    <div className="flex flex-col gap-4">
      <Select
        value={state.vendor}
        style={{ minWidth: "130px" }}
        options={selectOptionTransform(
          [
            { name: "Tutela", value: "tutela" },
            { name: "OpenSignal", value: "open-signal" },
          ],
          "value"
        )}
        onChange={(v) => {
          dispatch(FilterAction.setVendor(v));
          // navigate(`/${v}/${state.menu}`);
          let menu = "";
          if (v === "tutela") {
            menu = "summary";
          } else if (v === "open-signal") {
            menu = "summary-open";
          }
          navigate(`/${v}/${menu}`);
        }}
      />
      {state.vendor === "tutela" && (
        <div className="flex flex-col gap-4">
          <Select
            value={state.menu}
            style={{ minWidth: "150px" }}
            options={selectOptionTransform(
              [
                { name: "Summary", value: "summary" },
                { name: "KPI Details", value: "kpi-details" },
                { name: "Fail Contributor", value: "fail-contributor" },
                { name: "Day Monitoring", value: "day-monitoring" },
                { name: "Week Monitoring", value: "week-monitoring" },
                { name: "Month Monitoring", value: "month-monitoring" },
                { name: "Flip Flop", value: "flip-flop" },
                // { name: "Contributor Bad Sample", value: "contributor-bad-sample"},
              ],
              "value"
            )}
            onChange={(v) => {
              dispatch(FilterAction.setMenu(v));
              navigate(`/${state.vendor}/${v}`);
            }}
          />

          {state.menu === "flip-flop" && <WinningFlipFlopFilter />}

          {/* {state.menu === "contributor-bad-sample" && <BadSampleFilter />} */}

          {state.menu !== "day-monitoring" && state.menu !== "fail-contributor" && state.menu !== "week-monitoring" && state.menu !== "month-monitoring" && (
            <Select
              value={state.yearweek.toString()}
              style={{ minWidth: "130px" }}
              options={selectOptionTransform(
                (yearweeks ?? []).map((w) => w.toString())
              )}
              onChange={(v) => dispatch(FilterAction.setYearweek(parseInt(v)))}
            />
          )}

          {state.menu === "flip-flop" && (
            <Button
              aria-label="Download-Csv"
              icon={<DownloadOutlined />}
              style={{ width: "40px" }}
              onClick={downloadFlipFlopTable}
            />
          )}

          {state.menu === "fail-contributor" && <FailContributorFilter />}

          {state.menu === "day-monitoring" && <DayMonitoringFilter />}

          {state.menu === "week-monitoring" && (
            <WeekMonitoringFilter />)}

          {state.menu === "month-monitoring" && (
            <>
              <WeekMonitoringFilter />
              <Button
                aria-label="download-csv"
                icon={<DownloadOutlined />}
                style={{ width: "40px" }}
                onClick={downloadCsv}
              />
            </>
          )}
        </div>
      )}
      {state.vendor === "open-signal" && (
        <div className="flex gap-2">
          <Select
            value={state.menu}
            style={{ minWidth: "150px" }}
            options={selectOptionTransform(
              [
                { name: "Summary", value: "summary-open" },
                { name: "KPI Details", value: "kpi-details-open" },
              ],
              "value"
            )}
            onChange={(v) => {
              dispatch(FilterAction.setMenu(v));
              navigate(`/${state.vendor}/${v}`);
            }}
          />
          <Select
            value={state.yearweekOpenSignal.toString()}
            style={{ minWidth: "130px" }}
            options={selectOptionTransform(
              (yearweekOpenSignals ?? []).map((w) => w.toString())
            )}
            onChange={(v) => dispatch(FilterAction.setYearweekOpenSignal(parseInt(v)))}
          />
        </div>
      )}
    </div>
  );
};

export default FilterMobile;
