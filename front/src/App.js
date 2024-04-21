import './App.css';
import { Header } from './components/header';
import { Footer } from './components/footer';
import { Outlet } from 'react-router-dom';

function App() {
  return (
    <div className="App relative dark:bg-neutral-900 bg-stone-100">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}

export default App;
