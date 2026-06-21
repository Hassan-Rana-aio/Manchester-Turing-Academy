const LogoSidebar = ({ logoImg, className, imgClassName }) => {
  return (
    <div className={className ? className : ""}>
      <img src={logoImg} alt="" className={imgClassName ? imgClassName : ""} />
    </div>
  );
};

export default LogoSidebar;
