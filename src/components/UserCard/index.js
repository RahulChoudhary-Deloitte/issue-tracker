import React,{ useState, useEffect }  from 'react';

import { useHistory } from 'react-router-dom';

import { useOktaAuth } from '@okta/okta-react';
import './style.scss'
const UserCard = () => {

  const { oktaAuth, authState } = useOktaAuth();
  const history = useHistory();
  const [userInfo, setUserInfo] = useState(null);


  useEffect(() => {

    if (!authState || !authState.isAuthenticated) {
      setUserInfo(null);

    } else {

    oktaAuth.getUser().then((info) => {
        setUserInfo(info);
      }).catch((err) => {
        console.error(err);
      });
    }
  }, [authState, oktaAuth]); 

  const handleLogin = async () => history.push('/login');
  const handleLogout = async () => oktaAuth.signOut();

  return (
    <div className='user-card'>
          <div className="user">
            <h5> &nbsp;{userInfo && userInfo.name}!</h5>
            <img src="https://media.istockphoto.com/id/1406197730/photo/portrait-of-a-young-handsome-indian-man.jpg?s=2048x2048&w=is&k=20&c=lDJRQWb0FtKq9R8biMKvGGZVqn0sVGlUHDPoxR83nWc=" alt="" />
            {

authState.isAuthenticated

  ? <button id="logout-button" type="button" onClick={handleLogout}>Logout</button>

  : <button id="login-button" type="button" onClick={handleLogin}>Login</button>

}
        </div>
    </div>

  )
}

export default UserCard
