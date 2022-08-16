import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import Task from './Task'
import { doneTasksSet, selectAllTasks, getTasksStatus, getTasksError } from '../features/tasks/taskSlice'
import { BiSquareRounded } from "react-icons/bi"
import { FiCheckSquare } from "react-icons/fi"


const TaskList = () => {

  const tasks = useSelector(selectAllTasks)
  const postStatus = useSelector(getTasksStatus);
  const error = useSelector(getTasksError);
  const doneTasks = useSelector(state => state.tasks.doneTasks)
  const dispatch = useDispatch()

  let content;
  if (postStatus === 'loading') {
    content = <p>"Loading..."</p>;
  } else if (postStatus === 'succeeded') {
    content = <p>"succeeded..."</p>;
    content = doneTasks
      ?
      tasks.map((task) => (
        <Task key={task.id} task={task} />
      ))
      :
      tasks.map((task) => (task.completed === false &&
        <Task key={task.id} task={task} />
      ))
  } else if (postStatus === 'failed') {
    content = <p>{error}</p>;
  }

  return (
    <main >
      <header className="flex justify-between items-center my-4">
        <h1 className="text-2xl text-gray-300 font-bold">Mis tareas </h1>
        <Link to={'/create-task'}
          className="bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-500"
        >Crear Tarea</Link>
      </header>
      <div className="flex justify-between items-center my-4">
        <label className="inline-flex items-center" onClick={() => dispatch(doneTasksSet(!doneTasks))} >
          {/* <input type="checkbox" className="form-checkbox"
            checked={doneTasks}
            onChange={() => dispatch(doneTasksSet(!doneTasks))} /> */}
            {doneTasks
                    ?
                    <FiCheckSquare  
                    className="w-5 h-5 text-indigo-200 " />
                    :
                    <BiSquareRounded   
                    className="w-5 h-5 text-indigo-200 " />
                  }
          <span className="ml-2 text-xs text-slate-400">{`Mostrar todas (${tasks.length})`}</span>
        </label>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {
          content
        }
      </div>
    </main>
  )
}

export default TaskList