import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {createBrowserRouter, RouterProvider} from 'react-router-dom';

import Login from './pages/Login/Login'
import { Home } from './pages/Home/Home.jsx';
import { Perfil } from './pages/Perfil/Perfil';


const router = createBrowserRouter([{
  path: '/home',
  element: <Login />,
},
{
  path: '/',
  element: <Home />, //mudei
},
{
  path: '/perfil',
  element: <Perfil/>  ,
}
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
