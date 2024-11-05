import { Task } from './tasks'

export type ColumnType = {
  id: number
  title: string
  badgeIcon: string
  badgeClass: string
  bgClass: string
  tasks: Task[]
}

export const columns: ColumnType[] = [
  {
    id: 1,
    title: 'To Do',
    badgeIcon: 'ph-warning-circle',
    badgeClass: 'bg-[#007aff]',
    bgClass: 'bg-[#F5F7FE]',
    tasks: [
      {
        id: 1,
        title: 'Customer profiles for demographics',
        date: '2024-05-29',
        priority: 'Urgent',
        priorityClass: 'bg-red-100 text-red-700',
        assigneeId: 1
      },
      {
        id: 2,
        title: 'Research user feedback',
        date: '2024-06-10',
        priority: 'Medium',
        priorityClass: 'bg-yellow-100 text-yellow-700',
        assigneeId: 2
      },
      {
        id: 3,
        title: 'Design the homepage layout',
        date: '2024-06-20',
        priority: 'Low',
        priorityClass: 'bg-green-100 text-green-700',
        assigneeId: 3
      }
    ]
  },
  {
    id: 2,
    title: 'In Progress',
    badgeClass: 'bg-[#36a3f7]',
    badgeIcon: 'ph-hourglass-medium',
    bgClass: 'bg-[#F2F8FD]',
    tasks: [
      {
        id: 4,
        title: 'Competitive analysis',
        date: '2024-06-01',
        priority: 'High',
        priorityClass: 'bg-orange-100 text-orange-700',
        assigneeId: 4
      },
      {
        id: 5,
        title: 'Improve design of landing page',
        date: '2024-07-05',
        priority: 'Medium',
        priorityClass: 'bg-yellow-100 text-yellow-700',
        assigneeId: 1
      }
    ]
  },
  {
    id: 3,
    title: 'In Review',
    badgeClass: 'bg-[#d188f0]',
    badgeIcon: 'ph-eye',
    bgClass: 'bg-[#F9F2FB]',
    tasks: [
      {
        id: 6,
        title: 'Rethink email settings',
        date: '2024-06-03',
        priority: 'High',
        priorityClass: 'bg-orange-100 text-orange-700',
        assigneeId: 2
      },
      {
        id: 7,
        title: 'Prepare project proposal',
        date: '2024-06-15',
        priority: 'Medium',
        priorityClass: 'bg-yellow-100 text-yellow-700',
        assigneeId: 3
      },
      {
        id: 8,
        title: 'Conduct market analysis',
        date: '2024-06-25',
        priority: 'Low',
        priorityClass: 'bg-green-100 text-green-700',
        assigneeId: 4
      }
    ]
  },
  {
    id: 4,
    title: 'Done',
    badgeClass: 'bg-[#5acba0]',
    badgeIcon: 'ph-check-circle',
    bgClass: 'bg-[#F0FAF4]',
    tasks: [
      {
        id: 9,
        title: 'Launch marketing campaign',
        date: '2024-06-05',
        priority: 'Urgent',
        priorityClass: 'bg-red-100 text-red-700',
        assigneeId: 2
      }
    ]
  }
]
