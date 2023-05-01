import { useState, useEffect, useRef } from "react";
import AuthContext from "../Context/AuthContext";
import { Link } from "react-router-dom";
import { useContext } from "react";
import axios from "../api/axios";
const Login = () => {
  const { setAuth } = useContext(AuthContext);
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");

  const [errMsg, setErrMsg] = useState("");

  const [success, setSuccess] = useState(false);

  const userRef = useRef();
  const errRef = useRef();

  useEffect(() => {
    userRef.current.focus();
  }, []);
  useEffect(() => {
    setErrMsg("");
  }, [user, password]);
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "/login",
        JSON.stringify({
          username: user,
          password: password,
        }),
        {
          headers: {
            Accept: "application/json , text/plain",
            "Content-Type": "application/json",
          }
        }
      );
      console.log(res?.data);
      const accessToken = res?.data?.accessToken;
      const roles = res?.data?.roles;
      console.log(accessToken, roles);
      setAuth({
        username: user,
        password: password,
        roles,
        accessToken
      });
      setUser("");
      setPassword("");
      setSuccess(true);
    }
    catch (err) {
      if (!err?.response)
        setErrMsg('No server response')
      else if (err.response?.status === 400)
        setErrMsg('Missing username or password')
      else if (err.response?.status === 401)
        setErrMsg('Incorrect username or password')
      else
        setErrMsg('Login failed')
      errRef.current.focus();
    }
  };
  return (
    <section className="App-register">
      {success ? (
        <>
          <p>You are successfully logged in</p>
          <Link style={{color:"white",textDecoration:"underline"}} to="">Go to Home Page</Link>
        </>
      ) : (
        <>
          {errMsg && (
            <p className="err-msg" ref={errRef} aria-live="assertive">
              {errMsg}
            </p>
          )}
          <h1>Login</h1>
          <form onSubmit={handleSubmit}>
            <label htmlFor="user">Username :</label>
            <input
              ref={userRef}
              id="user"
              type="text"
              autoComplete="off"
              placeholder="Enter username"
              required
              value={user}
              onChange={(e) => setUser(e.target.value)}
            />

            <label htmlFor="pass">Password :</label>
            <input
              id="pass"
              type="password"
              placeholder="Enter password"
              required
              autoComplete="off"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit">Sign In</button>
          </form>
          <p style={{ margin: "0.5rem", textAlign: "center" }}>
            Need an Account?
          </p>
          <Link
            style={{
              textDecoration: "underline",
              color: "whitesmoke",
              alignSelf: "center",
            }}
            to="/"
          >
            Sign Up
          </Link>
        </>
      )}
    </section>
  );
};
export default Login;
