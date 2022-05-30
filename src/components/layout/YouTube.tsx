import React from "react";

type Props = {
  link: string | undefined;
};
export const YouTube: React.FC<Props> = ({ link }) => {
  return (
    <div>
      <iframe
        width="560"
        height="315"
        src={link}
        frameBorder="0"
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
};
