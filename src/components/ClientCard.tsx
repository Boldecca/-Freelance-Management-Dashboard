import type { Client } from "../types"

interface ClientCardProps {
  client: Client
  projectCount?: number
}

export function ClientCard({ client, projectCount = 0 }: ClientCardProps) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="font-semibold text-lg text-gray-900">{client.name}</h3>
          <p className="text-sm text-gray-600">{client.country}</p>
        </div>
        <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-3 py-1 rounded">
          {projectCount} {projectCount === 1 ? "Project" : "Projects"}
        </span>
      </div>

      {client.email && (
        <div className="pt-4 border-t border-gray-200">
          <p className="text-sm text-gray-700">
            <span className="font-medium">Email:</span> {client.email}
          </p>
        </div>
      )}
    </div>
  )
}
