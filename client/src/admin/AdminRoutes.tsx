import {  Route } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import Users from './pages/Users'
import Product from './pages/Product'
import Order from './pages/Order'


export const AdminRoutes =[
 
 
      <Route path="/admin" element={<Dashboard />} />,
      <Route path="/admin/users" element={<Users />} />,
      <Route path="/admin/product" element={<Product />} />,
      <Route path="/admin/order" element={<Order />} />
  
]