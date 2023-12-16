import { withAuth0 } from '@auth0/auth0-react';
import axios from 'axios';
import AuthButtons from './auth/AuthButtons.jsx';

import Dogs from './components/Dogs.jsx';
import { useState } from 'react';
let SERVER = import.meta.env.VITE_SERVER;

function App(props) {
  const [dogs, setDogs] = useState([]);
  async function fetchDogs() {
    try {
      let response = await axios.get(`${SERVER}/dogs`)
      setDogs(response.data);
    } catch (e) { console.error(e.message); }
  }
  return (
    <>
      <h1>Our App</h1>
      <AuthButtons />
      <hr />
      {
        props.auth0.isAuthenticated &&
        <>
          <button onClick={fetchDogs}>Get Some Dogs</button>
          <Dogs dogs={dogs}/>
        </>
      }
    </>
  )
}


// export default App;
export default withAuth0(App);

