import { ColumnType, columns } from '../config/columns'

import Alpine from 'alpinejs'
import { Task } from '../config/tasks'
import { assignees } from '../config/assignees'
import { formatDate } from '../utils/date'

export const planner = () => ({
  assignees,
  columns: Alpine.$persist(columns) as unknown as ColumnType[],
  search: Alpine.$persist('') as unknown as string,
  taskTitle: '',
  taskDate: '',
  taskPriority: 'Low',
  editMode: false,
  showModal: false,
  isDragging: false,
  assigneeId: null as number | null,
  draggingTask: null as Task | null,
  activeDropdown: null as number | null,
  selectedTaskIndex: null as number | null,
  selectedColumnIndex: null as number | null,

  // Convert date to human readable format
  formatDate,

  // Clear search query
  clearSearch() {
    this.search = ''
  },

  // Sort tasks based on column and sort type
  sortTasks(columnIndex: number, sortBy: string) {
    const priorityOrder = { Urgent: 1, High: 2, Medium: 3, Low: 4 }
    const sortFunctions: { [key: string]: (a: Task, b: Task) => number } = {
      alphaAsc: (a, b) => a.title.localeCompare(b.title),
      alphaDesc: (a, b) => b.title.localeCompare(a.title),
      priorityAsc: (a, b) =>
        priorityOrder[a.priority as keyof typeof priorityOrder] -
        priorityOrder[b.priority as keyof typeof priorityOrder],
      priorityDesc: (a, b) =>
        priorityOrder[b.priority as keyof typeof priorityOrder] -
        priorityOrder[a.priority as keyof typeof priorityOrder]
    }

    if (sortFunctions[sortBy]) {
      this.columns[columnIndex].tasks.sort(sortFunctions[sortBy])
    }

    this.activeDropdown = null
  },

  // Filter tasks based on search query
  filteredTasks(tasks: Task[]) {
    return tasks.filter((task) =>
      task.title.toLowerCase().includes(this.search.toLowerCase())
    )
  },

  // Toggle dropdown
  toggleDropdown(index: number) {
    this.activeDropdown = this.activeDropdown === index ? null : index
  },

  // Open modal to add or edit task
  openTaskModal(
    columnIndex: null | number = null,
    taskIndex: null | number = null
  ) {
    this.selectedColumnIndex = columnIndex
    this.selectedTaskIndex = taskIndex
    this.editMode = taskIndex !== null

    if (this.editMode && columnIndex !== null && taskIndex !== null) {
      const task = this.columns[columnIndex].tasks[taskIndex]
      this.taskTitle = task.title
      this.assigneeId = task.assigneeId
      this.taskPriority = task.priority
      this.taskDate = new Date(task.date).toISOString().split('T')[0]
    } else {
      this.taskTitle = ''
      this.assigneeId = this.assignees[0].id
      this.taskPriority = 'Low'
      this.taskDate = new Date().toISOString().split('T')[0]
    }
    this.showModal = true
  },

  // Save task to the column
  saveTask() {
    const feedbackInstance: any = Alpine.store('feedback')

    if (this.selectedColumnIndex === null) {
      feedbackInstance.setFeedback('Column is required!', 'error')
      return
    }

    if (!this.taskTitle.trim()) {
      feedbackInstance.setFeedback('Task title is required!', 'error')
      return
    }

    const newTask = {
      id:
        this.editMode && this.selectedTaskIndex !== null
          ? this.columns[this.selectedColumnIndex].tasks[this.selectedTaskIndex]
              .id
          : Date.now(),
      title: this.taskTitle,
      date: this.taskDate,
      priority: this.taskPriority,
      priorityClass: this.getPriorityClass(this.taskPriority),
      assigneeId: this.assigneeId ? +this.assigneeId : this.assignees[0].id
    }

    if (this.editMode && this.selectedTaskIndex !== null) {
      this.columns[this.selectedColumnIndex].tasks[this.selectedTaskIndex] =
        newTask
      feedbackInstance.setFeedback('Task updated with success!', 'success')
    } else {
      this.columns[this.selectedColumnIndex].tasks.push(newTask)
      feedbackInstance.setFeedback('Task added with success!', 'success')
    }

    this.resetModal()
  },

  // Delete task from the column
  deleteTask(columnIndex: number, taskIndex: number) {
    this.columns[columnIndex].tasks.splice(taskIndex, 1)

    const feedbackInstance: any = Alpine.store('feedback')
    feedbackInstance.setFeedback('Task deleted with success!', 'success')
  },

  // Clear all tasks from the column
  clearTasks(columnIndex: number) {
    this.columns[columnIndex].tasks = []
    this.activeDropdown = null

    const feedbackInstance: any = Alpine.store('feedback')
    feedbackInstance.setFeedback('Tasks cleared with success!', 'success')
  },

  // Reset modal fields
  resetModal() {
    this.taskTitle = ''
    this.taskPriority = 'Low'
    this.taskDate = ''
    this.selectedColumnIndex = null
    this.selectedTaskIndex = null
    this.editMode = false
    this.showModal = false
  },

  // Get assignee by id
  getAssigneeById(id: number) {
    return this.assignees.find((assignee) => assignee.id === id)
  },

  // Get priority class based on priority
  getPriorityClass(priority: string) {
    return (
      {
        Urgent: 'bg-red-100 text-red-700',
        High: 'bg-orange-100 text-orange-700',
        Medium: 'bg-yellow-100 text-yellow-700',
        Low: 'bg-green-100 text-green-700'
      }[priority] || ''
    )
  },

  // Start dragging state
  startDragging(task: Task) {
    this.draggingTask = task
    this.isDragging = true
  },

  // Drop task to the column
  dropTask(columnIndex: number) {
    if (!this.draggingTask) {
      return
    }
    this.columns.forEach(
      (column) =>
        (column.tasks = column.tasks.filter(
          (task) => task !== this.draggingTask
        ))
    )
    this.columns[columnIndex].tasks.push({ ...this.draggingTask })
    this.resetDrag()

    const feedbackInstance: any = Alpine.store('feedback')
    feedbackInstance.setFeedback('Task updated with success!', 'success')
  },

  // Reset dragging state
  resetDrag() {
    this.draggingTask = null
    this.isDragging = false
  }
})
