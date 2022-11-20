import { collection, onSnapshot, query, QuerySnapshot, updateDoc, doc, addDoc, deleteDoc } from 'firebase/firestore';
import React, { useState, useEffect } from 'react'
import { BsGithub, BsLinkedin, BsPlusSquare, BsTwitter } from 'react-icons/bs'
import { MdOutlineComputer } from 'react-icons/md'
import Todo from './components/Todo';
import { db } from './firebase';
import Fade from 'react-reveal/Fade';

const style = {
  bg: `w-full h-full flex justify-center items-center p-4 bg-[#000000]`,
  container: `max-w-[500px] w-full m-auto rounded shadow-xl my-16 p-4 py-8 bg-[#14213d] `,
  heading: `text-4xl font-bold text-center text-[#fca311] p-2 mb-6`,
  form: `flex justify-between`,
  input: `p-2 pl-4 w-full text-xl bg-white text-[#000000] rounded outline-none text-white`,
  button: `p-2 ml-2 text-[#ffffff]`,
  count: `text-center p-2 text-white`,
  socials: `cursor-pointer flex justify-center items-center pt-7 space-x-8 text-2xl text-[#ffffff]`,
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
        <h3 className={style.heading}>My Todo List</h3>
        <form onSubmit={createTodo} className={style.form}>
          <input value={input} onChange={(e) => setInput(e.target.value)} className={style.input} type="text" placeholder='Add todo' />
          <button className={style.button}><BsPlusSquare size={30} /></button>
        </form>
        <ul>
          {todos.map((todo, index) => (
            <Todo key={index} todo={todo} toggleComplete={toggleComplete} deleteTodo={deleteTodo} />
          ))}
        </ul>
        {todos.length < 1 ? null :
          todos.length === 1 ? <p className={style.count}>{`You have ${todos.length} todo`}</p>
            : <p className={style.count}>{`You have ${todos.length} todos`}</p>
        }
        <Fade bottom cascade>
          <div className={style.socials}>
            <a href="https://github.com/artofnuel"><BsGithub /></a>
            <a href="https://aon-portfolio.vercel.app/"><MdOutlineComputer /></a>
            <a href="https://www.linkedin.com/in/emmanuelinua"><BsLinkedin /></a>
            <a href="https://twitter.com/artofnuel"><BsTwitter /></a>
          </div>
        </Fade>
      </div>
    </div>
  );
}

export default App;
