import "./DashboardCard.css";

export interface DashboardCard {
  value: string;
  label: string;
  icon: string;
  style?: string;
}

export interface DashboardCardProps {
  data: DashboardCard[];
}

export function DashboardCard({ data }: DashboardCardProps) {
  return (
    <div className="dashboard-stats" style={{ padding: "0rem" }}>
      {data.map((x) => (
        <div className="stat-card" key={x.label} style={{ paddingTop: "0.7rem", paddingBottom: "0.7rem" }}>
          <div className={`stat-icon ${x.style ?? ""}`}><i className={x.icon} /></div>
          <div className="stat-info">
            <span className="stat-label">{x.label}</span>
            <span className="stat-value">{x.value}</span>
          </div>
        </div>
      ))
      }
    </div >
  )
}