//**************************************************************** */
// Imports
//**************************************************************** */

// React routing dependencies
import { Route, Routes, BrowserRouter } from "react-router-dom";
import styled from 'styled-components';

// Local components
import GlobalStyles from "../../src/GlobalStyles";
import Homepage from "../components/Homepage";
import Login from "../components/authentication/Login";
import Signup from "../components/authentication/Signup";
import Header from '../components/Header';
import Profile from "../components/authentication/Profile/Profile";

// required by mabox
//import mapboxgl from '!mapbox-gl' 
import mapboxgl from 'mapbox-gl/dist/mapbox-gl.js';

// my mapbox access token
mapboxgl.accessToken = 'pk.eyJ1Ijoiam9ncmlzb2xkIiwiYSI6ImNsNnV2Nm1zbTIxemIzanRlYXltNnhjYW0ifQ.wneEVyaaMSgq9bm_gD-Eug';

const App = () => {
  console.log("App.js");
  return (
<>

  <Wrapper>
    <GlobalStyles />
    <BrowserRouter>
      <Header/>
      <Routes>
        <Route exact path="/" element={<Homepage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="*" component={Error} />
      </Routes>
    </BrowserRouter>
  </Wrapper>
  </>
  );
}

export default App;

const Wrapper = styled.div`
    
`;