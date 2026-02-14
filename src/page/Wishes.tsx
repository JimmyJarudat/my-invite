import React, { useEffect, useState } from 'react'
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  deleteDoc,
  doc,
  Timestamp,
} from 'firebase/firestore'
import { db } from '../config/firebaseConfig'

interface Blessing {
  id: string
  name: string
  attendance: string
  guests: number
  message: string
  createdAt: Timestamp
}

const Wishes: React.FC = () => {
  const [blessings, setBlessings] = useState<Blessing[]>([])
  const [loading, setLoading] = useState(true)
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const [filter, setFilter] = useState<'all' | 'yes' | 'no'>('all')

  useEffect(() => {
    const q = query(collection(db, 'blessings'), orderBy('createdAt', 'desc'))
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Blessing[]
      setBlessings(data)
      setLoading(false)
    })
    return () => unsubscribe()
  }, [])

  const handleDelete = async (id: string, name: string) => {
    if (!window.confirm(`ต้องการลบคำอวยพรจาก "${name}" ใช่หรือไม่?`)) return
    setDeletingId(id)
    try {
      await deleteDoc(doc(db, 'blessings', id))
    } catch (error) {
      console.error('Error deleting blessing:', error)
      alert('เกิดข้อผิดพลาดในการลบ')
    } finally {
      setDeletingId(null)
    }
  }

  const formatDate = (timestamp: Timestamp) => {
    if (!timestamp) return '-'
    const date = timestamp.toDate()
    return date.toLocaleDateString('th-TH', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  const totalGuests = blessings
    .filter((b) => b.attendance === 'yes')
    .reduce((sum, b) => sum + (b.guests || 0), 0)

  const attendingCount = blessings.filter((b) => b.attendance === 'yes').length
  const notAttendingCount = blessings.filter((b) => b.attendance === 'no').length

  const filtered =
    filter === 'all'
      ? blessings
      : blessings.filter((b) => b.attendance === filter)

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+Thai:wght@300;400;500;600;700&family=Playfair+Display:ital,wght@0,400;0,600;1,400&display=swap');

        .wishes-page {
          min-height: 100vh;
          background: #faf7f5;
          font-family: 'Noto Sans Thai', 'Sarabun', sans-serif;
          color: #3d2c24;
        }

        /* Top Nav Bar */
        .wishes-topbar {
          background: white;
          border-bottom: 1px solid #f0e8e2;
          padding: 16px 24px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          position: sticky;
          top: 0;
          z-index: 50;
          backdrop-filter: blur(12px);
          background: rgba(255,255,255,0.9);
        }
        .wishes-topbar-left {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .wishes-topbar-logo {
          width: 36px;
          height: 36px;
          border-radius: 10px;
          background: linear-gradient(135deg, #ec4899, #f43f5e);
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-size: 16px;
        }
        .wishes-topbar h1 {
          font-size: 18px;
          font-weight: 600;
          color: #3d2c24;
          margin: 0;
          letter-spacing: -0.3px;
        }
        .wishes-topbar h1 span {
          color: #9a8a80;
          font-weight: 400;
          font-size: 14px;
          margin-left: 8px;
        }

        .wishes-container {
          max-width: 1080px;
          margin: 0 auto;
          padding: 28px 20px 60px;
        }

        /* Stats Row */
        .stats-row {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 14px;
          margin-bottom: 28px;
        }
        @media (max-width: 640px) {
          .stats-row { grid-template-columns: repeat(2, 1fr); }
        }
        .stat-card {
          background: white;
          border-radius: 16px;
          padding: 20px;
          border: 1px solid #f0e8e2;
          transition: box-shadow 0.2s;
        }
        .stat-card:hover {
          box-shadow: 0 4px 20px rgba(0,0,0,0.04);
        }
        .stat-label {
          font-size: 12px;
          color: #9a8a80;
          margin-bottom: 6px;
          font-weight: 500;
          letter-spacing: 0.3px;
        }
        .stat-value {
          font-size: 32px;
          font-weight: 700;
          color: #3d2c24;
          line-height: 1;
        }
        .stat-value.pink { color: #ec4899; }
        .stat-value.green { color: #22c55e; }
        .stat-value.amber { color: #f59e0b; }
        .stat-value.slate { color: #64748b; }

        /* Filter Bar */
        .filter-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 18px;
          flex-wrap: wrap;
          gap: 10px;
        }
        .filter-tabs {
          display: flex;
          gap: 6px;
          background: white;
          border-radius: 12px;
          padding: 4px;
          border: 1px solid #f0e8e2;
        }
        .filter-tab {
          padding: 8px 18px;
          border-radius: 9px;
          border: none;
          background: transparent;
          color: #9a8a80;
          font-size: 13px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s;
          font-family: inherit;
        }
        .filter-tab:hover {
          color: #5a3e36;
        }
        .filter-tab.active {
          background: linear-gradient(135deg, #ec4899, #f43f5e);
          color: white;
          box-shadow: 0 2px 8px rgba(236,72,153,0.25);
        }
        .filter-count {
          font-size: 13px;
          color: #9a8a80;
        }

        /* Blessings Table-style Cards */
        .blessings-list {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .blessing-card {
          background: white;
          border-radius: 16px;
          border: 1px solid #f0e8e2;
          overflow: hidden;
          transition: all 0.2s;
        }
        .blessing-card:hover {
          border-color: #f9a8d4;
          box-shadow: 0 4px 20px rgba(236,72,153,0.06);
        }

        .blessing-main {
          display: grid;
          grid-template-columns: 52px 1fr auto;
          align-items: center;
          gap: 14px;
          padding: 16px 20px;
        }
        @media (max-width: 640px) {
          .blessing-main {
            grid-template-columns: 44px 1fr;
            gap: 10px;
            padding: 14px 16px;
          }
        }

        .blessing-avatar {
          width: 44px;
          height: 44px;
          border-radius: 12px;
          background: linear-gradient(135deg, #fce7f3, #ffe4e6);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 18px;
          font-weight: 700;
          color: #ec4899;
          flex-shrink: 0;
        }

        .blessing-info {
          min-width: 0;
        }
        .blessing-name-row {
          display: flex;
          align-items: center;
          gap: 8px;
          flex-wrap: wrap;
        }
        .blessing-name {
          font-size: 15px;
          font-weight: 600;
          color: #3d2c24;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .blessing-badge {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          font-size: 11px;
          font-weight: 500;
          padding: 2px 10px;
          border-radius: 20px;
          white-space: nowrap;
        }
        .blessing-badge.yes {
          background: #f0fdf4;
          color: #16a34a;
          border: 1px solid #bbf7d0;
        }
        .blessing-badge.no {
          background: #fef2f2;
          color: #dc2626;
          border: 1px solid #fecaca;
        }
        .blessing-date {
          font-size: 12px;
          color: #b0a09a;
          margin-top: 2px;
        }

        .blessing-actions {
          display: flex;
          align-items: center;
          gap: 6px;
          flex-shrink: 0;
        }
        @media (max-width: 640px) {
          .blessing-actions {
            grid-column: 1 / -1;
            justify-content: flex-end;
            padding-top: 0;
          }
        }

        .btn-delete {
          background: transparent;
          border: 1px solid transparent;
          border-radius: 10px;
          padding: 7px 14px;
          font-size: 12px;
          color: #c4b0a5;
          cursor: pointer;
          transition: all 0.2s;
          font-family: inherit;
          display: flex;
          align-items: center;
          gap: 5px;
        }
        .btn-delete:hover {
          color: #ef4444;
          background: #fef2f2;
          border-color: #fecaca;
        }
        .btn-delete:disabled {
          opacity: 0.4;
          cursor: not-allowed;
        }

        /* Message area */
        .blessing-message {
          padding: 0 20px 16px 86px;
        }
        @media (max-width: 640px) {
          .blessing-message { padding: 0 16px 14px 16px; }
        }
        .blessing-message-box {
          background: #fefcfa;
          border-left: 3px solid #f9a8d4;
          border-radius: 0 10px 10px 0;
          padding: 12px 16px;
        }
        .blessing-message-text {
          margin: 0;
          font-size: 14px;
          line-height: 1.7;
          color: #5a4a40;
          white-space: pre-line;
        }

        /* Empty / Loading */
        .state-box {
          text-align: center;
          padding: 80px 20px;
          background: white;
          border-radius: 20px;
          border: 1px solid #f0e8e2;
        }
        .state-icon {
          font-size: 40px;
          margin-bottom: 12px;
        }
        .state-text {
          font-size: 15px;
          color: #9a8a80;
        }

        .spinner {
          width: 32px;
          height: 32px;
          border: 2.5px solid #f0e0d6;
          border-top-color: #ec4899;
          border-radius: 50%;
          animation: spin 0.7s linear infinite;
          margin: 0 auto 14px;
        }
        @keyframes spin { to { transform: rotate(360deg); } }

        /* Number index */
        .blessing-index {
          font-size: 11px;
          color: #c4b5a8;
          font-weight: 600;
          min-width: 20px;
        }
      `}</style>

      <div className="wishes-page">
        {/* Top Bar */}
        <div className="wishes-topbar">
          <div className="wishes-topbar-left">
            <div className="wishes-topbar-logo">💌</div>
            <h1>
              คำอวยพร
              <span>Jimmy & Saran</span>
            </h1>
          </div>
        </div>

        <div className="wishes-container">
          {/* Stats */}
          <div className="stats-row">
            {[
              { label: 'คำอวยพรทั้งหมด', value: blessings.length, cls: 'pink' },
              { label: 'ตอบรับเข้าร่วม', value: attendingCount, cls: 'green' },
              { label: 'ไม่สะดวก', value: notAttendingCount, cls: 'amber' },
              { label: 'จำนวนแขกรวม', value: totalGuests, cls: 'slate' },
            ].map((s) => (
              <div className="stat-card" key={s.label}>
                <div className="stat-label">{s.label}</div>
                <div className={`stat-value ${s.cls}`}>
                  {loading ? '–' : s.value}
                </div>
              </div>
            ))}
          </div>

          {/* Filter */}
          <div className="filter-bar">
            <div className="filter-tabs">
              <button
                className={`filter-tab ${filter === 'all' ? 'active' : ''}`}
                onClick={() => setFilter('all')}
              >
                ทั้งหมด
              </button>
              <button
                className={`filter-tab ${filter === 'yes' ? 'active' : ''}`}
                onClick={() => setFilter('yes')}
              >
                ✓ เข้าร่วม
              </button>
              <button
                className={`filter-tab ${filter === 'no' ? 'active' : ''}`}
                onClick={() => setFilter('no')}
              >
                ✗ ไม่สะดวก
              </button>
            </div>
            <div className="filter-count">
              แสดง {filtered.length} รายการ
            </div>
          </div>

          {/* Content */}
          {loading ? (
            <div className="state-box">
              <div className="spinner" />
              <p className="state-text">กำลังโหลด...</p>
            </div>
          ) : filtered.length === 0 ? (
            <div className="state-box">
              <div className="state-icon">📭</div>
              <p className="state-text">
                {filter === 'all'
                  ? 'ยังไม่มีคำอวยพร'
                  : 'ไม่พบรายการในหมวดนี้'}
              </p>
            </div>
          ) : (
            <div className="blessings-list">
              {filtered.map((item, index) => (
                <div className="blessing-card" key={item.id}>
                  <div className="blessing-main">
                    {/* Avatar */}
                    <div className="blessing-avatar">
                      {item.name.charAt(0).toUpperCase()}
                    </div>

                    {/* Info */}
                    <div className="blessing-info">
                      <div className="blessing-name-row">
                        <span className="blessing-name">{item.name}</span>
                        <span
                          className={`blessing-badge ${item.attendance === 'yes' ? 'yes' : 'no'}`}
                        >
                          {item.attendance === 'yes'
                            ? `เข้าร่วม ${item.guests} คน`
                            : 'ไม่เข้าร่วม'}
                        </span>
                      </div>
                      <div className="blessing-date">
                        {formatDate(item.createdAt)}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="blessing-actions">
                      <span className="blessing-index">#{index + 1}</span>
                      <button
                        className="btn-delete"
                        onClick={() => handleDelete(item.id, item.name)}
                        disabled={deletingId === item.id}
                      >
                        {deletingId === item.id ? (
                          'กำลังลบ...'
                        ) : (
                          <>
                            <svg width="14" height="14" viewBox="0 0 20 20" fill="currentColor">
                              <path
                                fillRule="evenodd"
                                d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                                clipRule="evenodd"
                              />
                            </svg>
                            ลบ
                          </>
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Message */}
                  {item.message && (
                    <div className="blessing-message">
                      <div className="blessing-message-box">
                        <p className="blessing-message-text">{item.message}</p>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default Wishes