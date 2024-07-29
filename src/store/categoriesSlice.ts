import {ApiCategory, Category} from '../types';
import {createSlice} from '@reduxjs/toolkit';
import {createCategory, deleteCategory, fetchCategories, fetchOneCategory, updateCategory} from './categoriesThunks';

export interface CategoriesState {
  categoryMutation: ApiCategory;
  categories: Category[] | null;
  fetchLoading: boolean;
  isFetchingOneCategory: boolean;
  isCreating: boolean;
  isUpdatingCategory: boolean;
  isDeleting: boolean;
  isError: boolean;
}
const initialState : CategoriesState = {
  categoryMutation: {
    type: 'income',
    name: '',
  },
  categories: null,
  fetchLoading: false,
  isFetchingOneCategory: false,
  isCreating: false,
  isUpdatingCategory: false,
  isDeleting: false,
  isError: false,
};

export const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    setCategoryMutation: (state, {payload : {name, value}}) => {
      state.categoryMutation[name] = value;
    },
    clearCategoryMutation: (state) => {
      state.categoryMutation = {type: 'income',name: ''};
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(createCategory.pending, (state) => {
        state.isCreating = true;
        state.isError = false;
      })
      .addCase(createCategory.fulfilled, (state) => {
        state.isCreating = false;
        state.categoryMutation = {type: 'income', name: ''};
      })
      .addCase(createCategory.rejected, (state) => {
        state.isCreating = false;
        state.isError = true;
      });
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.fetchLoading = true;
        state.isError = false;
      })
      .addCase(fetchCategories.fulfilled, (state, {payload}) => {
        state.fetchLoading = false;
        state.categories = payload;
      })
      .addCase(fetchCategories.rejected, (state) => {
        state.fetchLoading = false;
        state.isError = true;
      });
    builder
      .addCase(fetchOneCategory.pending, (state) => {
        state.categoryMutation = {type: 'income', name: ''};
        state.isFetchingOneCategory = true;
        state.isError = false;
      })
      .addCase(fetchOneCategory.fulfilled, (state, {payload: category}) => {
        state.isFetchingOneCategory = false;
        state.categoryMutation = category;
      })
      .addCase(fetchOneCategory.rejected, (state) => {
        state.isFetchingOneCategory = false;
        state.isError = true;
      });
    builder
      .addCase(deleteCategory.pending, (state) => {
        state.isDeleting = true;
        state.isError = false;
      })
      .addCase(deleteCategory.fulfilled, (state) => {
        state.isDeleting = false;
        state.isError = false;
      })
      .addCase(deleteCategory.rejected, (state) => {
        state.isDeleting = false;
        state.isError = true;
      });
    builder
      .addCase(updateCategory.pending, (state) => {
        state.isUpdatingCategory = true;
        state.isError = false;
      })
      .addCase(updateCategory.fulfilled, (state) => {
        state.isUpdatingCategory = false;
        state.isError = false;
      })
      .addCase(updateCategory.rejected, (state) => {
        state.isUpdatingCategory = false;
        state.isError = true;
      });
  },
  selectors: {
    selectCategoryMutation: (state) => state.categoryMutation,
    selectIsLoadingOneCategory: (state) => state.isFetchingOneCategory,
    selectCategories: (state) => state.categories,
    selectIsCreating: (state) => state.isCreating,
    selectIsUpdating: (state) => state.isUpdatingCategory,
    selectIsDeleting: (state) => state.isDeleting,
  }
});

export const categoriesReducer = categoriesSlice.reducer;

export const {setCategoryMutation, clearCategoryMutation} = categoriesSlice.actions;
export const {
  selectCategoryMutation,
  selectIsLoadingOneCategory,
  selectCategories,
  selectIsCreating,
  selectIsUpdating,
  selectIsDeleting,
} = categoriesSlice.selectors;