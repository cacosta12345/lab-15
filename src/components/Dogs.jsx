import {useState, useEffect} from 'react';
import { withAuth0 } from '@auth0/auth0-react';
import axios from 'axios';

function Dogs(props) {

  const [dogs, setDogs] = useState([]);

  useEffect( () => {

    async function getDogs() {

      let claim = await props.auth0.getIdTokenClaims();
      let token = claim.__raw;

      const config = {
        headers: { "Authorization": `Bearer ${token}` },
        method: "get",
        url: 'http://localhost:3000/dogs',
      }

      let resposne = await axios(config);
      let data = resposne.data;
      setDogs(data);
    }

    getDogs();

  }, []);

  return (
    <ul>
      {
        dogs.map( dog => <li key={dog._id}>{dog.title}</li> )
      }
    </ul>
  )

}

export default withAuth0(Dogs);