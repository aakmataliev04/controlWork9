import React, {useState} from 'react';
import {Category, Transaction} from '../../types';
import {Link} from 'react-router-dom';
import dayjs from 'dayjs';
import './TransactionItem.css';
import {toast} from 'react-toastify';
import {useAppDispatch} from '../../app/hook';
import ButtonSpinner from '../ButtonSpinner/ButtonSpinner';
import {deleteTransaction, fetchTransactions} from '../../store/transactionsThunks';

interface Props {
  transaction: Transaction;
  category: Category;
}
const TransactionItem: React.FC<Props> = ({transaction, category}) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const dispatch = useAppDispatch();

  const onDelete = async (transactionId: string) => {
    try {
      if (confirm()) {
        setIsDeleting(true);
        await dispatch(deleteTransaction(transactionId));
        await dispatch(fetchTransactions());
      }
    } finally {
      toast.success('Transaction deleted!');
      setIsDeleting(false);
    }
  };
  return (
    <div className="transaction">
      <div className="category-name" style={{display: 'flex', alignItems: 'center'}}>
        <div className={'transaction-type'}>{dayjs(transaction.date).format('DD.MM.YYYY HH:mm:ss')}</div>
        <h4 className={'transaction-title'}>{category.name}</h4>
      </div>
      <div className={'transaction-control'}>
        {category.type === 'income' ? (
          <div className={'transaction-type'} style={{color: 'green'}}>{`+${transaction.amount}`}</div>
        ): (
          <div
            className={'transaction-type'} style={{color: 'red'}}>{`-${transaction.amount}`}</div>
        )
        }
        <Link className="transaction-btn" to={`edit/${transaction.id}`}>Edit</Link>
        <button onClick={() =>onDelete(transaction.id)} className="transaction-btn transaction-delete-btn">
          {isDeleting && <div style={{margin: '0 5px'}}><ButtonSpinner/></div>}
          Delete
        </button>
      </div>
    </div>
  );
};

export default TransactionItem;