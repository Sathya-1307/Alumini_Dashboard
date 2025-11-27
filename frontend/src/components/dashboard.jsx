import React, { useState } from 'react';

export default function MentorshipDashboard() {
  const [filterStatus, setFilterStatus] = useState('all');

  // Sample data - In production, this would come from an API
  const dashboardStats = {
    totalMentors: 24,
    totalMentees: 68,
    completedMeetings: 142,
    upcomingMeetings: 28,
    postponedMeetings: 5
  };

  const sessions = [
    {
      id: 1,
      mentorName: 'Dr. Sarah Johnson',
      menteeName: 'Arun Kumar',
      date: '2025-11-20',
      time: '10:00 AM',
      status: 'completed',
      topic: 'Web Development Basics'
    },
    {
      id: 2,
      mentorName: 'Prof. Michael Chen',
      menteeName: 'Priya Sharma',
      date: '2025-11-28',
      time: '2:00 PM',
      status: 'upcoming',
      topic: 'Machine Learning Fundamentals'
    },
    {
      id: 3,
      mentorName: 'Dr. Sarah Johnson',
      menteeName: 'Ravi Patel',
      date: '2025-11-25',
      time: '11:00 AM',
      status: 'completed',
      topic: 'React Best Practices'
    },
    {
      id: 4,
      mentorName: 'Dr. Emily Rodriguez',
      menteeName: 'Ananya Reddy',
      date: '2025-11-29',
      time: '3:30 PM',
      status: 'upcoming',
      topic: 'Data Structures & Algorithms'
    },
    {
      id: 5,
      mentorName: 'Prof. Michael Chen',
      menteeName: 'Karthik Menon',
      date: '2025-11-22',
      time: '4:00 PM',
      status: 'postponed',
      topic: 'Python Programming'
    },
    {
      id: 6,
      mentorName: 'Dr. James Wilson',
      menteeName: 'Sneha Iyer',
      date: '2025-11-30',
      time: '1:00 PM',
      status: 'upcoming',
      topic: 'Cloud Computing Introduction'
    },
    {
      id: 7,
      mentorName: 'Dr. Sarah Johnson',
      menteeName: 'Vikram Singh',
      date: '2025-11-18',
      time: '9:00 AM',
      status: 'completed',
      topic: 'Frontend Architecture'
    },
    {
      id: 8,
      mentorName: 'Prof. Michael Chen',
      menteeName: 'Divya Krishnan',
      date: '2025-11-26',
      time: '5:00 PM',
      status: 'postponed',
      topic: 'AI Ethics Discussion'
    },
    {
      id: 9,
      mentorName: 'Dr. Emily Rodriguez',
      menteeName: 'Arjun Nair',
      date: '2025-12-01',
      time: '10:30 AM',
      status: 'upcoming',
      topic: 'System Design Principles'
    },
    {
      id: 10,
      mentorName: 'Dr. James Wilson',
      menteeName: 'Meera Pillai',
      date: '2025-11-19',
      time: '2:30 PM',
      status: 'completed',
      topic: 'DevOps Practices'
    }
  ];

  // Calculate mentor-mentee distribution
  const mentorMenteeCount = sessions.reduce((acc, session) => {
    if (!acc[session.mentorName]) {
      acc[session.mentorName] = new Set();
    }
    acc[session.mentorName].add(session.menteeName);
    return acc;
  }, {});

  const filteredSessions = sessions.filter(session => {
    if (filterStatus === 'all') return true;
    return session.status === filterStatus;
  });

  const getStatusColor = (status) => {
    switch(status) {
      case 'completed':
        return { background: '#dcfce7', color: '#166534', border: '#bbf7d0' };
      case 'upcoming':
        return { background: '#dbeafe', color: '#1e40af', border: '#bfdbfe' };
      case 'postponed':
        return { background: '#fef3c7', color: '#92400e', border: '#fde68a' };
      default:
        return { background: '#f3f4f6', color: '#374151', border: '#e5e7eb' };
    }
  };

  const getStatusIcon = (status) => {
    switch(status) {
      case 'completed':
        return '✓';
      case 'upcoming':
        return '📅';
      case 'postponed':
        return '⏸';
      default:
        return '•';
    }
  };

  return (
    <div style={styles.wrapper}>
      

      <div style={styles.container}>
        {/* Header */}
        <div style={styles.header}>
          <div style={styles.logo}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={styles.logoSvg}>
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
              <circle cx="9" cy="7" r="4"></circle>
              <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
              <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
            </svg>
          </div>
          <h1 style={styles.title}>Mentorship Dashboard</h1>
          <p style={styles.subtitle}>Track and manage all mentorship sessions</p>
        </div>

        {/* Stats Cards */}
        <div style={styles.statsGrid}>
          <div style={styles.statCard}>
            <div style={{...styles.statIcon, background: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)'}}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={styles.statIconSvg}>
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                <circle cx="9" cy="7" r="4"></circle>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
              </svg>
            </div>
            <div style={styles.statContent}>
              <div style={styles.statValue}>{dashboardStats.totalMentors}</div>
              <div style={styles.statLabel}>Total Mentors</div>
            </div>
          </div>

          <div style={styles.statCard}>
            <div style={{...styles.statIcon, background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)'}}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={styles.statIconSvg}>
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                <circle cx="9" cy="7" r="4"></circle>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
              </svg>
            </div>
            <div style={styles.statContent}>
              <div style={styles.statValue}>{dashboardStats.totalMentees}</div>
              <div style={styles.statLabel}>Total Mentees</div>
            </div>
          </div>

          <div style={styles.statCard}>
            <div style={{...styles.statIcon, background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)'}}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={styles.statIconSvg}>
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                <polyline points="22 4 12 14.01 9 11.01"></polyline>
              </svg>
            </div>
            <div style={styles.statContent}>
              <div style={styles.statValue}>{dashboardStats.completedMeetings}</div>
              <div style={styles.statLabel}>Completed</div>
            </div>
          </div>

          <div style={styles.statCard}>
            <div style={{...styles.statIcon, background: 'linear-gradient(135deg, #06b6d4 0%, #0891b2 100%)'}}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={styles.statIconSvg}>
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                <line x1="16" y1="2" x2="16" y2="6"></line>
                <line x1="8" y1="2" x2="8" y2="6"></line>
                <line x1="3" y1="10" x2="21" y2="10"></line>
              </svg>
            </div>
            <div style={styles.statContent}>
              <div style={styles.statValue}>{dashboardStats.upcomingMeetings}</div>
              <div style={styles.statLabel}>Upcoming</div>
            </div>
          </div>

          <div style={styles.statCard}>
            <div style={{...styles.statIcon, background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)'}}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={styles.statIconSvg}>
                <circle cx="12" cy="12" r="10"></circle>
                <polyline points="12 6 12 12 16 14"></polyline>
              </svg>
            </div>
            <div style={styles.statContent}>
              <div style={styles.statValue}>{dashboardStats.postponedMeetings}</div>
              <div style={styles.statLabel}>Postponed</div>
            </div>
          </div>
        </div>

        {/* Mentor Capacity Section */}
        <div style={styles.capacityCard}>
          <div style={styles.capacityHeader}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={styles.capacityIcon}>
              <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
              <circle cx="8.5" cy="7" r="4"></circle>
              <line x1="20" y1="8" x2="20" y2="14"></line>
              <line x1="23" y1="11" x2="17" y2="11"></line>
            </svg>
            <h2 style={styles.capacityTitle}>Mentor Capacity Overview</h2>
          </div>
          <p style={styles.capacitySubtitle}>Each mentor supports maximum 3 mentees for personalized attention</p>
          <div style={styles.capacityGrid}>
            {Object.entries(mentorMenteeCount).map(([mentor, mentees]) => {
              const count = mentees.size;
              const percentage = (count / 3) * 100;
              const isOverCapacity = count > 3;
              
              return (
                <div key={mentor} style={styles.capacityItem}>
                  <div style={styles.capacityItemHeader}>
                    <h3 style={styles.mentorName}>{mentor}</h3>
                    <span style={styles.menteeCount}>{count}/3 mentees</span>
                  </div>
                  
                  <div style={styles.progressBar}>
                    <div 
                      style={{
                        ...styles.progressFill,
                        width: `${Math.min(percentage, 100)}%`,
                        background: isOverCapacity 
                          ? 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)'
                          : 'linear-gradient(135deg, #10b981 0%, #059669 100%)'
                      }}
                    />
                  </div>
                  
                  <div style={styles.capacityStatus}>
                    {isOverCapacity ? (
                      <>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={styles.statusIcon}>
                          <circle cx="12" cy="12" r="10"></circle>
                          <line x1="15" y1="9" x2="9" y2="15"></line>
                          <line x1="9" y1="9" x2="15" y2="15"></line>
                        </svg>
                        <span style={styles.statusWarning}>⚠ Over capacity</span>
                      </>
                    ) : (
                      <>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={styles.statusIcon}>
                          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                          <polyline points="22 4 12 14.01 9 11.01"></polyline>
                        </svg>
                        <span style={styles.statusGood}>✓ Within capacity</span>
                      </>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Sessions Section */}
        <div style={styles.sessionsCard}>
          <div style={styles.sessionsHeader}>
            <h2 style={styles.sessionsTitle}>All Sessions</h2>
            <div style={styles.filterContainer}>
              <button
                onClick={() => setFilterStatus('all')}
                style={{
                  ...styles.filterBtn,
                  ...(filterStatus === 'all' ? styles.filterBtnActive : {})
                }}
              >
                All
              </button>
              <button
                onClick={() => setFilterStatus('completed')}
                style={{
                  ...styles.filterBtn,
                  ...(filterStatus === 'completed' ? styles.filterBtnActiveGreen : {})
                }}
              >
                Completed
              </button>
              <button
                onClick={() => setFilterStatus('upcoming')}
                style={{
                  ...styles.filterBtn,
                  ...(filterStatus === 'upcoming' ? styles.filterBtnActiveBlue : {})
                }}
              >
                Upcoming
              </button>
              <button
                onClick={() => setFilterStatus('postponed')}
                style={{
                  ...styles.filterBtn,
                  ...(filterStatus === 'postponed' ? styles.filterBtnActiveAmber : {})
                }}
              >
                Postponed
              </button>
            </div>
          </div>

          <div style={styles.sessionsGrid}>
            {filteredSessions.map(session => {
              const statusColors = getStatusColor(session.status);
              return (
                <div key={session.id} style={styles.sessionCard}>
                  <div style={styles.sessionHeader}>
                    <span style={styles.sessionIcon}>{getStatusIcon(session.status)}</span>
                    <span style={styles.sessionTopic}>{session.topic}</span>
                    <span style={{
                      ...styles.statusBadge,
                      background: statusColors.background,
                      color: statusColors.color,
                      borderColor: statusColors.border
                    }}>
                      {session.status.charAt(0).toUpperCase() + session.status.slice(1)}
                    </span>
                  </div>
                  
                  <div style={styles.sessionDetails}>
                    <div style={styles.sessionRow}>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={styles.sessionDetailIcon}>
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                        <circle cx="12" cy="7" r="4"></circle>
                      </svg>
                      <div style={styles.sessionDetailText}>
                        <span style={styles.sessionLabel}>Mentor:</span>
                        <span style={styles.sessionValue}>{session.mentorName}</span>
                      </div>
                    </div>

                    <div style={styles.sessionRow}>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={styles.sessionDetailIcon}>
                        <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                        <circle cx="8.5" cy="7" r="4"></circle>
                        <line x1="23" y1="11" x2="17" y2="11"></line>
                      </svg>
                      <div style={styles.sessionDetailText}>
                        <span style={styles.sessionLabel}>Mentee:</span>
                        <span style={styles.sessionValue}>{session.menteeName}</span>
                      </div>
                    </div>

                    <div style={styles.sessionRow}>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={styles.sessionDetailIcon}>
                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                        <line x1="16" y1="2" x2="16" y2="6"></line>
                        <line x1="8" y1="2" x2="8" y2="6"></line>
                        <line x1="3" y1="10" x2="21" y2="10"></line>
                      </svg>
                      <div style={styles.sessionDetailText}>
                        <span style={styles.sessionLabel}>Date:</span>
                        <span style={styles.sessionValue}>{new Date(session.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                      </div>
                    </div>

                    <div style={styles.sessionRow}>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={styles.sessionDetailIcon}>
                        <circle cx="12" cy="12" r="10"></circle>
                        <polyline points="12 6 12 12 16 14"></polyline>
                      </svg>
                      <div style={styles.sessionDetailText}>
                        <span style={styles.sessionLabel}>Time:</span>
                        <span style={styles.sessionValue}>{session.time}</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {filteredSessions.length === 0 && (
            <div style={styles.emptyState}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={styles.emptyIcon}>
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="8" x2="12" y2="12"></line>
                <line x1="12" y1="16" x2="12.01" y2="16"></line>
              </svg>
              <p style={styles.emptyText}>No sessions found for this filter</p>
            </div>
          )}
        </div>

        {/* Enhanced Footer */}
        <footer style={styles.footer}>
          <div style={styles.footerContent}>
            <div style={styles.footerSection}>
              <h3 style={styles.footerTitle}>Mentorship Program</h3>
              <p style={styles.footerText}>
                Empowering growth through meaningful mentorship relationships. 
                Each mentor guides up to 3 mentees for personalized attention.
              </p>
            </div>
            
            <div style={styles.footerSection}>
              <h3 style={styles.footerTitle}>Quick Links</h3>
              <div style={styles.footerLinks}>
                <a href="#" style={styles.footerLink}>Home</a>
                <a href="#" style={styles.footerLink}>Mentors</a>
                <a href="#" style={styles.footerLink}>Resources</a>
                <a href="#" style={styles.footerLink}>Support</a>
              </div>
            </div>
            
            <div style={styles.footerSection}>
              <h3 style={styles.footerTitle}>Contact Info</h3>
              <div style={styles.contactInfo}>
                <div style={styles.contactItem}>
                  <span style={styles.contactIcon}>📧</span>
                  <span>mentorship@example.com</span>
                </div>
                <div style={styles.contactItem}>
                  <span style={styles.contactIcon}>📞</span>
                  <span>+1 (555) 123-4567</span>
                </div>
                <div style={styles.contactItem}>
                  <span style={styles.contactIcon}>🏢</span>
                  <span>123 Learning St, Education City</span>
                </div>
              </div>
            </div>
          </div>
          
          <div style={styles.footerBottom}>
            <div style={styles.footerBottomContent}>
              <p style={styles.copyright}>
                © 2025 Mentorship Program. All rights reserved.
              </p>
              <div style={styles.socialLinks}>
                <a href="#" style={styles.socialLink}>Twitter</a>
                <a href="#" style={styles.socialLink}>LinkedIn</a>
                <a href="#" style={styles.socialLink}>GitHub</a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}

const styles = {
  wrapper: {
    minHeight: '100vh',
    width: '100%',
    background: 'linear-gradient(180deg, #e9d5ff 0%, #f3e8ff 30%, #e0e7ff 60%, #dbeafe 100%)',
    padding: '60px 20px',
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    position: 'relative'
  },
  dashboardBtn: {
    position: 'absolute',
    top: '25px',
    left: '25px',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '10px 20px',
    background: 'white',
    border: 'none',
    borderRadius: '20px',
    color: '#7c3aed',
    fontSize: '0.9em',
    fontWeight: '500',
    cursor: 'pointer',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
    transition: 'all 0.2s ease'
  },
  dashboardIcon: {
    fontSize: '1.2em',
    lineHeight: '1',
    color: '#7c3aed'
  },
  dashboardText: {
    letterSpacing: '0.2px',
    color: '#7c3aed'
  },
  container: {
    maxWidth: '1400px',
    margin: '0 auto'
  },
  header: {
    textAlign: 'center',
    marginBottom: '40px'
  },
  logo: {
    width: '72px',
    height: '72px',
    background: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)',
    borderRadius: '20px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0 auto 24px',
    boxShadow: '0 8px 24px rgba(139, 92, 246, 0.35)'
  },
  logoSvg: {
    width: '36px',
    height: '36px',
    color: 'white'
  },
  title: {
    fontSize: '2.5em',
    fontWeight: '800',
    background: 'linear-gradient(135deg, #7c3aed 0%, #6d28d9 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    marginBottom: '8px'
  },
  subtitle: {
    color: '#6b7280',
    fontSize: '1em',
    fontWeight: '400'
  },
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
    gap: '20px',
    marginBottom: '40px'
  },
  statCard: {
    background: 'white',
    borderRadius: '16px',
    padding: '24px',
    display: 'flex',
    alignItems: 'center',
    gap: '20px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
    transition: 'all 0.3s ease'
  },
  statIcon: {
    width: '56px',
    height: '56px',
    borderRadius: '12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0
  },
  statIconSvg: {
    width: '28px',
    height: '28px',
    color: 'white'
  },
  statContent: {
    flex: '1'
  },
  statValue: {
    fontSize: '2em',
    fontWeight: '800',
    color: '#1f2937',
    lineHeight: '1'
  },
  statLabel: {
    fontSize: '0.85em',
    color: '#6b7280',
    fontWeight: '500',
    marginTop: '4px'
  },
  // Capacity Section
  capacityCard: {
    background: 'white',
    borderRadius: '20px',
    padding: '32px',
    boxShadow: '0 10px 40px rgba(0, 0, 0, 0.12)',
    marginBottom: '32px'
  },
  capacityHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    marginBottom: '8px'
  },
  capacityIcon: {
    width: '24px',
    height: '24px',
    color: '#8b5cf6'
  },
  capacityTitle: {
    fontSize: '1.5em',
    fontWeight: '700',
    color: '#1f2937',
    margin: '0'
  },
  capacitySubtitle: {
    color: '#6b7280',
    fontSize: '1em',
    marginBottom: '24px'
  },
  capacityGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '20px'
  },
  capacityItem: {
    background: '#f9fafb',
    border: '1.5px solid #e5e7eb',
    borderRadius: '14px',
    padding: '20px'
  },
  capacityItemHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '12px'
  },
  mentorName: {
    fontSize: '1em',
    fontWeight: '600',
    color: '#1f2937',
    margin: '0'
  },
  menteeCount: {
    fontSize: '0.9em',
    fontWeight: '500',
    color: '#6b7280'
  },
  progressBar: {
    width: '100%',
    height: '8px',
    backgroundColor: '#e5e7eb',
    borderRadius: '4px',
    overflow: 'hidden',
    marginBottom: '8px'
  },
  progressFill: {
    height: '100%',
    borderRadius: '4px',
    transition: 'width 0.3s ease'
  },
  capacityStatus: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: '0.85em',
    fontWeight: '500'
  },
  statusIcon: {
    width: '16px',
    height: '16px'
  },
  statusGood: {
    color: '#059669'
  },
  statusWarning: {
    color: '#dc2626'
  },
  // Sessions Section
  sessionsCard: {
    background: 'white',
    borderRadius: '20px',
    padding: '32px',
    boxShadow: '0 10px 40px rgba(0, 0, 0, 0.12)',
    marginBottom: '32px'
  },
  sessionsHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '32px',
    flexWrap: 'wrap',
    gap: '20px'
  },
  sessionsTitle: {
    fontSize: '1.5em',
    fontWeight: '700',
    color: '#1f2937'
  },
  filterContainer: {
    display: 'flex',
    gap: '10px',
    flexWrap: 'wrap'
  },
  filterBtn: {
    padding: '8px 20px',
    border: '1.5px solid #e5e7eb',
    borderRadius: '10px',
    background: 'white',
    color: '#6b7280',
    fontSize: '0.9em',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.2s ease'
  },
  filterBtnActive: {
    background: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)',
    color: 'white',
    borderColor: '#8b5cf6'
  },
  filterBtnActiveGreen: {
    background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
    color: 'white',
    borderColor: '#10b981'
  },
  filterBtnActiveBlue: {
    background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
    color: 'white',
    borderColor: '#3b82f6'
  },
  filterBtnActiveAmber: {
    background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
    color: 'white',
    borderColor: '#f59e0b'
  },
  sessionsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
    gap: '20px'
  },
  sessionCard: {
    background: '#f9fafb',
    border: '1.5px solid #e5e7eb',
    borderRadius: '14px',
    padding: '20px',
    transition: 'all 0.2s ease'
  },
  sessionHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    marginBottom: '16px',
    paddingBottom: '12px',
    borderBottom: '1px solid #e5e7eb'
  },
  sessionIcon: {
    fontSize: '1.2em'
  },
  sessionTopic: {
    flex: '1',
    fontSize: '0.95em',
    fontWeight: '700',
    color: '#1f2937'
  },
  statusBadge: {
    padding: '4px 12px',
    borderRadius: '8px',
    fontSize: '0.75em',
    fontWeight: '600',
    border: '1px solid'
  },
  sessionDetails: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px'
  },
  sessionRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px'
  },
  sessionDetailIcon: {
    width: '18px',
    height: '18px',
    color: '#8b5cf6',
    flexShrink: 0
  },
  sessionDetailText: {
    display: 'flex',
    gap: '8px',
    alignItems: 'center',
    flex: '1'
  },
  sessionLabel: {
    fontSize: '0.85em',
    color: '#6b7280',
    fontWeight: '500',
    minWidth: '55px'
  },
  sessionValue: {
    fontSize: '0.85em',
    color: '#1f2937',
    fontWeight: '600'
  },
  emptyState: {
    textAlign: 'center',
    padding: '60px 20px',
    color: '#9ca3af'
  },
  emptyIcon: {
    width: '64px',
    height: '64px',
    margin: '0 auto 16px',
    color: '#d1d5db'
  },
  emptyText: {
    fontSize: '1em',
    fontWeight: '500'
  },
  // Enhanced Footer
  footer: {
    background: 'white',
    borderRadius: '20px',
    overflow: 'hidden',
    boxShadow: '0 10px 40px rgba(0, 0, 0, 0.12)'
  },
  footerContent: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '40px',
    padding: '40px'
  },
  footerSection: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px'
  },
  footerTitle: {
    fontSize: '1.1em',
    fontWeight: '700',
    color: '#1f2937',
    marginBottom: '8px'
  },
  footerText: {
    color: '#6b7280',
    fontSize: '0.9em',
    lineHeight: '1.5'
  },
  footerLinks: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px'
  },
  footerLink: {
    color: '#6b7280',
    textDecoration: 'none',
    fontSize: '0.9em',
    transition: 'color 0.2s ease'
  },
  contactInfo: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px'
  },
  contactItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    color: '#6b7280',
    fontSize: '0.9em'
  },
  contactIcon: {
    fontSize: '1.1em'
  },
  footerBottom: {
    borderTop: '1px solid #e5e7eb',
    padding: '24px 40px',
    background: '#f9fafb'
  },
  footerBottomContent: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: '16px'
  },
  copyright: {
    color: '#6b7280',
    fontSize: '0.85em',
    fontWeight: '500'
  },
  socialLinks: {
    display: 'flex',
    gap: '20px'
  },
  socialLink: {
    color: '#6b7280',
    textDecoration: 'none',
    fontSize: '0.85em',
    fontWeight: '500',
    transition: 'color 0.2s ease'
  }
};