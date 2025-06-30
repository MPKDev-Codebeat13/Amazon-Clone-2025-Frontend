import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from 'firebase/auth';
import React, { useContext, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { DataContext } from '../../Components/DataProvider/DataProvider';
import { Type } from '../../Utility/action.type';
import { auth } from '../../Utility/firebase';
import Classes from './Signup.module.css';
import { ClipLoader } from 'react-spinners';
function Auth() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState({
    signIn: false,
    signUp: false
  });

  const { user, dispatch } = useContext(DataContext);
  const navigate = useNavigate();
  const navStateData = useLocation();
  console.log(navStateData);
  // console.log(user)
  const authHandler = async (e) => {
    e.preventDefault();
    console.log(e.target.name);
    if (e.target.name == 'signin') {
      // firebase auth
      setLoading({ ...loading, signIn: true });
      signInWithEmailAndPassword(auth, email, password)
        .then((userInfo) => {
          dispatch({
            type: Type.SET_USER,
            user: userInfo.user
          });
          setLoading({ ...loading, signIn: false });
          navigate(navStateData?.state?.redirect || '/');
        })
        .catch((err) => {
          setError(err.message);
          setLoading({ ...loading, signIn: false });
        });
    } else {
      setLoading({ ...loading, signUp: true });
      createUserWithEmailAndPassword(auth, email, password)
        .then((userInfo) => {
          dispatch({
            type: Type.SET_USER,
            user: userInfo.user
          });
          setLoading({ ...loading, signUp: false });
          navigate(navStateData?.state?.redirect || '/');
        })
        .catch((err) => {
          setError(err.message);
          setLoading({ ...loading, signUp: false });
        });
    }
  };

  return (
    <section className={Classes.login}>
      {/* LOGO */}
      <Link to={'/'}>
        <img
          src='https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png'
          alt='AMAZON_LOGO'
        />
      </Link>
      {/* FORM */}
      <div className={Classes.login_container}>
        <h1>Sign-In</h1>
        {navStateData?.state?.msg && (
          <small
            style={{
              padding: '5px',
              textAlign: 'center',
              color: 'red',
              fontWeight: 'bold'
            }}
          >
            {navStateData.state.msg}
          </small>
        )}
        <form action=''>
          <div>
            <label htmlFor='email'>Email</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type='email'
              id='email'
            />
          </div>
          <div>
            <label htmlFor='password'>Password</label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type='password'
              id='password'
            />
          </div>
          <button
            type='submit'
            onClick={authHandler}
            name='signin'
            className={Classes.login_signInButton}
          >
            {loading.signIn ? (
              <ClipLoader color='#000' size={15}></ClipLoader>
            ) : (
              'Sign In'
            )}
          </button>
        </form>

        {/* AGREEMENT */}
        <p>
          By continuing, you agree to AMAZON FAKE CLONE Conditions of Use &
          Sale. Please see our and Privacy Notice, our Cookies and our
          Interest-Based Ads Notice.
        </p>
        {/* Create Account BTN */}
        <button
          type='submit'
          onClick={authHandler}
          name='signup'
          className={Classes.login__registerBtn}
        >
          {loading.signUp ? (
            <ClipLoader color='#000' size={15}></ClipLoader>
          ) : (
            'Create Your Amazon Account'
          )}
        </button>
        {error && (
          <small style={{ paddingTop: '5px', color: 'red' }}>{error}</small>
        )}
      </div>
    </section>
  );
}

export default Auth;
