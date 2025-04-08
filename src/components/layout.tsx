import React from "react";
import { NavMenu } from "./nav-menu";

type LayoutProps = {
  children: React.ReactElement | React.ReactElement[];
};
export const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]"></div>
      <NavMenu />
      <div className="mt-5">{children}</div>
    </>
  );
};
