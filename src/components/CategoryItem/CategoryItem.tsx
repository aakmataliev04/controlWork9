import React, {useState} from 'react';
import {Category} from '../../types';
import './CategoryItem.css';
import {Link} from 'react-router-dom';
import ButtonSpinner from '../ButtonSpinner/ButtonSpinner';
import {useAppDispatch} from '../../app/hook';
import {toast} from 'react-toastify';
import {deleteCategory, fetchCategories} from '../../store/categoriesThunks';

interface Props {
  category: Category;
}
const CategoryItem: React.FC<Props> = ({category}) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const dispatch = useAppDispatch();

  const onDelete = async (contactId: string) => {
    try {
      if (confirm()) {
        setIsDeleting(true);
        await dispatch(deleteCategory(contactId));
        await dispatch(fetchCategories());
      }
    } finally {
      toast.success('Category deleted!');
      setIsDeleting(false);
    }
  };

  return (
    <div className="category">
      <div className="category-name">
        <h4 className={'category-title'}>{category.name}</h4>
      </div>
      <div className={'category-control'}>
        <div className={'category-type'} style={category.type === 'income'? {color: "green"}: {color: "red"}}>{category.type}</div>
        <Link className="category-btn" to={`edit/${category.id}`}>Edit</Link>
        <button onClick={() => onDelete(category.id)} className="category-btn category-delete-btn" disabled={isDeleting}>
          {isDeleting && <div style={{margin: '0 5px'}}><ButtonSpinner/></div>}
          Delete
        </button>
      </div>
    </div>
  );
};

export default CategoryItem;