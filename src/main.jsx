import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {createBrowserRouter, RouterProvider} from 'react-router-dom';

import Login from './pages/Login/Login'
import { Home } from './pages/Home/Home';
import { Perfil } from './pages/Perfil/Perfil';
import Rotina from './pages/Rotina/Rotina';


const router = createBrowserRouter([{
  path: '/home',
  element: <Home />,
},

{
  path: '/',
  element: <Home />, //mudei
},

{
  path:'/rotina',
  element: <Rotina/>
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
