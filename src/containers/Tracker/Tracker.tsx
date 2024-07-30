import React, {useEffect} from 'react';
import './Tracker.css';
import {Outlet, useLocation} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from '../../app/hook';
import {fetchTransactions} from '../../store/transactionsThunks';
import {selectTransactions} from '../../store/transactionsSlice';
import Preloader from '../../components/Preloader/Preloader';
import TransactionItem from '../../components/TransactionItem/TransactionItem';
import {fetchCategories} from '../../store/categoriesThunks';
import {selectCategories} from '../../store/categoriesSlice';

const Tracker: React.FC = () => {
  const location = useLocation().pathname;
  const dispatch = useAppDispatch();
  const transactions = useAppSelector(selectTransactions);
  const categories = useAppSelector(selectCategories);

  const getTotal = () => {
    let total = 0;
    transactions?.map((transaction) => {
      categories?.map((category) => {
        if (category.id === transaction.idCategory) {
          if (category.type === 'income') {
            total += parseInt(String(transaction.amount));
          } else {
            total -= parseInt(String(transaction.amount));
          }
        }
      });
    });
    return total;
  };
  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchTransactions());
  }, [dispatch]);

  const transactionsList = (
    <div className={'transactions-list'}>
      {
        transactions !== null ? (
          transactions.map((transaction) => {
            return (
              categories?.map((category) => {
                if (category.id === transaction.idCategory) {
                  return (
                    <TransactionItem key={transaction.id} transaction={transaction} category={category}/>
                  );
                }
              })
            );
          })
        ) : (
          <div style={{display: 'flex', justifyContent: 'center', padding: '30vh 0'}}><Preloader/></div>
        )
      }
    </div>
  );
  return (
    <>
      {
        location === '/' ? (
          <div>
            <div className="tracker-total">
              <h2 className={'tracker-total-title'}>Total: <strong>{getTotal()}</strong> KGS</h2>
            </div>
            {transactionsList}
          </div>
        ) : (
          <Outlet/>
        )
      }
    </>
  );
};

export default Tracker;