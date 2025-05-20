import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import LayoutAdmin from './layout/LayoutAdmin';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard/index.jsx';
import Category from './pages/Category/index.jsx';
import Product from './pages/Product/index.jsx';
import Inventory from './pages/Inventory/index.jsx';

import CustomerAdd from './pages/Customers/Add.jsx';
import Staff from './pages/Staff/index.jsx';
import Suppelier from './pages/Supplier/index.jsx';

import StaffAdd from './pages/Staff/Add.jsx';
import SupplierAdd from './pages/Supplier/Add.jsx';
import CategoryAdd from './pages/Category/Add.jsx';
import UnitType from './pages/UnitType/index.jsx';
import UnitAdd from './pages/UnitType/Add.jsx';
import ProductAdd from './pages/Product/Add.jsx';

import Customer from './pages/Customers/index.jsx';
import AddInventory from './pages/ImportInventory/AddInventory.jsx';
import ImportInventory from './pages/ImportInventory/index.jsx';
import TransactionImportInventory from './pages/ImportInventory/index.jsx';
import TransactionExportInventory from './pages/ExportInventory/index.jsx';
import AddExInventory from './pages/ExportInventory/AddExInventory.jsx';
import RevenueReport from './pages/RevenueReport/RevenueReport.jsx';
import StockReport from './pages/StockReport/StockReport.jsx';
import CheckInventory from './pages/CheckInventory/index.jsx';
import AddCheckInventory from './pages/CheckInventory/AddCheckInventory.jsx';
import ResetPassword from './pages/ResetPassword.jsx';

import LoginPage from './pages/LoginPage.jsx';
import UserProfile from './pages/UserProfile/UserProfile.jsx';
import ChangePass from './pages/ChangePass/ChangePass.jsx';
import PrivateRoute from './utils/PrivateRouter.js';


function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<PrivateRoute> <LayoutAdmin /></PrivateRoute>}>
          <Route index element={<Dashboard />} />
          <Route path="/categorys" element={<Category />} />
          <Route path="/categorys/add" element={<CategoryAdd />} />
          <Route path="/products" element={<Product />} />
          <Route path="/products/add" element={<ProductAdd />} />
          <Route path="/unit" element={<UnitType />} />
          <Route path="/unit/add" element={<UnitAdd />} />

          <Route path="/inventory" element={<Inventory />} />
          <Route path="/inventory/check" element={<CheckInventory />} />
          <Route path="/inventory/checkadd" element={<AddCheckInventory />} />
          <Route path="/inventory/imports" element={<TransactionImportInventory />} />
          <Route path="/inventory/imports/create" element={<AddInventory />} />
          <Route path="/inventory/exports" element={<TransactionExportInventory />} />
          <Route path="/inventory/exports/create" element={<AddExInventory />} />

          <Route path="/reports/revenue" element={<RevenueReport />} />
          <Route path="/reports/stock" element={<StockReport />} />

          <Route path="/customer" element={<Customer />} />
          <Route path="/customer/add" element={<CustomerAdd />} />

          <Route path="/staff" element={<Staff />} />
          <Route path="/staff/add" element={<StaffAdd />} />
          <Route path="/supplier" element={<Suppelier />} />
          <Route path="/supplier/add" element={<SupplierAdd />} />

          <Route path="/profile" element={<UserProfile />} />
          <Route path="/changePass" element={<ChangePass />} />
        </Route>


        <Route path="/login" element={<LoginPage />} />
        <Route path="/reset" element={<ResetPassword />} />
      </Routes>

    </>
  );
}

export default App;
