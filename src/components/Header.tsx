export function Header() {
  return (
    <header className="bg-gradient-to-r from-slate-900 to-slate-800 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Freelance Dashboard</h1>
            <p className="text-slate-300 text-sm mt-1">Manage clients, projects, and payments</p>
          </div>
          <div className="text-right">
            <p className="text-slate-300 text-sm">Professional Project Management</p>
          </div>
        </div>
      </div>
    </header>
  )
}
