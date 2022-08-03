import './App.css';
import { Route, Routes } from 'react-router-dom';
import MainPage from './page/MainPage';
import WritingPage from './page/WritingPage';
import PostPage from './page/PostPage';
import UpdatePage from './page/UpdatePage';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' exact element={<MainPage />} />
        <Route path='/writing' element={<WritingPage />} />
        <Route path='/post/:id' element={<PostPage />} />
        <Route path='/post/:id/update' element={<UpdatePage />} />
      </Routes>
    </div>
  );
}

export default App;
