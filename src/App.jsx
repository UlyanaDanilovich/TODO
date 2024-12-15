import { Component } from 'react';
import Item from './components/Item/Item';
import Form from './components/Form/Form';
import Button from './components/shared/Button/Button';
import Label from './components/shared/Label/Label';
import SearchInput from './components/shared/SearchInput/SearchInput';
import Checkbox from './components/shared/Checkbox/Checkbox';

import isSearchHasTitleDescSubstring from './validators/isSearchHasTitleDescSubstring';
import isTitleValid from './validators/isTitleValid';
import getFormattedDate from './formatters/getFormattedDate';
import getActualSeverityArray from './utils/getActualSeverityArray';
import toggleArrayElement from './utils/toggleArrayElement';
import { getTodoList } from './utils/getTodoList';
import { getUUID } from './utils/getUUID';
import { severityArray, severityTypes } from './constants/severityTypes';

import './App.scss';

class App extends Component {
  state = {
    todoTitle: '',
    todoDesc: '',
    todoSeverity: severityTypes.medium,
    filters: {
      byDone: false,
      bySearch: '',
      bySeverity: [],
    },
    todos: [],
  };

  handleHover = (event) => {
    event.currentTarget.classList.add('show-button');
  };

  handleLeave = (event) => {
    event.currentTarget.classList.remove('show-button');
  };

  handleTitleChange = (event) => {
    this.setState({ todoTitle: event.target.value });
  };

  handleDescChange = (event) => {
    this.setState({ todoDesc: event.target.value });
  };

  handleSeverityChange = (event) => {
    event.preventDefault();
    this.setState({ todoSeverity: event.target.value });
  };

  isTodoFiltered = (filters, todo, ignoreSeverity = false) => {
    const severityCondition = ignoreSeverity
      ? false
      : filters.bySeverity.length &&
        !filters.bySeverity.includes(todo.severity);
    return (
      (filters.byDone && todo.done) ||
      severityCondition ||
      !isSearchHasTitleDescSubstring(
        filters.bySearch,
        todo.title,
        todo.description
      )
    );
  };

  filterTodo = (filters) => {
    const filteredTodos = this.state.todos.map((todo) => {
      return {
        ...todo,
        hidden: this.isTodoFiltered(filters, todo),
      };
    });

    this.setState({ todos: filteredTodos });
  };

  filterChangeDone = () => {
    const filters = {
      ...this.state.filters,
      byDone: !this.state.filters.byDone,
    };
    this.setState({ filters });
    this.filterTodo(filters);
  };

  filterChangeSearch = (event) => {
    const filters = {
      ...this.state.filters,
      bySearch: event.target.value,
    };
    this.setState({ filters });
    this.filterTodo(filters);
  };

  filterChangeSeverity = (event) => {
    const newType = event.target.value;
    const newArr = toggleArrayElement(this.state.filters.bySeverity, newType);
    const filters = {
      ...this.state.filters,
      bySeverity: newArr,
    };
    this.setState({ filters });
    this.filterTodo(filters);
  };

  addTodo = () => {
    const todo = {
      id: getUUID(),
      createdAt: getFormattedDate(Date.now()),
      title: this.state.todoTitle,
      description: this.state.todoDesc,
      severity: this.state.todoSeverity,
      done: false,
    };

    this.setState({
      todoTitle: '',
      todoDesc: '',
      todos: [
        ...this.state.todos,
        {
          ...todo,
          hidden: this.isTodoFiltered(this.state.filters, todo),
        },
      ].sort((t1, t2) => Number(t1.done) > Number(t2.done)),
    });
  };

  addManyTodo = () => {
    this.setState({
      todos: [...this.state.todos, ...getTodoList()].sort(
        (t1, t2) => Number(t1.done) > Number(t2.done)
      ),
    });
  };

  checkTodo = (todoId) => {
    const updatedTodos = this.state.todos
      .map((todo) => {
        if (todo.id === todoId) {
          return {
            ...todo,
            done: !todo.done,
            hidden: this.state.filters.byDone && !todo.done,
          };
        }
        return todo;
      })
      .sort((t1, t2) => Number(t1.done) > Number(t2.done));

    this.setState({ todos: updatedTodos });
  };

  removeTodo = (todoId) => {
    const severityFilter = this.state.filters.bySeverity;
    const updatedTodos = this.state.todos.filter(({ id }) => id !== todoId);

    if (!getActualSeverityArray(updatedTodos).includes(severityFilter[0])) {
      const filters = {
        ...this.state.filters,
        bySeverity: [],
      };
      const newTodos = updatedTodos.map((todo) => {
        return {
          ...todo,
          hidden: this.isTodoFiltered(filters, todo, true),
        };
      });
      this.setState({ filters });
      this.filterTodo(filters);
      this.setState({ todos: newTodos });
    } else {
      this.setState({ todos: updatedTodos });
    }
  };

  render() {
    const list = this.state.todos;

    const todoList = () => {
      if (list.every((todo) => todo.hidden)) {
        return <Label title="No tasks found for the applied filters" />;
      }

      return list.map((todo) => (
        <Item
          key={todo.id}
          todo={todo}
          handleHover={this.handleHover}
          handleLeave={this.handleLeave}
          handleCheck={() => this.checkTodo(todo.id)}
          handleDelete={() => this.removeTodo(todo.id)}
        />
      ));
    };

    const severityList = () => {
      const omittedSeverityArray = getActualSeverityArray(list);
      return severityArray.map(([key, value]) => {
        if (!omittedSeverityArray.includes(value)) {
          return null;
        }

        return (
          <Checkbox
            key={key}
            value={value}
            title={value}
            handleChange={this.filterChangeSeverity}
          />
        );
      });
    };

    const isButtonDisabled = isTitleValid(this.state.todoTitle);

    return (
      <div className="app">
        <div className="app-wrapper">
          <aside className="app-aside">
            <h1>TODOIST</h1>
            <Checkbox
              title="Hide completed"
              handleChange={this.filterChangeDone}
            />
            <div className="app-aside__filter-severity">
              <Label title="Severity" className="app-aside__label" />
              <ul className="app-aside__severity-list">{severityList()}</ul>
            </div>
            <div className="app-aside__generate">
              <Label title="Testing" className="app-aside__label" />
              <Button
                className="w100"
                title="Add 1000 tasks"
                handleClick={this.addManyTodo}
              />
            </div>
          </aside>
          <div className="app-main">
            <SearchInput
              placeholder="Search..."
              handleInput={this.filterChangeSearch}
            />
            <ul className="app-main__list">
              {list.length ? todoList() : <Label title="No tasks" />}
            </ul>
          </div>
        </div>
        <Form
          title={this.state.todoTitle}
          desc={this.state.todoDesc}
          severity={this.state.todoSeverity}
          isButtonDisabled={isButtonDisabled}
          handleTitle={this.handleTitleChange}
          handleDesc={this.handleDescChange}
          handleSeverity={this.handleSeverityChange}
          submitForm={this.addTodo}
        />
      </div>
    );
  }
}

export default App;
