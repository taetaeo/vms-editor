import React from "react";
import { Outlet } from "react-router-dom";
import { Footer, Header } from "@/ui/blocks";

const LayoutContainer = () => {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
};

export default LayoutContainer;
