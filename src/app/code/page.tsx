"use client"

import { useState, useEffect, useMemo } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Skeleton } from "@/components/ui/skeleton"
import { Copy, Download, RefreshCw, Play, ArrowLeft } from "lucide-react"
import Link from "next/link"
import CodeEditor from "@/components/CodeEditor"
import FileTree from "@/components/FileTree"
import { generateCode } from "@/lib/actions"
import { toast } from "sonner"

export default function CodePage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const prompt = searchParams.get("prompt")
  const projectType = searchParams.get("projectType") || "react"

  const [isGenerating, setIsGenerating] = useState(true)
  const [generatedFiles, setGeneratedFiles] = useState<{ [key: string]: string }>({})
  const [activeFile, setActiveFile] = useState<string>("")
  const [activeTab, setActiveTab] = useState("code")

  // Memoize file list to prevent unnecessary re-renders
  const fileList = useMemo(() => Object.keys(generatedFiles), [generatedFiles])

  useEffect(() => {
    if (!prompt) {
      router.push("/")
      return
    }

    const generate = async () => {
      try {
        setIsGenerating(true)
        // In a real app, this would call an API endpoint
        const result = await generateCode(prompt, projectType)

        // Simulate API response
        setTimeout(() => {
          const files = {
            "App.js": `import React, { useState } from 'react';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([
    { id: 1, title: 'Learn React', category: 'study', dueDate: '2023-05-15', priority: 'high', completed: false },
    { id: 2, title: 'Build a project', category: 'work', dueDate: '2023-05-20', priority: 'medium', completed: false },
  ]);
  const [newTask, setNewTask] = useState({ title: '', category: 'work', dueDate: '', priority: 'medium' });
  const [editingId, setEditingId] = useState(null);

  const addTask = () => {
    if (!newTask.title) return;
    
    const task = {
      id: Date.now(),
      title: newTask.title,
      category: newTask.category,
      dueDate: newTask.dueDate,
      priority: newTask.priority,
      completed: false
    };
    
    setTasks([...tasks, task]);
    setNewTask({ title: '', category: 'work', dueDate: '', priority: 'medium' });
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const toggleComplete = (id) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const startEditing = (task) => {
    setEditingId(task.id);
    setNewTask({
      title: task.title,
      category: task.category,
      dueDate: task.dueDate,
      priority: task.priority
    });
  };

  const updateTask = () => {
    setTasks(tasks.map(task => 
      task.id === editingId ? { ...task, ...newTask } : task
    ));
    setEditingId(null);
    setNewTask({ title: '', category: 'work', dueDate: '', priority: 'medium' });
  };

  return (
    <div className="app">
      <header>
        <h1>Task Manager</h1>
      </header>
      
      <div className="task-form">
        <h2>{editingId ? 'Edit Task' : 'Add New Task'}</h2>
        <div className="form-group">
          <input
            type="text"
            placeholder="Task title"
            value={newTask.title}
            onChange={(e) => setNewTask({...newTask, title: e.target.value})}
          />
        </div>
        
        <div className="form-row">
          <div className="form-group">
            <label>Category</label>
            <select
              value={newTask.category}
              onChange={(e) => setNewTask({...newTask, category: e.target.value})}
            >
              <option value="work">Work</option>
              <option value="personal">Personal</option>
              <option value="study">Study</option>
            </select>
          </div>
          
          <div className="form-group">
            <label>Due Date</label>
            <input
              type="date"
              value={newTask.dueDate}
              onChange={(e) => setNewTask({...newTask, dueDate: e.target.value})}
            />
          </div>
          
          <div className="form-group">
            <label>Priority</label>
            <select
              value={newTask.priority}
              onChange={(e) => setNewTask({...newTask, priority: e.target.value})}
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
        </div>
        
        {editingId ? (
          <div className="button-group">
            <button className="btn update-btn" onClick={updateTask}>Update Task</button>
            <button className="btn cancel-btn" onClick={() => setEditingId(null)}>Cancel</button>
          </div>
        ) : (
          <button className="btn add-btn" onClick={addTask}>Add Task</button>
        )}
      </div>
      
      <div className="task-list">
        <h2>Your Tasks</h2>
        {tasks.length === 0 ? (
          <p className="no-tasks">No tasks yet. Add some!</p>
        ) : (
          tasks.map(task => (
            <div 
              key={task.id} 
              className={\`task-item \${task.completed ? 'completed' : ''} priority-\${task.priority}\`}
            >
              <div className="task-content">
                <div className="task-header">
                  <h3>{task.title}</h3>
                  <span className="category">{task.category}</span>
                </div>
                <div className="task-details">
                  <span className="due-date">Due: {task.dueDate || 'No date'}</span>
                  <span className="priority">Priority: {task.priority}</span>
                </div>
              </div>
              <div className="task-actions">
                <button 
                  className="btn complete-btn"
                  onClick={() => toggleComplete(task.id)}
                >
                  {task.completed ? 'Undo' : 'Complete'}
                </button>
                <button 
                  className="btn edit-btn"
                  onClick={() => startEditing(task)}
                  disabled={task.completed}
                >
                  Edit
                </button>
                <button 
                  className="btn delete-btn"
                  onClick={() => deleteTask(task.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default App;`,
            "App.css": `/* Dark theme with purple accents */
:root {
  --bg-color: #121212;
  --card-bg: #1e1e1e;
  --text-color: #e0e0e0;
  --accent-color: #9c27b0;
  --accent-light: #bb86fc;
  --accent-dark: #6a0dad;
  --success-color: #4caf50;
  --warning-color: #ff9800;
  --danger-color: #f44336;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background-color: var(--bg-color);
  color: var(--text-color);
  line-height: 1.6;
}

.app {
  max-width: 900px;
  margin: 0 auto;
  padding: 2rem 1rem;
}

header {
  text-align: center;
  margin-bottom: 2rem;
}

header h1 {
  color: var(--accent-light);
  font-size: 2.5rem;
}

.task-form, .task-list {
  background-color: var(--card-bg);
  border-radius: 8px;
  padding: 1.5rem;
  margin-bottom: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

h2 {
  margin-bottom: 1rem;
  color: var(--accent-light);
}

.form-group {
  margin-bottom: 1rem;
}

.form-row {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 1rem;
  margin-bottom: 1rem;
}

label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
}

input, select {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #333;
  border-radius: 4px;
  background-color: #2a2a2a;
  color: var(--text-color);
}

input:focus, select:focus {
  outline: none;
  border-color: var(--accent-color);
}

.button-group {
  display: flex;
  gap: 1rem;
}

.btn {
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 600;
  transition: background-color 0.2s;
}

.add-btn, .update-btn {
  background-color: var(--accent-color);
  color: white;
}

.add-btn:hover, .update-btn:hover {
  background-color: var(--accent-dark);
}

.cancel-btn {
  background-color: #555;
  color: white;
}

.cancel-btn:hover {
  background-color: #444;
}

.task-item {
  background-color: #2a2a2a;
  border-radius: 6px;
  padding: 1rem;
  margin-bottom: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-left: 4px solid transparent;
}

.task-item.priority-high {
  border-left-color: var(--danger-color);
}

.task-item.priority-medium {
  border-left-color: var(--warning-color);
}

.task-item.priority-low {
  border-left-color: var(--success-color);
}

.task-item.completed {
  opacity: 0.7;
}

.task-item.completed h3 {
  text-decoration: line-through;
}

.task-content {
  flex: 1;
}

.task-header {
  display: flex;
  align-items: center;
  margin-bottom: 0.5rem;
}

.task-header h3 {
  margin-right: 1rem;
}

.category {
  background-color: var(--accent-dark);
  color: white;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.8rem;
}

.task-details {
  display: flex;
  gap: 1rem;
  font-size: 0.9rem;
  color: #aaa;
}

.task-actions {
  display: flex;
  gap: 0.5rem;
}

.complete-btn {
  background-color: var(--success-color);
  color: white;
  padding: 0.5rem 0.75rem;
  font-size: 0.8rem;
}

.complete-btn:hover {
  background-color: #3d8b40;
}

.edit-btn {
  background-color: var(--warning-color);
  color: white;
  padding: 0.5rem 0.75rem;
  font-size: 0.8rem;
}

.edit-btn:hover {
  background-color: #e68900;
}

.delete-btn {
  background-color: var(--danger-color);
  color: white;
  padding: 0.5rem 0.75rem;
  font-size: 0.8rem;
}

.delete-btn:hover {
  background-color: #d32f2f;
}

.no-tasks {
  text-align: center;
  color: #888;
  padding: 1rem;
}

@media (max-width: 600px) {
  .task-item {
    flex-direction: column;
    align-items: flex-start;
  }
  
  .task-actions {
    margin-top: 1rem;
    align-self: flex-end;
  }
}`,
            "index.js": `import React from 'react';
import ReactDOM from 'react-dom/client';
import './App.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);`,
          }

          setGeneratedFiles(files)
          setActiveFile("App.js")
          setIsGenerating(false)
        }, 3000)
      } catch (error) {
        console.error("Error generating code:", error)
        toast("Error generating code",{
          description: "There was a problem generating your code. Please try again."
        })
        setIsGenerating(false)
      }
    }

    generate()
  }, [prompt, projectType, router])

  const handleCopyCode = () => {
    if (activeFile && generatedFiles[activeFile]) {
      navigator.clipboard.writeText(generatedFiles[activeFile])
      toast("Code copied",{
        description: `${activeFile} copied to clipboard`,
      })
    }
  }

  const handleDownload = () => {
    if (activeFile && generatedFiles[activeFile]) {
      const blob = new Blob([generatedFiles[activeFile]], { type: "text/plain" })
      const url = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = activeFile
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
    }
  }

  const handleRegenerate = () => {
    if (prompt) {
      setIsGenerating(true)
      // In a real app, this would call the API again
      setTimeout(() => {
        setIsGenerating(false)
        toast("Code regenerated",{
          description: "Your code has been regenerated with improvements",
        })
      }, 2000)
    }
  }

  return (
    <main className="min-h-screen">
      <div className="container mx-auto py-6 px-4">
        <div className="flex items-center mb-6">
          <Link href="/" className="text-gray-400 hover:text-gray-200 flex items-center mr-4 transition-colors">
            <ArrowLeft className="h-4 w-4 mr-1" /> Back to Input
          </Link>
          <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-purple-600">
            Generated Code
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-6">
          {/* File Explorer */}
          <div className="order-2 lg:order-1">
            <Card className="bg-gray-900/50 border-gray-800 backdrop-blur-sm h-full">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg text-gray-100">Files</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                {isGenerating ? (
                  <div className="space-y-2">
                    <Skeleton className="h-6 w-full bg-gray-800/50" />
                    <Skeleton className="h-6 w-full bg-gray-800/50" />
                    <Skeleton className="h-6 w-full bg-gray-800/50" />
                  </div>
                ) : (
                  <FileTree files={fileList} activeFile={activeFile} onSelectFile={setActiveFile} />
                )}
              </CardContent>
            </Card>
          </div>

          {/* Code Editor */}
          <div className="order-1 lg:order-2">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <div className="flex justify-between items-center mb-4">
                <TabsList className="bg-gray-800/70 backdrop-blur-sm">
                  <TabsTrigger value="code" className="data-[state=active]:bg-gray-700">
                    Code
                  </TabsTrigger>
                  <TabsTrigger value="preview" className="data-[state=active]:bg-gray-700">
                    Preview
                  </TabsTrigger>
                </TabsList>

                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="bg-gray-800/70 border-gray-700 hover:bg-gray-700 backdrop-blur-sm"
                    onClick={handleCopyCode}
                    disabled={isGenerating || !activeFile}
                  >
                    <Copy className="h-4 w-4 mr-2" />
                    Copy
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="bg-gray-800/70 border-gray-700 hover:bg-gray-700 backdrop-blur-sm"
                    onClick={handleDownload}
                    disabled={isGenerating || !activeFile}
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="bg-gray-800/70 border-gray-700 hover:bg-gray-700 backdrop-blur-sm"
                    onClick={handleRegenerate}
                    disabled={isGenerating}
                  >
                    <RefreshCw className={`h-4 w-4 mr-2 ${isGenerating ? "animate-spin" : ""}`} />
                    Regenerate
                  </Button>
                </div>
              </div>

              <TabsContent value="code" className="mt-0">
                <Card className="bg-gray-900/50 border-gray-800 backdrop-blur-sm">
                  <CardContent className="p-0">
                    {isGenerating ? (
                      <div className="rounded-md overflow-hidden">
                        <Skeleton className="h-[600px] w-full bg-gray-800/50" />
                      </div>
                    ) : (
                      <CodeEditor
                        code={activeFile ? generatedFiles[activeFile] : "// Select a file to view code"}
                        language={
                          activeFile?.endsWith(".js")
                            ? "javascript"
                            : activeFile?.endsWith(".css")
                              ? "css"
                              : "javascript"
                        }
                        fileName={activeFile}
                      />
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="preview" className="mt-0">
                <Card className="bg-gray-900/50 border-gray-800 backdrop-blur-sm">
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-lg text-gray-100">Live Preview</CardTitle>
                    <Button
                      variant="outline"
                      size="sm"
                      className="bg-gray-800/70 border-gray-700 hover:bg-gray-700 backdrop-blur-sm"
                      disabled={isGenerating}
                    >
                      <Play className="h-4 w-4 mr-2" />
                      Run
                    </Button>
                  </CardHeader>
                  <CardContent>
                    {isGenerating ? (
                      <div className="rounded-md overflow-hidden">
                        <Skeleton className="h-[500px] w-full bg-gray-800/50" />
                      </div>
                    ) : (
                      <div className="border border-gray-800 rounded-md overflow-hidden bg-gray-800/70 backdrop-blur-sm">
                        <div className="p-2 bg-gray-900/80 border-b border-gray-800 flex items-center">
                          <div className="flex gap-1.5">
                            <div className="w-3 h-3 rounded-full bg-red-500"></div>
                            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                            <div className="w-3 h-3 rounded-full bg-green-500"></div>
                          </div>
                          <div className="mx-auto text-xs text-gray-400">Preview</div>
                        </div>
                        <div className="h-[500px] overflow-auto p-4">
                          <div className="flex items-center justify-center h-full">
                            <div className="text-center text-gray-400">
                              <p>Preview would render here in a real application</p>
                              <p className="text-sm mt-2">This is a simplified demonstration</p>
                              <Button
                                className="mt-4 bg-purple-600 hover:bg-purple-700"
                                onClick={() => window.open("/preview", "_blank")}
                              >
                                Open in New Window
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </main>
  )
}