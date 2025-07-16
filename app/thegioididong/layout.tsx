import Header from "@/components/thegioididong/layout/Header";
import React from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <Header />
      <main>{children}</main>
    </div>
  );
};

export default layout;
