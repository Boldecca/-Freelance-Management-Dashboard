"use client"

import type { Client } from "../types"
import { ClientCard } from "./ClientCard"
import { useState } from "react"
import { searchClients } from "../utils/helpers"
import { useDashboard } from "../context/DashboardContext"

interface ClientListProps {
  clients: Client[]
  title?: string
}

export function ClientList({ clients, title = "Clients" }: ClientListProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const { state } = useDashboard()

  const filtered = searchQuery ? searchClients(clients, searchQuery) : clients

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">{title}</h2>

      <input
        type="text"
        placeholder="Search clients by name..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="w-full px-4 py-2 mb-6 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      />

      {filtered.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-600">No clients found</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((client) => {
            const projectCount = state.projects.filter((p) => p.clientId === client.id).length
            return <ClientCard key={client.id} client={client} projectCount={projectCount} />
          })}
        </div>
      )}
    </div>
  )
}
