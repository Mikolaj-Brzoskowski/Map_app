import { Routes, Route } from 'react-router-dom';
import AddressForm from './components/AddressForm';
import Home from './components/Home';
import NavBar from './components/NavBar';
import RouteCalculation from './components/RouteCalculation';
import History from './components/History';

function App() {
  return (
    <div>
    <NavBar/>
    <Routes>
      <Route path="/" element={<Home/>}></Route>
      <Route path="/form" element={<AddressForm/>}></Route>
      <Route path="/route" element={<RouteCalculation/>}></Route>
      <Route path="/history/:id" element={<History/>}></Route>
    </Routes>
    </div>
  );
}

export default App;
