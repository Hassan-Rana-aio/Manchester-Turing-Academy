import PanelSidebar from "../PanelSidebar/PanelSidebar";
const Panel = (props) => {
  return (
    <div className="lg:h-full md:h-full lg:grid md:grid grid-cols-5">
      <PanelSidebar
        dynamicRoutes={props.dynamicRoutes}
        setPanelComponent={props.setPanelComponent}
        currentLinkPath={props?.currentLinkPath}
      />
      <div className="col-span-4">{props.panelComponent}</div>
    </div>
  );
};

export default Panel;
