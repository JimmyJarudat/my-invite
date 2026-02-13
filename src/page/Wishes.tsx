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
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  const totalGuests = blessings
    .filter((b) => b.attendance === 'yes')
    .reduce((sum, b) => sum + (b.guests || 0), 0)

  const attendingCount = blessings.filter((b) => b.attendance === 'yes').length

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(160deg, #fdf6f0 0%, #fef0f5 40%, #f5f0ff 100%)',
        fontFamily: "'Sarabun', 'Noto Sans Thai', sans-serif",
      }}
    >
      {/* Decorative top bar */}
      <div
        style={{
          height: '4px',
          background: 'linear-gradient(90deg, #e8a0bf, #d4a574, #e8a0bf)',
        }}
      />

      <div style={{ maxWidth: '860px', margin: '0 auto', padding: '32px 16px 60px' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <p
            style={{
              fontSize: '14px',
              letterSpacing: '4px',
              color: '#c4956a',
              marginBottom: '8px',
              textTransform: 'uppercase',
            }}
          >
            Admin
          </p>
          <h1
            style={{
              fontSize: '32px',
              fontWeight: 300,
              color: '#5a3e36',
              letterSpacing: '2px',
              margin: '0 0 8px',
            }}
          >
            คำอวยพร
          </h1>
          <div
            style={{
              width: '60px',
              height: '1px',
              background: 'linear-gradient(90deg, transparent, #d4a574, transparent)',
              margin: '16px auto',
            }}
          />
          <p style={{ fontSize: '14px', color: '#9a8a80' }}>Jimmy & Saran</p>
        </div>

        {/* Stats Cards */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '12px',
            marginBottom: '32px',
          }}
        >
          {[
            { label: 'คำอวยพรทั้งหมด', value: blessings.length, icon: '💌' },
            { label: 'ตอบรับเข้าร่วม', value: attendingCount, icon: '✓' },
            { label: 'จำนวนแขก', value: totalGuests, icon: '👥' },
          ].map((stat) => (
            <div
              key={stat.label}
              style={{
                background: 'rgba(255,255,255,0.7)',
                backdropFilter: 'blur(10px)',
                borderRadius: '16px',
                padding: '20px 16px',
                textAlign: 'center',
                border: '1px solid rgba(212,165,116,0.15)',
              }}
            >
              <div style={{ fontSize: '24px', marginBottom: '4px' }}>{stat.icon}</div>
              <div style={{ fontSize: '28px', fontWeight: 600, color: '#5a3e36' }}>
                {loading ? '-' : stat.value}
              </div>
              <div style={{ fontSize: '12px', color: '#9a8a80', marginTop: '4px' }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Loading */}
        {loading ? (
          <div style={{ textAlign: 'center', padding: '80px 0' }}>
            <div
              style={{
                width: '36px',
                height: '36px',
                border: '2px solid #f0e0d6',
                borderTopColor: '#d4a574',
                borderRadius: '50%',
                animation: 'spin 0.8s linear infinite',
                margin: '0 auto 16px',
              }}
            />
            <p style={{ color: '#9a8a80', fontSize: '14px' }}>กำลังโหลด...</p>
            <style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>
          </div>
        ) : blessings.length === 0 ? (
          /* Empty State */
          <div
            style={{
              textAlign: 'center',
              padding: '80px 20px',
              background: 'rgba(255,255,255,0.5)',
              borderRadius: '20px',
              border: '1px dashed rgba(212,165,116,0.3)',
            }}
          >
            <div style={{ fontSize: '48px', marginBottom: '12px' }}>📭</div>
            <p style={{ color: '#9a8a80', fontSize: '16px' }}>ยังไม่มีคำอวยพร</p>
          </div>
        ) : (
          /* Blessings List */
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {blessings.map((item, index) => (
              <div
                key={item.id}
                style={{
                  background: 'rgba(255,255,255,0.75)',
                  backdropFilter: 'blur(10px)',
                  borderRadius: '20px',
                  padding: '24px',
                  border: '1px solid rgba(212,165,116,0.12)',
                  position: 'relative',
                  transition: 'transform 0.2s, box-shadow 0.2s',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)'
                  e.currentTarget.style.boxShadow = '0 8px 30px rgba(90,62,54,0.08)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)'
                  e.currentTarget.style.boxShadow = 'none'
                }}
              >
                {/* Number badge */}
                <div
                  style={{
                    position: 'absolute',
                    top: '24px',
                    right: '24px',
                    fontSize: '11px',
                    color: '#c4b5a8',
                    fontWeight: 500,
                  }}
                >
                  #{index + 1}
                </div>

                {/* Name & Badge */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    flexWrap: 'wrap',
                    marginBottom: '12px',
                  }}
                >
                  {/* Avatar */}
                  <div
                    style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '50%',
                      background: 'linear-gradient(135deg, #f5e6d8, #fce4ec)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '16px',
                      color: '#c4956a',
                      fontWeight: 600,
                      flexShrink: 0,
                    }}
                  >
                    {item.name.charAt(0).toUpperCase()}
                  </div>

                  <div>
                    <h3
                      style={{
                        margin: 0,
                        fontSize: '16px',
                        fontWeight: 600,
                        color: '#5a3e36',
                      }}
                    >
                      {item.name}
                    </h3>
                    <span
                      style={{
                        fontSize: '11px',
                        padding: '2px 10px',
                        borderRadius: '20px',
                        background:
                          item.attendance === 'yes' ? '#f0faf0' : '#f8f5f2',
                        color:
                          item.attendance === 'yes' ? '#4a8c5c' : '#a89a90',
                        border: `1px solid ${
                          item.attendance === 'yes'
                            ? 'rgba(74,140,92,0.2)'
                            : 'rgba(168,154,144,0.2)'
                        }`,
                      }}
                    >
                      {item.attendance === 'yes'
                        ? `เข้าร่วม ${item.guests} คน`
                        : 'ไม่เข้าร่วม'}
                    </span>
                  </div>
                </div>

                {/* Message */}
                {item.message && (
                  <div
                    style={{
                      background: 'linear-gradient(135deg, #fefcfa, #fef8f4)',
                      borderRadius: '12px',
                      padding: '16px 18px',
                      marginBottom: '14px',
                      borderLeft: '3px solid #e8c9a8',
                    }}
                  >
                    <p
                      style={{
                        margin: 0,
                        color: '#6b5a50',
                        fontSize: '14px',
                        lineHeight: 1.8,
                        whiteSpace: 'pre-line',
                      }}
                    >
                      {item.message}
                    </p>
                  </div>
                )}

                {/* Footer */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <p style={{ margin: 0, fontSize: '12px', color: '#b8a99e' }}>
                    🕐 {formatDate(item.createdAt)}
                  </p>

                  <button
                    onClick={() => handleDelete(item.id, item.name)}
                    disabled={deletingId === item.id}
                    style={{
                      background: 'none',
                      border: '1px solid transparent',
                      borderRadius: '10px',
                      padding: '6px 14px',
                      fontSize: '12px',
                      color: '#c4b0a5',
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                      opacity: deletingId === item.id ? 0.5 : 1,
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = '#d45b5b'
                      e.currentTarget.style.background = '#fef2f2'
                      e.currentTarget.style.borderColor = '#fecaca'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = '#c4b0a5'
                      e.currentTarget.style.background = 'none'
                      e.currentTarget.style.borderColor = 'transparent'
                    }}
                  >
                    {deletingId === item.id ? (
                      <>กำลังลบ...</>
                    ) : (
                      <>
                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
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
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Wishes