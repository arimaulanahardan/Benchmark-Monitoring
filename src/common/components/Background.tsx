import React from "react";
import bg1 from "../assets/bg1.svg";
import bg2 from "../assets/bg2.svg";
import bg3 from "../assets/bg3.svg";
import bg4 from "../assets/bg4.svg";

interface BackgroundProps {
  children?: React.ReactNode;
}

const Background: React.FC<BackgroundProps> = ({ children }) => {
  return (
    <div
      className="
      w-full 
      pb-4 
      min-h-screen 
      overflow-hidden 
      bg-gradient-to-bl
      from-transparent
      to-[#EDECF0]
      dark:from-[#171F2C] 
      dark:to-[#171F2C] 
      relative"
    >
      <div className="fixed top-0 w-[1728px]">
        <img src={bg1} alt="bg" />
      </div>
      <div className="fixed top-4">
        <img src={bg2} alt="bg" />
      </div>
      <div className="fixed top-0 right-0">
        <img src={bg3} alt="bg" />
      </div>
      <div className="fixed bottom-0 right-0 left-0">
        <img src={bg4} alt="bg" width={"100%"} />
      </div>
      <div className="relative px-4">{children}</div>
    </div>
  );
};

export default Background;
