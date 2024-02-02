import { Button, Skeleton } from "antd";
import { DownloadOutlined } from "@ant-design/icons";
import { useSelectFilter } from "../filter/hooks/useSelectFilter";
import ContributorBadSampleChart from "./components/BadSampleChart";
import BadSampleTable from "./components/BadSampleTable";
// import BadSampleTable from "./components/BadSampleTable";
import { useFetchData } from "./hooks/useFetchData";

interface ContributorBadSampleProps {
  kpi: string;
}

const kpiList = ["good_quality", "game_score", "video_netflix"];

const ContributorBadSample: React.FC<ContributorBadSampleProps> = ({ kpi }) => {
  const { chart, loading, table } = useFetchData(kpi);
  if (!chart || !table) return null;

  if (loading) {
    return (
      <div className="p-2 pt-4 pb-24 bg-white dark:bg-[#343541] rounded-t-lg relative top-1">
        <Skeleton active />
        <div className="pt-12 pb-12">
          <Skeleton active />
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-3 gap-2">
        {kpiList.map((kpi) => (
          <>
            <ContributorBadSampleChart id={`${kpi}-1`} kpi={kpi} />
          </>
        ))}
        {kpiList.map((kpi) => (
          <>
            <BadSampleTable kpi={kpi} data={table} />
           
          </>
        ))}
      </div>
    </>
  );
};

export default ContributorBadSample;
