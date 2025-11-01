import { useDashboard } from "../context/DashboardContext"
import { findClientById, formatCurrency } from "../utils/helpers"

interface PaymentHistoryProps {
  title?: string
}

export function PaymentHistory({ title = "Payment History" }: PaymentHistoryProps) {
  const { state } = useDashboard()

  if (state.payments.length === 0) {
    return (
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">{title}</h2>
        <div className="text-center py-12">
          <p className="text-gray-600">No payments recorded yet</p>
        </div>
      </div>
    )
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">{title}</h2>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b-2 border-gray-200">
              <th className="text-left py-3 px-4 font-semibold text-gray-900">Project</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-900">Client</th>
              <th className="text-right py-3 px-4 font-semibold text-gray-900">Amount</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-900">Date</th>
            </tr>
          </thead>
          <tbody>
            {state.payments.map((payment, idx) => {
              const project = state.projects.find((p) => p.id === payment.projectId)
              const client = project ? findClientById(state.clients, project.clientId) : null

              return (
                <tr key={idx} className="border-b border-gray-200 hover:bg-gray-50">
                  <td className="py-3 px-4 text-gray-900 font-medium">{project?.title || "Unknown Project"}</td>
                  <td className="py-3 px-4 text-gray-600">{client?.name || "Unknown Client"}</td>
                  <td className="py-3 px-4 text-right font-semibold text-green-600">
                    {formatCurrency(payment.amount)}
                  </td>
                  <td className="py-3 px-4 text-gray-600">{new Date(payment.date).toLocaleDateString()}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
