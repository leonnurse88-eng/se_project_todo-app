import { v4 as uuidv4 } from "https://jspm.dev/uuid";
import { initialTodos, validationConfig } from "../utils/contants.js";
import todo from "../components/Todo.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import TodoCounter from "../components/TodoCounter.js";

const addTodoButton = document.querySelector(".button_action_add");
const addTodoPopup = document.querySelector("#add-todo-popup");
const addTodoForm = addTodoPopup.querySelector(".popup__form");
// const todoTemplate = document.querySelector("#todo-template");=> remove ltr
const todosList = document.querySelector(".todos__list");

const todoCounter = new TodoCounter(initialTodos, ".counter__text");

function handleCheck(completed) {
  todoCounter.updateCompleted(completed);
}

function handleDelete(completed) {
  if (completed) {
    todoCounter.updateCompleted(false);
  }
  todoCounter.updateTotal(false);
}

const addTodoPopupInstance = new PopupWithForm(
  "#add-todo-popup",
  (inputValues) => {
    const date = new Date(inputValues.date);
    date.setMinutes(date.getMinutes() + date.getTimezoneOffset());

    const values = { ...inputValues, date, id: uuidv4() };
    const todoElement = generateTodo(values);
    todosList.prepend(todoElement);
    todoCounter.updateTotal(true);
    newTodoValidator.resetValidation();
    addTodoPopupInstance.close();
  },
);
addTodoPopupInstance.setEventListeners();

const todoSection = new Section({
  items: initialTodos,
  renderer: (item) => {
    const todoElement = generateTodo(item);
    todosList.append(todoElement);
  },
  containerSelector: ".todos__list",
});

// The logic in this function should all be handled in the Todo class.
const generateTodo = (data) => {
  const Todo = new todo(data, "#todo-template", handleCheck, handleDelete);
  const todoElement = Todo.getView();
  return todoElement;
};

todoSection.renderItems();

addTodoButton.addEventListener("click", () => {
  addTodoPopupInstance.open();
});

const newTodoValidator = new FormValidator(validationConfig, addTodoForm);
newTodoValidator.enableValidation();
newTodoValidator.resetValidation();
