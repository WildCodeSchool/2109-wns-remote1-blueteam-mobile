import { memo, useState } from "react";
import { useWindowDimensions } from "react-native";
import { TabView, TabBar } from "react-native-tab-view";

import Colors from "../../constants/Colors";

import Dashboard from "./Dashboard";
import Team from "./Team";
import ProjectList from "./ProjectList";
import TaskList from "./TaskList";
import Settings from "./Settings";

interface IRoute {
  key: string;
  title: string;
};

const renderScene = (scene: { route: IRoute }) => {
  switch (scene.route.key) {
    case 'home':
      return <Dashboard />;
    case 'team':
      return <Team />;
    case 'projectList':
      return <ProjectList />;
    case 'taskList':
      return <TaskList />;
    case 'settings':
      return <Settings />;
  }
};

const TapbarComponent = () => {
  const layout = useWindowDimensions();

  const [index, setIndex] = useState(0);
  const [routes] = useState([{
    key: "home",
    title: "Home",
  }, {
    key: "team",
    title: "Team"
  }, {
    key: "projectList",
    title: "Projects"
  }, {
    key: "taskList",
    title: "Tasks"
  }, {  
    key: "settings",
    title: "Settings"
  }]);

  const renderTabBar = props => (
    <TabBar
      {...props}
      indicatorStyle={{
        backgroundColor: Colors.light.tabIconSelected,
      }}
      indicatorContainerStyle={{
        backgroundColor: Colors.light.tabIconDefault,
      }}
      labelStyle={{
        color: Colors.light.text,
        fontSize: 9,
      }}
    />
  );

  return (
    <TabView
      renderTabBar={renderTabBar}
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{ width: layout.width }}
      tabBarPosition="bottom"
    />
  );
};

export default memo(TapbarComponent);
