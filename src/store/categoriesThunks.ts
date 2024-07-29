
import {AsyncThunk, createAsyncThunk} from '@reduxjs/toolkit';
import {ApiCategories, ApiCategory, Category} from '../types';
import {AppDispatch} from '../app/store';
import axiosApi from '../axiosApi';

export const fetchCategories = createAsyncThunk<
  Category[],
  undefined,
  { dispatch: AppDispatch }
>('categories/fetchCategories', async (): Promise<Category[]> => {
  const {data: categories} = await axiosApi.get<ApiCategories | null>('/financeTracker/categories.json');

  let newContacts: Category[] = [];

  if (categories) {
    newContacts = Object.keys(categories).map((key) => ({
      id: key,
      ...categories[key],
    }));
  }
  return newContacts;
});


export const createCategory: AsyncThunk<void, ApiCategory, { dispatch: AppDispatch }> =
  createAsyncThunk<void, ApiCategory, { dispatch: AppDispatch }>(
    'category/createCategory',
    async (category: ApiCategory) => {
      await axiosApi.post('/financeTracker/categories.json', category);
    }
  );

export const fetchOneCategory: AsyncThunk<ApiCategory, string, { dispatch: AppDispatch }> = createAsyncThunk<ApiCategory, string>(
  'category/fetchOneCategory',
  async (id) => {
    const { data: category } = await axiosApi.get<ApiCategory | null>(
      `/financeTracker/categories/${id}.json`,
    );
    if (category === null) {
      throw new Error('Not Found');
    }
    return category;
  },
);

export const updateCategory: AsyncThunk<void, { id: string; category: ApiCategory }, { dispatch: AppDispatch }> = createAsyncThunk<void, {id: string, category: ApiCategory}>(
  'category/updateCategory',
  async ({id, category}) => {
    await axiosApi.put(`/financeTracker/categories/${id}.json`, category);
  },
);

export const deleteCategory: AsyncThunk<void, string, { dispatch: AppDispatch }> = createAsyncThunk<void, string>(
  'category/deleteCategory',
  async (categoryId) => {
      await axiosApi.delete(`/financeTracker/categories/${categoryId}.json`);
  },
);