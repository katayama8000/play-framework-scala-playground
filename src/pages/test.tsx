import React from "react";
import { UnFinishedModal } from "@components/modal/UnFinishedModal";
const test = () => {
  const date = new Date();
  const hour = date.getHours();
  console.log(hour);

  return (
    <div>
      <div>
        <UnFinishedModal open={true} />
      </div>
    </div>
  );
};

export default test;
