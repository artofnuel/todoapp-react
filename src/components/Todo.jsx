import React from 'react'
import { FaRegTrashAlt } from 'react-icons/fa'

const style = {
    li: `flex justify-between items-center bg-[#000000] p-4 my-2 capitalize rounded text-white`,
    licomplete: `flex justify-between items-center bg-white p-4 my-2 capitalize rounded text-[#000000]`,
    row: `flex items-center justify-start w-full h-full`,
    text: `m-2 cursor-pointer text-white`,
    textcomplete: `m-2 cursor-pointer line-through`,
    button: `cursor-pointer flex items-center `

}

const Todo = ({ todo, toggleComplete, deleteTodo }) => {
    return (
        <li className={todo.completed ? style.licomplete : style.li}>
            <div className={style.row}>
                <input onChange={() => toggleComplete(todo)} type="checkbox" checked={todo.completed ? 'checked' : ''} />
                <p onClick={() => toggleComplete(todo)} className={todo.completed ? style.textcomplete : style.text}>{todo.text}</p>
            </div>
            <button onClick={() => deleteTodo(todo.id)}><FaRegTrashAlt /></button>
        </li>
    )
}

export default Todo