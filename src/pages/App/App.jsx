import {useState} from 'react'
import './App.css';
import AuthPage from './AuthPage/AuthPage';
import NewOrderPage from './NewOrderPage/NewOrderPage';
import OrderHistoryPage from './OrderHistoryPage/OrderHistoryPage';
import NavBar from '../../components/Navbar';
import { getUser } from '../../utilities/users-service';

import { Routes, Route } from 'react-router-dom';
import LoginForm from '../../components/LoginForm/LoginForm';

export default function App() {
  const [user, setUser] = useState(getUser())
  return (
    <main>
      {user ?
      <>
      <NavBar user={user} setUser={setUser}/>
      <Routes>
        <Route path='orders/new' element={<NewOrderPage />} />
        <Route path='orders/' element={<OrderHistoryPage />} />
      </Routes>
      </>
      :
      <AuthPage setUser={setUser}/> 
    }
    </main>
  );
}

