import { Routes, Route } from 'react-router-dom';
import AdressForm from './components/AdressForm';
import Home from './components/Home';
import NavBar from './components/NavBar';
import RouteCalculation from './components/RouteCalculation';

function App() {
  return (
    <div>
    <NavBar/>
    <Routes>
      <Route path="/" element={<Home/>}></Route>
      <Route path="/form" element={<AdressForm/>}></Route>
      <Route path="/route" element={<RouteCalculation/>}></Route>
    </Routes>
    </div>
  );
}

export default App;
