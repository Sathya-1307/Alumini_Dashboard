import React, { useState, useEffect } from 'react';

export default function MentorshipDashboard() {
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchMentor, setSearchMentor] = useState('');
  const [activePhase, setActivePhase] = useState('phase_2024_h2');
  const [currentSessionIndex, setCurrentSessionIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  // Check screen size on mount and resize
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // Helper function to format semester names for mobile
  const getMobileSemesterText = (semesterName) => {
    if (semesterName === 'Durpec 2023') {
      return 'Dur 23'; // Special case for Durpec
    }
    
    // For standard patterns like "Jan-Jun 2022"
    const parts = semesterName.split(' ');
    if (parts.length >= 2) {
      const period = parts[0]; // "Jan-Jun"
      const year = parts[1]; // "2022"
      
      // Extract first 3 chars of period and last 2 digits of year
      const shortPeriod = period.includes('-') 
        ? period.split('-').map(p => p.substring(0, 3)).join('-')
        : period.substring(0, 3);
      
      const shortYear = year.length === 4 ? year.slice(-2) : year;
      
      return `${shortPeriod} ${shortYear}`;
    }
    
    return semesterName; // Fallback
  };

  // Sample data - In production, this would come from an API
  const dashboardStats = {
    totalMentors: 24,
    totalMentees: 68,
    completedMeetings: 142,
    upcomingMeetings: 28,
    postponedMeetings: 5
  };

  // Phases data - Semester-based phases (6-month periods)
  const mentorshipPhases = [
    {
      id: 'phase_2022_h1',
      name: 'Jan-Jun 2022',
      period: 'January - June 2022',
      status: 'completed',
      totalMeetings: 156,
      completedMeetings: 148,
      postponedMeetings: 8,
      mentorsActive: 18,
      menteesActive: 52,
      newMentors: 18,
      newMentees: 52,
      focusAreas: ['Web Development', 'Data Science', 'Cloud Computing']
    },
    {
      id: 'phase_2022_h2',
      name: 'Jul-Dec 2022',
      period: 'July - December 2022',
      status: 'completed',
      totalMeetings: 142,
      completedMeetings: 142,
      postponedMeetings: 0,
      mentorsActive: 22,
      menteesActive: 58,
      newMentors: 4,
      newMentees: 6,
      focusAreas: ['AI/ML', 'Mobile Development', 'DevOps']
    },
    {
      id: 'phase_2023_h1',
      name: 'Jan-Jun 2023',
      period: 'January - June 2023',
      status: 'completed',
      totalMeetings: 172,
      completedMeetings: 158,
      postponedMeetings: 7,
      mentorsActive: 25,
      menteesActive: 65,
      newMentors: 3,
      newMentees: 7,
      focusAreas: ['Cybersecurity', 'Blockchain', 'UI/UX Design']
    },
    {
      id: 'phase_2023_h2',
      name: 'Jul-Dec 2023',
      period: 'July - December 2023',
      status: 'completed',
      totalMeetings: 180,
      completedMeetings: 175,
      postponedMeetings: 5,
      mentorsActive: 26,
      menteesActive: 68,
      newMentors: 1,
      newMentees: 3,
      focusAreas: ['Full Stack', 'Data Engineering', 'Cloud Architecture']
    },
    {
      id: 'phase_2024_h1',
      name: 'Jan-Jun 2024',
      period: 'January - June 2024',
      status: 'completed',
      totalMeetings: 190,
      completedMeetings: 185,
      postponedMeetings: 5,
      mentorsActive: 28,
      menteesActive: 72,
      newMentors: 2,
      newMentees: 4,
      focusAreas: ['AI Engineering', 'Mobile Apps', 'System Design']
    },
    {
      id: 'phase_2024_h2',
      name: 'Jul-Dec 2024',
      period: 'July - December 2024',
      status: 'active',
      totalMeetings: 200,
      completedMeetings: 142,
      postponedMeetings: 5,
      mentorsActive: 30,
      menteesActive: 75,
      newMentors: 2,
      newMentees: 3,
      focusAreas: ['Advanced Web', 'Machine Learning', 'Cloud Native']
    }
  ];

  const sessions = [
    {
      id: 1,
      mentorName: 'Dr. Sarah Johnson',
      menteeName: 'Arun Kumar',
      date: '2024-10-15',
      time: '10:00 AM',
      status: 'completed',
      topic: 'Web Development Basics',
      phase: 'phase_2024_h2',
      duration: '60 mins',
      meetingType: 'Virtual'
    },
    {
      id: 2,
      mentorName: 'Prof. Michael Chen',
      menteeName: 'Priya Sharma',
      date: '2024-11-28',
      time: '2:00 PM',
      status: 'upcoming',
      topic: 'Machine Learning Fundamentals',
      phase: 'phase_2024_h2',
      duration: '90 mins',
      meetingType: 'In-person'
    },
    {
      id: 3,
      mentorName: 'Dr. Sarah Johnson',
      menteeName: 'Ravi Patel',
      date: '2024-10-22',
      time: '11:00 AM',
      status: 'completed',
      topic: 'React Best Practices',
      phase: 'phase_2024_h2',
      duration: '75 mins',
      meetingType: 'Virtual'
    },
    {
      id: 4,
      mentorName: 'Dr. Emily Rodriguez',
      menteeName: 'Ananya Reddy',
      date: '2024-11-29',
      time: '3:30 PM',
      status: 'upcoming',
      topic: 'Data Structures & Algorithms',
      phase: 'phase_2024_h2',
      duration: '120 mins',
      meetingType: 'Virtual'
    },
    {
      id: 5,
      mentorName: 'Prof. Michael Chen',
      menteeName: 'Karthik Menon',
      date: '2024-10-18',
      time: '4:00 PM',
      status: 'postponed',
      topic: 'Python Programming',
      phase: 'phase_2024_h2',
      duration: '60 mins',
      meetingType: 'In-person'
    },
    {
      id: 6,
      mentorName: 'Dr. Sarah Johnson',
      menteeName: 'Neha Gupta',
      date: '2024-05-15',
      time: '10:00 AM',
      status: 'completed',
      topic: 'JavaScript Fundamentals',
      phase: 'phase_2024_h1',
      duration: '60 mins',
      meetingType: 'Virtual'
    },
    {
      id: 7,
      mentorName: 'Prof. Michael Chen',
      menteeName: 'Rajesh Kumar',
      date: '2024-04-20',
      time: '2:00 PM',
      status: 'completed',
      topic: 'Data Analysis Basics',
      phase: 'phase_2024_h1',
      duration: '90 mins',
      meetingType: 'In-person'
    },
    {
      id: 8,
      mentorName: 'Dr. Emily Rodriguez',
      menteeName: 'Sneha Patel',
      date: '2023-11-10',
      time: '11:00 AM',
      status: 'completed',
      topic: 'Cloud Computing Intro',
      phase: 'phase_2023_h2',
      duration: '75 mins',
      meetingType: 'Virtual'
    }
  ];

  // Calculate current phase stats from sessions
  const calculatePhaseStats = () => {
    const phaseStats = {};
    
    sessions.forEach(session => {
      if (!phaseStats[session.phase]) {
        phaseStats[session.phase] = {
          completed: 0,
          upcoming: 0,
          postponed: 0,
          mentors: new Set(),
          mentees: new Set()
        };
      }
      
      phaseStats[session.phase][session.status]++;
      phaseStats[session.phase].mentors.add(session.mentorName);
      phaseStats[session.phase].mentees.add(session.menteeName);
    });

    return phaseStats;
  };

  const phaseStats = calculatePhaseStats();

  // Calculate mentor capacity data for current phase
  const mentorCapacityData = sessions
    .filter(session => session.phase === 'phase_2024_h2')
    .reduce((acc, session) => {
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

  // Filter sessions for the carousel based on status only
  const filteredSessionsByStatus = sessions.filter(session => {
    return filterStatus === 'all' || session.status === filterStatus;
  });

  // Filter phases based on active phase filter
  const filteredPhases = mentorshipPhases.filter(phase => 
    activePhase === 'all' || phase.id === activePhase
  );

  // Filter sessions for phase display based on phase only
  const filteredSessionsByPhase = sessions.filter(session => 
    activePhase === 'all' || session.phase === activePhase
  );

  // Filter mentor capacity data based on search
  const filteredMentorCapacity = Object.entries(mentorCapacityData)
    .filter(([mentorName]) => 
      !searchMentor || mentorName.toLowerCase().includes(searchMentor.toLowerCase())
    )
    .reduce((acc, [mentorName, data]) => {
      acc[mentorName] = data;
      return acc;
    }, {});

  // Carousel navigation functions - use status-filtered sessions
  const nextSession = () => {
    setCurrentSessionIndex((prevIndex) => 
      prevIndex === filteredSessionsByStatus.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSession = () => {
    setCurrentSessionIndex((prevIndex) => 
      prevIndex === 0 ? filteredSessionsByStatus.length - 1 : prevIndex - 1
    );
  };

  const goToSession = (index) => {
    setCurrentSessionIndex(index);
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'completed':
        return { background: '#dcfce7', color: '#166534', border: '#bbf7d0' };
      case 'upcoming':
        return { background: '#dbeafe', color: '#1e40af', border: '#bfdbfe' };
      case 'postponed':
        return { background: '#fef3c7', color: '#92400e', border: '#fde68a' };
      case 'active':
        return { background: '#f0f9ff', color: '#0369a1', border: '#bae6fd' };
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
      case 'active':
        return '🔥';
      default:
        return '•';
    }
  };

  const getPhaseStatusColor = (status) => {
    switch(status) {
      case 'completed':
        return '#10b981';
      case 'active':
        return '#3b82f6';
      case 'upcoming':
        return '#f59e0b';
      default:
        return '#6b7280';
    }
  };

  // Custom Icons Component
  const CustomIcon = ({ type, size = 24, color = 'currentColor' }) => {
    const iconStyle = {
      width: size,
      height: size,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    };

    switch(type) {
      case 'mentor':
        return (
          <div style={iconStyle}>
            <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
          </div>
        );
      case 'mentee':
        return (
          <div style={iconStyle}>
            <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
              <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
              <circle cx="8.5" cy="7" r="4"></circle>
              <line x1="23" y1="11" x2="17" y2="11"></line>
            </svg>
          </div>
        );
      case 'meeting':
        return (
          <div style={iconStyle}>
            <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
              <line x1="16" y1="2" x2="16" y2="6"></line>
              <line x1="8" y1="2" x2="8" y2="6"></line>
              <line x1="3" y1="10" x2="21" y2="10"></line>
            </svg>
          </div>
        );
      case 'completed':
        return (
          <div style={iconStyle}>
            <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
              <polyline points="22 4 12 14.01 9 11.01"></polyline>
            </svg>
          </div>
        );
      case 'postponed':
        return (
          <div style={iconStyle}>
            <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
              <circle cx="12" cy="12" r="10"></circle>
              <polyline points="12 6 12 12 16 14"></polyline>
            </svg>
          </div>
        );
      case 'search':
        return (
          <div style={iconStyle}>
            <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </div>
        );
      case 'capacity':
        return (
          <div style={iconStyle}>
            <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
              <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
              <circle cx="8.5" cy="7" r="4"></circle>
              <line x1="20" y1="8" x2="20" y2="14"></line>
              <line x1="23" y1="11" x2="17" y2="11"></line>
            </svg>
          </div>
        );
      case 'phases':
        return (
          <div style={iconStyle}>
            <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
              <path d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 0 012-2h2a2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 0 012-2h2a2 0 012 2v14a2 0 01-2 2h-2a2 0 01-2-2z"></path>
            </svg>
          </div>
        );
      case 'warning':
        return (
          <div style={iconStyle}>
            <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="15" y1="9" x2="9" y2="15"></line>
              <line x1="9" y1="9" x2="15" y2="15"></line>
            </svg>
          </div>
        );
      case 'info':
        return (
          <div style={iconStyle}>
            <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="8" x2="12" y2="12"></line>
              <line x1="12" y1="16" x2="12.01" y2="16"></line>
            </svg>
          </div>
        );
      case 'chevron-left':
        return (
          <div style={iconStyle}>
            <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
          </div>
        );
      case 'chevron-right':
        return (
          <div style={iconStyle}>
            <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </div>
        );
      case 'new-mentor':
        return (
          <div style={iconStyle}>
            <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
              <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
              <circle cx="8.5" cy="7" r="4"></circle>
              <line x1="20" y1="8" x2="20" y2="14"></line>
              <line x1="23" y1="11" x2="17" y2="11"></line>
            </svg>
          </div>
        );
      case 'new-mentee':
        return (
          <div style={iconStyle}>
            <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
              <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
              <circle cx="8.5" cy="7" r="4"></circle>
              <line x1="18" y1="9" x2="23" y2="9"></line>
              <line x1="20.5" y1="6.5" x2="20.5" y2="11.5"></line>
            </svg>
          </div>
        );
      case 'growth':
        return (
          <div style={iconStyle}>
            <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
              <polyline points="22 4 12 14.01 9 11.01"></polyline>
              <line x1="12" y1="6" x2="12" y2="14"></line>
              <line x1="9" y1="9" x2="15" y2="9"></line>
            </svg>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div style={styles.wrapper}>
      <div style={styles.container}>
        {/* Header */}
        <div style={styles.header}>
          <div style={styles.logo}>
            <CustomIcon type="mentor" size={isMobile ? 28 : 36} color="white" />
          </div>
          <h1 style={styles.title}>Mentorship Dashboard</h1>
          <p style={styles.subtitle}>Semester-based Mentorship Program Performance Tracking</p>
        </div>

        {/* Stats Cards */}
        <div style={styles.statsGrid}>
          <div style={styles.statCard}>
            <div style={{...styles.statIcon, background: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)'}}>
              <CustomIcon type="mentor" size={isMobile ? 20 : 28} color="white" />
            </div>
            <div style={styles.statContent}>
              <div style={styles.statValue}>{dashboardStats.totalMentors}</div>
              <div style={styles.statLabel}>Active Mentors</div>
            </div>
          </div>

          <div style={styles.statCard}>
            <div style={{...styles.statIcon, background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)'}}>
              <CustomIcon type="mentee" size={isMobile ? 20 : 28} color="white" />
            </div>
            <div style={styles.statContent}>
              <div style={styles.statValue}>{dashboardStats.totalMentees}</div>
              <div style={styles.statLabel}>Active Mentees</div>
            </div>
          </div>

          <div style={styles.statCard}>
            <div style={{...styles.statIcon, background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)'}}>
              <CustomIcon type="completed" size={isMobile ? 20 : 28} color="white" />
            </div>
            <div style={styles.statContent}>
              <div style={styles.statValue}>{dashboardStats.completedMeetings}</div>
              <div style={styles.statLabel}>Meeting Completed</div>
            </div>
          </div>

          <div style={styles.statCard}>
            <div style={{...styles.statIcon, background: 'linear-gradient(135deg, #06b6d4 0%, #0891b2 100%)'}}>
              <CustomIcon type="meeting" size={isMobile ? 20 : 28} color="white" />
            </div>
            <div style={styles.statContent}>
              <div style={styles.statValue}>{dashboardStats.upcomingMeetings}</div>
              <div style={styles.statLabel}>Meeting Upcoming</div>
            </div>
          </div>

          <div style={styles.statCard}>
            <div style={{...styles.statIcon, background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)'}}>
              <CustomIcon type="postponed" size={isMobile ? 20 : 28} color="white" />
            </div>
            <div style={styles.statContent}>
              <div style={styles.statValue}>{dashboardStats.postponedMeetings}</div>
              <div style={styles.statLabel}>Meeting Postponed</div>
            </div>
          </div>
        </div>

        {/* Semester Filter Section */}
        <div style={styles.sessionsCard}>
          <div style={styles.sessionsHeader}>
            <div>
              <h2 style={styles.sessionsTitle}>Filter by Semester</h2>
              <div style={styles.sessionCount}>
                {filteredPhases.length} semester{filteredPhases.length !== 1 ? 's' : ''} selected
              </div>
            </div>
            
            {/* Semester Filter */}
            <div style={styles.filterContainer}>
              <div style={styles.filterGroup}>
                <span style={styles.filterLabel}>Select Semester:</span>
                <div style={styles.filterButtons}>
                  {mentorshipPhases.map(phase => (
                    <button
                      key={phase.id}
                      onClick={() => {
                        setActivePhase(phase.id);
                      }}
                      style={{
                        ...styles.filterBtn,
                        ...(activePhase === phase.id ? {
                          background: getPhaseStatusColor(phase.status),
                          color: 'white',
                          borderColor: getPhaseStatusColor(phase.status)
                        } : {})
                      }}
                    >
                      {isMobile ? getMobileSemesterText(phase.name) : phase.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mentorship Phases Section */}
        <div style={styles.phasesCard}>
          <div style={styles.phasesHeader}>
            <CustomIcon type="phases" size={isMobile ? 20 : 24} color="#8b5cf6" />
            <h2 style={styles.phasesTitle}>
              Program Semesters Performance 
              {activePhase !== 'all' && ` - ${mentorshipPhases.find(p => p.id === activePhase)?.name}`}
            </h2>
          </div>
          <p style={styles.phasesSubtitle}>
            {activePhase === 'all' 
              ? 'Semester-based mentorship program tracking and performance metrics' 
              : `Showing details for ${mentorshipPhases.find(p => p.id === activePhase)?.name}`
            }
          </p>
          
          {filteredPhases.length === 0 ? (
            <div style={styles.emptyState}>
              <CustomIcon type="info" size={isMobile ? 48 : 64} color="#d1d5db" />
              <p style={styles.emptyText}>
                No semesters found for the current filter
              </p>
            </div>
          ) : (
            <div style={styles.phasesGrid}>
              {filteredPhases.map(phase => {
                const stats = phaseStats[phase.id] || { completed: 0, upcoming: 0, postponed: 0, mentors: new Set(), mentees: new Set() };
                
                return (
                  <div key={phase.id} style={styles.phaseCard}>
                    <div style={styles.phaseHeader}>
                      <div style={styles.phaseBadge}>
                        <span style={styles.phaseName}>{phase.name}</span>
                        <span style={{
                          ...styles.phaseStatus,
                          background: getPhaseStatusColor(phase.status)
                        }}>
                          {isMobile ? phase.status.charAt(0).toUpperCase() : phase.status.charAt(0).toUpperCase() + phase.status.slice(1)}
                        </span>
                      </div>
                      <p style={styles.phasePeriod}>{phase.period}</p>
                    </div>
                    
                    {/* Meeting Statistics */}
                    <div style={styles.meetingStats}>
                      <div style={styles.statRow}>
                        <div style={styles.statItem}>
                          <span style={styles.statNumber}>{phase.completedMeetings}</span>
                          <span style={styles.statLabelSmall}>Completed</span>
                        </div>
                        <div style={styles.statItem}>
                          <span style={styles.statNumber}>{phase.totalMeetings - phase.completedMeetings - phase.postponedMeetings}</span>
                          <span style={styles.statLabelSmall}>Remaining</span>
                        </div>
                        <div style={styles.statItem}>
                          <span style={styles.statNumber}>{phase.postponedMeetings}</span>
                          <span style={styles.statLabelSmall}>Postponed</span>
                        </div>
                      </div>
                    </div>

                    {/* Participant Stats */}
                    <div style={styles.participantStats}>
                      <div style={styles.participantRow}>
                        <div style={styles.participantItem}>
                          <CustomIcon type="mentor" size={isMobile ? 16 : 20} color="#8b5cf6" />
                          <div>
                            <span style={styles.participantCount}>{phase.mentorsActive}</span>
                            <span style={styles.participantLabel}>Total Mentors</span>
                          </div>
                        </div>
                        <div style={styles.participantItem}>
                          <CustomIcon type="mentee" size={isMobile ? 16 : 20} color="#3b82f6" />
                          <div>
                            <span style={styles.participantCount}>{phase.menteesActive}</span>
                            <span style={styles.participantLabel}>Total Mentees</span>
                          </div>
                        </div>
                      </div>
                      
                      {/* New Participants */}
                      <div style={styles.newParticipantsRow}>
                        <div style={styles.newParticipantItem}>
                          <CustomIcon type="new-mentor" size={isMobile ? 14 : 16} color="#10b981" />
                          <div>
                            <span style={styles.newParticipantCount}>{phase.newMentors}</span>
                            <span style={styles.newParticipantLabel}>New Mentors</span>
                          </div>
                        </div>
                        <div style={styles.newParticipantItem}>
                          <CustomIcon type="new-mentee" size={isMobile ? 14 : 16} color="#3b82f6" />
                          <div>
                            <span style={styles.newParticipantCount}>{phase.newMentees}</span>
                            <span style={styles.newParticipantLabel}>New Mentees</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Focus Areas */}
                    <div style={styles.phaseTopics}>
                      <span style={styles.topicsLabel}>Focus Areas:</span>
                      <div style={styles.topicsList}>
                        {phase.focusAreas.map((topic, index) => (
                          <span key={index} style={styles.topicItem}>
                            {topic}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Sessions in this phase */}
                    <div style={styles.phaseSessions}>
                      <span style={styles.topicsLabel}>Sessions in this semester:</span>
                      <div style={styles.sessionStats}>
                        <span style={styles.sessionStat}>
                          Completed: {filteredSessionsByPhase.filter(s => s.status === 'completed' && s.phase === phase.id).length}
                        </span>
                        <span style={styles.sessionStat}>
                          Upcoming: {filteredSessionsByPhase.filter(s => s.status === 'upcoming' && s.phase === phase.id).length}
                        </span>
                        <span style={styles.sessionStat}>
                          Postponed: {filteredSessionsByPhase.filter(s => s.status === 'postponed' && s.phase === phase.id).length}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Mentor Capacity Section */}
        <div style={styles.capacityCard}>
          <div style={styles.capacityHeader}>
            <div style={styles.capacityTitleSection}>
              <CustomIcon type="capacity" size={isMobile ? 20 : 24} color="#8b5cf6" />
              <h2 style={styles.capacityTitle}>
                Current Semester Mentor Capacity
              </h2>
            </div>
            
            {/* Search Box */}
            <div style={styles.searchBox}>
              <CustomIcon type="search" size={isMobile ? 16 : 20} color="#9ca3af" />
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
          
          <p style={styles.capacitySubtitle}>
            Jul-Dec 2024 - Each mentor supports maximum 3 mentees for personalized attention
            {searchMentor && ` - Filtered by "${searchMentor}"`}
          </p>
          
          {Object.keys(filteredMentorCapacity).length === 0 ? (
            <div style={styles.emptyState}>
              <CustomIcon type="info" size={isMobile ? 48 : 64} color="#d1d5db" />
              <p style={styles.emptyText}>
                {searchMentor ? `No mentors found for "${searchMentor}"` : 'No mentor data available'}
              </p>
            </div>
          ) : (
            <div style={styles.capacityGrid}>
              {Object.entries(filteredMentorCapacity).map(([mentor, data]) => {
                const count = data.mentees.size;
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
                    
                    {isOverCapacity && (
                      <div style={styles.capacityStatus}>
                        <CustomIcon type="warning" size={isMobile ? 14 : 16} color="#dc2626" />
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

        {/* Sessions Section - Carousel */}
        <div style={styles.sessionsCard}>
          <div style={styles.sessionsHeader}>
            <div style={styles.sessionsTitleSection}>
              <h2 style={styles.sessionsTitle}>
                All Sessions (Status Filter)
              </h2>
              <div style={styles.sessionCount}>
                {filteredSessionsByStatus.length} session{filteredSessionsByStatus.length !== 1 ? 's' : ''} found
              </div>
            </div>
            
            {/* Status Filter */}
            <div style={styles.filterContainer}>
              <div style={styles.filterGroup}>
                <span style={styles.filterLabel}>Filter by Status:</span>
                <div style={styles.filterButtons}>
                  <button
                    onClick={() => {
                      setFilterStatus('all');
                      setCurrentSessionIndex(0);
                    }}
                    style={{
                      ...styles.filterBtn,
                      ...(filterStatus === 'all' ? styles.filterBtnActive : {})
                    }}
                  >
                    All
                  </button>
                  <button
                    onClick={() => {
                      setFilterStatus('completed');
                      setCurrentSessionIndex(0);
                    }}
                    style={{
                      ...styles.filterBtn,
                      ...(filterStatus === 'completed' ? styles.filterBtnActiveGreen : {})
                    }}
                  >
                    {isMobile ? 'Done' : 'Completed'}
                  </button>
                  <button
                    onClick={() => {
                      setFilterStatus('upcoming');
                      setCurrentSessionIndex(0);
                    }}
                    style={{
                      ...styles.filterBtn,
                      ...(filterStatus === 'upcoming' ? styles.filterBtnActiveBlue : {})
                    }}
                  >
                    {isMobile ? 'Next' : 'Upcoming'}
                  </button>
                  <button
                    onClick={() => {
                      setFilterStatus('postponed');
                      setCurrentSessionIndex(0);
                    }}
                    style={{
                      ...styles.filterBtn,
                      ...(filterStatus === 'postponed' ? styles.filterBtnActiveAmber : {})
                    }}
                  >
                    {isMobile ? 'Later' : 'Postponed'}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {filteredSessionsByStatus.length === 0 ? (
            <div style={styles.emptyState}>
              <CustomIcon type="info" size={isMobile ? 48 : 64} color="#d1d5db" />
              <p style={styles.emptyText}>
                {filterStatus !== 'all'
                  ? `No ${filterStatus} sessions found` 
                  : 'No sessions available'
                }
              </p>
            </div>
          ) : (
            <div style={styles.carouselContainer}>
              {/* Carousel Navigation */}
              <div style={styles.carouselHeader}>
                <div style={styles.carouselInfo}>
                  <span style={styles.carouselCounter}>
                    Session {currentSessionIndex + 1} of {filteredSessionsByStatus.length}
                  </span>
                </div>
                <div style={styles.carouselControls}>
                  <button 
                    onClick={prevSession}
                    style={styles.carouselBtn}
                    disabled={filteredSessionsByStatus.length <= 1}
                  >
                    <CustomIcon type="chevron-left" size={isMobile ? 16 : 20} color="#6b7280" />
                  </button>
                  <button 
                    onClick={nextSession}
                    style={styles.carouselBtn}
                    disabled={filteredSessionsByStatus.length <= 1}
                  >
                    <CustomIcon type="chevron-right" size={isMobile ? 16 : 20} color="#6b7280" />
                  </button>
                </div>
              </div>

              {/* Carousel Content */}
              <div style={styles.carouselContent}>
                {filteredSessionsByStatus.map((session, index) => (
                  <div
                    key={session.id}
                    style={{
                      ...styles.carouselSlide,
                      ...(index === currentSessionIndex ? styles.carouselSlideActive : styles.carouselSlideInactive)
                    }}
                  >
                    <div style={styles.sessionCard}>
                      <div style={styles.sessionHeader}>
                        <div style={styles.sessionIconContainer}>
                          <span style={styles.sessionIcon}>{getStatusIcon(session.status)}</span>
                        </div>
                        <div style={styles.sessionMainInfo}>
                          <h3 style={styles.sessionTopic}>{session.topic}</h3>
                          <div style={styles.sessionMeta}>
                            <span style={styles.sessionDateTime}>
                              {new Date(session.date).toLocaleDateString('en-US', { 
                                weekday: isMobile ? 'short' : 'long',
                                month: isMobile ? 'short' : 'long', 
                                day: 'numeric',
                                year: 'numeric'
                              })} • {session.time}
                            </span>
                            <span style={styles.sessionDetailsMeta}>
                              {session.duration} • {session.meetingType} • {mentorshipPhases.find(p => p.id === session.phase)?.name}
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      <div style={styles.sessionContent}>
                        <div style={styles.sessionParticipants}>
                          <div style={styles.participantCard}>
                            <CustomIcon type="mentor" size={isMobile ? 20 : 24} color="#8b5cf6" />
                            <div style={styles.participantInfo}>
                              <span style={styles.participantRole}>Mentor</span>
                              <span style={styles.participantName}>{session.mentorName}</span>
                            </div>
                          </div>
                          <div style={styles.participantCard}>
                            <CustomIcon type="mentee" size={isMobile ? 20 : 24} color="#3b82f6" />
                            <div style={styles.participantInfo}>
                              <span style={styles.participantRole}>Mentee</span>
                              <span style={styles.participantName}>{session.menteeName}</span>
                            </div>
                          </div>
                        </div>
                        
                        <div style={styles.sessionStatusSection}>
                          <div style={styles.statusBadges}>
                            <span style={{
                              ...styles.phaseBadgeSmall,
                              background: getPhaseStatusColor('active')
                            }}>
                              {isMobile ? getMobileSemesterText(mentorshipPhases.find(p => p.id === session.phase)?.name) : mentorshipPhases.find(p => p.id === session.phase)?.name}
                            </span>
                            <span style={{
                              ...styles.statusBadge,
                              ...getStatusColor(session.status)
                            }}>
                              {getStatusIcon(session.status)} {isMobile ? session.status.charAt(0).toUpperCase() + session.status.slice(1,3) : session.status.charAt(0).toUpperCase() + session.status.slice(1)}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Carousel Indicators */}
              {filteredSessionsByStatus.length > 1 && (
                <div style={styles.carouselIndicators}>
                  {filteredSessionsByStatus.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => goToSession(index)}
                      style={{
                        ...styles.carouselIndicator,
                        ...(index === currentSessionIndex ? styles.carouselIndicatorActive : {})
                      }}
                    />
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <footer style={styles.footer}>
          <div style={styles.footerContent}>
            <div style={styles.footerSection}>
              <h3 style={styles.footerTitle}>
                <CustomIcon type="mentor" size={isMobile ? 16 : 20} color="#8b5cf6" /> Mentorship Program
              </h3>
              <p style={styles.footerText}>
                Semester-based structured mentorship program with comprehensive tracking. 
                Each semester focuses on different technology domains and skill development.
              </p>
            </div>
            
            <div style={styles.footerSection}>
              <h3 style={styles.footerTitle}>Program Semesters</h3>
              <div style={styles.footerLinks}>
                {mentorshipPhases.map(phase => (
                  <span key={phase.id} style={styles.footerLink}>
                    {phase.name}: {phase.focusAreas.slice(0, 2).join(', ')}
                  </span>
                ))}
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
                © 2024 Mentorship Program. Semester-based Performance Tracking.
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
    padding: '16px',
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    '@media (max-width: 768px)': {
      padding: '12px',
    },
  },
  container: {
    maxWidth: '1400px',
    margin: '0 auto',
    '@media (max-width: 768px)': {
      maxWidth: '100%',
    },
  },
  header: {
    textAlign: 'center',
    marginBottom: '32px',
    '@media (max-width: 768px)': {
      marginBottom: '24px',
    },
  },
  logo: {
    width: '60px',
    height: '60px',
    background: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)',
    borderRadius: '16px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0 auto 20px',
    boxShadow: '0 8px 24px rgba(139, 92, 246, 0.35)',
    '@media (max-width: 768px)': {
      width: '50px',
      height: '50px',
      borderRadius: '12px',
      marginBottom: '16px',
    },
  },
  title: {
    fontSize: 'clamp(1.5rem, 4vw, 1.75rem)',
    fontWeight: '800',
    background: 'linear-gradient(135deg, #7c3aed 0%, #6d28d9 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    marginBottom: '8px',
    '@media (max-width: 768px)': {
      fontSize: '1.25rem',
      marginBottom: '6px',
    },
  },
  subtitle: {
    color: '#6b7280',
    fontSize: 'clamp(0.8rem, 2vw, 0.9rem)',
    fontWeight: '400',
    '@media (max-width: 768px)': {
      fontSize: '0.75rem',
    },
  },
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
    gap: '16px',
    marginBottom: '32px',
    '@media (max-width: 768px)': {
      gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
      gap: '12px',
      marginBottom: '24px',
    },
    '@media (max-width: 480px)': {
      gridTemplateColumns: 'repeat(2, 1fr)',
      gap: '10px',
    },
  },
  statCard: {
    background: 'white',
    borderRadius: '12px',
    padding: '20px',
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
    transition: 'all 0.3s ease',
    border: '1px solid #f1f5f9',
    '@media (max-width: 768px)': {
      padding: '16px',
      gap: '12px',
      flexDirection: 'column',
      textAlign: 'center',
    },
    '@media (max-width: 480px)': {
      padding: '12px',
      gap: '8px',
    },
  },
  statIcon: {
    width: '48px',
    height: '48px',
    borderRadius: '10px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    '@media (max-width: 768px)': {
      width: '40px',
      height: '40px',
      borderRadius: '8px',
    },
    '@media (max-width: 480px)': {
      width: '36px',
      height: '36px',
    },
  },
  statContent: {
    flex: '1',
    '@media (max-width: 768px)': {
      width: '100%',
    },
  },
  statValue: {
    fontSize: '1.5rem',
    fontWeight: '800',
    color: '#1f2937',
    lineHeight: '1',
    '@media (max-width: 768px)': {
      fontSize: '1.25rem',
    },
    '@media (max-width: 480px)': {
      fontSize: '1.1rem',
    },
  },
  statLabel: {
    fontSize: '0.8rem',
    color: '#6b7280',
    fontWeight: '500',
    marginTop: '4px',
    '@media (max-width: 768px)': {
      fontSize: '0.7rem',
      marginTop: '2px',
    },
  },
  // Phases Section
  phasesCard: {
    background: 'white',
    borderRadius: '16px',
    padding: '24px',
    boxShadow: '0 10px 40px rgba(0, 0, 0, 0.12)',
    marginBottom: '24px',
    border: '1px solid #f1f5f9',
    '@media (max-width: 768px)': {
      padding: '16px',
      borderRadius: '12px',
      marginBottom: '20px',
    },
  },
  phasesHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    marginBottom: '8px',
    flexWrap: 'wrap',
    '@media (max-width: 768px)': {
      gap: '8px',
      marginBottom: '6px',
    },
  },
  phasesTitle: {
    fontSize: 'clamp(1.1rem, 3vw, 1.25rem)',
    fontWeight: '700',
    color: '#1f2937',
    margin: '0',
    '@media (max-width: 768px)': {
      fontSize: '1rem',
    },
  },
  phasesSubtitle: {
    color: '#6b7280',
    fontSize: '0.9rem',
    marginBottom: '24px',
    '@media (max-width: 768px)': {
      fontSize: '0.8rem',
      marginBottom: '16px',
    },
  },
  phasesGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr',
    gap: '20px',
    '@media (max-width: 768px)': {
      gap: '16px',
    },
  },
  phaseCard: {
    background: '#f9fafb',
    border: '1.5px solid #e5e7eb',
    borderRadius: '12px',
    padding: '20px',
    transition: 'all 0.3s ease',
    borderLeft: '4px solid #8b5cf6',
    '@media (max-width: 768px)': {
      padding: '16px',
      borderRadius: '10px',
    },
  },
  phaseHeader: {
    marginBottom: '16px',
    '@media (max-width: 768px)': {
      marginBottom: '12px',
    },
  },
  phaseBadge: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '8px',
    flexWrap: 'wrap',
    gap: '8px',
    '@media (max-width: 768px)': {
      marginBottom: '6px',
    },
  },
  phaseName: {
    fontSize: '1rem',
    fontWeight: '700',
    color: '#1f2937',
    '@media (max-width: 768px)': {
      fontSize: '0.9rem',
    },
  },
  phaseStatus: {
    fontSize: '0.7rem',
    fontWeight: '600',
    color: 'white',
    padding: '4px 10px',
    borderRadius: '10px',
    '@media (max-width: 768px)': {
      fontSize: '0.6rem',
      padding: '3px 8px',
    },
  },
  phasePeriod: {
    fontSize: '0.85rem',
    color: '#6b7280',
    fontWeight: '500',
    margin: '0',
    '@media (max-width: 768px)': {
      fontSize: '0.75rem',
    },
  },
  meetingStats: {
    marginBottom: '16px',
    '@media (max-width: 768px)': {
      marginBottom: '12px',
    },
  },
  statRow: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '12px',
    flexWrap: 'wrap',
    gap: '8px',
    '@media (max-width: 768px)': {
      marginBottom: '8px',
      gap: '6px',
    },
  },
  statItem: {
    textAlign: 'center',
    flex: '1',
    minWidth: '60px',
    '@media (max-width: 480px)': {
      minWidth: '50px',
    },
  },
  statNumber: {
    display: 'block',
    fontSize: '1.2rem',
    fontWeight: '700',
    color: '#1f2937',
    marginBottom: '4px',
    '@media (max-width: 768px)': {
      fontSize: '1rem',
      marginBottom: '2px',
    },
  },
  statLabelSmall: {
    fontSize: '0.7rem',
    color: '#6b7280',
    fontWeight: '500',
    '@media (max-width: 768px)': {
      fontSize: '0.6rem',
    },
  },
  participantStats: {
    marginBottom: '16px',
    padding: '12px',
    background: 'white',
    borderRadius: '10px',
    border: '1px solid #e5e7eb',
    '@media (max-width: 768px)': {
      padding: '10px',
      borderRadius: '8px',
      marginBottom: '12px',
    },
  },
  participantRow: {
    display: 'flex',
    justifyContent: 'space-around',
    marginBottom: '12px',
    flexWrap: 'wrap',
    gap: '16px',
    '@media (max-width: 768px)': {
      marginBottom: '8px',
      gap: '12px',
    },
  },
  participantItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    '@media (max-width: 768px)': {
      gap: '8px',
    },
  },
  participantCount: {
    display: 'block',
    fontSize: '1.1rem',
    fontWeight: '700',
    color: '#1f2937',
    '@media (max-width: 768px)': {
      fontSize: '1rem',
    },
  },
  participantLabel: {
    fontSize: '0.7rem',
    color: '#6b7280',
    fontWeight: '500',
    '@media (max-width: 768px)': {
      fontSize: '0.6rem',
    },
  },
  newParticipantsRow: {
    display: 'flex',
    justifyContent: 'space-around',
    paddingTop: '12px',
    borderTop: '1px solid #e5e7eb',
    flexWrap: 'wrap',
    gap: '16px',
    '@media (max-width: 768px)': {
      paddingTop: '8px',
      gap: '12px',
    },
  },
  newParticipantItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    '@media (max-width: 768px)': {
      gap: '6px',
    },
  },
  newParticipantCount: {
    display: 'block',
    fontSize: '1rem',
    fontWeight: '700',
    color: '#10b981',
    '@media (max-width: 768px)': {
      fontSize: '0.9rem',
    },
  },
  newParticipantLabel: {
    fontSize: '0.65rem',
    color: '#6b7280',
    fontWeight: '500',
    '@media (max-width: 768px)': {
      fontSize: '0.55rem',
    },
  },
  phaseTopics: {
    borderTop: '1px solid #e5e7eb',
    paddingTop: '12px',
    '@media (max-width: 768px)': {
      paddingTop: '8px',
    },
  },
  topicsLabel: {
    fontSize: '0.8rem',
    fontWeight: '600',
    color: '#6b7280',
    marginBottom: '8px',
    display: 'block',
    '@media (max-width: 768px)': {
      fontSize: '0.7rem',
      marginBottom: '6px',
    },
  },
  topicsList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
    '@media (max-width: 768px)': {
      gap: '4px',
    },
  },
  topicItem: {
    fontSize: '0.75rem',
    color: '#4b5563',
    padding: '4px 8px',
    background: 'white',
    borderRadius: '6px',
    border: '1px solid #e5e7eb',
    '@media (max-width: 768px)': {
      fontSize: '0.65rem',
      padding: '3px 6px',
    },
  },
  phaseSessions: {
    borderTop: '1px solid #e5e7eb',
    paddingTop: '12px',
    marginTop: '12px',
    '@media (max-width: 768px)': {
      paddingTop: '8px',
      marginTop: '8px',
    },
  },
  sessionStats: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
    marginTop: '8px',
    '@media (max-width: 768px)': {
      marginTop: '6px',
      gap: '3px',
    },
  },
  sessionStat: {
    fontSize: '0.75rem',
    color: '#4b5563',
    padding: '2px 0',
    '@media (max-width: 768px)': {
      fontSize: '0.65rem',
    },
  },
  // Capacity Section
  capacityCard: {
    background: 'white',
    borderRadius: '16px',
    padding: '24px',
    boxShadow: '0 10px 40px rgba(0, 0, 0, 0.12)',
    marginBottom: '24px',
    border: '1px solid #f1f5f9',
    '@media (max-width: 768px)': {
      padding: '16px',
      borderRadius: '12px',
      marginBottom: '20px',
    },
  },
  capacityHeader: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    marginBottom: '8px',
    '@media (max-width: 768px)': {
      gap: '12px',
      marginBottom: '6px',
    },
  },
  capacityTitleSection: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    '@media (max-width: 768px)': {
      gap: '8px',
    },
  },
  capacityTitle: {
    fontSize: 'clamp(1.1rem, 3vw, 1.25rem)',
    fontWeight: '700',
    color: '#1f2937',
    margin: '0',
    '@media (max-width: 768px)': {
      fontSize: '1rem',
    },
  },
  capacitySubtitle: {
    color: '#6b7280',
    fontSize: '0.9rem',
    marginBottom: '20px',
    '@media (max-width: 768px)': {
      fontSize: '0.8rem',
      marginBottom: '16px',
    },
  },
  searchBox: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    maxWidth: '400px',
    background: '#f9fafb',
    border: '1.5px solid #e5e7eb',
    borderRadius: '10px',
    padding: '8px 12px',
    '@media (max-width: 768px)': {
      padding: '6px 10px',
      borderRadius: '8px',
    },
  },
  searchInput: {
    width: '100%',
    border: 'none',
    background: 'transparent',
    fontSize: '0.9rem',
    fontWeight: '500',
    color: '#374151',
    padding: '4px 8px 4px 32px',
    outline: 'none',
    '@media (max-width: 768px)': {
      fontSize: '0.8rem',
      padding: '2px 6px 2px 28px',
    },
  },
  clearSearch: {
    position: 'absolute',
    right: '12px',
    background: 'none',
    border: 'none',
    fontSize: '1.2rem',
    color: '#9ca3af',
    cursor: 'pointer',
    padding: '4px',
    borderRadius: '4px',
    '@media (max-width: 768px)': {
      right: '10px',
      fontSize: '1rem',
    },
  },
  capacityGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '16px',
    '@media (max-width: 768px)': {
      gridTemplateColumns: '1fr',
      gap: '12px',
    },
  },
  capacityItem: {
    background: '#f9fafb',
    border: '1.5px solid #e5e7eb',
    borderRadius: '12px',
    padding: '16px',
    transition: 'all 0.3s ease',
    '@media (max-width: 768px)': {
      padding: '12px',
      borderRadius: '10px',
    },
  },
  capacityItemHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '12px',
    flexWrap: 'wrap',
    gap: '8px',
    '@media (max-width: 768px)': {
      marginBottom: '8px',
    },
  },
  mentorName: {
    fontSize: '0.95rem',
    fontWeight: '600',
    color: '#1f2937',
    margin: '0',
    '@media (max-width: 768px)': {
      fontSize: '0.85rem',
    },
  },
  menteeCount: {
    fontSize: '0.85rem',
    fontWeight: '500',
    color: '#6b7280',
    '@media (max-width: 768px)': {
      fontSize: '0.75rem',
    },
  },
  progressBar: {
    width: '100%',
    height: '6px',
    backgroundColor: '#e5e7eb',
    borderRadius: '3px',
    overflow: 'hidden',
    marginBottom: '8px',
    '@media (max-width: 768px)': {
      height: '5px',
      marginBottom: '6px',
    },
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
    fontSize: '0.8rem',
    fontWeight: '500',
    marginBottom: '12px',
    '@media (max-width: 768px)': {
      fontSize: '0.7rem',
      gap: '6px',
      marginBottom: '8px',
    },
  },
  statusWarning: {
    color: '#dc2626'
  },
  menteeList: {
    borderTop: '1px solid #e5e7eb',
    paddingTop: '12px',
    '@media (max-width: 768px)': {
      paddingTop: '8px',
    },
  },
  menteeListTitle: {
    fontSize: '0.8rem',
    fontWeight: '600',
    color: '#6b7280',
    marginBottom: '8px',
    display: 'block',
    '@media (max-width: 768px)': {
      fontSize: '0.7rem',
      marginBottom: '6px',
    },
  },
  menteeNames: {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
    '@media (max-width: 768px)': {
      gap: '4px',
    },
  },
  menteeName: {
    fontSize: '0.75rem',
    color: '#4b5563',
    padding: '2px 0',
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    '@media (max-width: 768px)': {
      fontSize: '0.65rem',
      gap: '4px',
    },
  },
  menteeBullet: {
    color: '#8b5cf6',
    fontWeight: 'bold'
  },
  // Sessions Section - Carousel
  sessionsCard: {
    background: 'white',
    borderRadius: '16px',
    padding: '24px',
    boxShadow: '0 10px 40px rgba(0, 0, 0, 0.12)',
    marginBottom: '24px',
    border: '1px solid #f1f5f9',
    '@media (max-width: 768px)': {
      padding: '16px',
      borderRadius: '12px',
      marginBottom: '20px',
    },
  },
  sessionsHeader: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    marginBottom: '24px',
    '@media (max-width: 768px)': {
      gap: '12px',
      marginBottom: '16px',
    },
  },
  sessionsTitleSection: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    '@media (max-width: 768px)': {
      gap: '6px',
    },
  },
  sessionsTitle: {
    fontSize: 'clamp(1.1rem, 3vw, 1.25rem)',
    fontWeight: '700',
    color: '#1f2937',
    margin: '0',
    '@media (max-width: 768px)': {
      fontSize: '1rem',
    },
  },
  sessionCount: {
    fontSize: '0.85rem',
    fontWeight: '600',
    color: '#6b7280',
    background: '#f3f4f6',
    padding: '6px 12px',
    borderRadius: '6px',
    alignSelf: 'flex-start',
    '@media (max-width: 768px)': {
      fontSize: '0.75rem',
      padding: '4px 8px',
    },
  },
  filterContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    '@media (max-width: 768px)': {
      gap: '12px',
    },
  },
  filterGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    '@media (max-width: 768px)': {
      gap: '6px',
    },
  },
  filterLabel: {
    fontSize: '0.85rem',
    fontWeight: '600',
    color: '#374151',
    minWidth: '100px',
    '@media (max-width: 768px)': {
      fontSize: '0.75rem',
      minWidth: '80px',
    },
  },
  filterButtons: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '8px',
    '@media (max-width: 768px)': {
      gap: '6px',
    },
  },
  filterBtn: {
    padding: '8px 16px',
    border: '1.5px solid #e5e7eb',
    borderRadius: '8px',
    background: 'white',
    color: '#6b7280',
    fontSize: '0.8rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    flex: '1',
    minWidth: '80px',
    '@media (max-width: 768px)': {
      padding: '6px 12px',
      fontSize: '0.7rem',
      minWidth: '60px',
      borderRadius: '6px',
    },
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
  // Carousel Styles
  carouselContainer: {
    position: 'relative',
    width: '100%',
  },
  carouselHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px',
    flexWrap: 'wrap',
    gap: '16px',
    '@media (max-width: 768px)': {
      marginBottom: '16px',
      gap: '12px',
    },
  },
  carouselInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    '@media (max-width: 768px)': {
      gap: '8px',
    },
  },
  carouselCounter: {
    fontSize: '0.9rem',
    fontWeight: '600',
    color: '#6b7280',
    background: '#f3f4f6',
    padding: '6px 12px',
    borderRadius: '20px',
    '@media (max-width: 768px)': {
      fontSize: '0.8rem',
      padding: '4px 8px',
    },
  },
  carouselControls: {
    display: 'flex',
    gap: '8px',
    '@media (max-width: 768px)': {
      gap: '6px',
    },
  },
  carouselBtn: {
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    border: '1.5px solid #e5e7eb',
    background: 'white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    '@media (max-width: 768px)': {
      width: '36px',
      height: '36px',
    },
  },
  carouselContent: {
    position: 'relative',
    width: '100%',
    overflow: 'hidden',
    minHeight: '300px',
    '@media (max-width: 768px)': {
      minHeight: '250px',
    },
  },
  carouselSlide: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    transition: 'transform 0.3s ease, opacity 0.3s ease',
    opacity: 0,
    transform: 'translateX(100%)'
  },
  carouselSlideActive: {
    position: 'relative',
    opacity: 1,
    transform: 'translateX(0)'
  },
  carouselSlideInactive: {
    opacity: 0,
    transform: 'translateX(-100%)'
  },
  sessionCard: {
    background: 'white',
    border: '1.5px solid #f1f5f9',
    borderRadius: '16px',
    padding: '24px',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
    transition: 'all 0.3s ease',
    minHeight: '280px',
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    '@media (max-width: 768px)': {
      padding: '16px',
      minHeight: '220px',
      gap: '16px',
      borderRadius: '12px',
    },
  },
  sessionHeader: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '16px',
    '@media (max-width: 768px)': {
      gap: '12px',
    },
  },
  sessionIconContainer: {
    width: '50px',
    height: '50px',
    borderRadius: '12px',
    background: '#f8fafc',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: '1.5px solid #e2e8f0',
    flexShrink: 0,
    '@media (max-width: 768px)': {
      width: '40px',
      height: '40px',
      borderRadius: '10px',
    },
  },
  sessionIcon: {
    fontSize: '1.5rem',
    '@media (max-width: 768px)': {
      fontSize: '1.25rem',
    },
  },
  sessionMainInfo: {
    flex: '1'
  },
  sessionTopic: {
    fontSize: '1.25rem',
    fontWeight: '700',
    color: '#1f2937',
    margin: '0 0 12px 0',
    lineHeight: '1.3',
    '@media (max-width: 768px)': {
      fontSize: '1rem',
      marginBottom: '8px',
    },
  },
  sessionMeta: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
    '@media (max-width: 768px)': {
      gap: '3px',
    },
  },
  sessionDateTime: {
    fontSize: '0.95rem',
    color: '#6b7280',
    fontWeight: '500',
    '@media (max-width: 768px)': {
      fontSize: '0.8rem',
    },
  },
  sessionDetailsMeta: {
    fontSize: '0.85rem',
    color: '#9ca3af',
    fontWeight: '500',
    '@media (max-width: 768px)': {
      fontSize: '0.7rem',
    },
  },
  sessionContent: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    gap: '24px',
    flexWrap: 'wrap',
    '@media (max-width: 768px)': {
      gap: '16px',
      flexDirection: 'column',
      alignItems: 'flex-start',
    },
  },
  sessionParticipants: {
    display: 'flex',
    gap: '20px',
    flexWrap: 'wrap',
    '@media (max-width: 768px)': {
      gap: '12px',
      width: '100%',
    },
  },
  participantCard: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '12px 16px',
    background: '#f8fafc',
    borderRadius: '10px',
    border: '1px solid #e2e8f0',
    minWidth: '180px',
    '@media (max-width: 768px)': {
      padding: '8px 12px',
      gap: '8px',
      minWidth: '140px',
      flex: '1',
    },
  },
  participantInfo: {
    display: 'flex',
    flexDirection: 'column'
  },
  participantRole: {
    fontSize: '0.75rem',
    color: '#6b7280',
    fontWeight: '500',
    marginBottom: '2px',
    '@media (max-width: 768px)': {
      fontSize: '0.65rem',
    },
  },
  participantName: {
    fontSize: '0.9rem',
    color: '#1f2937',
    fontWeight: '600',
    '@media (max-width: 768px)': {
      fontSize: '0.8rem',
    },
  },
  sessionStatusSection: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    alignItems: 'flex-end',
    '@media (max-width: 768px)': {
      alignItems: 'flex-start',
      gap: '12px',
      width: '100%',
    },
  },
  statusBadges: {
    display: 'flex',
    gap: '8px',
    alignItems: 'center',
    '@media (max-width: 768px)': {
      gap: '6px',
      flexWrap: 'wrap',
    },
  },
  phaseBadgeSmall: {
    padding: '6px 12px',
    borderRadius: '8px',
    fontSize: '0.75rem',
    fontWeight: '600',
    color: 'white',
    '@media (max-width: 768px)': {
      padding: '4px 8px',
      fontSize: '0.65rem',
    },
  },
  statusBadge: {
    padding: '6px 12px',
    borderRadius: '8px',
    fontSize: '0.75rem',
    fontWeight: '600',
    border: '1px solid',
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    '@media (max-width: 768px)': {
      padding: '4px 8px',
      fontSize: '0.65rem',
    },
  },
  carouselIndicators: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '8px',
    marginTop: '24px',
    padding: '16px 0',
    '@media (max-width: 768px)': {
      marginTop: '16px',
      padding: '12px 0',
      gap: '6px',
    },
  },
  carouselIndicator: {
    width: '8px',
    height: '8px',
    borderRadius: '50%',
    background: '#e5e7eb',
    border: 'none',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    '@media (max-width: 768px)': {
      width: '6px',
      height: '6px',
    },
  },
  carouselIndicatorActive: {
    width: '24px',
    borderRadius: '12px',
    background: '#8b5cf6',
    '@media (max-width: 768px)': {
      width: '20px',
    },
  },
  emptyState: {
    textAlign: 'center',
    padding: '60px 20px',
    color: '#9ca3af',
    '@media (max-width: 768px)': {
      padding: '40px 16px',
    },
  },
  emptyText: {
    fontSize: '0.9rem',
    fontWeight: '500',
    marginTop: '12px',
    '@media (max-width: 768px)': {
      fontSize: '0.8rem',
      marginTop: '8px',
    },
  },
  // Footer
  footer: {
    background: 'white',
    borderRadius: '16px',
    overflow: 'hidden',
    boxShadow: '0 10px 40px rgba(0, 0, 0, 0.12)',
    border: '1px solid #f1f5f9',
    '@media (max-width: 768px)': {
      borderRadius: '12px',
    },
  },
  footerContent: {
    display: 'grid',
    gridTemplateColumns: '1fr',
    gap: '32px',
    padding: '24px',
    '@media (max-width: 768px)': {
      padding: '16px',
      gap: '24px',
    },
  },
  footerSection: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    '@media (max-width: 768px)': {
      gap: '8px',
    },
  },
  footerTitle: {
    fontSize: '1rem',
    fontWeight: '700',
    color: '#1f2937',
    marginBottom: '4px',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    '@media (max-width: 768px)': {
      fontSize: '0.9rem',
      gap: '6px',
    },
  },
  footerText: {
    color: '#6b7280',
    fontSize: '0.85rem',
    lineHeight: '1.5',
    '@media (max-width: 768px)': {
      fontSize: '0.75rem',
    },
  },
  footerLinks: {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
    '@media (max-width: 768px)': {
      gap: '4px',
    },
  },
  footerLink: {
    color: '#6b7280',
    textDecoration: 'none',
    fontSize: '0.85rem',
    transition: 'color 0.2s ease',
    '@media (max-width: 768px)': {
      fontSize: '0.75rem',
    },
  },
  contactInfo: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    '@media (max-width: 768px)': {
      gap: '8px',
    },
  },
  contactItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    color: '#6b7280',
    fontSize: '0.85rem',
    '@media (max-width: 768px)': {
      gap: '8px',
      fontSize: '0.75rem',
    },
  },
  contactIcon: {
    fontSize: '1rem',
    '@media (max-width: 768px)': {
      fontSize: '0.9rem',
    },
  },
  footerBottom: {
    borderTop: '1px solid #e5e7eb',
    padding: '20px 24px',
    background: '#f9fafb',
    '@media (max-width: 768px)': {
      padding: '16px',
    },
  },
  footerBottomContent: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    alignItems: 'center',
    '@media (max-width: 768px)': {
      gap: '8px',
    },
  },
  copyright: {
    color: '#6b7280',
    fontSize: '0.8rem',
    fontWeight: '500',
    textAlign: 'center',
    '@media (max-width: 768px)': {
      fontSize: '0.7rem',
    },
  },
  socialLinks: {
    display: 'flex',
    gap: '16px',
    '@media (max-width: 768px)': {
      gap: '12px',
    },
  },
  socialLink: {
    color: '#6b7280',
    textDecoration: 'none',
    fontSize: '0.8rem',
    fontWeight: '500',
    transition: 'color 0.2s ease',
    '@media (max-width: 768px)': {
      fontSize: '0.7rem',
    },
  }
};