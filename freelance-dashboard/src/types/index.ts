// TypeScript models for Clients, Projects, and Payments
export interface Client {
  id: string
  name: string
  country: string
  email?: string
}

export interface Project {
  id: string
  clientId: string
  title: string
  budget: number
  status: "pending" | "in-progress" | "completed"
  paymentStatus: "paid" | "unpaid"
}

export interface Payment {
  projectId: string
  amount: number
  date: string // ISO format
}

export interface DashboardState {
  clients: Client[]
  projects: Project[]
  payments: Payment[]
}

// Discriminated union types for actions
export type DashboardAction =
  | { type: "ADD_CLIENT"; payload: Client }
  | { type: "ADD_PROJECT"; payload: Project }
  | { type: "ADD_PAYMENT"; payload: Payment }
  | { type: "MARK_PROJECT_PAID"; payload: string } // projectId
  | { type: "UPDATE_PROJECT_STATUS"; payload: { projectId: string; status: Project["status"] } }
  | { type: "DELETE_PROJECT"; payload: string } // projectId
  | { type: "LOAD_INITIAL_DATA"; payload: DashboardState }
