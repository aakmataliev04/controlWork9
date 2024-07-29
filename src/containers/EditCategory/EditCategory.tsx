import React, {useEffect} from 'react';
import {useParams} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from '../../app/hook';

import Preloader from '../../components/Preloader/Preloader';
import AddCategory from '../AddCategory/AddCategory';
import {fetchOneCategory} from '../../store/categoriesThunks';
import {selectIsLoadingOneCategory} from '../../store/categoriesSlice';

const EditContact: React.FC = () => {
  const {id} = useParams();
  const dispatch = useAppDispatch();
  const isLoadingContact = useAppSelector(selectIsLoadingOneCategory);


  useEffect(() => {
    if (id) {
      dispatch(fetchOneCategory(id));
    }
  }, [dispatch, id]);
  return (
    <>
      {
        isLoadingContact ?
          <div style={{display: 'flex', justifyContent: 'center', padding: '36vh 0'}}><Preloader/></div>
          : <AddCategory id={id && id}/>
      }
    </>
  );
};

export default EditContact;