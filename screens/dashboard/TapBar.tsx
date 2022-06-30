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
}

const renderScene = (scene: { route: IRoute }) => {
  switch (scene.route.key) {
    case 'first':
      return <Dashboard />;
    case 'second':
      return <Team />;
    case 'third':
      return <ProjectList />;
    case 'fourth':
      return <TaskList />;
    case 'fifth':
      return <Settings />;
  }
};

const TapbarComponent = () => {
  const layout = useWindowDimensions();

  const [index, setIndex] = useState(0);
  const [routes] = useState([{
    key: "first",
    title: "Home",
  }, {
    key: "second",
    title: "Team"
  }, {
    key: "third",
    title: "Projects"
  }, {
    key: "fourth",
    title: "Tasks"
    }, {  
    key: "fifth",
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
