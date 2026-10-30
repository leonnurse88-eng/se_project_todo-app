class Todo {
  constructor(data, selector, handleCheck, handleDelete) {
    this._completed = data.completed;
    this._name = data.name;
    this._date = data.date;
    this._id = data.id;
    this._selector = selector;
    this._handleCheck = handleCheck;
    this._handleDelete = handleDelete;
  }

  generateDueDateEl() {
    const dueDate = new Date(this._date);
    this.todoDate = this.todoElement.querySelector(".todo__date");

    if (!isNaN(dueDate)) {
      this.todoDate.textContent = `Due: ${dueDate.toLocaleString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })}`;
    }
  }

  _setEventListeners() {
    this.todoDeleteBtn.addEventListener("click", () => {
      this.todoElement.remove();
      this._toggleCompletion();
      this._handleCheck(this._completed);
    });

    this.checkboxEl.addEventListener("change", () => {
      this._data.completed = !this._data.completed;
    });
  }

  generateCheckboxEl() {
    this.checkboxEl = this.todoElement.querySelector(".todo__completed");
    this.todoLabel = this.todoElement.querySelector(".todo__label");
    this.checkboxEl.checked = this._completed;
    this.checkboxEl.id = `todo-${this._id}`;
    this.todoLabel.setAttribute("for", this.checkboxEl.id);
    return this.checkboxEl;
  }

  getView() {
    this.todoElement = this.templateElement.content
      .querySelector(".todo")
      .cloneNode(true);

    const todoNameEl = this.todoElement.querySelector(".todo__name");
    this.todoDeleteBtn = this.todoElement.querySelector(".todo__delete-btn");

    todoNameEl.textContent = this._data.name;

    this.generateDueDateEl();
    this.generateCheckboxEl();
    this._setEventListeners();

    return this.todoElement;
  }
}

export default Todo;
