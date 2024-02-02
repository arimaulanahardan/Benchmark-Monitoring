import React, { useState } from "react";
import { Select, DatePicker, Button, Spin } from "antd";
import { selectOptionTransform } from "../../common/utils/selectOptionTransform";
import { FilterAction } from "../reducers/FilterReducer";
import { useDispatch } from "react-redux";
import { useSelectFilter } from "../hooks/useSelectFilter";
import { useFetchData } from "../hooks/useFetchData";
import dayjs from "dayjs";
import { DownloadOutlined } from "@ant-design/icons";
import { useFetchDownloadCsv } from "../../day_monitoring/hooks/useFetchDownloadCsv";
import _ from "lodash";

interface DayMonitoringFilterProps { }

const DayMonitoringFilter: React.FC<DayMonitoringFilterProps> = ({ }) => {
  const dispatch = useDispatch();
  const state = useSelectFilter();
  const { levelDayMonitorings, regionDayMonitorings, citiesDayMonitorings } = useFetchData();
  const { downloadCsv } = useFetchDownloadCsv();

  return (
    <>
      <DatePicker
      style={{ width: "150px" }}
        defaultValue={state.dateStringStart ? dayjs(state.dateStringStart) : undefined}
        onChange={(date) => {
          if (date) {
            dispatch(FilterAction.setDateStringStart(date));
          }
        }}
      />
      <DatePicker
      style={{ width: "150px" }}
        defaultValue={state.dateString ? dayjs(state.dateString) : undefined}
        onChange={(date) => {
          if (date) {
            dispatch(FilterAction.setDateString(date));
          }
        }}
      />
      <Select
        value={state.levelDayMonitoring}
        style={{ width: "130px" }}
        options={selectOptionTransform(levelDayMonitorings ?? [])}
        onChange={(v) => {
          dispatch(FilterAction.setLevelDayMonitoring(v));
        }}
      />

      {state.menu === "day-monitoring" && state.levelDayMonitoring === "region" && (
        <Select
          value={state.regionDayMonitoring[0]}
          style={{ width: "200px" }}
          options={selectOptionTransform(regionDayMonitorings ?? [])}
          onChange={(v) => {
            dispatch(FilterAction.setRegionDayMonitoring(v));
          }}
        />
      )}
      {state.menu === "day-monitoring" && state.levelDayMonitoring === "kabupaten" && (
        <Select
          value={state.citiesDayMonitoring[0]}
          style={{ width: "200px" }}
          options={citiesDayMonitorings}
          onChange={(v) => {
            dispatch(FilterAction.setCitiesDayMonitoring(v));
          }}
          showSearch
          onFocus={() => {
            if (state.searchCityDayMonitoring !== "") {
              dispatch(FilterAction.setSearchCityDayMonitoring(""));
            }
          }}
          onSearch={_.debounce((v) => {
            dispatch(FilterAction.setSearchCityDayMonitoring(v));
          }, 1000)}
          notFoundContent={!citiesDayMonitorings ? <Spin size="small" /> : null}
          filterOption={false}
        />
      )}
      {state.menu === "day-monitoring" && (
        <div>
          <Button
            aria-label="download-csv"
            icon={<DownloadOutlined />}
            style={{ width: "40px" }}
            onClick={downloadCsv}
          />
        </div>
      )}
    </>
  );
};

export default DayMonitoringFilter;
