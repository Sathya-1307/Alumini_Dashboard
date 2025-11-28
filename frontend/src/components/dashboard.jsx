import React, { useState, useEffect } from 'react';

export default function MentorshipDashboard() {
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchMentor, setSearchMentor] = useState('');
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);

  // Detect screen size
  useEffect(() => {
    const checkScreenSize = () => {
      const width = window.innerWidth;
      setIsMobile(width < 768);
      setIsTablet(width >= 768 && width < 1024);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

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

  // Calculate mentor capacity data
  const mentorCapacityData = sessions.reduce((acc, session) => {
    if (!acc[session.mentorName]) {
      acc[session.mentorName] = {
        mentees: new Set(),
        sessions: []
      };
    }
    acc[session.mentorName].mentees.add(session.menteeName);
    acc[session.mentorName].sessions.push(session);
    return acc;
  }, {});

  // Filter sessions based on status and mentor search
  const filteredSessions = sessions.filter(session => {
    const statusMatch = filterStatus === 'all' || session.status === filterStatus;
    const mentorMatch = !searchMentor || 
      session.mentorName.toLowerCase().includes(searchMentor.toLowerCase());
    return statusMatch && mentorMatch;
  });

  // Filter mentor capacity data based on search
  const filteredMentorCapacity = Object.entries(mentorCapacityData)
    .filter(([mentorName]) => 
      !searchMentor || mentorName.toLowerCase().includes(searchMentor.toLowerCase())
    )
    .reduce((acc, [mentorName, data]) => {
      acc[mentorName] = data;
      return acc;
    }, {});

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
          <h1 style={isMobile ? styles.titleMobile : styles.title}>Mentorship Dashboard</h1>
          <p style={isMobile ? styles.subtitleMobile : styles.subtitle}>Track and manage all mentorship sessions</p>
        </div>

        {/* Stats Cards */}
        <div style={isMobile ? styles.statsGridMobile : isTablet ? styles.statsGridTablet : styles.statsGrid}>
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
              <div style={isMobile ? styles.statValueMobile : styles.statValue}>{dashboardStats.totalMentors}</div>
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
              <div style={isMobile ? styles.statValueMobile : styles.statValue}>{dashboardStats.totalMentees}</div>
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
              <div style={isMobile ? styles.statValueMobile : styles.statValue}>{dashboardStats.completedMeetings}</div>
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
              <div style={isMobile ? styles.statValueMobile : styles.statValue}>{dashboardStats.upcomingMeetings}</div>
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
              <div style={isMobile ? styles.statValueMobile : styles.statValue}>{dashboardStats.postponedMeetings}</div>
              <div style={styles.statLabel}>Postponed</div>
            </div>
          </div>
        </div>

        {/* Search Section */}
        <div style={styles.searchCard}>
          <div style={styles.searchHeader}>
            <h2 style={isMobile ? styles.searchTitleMobile : styles.searchTitle}>Search Mentors</h2>
          </div>
          <div style={styles.searchContent}>
            <div style={styles.searchBox}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={styles.searchIcon}>
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
              <input
                type="text"
                placeholder="Search by mentor name..."
                value={searchMentor}
                onChange={(e) => setSearchMentor(e.target.value)}
                style={styles.searchInput}
              />
              {searchMentor && (
                <button
                  onClick={() => setSearchMentor('')}
                  style={styles.clearSearch}
                >
                  ✕
                </button>
              )}
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
            <h2 style={isMobile ? styles.capacityTitleMobile : styles.capacityTitle}>
              Mentor Capacity {searchMentor && `- Results for "${searchMentor}"`}
            </h2>
          </div>
          <p style={isMobile ? styles.capacitySubtitleMobile : styles.capacitySubtitle}>
            Each mentor supports maximum 3 mentees for personalized attention
          </p>
          
          {Object.keys(filteredMentorCapacity).length === 0 ? (
            <div style={styles.emptyState}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={styles.emptyIcon}>
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="8" x2="12" y2="12"></line>
                <line x1="12" y1="16" x2="12.01" y2="16"></line>
              </svg>
              <p style={styles.emptyText}>
                {searchMentor ? `No mentors found for "${searchMentor}"` : 'No mentor data available'}
              </p>
            </div>
          ) : (
            <div style={isMobile ? styles.capacityGridMobile : isTablet ? styles.capacityGridTablet : styles.capacityGrid}>
              {Object.entries(filteredMentorCapacity).map(([mentor, data]) => {
                const count = data.mentees.size;
                const percentage = (count / 3) * 100;
                const isOverCapacity = count > 3;
                
                return (
                  <div key={mentor} style={styles.capacityItem}>
                    <div style={styles.capacityItemHeader}>
                      <h3 style={isMobile ? styles.mentorNameMobile : styles.mentorName}>{mentor}</h3>
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
                    
                    {isOverCapacity && (
                      <div style={styles.capacityStatus}>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={styles.statusIcon}>
                          <circle cx="12" cy="12" r="10"></circle>
                          <line x1="15" y1="9" x2="9" y2="15"></line>
                          <line x1="9" y1="9" x2="15" y2="15"></line>
                        </svg>
                        <span style={styles.statusWarning}>Over capacity</span>
                      </div>
                    )}

                    {/* Mentee List */}
                    <div style={styles.menteeList}>
                      <span style={styles.menteeListTitle}>Current Mentees:</span>
                      <div style={styles.menteeNames}>
                        {Array.from(data.mentees).map((mentee, index) => (
                          <span key={index} style={styles.menteeName}>
                            <span style={styles.menteeBullet}>•</span>
                            {mentee}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Sessions Section */}
        <div style={styles.sessionsCard}>
          <div style={isMobile ? styles.sessionsHeaderMobile : styles.sessionsHeader}>
            <div>
              <h2 style={isMobile ? styles.sessionsTitleMobile : styles.sessionsTitle}>
                All Sessions {searchMentor && `- Filtered by "${searchMentor}"`}
              </h2>
              <div style={styles.sessionCount}>
                {filteredSessions.length} session{filteredSessions.length !== 1 ? 's' : ''} found
              </div>
            </div>
            
            {/* Status Filter */}
            <div style={isMobile ? styles.filterGroupMobile : styles.filterGroup}>
              <span style={styles.filterLabel}>Filter by Status:</span>
              <div style={isMobile ? styles.filterButtonsMobile : styles.filterButtons}>
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
          </div>

          {filteredSessions.length === 0 ? (
            <div style={styles.emptyState}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={styles.emptyIcon}>
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="8" x2="12" y2="12"></line>
                <line x1="12" y1="16" x2="12.01" y2="16"></line>
              </svg>
              <p style={styles.emptyText}>
                {searchMentor || filterStatus !== 'all' 
                  ? `No sessions found for the current filters` 
                  : 'No sessions available'
                }
              </p>
            </div>
          ) : (
            <div style={isMobile ? styles.sessionsGridMobile : isTablet ? styles.sessionsGridTablet : styles.sessionsGrid}>
              {filteredSessions.map(session => {
                const statusColors = getStatusColor(session.status);
                return (
                  <div key={session.id} style={styles.sessionCard}>
                    <div style={styles.sessionHeader}>
                      <span style={styles.sessionIcon}>{getStatusIcon(session.status)}</span>
                      <span style={isMobile ? styles.sessionTopicMobile : styles.sessionTopic}>{session.topic}</span>
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
                          <span style={isMobile ? styles.sessionValueMobile : styles.sessionValue}>{session.mentorName}</span>
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
                          <span style={isMobile ? styles.sessionValueMobile : styles.sessionValue}>{session.menteeName}</span>
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
                          <span style={isMobile ? styles.sessionValueMobile : styles.sessionValue}>
                            {new Date(session.date).toLocaleDateString('en-US', { 
                              month: 'short', 
                              day: 'numeric', 
                              year: 'numeric' 
                            })}
                          </span>
                        </div>
                      </div>

                      <div style={styles.sessionRow}>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={styles.sessionDetailIcon}>
                          <circle cx="12" cy="12" r="10"></circle>
                          <polyline points="12 6 12 12 16 14"></polyline>
                        </svg>
                        <div style={styles.sessionDetailText}>
                          <span style={styles.sessionLabel}>Time:</span>
                          <span style={isMobile ? styles.sessionValueMobile : styles.sessionValue}>{session.time}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Enhanced Footer */}
        <footer style={styles.footer}>
          <div style={isMobile ? styles.footerContentMobile : isTablet ? styles.footerContentTablet : styles.footerContent}>
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
                  <span style={isMobile ? styles.contactTextMobile : styles.contactText}>mentorship@example.com</span>
                </div>
                <div style={styles.contactItem}>
                  <span style={styles.contactIcon}>📞</span>
                  <span style={isMobile ? styles.contactTextMobile : styles.contactText}>+1 (555) 123-4567</span>
                </div>
                <div style={styles.contactItem}>
                  <span style={styles.contactIcon}>🏢</span>
                  <span style={isMobile ? styles.contactTextMobile : styles.contactText}>123 Learning St, Education City</span>
                </div>
              </div>
            </div>
          </div>
          
          <div style={styles.footerBottom}>
            <div style={isMobile ? styles.footerBottomContentMobile : styles.footerBottomContent}>
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
    padding: '20px',
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    '@media (max-width: 768px)': {
      padding: '10px'
    }
  },
  container: {
    maxWidth: '1400px',
    margin: '0 auto'
  },
  
  // Header Styles
  header: {
    textAlign: 'center',
    marginBottom: '40px',
    '@media (max-width: 768px)': {
      marginBottom: '24px'
    }
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
    boxShadow: '0 8px 24px rgba(139, 92, 246, 0.35)',
    '@media (max-width: 768px)': {
      width: '60px',
      height: '60px',
      marginBottom: '16px'
    }
  },
  logoSvg: {
    width: '36px',
    height: '36px',
    color: 'white',
    '@media (max-width: 768px)': {
      width: '28px',
      height: '28px'
    }
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
  titleMobile: {
    fontSize: '2em',
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
  subtitleMobile: {
    color: '#6b7280',
    fontSize: '0.9em',
    fontWeight: '400'
  },

  // Stats Grid - Responsive
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
    gap: '20px',
    marginBottom: '40px'
  },
  statsGridTablet: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '16px',
    marginBottom: '32px'
  },
  statsGridMobile: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '12px',
    marginBottom: '24px'
  },
  statCard: {
    background: 'white',
    borderRadius: '16px',
    padding: '24px',
    display: 'flex',
    alignItems: 'center',
    gap: '20px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
    transition: 'all 0.3s ease',
    '@media (max-width: 768px)': {
      padding: '16px',
      gap: '12px',
      borderRadius: '12px'
    }
  },
  statIcon: {
    width: '56px',
    height: '56px',
    borderRadius: '12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    '@media (max-width: 768px)': {
      width: '44px',
      height: '44px',
      borderRadius: '10px'
    }
  },
  statIconSvg: {
    width: '28px',
    height: '28px',
    color: 'white',
    '@media (max-width: 768px)': {
      width: '20px',
      height: '20px'
    }
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
  statValueMobile: {
    fontSize: '1.5em',
    fontWeight: '800',
    color: '#1f2937',
    lineHeight: '1'
  },
  statLabel: {
    fontSize: '0.85em',
    color: '#6b7280',
    fontWeight: '500',
    marginTop: '4px',
    '@media (max-width: 768px)': {
      fontSize: '0.75em'
    }
  },

  // Search Section
  searchCard: {
    background: 'white',
    borderRadius: '20px',
    padding: '32px',
    boxShadow: '0 10px 40px rgba(0, 0, 0, 0.12)',
    marginBottom: '32px',
    '@media (max-width: 768px)': {
      padding: '20px',
      borderRadius: '16px',
      marginBottom: '24px'
    }
  },
  searchHeader: {
    marginBottom: '24px',
    '@media (max-width: 768px)': {
      marginBottom: '16px'
    }
  },
  searchTitle: {
    fontSize: '1.5em',
    fontWeight: '700',
    color: '#1f2937',
    margin: '0'
  },
  searchTitleMobile: {
    fontSize: '1.3em',
    fontWeight: '700',
    color: '#1f2937',
    margin: '0'
  },
  searchContent: {
    display: 'flex',
    alignItems: 'center'
  },
  searchBox: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    flex: '1'
  },
  searchIcon: {
    width: '20px',
    height: '20px',
    color: '#9ca3af',
    position: 'absolute',
    left: '16px',
    zIndex: 1,
    '@media (max-width: 768px)': {
      left: '12px',
      width: '18px',
      height: '18px'
    }
  },
  searchInput: {
    width: '100%',
    padding: '12px 16px 12px 48px',
    border: '1.5px solid #e5e7eb',
    borderRadius: '12px',
    fontSize: '1em',
    fontWeight: '500',
    color: '#374151',
    background: '#f9fafb',
    transition: 'all 0.2s ease',
    '@media (max-width: 768px)': {
      padding: '10px 12px 10px 40px',
      fontSize: '0.9em'
    }
  },
  clearSearch: {
    position: 'absolute',
    right: '12px',
    background: 'none',
    border: 'none',
    fontSize: '1.2em',
    color: '#9ca3af',
    cursor: 'pointer',
    padding: '4px',
    borderRadius: '4px',
    '@media (max-width: 768px)': {
      right: '8px'
    }
  },

  // Capacity Section - Responsive
  capacityCard: {
    background: 'white',
    borderRadius: '20px',
    padding: '32px',
    boxShadow: '0 10px 40px rgba(0, 0, 0, 0.12)',
    marginBottom: '32px',
    '@media (max-width: 768px)': {
      padding: '20px',
      borderRadius: '16px',
      marginBottom: '24px'
    }
  },
  capacityHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    marginBottom: '8px',
    '@media (max-width: 768px)': {
      gap: '8px'
    }
  },
  capacityIcon: {
    width: '24px',
    height: '24px',
    color: '#8b5cf6',
    '@media (max-width: 768px)': {
      width: '20px',
      height: '20px'
    }
  },
  capacityTitle: {
    fontSize: '1.5em',
    fontWeight: '700',
    color: '#1f2937',
    margin: '0'
  },
  capacityTitleMobile: {
    fontSize: '1.3em',
    fontWeight: '700',
    color: '#1f2937',
    margin: '0'
  },
  capacitySubtitle: {
    color: '#6b7280',
    fontSize: '1em',
    marginBottom: '24px'
  },
  capacitySubtitleMobile: {
    color: '#6b7280',
    fontSize: '0.9em',
    marginBottom: '20px'
  },
  capacityGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
    gap: '20px'
  },
  capacityGridTablet: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '16px'
  },
  capacityGridMobile: {
    display: 'grid',
    gridTemplateColumns: '1fr',
    gap: '16px'
  },
  capacityItem: {
    background: '#f9fafb',
    border: '1.5px solid #e5e7eb',
    borderRadius: '14px',
    padding: '20px',
    '@media (max-width: 768px)': {
      padding: '16px',
      borderRadius: '12px'
    }
  },
  capacityItemHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '12px',
    '@media (max-width: 768px)': {
      flexDirection: 'column',
      gap: '8px'
    }
  },
  mentorName: {
    fontSize: '1em',
    fontWeight: '600',
    color: '#1f2937',
    margin: '0'
  },
  mentorNameMobile: {
    fontSize: '0.95em',
    fontWeight: '600',
    color: '#1f2937',
    margin: '0'
  },
  menteeCount: {
    fontSize: '0.9em',
    fontWeight: '500',
    color: '#6b7280',
    '@media (max-width: 768px)': {
      fontSize: '0.85em'
    }
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
    fontWeight: '500',
    marginBottom: '12px'
  },
  statusIcon: {
    width: '16px',
    height: '16px'
  },
  statusWarning: {
    color: '#dc2626'
  },
  menteeList: {
    borderTop: '1px solid #e5e7eb',
    paddingTop: '12px'
  },
  menteeListTitle: {
    fontSize: '0.85em',
    fontWeight: '600',
    color: '#6b7280',
    marginBottom: '8px',
    display: 'block'
  },
  menteeNames: {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px'
  },
  menteeName: {
    fontSize: '0.8em',
    color: '#4b5563',
    padding: '2px 0',
    display: 'flex',
    alignItems: 'center',
    gap: '6px'
  },
  menteeBullet: {
    color: '#8b5cf6',
    fontWeight: 'bold'
  },

  // Sessions Section - Responsive
  sessionsCard: {
    background: 'white',
    borderRadius: '20px',
    padding: '32px',
    boxShadow: '0 10px 40px rgba(0, 0, 0, 0.12)',
    marginBottom: '32px',
    '@media (max-width: 768px)': {
      padding: '20px',
      borderRadius: '16px',
      marginBottom: '24px'
    }
  },
  sessionsHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '32px',
    flexWrap: 'wrap',
    gap: '20px'
  },
  sessionsHeaderMobile: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    marginBottom: '24px'
  },
  sessionsTitle: {
    fontSize: '1.5em',
    fontWeight: '700',
    color: '#1f2937'
  },
  sessionsTitleMobile: {
    fontSize: '1.3em',
    fontWeight: '700',
    color: '#1f2937'
  },
  sessionCount: {
    fontSize: '0.9em',
    fontWeight: '600',
    color: '#6b7280',
    background: '#f3f4f6',
    padding: '8px 16px',
    borderRadius: '8px',
    marginTop: '8px',
    '@media (max-width: 768px)': {
      fontSize: '0.85em',
      padding: '6px 12px'
    }
  },
  filterGroup: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    flexWrap: 'wrap'
  },
  filterGroupMobile: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    width: '100%'
  },
  filterLabel: {
    fontSize: '0.9em',
    fontWeight: '600',
    color: '#374151',
    marginRight: '8px',
    '@media (max-width: 768px)': {
      marginRight: '0',
      marginBottom: '8px'
    }
  },
  filterButtons: {
    display: 'flex',
    gap: '10px',
    flexWrap: 'wrap'
  },
  filterButtonsMobile: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '8px',
    width: '100%'
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
    transition: 'all 0.2s ease',
    '@media (max-width: 768px)': {
      padding: '10px 16px',
      fontSize: '0.85em',
      textAlign: 'center'
    }
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
  sessionsGridTablet: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
    gap: '16px'
  },
  sessionsGridMobile: {
    display: 'grid',
    gridTemplateColumns: '1fr',
    gap: '16px'
  },
  sessionCard: {
    background: '#f9fafb',
    border: '1.5px solid #e5e7eb',
    borderRadius: '14px',
    padding: '20px',
    transition: 'all 0.2s ease',
    '@media (max-width: 768px)': {
      padding: '16px',
      borderRadius: '12px'
    }
  },
  sessionHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    marginBottom: '16px',
    paddingBottom: '12px',
    borderBottom: '1px solid #e5e7eb',
    '@media (max-width: 768px)': {
      gap: '8px'
    }
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
  sessionTopicMobile: {
    flex: '1',
    fontSize: '0.9em',
    fontWeight: '700',
    color: '#1f2937'
  },
  statusBadge: {
    padding: '4px 12px',
    borderRadius: '8px',
    fontSize: '0.75em',
    fontWeight: '600',
    border: '1px solid',
    '@media (max-width: 768px)': {
      padding: '4px 10px',
      fontSize: '0.7em'
    }
  },
  sessionDetails: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px'
  },
  sessionRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    '@media (max-width: 768px)': {
      gap: '10px'
    }
  },
  sessionDetailIcon: {
    width: '18px',
    height: '18px',
    color: '#8b5cf6',
    flexShrink: 0,
    '@media (max-width: 768px)': {
      width: '16px',
      height: '16px'
    }
  },
  sessionDetailText: {
    display: 'flex',
    gap: '8px',
    alignItems: 'center',
    flex: '1',
    '@media (max-width: 768px)': {
      gap: '6px'
    }
  },
  sessionLabel: {
    fontSize: '0.85em',
    color: '#6b7280',
    fontWeight: '500',
    minWidth: '55px',
    '@media (max-width: 768px)': {
      fontSize: '0.8em',
      minWidth: '50px'
    }
  },
  sessionValue: {
    fontSize: '0.85em',
    color: '#1f2937',
    fontWeight: '600'
  },
  sessionValueMobile: {
    fontSize: '0.8em',
    color: '#1f2937',
    fontWeight: '600'
  },

  // Empty State
  emptyState: {
    textAlign: 'center',
    padding: '60px 20px',
    color: '#9ca3af',
    '@media (max-width: 768px)': {
      padding: '40px 16px'
    }
  },
  emptyIcon: {
    width: '64px',
    height: '64px',
    margin: '0 auto 16px',
    color: '#d1d5db',
    '@media (max-width: 768px)': {
      width: '48px',
      height: '48px'
    }
  },
  emptyText: {
    fontSize: '1em',
    fontWeight: '500',
    '@media (max-width: 768px)': {
      fontSize: '0.9em'
    }
  },

  // Footer - Responsive
  footer: {
    background: 'white',
    borderRadius: '20px',
    overflow: 'hidden',
    boxShadow: '0 10px 40px rgba(0, 0, 0, 0.12)',
    '@media (max-width: 768px)': {
      borderRadius: '16px'
    }
  },
  footerContent: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '40px',
    padding: '40px'
  },
  footerContentTablet: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '32px',
    padding: '32px'
  },
  footerContentMobile: {
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
    padding: '24px'
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
    fontSize: '0.9em',
    '@media (max-width: 768px)': {
      gap: '8px'
    }
  },
  contactIcon: {
    fontSize: '1.1em'
  },
  contactText: {
    fontSize: '0.9em'
  },
  contactTextMobile: {
    fontSize: '0.85em'
  },
  footerBottom: {
    borderTop: '1px solid #e5e7eb',
    padding: '24px 40px',
    background: '#f9fafb',
    '@media (max-width: 768px)': {
      padding: '20px 24px'
    }
  },
  footerBottomContent: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: '16px'
  },
  footerBottomContentMobile: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    textAlign: 'center'
  },
  copyright: {
    color: '#6b7280',
    fontSize: '0.85em',
    fontWeight: '500'
  },
  socialLinks: {
    display: 'flex',
    gap: '20px',
    '@media (max-width: 768px)': {
      gap: '16px'
    }
  },
  socialLink: {
    color: '#6b7280',
    textDecoration: 'none',
    fontSize: '0.85em',
    fontWeight: '500',
    transition: 'color 0.2s ease'
  }
};