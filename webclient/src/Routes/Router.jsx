import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import PrivateRoute from './PrivateRouter';
import PrivateAdminRoute from './PrivateAdminRoute';
import {
  Login, Home, ProductBO, AddProduct, CategoryBO,
  UpdateProduct, AddCategory, UpdateCtegory, PrintOrder,
  DetailsProduct, Register, Navbar, EditUser, EditPassWord,
} from '../Components';

const Router = () => (
  <div>
    <BrowserRouter>
      <div>
        <Navbar />
        <Route exact path="/" component={Home} />
        <Route path="/signin" component={Login} />
        <Route path="/product/:id" component={DetailsProduct} />
        <Route path="/register" component={Register} />
        <PrivateRoute path="/edit-user" component={EditUser} />
        <PrivateRoute path="/edit-password" component={EditPassWord} />
        <PrivateRoute path="/print" component={PrintOrder} />
        <PrivateAdminRoute path="/admin/product" component={ProductBO} />
        <PrivateAdminRoute path="/admin/add-product" component={AddProduct} />
        <PrivateAdminRoute path="/admin/categories" component={CategoryBO} />
        <PrivateAdminRoute path="/admin/update-product" component={UpdateProduct} />
        <PrivateAdminRoute path="/admin/add-category" component={AddCategory} />
        <PrivateAdminRoute path="/admin/update-category" component={UpdateCtegory} />
      </div>
    </BrowserRouter>
  </div>
);

export default Router;
