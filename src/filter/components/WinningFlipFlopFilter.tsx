import React from "react";
import { useSelectFilter } from "../hooks/useSelectFilter";
import { FilterAction } from "../reducers/FilterReducer";
import { useDispatch } from "react-redux";
import { selectOptionTransform } from "../../common/utils/selectOptionTransform";
import { useFetchData } from "../hooks/useFetchData";
import _ from "lodash";
import { Select } from "antd";

interface WinningFlipFlopFilterProps { }

const WinningFlipFlopFilter: React.FC<WinningFlipFlopFilterProps> = ({ }) => {
  const state = useSelectFilter();
  const dispatch = useDispatch();
  const { citiesFlipFlop, kpis } = useFetchData();

  return (
    <>
      <Select
        value={state.kpi?.replace(/_/g, " ").replace(/\b\w/g, l => l.toUpperCase()).toString()}
        style={{ minWidth: "130px" }}
        options={selectOptionTransform(kpis ?? []).map(option => ({
          value: option.value,
          label: option.label.replace(/_/g, " ").replace(/\b\w/g, l => l.toUpperCase())
        }))}
        onChange={(v) => dispatch(FilterAction.setKpi(v))}
      />
      <Select
        value={state.cityflipflop}
        style={{ minWidth: "130px" }}
        onChange={(v) => dispatch(FilterAction.setCityFlipFlop(v))}
        options={citiesFlipFlop}
        showSearch
      />
    </>
  );
};

export default WinningFlipFlopFilter;
