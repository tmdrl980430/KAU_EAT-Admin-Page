import React from 'react'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
const dayDashBoard = React.lazy(() => import('./views/dayDashBoard/dayDashBoard'))
const MealTable = React.lazy(() => import('./views/mealTable/MealTable'))
const SoldOutManagement = React.lazy(() => import('./views/soldOut/SoldOutManagement'))
const TicketRegistration = React.lazy(() => import('./views/ticketregistration/TicketRegistration'))
const VersionRegistration = React.lazy(() =>
  import('./views/versionRegistration/VersionRegistration'),
)
const UserAdmin = React.lazy(() => import('./views/userAdmin/userAdmin'))

const Colors = React.lazy(() => import('./views/theme/colors/Colors'))
const Typography = React.lazy(() => import('./views/theme/typography/Typography'))

// Notifications
const Alerts = React.lazy(() => import('./views/notifications/alerts/Alerts'))
const Badges = React.lazy(() => import('./views/notifications/badges/Badges'))
const Modals = React.lazy(() => import('./views/notifications/modals/Modals'))
const Toasts = React.lazy(() => import('./views/notifications/toasts/Toasts'))

const Widgets = React.lazy(() => import('./views/widgets/Widgets'))

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: '식권 사용량', element: Dashboard },
  { path: '/dayDashBoard', name: '일별 식권 사용량 조회', element: dayDashBoard },
  { path: '/mealTable', name: '식단 관리', element: MealTable },
  { path: '/soldOut', name: '품절 관리', element: SoldOutManagement },
  { path: '/userAdmin', name: '유저 관리', element: UserAdmin },
  { path: '/ticketRegistration', name: '식권 등록 관리', element: TicketRegistration },
  { path: '/versionRegistration', name: '버전 등록 관리', element: VersionRegistration },
  { path: '/theme', name: 'Theme', element: Colors, exact: true },
  { path: '/theme/colors', name: 'Colors', element: Colors },
  { path: '/theme/typography', name: 'Typography', element: Typography },
  { path: '/notifications', name: 'Notifications', element: Alerts, exact: true },
  { path: '/notifications/alerts', name: 'Alerts', element: Alerts },
  { path: '/notifications/badges', name: 'Badges', element: Badges },
  { path: '/notifications/modals', name: 'Modals', element: Modals },
  { path: '/notifications/toasts', name: 'Toasts', element: Toasts },
  { path: '/widgets', name: 'Widgets', element: Widgets },
]

export default routes
