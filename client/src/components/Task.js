import React from 'react'
import { useDispatch } from 'react-redux'
import { deleteTaskA, updateTask } from '../features/tasks/taskSlice'

import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { BiSquareRounded } from "react-icons/bi"
import { FiCheckSquare } from "react-icons/fi"
import { MdDelete } from "react-icons/md"
//RiDeleteBack2Fill

const Task = ({ task }) => {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const handlechecked = (task) => {
        const completed = !task.completed
        dispatch(updateTask({ ...task, completed: completed }))
    }

    const handleDelete = (task) => {
        toast(
            (t) => (
                <div>
                    <p className="text-white">
                        Quieres borrar la tarea <strong>{task.title}</strong>?
                    </p>
                    <div className="flex justify-between items-center">
                        <button
                            className="bg-red-500 hover:bg-red-400 px-3 py-2 text-sm text-white rounded-sm mx-2"
                            onClick={(e) => {
                                dispatch(deleteTaskA(task))
                                toast.dismiss(t.id);
                            }}
                        >
                            Borrar
                        </button>

                        <button
                            className="bg-slate-400 hover:bg-slate-500 px-3 py-2 text-white rounded-sm mx-2"
                            onClick={() => toast.dismiss(t.id)}
                        >
                            Cancelar
                        </button>
                    </div>
                </div>
            ),
            {
                id: 'delete',
                duration: 4000,
                style: {
                    background: "#202020"
                }
            }
        );
    };

    return (
        <div className="bg-zinc-800 text-white rounded-md shadow-md shadow-black hover:bg-zinc-700 "
            key={task.id}
        >
            <div className="px-4 py-7">

                <div className="flex justify-between items-center">
                    <h3 className="text-md font-semibold hover:cursor-pointer"
                        onClick={() => navigate(`/edit-task/${task.id}`)}
                    >{task.title}</h3>

                </div>
                <p className="text-gray-400 hover:cursor-pointer"
                    onClick={() => navigate(`/edit-task/${task.id}`)}
                >{task.description}</p>
                <div className="flex justify-between items-center">
                    <label className="inline-flex items-center hover:cursor-pointer" onClick={() => handlechecked(task)} >
                        {task.completed
                            ?

                            <FiCheckSquare onClick={() => handlechecked(task)}
                                className="w-5 h-5 text-green-200 " />
                            :
                            <BiSquareRounded onClick={() => handlechecked(task)}
                                className="w-5 h-5 text-green-200 " />
                        }
                        <span className="ml-2 text-xs text-slate-400">Hecho</span>
                    </label>
                    <MdDelete onClick={(e) => {
                    e.stopPropagation();
                    handleDelete(task);
                }}
                    className="w-6 h-6 text-red-400 hover:cursor-pointer " />
                </div>

            </div>


        </div>
    )
}

export default Task