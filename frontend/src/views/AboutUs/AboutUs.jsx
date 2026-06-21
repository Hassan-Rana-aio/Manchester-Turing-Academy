import { Link } from "react-router-dom";

const AboutUs = () => {
  return (
    <div className="bg-headerColor grid justify-items-center text-white lg:px-16 md:px-16 sm--padding pt-4 pb-16">
      <h1 className="tracking-widest text-[2.125rem] text-center">
        WELCOME TO MANCHESTER TURING ACADEMY
      </h1>
      <p className="font-roboto-light text-[17.5px] md:w-[50%] lg:w-[65%] md:w-[75%] w-[75%] my-4 text-center text-whiteV3">
        A private training provider based in Manchester, England, offering
        courses in AI, Robotics, and software development. Contact us today with
        details of your skills, learning and training requirements We offer
        comprehensive education and training in AI and Robotics. The Academy
        also provides courses on AI and Robotics for individuals without a
        software background.
      </p>
      <div className="flex justify-center py-4">
        <Link
          to={"/signup"}
          id="signup"
          className="text-[12.5px] font-nunito-sans tracking-wider bg-buttonBlue py-[12px] px-4 text-sm uppercase text-white hover:bg-buttonBlueDark"
        >
          Join Us
        </Link>
      </div>
    </div>
  );
};

export default AboutUs;
