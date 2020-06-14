import React from 'react';
import { render, fireEvent } from 'react-testing-library';
import AddTodo from '../AddTodo';

describe('<AddTodoButton />', () => {
  it('fake test', () => {
    const addTodo = () => {};
    const {
      // debug,
      getByTestId,
    } = render(
      <AddTodo
        data-testid="add"
        addTodo={addTodo}
      />,
    );
    fireEvent.click(getByTestId('add'));
    // debug();
    // how to get component state? maybe expect (this.state.dialogOpen === true)
    // and expect (dialog is opened)
    expect(true);
  });
});
