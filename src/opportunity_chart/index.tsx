import React from "react";
import { useFetchData } from "./hooks/useFetchData";
import OpportunityChart1 from "./components/OpprtunityChart";
import { Skeleton } from "antd";

interface OpportunityChartProps {}

const OpportunityChart: React.FC<OpportunityChartProps> = () => {
  const { opportunity, loading } = useFetchData();

  if (loading)
  return (
    <div className="p-4 bg-white dark:bg-[#040C17] rounded-lg h-[620px] min-w-[427px]">
      <Skeleton 
      active
      paragraph={{ rows: 10 }}
       />
    </div>
  )

  return (
    <div>
     { opportunity && <OpportunityChart1 data={opportunity} />}
    </div>
  );
};

export default OpportunityChart;
