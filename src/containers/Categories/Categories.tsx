import React, {useEffect} from 'react';
import './Categories.css';
import {Link, Outlet, useLocation} from 'react-router-dom';
import {fetchCategories} from '../../store/categoriesThunks';
import {useAppDispatch, useAppSelector} from '../../app/hook';
import {selectCategories} from '../../store/categoriesSlice';
import Preloader from '../../components/Preloader/Preloader';
import CategoryItem from '../../components/CategoryItem/CategoryItem';

const Categories: React.FC = () => {
  const location = useLocation().pathname;
  const categories = useAppSelector(selectCategories);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const categoriesList = (
    <div className={'categories-list'}>
      {
        categories !== null ? (
          categories.map((category, index: number) => {
            return (
              <CategoryItem key={category.name + index} category={category}/>
            );
          })
        ) : (
          <div style={{display: 'flex', justifyContent: 'center', padding: '30vh 0'}}><Preloader/></div>
        )
      }
    </div>
  );

  return (
    <div className={'categories-block'}>
      {location === '/categories' ? (
        <>
          <div className="categories">
            <h2 className="categories-title">Categories</h2>
            <Link to={'add-category'} className="categories-btn">
              Add Category
            </Link>
          </div>
          {categoriesList}
        </>
      ) : <Outlet/>}
    </div>
  );
};

export default Categories;
