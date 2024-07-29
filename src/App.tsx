import React from 'react';
import './App.css';
import Layout from './components/Layout/Layout';
import {Route, Routes} from 'react-router-dom';
import Tracker from './containers/Tracker/Tracker';
import Categories from './containers/Categories/Categories';
import AddCategory from './containers/AddCategory/AddCategory';
import EditCategory from './containers/EditCategory/EditCategory';



const App: React.FC = () => {
  return (
    <Layout>
      <Routes>
        <Route path={'/'} element={<Tracker/>}/>


        <Route path={'/categories'} element={<Categories/>}>
          <Route path={'add-category'} element={<AddCategory/>}/>
          <Route path={'edit/:id'} element={<EditCategory/>}/>
        </Route>
      </Routes>
    </Layout>
  );
};

export default App;
