import React from "react";
import { UnFinishedModal } from "@components/modal/UnFinishedModal";
import { useComplete } from "@hooks/useComplete";
const test = () => {
  useComplete();
  const date = new Date();
  const hour = date.getHours();
  console.log(hour);

  return (
    <div>
      <div>s</div>
    </div>
  );
};

export default test;
