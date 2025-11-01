"use client"

import type { Project } from "../types"
import { useDashboard } from "../context/DashboardContext"
import { findClientById, getStatusColor } from "../utils/helpers"

interface ProjectCardProps {
  project: Project
}

export function ProjectCard({ project }: ProjectCardProps) {
  const { state, dispatch } = useDashboard()

  const client = findClientById(state.clients, project.clientId)

  const handleMarkPaid = () => {
    dispatch({ type: "MARK_PROJECT_PAID", payload: project.id })
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <h3 className="font-semibold text-lg text-gray-900">{project.title}</h3>
          <p className="text-sm text-gray-600">
            {client ? client.name : <span className="text-red-600">Client not found</span>}
          </p>
        </div>
        <span className={`text-xs font-semibold px-3 py-1 rounded ${getStatusColor(project.status)}`}>
          {project.status.charAt(0).toUpperCase() + project.status.slice(1).replace("-", " ")}
        </span>
      </div>

      <div className="space-y-3 mb-4">
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600">Budget:</span>
          <span className="font-semibold text-gray-900">${project.budget.toLocaleString()}</span>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600">Payment Status:</span>
          <span className={`text-xs font-semibold px-2 py-1 rounded ${getStatusColor(project.paymentStatus)}`}>
            {project.paymentStatus === "paid" ? "Paid" : "Unpaid"}
          </span>
        </div>
      </div>

      {project.paymentStatus === "unpaid" && (
        <button
          onClick={handleMarkPaid}
          className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded transition-colors"
        >
          Mark as Paid
        </button>
      )}
    </div>
  )
}
