import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Indices from './Indices';

import './styles/App.css';

function App() {


  return (
    <Router>
      <div>
        <Switch>
          <Route path="/">
            <Indices />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
