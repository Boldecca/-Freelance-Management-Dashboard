import type { Client, Project, Payment } from "../types"

// Find client by ID safely
export const findClientById = (clients: Client[], clientId: string): Client | undefined => {
  return clients.find((c) => c.id === clientId)
}

// Count paid vs unpaid projects
export const countProjectsByPaymentStatus = (projects: Project[]): { paid: number; unpaid: number } => {
  return {
    paid: projects.filter((p) => p.paymentStatus === "paid").length,
    unpaid: projects.filter((p) => p.paymentStatus === "unpaid").length,
  }
}

// Count projects by status
export const countProjectsByStatus = (projects: Project[]) => {
  return {
    pending: projects.filter((p) => p.status === "pending").length,
    inProgress: projects.filter((p) => p.status === "in-progress").length,
    completed: projects.filter((p) => p.status === "completed").length,
  }
}

// Filter projects by status
export const filterProjectsByStatus = (projects: Project[], status: Project["status"]) => {
  return projects.filter((p) => p.status === status)
}

// Filter projects by payment status
export const filterProjectsByPaymentStatus = (projects: Project[], paymentStatus: Project["paymentStatus"]) => {
  return projects.filter((p) => p.paymentStatus === paymentStatus)
}

// Search projects by title
export const searchProjects = (projects: Project[], query: string): Project[] => {
  const lowerQuery = query.toLowerCase()
  return projects.filter((p) => p.title.toLowerCase().includes(lowerQuery))
}

// Search clients by name
export const searchClients = (clients: Client[], query: string): Client[] => {
  const lowerQuery = query.toLowerCase()
  return clients.filter((c) => c.name.toLowerCase().includes(lowerQuery))
}

// Calculate total budget for projects
export const calculateTotalBudget = (projects: Project[]): number => {
  return projects.reduce((sum, p) => sum + p.budget, 0)
}

// Calculate total paid amount
export const calculateTotalPaid = (payments: Payment[]): number => {
  return payments.reduce((sum, p) => sum + p.amount, 0)
}

// Get status styles
export const getStatusColor = (status: string): string => {
  switch (status) {
    case "completed":
      return "bg-green-100 text-green-800"
    case "in-progress":
      return "bg-blue-100 text-blue-800"
    case "pending":
      return "bg-yellow-100 text-yellow-800"
    case "paid":
      return "bg-green-100 text-green-800"
    case "unpaid":
      return "bg-red-100 text-red-800"
    default:
      return "bg-gray-100 text-gray-800"
  }
}

// Format currency
export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount)
}
