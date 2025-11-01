"use client"

import type React from "react"
import { createContext, useContext, useReducer, type ReactNode } from "react"
import type { DashboardState, DashboardAction } from "../types"

const initialState: DashboardState = {
  clients: [
    { id: "1", name: "Acme Corp", country: "USA", email: "contact@acme.com" },
    { id: "2", name: "Tech Startup", country: "Canada" },
  ],
  projects: [
    {
      id: "p1",
      clientId: "1",
      title: "Website Redesign",
      budget: 5000,
      status: "in-progress",
      paymentStatus: "unpaid",
    },
    {
      id: "p2",
      clientId: "2",
      title: "Mobile App Development",
      budget: 12000,
      status: "pending",
      paymentStatus: "unpaid",
    },
    {
      id: "p3",
      clientId: "1",
      title: "API Integration",
      budget: 3000,
      status: "completed",
      paymentStatus: "paid",
    },
  ],
  payments: [
    { projectId: "p3", amount: 3000, date: "2025-10-15" },
    { projectId: "p1", amount: 2500, date: "2025-10-20" },
  ],
}

const dashboardReducer = (state: DashboardState, action: DashboardAction): DashboardState => {
  switch (action.type) {
    case "ADD_CLIENT":
      return { ...state, clients: [...state.clients, action.payload] }

    case "ADD_PROJECT":
      return { ...state, projects: [...state.projects, action.payload] }

    case "ADD_PAYMENT":
      return { ...state, payments: [...state.payments, action.payload] }

    case "MARK_PROJECT_PAID": {
      return {
        ...state,
        projects: state.projects.map((p) => (p.id === action.payload ? { ...p, paymentStatus: "paid" } : p)),
      }
    }

    case "UPDATE_PROJECT_STATUS": {
      return {
        ...state,
        projects: state.projects.map((p) =>
          p.id === action.payload.projectId ? { ...p, status: action.payload.status } : p,
        ),
      }
    }

    case "DELETE_PROJECT":
      return {
        ...state,
        projects: state.projects.filter((p) => p.id !== action.payload),
        payments: state.payments.filter((pay) => pay.projectId !== action.payload),
      }

    case "LOAD_INITIAL_DATA":
      return action.payload

    default:
      return state
  }
}

interface DashboardContextType {
  state: DashboardState
  dispatch: React.Dispatch<DashboardAction>
}

const DashboardContext = createContext<DashboardContextType | undefined>(undefined)

export function DashboardProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(dashboardReducer, initialState)

  return <DashboardContext.Provider value={{ state, dispatch }}>{children}</DashboardContext.Provider>
}

export function useDashboard(): DashboardContextType {
  const context = useContext(DashboardContext)
  if (!context) {
    throw new Error("useDashboard must be used within DashboardProvider")
  }
  return context
}
