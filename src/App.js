import { collection, onSnapshot, query, QuerySnapshot, updateDoc, doc, addDoc, deleteDoc } from 'firebase/firestore';
import React, { useState, useEffect } from 'react'
import { TiPlusOutline } from 'react-icons/ti'
import Todo from './components/Todo';
import { db } from './firebase';

const style = {
  bg: `h-screen w-screen p-4 bg-gradient-to-r from-[#2F80ED] to-[#1CB5E0]`,
  container: `bg-slate-100 max-w-[500px] w-full m-auto rounded shadow-xl p-4`,
  heading: `text-3xl font-bold text-center text-gray-800 p-2`,
  form: `flex justify-between`,
  input: `border p-2 w-full text-xl`,
  button: `border p-2 ml-2 bg-blue-600 text-slate-100`,
  count: `text-center p-2`
}

function App() {

  const [todos, setTodos] = useState([])
  const [input, setInput] = useState('')

  // create todo
  const createTodo = async (e) => {
    e.preventDefault(e)
    if (input === '') {
      alert('please enter a valid todo')
      return
    }
    await addDoc(collection(db, 'todos'), {
      text: input,
      completed: false,
    })
    setInput('')
  }

  // read todo
  useEffect(() => {
    const q = query(collection(db, 'todos'))
    const unsubscribe = onSnapshot(q, (QuerySnapshot) => {
      let todosArray = []
      QuerySnapshot.forEach((doc) => {
        todosArray.push({ ...doc.data(), id: doc.id })
      })
      setTodos(todosArray)
    })
    return () => unsubscribe
  }, [])


  // update todo
  const toggleComplete = async (todo) => {
    await updateDoc(doc(db, 'todos', todo.id), {
      completed: !todo.completed
    })
  }

  // delete todo
  const deleteTodo = async (id) => {
    await deleteDoc(doc(db, 'todos', id))
  }

  return (
    <div className={style.bg}>
      <div className={style.container}>
        <h3 className={style.heading}>Todo App</h3>
        <form onSubmit={createTodo} className={style.form}>
          <input value={input} onChange={(e) => setInput(e.target.value)} className={style.input} type="text" placeholder='Add todo' />
          <button className={style.button}><TiPlusOutline size={30} /></button>
        </form>
        <ul>
          {todos.map((todo, index) => (
            <Todo key={index} todo={todo} toggleComplete={toggleComplete} deleteTodo={deleteTodo} />
          ))}
        </ul>
        {todos.length < 1 ? null :
          <p className={style.count}>{`You have ${todos.length} todos`}</p>
        }

      </div>
    </div>
  );
}

export default App;
