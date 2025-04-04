"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function PreviewPage() {
  const [tasks, setTasks] = useState([
    { id: 1, title: "Learn React", category: "study", dueDate: "2023-05-15", priority: "high", completed: false },
    { id: 2, title: "Build a project", category: "work", dueDate: "2023-05-20", priority: "medium", completed: false },
  ])
  const [newTask, setNewTask] = useState({ title: "", category: "work", dueDate: "", priority: "medium" })
  const [editingId, setEditingId] = useState(null)

  const addTask = () => {
    if (!newTask.title) return

    const task = {
      id: Date.now(),
      title: newTask.title,
      category: newTask.category,
      dueDate: newTask.dueDate,
      priority: newTask.priority,
      completed: false,
    }

    setTasks([...tasks, task])
    setNewTask({ title: "", category: "work", dueDate: "", priority: "medium" })
  }

  const deleteTask = (id : number) => {
    setTasks(tasks.filter((task) => task.id !== id))
  }

  const toggleComplete = (id : number) => {
    setTasks(tasks.map((task) => (task.id === id ? { ...task, completed: !task.completed } : task)))
  }

  const startEditing = (task : any) => {
    setEditingId(task.id)
    setNewTask({
      title: task.title,
      category: task.category,
      dueDate: task.dueDate,
      priority: task.priority,
    })
  }

  const updateTask = () => {
    setTasks(tasks.map((task) => (task.id === editingId ? { ...task, ...newTask } : task)))
    setEditingId(null)
    setNewTask({ title: "", category: "work", dueDate: "", priority: "medium" })
  }

  return (
    <div className="min-h-screen bg-[#121212] text-[#e0e0e0]">
      <div className="container mx-auto py-6 px-4">
        <div className="flex items-center mb-6">
          <Link href="/code" className="text-gray-400 hover:text-gray-200 flex items-center mr-4">
            <ArrowLeft className="h-4 w-4 mr-1" /> Back to Code
          </Link>
          <h1 className="text-2xl font-bold text-[#bb86fc]">Live Preview</h1>
        </div>

        <Card className="bg-[#1e1e1e] border-gray-800 p-6 mb-6">
          <div className="max-w-[900px] mx-auto">
            <header className="text-center mb-6">
              <h1 className="text-[#bb86fc] text-3xl font-bold">Task Manager</h1>
            </header>

            <div className="bg-[#1e1e1e] rounded-lg p-6 mb-6 shadow-lg">
              <h2 className="text-[#bb86fc] text-xl mb-4">{editingId ? "Edit Task" : "Add New Task"}</h2>
              <div className="mb-4">
                <input
                  type="text"
                  placeholder="Task title"
                  className="w-full p-3 bg-[#2a2a2a] border border-[#333] rounded-md text-[#e0e0e0]"
                  value={newTask.title}
                  onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div>
                  <label className="block mb-2 font-medium">Category</label>
                  <select
                    className="w-full p-3 bg-[#2a2a2a] border border-[#333] rounded-md text-[#e0e0e0]"
                    value={newTask.category}
                    onChange={(e) => setNewTask({ ...newTask, category: e.target.value })}
                  >
                    <option value="work">Work</option>
                    <option value="personal">Personal</option>
                    <option value="study">Study</option>
                  </select>
                </div>

                <div>
                  <label className="block mb-2 font-medium">Due Date</label>
                  <input
                    type="date"
                    className="w-full p-3 bg-[#2a2a2a] border border-[#333] rounded-md text-[#e0e0e0]"
                    value={newTask.dueDate}
                    onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
                  />
                </div>

                <div>
                  <label className="block mb-2 font-medium">Priority</label>
                  <select
                    className="w-full p-3 bg-[#2a2a2a] border border-[#333] rounded-md text-[#e0e0e0]"
                    value={newTask.priority}
                    onChange={(e) => setNewTask({ ...newTask, priority: e.target.value })}
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>
              </div>

              {editingId ? (
                <div className="flex gap-3">
                  <Button className="bg-[#9c27b0] hover:bg-[#6a0dad] text-white" onClick={updateTask}>
                    Update Task
                  </Button>
                  <Button
                    variant="outline"
                    className="bg-[#555] hover:bg-[#444] text-white"
                    onClick={() => setEditingId(null)}
                  >
                    Cancel
                  </Button>
                </div>
              ) : (
                <Button className="bg-[#9c27b0] hover:bg-[#6a0dad] text-white" onClick={addTask}>
                  Add Task
                </Button>
              )}
            </div>

            <div className="bg-[#1e1e1e] rounded-lg p-6 shadow-lg">
              <h2 className="text-[#bb86fc] text-xl mb-4">Your Tasks</h2>
              {tasks.length === 0 ? (
                <p className="text-center text-gray-500 py-4">No tasks yet. Add some!</p>
              ) : (
                <div className="space-y-4">
                  {tasks.map((task) => (
                    <div
                      key={task.id}
                      className={`bg-[#2a2a2a] rounded-md p-4 flex flex-col md:flex-row justify-between border-l-4 ${
                        task.priority === "high"
                          ? "border-[#f44336]"
                          : task.priority === "medium"
                            ? "border-[#ff9800]"
                            : "border-[#4caf50]"
                      } ${task.completed ? "opacity-70" : ""}`}
                    >
                      <div className="mb-3 md:mb-0">
                        <div className="flex items-center mb-2">
                          <h3 className={`font-medium mr-3 ${task.completed ? "line-through" : ""}`}>{task.title}</h3>
                          <span className="bg-[#6a0dad] text-white text-xs px-2 py-1 rounded">{task.category}</span>
                        </div>
                        <div className="text-sm text-gray-400 flex gap-4">
                          <span>Due: {task.dueDate || "No date"}</span>
                          <span>Priority: {task.priority}</span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          className="bg-[#4caf50] hover:bg-[#3d8b40] text-white"
                          onClick={() => toggleComplete(task.id)}
                        >
                          {task.completed ? "Undo" : "Complete"}
                        </Button>
                        <Button
                          size="sm"
                          className="bg-[#ff9800] hover:bg-[#e68900] text-white"
                          onClick={() => startEditing(task)}
                          disabled={task.completed}
                        >
                          Edit
                        </Button>
                        <Button
                          size="sm"
                          className="bg-[#f44336] hover:bg-[#d32f2f] text-white"
                          onClick={() => deleteTask(task.id)}
                        >
                          Delete
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}

