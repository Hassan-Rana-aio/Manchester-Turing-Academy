import { useEffect, useState } from "react";
import Panel from "../../../components/Panel/Panel";
import dynamicRoutes from "../../../constants/DynamicRoutes/DynamicRoutes";

const AdminPanel = () => {
  const [panelComponent, setPanelComponent] = useState(dynamicRoutes?.admin[0]);
  const [currentLinkPath, setCurrentLinkPath] = useState(
    dynamicRoutes?.admin[0]?.path
  );

  useEffect(() => {
    setCurrentLinkPath(panelComponent?.path);
  }, [panelComponent]);

  return (
    <div className="h-full">
      <Panel
        dynamicRoutes={dynamicRoutes?.admin}
        panelComponent={panelComponent?.component}
        setPanelComponent={setPanelComponent}
        currentLinkPath={currentLinkPath}
      />
    </div>
  );
};

export default AdminPanel;
