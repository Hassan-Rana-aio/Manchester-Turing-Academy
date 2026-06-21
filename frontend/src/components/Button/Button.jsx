const Button = ({ buttonClass, buttonText, funcToCall, params }) => {
  return (
    <button
      className={buttonClass ? buttonClass : "px-2 py-2 bg-black text-white"}
      onClick={() => {
        params ? funcToCall(params) : funcToCall();
      }}
    >
      {" "}
      {buttonText ? buttonText : "Click Me"}
    </button>
  );
};

export default Button;
