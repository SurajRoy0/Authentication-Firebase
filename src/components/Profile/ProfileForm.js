import { useContext, useRef, useState } from 'react';
import classes from './ProfileForm.module.css';
import AuthContext from '../../Store/auth-context';

const ProfileForm = () => {
  const newPasswordRef = useRef('')
  const [isLoading, setIsLoading] = useState(false)
  const authCtx = useContext(AuthContext);

  const submitHandler = e => {
    e.preventDefault();
    setIsLoading(true)
    const enteredNewPassword = newPasswordRef.current.value;
    fetch('https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyDNSdsS0Bmv6O1ra0fIgEbY4REGDZg9FY4', {
      method: 'POST',
      body: JSON.stringify({
        idToken: authCtx.token,
        password: enteredNewPassword,
        returnSecureToken: true
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => {
      setIsLoading(false);
      if (res.ok) {
        return res.json();
      } else {
        throw new Error("Authentication Faild")
      }
    }).then(data => {
      authCtx.login(data.idToken)
    }).catch(err => {
      alert(err.message)
    })
  }

  return (
    <form onSubmit={submitHandler} className={classes.form}>
      <div className={classes.control}>
        <label htmlFor='new-password'>New Password</label>
        <input type='password' id='new-password' ref={newPasswordRef} />
      </div>
      <div className={classes.action}>
        <button>{isLoading ? 'Updating...' : 'Change Password'}</button>
      </div>
    </form>
  );
}

export default ProfileForm;
