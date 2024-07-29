import React, {ChangeEvent, FormEvent, useEffect} from 'react';
import ButtonSpinner from '../../components/ButtonSpinner/ButtonSpinner';
import {useAppDispatch, useAppSelector} from '../../app/hook';
import {
  clearCategoryMutation,
  selectCategoryMutation,
  selectIsCreating,
  selectIsUpdating,
  setCategoryMutation
} from '../../store/categoriesSlice';
import './AddCategory.css';
import {ApiCategory} from '../../types';
import {toast} from 'react-toastify';
import {useNavigate} from 'react-router-dom';
import {createCategory, fetchCategories, updateCategory} from '../../store/categoriesThunks';

interface Props {
  id?: string | undefined
}
const AddCategory: React.FC<Props> = ({id}) => {
  const dispatch = useAppDispatch();
  const isCreating = useAppSelector(selectIsCreating);
  const isUpdating = useAppSelector(selectIsUpdating);
  const categoryMutation = useAppSelector(selectCategoryMutation);
  const navigate = useNavigate();

  useEffect(() => {
    if (id === undefined) dispatch(clearCategoryMutation());
  }, [dispatch, id]);

  const changeMutation = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const name = event.target.name;
    const value = event.target.value;
    dispatch(setCategoryMutation({ name, value }));
  };

  const onSubmit = async (event: FormEvent<HTMLFormElement>, category: ApiCategory) => {
    event.preventDefault();
    try {
      if (id) {
        await dispatch(updateCategory({id, category})).unwrap();
        await dispatch(fetchCategories()).unwrap();
      } else {
        await dispatch(createCategory(category)).unwrap();
        await dispatch(fetchCategories()).unwrap();
      }
      toast.success('Category Saved!');
    } catch (e) {
      toast.error('Could not save category!');
    } finally {
      navigate('/categories');
    }
  };

  const form = (
    <form onSubmit={(event) => onSubmit(event, categoryMutation)}>
      <div className="form-group">
        <label htmlFor="type">Type</label>
        <select
          className="form-control"
          onChange={(event) => changeMutation(event)}
          name="type"
          id="type"
          required
        >
          <option>category type</option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
        <label htmlFor="name">Name</label>
        <input
          onChange={(event) => changeMutation(event)}
          value={categoryMutation.name}
          id="name"
          type="text"
          name="name"
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
      <h2>{id ? 'Edit Category' : 'Add category'}</h2>
      {form}
    </div>
  );
};

export default AddCategory;