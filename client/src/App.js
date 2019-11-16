import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./pages/Home";
import Runes from "./pages/Runes"
import Profile from "./pages/Profile";
import LoginPage from "./pages/LoginPage";
import NoMatch from "./pages/NoMatch";
import TopNav from "./components/TopNav";
import Footer from "./components/Footer";
import SignupPage from "./pages/SignupPage";
import Discover from "./pages/Discover";
  
function App() {

  //put api call here in hooks with state

  return (
      <Router>
        <>
          <TopNav />
          <div className="main">
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/signup" render={(props) => <SignupPage {...props} action="signup" />} />
              <Route exact path="/login" render={(props) => <LoginPage {...props} action="login" />} />
              <Route exact path="/profile" component={Profile} />
              <Route exact path="/runes" component={Runes} />
              <Route exact path="/discover" component={Discover} />
              <Route component={NoMatch} />
            </Switch>
          </div>
          <Footer />
        </>
      </Router>
  );
}

export default App;
