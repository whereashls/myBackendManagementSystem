import Home from '@/views/Home'
import Login from '@/views/Login'
import StudentManagement from '@/views/Home/StudentManagement'
import DepartmentManagement from '@/views/Home/DepartmentManagement'
import MajorManagement from '@/views/Home/MajorManagement'
import RoleManagement from '@/views/Home/RoleManagement'
import TeacherManagement from '@/views/Home/TeacherManagement'
export default [
  {
    path: '/',
    name: 'Home',
    component: Home,
    redirect: {
      name: 'StudentManagement'
    },
    children: [
      {
        path: 'student-management',
        name: 'StudentManagement',
        component: StudentManagement
      },
      {
        path: 'department-management',
        name: 'DepartmentManagement',
        component: DepartmentManagement
      },
      {
        path: 'major-management',
        name: 'MajorManagement',
        component: MajorManagement
      },
      {
        path: 'role-management',
        name: 'RoleManagement',
        component: RoleManagement
      },
      {
        path: 'teacher-management',
        name: 'TeacherManagement',
        component: TeacherManagement
      }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '*',
    redirect: {
      name: 'StudentManagement'
    }
  }
]
