const DashboardPreview = () => {
  return (
    <section className="py-20 md:py-28 relative overflow-hidden">
      <div className="container px-4 md:px-6">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="text-sm font-semibold text-accent uppercase tracking-wider">Dashboard</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-display mt-4 mb-6">
            Your Learning, <span className="gradient-text">One Dashboard</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Track progress, access modules, submit assignments, and take exams — all in one place
          </p>
        </div>

        {/* Dashboard mockup */}
        <div className="max-w-5xl mx-auto">
          <div className="glass rounded-2xl p-2 glow-primary">
            <div className="rounded-xl bg-card p-6 md:p-8">
              {/* Top bar */}
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h3 className="text-xl font-bold font-display">Welcome back, Student 👋</h3>
                  <p className="text-sm text-muted-foreground">You have 3 pending assignments</p>
                </div>
                <div className="hidden sm:flex items-center gap-2">
                  <div className="px-3 py-1.5 rounded-lg bg-accent/10 text-accent text-xs font-semibold">Active</div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                {[
                  { label: "Courses Enrolled", value: "4", color: "text-primary" },
                  { label: "Assignments Due", value: "3", color: "text-accent" },
                  { label: "Avg. Score", value: "87%", color: "text-foreground" },
                ].map((stat) => (
                  <div key={stat.label} className="rounded-xl bg-secondary/50 p-5">
                    <div className={`text-3xl font-bold font-display ${stat.color}`}>{stat.value}</div>
                    <div className="text-sm text-muted-foreground mt-1">{stat.label}</div>
                  </div>
                ))}
              </div>

              {/* Course modules list */}
              <div className="space-y-3">
                <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">Current Modules</h4>
                {[
                  { name: "Introduction to Data Science", progress: 92, status: "In Progress" },
                  { name: "Business Communication", progress: 78, status: "In Progress" },
                  { name: "Research Methodology", progress: 45, status: "In Progress" },
                  { name: "Statistics for Business", progress: 100, status: "Completed" },
                ].map((module) => (
                  <div key={module.name} className="flex items-center gap-4 p-4 rounded-xl bg-secondary/30 hover:bg-secondary/50 transition-colors">
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium truncate">{module.name}</div>
                      <div className="h-1.5 rounded-full bg-secondary mt-2">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-primary to-accent transition-all duration-700"
                          style={{ width: `${module.progress}%` }}
                        />
                      </div>
                    </div>
                    <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${module.status === "Completed" ? "bg-accent/10 text-accent" : "bg-primary/10 text-primary"}`}>
                      {module.progress}%
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DashboardPreview;
