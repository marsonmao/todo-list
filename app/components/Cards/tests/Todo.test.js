import React from 'react';
import { render, fireEvent } from 'react-testing-library';
import Todo from '../Todo';

describe('<TodoCard />', () => {
  it('click DONE button', () => {
    const onDone = jest.fn();
    const {
      // debug,
      // getByTestId,
      getByText,
    } = render(
      <Todo
        data-testid="todo"
        id="todo-test-id-001"
        title="todo-test-title"
        description="todo-test-description"
        checked={false}
        onDelete={() => {}}
        onDone={onDone}
      />,
    );
    // const el = getByTestId('todo');
    // debug();
    fireEvent.click(getByText('DONE'));
    expect(onDone).toHaveBeenCalledTimes(1);
  });
});
