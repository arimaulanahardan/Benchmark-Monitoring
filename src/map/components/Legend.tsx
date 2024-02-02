import React from "react";
import { IMap } from "../interfaces/Map";

interface LegendProps {
  data: IMap[];
}

const Legend: React.FC<LegendProps> = ({ data }) => {
  return (
    <div
      className={`dark:bg-[#323647] dark:text-white bg-white/30 text-black backdrop-blur-xl
       2xl:w-[70%] w-[90%] rounded-lg shadow-card py-2 px-1 flex text-xs justify-center gap-2`}
      style={{ zIndex: 999 }}
    >
      <div className="flex gap-3 items-center">
        <div className="bg-green-700 border-2 border-green-800 w-3 h-3 rounded-full flex-shrink-0"></div>
        <p>
          All Service Win ({data.filter((d) => d.final_score === 3).length})
        </p>
      </div>
      <div className="flex gap-3 items-center">
        <div className="bg-yellow-300 border-2 border-yellow-400 w-3 h-3 rounded-full flex-shrink-0"></div>
        <p>2 Service Win ({data.filter((d) => d.final_score === 2).length})</p>
      </div>
      <div className="flex gap-3 items-center">
        <div className="bg-orange-400 border-2 border-orange-500 w-3 h-3 rounded-full flex-shrink-0"></div>
        <p>1 Service Win ({data.filter((d) => d.final_score === 1).length})</p>
      </div>
      <div className="flex gap-3 items-center">
        <div className="bg-red-700 border-2 border-red-800 w-3 h-3 rounded-full flex-shrink-0"></div>
        <p>
          All Service Lose ({data.filter((d) => d.final_score === 0).length})
        </p>
      </div>
    </div>
  );
};

export default Legend;
