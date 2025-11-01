"use client"

import type { Project } from "../types"
import { ProjectCard } from "./ProjectCard"
import { useState } from "react"
import { searchProjects, filterProjectsByPaymentStatus, filterProjectsByStatus } from "../utils/helpers"

interface ProjectListProps {
  projects: Project[]
  title?: string
}

export function ProjectList({ projects, title = "Projects" }: ProjectListProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [filterStatus, setFilterStatus] = useState<Project["status"] | "all">("all")
  const [filterPayment, setFilterPayment] = useState<Project["paymentStatus"] | "all">("all")

  let filtered = projects

  if (searchQuery) {
    filtered = searchProjects(filtered, searchQuery)
  }

  if (filterStatus !== "all") {
    filtered = filterProjectsByStatus(filtered, filterStatus)
  }

  if (filterPayment !== "all") {
    filtered = filterProjectsByPaymentStatus(filtered, filterPayment)
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">{title}</h2>

      <div className="mb-6 space-y-4">
        <input
          type="text"
          placeholder="Search projects by title..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value as Project["status"] | "all")}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Statuses</option>
            <option value="pending">Pending</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>

          <select
            value={filterPayment}
            onChange={(e) => setFilterPayment(e.target.value as Project["paymentStatus"] | "all")}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Payment Status</option>
            <option value="paid">Paid</option>
            <option value="unpaid">Unpaid</option>
          </select>
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-600">No projects found</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      )}
    </div>
  )
}
