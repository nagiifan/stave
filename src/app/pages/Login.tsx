import React, { useState } from 'react';
import { login } from '../lib/api';
import { useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';

function Login() { 
  const [error, setError] = useState<string>('');
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const history = useHistory();

  function handleLogin(e: any) {
    e.preventDefault();
    login(username, password)
      .then(e => {
        history.push('/projects');
      })
      .catch(e => {
        setError('login failed');
      });
  }

  const [passwordShown, setPasswordShown] = useState(false);
  const togglePasswordVisiblity = () => {
    setPasswordShown(passwordShown ? false : true);
  };

  const eye = <FontAwesomeIcon icon={faEye} />;

  // this function is temporarily suspended:
  // function redirectSignup(e: any) {
  //   history.push("/signup") 
  // }

  return (
    <div className="container_login">
      <div className="card_login">
        <img className="img_logo" alt='stave logo' src={process.env.PUBLIC_URL + '/Stave-graphic@2x.png'}/>
        <div className="box">
          <h1 style={{color: "#05668D"}}>Sign In</h1>
          <form noValidate onSubmit={handleLogin}>
            <div className="form-wrapper1">
              <input className="input" 
                onChange={e => setUsername(e.target.value)}
                value={username}
                placeholder="Username"
              />
              {" "}
            </div>
            <div className="form-wrapper1">
              <input className="input" 
                onChange={e => setPassword(e.target.value)}
                value={password}
                placeholder="Password"
                type={passwordShown ? "text" : "password"}
              />
              <i onClick={togglePasswordVisiblity}>{eye}</i>{" "}
            </div>

          {error ? <div>{error}</div> : null}

          {/* // this function will be added in the future
          <span style={{color: "#05668D"}}>Change Your Password?
          </span> */}

          <button className="button" onClick={handleLogin}>
              Sign In
          </button>
        </form>
        </div>
      </div>
    </div> 
  );
}

export default Login;
