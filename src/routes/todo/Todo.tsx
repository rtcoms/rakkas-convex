import { useQueryClient, useServerSideMutation } from "rakkasjs";
import { useState, FC } from "react";
import { deleteTodo, TodoItem, updateTodo } from "src/crud";
import css from "./Todo.module.css";

export interface TodoProps {
  todo: TodoItem;
}

export const Todo: FC<TodoProps> = ({ todo }) => {
  const [state, setState] = useState({ text: todo.text, editing: false });
  const { id } = todo;

  const client = useQueryClient();

  const { mutate: update } = useServerSideMutation(
    async (_, item: Partial<TodoItem>) => {
      return updateTodo(id, item as TodoItem);
    },
    {
      onSuccess() {
        client.invalidateQueries("todos");
      },
    },
  );

  const { mutate: remove } = useServerSideMutation(
    async () => {
      await deleteTodo(id);
    },
    {
      onSuccess() {
        client.invalidateQueries("todos");
      },
    },
  );

  return (
    <li className={css.item} key={todo.id}>
      {!state.editing && (
        <label>
          <input
            type="checkbox"
            checked={todo.done}
            onChange={(e) => update({ done: e.target.checked })}
          />{" "}
          <span className={todo.done ? css.done : undefined}>{todo.text}</span>{" "}
        </label>
      )}

      {state.editing && (
        <input
          className={css.input}
          autoFocus
          value={state.text}
          onChange={(e) => setState({ text: e.target.value, editing: true })}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              setState({ text: todo.text, editing: false });
              update({ text: state.text });
            } else if (e.key === "Escape") {
              setState({ text: todo.text, editing: false });
            }
          }}
        />
      )}

      <span className={css.buttons}>
        {!todo.done && !state.editing && (
          <button
            type="button"
            onClick={() => setState({ text: todo.text, editing: true })}
          >
            Edit
          </button>
        )}

        {todo.done && (
          <button type="button" onClick={() => remove()}>
            Delete
          </button>
        )}

        {state.editing && state.text !== todo.text && (
          <button
            type="button"
            onClick={async () => {
              setState({ text: todo.text, editing: false });
              update({ text: state.text });
            }}
          >
            Save
          </button>
        )}

        {state.editing && (
          <button
            type="button"
            onClick={() => setState({ text: todo.text, editing: false })}
          >
            Cancel
          </button>
        )}
      </span>
    </li>
  );
};
