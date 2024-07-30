import React, {ChangeEvent, FormEvent, useEffect} from 'react';
import {useAppDispatch, useAppSelector} from '../../app/hook';
import {
  selectTransactionMutation,
  selectIsCreating,
  selectIsUpdating,
  setTransactionMutation,
  clearTransactionMutation
} from '../../store/transactionsSlice';
import { selectCategories} from '../../store/categoriesSlice';
import {fetchCategories} from '../../store/categoriesThunks';
import {toast} from 'react-toastify';
import {useNavigate} from 'react-router-dom';
import {ApiTransaction} from '../../types';
import {createTransaction, fetchTransactions, updateTransaction} from '../../store/transactionsThunks';
import ButtonSpinner from '../../components/ButtonSpinner/ButtonSpinner';
import '../AddCategory/AddCategory.css';


interface Props {
  id?: string | undefined
}

const AddTransaction: React.FC<Props> = ({id}) => {
  const dispatch = useAppDispatch();
  const transactionMutation = useAppSelector(selectTransactionMutation);
  const categories = useAppSelector(selectCategories);
  const isCreating = useAppSelector(selectIsCreating);
  const isUpdating = useAppSelector(selectIsUpdating);
  const navigate = useNavigate();


  useEffect(() => {
    dispatch(fetchCategories());
    if (id === undefined) dispatch(clearTransactionMutation());
  }, [dispatch, id]);

  const changeMutation = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const name = event.target.name;
    const value = event.target.value;
    dispatch(setTransactionMutation({ name, value }));
  };
  const onSubmit = async (event: FormEvent<HTMLFormElement>, transaction: ApiTransaction) => {
    event.preventDefault();
    try {
      if (id) {
        await dispatch(updateTransaction({id, transaction})).unwrap();
        await dispatch(fetchTransactions()).unwrap();
      } else {
        const time = new Date().toISOString();
        const transactionWithTime = {...transaction, date: time};
        await dispatch(createTransaction(transactionWithTime)).unwrap();
        await dispatch(fetchTransactions()).unwrap();
      }
      toast.success('Transaction Saved!');
    } catch (e) {
      toast.error('Could not save Transaction!');
    } finally {
      navigate('/');
    }
  };

  const form = (
    <form onSubmit={(event) => onSubmit(event, transactionMutation.transaction)}>
      <div className="form-group">
        <label htmlFor="type">Type</label>
        <select
          className="form-control"
          onChange={(event) => changeMutation(event)}
          name="type"
          id="type"
          defaultValue={transactionMutation.type}
        >
          <option value="">choose type</option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
        <label htmlFor="idCategory">Category</label>
        <select
          className="form-control"
          onChange={(event) => changeMutation(event)}
          name="idCategory"
          id="idCategory"
        >
          <option value="">choose category</option>
          {
            categories !== null && categories.map(category => {
              if (transactionMutation.type === category.type) {
                return (
                  <option key={category.id} value={category.id}>{category.name}</option>
                );
              }
            })
          }
        </select>
        <label htmlFor="amount">Amount</label>
        <input
          onChange={(event) => changeMutation(event)}
          value={transactionMutation.transaction.amount}
          id="amount"
          type="number"
          name="amount"
          className="form-control"
          required
        />
      </div>

      <button type="submit" className="btn">
        {isCreating || isUpdating ? <ButtonSpinner/> : 'Save'}
      </button>
    </form>
  );
  return (
      <div className={'container add-container'}>
        <h2>{id ? 'Edit Transaction' : 'Add Transaction'}</h2>
        {form}
      </div>
  );
};

export default AddTransaction;