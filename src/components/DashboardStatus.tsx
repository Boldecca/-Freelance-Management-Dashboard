import { useDashboard } from "../context/DashboardContext"
import {
  countProjectsByPaymentStatus,
  countProjectsByStatus,
  calculateTotalBudget,
  calculateTotalPaid,
  formatCurrency,
} from "../utils/helpers"

export function DashboardStats() {
  const { state } = useDashboard()

  const paymentCounts = countProjectsByPaymentStatus(state.projects)
  const statusCounts = countProjectsByStatus(state.projects)
  const totalBudget = calculateTotalBudget(state.projects)
  const totalPaid = calculateTotalPaid(state.payments)

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <StatCard
        title="Total Projects"
        value={state.projects.length}
        description="All projects"
        bgColor="bg-blue-50"
        textColor="text-blue-700"
      />
      <StatCard
        title="Projects Paid"
        value={paymentCounts.paid}
        description="Completed payments"
        bgColor="bg-green-50"
        textColor="text-green-700"
      />
      <StatCard
        title="Pending Payment"
        value={paymentCounts.unpaid}
        description="Awaiting payment"
        bgColor="bg-red-50"
        textColor="text-red-700"
      />
      <StatCard
        title="Total Budget"
        value={formatCurrency(totalBudget)}
        description={`Paid: ${formatCurrency(totalPaid)}`}
        bgColor="bg-purple-50"
        textColor="text-purple-700"
      />
    </div>
  )
}

interface StatCardProps {
  title: string
  value: string | number
  description: string
  bgColor: string
  textColor: string
}

function StatCard({ title, value, description, bgColor, textColor }: StatCardProps) {
  return (
    <div className={`${bgColor} rounded-lg p-6 border border-gray-200`}>
      <p className="text-sm text-gray-600">{title}</p>
      <p className={`${textColor} text-3xl font-bold my-2`}>{value}</p>
      <p className="text-xs text-gray-500">{description}</p>
    </div>
  )
}
