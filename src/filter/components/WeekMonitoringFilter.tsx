import React from "react";
import { Button, Select, Spin } from "antd";
import { useDispatch } from "react-redux";
import { useFetchData } from "../hooks/useFetchData";
import { useSelectFilter } from "../hooks/useSelectFilter";
import { selectOptionTransform } from "../../common/utils/selectOptionTransform";
import getFilterStartWeekMonitoring from "../utils/getFilterStartWeekMonitoring";
import getFilterEndWeekMonitoring from "../utils/getFilterEndWeekMonitoring";
import { FilterAction } from "../reducers/FilterReducer";
import { DownloadOutlined } from "@ant-design/icons";
import _ from "lodash";
import { useFetchDownloadCsv } from "../../week_monitoring/hooks/useFetchDownloadCsv";

interface WeekMonitoringProps { }

const WeekMonitoringFilter: React.FC<WeekMonitoringProps> = () => {
    const dispatch = useDispatch();
    const state = useSelectFilter();
    const { levelWeekMonitorings, regionWeekMonitorings, citiesWeekMonitorings } = useFetchData();
    const { downloadCsv } = useFetchDownloadCsv();
    const filterStartWeekMonitoring = getFilterStartWeekMonitoring();
    const filterEndWeekMonitoring = getFilterEndWeekMonitoring();

    return (
        <>
            <Select
                value={state.startWeekMonitoring?.toString()}
                style={{ minWidth: "130px" }}
                options={filterStartWeekMonitoring}
                onChange={(v) => dispatch(FilterAction.setStartWeekMonitoring(parseInt(v)))}
            />
            <Select
                value={state.endWeekMonitoring?.toString()}
                style={{ minWidth: "130px" }}
                options={filterEndWeekMonitoring}
                onChange={(v) => dispatch(FilterAction.setEndWeekMonitoring(parseInt(v)))}
            />
            <Select
                value={state.levelWeekMonitoring}
                style={{ minWidth: "130px" }}
                options={selectOptionTransform(levelWeekMonitorings ?? [])}
                onChange={(v) => {
                    dispatch(FilterAction.setLevelWeekMonitoring(v));
                }}
            />
            {state.levelWeekMonitoring === "region" && (
                <Select
                    value={state.regionWeekMonitoring[0]}
                    style={{ minWidth: "200px" }}
                    options={selectOptionTransform(regionWeekMonitorings ?? [])}
                    onChange={(v) => {
                        dispatch(FilterAction.setRegionWeekMonitoring(v));
                    }}
                />
            )}
            {state.levelWeekMonitoring === "kabupaten" && (
                <Select
                    value={state.citiesWeekMonitoring[0]}
                    style={{ minWidth: "200px" }}
                    options={citiesWeekMonitorings}
                    onChange={(v) => {
                        dispatch(FilterAction.setCitiesWeekMonitoring(v));
                    }}
                    showSearch
                    onFocus={() => {
                        if (state.searchCityWeekMonitoring !== "") {
                            dispatch(FilterAction.setCitiesWeekMonitoring(""))
                        }
                    }}
                    onSearch={_.debounce((v) => {
                        dispatch(FilterAction.setSearchCityWeekMonitoring(v));
                    }, 1000)}
                    notFoundContent={!citiesWeekMonitorings ?
                        <Spin size="small" /> : null}
                    filterOption={false}
                />
            )}
            {state.menu === "week-monitoring" && (
                <Button
                    aria-label="download-csv"
                    icon={<DownloadOutlined />}
                    style={{ width: "40px" }}
                    onClick={downloadCsv}
                />
            )}
        </>
    );
}

export default WeekMonitoringFilter;