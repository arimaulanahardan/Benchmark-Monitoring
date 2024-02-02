import { useDispatch } from "react-redux";
import Theme from "./common/components/Theme";
import Background from "./common/components/Background";
import Header from "./header";
import Map from "./map";
import AchievementTable from "./achievement_table";
import KPI from "./KPI";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import CardMenu from "./common/components/CardMenu";
import { useEffect } from "react";
import { FilterAction } from "./filter/reducers/FilterReducer";
import { useSelectFilter } from "./filter/hooks/useSelectFilter";
import FailContributor from "./fail_contributor";
import DayMonitoring from "./day_monitoring";
import WeekMonitoring from "./week_monitoring";
import ContributorBadSample from "./contributor_bad_sample";
import WinningCities from "./winning_flip_flop_cities";
import OpportunityChart from "./opportunity_chart";
import MonthMonitoring from "./month_monitoring";
import Summary from "./Open-Signal/summary";

const firstKPIList = [
  "good_quality",
  "game_parameter",
  "video_score_netflix",
  "download_throughput",
];
const secondKPIList = [
  "good_quality",
  "game_parameter",
  "video_score_netflix",
  "download_throughput",
  "upload_throughput",
  "excellent_quality",
  "packetloss",
  "latency",
  "jitter",
];

function App() {
  const dispatch = useDispatch();
  const location = useLocation();
  const state = useSelectFilter();
  useEffect(() => {
    const paths = location.pathname.split("/");
    if (state.vendor !== paths[1]) dispatch(FilterAction.setVendor(paths[1]));
    if (state.menu !== paths[2]) dispatch(FilterAction.setMenu(paths[2]));
  }, [location, state]);
  return (
    <Theme>
      <Background>
        <Header />
        <Routes>
          <Route
            path="/tutela/summary"
            element={
              <CardMenu>
                <div
                  className="grid 
                      xl:grid-cols-[minmax(400px,1fr),minmax(350px,350px),auto]
                      lg:grid-cols-2
                      grid-cols-1
                      md:grid-cols-1
                      xl:grid-rows-1
                      lg:grid-rows-[auto,auto]
                      grid-rows-[auto,auto,547px]
                      gap-2"
                >
                  <div className="rounded-lg overflow-hidden md:h-full md:w-full xl:col-span-1 lg:col-span-2 h-[500px]">
                    <Map />
                  </div>
                  <AchievementTable />
                  <OpportunityChart />
                </div>
                <div className="grid xl:grid-cols-4 lg:grid-cols-2 grid-cols-1 gap-1">
                  {firstKPIList.map((k) => (
                    <KPI key={k} kpi={k} />
                  ))}
                </div>
              </CardMenu>
            }
          />
          <Route
            path="/tutela/kpi-details"
            element={
              <CardMenu>
                <div className="grid xl:grid-cols-3 lg:grid-cols-2 grid-cols-1 gap-1">
                  {secondKPIList.map((k) => (
                    <KPI key={k} kpi={k} useTable />
                  ))}
                </div>
              </CardMenu>
            }
          />
          <Route
            path="/tutela/fail-contributor"
            element={
              <CardMenu>
                <FailContributor />
              </CardMenu>
            }
          />
          <Route
            path="/tutela/day-monitoring"
            element={
              <CardMenu>
                <DayMonitoring />
              </CardMenu>
            }
          />
          <Route
            path="/tutela/week-monitoring"
            element={
              <CardMenu>
                <WeekMonitoring />
              </CardMenu>
            }
          />
          <Route
            path="/tutela/month-monitoring"
            element={
              <CardMenu>
                <MonthMonitoring />
              </CardMenu>
            }
          />
          <Route
            path="/tutela/flip-flop"
            element={
              <CardMenu>
                <WinningCities />
              </CardMenu>
            }
          />
          <Route
            path="/open-signal/summary-open"
            element={
              <CardMenu>
                 {/* <div
                  className="grid 
                      xl:grid-cols-[minmax(400px,1fr),minmax(350px,350px),auto]
                      lg:grid-cols-2
                      grid-cols-1
                      md:grid-cols-1
                      xl:grid-rows-1
                      lg:grid-rows-[auto,auto]
                      grid-rows-[auto,auto,547px]
                      gap-2"
                > */}
                  {/* <div className="rounded-lg overflow-hidden md:h-full md:w-full xl:col-span-1 lg:col-span-2 h-[500px]">
                    <Map />
                  </div> */}
                  {/* <AchievementTable /> */}
                  <Summary />
                {/* </div> */}
                {/* <div className="grid xl:grid-cols-4 lg:grid-cols-2 grid-cols-1 gap-1">
                  {firstKPIList.map((k) => (
                    <KPI key={k} kpi={k} />
                  ))}
                </div> */}
              </CardMenu>
            }
          />
          <Route
            path="/open-signal/kpi-details-open"
            element={
              <CardMenu>
                {/* <WinningCities /> */}
              </CardMenu>
            }
          />
          <Route path="/" element={
          <Navigate 
          to={"/tutela/summary"}
          replace={true}
           />
           } />
        </Routes>
      </Background>
    </Theme>
  );
}

export default App;
