import React from "react";
import { useFetchData } from "./hooks/useFetchData";
import OpportunityChart from "./components/OpportunityChart";
import AchievementTable from "./components/AchievementTable";
import { useSelectFilter } from "../../filter/hooks/useSelectFilter";
import Map from "./components/Map";
import KPIChart from "./components/KPIChart";

const KPIListSummary = [
    "download",
    "upload",
    "game_experience",
    "video_experience",
    "voice_experience",
    "4g_coverage",
    "core_quality",
    "excellent_quality"
]

interface SummaryProps {
}

const Summary: React.FC<SummaryProps> = ({

}) => {
    const { achievement, opportunity, loading, map, okr } = useFetchData();
    const { yearweekOpenSignal, pastYearweekOpenSignal } = useSelectFilter();

    if (!achievement || !opportunity || !map || !okr)
        return null;

    return (
        <div>
            <div className="
        grid 
        xl:grid-cols-[minmax(400px,1fr),minmax(350px,350px),auto]
        lg:grid-cols-2
        grid-cols-1
        md:grid-cols-1
        xl:grid-rows-1
        lg:grid-rows-[auto,auto]
        grid-rows-[auto,auto,547px]
        gap-2">
                <div className="
            rounded-lg overflow-hidden md:h-full md:w-full xl:col-span-1 lg:col-span-2 h-[500px]">
                    <Map
                        dataMap={map}
                        dataTrend={okr}
                    />
                </div>
                <AchievementTable
                    data={achievement}
                    loading={loading}
                    yearweek={yearweekOpenSignal}
                    pastYearweek={pastYearweekOpenSignal}
                />
               <OpportunityChart
                    data={opportunity}
                    loading={loading}
                />
            </div>
            <div className="grid xl:grid-cols-4 lg:grid-cols-2 grid-cols-1 gap-1">
                {KPIListSummary.map((k) => (
                    <KPIChart
                        id={`${k}-1`}
                        key={`${k}-1`}
                        kpi={k}
                    />
                ))}
            </div>
        </div>
    );
};

export default Summary;
