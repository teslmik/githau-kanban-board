import { Routes, Route } from 'react-router-dom';

import { Home } from './pages/home';
import { NotFound } from './pages/not-found';

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;
