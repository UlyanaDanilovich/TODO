import { Component } from 'react';
import Label from '../shared/Label/Label';
import Button from '../shared/Button/Button';

import './Item.scss';

class Item extends Component {
  shouldComponentUpdate(nextProps) {
    const { todo } = this.props;
    if (
      todo.done !== nextProps.todo.done ||
      todo.hidden !== nextProps.todo.hidden
    ) {
      return true;
    }
    return false;
  }

  render() {
    const { todo, handleHover, handleLeave, handleCheck, handleDelete } =
      this.props;

    return !todo.hidden ? (
      <li
        className={`list-item ${todo.done && 'list-item-done'}`}
        onMouseEnter={handleHover}
        onMouseLeave={handleLeave}
      >
        <input
          className="list-item__checkbox"
          type="checkbox"
          checked={todo.done}
          onChange={handleCheck}
        />
        <div className="text-wrapper">
          <p className="list-item__title">{todo.title}</p>
          {todo.description.length ? (
            <p className="list-item__desc">{todo.description}</p>
          ) : null}
          <Label
            title={todo.severity}
            className={`app-chip app-chip_${todo.severity}`}
          />
        </div>
        <p className="list-item__date">{todo.createdAt}</p>
        <Button
          className="list-item__delete"
          title="Delete"
          handleClick={handleDelete}
        />
      </li>
    ) : null;
  }
}

export default Item;
