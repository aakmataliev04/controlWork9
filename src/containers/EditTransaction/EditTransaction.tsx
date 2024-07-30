import React, {useEffect} from 'react';
import {useParams} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from '../../app/hook';

import Preloader from '../../components/Preloader/Preloader';

import AddTransaction from '../AddTransaction/AddTransaction';
import {fetchOneTransaction} from '../../store/transactionsThunks';
import {selectIsLoadingOneTransaction} from '../../store/transactionsSlice';

const EditContact: React.FC = () => {
  const {id} = useParams();
  const dispatch = useAppDispatch();
  const isLoadingTransaction = useAppSelector(selectIsLoadingOneTransaction);


  useEffect(() => {
    if (id) {
      dispatch(fetchOneTransaction(id));
    }
  }, [dispatch, id]);
  return (
    <>
      {
        isLoadingTransaction ?
          <div style={{display: 'flex', justifyContent: 'center', padding: '36vh 0'}}><Preloader/></div>
          : <AddTransaction id={id && id}/>
      }
    </>
  );
};

export default EditContact;