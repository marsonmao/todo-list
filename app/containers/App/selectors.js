import { createSelector } from 'reselect';

const selectRouter = state => state.router;

const makeSelectLocation = () =>
  createSelector(
    selectRouter,
    routerState => routerState.location,
  );

export const selectTodos = state => state.app.todos;

export { makeSelectLocation };
