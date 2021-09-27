import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import DashBoardScreen from "./containers/Dashboard";

const App = () => {
  return (
    <Router>
      <div>
        <Switch>
          <Route path="/">
            <DashBoardScreen />
          </Route>
          <Route path="/dashboard">
            <DashBoardScreen />
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

export default App;
