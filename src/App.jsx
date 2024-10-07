import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes,Route } from 'react-router-dom'
import Register from './pages/Register'
import LoginPage from './pages/Login'
import MyNavbar from './components/Navbar'
import List from './pages/List';
import Home from './pages/Home';
import Detail from './pages/Detail';
import Vieworder from './pages/Vieworder';
import ViewOrderDetail from './pages/ViewOrderDetail';

function App() {
    return (
    <div>
      <MyNavbar/>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/login' element={<LoginPage/>}/>
      <Route path='/register' element={<Register/>}/>
      <Route path='/book/list' element={<List/>}/>
      <Route path='/book/view/:bookId' element={<Detail/>}/>
      <Route path='/book/orders' element={<Vieworder/>}/>
      <Route path='/books/orders/:bookId' element={<ViewOrderDetail/>}/>
    </Routes>
    </div>
  )
}

export default App
