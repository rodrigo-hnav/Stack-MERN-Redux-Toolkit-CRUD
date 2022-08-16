
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList'
import { Toaster } from "react-hot-toast";


function App() {
  

  return (
    <div className="bg-neutral-900 min-h-screen flex items-center">
    <div className="px-10 container m-auto py-4">
        <BrowserRouter>
          <Routes>
            <Route path='/create-task' element={<TaskForm />} />
            <Route path='/edit-task/:id' element={<TaskForm />} />
            <Route path='/' element={<TaskList />} />
          </Routes>
          <Toaster />
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
