import React, { Component } from "react";
import { Route, Link, Redirect, Switch, NavLink } from "react-router-dom";
import Movies from "./components/movies";
import Customers from "./components/customers";
import Rentals from "./components/rentals";
import NotFound from "./components/notfound";
import moviedetails from "./components/moviedetails";
import LoginForm from "./components/loginForm";
import RegisterForm from "./components/RegisterForm";
import AddMovie from "./components/addmovie";
import NavBar from "./components/navbar";
import Logout from "./components/logout";
import ProtectedRoute from "./common/protectedroute";
import auth from "./services/authService";
import { getMovies, saveMoviees } from "./services/fakeMovieService";
import "./App.css";

class App extends Component {
  state = {};
  componentDidMount() {
    try {
      const user = auth.getCurrentUser();
      this.setState({ user });
    } catch (ex) {}
  }
  render() {
    const { user } = this.state;
    return (
      <React.Fragment>
        <NavBar user={user}></NavBar>
        <main className="container">
          <Switch>
            <Route path="/Register" component={RegisterForm} />
            <Route path="/login" component={LoginForm} />
            <Route path="/logout" component={Logout}></Route>
            <ProtectedRoute path="/movies/:id" component={AddMovie} />
            <Route
              path="/movies"
              render={(props) => <Movies user={user} {...props} />}
            ></Route>
            <Route path="/customers" component={Customers}></Route>
            <Route path="/rentals" component={Rentals}></Route>
            <Route path="/not-found" component={NotFound}></Route>
            <Route
              path="/"
              exact
              render={(props) => <Movies user={this.state.user} {...props} />}
            ></Route>
            <Redirect to="/not-found"></Redirect>
          </Switch>
        </main>
      </React.Fragment>
    );
  }
}

export default App;
