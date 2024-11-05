import Alpine from 'alpinejs'
import { ColumnType } from '../src/config/columns'
import { Task } from '../src/config/tasks'
import { planner } from '../src/components/planner'

// Mock Alpine.$persist
Alpine.$persist = (value: any) => value

jest.mock('alpinejs', () => ({
  store: jest.fn().mockReturnValue({
    setFeedback: jest.fn()
  })
}))

describe('planner component', () => {
  let plannerInstance: ReturnType<typeof planner>

  beforeEach(() => {
    plannerInstance = planner()
    plannerInstance.columns = [
      {
        id: 1,
        title: 'To Do',
        tasks: [],
        badgeIcon: '',
        badgeClass: '',
        bgClass: ''
      },
      {
        id: 2,
        title: 'In Progress',
        tasks: [],
        badgeIcon: '',
        badgeClass: '',
        bgClass: ''
      },
      {
        id: 3,
        title: 'Done',
        tasks: [],
        badgeIcon: '',
        badgeClass: '',
        bgClass: ''
      }
    ] as ColumnType[]
    plannerInstance.assignees = [{ id: 1, name: 'John Doe', pictureUrl: '' }]
  })

  it('should initialize with default values', () => {
    expect(plannerInstance.taskTitle).toBe('')
    expect(plannerInstance.taskPriority).toBe('Low')
    expect(plannerInstance.editMode).toBe(false)
    expect(plannerInstance.showModal).toBe(false)
  })

  it('should clear search query', () => {
    plannerInstance.search = 'test'
    plannerInstance.clearSearch()
    expect(plannerInstance.search).toBe('')
  })

  it('should sort tasks by title in ascending order', () => {
    plannerInstance.columns[0].tasks = [
      { id: 1, title: 'B Task', priority: 'Low', date: '', assigneeId: 1 },
      { id: 2, title: 'A Task', priority: 'Low', date: '', assigneeId: 1 }
    ] as Task[]
    plannerInstance.sortTasks(0, 'alphaAsc')
    expect(plannerInstance.columns[0].tasks[0].title).toBe('A Task')
  })

  it('should filter tasks based on search query', () => {
    plannerInstance.columns[0].tasks = [
      { id: 1, title: 'Task 1', priority: 'Low', date: '', assigneeId: 1 },
      { id: 2, title: 'Another Task', priority: 'Low', date: '', assigneeId: 1 }
    ] as Task[]
    plannerInstance.search = 'Another'
    const filteredTasks = plannerInstance.filteredTasks(
      plannerInstance.columns[0].tasks
    )
    expect(filteredTasks.length).toBe(1)
    expect(filteredTasks[0].title).toBe('Another Task')
  })

  it('should open task modal for adding a new task', () => {
    plannerInstance.openTaskModal()
    expect(plannerInstance.selectedColumnIndex).toBe(null)
    expect(plannerInstance.editMode).toBe(false)
    expect(plannerInstance.showModal).toBe(true)
  })

  it('should open task modal for editing an existing task', () => {
    plannerInstance.columns[0].tasks = [
      {
        id: 1,
        title: 'Task 1',
        priority: 'Low',
        date: new Date().toISOString(),
        assigneeId: 1
      }
    ] as Task[]
    plannerInstance.openTaskModal(0, 0)
    expect(plannerInstance.selectedColumnIndex).toBe(0)
    expect(plannerInstance.selectedTaskIndex).toBe(0)
    expect(plannerInstance.taskTitle).toBe('Task 1')
    expect(plannerInstance.editMode).toBe(true)
    expect(plannerInstance.showModal).toBe(true)
  })

  it('should save a new task', () => {
    plannerInstance.selectedColumnIndex = 0
    plannerInstance.taskTitle = 'New Task'
    plannerInstance.saveTask()
    expect(plannerInstance.columns[0].tasks.length).toBe(1)
    expect(plannerInstance.columns[0].tasks[0].title).toBe('New Task')
  })

  it('should delete a task', () => {
    plannerInstance.columns[0].tasks = [
      { id: 1, title: 'Task 1', priority: 'Low', date: '', assigneeId: 1 }
    ] as Task[]
    plannerInstance.deleteTask(0, 0)
    expect(plannerInstance.columns[0].tasks.length).toBe(0)
  })

  it('should clear all tasks from a column', () => {
    plannerInstance.columns[0].tasks = [
      { id: 1, title: 'Task 1', priority: 'Low', date: '', assigneeId: 1 }
    ] as Task[]
    plannerInstance.clearTasks(0)
    expect(plannerInstance.columns[0].tasks.length).toBe(0)
  })

  it('should start dragging a task', () => {
    const task = {
      id: 1,
      title: 'Task 1',
      priority: 'Low',
      date: '',
      assigneeId: 1
    } as Task
    plannerInstance.startDragging(task)
    expect(plannerInstance.draggingTask).toBe(task)
    expect(plannerInstance.isDragging).toBe(true)
  })

  it('should drop a task to a column', () => {
    const task = {
      id: 1,
      title: 'Task 1',
      priority: 'Low',
      date: '',
      assigneeId: 1
    } as Task
    plannerInstance.columns[0].tasks.push(task)
    plannerInstance.startDragging(task)
    plannerInstance.dropTask(1)
    expect(plannerInstance.columns[0].tasks.length).toBe(0)
    expect(plannerInstance.columns[1].tasks.length).toBe(1)
    expect(plannerInstance.columns[1].tasks[0].title).toBe('Task 1')
  })
})
