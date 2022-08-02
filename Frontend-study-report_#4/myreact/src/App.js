import './App.css';
import Header from './component/header';
import { Routes, Route } from 'react-router-dom';
import Home from './page/home';
import About from './page/about';
import People from './page/people';
import Info from './component/info';

function App() {

  return (
    <div className='App'>
      <section id='header'>
        <Header />
      </section>

      <section id='body'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/about' element={<About />} />
          <Route path='/people' element={<People />}>
            <Route path=':department' element={<Info />} />
          </Route>
        </Routes>
      </section>
    </div>
  );
}

export default App;
