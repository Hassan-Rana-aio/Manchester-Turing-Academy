import React from "react";

const Footer = () => {
  return (
    <div className="grid gap-12 bg-[#00171f] px-16 pt-24 text-white">
      <div className="grid gap-4 md:gap-6 lg:gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
        <div className="">
          <h1 className="font-roboto-light font-semibold tracking-widest text-[20px] uppercase">
            MANCHESTER TURING ACADEMY
          </h1>
          <p className="py-8 text-[15px] text-textGray leading-6 tracking-wide">
            Manchester Turing Academy, based in Manchester one of the fastest
            growing Business and Tech Capitals in the UK, is a full service
            training and education business.
          </p>
        </div>
        <div className="">
          <h1 className="font-roboto-light font-semibold tracking-widest text-[20px] uppercase">
            Contact US
          </h1>
          <p className="tracking-widest py-8 text-[15px]">
            admin@manchesterturingacademy.co.uk
          </p>
        </div>
      </div>
      <div className="text-[15px] text-center py-4">
        <p>
          &copy; Copyright 2024{" "}
          <span className="font-semibold text-textBlue">
            Manchester Turing Academy.
          </span>{" "}
          All Rights Reserved
        </p>
      </div>
    </div>
  );
};

export default Footer;
