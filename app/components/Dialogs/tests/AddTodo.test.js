import React from 'react';
import { render, fireEvent } from 'react-testing-library';
import AddTodo from '../AddTodo';

describe('<AddTodoDialog />', () => {
  it('fake test', () => {
    const onAdd = jest.fn();
    const onClose = jest.fn();
    const {
      // debug,
      getByText,
    } = render(
      <AddTodo
        onAdd={onAdd}
        onClose={onClose}
      />,
    );
    fireEvent.click(getByText('Save'));
    expect(onAdd).toHaveBeenCalledTimes(1);
    fireEvent.click(getByText('Cancel'));
    expect(onClose).toHaveBeenCalledTimes(1);
    // debug();
  });
});
