"use client"

import { useState } from "react"
import { DashboardProvider } from "./context/DashboardContext"
import { useDashboard } from "./context/DashboardContext"
import { DashboardStats } from "./components/DashboardStats"
import { ProjectList } from "./components/ProjectList"
import { ClientList } from "./components/ClientList"
import { PaymentHistory } from "./components/PaymentHistory"
import { Header } from "./components/Header"

type TabType = "overview" | "projects" | "clients" | "payments"

function DashboardContent() {
  const [activeTab, setActiveTab] = useState<TabType>("overview")
  const { state } = useDashboard()

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Navigation Tabs */}
        <div className="flex space-x-4 mb-8 border-b border-gray-200">
          {(["overview", "projects", "clients", "payments"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 font-medium border-b-2 transition-colors ${
                activeTab === tab
                  ? "border-blue-600 text-blue-600"
                  : "border-transparent text-gray-600 hover:text-gray-900"
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {activeTab === "overview" && (
          <div className="space-y-8">
            <DashboardStats />
            <ProjectList projects={state.projects.slice(0, 3)} title="Recent Projects" />
          </div>
        )}

        {activeTab === "projects" && <ProjectList projects={state.projects} />}

        {activeTab === "clients" && <ClientList clients={state.clients} />}

        {activeTab === "payments" && <PaymentHistory />}
      </div>
    </div>
  )
}

function App() {
  return (
    <DashboardProvider>
      <DashboardContent />
    </DashboardProvider>
  )
}

export default App
