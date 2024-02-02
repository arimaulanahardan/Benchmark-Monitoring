import React, { useState } from "react";
import FailContributorChart from "./components/FailContributorChart";
import { Radio, Select } from "antd";
import { selectOptionTransform } from "../common/utils/selectOptionTransform";
import { useSelectFilter } from "../filter/hooks/useSelectFilter";
import { FilterAction } from "../filter/reducers/FilterReducer";
import { useDispatch } from "react-redux";
import FailContributorChartSample from "./components/FailContributorChartSample";

interface FailContributorProps { }

const kpiList = ["good_quality", "game_score", "video_netflix"];
const typeData = ["sample", "data"];

const FailContributor: React.FC<FailContributorProps> = ({ }) => {
  const [categoryData, setCategoryData] = useState<"Number" | "Percentage">("Number");
  const { operators, operator, period, periods } = useSelectFilter();
  const dispatch = useDispatch();

  return (
    <div className="flex flex-col relative">
      <div className="flex justify-end items-center lg:justify-end gap-2">
        <div className="text-center">
          <Radio.Group
            onChange={(e) =>
              setCategoryData(e.target.value)
            }
            value={categoryData}
            buttonStyle="solid"
          >
            <Radio.Button value="Number">Number</Radio.Button>
            <Radio.Button value="Percentage">Percentage</Radio.Button>
          </Radio.Group>
        </div>
        <Select
          style={{ width: 100 }}
          value={period}
          options={selectOptionTransform(periods ?? [])}
          onChange={(v) => {
            dispatch(FilterAction.setPeriod(v));
          }}
        />
        <Select
          style={{ width: 200 }}
          value={operator[0]}
          options={selectOptionTransform(operators ?? [])}
          onChange={(v) => {
            dispatch(FilterAction.setOperator(v));
          }}
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-2">
        {kpiList.map((k) => (
          <FailContributorChartSample
            key={`${k}-1`}
            id={`${k}-1`}
            kpi={k}
            operator={operator}
            typeData={typeData[0]}
            period={period}
          />
        ))}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-2">
        {kpiList.map((k) => (
          <FailContributorChart
            key={`${k}-2`}
            id={`${k}-2`}
            kpi={k}
            operator={operator}
            typeData={typeData[1]}
            period={period}
            categoryData={categoryData}
          />
        ))}
      </div>
    </div>
  );
};

export default FailContributor;
