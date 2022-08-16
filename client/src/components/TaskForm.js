import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updateTask, addNewTask } from '../features/tasks/taskSlice'
import { v4 as uuid } from 'uuid'
import { useParams, useNavigate, Link } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

import { BiSquareRounded } from "react-icons/bi";
import { FiCheckSquare } from "react-icons/fi"

const TaskForm = () => {

  const dispatch = useDispatch()
  const params = useParams()
  const tasks = useSelector(state => state.tasks.tasks)
  const navigate = useNavigate()

  useEffect(() => {

    if (params.id) {
      setTask(tasks.find(task => task.id === params.id))
    }

  }, [params, tasks])


  const [task, setTask] = useState({
    title: '',
    description: '',
    completed: false,
  })

  return (

    <div className="flex items-center justify-center">
      <div className="bg-zinc-800 p-10 shadow-md shadow-black">
        <header className="flex justify-between items-center py-4 text-white">
          <h3 className="text-xl">Tarea</h3>
          <Link to="/" className="text-gray-400 text-sm hover:text-gray-300">
            Volver
          </Link>
        </header>
        <Formik
          initialValues={task}
          enableReinitialize
          validationSchema={Yup.object({
            title: Yup.string().required("El título es requerido").max(10,'maximo 10 caracteres').min(3,'minimo 3 caracteres'),
            description: Yup.string().required("Descripción es requerido").max(200,'maximo 200 caracteres').min(3,'minimo 3 caracteres'),
          })}
          onSubmit={async (values, actions) => {
            if (params.id) {
              dispatch(updateTask({ ...values, id: params.id }))
            } else {
              dispatch(addNewTask({ ...values, id: uuid(), completed: false }))
            }
            actions.resetForm();
            actions.setSubmitting(false);
            navigate("/");
          }}
        >
          {({ isSubmitting, handleSubmit }) => (
            <Form onSubmit={handleSubmit}>
              <label
                htmlFor="title"
                className="text-sm block font-bold mb-2 text-gray-400"
              >
                Título
              </label>
              <Field
                className="px-3 py-2 focus:outline-none rounded bg-gray-600 text-white w-full"
                placeholder="Título de la tarea"
                name="title"
                

              // autoFocus
              />
              <ErrorMessage
                component="p"
                name="title"
                className="text-red-400 text-sm"
              />

              <label
                htmlFor="description"
                className="text-sm block font-bold mb-2 text-gray-400"
              >
                Descripción
              </label>
              <Field
                component="textarea"
                name="description"
                id="description"
                placeholder="escribe una descripción"
                rows="3"
                className="px-3 py-2 focus:outline-none rounded bg-gray-600 text-white w-full"
              />
              <ErrorMessage
                component="p"
                name="description"
                className="text-red-400 text-sm"
              />
              <label
                htmlFor="description"
                className="text-sm block font-bold mb-2 text-gray-400"
              >
                Estado
              </label>
              <div>
                <label className="inline-flex items-center"
                onClick={(e)=> setTask({ ...task, completed: !task.completed })}>
                  {task.completed
                    ?
                    <FiCheckSquare  
                    className="w-5 h-5 text-green-200 " />
                    :
                    <BiSquareRounded   
                    className="w-5 h-5 text-green-200 " />
                  }
                  <span className="ml-2 text-xs text-slate-400">Hecho</span>
                </label>
              </div>
              <div className="flex justify-between items-center my-4">
                <button
                  type="submit"
                  className="bg-indigo-600 hover:bg-indigo-500 px-4 py-2 rounded mt-2 text-white focus:outline-none disabled:bg-indigo-400"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <AiOutlineLoading3Quarters className="animate-spin h-5 w-5" />
                  ) : (
                    "Guardar"
                  )}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  )
}

export default TaskForm