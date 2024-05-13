import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { SlActionUndo } from 'react-icons/sl';
import { useNavigate } from "react-router-dom";
import { adress, password } from '../../env';
import './login.css';

const Login = () => {
//    const route =  useRoutes()
const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [redMessage, setRedMessage] = useState(false);
  const [loginObj, setLoginObj] = useState({
    adress: '',
    password: '',
  });

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginObj((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (loginObj.password === password && loginObj.adress === adress) {
      navigate("/admin");
    // navigate("/a");
    } else {
      setRedMessage(true);
    }
  };

  return (
    <div className="container">
      <div className="modal-content padding-class">
        <div className="login-page">
          <h1>Log In</h1>
          <form onSubmit={handleSubmit}>
            <div className="form-group-login">
              <label className="email" htmlFor="email">
                Email
              </label>
              <input
                type="email"
                className="form-input-login"
                required
                placeholder="Email"
                name="adress"
                value={loginObj.adress}
                onChange={handleChange}
              />
            </div>
            <div className="form-group-login">
              <label className="password" htmlFor="password">
                Password
              </label>
              <div className="password-input-container">
                <input
                  className="form-input-login"
                  required
                  placeholder="Password"
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={loginObj.password}
                  onChange={handleChange}
                />
                <button
                  className="password-toggle"
                  onClick={togglePasswordVisibility}
                  type="button"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>
            {redMessage ? (
              <>
                <SlActionUndo className="befre" onClick={() => setRedMessage(false)} />
                <p className="wrong">You need to verify your information</p>
              </>
            ) : (
              <button className="button-login" type="submit">
                Log In
              </button>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
