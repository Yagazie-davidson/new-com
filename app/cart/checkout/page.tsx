import React from "react";
import Billing from "./Billing";
import Summary from "./Summary";

const page = () => {
  return (
    <div>
      <div className="h-24"></div>
      <hr />
      <div className="grid max-[750px]:grid-cols-1 grid-cols-2">
        <div className="order-1 max-[750px]:order-2">
          <Billing />
        </div>
        <div className="order-2 max-[750px]:order-1">
          <Summary />
        </div>
      </div>
    </div>
  );
};

export default page;
