import React from "react";

interface CardMenuProps {
  children?: React.ReactNode;
}

const CardMenu: React.FC<CardMenuProps> = ({ children }) => {
  return <div className="card-menu">{children}</div>;
};

export default CardMenu;
