import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Channels from './components/Channels';
import AddChannel from './components/AddChannel';
import Plans from './components/Plans';
import AddPlans from './components/AddPlans';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap-icons/font/bootstrap-icons.css';

function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path='/' element={<Channels />} />
          <Route path="/channels" element={<Channels />} />
          <Route path="/add-channel" element={<AddChannel />} />
          <Route path="/plans" element={<Plans />} />
          <Route path="/add-plans" element={<AddPlans />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
