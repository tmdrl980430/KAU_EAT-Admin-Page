import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilNotes,
  cilSpeedometer,
  cilStar,
  cilXCircle,
  cilGroup,
  cilHistory,
  cilMonitor,
  cilBarcode,
} from '@coreui/icons'
import { CNavItem } from '@coreui/react'

const _nav = [
  {
    component: CNavItem,
    name: '식권 사용량',
    to: '/dashboard',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
    badge: {
      color: 'info',
    },
  },
  {
    component: CNavItem,
    name: '일별 사용량 조회',
    to: '/dayDashBoard',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
    badge: {
      color: 'info',
    },
  },
  {
    component: CNavItem,
    name: '월별 사용량 조회',
    to: '/monthDashBoard',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
    badge: {
      color: 'info',
    },
  },
  {
    component: CNavItem,
    name: '메뉴 관리',
    to: '/mealTable',
    icon: <CIcon icon={cilNotes} customClassName="nav-icon" />,
    badge: {
      color: 'info',
    },
  },
  {
    component: CNavItem,
    name: '품절 관리',
    to: '/soldOut',
    icon: <CIcon icon={cilHistory} customClassName="nav-icon" />,
    badge: {
      color: 'info',
    },
  },
  {
    component: CNavItem,
    name: '유저 조회',
    to: '/userAdmin',
    icon: <CIcon icon={cilBarcode} customClassName="nav-icon" />,
    badge: {
      color: 'info',
    },
  },
  {
    component: CNavItem,
    name: '식권 사용내역 조회',
    to: '/useTicketList',
    icon: <CIcon icon={cilGroup} customClassName="nav-icon" />,
    badge: {
      color: 'info',
    },
  },
  {
    component: CNavItem,
    name: '포인트 등록',
    to: '/ticketRegistration',
    icon: <CIcon icon={cilStar} customClassName="nav-icon" />,
    badge: {
      color: 'info',
    },
  },
  {
    component: CNavItem,
    name: '버전 관리',
    to: '/versionRegistration',
    icon: <CIcon icon={cilMonitor} customClassName="nav-icon" />,
    badge: {
      color: 'info',
    },
  },
  {
    component: CNavItem,
    name: 'LogOut',
    to: '/login',
    icon: <CIcon icon={cilXCircle} customClassName="nav-icon" />,
    badge: {
      color: 'info',
    },
  },
]

export default _nav
