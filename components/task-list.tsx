"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Trash2, TagIcon } from "lucide-react"

interface Task {
  id: string
  title: string
  completed: boolean
  tags: string[]
  priority?: "low" | "medium" | "high"
}

interface TaskListProps {
  theme: "barbie" | "kawaii" | "pookie"
  onTaskComplete?: () => void
}

export function TaskList({ theme, onTaskComplete }: TaskListProps) {
  const [tasks, setTasks] = useState<Task[]>([
    { id: "1", title: "Complete project proposal", completed: false, tags: ["work", "urgent"], priority: "high" },
    { id: "2", title: "Buy groceries", completed: false, tags: ["personal"], priority: "medium" },
    { id: "3", title: "Schedule dentist appointment", completed: true, tags: ["health"], priority: "low" },
  ])

  const [newTaskTitle, setNewTaskTitle] = useState("")
  const [selectedTag, setSelectedTag] = useState<string>("no-tag")
  const [selectedPriority, setSelectedPriority] = useState<"low" | "medium" | "high" | "none">("none")
  const [newTag, setNewTag] = useState("")
  const [showTagInput, setShowTagInput] = useState<string | null>(null)
  const [filter, setFilter] = useState<"all" | "active" | "completed">("all")

  const themeColor = theme === "barbie" ? "pink" : theme === "kawaii" ? "purple" : "blue"

  const availableTags = Array.from(new Set(tasks.flatMap((task) => task.tags))).sort()

  const addTask = () => {
    if (newTaskTitle.trim() === "") return

    const newTask: Task = {
      id: Date.now().toString(),
      title: newTaskTitle,
      completed: false,
      tags: selectedTag !== "no-tag" ? [selectedTag] : [],
      priority: selectedPriority !== "none" ? selectedPriority : undefined,
    }

    setTasks([...tasks, newTask])
    setNewTaskTitle("")
    setSelectedTag("no-tag")
    setSelectedPriority("none")
  }

  const toggleTaskCompletion = (id: string) => {
    setTasks(
      tasks.map((task) => {
        if (task.id === id) {
          const newCompleted = !task.completed

          // Call the onTaskComplete callback if provided and task is being completed
          if (newCompleted && onTaskComplete) {
            onTaskComplete()
          }

          return { ...task, completed: newCompleted }
        }
        return task
      }),
    )
  }

  const deleteTask = (id: string) => {
    setTasks(tasks.filter((task) => task.id !== id))
  }

  const addTagToTask = (taskId: string, tag: string) => {
    if (!tag.trim()) return

    setTasks(
      tasks.map((task) =>
        task.id === taskId && !task.tags.includes(tag) ? { ...task, tags: [...task.tags, tag] } : task,
      ),
    )

    setNewTag("")
    setShowTagInput(null)
  }

  const removeTagFromTask = (taskId: string, tagToRemove: string) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, tags: task.tags.filter((tag) => tag !== tagToRemove) } : task,
      ),
    )
  }

  const getTagColor = (tag: string) => {
    const tagColors: Record<string, string> = {
      work: "blue",
      personal: "green",
      urgent: "red",
      health: "purple",
    }

    return tagColors[tag] || "gray"
  }

  const getPriorityColor = (priority?: "low" | "medium" | "high") => {
    switch (priority) {
      case "high":
        return "red"
      case "medium":
        return "yellow"
      case "low":
        return "green"
      default:
        return "gray"
    }
  }

  const filteredTasks = tasks.filter((task) => {
    if (filter === "all") return true
    if (filter === "active") return !task.completed
    if (filter === "completed") return task.completed
    return true
  })

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-2">
        <div className="flex-1">
          <Input
            placeholder="Add a new task..."
            value={newTaskTitle}
            onChange={(e) => setNewTaskTitle(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addTask()}
            className={`border-${themeColor}-200 focus-visible:ring-${themeColor}-500 rounded-xl font-quicksand`}
          />
        </div>

        <div className="flex gap-2">
          <Select value={selectedTag} onValueChange={setSelectedTag}>
            <SelectTrigger className={`w-[100px] border-${themeColor}-200 rounded-xl`}>
              <SelectValue placeholder="Tag" />
            </SelectTrigger>
            <SelectContent className="rounded-xl">
              <SelectItem value="no-tag" className="font-quicksand">
                No tag
              </SelectItem>
              {availableTags.map((tag) => (
                <SelectItem key={tag} value={tag} className="font-quicksand">
                  {tag}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={selectedPriority} onValueChange={(value) => setSelectedPriority(value as any)}>
            <SelectTrigger className={`w-[100px] border-${themeColor}-200 rounded-xl`}>
              <SelectValue placeholder="Priority" />
            </SelectTrigger>
            <SelectContent className="rounded-xl">
              <SelectItem value="none" className="font-quicksand">
                None
              </SelectItem>
              <SelectItem value="low" className="font-quicksand">
                Low
              </SelectItem>
              <SelectItem value="medium" className="font-quicksand">
                Medium
              </SelectItem>
              <SelectItem value="high" className="font-quicksand">
                High
              </SelectItem>
            </SelectContent>
          </Select>

          <Button
            onClick={addTask}
            className={`rounded-full bg-gradient-to-r ${
              theme === "barbie"
                ? "from-pink-400 to-pink-600"
                : theme === "kawaii"
                  ? "from-purple-400 to-purple-600"
                  : "from-blue-400 to-blue-600"
            } shadow-md hover:shadow-lg transition-all duration-300`}
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="flex justify-between items-center">
        <div className="flex gap-1">
          <Button
            variant={filter === "all" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilter("all")}
            className={`rounded-full text-xs h-7 ${
              filter === "all"
                ? `bg-${themeColor}-500 hover:bg-${themeColor}-600`
                : `border-${themeColor}-200 text-${themeColor}-600 hover:bg-${themeColor}-50`
            }`}
          >
            All
          </Button>
          <Button
            variant={filter === "active" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilter("active")}
            className={`rounded-full text-xs h-7 ${
              filter === "active"
                ? `bg-${themeColor}-500 hover:bg-${themeColor}-600`
                : `border-${themeColor}-200 text-${themeColor}-600 hover:bg-${themeColor}-50`
            }`}
          >
            Active
          </Button>
          <Button
            variant={filter === "completed" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilter("completed")}
            className={`rounded-full text-xs h-7 ${
              filter === "completed"
                ? `bg-${themeColor}-500 hover:bg-${themeColor}-600`
                : `border-${themeColor}-200 text-${themeColor}-600 hover:bg-${themeColor}-50`
            }`}
          >
            Completed
          </Button>
        </div>

        <span className="text-sm text-muted-foreground font-quicksand">
          {tasks.filter((t) => t.completed).length}/{tasks.length} completed
        </span>
      </div>

      <div className="space-y-3 mt-2">
        <AnimatePresence>
          {filteredTasks.map((task) => (
            <motion.div
              key={task.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className={`flex items-center justify-between p-4 rounded-xl border-2 ${
                task.completed ? "bg-gray-50" : `bg-${themeColor}-50/30`
              } ${
                theme === "barbie" ? "border-pink-200" : theme === "kawaii" ? "border-purple-200" : "border-blue-200"
              } shadow-sm hover:shadow-md transition-all duration-300`}
            >
              <div className="flex items-center gap-3 flex-1">
                <Checkbox
                  checked={task.completed}
                  onCheckedChange={() => toggleTaskCompletion(task.id)}
                  className={`rounded-full ${task.completed ? `bg-${themeColor}-500 border-${themeColor}-500` : ""}`}
                />
                <div className="flex flex-col">
                  <span className={`${task.completed ? "line-through text-gray-400" : ""} font-quicksand`}>
                    {task.title}
                  </span>
                  {task.priority && (
                    <div className="flex items-center gap-1 mt-1">
                      <div className={`h-2 w-2 rounded-full bg-${getPriorityColor(task.priority)}-500`}></div>
                      <span className="text-xs text-muted-foreground capitalize">{task.priority} priority</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-2">
                <div className="flex flex-wrap gap-1 max-w-[150px]">
                  {task.tags.map((tag) => (
                    <Badge
                      key={tag}
                      variant="outline"
                      className={`bg-${getTagColor(tag)}-100 text-${getTagColor(tag)}-700 border-${getTagColor(tag)}-200 hover:bg-${getTagColor(tag)}-200 rounded-full font-quicksand`}
                    >
                      {tag}
                      <button onClick={() => removeTagFromTask(task.id, tag)} className="ml-1 hover:text-red-500">
                        ×
                      </button>
                    </Badge>
                  ))}
                </div>

                {showTagInput === task.id ? (
                  <div className="flex items-center gap-1">
                    <Input
                      value={newTag}
                      onChange={(e) => setNewTag(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && addTagToTask(task.id, newTag)}
                      placeholder="Add tag"
                      className="h-7 w-20 text-xs rounded-full font-quicksand"
                    />
                    <Button
                      size="sm"
                      variant="ghost"
                      className="h-7 w-7 p-0 rounded-full"
                      onClick={() => addTagToTask(task.id, newTag)}
                    >
                      <Plus className="h-3 w-3" />
                    </Button>
                  </div>
                ) : (
                  <Button
                    size="sm"
                    variant="ghost"
                    className="h-7 w-7 p-0 rounded-full"
                    onClick={() => setShowTagInput(task.id)}
                  >
                    <TagIcon className="h-3 w-3" />
                  </Button>
                )}

                <Button
                  size="sm"
                  variant="ghost"
                  className="h-7 w-7 p-0 hover:text-red-500 rounded-full"
                  onClick={() => deleteTask(task.id)}
                >
                  <Trash2 className="h-3 w-3" />
                </Button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {filteredTasks.length === 0 && (
          <div className="text-center py-8 text-gray-500 font-quicksand">
            {filter === "all"
              ? "No tasks yet. Add one above!"
              : filter === "active"
                ? "No active tasks. All done!"
                : "No completed tasks yet."}
          </div>
        )}
      </div>
    </div>
  )
}

