import Image from "next/image";
import React from "react";

const Banner = () => {
  return (
    <>
      <Image
        src={"/banner2.jpg"}
        priority
        width="0"
        height="0"
        sizes="100vw"
        alt="avatar"
        style={{
          width: "100%",
          height: "100%",
        }}
      />
    </>
  );
};

export default Banner;
