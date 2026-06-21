import { useState } from "react";
import "./App.css";

const trendData = [
  { bulan: "Jan", pendapatan: 120 },
  { bulan: "Feb", pendapatan: 180 },
  { bulan: "Mar", pendapatan: 150 },
  { bulan: "Apr", pendapatan: 210 },
  { bulan: "Mei", pendapatan: 190 },
  { bulan: "Jun", pendapatan: 280 },
  { bulan: "Jul", pendapatan: 260 },
  { bulan: "Agu", pendapatan: 310 },
  { bulan: "Sep", pendapatan: 290 },
  { bulan: "Okt", pendapatan: 350 },
  { bulan: "Nov", pendapatan: 330 },
  { bulan: "Des", pendapatan: 420 },
];

const weeklyData = [
  { hari: "Sen", transaksi: 65 },
  { hari: "Sel", transaksi: 90 },
  { hari: "Rab", transaksi: 75 },
  { hari: "Kam", transaksi: 110 },
  { hari: "Jum", transaksi: 55 },
  { hari: "Sab", transaksi: 45 },
  { hari: "Min", transaksi: 35 },
];

const menuItems = [
  { icon: "🏠", label: "Overview" },
  { icon: "📊", label: "Analitik" },
  { icon: "👤", label: "Pelanggan" },
  { icon: "💳", label: "Transaksi" },
  { icon: "📁", label: "Laporan" },
  { icon: "📦", label: "Produk" },
];

const stats = [
  { icon: "💰", label: "Total Penjualan", value: "Rp 482,3jt", change: "+12.4%", up: true },
  { icon: "👥", label: "Pengguna Aktif", value: "24.582", change: "+8.1%", up: true },
  { icon: "🎯", label: "Tingkat Konversi", value: "3.42%", change: "-1.2%", up: false },
  { icon: "📋", label: "Pesanan Baru", value: "1.284", change: "+5.6%", up: true },
];

// Simple SVG Area Chart
function AreaChart({ data }) {
  const w = 600;
  const h = 200;
  const pad = { top: 10, right: 10, bottom: 10, left: 10 };
  const maxVal = Math.max(...data.map(d => d.pendapatan));
  const pts = data.map((d, i) => {
    const x = pad.left + (i / (data.length - 1)) * (w - pad.left - pad.right);
    const y = h - pad.bottom - (d.pendapatan / maxVal) * (h - pad.top - pad.bottom);
    return { x, y, ...d };
  });
  const linePath = pts.map((p, i) => `${i === 0 ? "M" : "L"}${p.x},${p.y}`).join(" ");
  const areaPath = `${linePath} L${pts[pts.length - 1].x},${h - pad.bottom} L${pts[0].x},${h - pad.bottom} Z`;

  return (
    <div className="area-chart-wrap">
      <svg viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none">
        <defs>
          <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#14b8a6" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#14b8a6" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path d={areaPath} fill="url(#areaGrad)" />
        <path d={linePath} fill="none" stroke="#14b8a6" strokeWidth="2.5" />
        {pts.map((p, i) => (
          <circle key={i} cx={p.x} cy={p.y} r="4" fill="#14b8a6" />
        ))}
      </svg>
      {/* X labels */}
      <div style={{ display: "flex", justifyContent: "space-between", marginTop: 6 }}>
        {data.map(d => (
          <span key={d.bulan} style={{ fontSize: 10, color: "#94a3b8", flex: 1, textAlign: "center" }}>{d.bulan}</span>
        ))}
      </div>
    </div>
  );
}

// Simple Bar Chart
function BarChart({ data }) {
  const maxVal = Math.max(...data.map(d => d.transaksi));
  return (
    <div className="bar-chart-wrap">
      {data.map(d => (
        <div key={d.hari} className="bar-item">
          <div
            className="bar-fill"
            style={{ height: `${(d.transaksi / maxVal) * 100}%` }}
          >
            <span className="bar-tooltip">{d.transaksi}</span>
          </div>
          <span className="bar-label">{d.hari}</span>
        </div>
      ))}
    </div>
  );
}

export default function App() {
  const [activeMenu, setActiveMenu] = useState("Overview");
  const [trendRange, setTrendRange] = useState("12B");

  return (
    <div className="dashboard">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="sidebar-logo">
          <div className="logo-icon">A</div>
          <span className="logo-text">Analitik</span>
        </div>

        <div className="sidebar-section">
          <p className="sidebar-label">Menu Utama</p>
          {menuItems.map(item => (
            <div
              key={item.label}
              className={`menu-item ${activeMenu === item.label ? "active" : ""}`}
              onClick={() => setActiveMenu(item.label)}
            >
              <span>{item.icon}</span>
              <span>{item.label}</span>
            </div>
          ))}
        </div>

        <hr className="sidebar-divider" />

        <div className="sidebar-section" style={{ marginTop: 12 }}>
          <p className="sidebar-label">Lainnya</p>
          <div className="menu-item">
            <span>⚙️</span>
            <span>Pengaturan</span>
          </div>
        </div>

        <div className="sidebar-help">
          <h4>Butuh bantuan?</h4>
          <p>Lihat dokumentasi & dukungan tim kami.</p>
          <button className="btn-support">Hubungi Support</button>
        </div>
      </aside>

      {/* Main */}
      <div className="main">
        {/* Topbar */}
        <header className="topbar">
          <div className="topbar-title">
            <h1>Dashboard Analitik</h1>
            <p>Selamat datang kembali, lihat performa bisnismu hari ini.</p>
          </div>
          <div className="topbar-right">
            <div className="search-box">
              <span>🔍</span>
              <input placeholder="Cari data, laporan, pelanggan..." />
            </div>
            <span className="notif-icon">🔔</span>
            <div className="user-profile">
              <div className="avatar">M</div>
              <div className="user-info">
                <p>Mutiara Permatasari</p>
                <p>Admin Analitik</p>
              </div>
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="content">
          {/* Stat Cards */}
          <div className="stat-grid">
            {stats.map(stat => (
              <div key={stat.label} className="stat-card">
                <div className="stat-card-header">
                  <span className="stat-icon">{stat.icon}</span>
                  <span className={`stat-badge ${stat.up ? "up" : "down"}`}>
                    {stat.up ? "▲" : "▼"} {stat.change}
                  </span>
                </div>
                <p className="stat-value">{stat.value}</p>
                <p className="stat-label">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* Charts */}
          <div className="chart-grid">
            {/* Tren Pendapatan */}
            <div className="chart-card">
              <div className="chart-header">
                <div>
                  <h3>Tren Pendapatan</h3>
                  <p>Performa pendapatan 12 bulan terakhir</p>
                </div>
                <div className="range-buttons">
                  {["6B", "12B", "1T"].map(r => (
                    <button
                      key={r}
                      className={`btn-range ${trendRange === r ? "active" : ""}`}
                      onClick={() => setTrendRange(r)}
                    >{r}</button>
                  ))}
                </div>
              </div>
              <AreaChart data={trendData} />
              <div className="chart-legend">
                <div className="legend-dot" />
                <span className="legend-text">Pendapatan Bersih</span>
              </div>
            </div>

            {/* Aktivitas Mingguan */}
            <div className="chart-card">
              <div className="chart-header">
                <div>
                  <h3>Aktivitas Mingguan</h3>
                  <p>Jumlah transaksi per hari</p>
                </div>
              </div>
              <BarChart data={weeklyData} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}