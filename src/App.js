import "./App.scss";
import {
  BrowserRouter as Router,
  Switch,
  Navigate,
  Redirect,
  Routes,
  Route,
} from "react-router-dom";
import Home from "./pages/home/Home";
import Watch from "./pages/watch/Watch";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import { useContext } from "react";
import AdminHome from "./admin/pages/home/Home";
import { AuthContext } from "./authContext/AuthContext";
import UserList from "./admin/pages/userList/UserList";
import MovieList from "./admin/pages/movieList/MovieList";
import User from "./pages/user/User";
import MovieInfo from "./pages/movieInfo/MovieInfo";
import NewUser from "./admin/pages/newUser/NewUser";

function App() {
  const { user: currentUser } = useContext(AuthContext);

  return (
    <Router>
      <Routes>
        <Route exact path="/" element={currentUser ? <Home /> : <Login />} />
        <Route
          exact
          path="/register"
          element={currentUser ? <Home /> : <Register />}
        />
        <Route
          exact
          path="/login"
          element={currentUser ? <Home /> : <Login />}
        />
        <Route
          exact
          path="/profile"
          element={currentUser ? <User /> : <Login />}
        />

        <Route
          exact
          path="/newUser"
          element={currentUser ? <NewUser /> : <Login />}
        />

        <>
          <Route exact path="/movies" element={<Home type="movie" />} />
          <Route exact path="/series" element={<Home type="series" />} />
          <Route exact path="/watch" element={<Watch />} />

          <Route
            exact
            path="/info/:id"
            element={currentUser ? <MovieInfo /> : <Login />}
          />
        </>

        {/* admin routes */}

        <>
          <Route exact path="/admin/dashboard" element={<AdminHome />} />
          <Route exact path="/admin/users" element={<UserList />} />
          <Route exact path="/admin/movies" element={<MovieList />} />

          {/* <Route exact path="/user" element={<AdminUser />} /> */}

          {/* <Route exact path="/admin/newmovie" element={} />  */}
        </>
      </Routes>
    </Router>
  );
}

export default App;
