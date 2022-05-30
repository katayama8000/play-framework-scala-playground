import React from "react";

type Props = {
  link: string | undefined;
};
export const YouTube: React.FC<Props> = ({ link }) => {
  return (
    <div>
      <iframe
        width="336"
        height="189"
        src={link}
        frameBorder="0"
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="p-2"
      />
    </div>
  );
};
