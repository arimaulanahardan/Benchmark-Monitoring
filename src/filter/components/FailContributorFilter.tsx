import React from "react";
import { Button, Select, Spin } from "antd";
import { DownloadOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { selectOptionTransform } from "../../common/utils/selectOptionTransform";
import { useSelectFilter } from "../hooks/useSelectFilter";
import { FilterAction } from "../reducers/FilterReducer";
import { useFetchData } from "../hooks/useFetchData";
import _ from "lodash";
import { useDownloadCsv } from "../../fail_contributor/hooks/useFetchDownloadCsv";
import getFilterEndWeek from "../utils/getFilterEndWeek";
import getFilterStartWeek from "../utils/getFilterStartWeek";

interface FailContributorFilterProps { }

const FailContributor: React.FC<FailContributorFilterProps> = ({ }) => {
  const state = useSelectFilter();
  const dispatch = useDispatch();
  const { downloadCsv } = useDownloadCsv();
  const { levels, regions, cities, kecamatans } = useFetchData();
  const filterEndWeek = getFilterEndWeek();
  const filterStartWeek = getFilterStartWeek();

  return (
    <>
      <Select
        value={state.startweek?.toString()}
        style={{ minWidth: "130px" }}
        options={filterStartWeek}
        onChange={(v) => dispatch(FilterAction.setStartweek(parseInt(v)))}
      />
      <Select
        value={state.endweek?.toString()}
        style={{ minWidth: "130px" }}
        options={filterEndWeek}
        onChange={(v) => dispatch(FilterAction.setEndweek(parseInt(v)))}
      />
      <Select
        value={state.level}
        style={{ width: "130px" }}
        options={selectOptionTransform(levels ?? [])}
        onChange={(v) => {
          dispatch(FilterAction.setLevel(v));
        }}
      />
      {state.level === "Region" && (
        <Select
          value={state.region[0]}
          style={{ width: "200px" }}
          options={selectOptionTransform(regions ?? [])}
          onChange={(v) => {
            dispatch(FilterAction.setRegion(v));
          }}
        />
      )}

      {state.level === "Kabupaten" && (
        <Select
          value={state.city[0]}
          style={{ width: "200px" }}
          options={selectOptionTransform(cities ?? [])}
          onChange={(v) => {
            dispatch(FilterAction.setCity(v));
          }}
          showSearch
          onFocus={() => {
            if (state.searchCity !== "") {
              dispatch(FilterAction.setSearchCity(""));
            }
          }}
          onSearch={_.debounce((v) => {
            dispatch(FilterAction.setSearchCity(v));
          }, 1000)}
          notFoundContent={!cities ? <Spin size="small" /> : null}
          filterOption={false}
        />
      )}

      {state.level === "Kecamatan" && (
        <Select
          value={state.kecamatan[0]}
          style={{ width: "200px" }}
          options={selectOptionTransform(kecamatans ?? [])}
          onChange={(v) => {
            dispatch(FilterAction.setKecamatan(v));
          }}
          showSearch
          onFocus={() => {
            if (state.searchKecamatan !== "") {
              dispatch(FilterAction.setSearchKecamatan(""));
            }
          }}
          onSearch={_.debounce((v) => {
            dispatch(FilterAction.setSearchKecamatan(v));
          }, 1000)}
          notFoundContent={!cities ? <Spin size="small" /> : null}
          filterOption={false}
        />
      )}

      <Button
        aria-label="download-csv"
        icon={<DownloadOutlined />}
        style={{ width: "40px" }}
        onClick={downloadCsv}
      />
    </>
  );
};

export default FailContributor;
