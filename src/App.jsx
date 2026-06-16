import React, { useState, useEffect, useMemo } from 'react';
import sampleResponse from '../sample-response.json';
import './App.css';

// SVG Icons for clean UI without installing extra packages
const IconSearch = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
);
const IconShield = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
);
const IconFlame = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"></path></svg>
);
const IconActivity = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline></svg>
);
const IconUsers = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
);
const IconCompass = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"></polygon></svg>
);
const IconSettings = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>
);
const IconArrowUp = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="19" x2="12" y2="5"></line><polyline points="5 12 12 5 19 12"></polyline></svg>
);
const IconArrowDown = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><polyline points="19 12 12 19 5 12"></polyline></svg>
);
const IconAlertTriangle = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
);
const IconInfo = ({ className, style }) => (
  <svg className={className} style={style} xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
);

function App() {
  // Config States
  const [envClanId, setEnvClanId] = useState(() => {
    return Number(import.meta.env.VITE_MY_CLAN_ID) || 785;
  });
  const [targetClanId, setTargetClanId] = useState(envClanId);
  const [apiBaseUrl, setApiBaseUrl] = useState(import.meta.env.VITE_API_BASE_URL || 'https://static.ninjasaga.cc');
  const [rankLimit, setRankLimit] = useState(() => {
    const stored = localStorage.getItem('ns_cw_rank_limit');
    return stored ? Number(stored) : 20;
  });
  const [cwEndDay, setCwEndDay] = useState(() => {
    return Number(import.meta.env.VITE_CW_END_DAY) || 21;
  });
  const [cwTimezone, setCwTimezone] = useState(() => {
    return import.meta.env.VITE_CW_TIMEZONE || '+08:00';
  });
  const [cwCountdown, setCwCountdown] = useState('00 Days : 00 Hours : 00 Min');
  
  // Data States
  const [rankings, setRankings] = useState(null);
  const [snapshots, setSnapshots] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [dataSource, setDataSource] = useState('Local JSON');
  
  // Adaptive Polling States
  const [isAutoPolling, setIsAutoPolling] = useState(true);
  const [pollingInterval, setPollingInterval] = useState(60); // standard: 60 seconds
  const [timeToNextPoll, setTimeToNextPoll] = useState(60); // countdown
  const [consecutiveStagnantTicks, setConsecutiveStagnantTicks] = useState(0);
  const [simulationMode, setSimulationMode] = useState(() => {
    const isSimEnabled = import.meta.env.VITE_ENABLE_SIMULATION === 'true';
    if (!isSimEnabled) return false;
    return localStorage.getItem('ns_cw_simulation_mode') === 'true';
  });
  const [highSpeedTicksRemaining, setHighSpeedTicksRemaining] = useState(0); // high speed 1s polling countdown
  
  // Bleed Reset Countdown States
  const [bleedResetCountdown, setBleedResetCountdown] = useState('00m 00s');
  const [isNearReset, setIsNearReset] = useState(false);
  const [lastResetBoundary, setLastResetBoundary] = useState(() => {
    const now = new Date();
    return `${now.getHours()}:${now.getMinutes() < 30 ? '00' : '30'}`;
  });
  
  // UI States
  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortBy, setSortBy] = useState('reputation');
  const [enableSound, setEnableSound] = useState(() => {
    return localStorage.getItem('ns_cw_enable_sound') === 'true';
  });
  const [enableNotifications, setEnableNotifications] = useState(() => {
    return localStorage.getItem('ns_cw_enable_notifications') === 'true';
  });
  const [notifyGaining, setNotifyGaining] = useState(() => {
    const stored = localStorage.getItem('ns_cw_notify_gaining');
    return stored === null ? true : stored === 'true';
  });
  const [notifyBleeding, setNotifyBleeding] = useState(() => {
    const stored = localStorage.getItem('ns_cw_notify_bleeding');
    return stored === null ? true : stored === 'true';
  });
  const [lastNotifiedTime, setLastNotifiedTime] = useState('');
  // Track whether gain/bleed sounds have already fired this reset boundary.
  // Cleared in handleTimeReset so each sound plays at most once per 30-min cycle.
  const soundFiredThisReset = React.useRef({ gain: false, bleed: false });
  const [sortOrder, setSortOrder] = useState('desc');

  // Leaderboard Filtering & Search States
  const [lbSearch, setLbSearch] = useState('');
  const [lbBleedFilter, setLbBleedFilter] = useState('all');
  const [lbYieldFilter, setLbYieldFilter] = useState('all');
  const [inspectingClan, setInspectingClan] = useState(null);
  const [showConfigDropdown, setShowConfigDropdown] = useState(false);

  // Helper to trim snapshot data to avoid localStorage QuotaExceededError (~5MB limit)
  const trimSnapshot = (snapshot, targetId, envId, keepFull = false) => {
    if (!snapshot) return null;
    if (keepFull) return snapshot;
    const tId = targetId || targetClanId;
    const eId = envId || envClanId;
    return {
      ...snapshot,
      clans: (snapshot.clans || []).map(clan => {
        const isTarget = clan.id === tId || clan.id === eId;
        if (isTarget) {
          return {
            id: clan.id,
            name: clan.name,
            reputation: clan.reputation,
            rank: clan.rank,
            members: clan.members,
            member_list: (clan.member_list || []).map(m => ({
              id: m.id,
              name: m.name,
              level: m.level,
              reputation: m.reputation
            }))
          };
        } else {
          return {
            id: clan.id,
            name: clan.name,
            reputation: clan.reputation,
            rank: clan.rank,
            members: clan.members
          };
        }
      })
    };
  };

  const safeSaveSnapshots = (snapshotsList) => {
    try {
      localStorage.setItem('ns_cw_snapshots', JSON.stringify(snapshotsList));
    } catch (e) {
      console.error('Failed to save snapshots to localStorage:', e);
    }
  };

  // Load Initial Data
  useEffect(() => {
    initializeData();
  }, []);

  // Sync targetClanId if VITE_MY_CLAN_ID env changes
  useEffect(() => {
    const parsedEnv = Number(import.meta.env.VITE_MY_CLAN_ID) || 785;
    setEnvClanId(parsedEnv);
    setTargetClanId(parsedEnv);
  }, [import.meta.env.VITE_MY_CLAN_ID]);

  // Persist rankLimit changes
  useEffect(() => {
    localStorage.setItem('ns_cw_rank_limit', rankLimit);
  }, [rankLimit]);

  // Prevent background scroll when modal is open
  useEffect(() => {
    if (inspectingClan) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [inspectingClan]);

  // Web Audio Synthesized notification sound
  const playNotificationSound = (type) => {
    try {
      const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      if (audioCtx.state === 'suspended') {
        audioCtx.resume();
      }
      
      if (type === 'bleed') {
        // High-pitched warning sound: double beep
        const playBeep = (freq, time, duration) => {
          const osc = audioCtx.createOscillator();
          const gainNode = audioCtx.createGain();
          osc.connect(gainNode);
          gainNode.connect(audioCtx.destination);
          osc.frequency.setValueAtTime(freq, time);
          gainNode.gain.setValueAtTime(0.15, time);
          gainNode.gain.exponentialRampToValueAtTime(0.0001, time + duration);
          osc.start(time);
          osc.stop(time + duration);
        };
        
        const nowTime = audioCtx.currentTime;
        playBeep(880, nowTime, 0.15);
        playBeep(880, nowTime + 0.2, 0.25);
      } else if (type === 'gain') {
        // Pleasant upward chime: three rapid notes
        const playChime = (freq, time, duration) => {
          const osc = audioCtx.createOscillator();
          const gainNode = audioCtx.createGain();
          osc.connect(gainNode);
          gainNode.connect(audioCtx.destination);
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(freq, time);
          gainNode.gain.setValueAtTime(0.1, time);
          gainNode.gain.exponentialRampToValueAtTime(0.0001, time + duration);
          osc.start(time);
          osc.stop(time + duration);
        };
        
        const nowTime = audioCtx.currentTime;
        playChime(523.25, nowTime, 0.1);
        playChime(659.25, nowTime + 0.1, 0.1);
        playChime(783.99, nowTime + 0.2, 0.25);
      }
    } catch (err) {
      console.error("Web Audio API sound failed", err);
    }
  };

  // Push notification helper
  const triggerPushNotification = (title, body) => {
    if (!("Notification" in window)) return;
    if (Notification.permission === "granted") {
      new Notification(title, { body });
    } else if (Notification.permission !== "denied") {
      Notification.requestPermission().then(permission => {
        if (permission === "granted") {
          new Notification(title, { body });
        }
      });
    }
  };

  useEffect(() => {
    localStorage.setItem('ns_cw_enable_sound', enableSound);
  }, [enableSound]);

  useEffect(() => {
    localStorage.setItem('ns_cw_enable_notifications', enableNotifications);
    if (enableNotifications && "Notification" in window && Notification.permission !== "granted") {
      Notification.requestPermission();
    }
  }, [enableNotifications]);

  useEffect(() => {
    localStorage.setItem('ns_cw_notify_gaining', notifyGaining);
  }, [notifyGaining]);

  useEffect(() => {
    localStorage.setItem('ns_cw_notify_bleeding', notifyBleeding);
  }, [notifyBleeding]);

  useEffect(() => {
    if (import.meta.env.VITE_ENABLE_SIMULATION === 'true') {
      localStorage.setItem('ns_cw_simulation_mode', simulationMode);
    } else {
      localStorage.removeItem('ns_cw_simulation_mode');
    }
  }, [simulationMode]);

  useEffect(() => {
    if (!showConfigDropdown) return;
    const handleOutsideClick = (e) => {
      const toggleBtn = document.getElementById('config-dropdown-toggle');
      const dropdownEl = document.getElementById('config-dropdown-menu');
      if ((toggleBtn && toggleBtn.contains(e.target)) || (dropdownEl && dropdownEl.contains(e.target))) {
        return;
      }
      setShowConfigDropdown(false);
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, [showConfigDropdown]);

  // Polling, Countdown & Clock Boundary Reset Effect
  // Uses a Web Worker so timers keep running accurately even when the tab is
  // backgrounded (alt-tabbed). Browsers throttle main-thread setInterval in
  // inactive tabs, but Worker timers are exempt from this throttling.
  useEffect(() => {
    if (!rankings) return;

    const worker = new Worker(new URL('./timerWorker.js', import.meta.url), { type: 'module' });

    worker.onmessage = () => {
      const now = new Date();
      const m = now.getMinutes();
      const s = now.getSeconds();

      // Calculate time remaining until next xx:00 or xx:30
      const targetMin = m < 30 ? 30 : 60;
      const diffSeconds = (targetMin - m) * 60 - s;
      const minRemain = Math.floor(diffSeconds / 60);
      const secRemain = diffSeconds % 60;
      
      setBleedResetCountdown(`${minRemain}m ${secRemain.toString().padStart(2, '0')}s`);
      setIsNearReset(diffSeconds <= 180); // <= 3 minutes left

      // Check boundary transition
      const currentBoundaryKey = `${now.getHours()}:${m < 30 ? '00' : '30'}`;
      if (lastResetBoundary && lastResetBoundary !== currentBoundaryKey) {
        // Clock crossed the boundary! Reset snapshots baseline
        setLastResetBoundary(currentBoundaryKey);
        handleTimeReset();
      }

      // Calculate Clan War End countdown dynamically
      let cwCountdownText = 'ENDED';
      try {
        let offsetMinutes = 0;
        const match = cwTimezone.match(/^([+-])(\d{2}):(\d{2})$/);
        if (match) {
          const sign = match[1] === '+' ? 1 : -1;
          const hours = parseInt(match[2], 10);
          const minutes = parseInt(match[3], 10);
          offsetMinutes = sign * (hours * 60 + minutes);
        }

        const constructTargetDate = (year, month) => {
          const utcMidnight = Date.UTC(year, month, cwEndDay, 0, 0, 0);
          return new Date(utcMidnight - (offsetMinutes * 60 * 1000));
        };

        let targetDate = constructTargetDate(now.getFullYear(), now.getMonth());

        // Rollover to next month if already passed
        if (targetDate.getTime() <= now.getTime()) {
          let nextMonth = now.getMonth() + 1;
          let nextYear = now.getFullYear();
          if (nextMonth > 11) {
            nextMonth = 0;
            nextYear += 1;
          }
          targetDate = constructTargetDate(nextYear, nextMonth);
        }

        const diffMs = targetDate.getTime() - now.getTime();
        if (diffMs > 0) {
          const diffSecs = Math.floor(diffMs / 1000);
          const days = Math.floor(diffSecs / 86400);
          const hours = Math.floor((diffSecs % 86400) / 3600);
          const mins = Math.floor((diffSecs % 3600) / 60);
          
          cwCountdownText = `${days.toString().padStart(2, '0')} Days : ${hours.toString().padStart(2, '0')} Hours : ${mins.toString().padStart(2, '0')} Min`;
        }
      } catch (err) {
        cwCountdownText = 'INVALID DATE';
      }
      setCwCountdown(cwCountdownText);

      // Decrement Auto-Poll Countdown
      if (isAutoPolling) {
        setHighSpeedTicksRemaining(prev => Math.max(0, prev - 1));
        setTimeToNextPoll(prev => {
          if (prev <= 1) {
            triggerAutoPoll();
            return pollingInterval;
          }
          return prev - 1;
        });
      }
    };

    worker.postMessage('start');

    return () => {
      worker.postMessage('stop');
      worker.terminate();
    };
  }, [isAutoPolling, rankings, pollingInterval, lastResetBoundary, cwEndDay, cwTimezone]);

  const handleTimeReset = () => {
    // Reset sound flags so they can fire again in the new cycle
    soundFiredThisReset.current = { gain: false, bleed: false };

    if (rankings) {
      const resetSnapshots = [
        {
          ...rankings,
          generated_at: new Date().toISOString().replace('T', ' ').slice(0, 19) + ' (Reset Boundary Baseline)'
        }
      ];
      setSnapshots(resetSnapshots);
      safeSaveSnapshots(resetSnapshots);
    } else {
      setSnapshots(prev => {
        if (prev.length === 0) return prev;
        const latest = prev[prev.length - 1];
        const resetSnapshots = [
          {
            ...latest,
            generated_at: new Date().toISOString().replace('T', ' ').slice(0, 19) + ' (Reset Boundary Baseline)'
          }
        ];
        safeSaveSnapshots(resetSnapshots);
        return resetSnapshots;
      });
    }
  };

  // Adaptive Polling rate trigger on rankings updates and bleed detection
  useEffect(() => {
    if (!rankings || snapshots.length < 2) return;

    // 1. Check if our target clan is gaining reputation
    const currentClan = rankings.clans.find(c => c.id === targetClanId);
    const prevSnapshot = snapshots[snapshots.length - 2];
    const prevClan = prevSnapshot ? prevSnapshot.clans.find(c => c.id === targetClanId) : null;

    let desiredInterval = 60; // standard 60 seconds
    let isGaining = false;

    if (currentClan && prevClan) {
      const gain = currentClan.reputation - prevClan.reputation;
      if (gain > 0) {
        isGaining = true;
      }
    }

    // 2. Check for NEW bleeding clans
    const latestSnapshot = snapshots[snapshots.length - 1];
    const secondLatestSnapshot = snapshots[snapshots.length - 2];
    let newBleeds = [];

    if (latestSnapshot && secondLatestSnapshot) {
      // Helper function to dynamically identify bleeding IDs in any snapshot comparison
      const getBleedingIds = (snap, prevSnap) => {
        if (!snap || !prevSnap) return [];
        
        // Actively gaining clans (farming)
        const gaining = snap.clans.filter(c => {
          const prevC = prevSnap.clans.find(pc => pc.id === c.id);
          return prevC && c.reputation > prevC.reputation;
        });
        
        if (gaining.length === 0) return [];
        const gainingIds = new Set(gaining.map(g => g.id));

        // Bleeding target IDs
        return snap.clans.filter(c => {
          if (gainingIds.has(c.id)) return false;
          
          // Nearby attackers (within 10 ranks)
          const hasNearbyAttacker = gaining.some(gc => Math.abs(gc.rank - c.rank) <= 10 && gc.rank !== c.rank);
          
          // Stagnancy check
          const prevC = prevSnap.clans.find(pc => pc.id === c.id);
          const isStagnant = prevC ? c.reputation <= prevC.reputation : true;
          
          return isStagnant && hasNearbyAttacker;
        }).map(c => c.id);
      };

      const currBleedingList = getBleedingIds(latestSnapshot, secondLatestSnapshot);
      
      const prevSnapshotThree = snapshots.length >= 3 ? snapshots[snapshots.length - 3] : null;
      const prevBleedingList = prevSnapshotThree ? getBleedingIds(secondLatestSnapshot, prevSnapshotThree) : [];

      // Find if any clan is bleeding now but was not in the previous tick
      newBleeds = currBleedingList.filter(id => !prevBleedingList.includes(id));
      
      if (newBleeds.length > 0) {
        // We have a new bleeding clan! Speed up polling to 1 second for 30 ticks
        setHighSpeedTicksRemaining(30);
        desiredInterval = 1;
      } else if (highSpeedTicksRemaining > 0) {
        desiredInterval = 1;
      } else if (isGaining) {
        desiredInterval = 10;
      }
    } else if (isGaining) {
      desiredInterval = 10;
    }

    if (pollingInterval !== desiredInterval) {
      setPollingInterval(desiredInterval);
      setTimeToNextPoll(desiredInterval);
    }

    // Trigger sounds and push notifications (once per reset boundary)
    // Each sound type fires at most once per 30-min reset cycle.
    // The flags are cleared in handleTimeReset when the boundary crosses.
    if (latestSnapshot && latestSnapshot.generated_at !== lastNotifiedTime) {
      setLastNotifiedTime(latestSnapshot.generated_at);

      if (isGaining && notifyGaining && !soundFiredThisReset.current.gain) {
        soundFiredThisReset.current.gain = true;
        if (enableSound) playNotificationSound('gain');
        if (enableNotifications) {
          triggerPushNotification(
            "⚔️ Clan Rep Gained!",
            `Your clan (${currentClan?.name || 'Tracked'}) has gained reputation since the last update!`
          );
        }
      }

      if (newBleeds.length > 0 && notifyBleeding && !soundFiredThisReset.current.bleed) {
        soundFiredThisReset.current.bleed = true;
        const bleedingClansNames = newBleeds.map(id => {
          const c = latestSnapshot.clans.find(clan => clan.id === id);
          return c ? `${c.name} (#${c.rank})` : `ID ${id}`;
        }).join(', ');

        if (enableSound) playNotificationSound('bleed');
        if (enableNotifications) {
          triggerPushNotification(
            "🔴 New Bleeding Targets Detected!",
            `Possible bleeding target(s): ${bleedingClansNames}`
          );
        }
      }
    }
  }, [rankings, targetClanId, snapshots, highSpeedTicksRemaining, pollingInterval, lastNotifiedTime, enableSound, enableNotifications, notifyGaining, notifyBleeding]);

  const triggerAutoPoll = () => {
    if (simulationMode) {
      simulateLiveTick();
    } else {
      pollData();
    }
  };

  // Shared fetch logic — returns the API data without touching loading state
  const fetchRankingsData = async () => {
    try {
      const proxyRes = await fetch('/ninja-api/data/clan_rankings.json');
      if (proxyRes.ok) {
        const data = await proxyRes.json();
        setDataSource('API (Vite Proxy)');
        return data;
      }
    } catch (err) { /* fall through */ }

    try {
      const directRes = await fetch(`${apiBaseUrl}/data/clan_rankings.json`);
      if (directRes.ok) {
        const data = await directRes.json();
        setDataSource('API (Direct CORS)');
        return data;
      }
    } catch (err) { /* fall through */ }

    return null;
  };

  // Append new data to snapshot history if it's different from the latest
  const updateSnapshots = (loadedData) => {
    setSnapshots(prev => {
      // If we have existing snapshots for the same season, check for new data
      if (prev.length > 0 && prev[0].season?.id === loadedData.season?.id) {
        const latest = prev[prev.length - 1];
        if (latest.generated_at !== loadedData.generated_at) {
          const trimmed = trimSnapshot(loadedData);
          const updated = [...prev, trimmed];
          safeSaveSnapshots(updated);
          return updated;
        }
        return prev; // same data, no update
      }
      // New season or no snapshots — fresh baseline
      const fresh = [trimSnapshot(loadedData, null, null, true)];
      safeSaveSnapshots(fresh);
      return fresh;
    });
  };

  // Initial load — shows loading spinner, sets up baseline
  const initializeData = async () => {
    setLoading(true);
    setError(null);

    const loadedData = await fetchRankingsData() || sampleResponse;
    if (loadedData === sampleResponse) {
      setDataSource('Local JSON Fallback');
    }

    setRankings(loadedData);

    // Restore snapshots from localStorage or create fresh baseline (with auto-migration to trimmed snapshots)
    const storedSnapshots = localStorage.getItem('ns_cw_snapshots');
    if (storedSnapshots) {
      try {
        const parsed = JSON.parse(storedSnapshots);
        if (parsed.length > 0 && parsed[0].season?.id === loadedData.season?.id) {
          const trimmedList = parsed.map((s, idx) => trimSnapshot(s, null, null, idx === 0));
          setSnapshots(trimmedList);
          safeSaveSnapshots(trimmedList);
        } else {
          const fresh = [trimSnapshot(loadedData, null, null, true)];
          setSnapshots(fresh);
          safeSaveSnapshots(fresh);
        }
      } catch (err) {
        const fresh = [trimSnapshot(loadedData, null, null, true)];
        setSnapshots(fresh);
        safeSaveSnapshots(fresh);
      }
    } else {
      const fresh = [trimSnapshot(loadedData, null, null, true)];
      setSnapshots(fresh);
      safeSaveSnapshots(fresh);
    }

    setLoading(false);
  };

  // Silent background poll — no loading flash, just reactive state updates
  const pollData = async () => {
    const loadedData = await fetchRankingsData();
    if (!loadedData) return; // silently skip on failure

    setRankings(loadedData);
    updateSnapshots(loadedData);
  };

  // Reset snapshot history to fresh baseline from current data
  const clearHistory = () => {
    if (rankings) {
      const fresh = [trimSnapshot(rankings, null, null, true)];
      setSnapshots(fresh);
      safeSaveSnapshots(fresh);
    }
  };

  // Calculate stats for target clan
  const targetClanData = useMemo(() => {
    if (!rankings) return null;
    const currentClan = rankings.clans.find(c => c.id === targetClanId);
    if (!currentClan) {
      return null;
    }

    const baselineSnapshot = snapshots[0];
    const baselineClan = baselineSnapshot ? baselineSnapshot.clans.find(c => c.id === currentClan.id) : null;
    const prevSnapshot = snapshots[snapshots.length - 2];
    const prevClan = prevSnapshot ? prevSnapshot.clans.find(c => c.id === currentClan.id) : null;

    const memberAnalysis = currentClan.member_list.map(member => {
      const baselineMember = (baselineClan && baselineClan.member_list) ? baselineClan.member_list.find(m => m.id === member.id) : null;
      const reputationGain = baselineMember ? (member.reputation - baselineMember.reputation) : 0;
      
      let status = 'active';
      if (reputationGain > 0) {
        status = 'active';
      } else if (!baselineMember) {
        status = 'joined';
      } else if (member.reputation === 0) {
        status = 'zero-rep';
      } else if (member.level >= 80 && member.reputation < 200) {
        status = 'inactive';
      } else {
        status = 'stale';
      }

      return {
        ...member,
        reputationGain,
        status,
        prevReputation: baselineMember ? baselineMember.reputation : 0
      };
    });

    const leftMembers = [];
    if (prevClan && prevClan.member_list) {
      prevClan.member_list.forEach(pm => {
        const stillInClan = currentClan.member_list.some(cm => cm.id === pm.id);
        if (!stillInClan) {
          leftMembers.push(pm);
        }
      });
    }

    const totalGain = prevClan ? (currentClan.reputation - prevClan.reputation) : 0;
    const resetGain = baselineClan ? (currentClan.reputation - baselineClan.reputation) : 0;
    
    const sortedMembers = [...memberAnalysis].sort((a, b) => {
      let comparison = 0;
      if (sortBy === 'reputation' || sortBy === 'reputationGain' || sortBy === 'level') {
        comparison = a[sortBy] - b[sortBy];
      } else {
        comparison = a[sortBy].toString().localeCompare(b[sortBy].toString());
      }
      return sortOrder === 'desc' ? -comparison : comparison;
    });

    return {
      current: currentClan,
      previous: prevClan,
      baseline: baselineClan,
      members: sortedMembers,
      leftMembers,
      totalGain,
      resetGain,
      gainVelocity: totalGain,
    };
  }, [rankings, snapshots, targetClanId, sortBy, sortOrder]);

  // Dynamic Bleed Yield Analysis for all 100 clans relative to user's targeted clan
  const leaderboardAnalysis = useMemo(() => {
    if (!rankings || !targetClanData) return [];
    
    const myClanRep = targetClanData.current.reputation;
    // Use baseline (first snapshot = post-reset snapshot) for cumulative gain
    const baselineSnapshot = snapshots.length > 0 ? snapshots[0] : null;
    // Use previous snapshot for per-tick gain detection
    const prevSnapshot = snapshots.length >= 2 ? snapshots[snapshots.length - 2] : null;

    return rankings.clans.filter(clan => clan.rank <= rankLimit).map(clan => {
      // Cumulative gain since baseline (reset boundary)
      const baselineClan = baselineSnapshot ? baselineSnapshot.clans.find(c => c.id === clan.id) : null;
      const gain = baselineClan ? (clan.reputation - baselineClan.reputation) : 0;

      // Per-tick gain (latest vs previous snapshot)
      const prevClan = prevSnapshot ? prevSnapshot.clans.find(c => c.id === clan.id) : null;
      const tickGain = prevClan ? (clan.reputation - prevClan.reputation) : 0;

      // Track consecutive gain streak across ALL snapshots
      let consecutiveGainStreak = 0;
      for (let i = snapshots.length - 1; i >= 1; i--) {
        const curr = snapshots[i].clans.find(c => c.id === clan.id);
        const prev = snapshots[i - 1].clans.find(c => c.id === clan.id);
        if (curr && prev && curr.reputation > prev.reputation) {
          consecutiveGainStreak++;
        } else {
          break;
        }
      }
      // A clan is "actively gaining" if it gained in the latest tick OR has cumulative gain with at least 1 streak
      const isActivelyGaining = tickGain > 0 || (gain > 0 && consecutiveGainStreak >= 1);

      // Track consecutive stagnant/loss ticks (for bleeding detection)
      let consecutiveStagnantTicks = 0;
      for (let i = snapshots.length - 1; i >= 1; i--) {
        const curr = snapshots[i].clans.find(c => c.id === clan.id);
        const prev = snapshots[i - 1].clans.find(c => c.id === clan.id);
        if (curr && prev && curr.reputation <= prev.reputation) {
          consecutiveStagnantTicks++;
        } else {
          break;
        }
      }

      // Count inactive members in this clan
      const inactiveCount = clan.member_list.filter(m => {
        return m.reputation === 0 || (m.level >= 80 && m.reputation < 200);
      }).length;
      const inactivePercent = clan.members > 0 ? (inactiveCount / clan.members) * 100 : 0;

      // Reputation percentage difference relative to my clan
      const diffPercent = ((clan.reputation - myClanRep) / myClanRep) * 100;

      // Bleed Yield (+15, +10, +6, +3, +1) based on user's exact thresholds
      let bleedYield = 1;
      if (diffPercent > 25) {
        bleedYield = 15;
      } else if (diffPercent > 10) {
        bleedYield = 10;
      } else if (diffPercent >= 0) {
        bleedYield = 6;
      } else if (diffPercent >= -10) {
        bleedYield = 3;
      } else {
        bleedYield = 1;
      }

      return {
        ...clan,
        gain,
        tickGain,
        consecutiveGainStreak,
        consecutiveStagnantTicks,
        isActivelyGaining,
        inactiveCount,
        inactivePercent,
        isBleeding: false, // computed below
        diffPercent,
        bleedYield
      };
    });
  }, [rankings, snapshots, targetClanData, rankLimit]);

  // Clans actively gaining rep (farming)
  const activelyGainingClans = useMemo(() => {
    return leaderboardAnalysis.filter(c => c.isActivelyGaining && c.gain > 0);
  }, [leaderboardAnalysis]);

  // Identify possible bleed targets:
  // A clan is bleeding if:
  // 1. Its rep is stagnant or dropping (gain <= 0 or tickGain <= 0 while neighbors gain)
  // 2. Nearby clans (within ±10 ranks) are actively gaining
  // This means someone near them is farming and they are the likely victim
  const bleedAnalysis = useMemo(() => {
    if (!targetClanData) return [];

    const myClanRep = targetClanData.current.reputation;

    if (activelyGainingClans.length === 0) {
      return leaderboardAnalysis.map(clan => {
        let nextLowerThreshold = null;
        let nextLowerYield = null;
        if (clan.diffPercent > 25) {
          nextLowerThreshold = 25;
          nextLowerYield = 10;
        } else if (clan.diffPercent > 10) {
          nextLowerThreshold = 10;
          nextLowerYield = 6;
        } else if (clan.diffPercent >= 0) {
          nextLowerThreshold = 0;
          nextLowerYield = 3;
        } else if (clan.diffPercent >= -10) {
          nextLowerThreshold = -10;
          nextLowerYield = 1;
        }

        let repNeededToChange = null;
        if (nextLowerThreshold !== null) {
          const targetRepAtThreshold = Math.ceil(myClanRep * (1 + nextLowerThreshold / 100));
          repNeededToChange = clan.reputation - targetRepAtThreshold;
          if (repNeededToChange < 0) repNeededToChange = 0;
        }

        return {
          ...clan,
          isBleeding: false,
          bleedAttackers: [],
          bleedScore: 0,
          bleedReason: 'Stable',
          nextLowerThreshold,
          nextLowerYield,
          repNeededToChange,
          timeToChange: null
        };
      });
    }

    const gainingClanIds = new Set(activelyGainingClans.map(c => c.id));
    
    return leaderboardAnalysis.map(clan => {
      // Determine the next lower yield threshold percentage and the corresponding next yield value
      let nextLowerThreshold = null;
      let nextLowerYield = null;
      if (clan.diffPercent > 25) {
        nextLowerThreshold = 25;
        nextLowerYield = 10;
      } else if (clan.diffPercent > 10) {
        nextLowerThreshold = 10;
        nextLowerYield = 6;
      } else if (clan.diffPercent >= 0) {
        nextLowerThreshold = 0;
        nextLowerYield = 3;
      } else if (clan.diffPercent >= -10) {
        nextLowerThreshold = -10;
        nextLowerYield = 1;
      }

      let repNeededToChange = null;
      let timeToChange = null;

      if (nextLowerThreshold !== null) {
        const targetRepAtThreshold = Math.ceil(myClanRep * (1 + nextLowerThreshold / 100));
        repNeededToChange = clan.reputation - targetRepAtThreshold;
        if (repNeededToChange < 0) repNeededToChange = 0;

        // Rate of target loss (clan.tickGain < 0)
        const targetLossRate = clan.tickGain < 0 ? -clan.tickGain : 0;
        
        let hoursPerTick = 6;
        if (snapshots.length >= 2) {
          const t1 = new Date(snapshots[snapshots.length - 1].generated_at).getTime();
          const t2 = new Date(snapshots[snapshots.length - 2].generated_at).getTime();
          const diffHours = (t1 - t2) / (1000 * 60 * 60);
          if (diffHours > 0 && diffHours < 168) {
            hoursPerTick = diffHours;
          }
        }

        if (targetLossRate > 0) {
          const ticksNeeded = repNeededToChange / targetLossRate;
          timeToChange = ticksNeeded * hoursPerTick;
        }
      }

      // If this clan is itself actively gaining, it's not bleeding
      if (gainingClanIds.has(clan.id)) {
        return { 
          ...clan, 
          isBleeding: false, 
          bleedAttackers: [],
          bleedScore: 0,
          bleedReason: 'Stable',
          nextLowerThreshold,
          nextLowerYield,
          repNeededToChange,
          timeToChange
        };
      }

      // Find nearby clans that ARE gaining (within ±10 ranks)
      const nearbyAttackers = activelyGainingClans.filter(gc => {
        const rankDiff = Math.abs(gc.rank - clan.rank);
        return rankDiff <= 10 && rankDiff > 0;
      });

      // A clan is bleeding if:
      // - It's NOT gaining AND there are nearby clans that ARE gaining
      // - Its stagnancy is suspicious (tickGain <= 0 or cumulative gain is 0)
      const isStagnant = clan.tickGain <= 0 || clan.gain <= 0;
      const isBleeding = isStagnant && nearbyAttackers.length > 0;
      
      // Calculate Bleed Score
      let bleedScore = 0;
      let reasons = [];

      if (isBleeding) {
        // Factor 1: Stagnancy (tick gain is exactly 0 or negative)
        if (clan.tickGain === 0) {
          bleedScore += 50; // if it gains 0 rep it is mostly the clan bleeds
          reasons.push("0 rep gain");
        } else if (clan.tickGain < 0) {
          bleedScore += 45;
          reasons.push(`Rep drop (${clan.tickGain.toLocaleString()} rep)`);
        }

        if (clan.gain <= 0) {
          bleedScore += 15;
          reasons.push("No cumulative gain since reset");
        }

        // Factor 2: Nearby active attackers
        const attackerCount = nearbyAttackers.length;
        if (attackerCount > 0) {
          const attackerPoints = Math.min(25, attackerCount * 8);
          bleedScore += attackerPoints;
          reasons.push(`${attackerCount} nearby attackers`);
        }

        // Factor 3: Attacker speed
        const maxAttackerGain = Math.max(...nearbyAttackers.map(a => a.gain), 0);
        if (maxAttackerGain > 1500) {
          bleedScore += 10;
          reasons.push("High intensity farm nearby");
        } else if (maxAttackerGain > 500) {
          bleedScore += 5;
        }
      }

      const bleedReason = reasons.join(" | ") || "Stable";
      
      return { 
        ...clan, 
        isBleeding, 
        bleedAttackers: nearbyAttackers,
        bleedScore: Math.min(100, bleedScore),
        bleedReason,
        nextLowerThreshold,
        nextLowerYield,
        repNeededToChange,
        timeToChange
      };
    });
  }, [leaderboardAnalysis, activelyGainingClans, targetClanData, snapshots]);

  // Filtered Leaderboard for the rankings view
  const filteredLeaderboard = useMemo(() => {
    return bleedAnalysis.filter(c => {
      const matchesSearch = c.name.toLowerCase().includes(lbSearch.toLowerCase()) || 
                            c.master.toLowerCase().includes(lbSearch.toLowerCase()) || 
                            c.id.toString().includes(lbSearch);
      
      const matchesBleed = lbBleedFilter === 'all' || 
                            (lbBleedFilter === 'bleeding' && c.isBleeding) || 
                            (lbBleedFilter === 'active' && !c.isBleeding);
                            
      const matchesYield = lbYieldFilter === 'all' || 
                            c.bleedYield === Number(lbYieldFilter);

      return matchesSearch && matchesBleed && matchesYield;
    });
  }, [bleedAnalysis, lbSearch, lbBleedFilter, lbYieldFilter]);

  // Live Active Clans (Clans Gaining Rep) widget data — clans actively gaining
  const liveActiveClans = useMemo(() => {
    return [...bleedAnalysis]
      .filter(c => c.isActivelyGaining && c.gain > 0)
      .sort((a, b) => b.gain - a.gain)
      .slice(0, 5);
  }, [bleedAnalysis]);

  // Possible Bleeding Recommendations widget data
  const bleedingTargets = useMemo(() => {
    return [...bleedAnalysis]
      .filter(c => c.isBleeding && c.id !== targetClanId)
      .sort((a, b) => {
        if (b.bleedYield !== a.bleedYield) {
          return b.bleedYield - a.bleedYield;
        }
        return a.rank - b.rank; // show stronger ones first
      })
      .slice(0, 5);
  }, [bleedAnalysis, targetClanId]);

  // Competitive standings details (forecasting shifts)
  const competitiveData = useMemo(() => {
    if (!rankings || !targetClanData) return null;
    const currentClan = targetClanData.current;
    const myRank = currentClan.rank;

    const clanAhead = rankings.clans.find(c => c.rank === myRank - 1);
    const clanBehind = rankings.clans.find(c => c.rank === myRank + 1);

    const prevSnapshot = snapshots[snapshots.length - 2];
    if (!prevSnapshot) {
      return { 
        clanAhead, 
        clanBehind, 
        aheadGap: clanAhead ? clanAhead.reputation - currentClan.reputation : 0, 
        behindGap: clanBehind ? currentClan.reputation - clanBehind.reputation : 0,
        myGain: 0,
        aheadGain: 0,
        behindGain: 0,
        overtakeText: 'Generating snapshots...',
        overtakeClass: 'text-glow-wind',
        overtakenText: 'Generating snapshots...',
        overtakenClass: 'text-glow-wind'
      };
    }

    const prevClanAhead = clanAhead ? prevSnapshot.clans.find(c => c.id === clanAhead.id) : null;
    const prevClanBehind = clanBehind ? prevSnapshot.clans.find(c => c.id === clanBehind.id) : null;
    const prevMyClan = targetClanData.previous;

    const myGain = prevMyClan ? currentClan.reputation - prevMyClan.reputation : 0;
    const aheadGain = (clanAhead && prevClanAhead) ? clanAhead.reputation - prevClanAhead.reputation : 0;
    const behindGain = (clanBehind && prevClanBehind) ? clanBehind.reputation - prevClanBehind.reputation : 0;

    const aheadGap = clanAhead ? clanAhead.reputation - currentClan.reputation : null;
    const behindGap = clanBehind ? currentClan.reputation - clanBehind.reputation : null;

    let overtakeText = 'Position stable';
    let overtakeClass = 'text-glow-wind';
    let overtakenText = 'Position secure';
    let overtakenClass = 'text-glow-wind';

    const intervalHours = 6; 

    if (clanAhead && myGain > aheadGain) {
      const netGainPerHour = (myGain - aheadGain) / intervalHours;
      if (netGainPerHour > 0) {
        const hoursToOvertake = aheadGap / netGainPerHour;
        overtakeText = `Overtaking in ~${hoursToOvertake.toFixed(1)} hrs (+${Math.round(netGainPerHour * 24)}/day net)`;
        overtakeClass = 'text-glow-water';
      }
    } else if (clanAhead) {
      overtakeText = 'Falling behind (Gap widening)';
      overtakeClass = 'text-glow-fire';
    }

    if (clanBehind && behindGain > myGain) {
      const netLossPerHour = (behindGain - myGain) / intervalHours;
      if (netLossPerHour > 0) {
        const hoursToOvertaken = behindGap / netLossPerHour;
        overtakenText = `CRITICAL: Overtaken in ~${hoursToOvertaken.toFixed(1)} hrs (-${Math.round(netLossPerHour * 24)}/day net)`;
        overtakenClass = 'text-glow-fire bleeding-pulse';
      }
    } else if (clanBehind) {
      overtakenText = 'Lead expanding (+Secure)';
      overtakenClass = 'text-glow-wind';
    }

    return {
      clanAhead,
      clanBehind,
      aheadGap,
      behindGap,
      myGain,
      aheadGain,
      behindGain,
      overtakeText,
      overtakeClass,
      overtakenText,
      overtakenClass,
    };
  }, [rankings, targetClanData, snapshots]);

  // Helper to generate consistent, deterministic simulation behavior profiles per reset boundary (3-hour blocks)
  const getClanSimProfile = (clanId, timestampStr) => {
    // Round timestamp to 3-hour blocks
    const date = new Date(timestampStr.replace(' ', 'T'));
    const blockHours = Math.floor(date.getHours() / 3) * 3;
    const resetKey = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} ${blockHours}:00`;

    // Simple deterministic hash
    const seedStr = `${clanId}-${resetKey}`;
    let hash = 0;
    for (let i = 0; i < seedStr.length; i++) {
      hash = (hash << 5) - hash + seedStr.charCodeAt(i);
      hash |= 0;
    }
    const rand = Math.abs(hash % 1000) / 1000;

    // Profiles:
    // - 0.00 to 0.02: Rare penalty / deduction (loss of rep)
    // - 0.02 to 0.15: Bleeding / Stagnant (0 gain)
    // - 0.15 to 0.45: Active standard (gains rep)
    // - 0.45 to 0.60: Hyper active (gains high rep)
    // - 0.60 to 1.00: Inactive / Stale (0 gain)
    if (rand < 0.02) {
      return { type: 'deduction', baseGain: -180, variance: 50 };
    } else if (rand < 0.15) {
      return { type: 'stagnant', baseGain: 0, variance: 0 };
    } else if (rand < 0.45) {
      return { type: 'active', baseGain: 120, variance: 60 };
    } else if (rand < 0.60) {
      return { type: 'hyper', baseGain: 350, variance: 120 };
    } else {
      return { type: 'inactive', baseGain: 0, variance: 0 };
    }
  };

  // Generate simulated next tick
  const simulateLiveTick = () => {
    if (!rankings) return;

    const latestSnapshot = snapshots[snapshots.length - 1];
    const newTimestamp = new Date(new Date(latestSnapshot.generated_at).getTime() + 1 * 60 * 60 * 1000)
      .toISOString()
      .replace('T', ' ')
      .slice(0, 19);

    const targetClan = rankings.clans.find(c => c.id === targetClanId);
    const targetRank = targetClan ? targetClan.rank : 1;

    const updatedClans = rankings.clans.map(clan => {
      const isTarget = clan.id === targetClanId;
      const isAhead = competitiveData.clanAhead && clan.id === competitiveData.clanAhead.id;
      const isBehind = competitiveData.clanBehind && clan.id === competitiveData.clanBehind.id;

      // Retrieve consistent profile for this reset block
      const profile = getClanSimProfile(clan.id, newTimestamp);

      let baseGain = profile.baseGain;
      let variance = profile.variance;

      // Custom adjustments to keep target/competitors active and competitive
      if (isTarget) {
        baseGain = 160;
        variance = 80;
      } else if (isAhead) {
        baseGain = Math.max(baseGain, 150);
        variance = Math.max(variance, 70);
      } else if (isBehind) {
        baseGain = Math.max(baseGain, 220);
        variance = Math.max(variance, 100);
      }

      let memberList = clan.member_list ? [...clan.member_list] : [];
      let clanGainSum = 0;

      if (memberList.length > 0) {
        memberList = memberList.map(m => {
          let gain = 0;
          
          if (m.reputation > 0 && !m.name.includes('OldShadow')) {
            if (baseGain > 0) {
              const memberRoll = Math.random();
              if (memberRoll > 0.4) {
                gain = Math.floor(Math.random() * variance) + Math.floor(baseGain / 10);
              }
            } else if (baseGain < 0) {
              gain = Math.floor(baseGain / 10);
            }
          }

          clanGainSum += gain;

          return {
            ...m,
            reputation: Math.max(0, m.reputation + gain)
          };
        });

        if (isTarget && Math.random() > 0.7) {
          const kickIndex = memberList.findIndex(m => m.reputation < 2000 && m.id !== 99999);
          if (kickIndex !== -1) {
            memberList.splice(kickIndex, 1);
          }
          const newId = Math.floor(Math.random() * 10000) + 60000;
          memberList.push({
            id: newId,
            name: `Genin_${newId % 100} 🛡️`,
            level: Math.floor(Math.random() * 20) + 60,
            reputation: 0
          });
        }
      } else {
        // Fallback if no member list, simulate direct clan gain
        const membersCount = clan.members || 40;
        for (let i = 0; i < membersCount; i++) {
          let gain = 0;
          if (baseGain > 0) {
            const memberRoll = Math.random();
            if (memberRoll > 0.4) {
              gain = Math.floor(Math.random() * variance) + Math.floor(baseGain / 10);
            }
          } else if (baseGain < 0) {
            gain = Math.floor(baseGain / 10);
          }
          clanGainSum += gain;
        }
      }

      const totalRep = Math.max(0, clan.reputation + clanGainSum);

      return {
        ...clan,
        reputation: totalRep,
        member_list: memberList
      };
    });

    const sortedClans = [...updatedClans]
      .sort((a, b) => b.reputation - a.reputation)
      .map((clan, index) => ({
        ...clan,
        rank: index + 1
      }));

    const newSnapshot = {
      generated_at: newTimestamp,
      season: latestSnapshot.season,
      clans: sortedClans
    };

    // Rankings retains the full untrimmed snapshot (so we keep member_lists in-memory)
    setRankings(newSnapshot);

    // Snapshots state and localStorage get the trimmed version to save space
    const trimmedSnapshot = trimSnapshot(newSnapshot);
    setSnapshots(prev => {
      const newSnapshotsList = [...prev, trimmedSnapshot];
      safeSaveSnapshots(newSnapshotsList);
      return newSnapshotsList;
    });

    setDataSource('Simulated live feed updates');
  };




  const filteredMembers = useMemo(() => {
    if (!targetClanData) return [];
    return targetClanData.members.filter(m => {
      const matchesSearch = m.name.toLowerCase().includes(searchTerm.toLowerCase()) || m.id.toString().includes(searchTerm);
      if (statusFilter === 'all') return matchesSearch;
      if (statusFilter === 'active') return matchesSearch && m.reputationGain > 0;
      if (statusFilter === 'inactive') return matchesSearch && m.status === 'inactive';
      if (statusFilter === 'bleeding') return matchesSearch && m.status === 'zero-rep';
      if (statusFilter === 'joined') return matchesSearch && m.status === 'joined';
      return matchesSearch;
    });
  }, [targetClanData, searchTerm, statusFilter]);

  const clanAlerts = useMemo(() => {
    const alertsList = [];
    if (!targetClanData) return alertsList;

    if (targetClanData.current.deduction > 0) {
      alertsList.push({
        type: 'error',
        message: `Deduction Warning: Clan has been penalized -${targetClanData.current.deduction.toLocaleString()} reputation points!`
      });
    }

    if (competitiveData && competitiveData.behindGap !== null && competitiveData.behindGain > competitiveData.myGain) {
      alertsList.push({
        type: 'warning',
        message: `${competitiveData.overtakenText} - The clan behind is farming faster! Gained +${(competitiveData.behindGain - competitiveData.myGain).toLocaleString()} more rep than us.`
      });
    }

    return alertsList;
  }, [targetClanData, competitiveData]);

  const rosterAlerts = useMemo(() => {
    const alertsList = [];
    if (!targetClanData) return alertsList;

    const zeroRepCount = targetClanData.members.filter(m => m.status === 'zero-rep').length;
    const inactiveCount = targetClanData.members.filter(m => m.status === 'inactive').length;

    if (zeroRepCount > 0) {
      alertsList.push({
        type: 'error',
        message: `Zero Contribution Slots: ${zeroRepCount} members have 0 total reputation contributions. Kick inactive members to avoid holding the clan back.`
      });
    }

    if (inactiveCount > 0) {
      alertsList.push({
        type: 'warning',
        message: `Underperforming Slots: ${inactiveCount} level 80+ members have contributed less than 200 reputation. Monitor their activity.`
      });
    }

    return alertsList;
  }, [targetClanData]);

  if (loading) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100vh', gap: '1rem' }}>
        <div className="text-glow-water" style={{ fontFamily: 'var(--font-gaming)', fontSize: '1.5rem', fontWeight: 'bold' }}>LOADING SHADOW SCROLLS...</div>
        <div style={{ width: '200px', height: '4px', background: 'var(--border-color)', borderRadius: '2px', overflow: 'hidden' }}>
          <div style={{ height: '100%', background: 'var(--color-water)', animation: 'pulse 1s infinite' }}></div>
        </div>
      </div>
    );
  }

  if (error || !targetClanData) {
    return (
      <div className="app-container" style={{ padding: '4rem 2rem', textAlign: 'center' }}>
        <div className="glass-card" style={{ maxWidth: '600px', margin: '0 auto' }}>
          <IconAlertTriangle className="text-glow-fire" style={{ width: '48px', height: '48px', margin: '0 auto 1.5rem' }} />
          <h2 className="text-glow-fire" style={{ marginBottom: '1rem' }}>CLAN TRACKING ERROR</h2>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
            Could not find the target Clan ID ({targetClanId}) in the Top 100 rankings.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <input 
              type="number" 
              className="input-field" 
              value={targetClanId} 
              onChange={e => setTargetClanId(Number(e.target.value))} 
              placeholder="Enter valid Clan ID (e.g. 785)"
            />
            <button className="btn-primary" onClick={initializeData}>RELOAD DATA</button>
          </div>
        </div>
      </div>
    );
  }

  const { current, totalGain, resetGain, members } = targetClanData;

  return (
    <>
      <div className="app-container animate-fade-in">
      {/* Header */}
      <header style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '1.5rem', marginBottom: '2rem', paddingBottom: '1rem', borderBottom: '1px solid var(--border-color)' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <span className="badge badge-water" style={{ fontFamily: 'var(--font-gaming)', fontSize: '0.8rem' }}>Ninja Saga CW</span>
            <span style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>Data: <strong style={{ color: 'var(--text-primary)' }}>{dataSource}</strong></span>
          </div>
          <h1 className="text-glow-water app-title" style={{ marginTop: '0.25rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            {current.name} <span style={{ fontSize: '1rem', color: 'var(--text-muted)' }} className="hide-mobile">ID: {current.id}</span>
          </h1>
        </div>
        
        {/* Right side container with info and big Config button */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', position: 'relative' }}>
          <div style={{ textAlign: 'right', display: 'flex', flexDirection: 'column', gap: '0.25rem', alignItems: 'flex-end' }}>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }} className="hide-mobile">Season: <strong style={{ color: 'var(--color-earth)' }}>{rankings.season.name}</strong></div>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
              CW Ends: <strong className="text-number" style={{ color: 'var(--color-fire)', textShadow: 'var(--glow-fire)', letterSpacing: '0.02em' }}>{cwCountdown}</strong>
            </div>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }} className="hide-mobile">Latest Update: <strong style={{ color: 'var(--text-primary)' }}>{rankings.generated_at}</strong></div>
          </div>
          
          <button 
            id="config-dropdown-toggle"
            className="btn-primary" 
            style={{ 
              padding: '0.6rem 1.25rem', 
              fontSize: '0.95rem', 
              display: 'flex', 
              alignItems: 'center', 
              gap: '0.5rem', 
              border: '1px solid var(--border-color)', 
              borderRadius: '6px',
              cursor: 'pointer',
              background: showConfigDropdown ? 'var(--color-water)' : 'var(--bg-tertiary)',
              color: 'var(--text-primary)',
              fontFamily: 'var(--font-gaming)',
              boxShadow: showConfigDropdown ? 'var(--glow-water)' : 'none',
              transition: 'all 0.2s ease',
              fontWeight: 'bold',
              height: '50px'
            }}
            onClick={() => setShowConfigDropdown(prev => !prev)}
          >
            ⚙️ CONFIG
          </button>

          {/* Config Dropdown Menu */}
          {showConfigDropdown && (
            <div 
              id="config-dropdown-menu"
              className="glass-card animate-fade-in" 
              style={{
                position: 'absolute',
                top: '100%',
                right: 0,
                marginTop: '0.75rem',
                width: '380px',
                zIndex: 1000,
                padding: '1.5rem',
                textAlign: 'left',
                boxShadow: '0 12px 40px rgba(0,0,0,0.7)',
                border: '2px solid var(--border-color)',
                display: 'flex',
                flexDirection: 'column',
                gap: '1.25rem',
                maxHeight: '85vh',
                overflowY: 'auto',
                background: 'rgba(15, 15, 20, 0.98)',
                backdropFilter: 'blur(16px)',
                borderRadius: '8px'
              }}
            >
              <h3 style={{ fontSize: '0.95rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem', margin: 0, color: 'var(--text-primary)', fontFamily: 'var(--font-gaming)' }}>⚙️ TRACKER CONFIG</h3>
              
              {/* Sound & Notifications Toggles */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <strong style={{ fontSize: '0.9rem' }}>🔊 Sound Alerts</strong>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Audio chimes for war events</div>
                  </div>
                  <button 
                    className={enableSound ? 'btn-primary' : 'btn-secondary'} 
                    style={{ fontSize: '0.8rem', padding: '0.3rem 0.8rem' }} 
                    onClick={() => {
                      setEnableSound(prev => !prev);
                      if (!enableSound) {
                        setTimeout(() => playNotificationSound('gain'), 100);
                      }
                    }}
                  >
                    {enableSound ? 'ON' : 'OFF'}
                  </button>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <strong style={{ fontSize: '0.9rem' }}>🔔 Desktop Notify</strong>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Desktop push notifications</div>
                  </div>
                  <button 
                    className={enableNotifications ? 'btn-primary' : 'btn-secondary'} 
                    style={{ fontSize: '0.8rem', padding: '0.3rem 0.8rem' }} 
                    onClick={() => {
                      setEnableNotifications(prev => !prev);
                      if (!enableNotifications) {
                        triggerPushNotification("Notifications Enabled", "Desktop alerts enabled!");
                      }
                    }}
                  >
                    {enableNotifications ? 'ON' : 'OFF'}
                  </button>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingLeft: '0.5rem', borderLeft: '2px solid var(--color-wind)' }}>
                  <div>
                    <strong style={{ fontSize: '0.9rem' }}>⚔️ Gaining Alerts</strong>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Notify on rep gains</div>
                  </div>
                  <button 
                    className={notifyGaining ? 'btn-primary' : 'btn-secondary'} 
                    style={{ fontSize: '0.8rem', padding: '0.3rem 0.8rem', borderColor: notifyGaining ? 'var(--color-wind)' : 'transparent' }} 
                    onClick={() => setNotifyGaining(prev => !prev)}
                  >
                    {notifyGaining ? 'ON' : 'OFF'}
                  </button>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingLeft: '0.5rem', borderLeft: '2px solid var(--color-fire)' }}>
                  <div>
                    <strong style={{ fontSize: '0.9rem' }}>🔴 Bleeding Alerts</strong>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Notify on bleeding targets</div>
                  </div>
                  <button 
                    className={notifyBleeding ? 'btn-primary' : 'btn-secondary'} 
                    style={{ fontSize: '0.8rem', padding: '0.3rem 0.8rem', borderColor: notifyBleeding ? 'var(--color-fire)' : 'transparent' }} 
                    onClick={() => setNotifyBleeding(prev => !prev)}
                  >
                    {notifyBleeding ? 'ON' : 'OFF'}
                  </button>
                </div>
              </div>

              {/* Core Configurations */}
              <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '0.85rem', display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '0.35rem', fontFamily: 'var(--font-gaming)' }}>RANK ANALYSIS LIMIT</label>
                  <div style={{ display: 'flex', gap: '0.35rem' }}>
                    <select
                      className="btn-secondary"
                      style={{ fontSize: '0.8rem', padding: '0.25rem 0.5rem', flexGrow: 1, height: '36px' }}
                      value={[10, 20, 30, 50, 100].includes(rankLimit) ? rankLimit : 'custom'}
                      onChange={e => {
                        if (e.target.value !== 'custom') {
                          setRankLimit(Number(e.target.value));
                        }
                      }}
                    >
                      <option value="10">Top 10</option>
                      <option value="20">Top 20</option>
                      <option value="30">Top 30</option>
                      <option value="50">Top 50</option>
                      <option value="100">Top 100</option>
                      {![10, 20, 30, 50, 100].includes(rankLimit) && (
                        <option value="custom">Limit: {rankLimit}</option>
                      )}
                    </select>
                    <input
                      type="number"
                      min="1"
                      max="100"
                      className="input-field"
                      style={{ width: '70px', height: '36px', padding: '0.25rem 0.5rem', fontSize: '0.85rem' }}
                      value={rankLimit}
                      onChange={e => setRankLimit(Math.max(1, Math.min(100, Number(e.target.value) || 20)))}
                    />
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <div style={{ flex: 1 }}>
                    <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '0.35rem', fontFamily: 'var(--font-gaming)' }}>CW END DAY</label>
                    <input
                      type="number"
                      min="1"
                      max="31"
                      className="input-field"
                      style={{ width: '100%', height: '36px', padding: '0.25rem 0.5rem', fontSize: '0.85rem' }}
                      value={cwEndDay}
                      onChange={e => setCwEndDay(Math.max(1, Math.min(31, Number(e.target.value) || 21)))}
                    />
                  </div>
                  <div style={{ flex: 1 }}>
                    <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '0.35rem', fontFamily: 'var(--font-gaming)' }}>TIMEZONE</label>
                    <input
                      type="text"
                      className="input-field"
                      style={{ width: '100%', height: '36px', padding: '0.25rem 0.5rem', fontSize: '0.85rem' }}
                      value={cwTimezone}
                      onChange={e => setCwTimezone(e.target.value)}
                      placeholder="+08:00"
                    />
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '0.35rem', fontFamily: 'var(--font-gaming)' }}>API ENDPOINT BASE</label>
                  <input
                    type="text"
                    className="input-field"
                    style={{ width: '100%', height: '36px', padding: '0.25rem 0.5rem', fontSize: '0.8rem' }}
                    value={apiBaseUrl}
                    onChange={e => setApiBaseUrl(e.target.value)}
                  />
                </div>

                <button 
                  className="btn-secondary" 
                  style={{ fontSize: '0.8rem', padding: '0.5rem', width: '100%', marginTop: '0.25rem', height: '38px' }}
                  onClick={() => {
                    if (window.confirm("Reset timeline history? This will clear all snapshots.")) {
                      clearHistory();
                      setShowConfigDropdown(false);
                    }
                  }}
                >
                  🔄 Reset Timeline History
                </button>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Adaptive Polling Control Panel Widget */}
      <section className="glass-card" style={{ marginBottom: '1.5rem', padding: '1rem', border: '1px solid var(--border-color)', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: isAutoPolling ? 'var(--color-wind)' : 'var(--text-muted)', display: 'inline-block' }} className={pollingInterval <= 10 && isAutoPolling ? 'bleeding-pulse' : ''}></div>
            <div>
              <span style={{ fontSize: '0.9rem', fontWeight: 'bold', fontFamily: 'var(--font-gaming)' }}>
                {pollingInterval === 1 ? '🚀 HIGH-SPEED DETECTION' : pollingInterval <= 10 ? '🔥 ACTIVE POLLING MODE' : '💤 STANDBY POLLING MODE'}
              </span>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginLeft: '0.5rem' }}>
                ({pollingInterval}s interval)
              </span>
            </div>
          </div>
          
          {/* Bleed Reset Countdown Widget */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', paddingLeft: '1rem', borderLeft: '1px solid var(--border-color)' }}>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', fontFamily: 'var(--font-gaming)' }}>NEXT RESET:</span>
            <span className="text-number" style={{ fontSize: '1rem', fontWeight: 'bold', color: isNearReset ? 'var(--color-fire)' : 'var(--color-earth)', animation: isNearReset ? 'pulse 1s infinite alternate' : 'none' }}>
              {bleedResetCountdown}
            </span>
            {isNearReset && <span className="badge badge-fire" style={{ fontSize: '0.7rem' }}>🛑 STOP ATTACKING</span>}
          </div>
        </div>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', flexGrow: '1', justifyContent: 'flex-end', flexWrap: 'wrap' }}>
          <div style={{ minWidth: '150px', fontSize: '0.85rem' }}>
            Next update in: <strong className="text-number" style={{ color: 'var(--color-water)' }}>{timeToNextPoll}s</strong>
            <div className="progress-bar-bg" style={{ height: '4px', marginTop: '0.25rem' }}>
              <div className="progress-bar-fill" style={{ width: `${(timeToNextPoll / pollingInterval) * 100}%`, background: 'var(--color-water)' }}></div>
            </div>
          </div>
          
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button 
              className="btn-secondary" 
              style={{ fontSize: '0.8rem', padding: '0.35rem 0.75rem', border: !isAutoPolling ? '1px solid var(--color-fire)' : '1px solid var(--border-color)' }} 
              onClick={() => setIsAutoPolling(prev => !prev)}
            >
              {isAutoPolling ? '⏸ Pause Polling' : '▶ Resume Polling'}
            </button>
            {import.meta.env.VITE_ENABLE_SIMULATION === 'true' && (
              <button 
                className="btn-secondary" 
                style={{ fontSize: '0.8rem', padding: '0.35rem 0.75rem', border: simulationMode ? '1px solid var(--color-water)' : '1px solid var(--border-color)' }} 
                onClick={() => setSimulationMode(prev => !prev)}
              >
                Sim Mode: {simulationMode ? 'ON' : 'OFF'}
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Alert Banner System */}
      {clanAlerts.length > 0 && (
        <div style={{ marginBottom: '1.5rem' }}>
          {clanAlerts.map((alert, index) => (
            <div key={index} className={`alert-box alert-box-${alert.type}`}>
              <IconAlertTriangle className={alert.type === 'error' ? 'text-glow-fire' : 'text-glow-earth'} style={{ flexShrink: 0 }} />
              <div>{alert.message}</div>
            </div>
          ))}
        </div>
      )}

      {/* Dynamic Summary: Clans Gaining Rep & Possible Bleed Targets */}
      <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem', marginBottom: '1.5rem' }}>
        <div className="glass-card" style={{ padding: '1.25rem' }}>
          <h3 className="text-glow-wind" style={{ fontSize: '1rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem', fontFamily: 'var(--font-gaming)' }}>
            <IconActivity className="text-glow-wind" style={{ width: '18px', height: '18px' }} />
            CLANS CONTINUOUSLY GAINING REP
            <span className="badge badge-wind" style={{ fontSize: '0.65rem', marginLeft: 'auto' }}>{liveActiveClans.length} farming</span>
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
            {liveActiveClans.slice(0, 5).map(c => (
              <div key={c.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.9rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span 
                    style={{ cursor: 'pointer', textDecoration: 'underline', fontWeight: '500' }}
                    onClick={() => setInspectingClan(c)}
                    title="Click to inspect this clan"
                  >
                    #{c.rank} {c.name}
                  </span>
                  <span style={{ fontSize: '0.7rem', color: 'var(--color-earth)' }} title="Consecutive ticks with gain">
                    🔥{c.consecutiveGainStreak}x streak
                  </span>
                </div>
                <span className="badge badge-wind" style={{ fontSize: '0.75rem' }}>+{c.gain.toLocaleString()} rep</span>
              </div>
            ))}
            {liveActiveClans.length === 0 && (
              <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem', textAlign: 'center', padding: '0.5rem' }}>No clans continuously gaining (need 2+ consecutive ticks)</div>
            )}
          </div>
        </div>

        <div className="glass-card" style={{ padding: '1.25rem' }}>
          <h3 className="text-glow-fire" style={{ fontSize: '1rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem', fontFamily: 'var(--font-gaming)' }}>
            <IconAlertTriangle className="text-glow-fire" style={{ width: '18px', height: '18px' }} />
            POSSIBLE BLEED TARGETS
            <span className="badge badge-fire" style={{ fontSize: '0.65rem', marginLeft: 'auto' }}>{bleedingTargets.length} targets</span>
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
            {bleedingTargets.slice(0, 5).map(c => (
              <div key={c.id} style={{ fontSize: '0.9rem' }}>
                 <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span 
                      style={{ cursor: 'pointer', textDecoration: 'underline', fontWeight: '500' }}
                      onClick={() => setInspectingClan(c)}
                      title="Click to inspect this clan"
                    >
                      #{c.rank} {c.name}
                    </span>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                      ({c.diffPercent >= 0 ? '+' : ''}{c.diffPercent.toFixed(0)}%)
                    </span>
                    <span className="bleed-info-tooltip">
                      <IconInfo style={{ color: 'var(--text-muted)', cursor: 'help' }} />
                      <div className="tooltip-card">
                        <div style={{ fontWeight: 'bold', marginBottom: '0.4rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.2rem', color: 'var(--color-fire)' }}>
                          🔴 Bleed Analysis
                        </div>
                        <div style={{ marginBottom: '0.3rem' }}>
                          <strong>Score:</strong> {c.bleedScore}/100
                        </div>
                        <div style={{ marginBottom: '0.3rem' }}>
                          <strong>Reason:</strong> {c.bleedReason}
                        </div>
                        {c.bleedAttackers && c.bleedAttackers.length > 0 && (
                          <div>
                            <strong>Likely Attackers:</strong>
                            <div style={{ color: 'var(--text-secondary)', marginTop: '0.15rem' }}>
                              {c.bleedAttackers.map(a => `${a.name} (#${a.rank})`).join(', ')}
                            </div>
                          </div>
                        )}
                      </div>
                    </span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span 
                      style={{ 
                        fontSize: '0.7rem', 
                        fontWeight: 'bold', 
                        color: c.bleedScore >= 70 ? 'var(--color-fire)' : c.bleedScore >= 40 ? 'var(--color-earth)' : 'var(--text-secondary)',
                      }}
                    >
                      {c.bleedScore}/100
                    </span>
                    <span className={`badge ${c.bleedYield === 15 ? 'badge-fire' : c.bleedYield === 10 ? 'badge-earth' : c.bleedYield === 6 ? 'badge-water' : 'badge-secondary'}`} style={{ fontSize: '0.75rem' }}>
                      +{c.bleedYield} yield
                    </span>
                  </div>
                </div>
                {c.repNeededToChange !== null && c.repNeededToChange > 0 && (
                  <div style={{ fontSize: '0.7rem', color: 'var(--color-lightning)', marginTop: '0.2rem', paddingLeft: '0.5rem', display: 'flex', flexWrap: 'wrap', gap: '0.25rem', alignItems: 'center' }}>
                    <span>⚡ Next Yield (+{c.nextLowerYield}):</span>
                    <strong style={{ color: 'var(--text-primary)' }}>-{c.repNeededToChange.toLocaleString()} rep</strong>
                    {c.timeToChange !== null && (
                      <span style={{ color: 'var(--text-muted)' }}>(~{c.timeToChange.toFixed(1)}h)</span>
                    )}
                  </div>
                )}
              </div>
            ))}
            {bleedingTargets.length === 0 && (
              <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem', textAlign: 'center', padding: '0.5rem' }}>No bleed targets — no clans are continuously farming</div>
            )}
          </div>
        </div>
      </section>

      {/* High Level Metrics Row */}
      <section className="stats-grid">
        <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', fontFamily: 'var(--font-gaming)' }}>LEADERBOARD RANK</span>
            <IconShield className="text-glow-earth" />
          </div>
          <div style={{ marginTop: '0.75rem' }}>
            <span className="text-number text-glow-earth" style={{ fontSize: '2.5rem' }}>#{current.rank}</span>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
              Rank {current.rank <= 10 ? 'Elite (Top 10)' : 'Challenger (Top 100)'}
            </div>
          </div>
        </div>

        <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', fontFamily: 'var(--font-gaming)' }}>TOTAL REPUTATION</span>
            <IconFlame className="text-glow-fire" />
          </div>
          <div style={{ marginTop: '0.75rem' }}>
            <span className="text-number text-glow-fire" style={{ fontSize: '2.2rem' }}>{current.reputation.toLocaleString()}</span>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              Deductions: <span style={{ color: current.deduction > 0 ? 'var(--color-fire)' : 'var(--text-muted)' }}>-{current.deduction.toLocaleString()}</span>
            </div>
          </div>
        </div>

        <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', fontFamily: 'var(--font-gaming)' }}>REP GAINED (RESET)</span>
            <IconActivity className="text-glow-wind" />
          </div>
          <div style={{ marginTop: '0.75rem' }}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem' }}>
              <span className="text-number text-glow-wind" style={{ fontSize: '2.2rem' }}>+{resetGain.toLocaleString()}</span>
              {resetGain > 0 && <span style={{ color: 'var(--color-wind)', fontSize: '0.85rem' }}><IconArrowUp /></span>}
            </div>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              Avg. Gain / Member: <span style={{ color: 'var(--text-primary)' }}>+{Math.round(resetGain / current.members).toLocaleString()}</span>
            </div>
          </div>
        </div>

        <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', fontFamily: 'var(--font-gaming)' }}>ACTIVE MEMBERS</span>
            <IconUsers className="text-glow-water" />
          </div>
          <div style={{ marginTop: '0.75rem' }}>
            <span className="text-number text-glow-water" style={{ fontSize: '2.2rem' }}>{current.members} <span style={{ fontSize: '1.2rem', color: 'var(--text-muted)' }}>/ 40</span></span>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              Gaining Rep: <span style={{ color: 'var(--color-wind)' }}>{members.filter(m => m.reputationGain > 0).length} ({Math.round(members.filter(m => m.reputationGain > 0).length / current.members * 100)}%)</span>
            </div>
          </div>
        </div>
      </section>

      {/* Tabs */}
      <nav className="tabs-container">
        <button className={`tab-btn ${activeTab === 'dashboard' ? 'active' : ''}`} onClick={() => setActiveTab('dashboard')}>
          <IconShield /> DASHBOARD OVERVIEW
        </button>
        <button className={`tab-btn ${activeTab === 'leaderboard' ? 'active' : ''}`} onClick={() => setActiveTab('leaderboard')}>
          <IconCompass /> LEADERBOARD & BLEED
        </button>
        <button className={`tab-btn ${activeTab === 'roster' ? 'active' : ''}`} onClick={() => setActiveTab('roster')}>
          <IconUsers /> ROSTER ANALYSIS
        </button>
        <button className={`tab-btn ${activeTab === 'competitive' ? 'active' : ''}`} onClick={() => setActiveTab('competitive')}>
          <IconCompass /> COMPETITIVE FORECAST
        </button>
        <button className={`tab-btn ${activeTab === 'activity' ? 'active' : ''}`} onClick={() => setActiveTab('activity')}>
          <IconActivity /> ACTIVITY LOGS
        </button>
      </nav>

      {/* Tab Panels */}
      <main>
        {/* TAB 1: DASHBOARD */}
        {activeTab === 'dashboard' && (
          <section className="grid-cols-1-3 animate-fade-in">
            {/* Sidebar */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div className="glass-card">
                <h3 style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem', marginBottom: '1rem' }}>CLAN PROFILE</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.9rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: 'var(--text-secondary)' }}>Master:</span>
                    <strong style={{ color: 'var(--color-earth)' }}>{current.master}</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: 'var(--text-secondary)' }}>Rank:</span>
                    <strong>#{current.rank}</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: 'var(--text-secondary)' }}>Active Size:</span>
                    <strong>{current.members} Members</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: 'var(--text-secondary)' }}>Average Level:</span>
                    <strong>{(members.reduce((sum, m) => sum + m.level, 0) / members.length).toFixed(1)}</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: 'var(--text-secondary)' }}>Average Rep:</span>
                    <strong>{Math.round(current.reputation / current.members).toLocaleString()}</strong>
                  </div>
                </div>
              </div>
            </div>

            {/* Main Section */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div className="glass-card">
                <h3 style={{ marginBottom: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span>TOP CONTRIBUTORS (THIS RESET)</span>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Sorted by Gains</span>
                </h3>
                <div className="table-wrapper">
                  <table className="custom-table">
                    <thead>
                      <tr>
                        <th>Member</th>
                        <th className="hide-mobile">Level</th>
                        <th>Total Reputation</th>
                        <th style={{ textAlign: 'right' }}>Rep Gained (Reset)</th>
                      </tr>
                    </thead>
                    <tbody>
                      {members
                        .filter(m => m.reputationGain > 0)
                        .sort((a, b) => b.reputationGain - a.reputationGain)
                        .slice(0, 5)
                        .map(m => (
                          <tr key={m.id}>
                            <td>
                              <strong style={{ color: 'var(--color-water)' }}>{m.name}</strong>
                              {m.name === current.master && <span style={{ marginLeft: '0.5rem' }} className="badge badge-earth">Master</span>}
                            </td>
                            <td className="hide-mobile">Lvl {m.level}</td>
                            <td className="text-number">{m.reputation.toLocaleString()}</td>
                            <td className="text-number text-glow-wind" style={{ textAlign: 'right', fontWeight: 'bold' }}>
                              +{m.reputationGain.toLocaleString()}
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {competitiveData && competitiveData.clanBehind && (
                <div className="glass-card">
                  <h3 style={{ marginBottom: '1.25rem' }}>COMPETITIVE STATUS</h3>
                  
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {competitiveData.clanAhead && (
                      <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', marginBottom: '0.25rem' }}>
                          <span style={{ color: 'var(--text-secondary)' }}>Rank #{competitiveData.clanAhead.rank}: {competitiveData.clanAhead.name}</span>
                          <span style={{ color: 'var(--color-fire)', fontWeight: 'bold' }}>+{competitiveData.aheadGap.toLocaleString()} rep ahead</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                          <span>Velocity: +{competitiveData.aheadGain.toLocaleString()}/snapshot</span>
                          <span className={competitiveData.overtakeClass}>{competitiveData.overtakeText}</span>
                        </div>
                      </div>
                    )}

                    <div style={{ borderTop: '1px dashed var(--border-color)', margin: '0.25rem 0' }}></div>

                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', marginBottom: '0.25rem' }}>
                        <span style={{ color: 'var(--color-water)', fontWeight: 'bold' }}>Rank #{current.rank}: {current.name} (YOU)</span>
                        <span style={{ color: 'var(--color-wind)' }}>Velocity: +{totalGain.toLocaleString()}/snapshot</span>
                      </div>
                    </div>

                    <div style={{ borderTop: '1px dashed var(--border-color)', margin: '0.25rem 0' }}></div>

                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', marginBottom: '0.25rem' }}>
                        <span style={{ color: 'var(--text-secondary)' }}>Rank #{competitiveData.clanBehind.rank}: {competitiveData.clanBehind.name}</span>
                        <span style={{ color: 'var(--color-wind)', fontWeight: 'bold' }}>+{competitiveData.behindGap.toLocaleString()} lead</span>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                        <span>Velocity: +{competitiveData.behindGain.toLocaleString()}/snapshot</span>
                        <span className={competitiveData.overtakenClass}>{competitiveData.overtakenText}</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </section>
        )}

        {/* TAB 2: LEADERBOARD & BLEED ANALYSIS */}
        {activeTab === 'leaderboard' && (
          <section className="glass-card animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {/* Calculation Reference Header */}
            <details style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '8px', padding: '1rem', outline: 'none' }}>
              <summary style={{ cursor: 'pointer', fontWeight: 'bold', fontFamily: 'var(--font-gaming)', color: 'var(--color-water)', fontSize: '0.9rem', outline: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span>⚔️ VIEW BLEED ATTACK YIELD FORMULA</span>
                <span style={{ fontSize: '0.75rem', fontWeight: 'normal', color: 'var(--text-muted)' }}>(Click to expand)</span>
              </summary>
              <div style={{ marginTop: '0.75rem', borderTop: '1px solid var(--border-color)', paddingTop: '0.75rem' }}>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '0.75rem' }}>
                  When attacking a **Bleeding Clan** (a clan whose reputation is stagnant or dropping while nearby competitor ranks are actively farming), the reputation points gained per victory scale dynamically based on the percentage difference between the target's reputation and your clan's reputation (<strong>{current.name}</strong>: {current.reputation.toLocaleString()} rep):
                </p>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.75rem', fontSize: '0.8rem' }}>
                  <div style={{ borderLeft: '3px solid var(--color-fire)', paddingLeft: '0.5rem' }}>
                    <span style={{ color: 'var(--text-secondary)' }}>Opponent Rep &gt; 25% of Yours</span>
                    <div style={{ fontSize: '1rem', fontWeight: 'bold', color: 'var(--color-fire)' }}>+15 Reputation</div>
                  </div>
                  <div style={{ borderLeft: '3px solid var(--color-earth)', paddingLeft: '0.5rem' }}>
                    <span style={{ color: 'var(--text-secondary)' }}>Opponent Rep &gt; 10% to 25%</span>
                    <div style={{ fontSize: '1rem', fontWeight: 'bold', color: 'var(--color-earth)' }}>+10 Reputation</div>
                  </div>
                  <div style={{ borderLeft: '3px solid var(--color-water)', paddingLeft: '0.5rem' }}>
                    <span style={{ color: 'var(--text-secondary)' }}>Opponent Rep =&lt; 10% higher</span>
                    <div style={{ fontSize: '1rem', fontWeight: 'bold', color: 'var(--color-water)' }}>+6 Reputation</div>
                  </div>
                  <div style={{ borderLeft: '3px solid var(--color-lightning)', paddingLeft: '0.5rem' }}>
                    <span style={{ color: 'var(--text-secondary)' }}>Opponent Rep lower, but =&lt; 10% difference</span>
                    <div style={{ fontSize: '1rem', fontWeight: 'bold', color: 'var(--color-lightning)' }}>+3 Reputation</div>
                  </div>
                  <div style={{ borderLeft: '3px solid var(--text-muted)', paddingLeft: '0.5rem' }}>
                    <span style={{ color: 'var(--text-secondary)' }}>Else (Opponent &gt; 10% lower)</span>
                    <div style={{ fontSize: '1rem', fontWeight: 'bold', color: 'var(--text-muted)' }}>+1 Reputation</div>
                  </div>
                </div>
              </div>
            </details>

            {/* Filter controls */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', flexGrow: '1', maxWidth: '800px' }}>
                <div style={{ position: 'relative', flexGrow: '1' }}>
                  <input
                    type="text"
                    className="input-field"
                    style={{ paddingLeft: '2.25rem' }}
                    placeholder="Search clan name, master, or ID..."
                    value={lbSearch}
                    onChange={e => setLbSearch(e.target.value)}
                  />
                  <div style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }}>
                    <IconSearch />
                  </div>
                </div>
                
                <select 
                  className="input-field" 
                  style={{ width: 'auto' }}
                  value={lbBleedFilter}
                  onChange={e => setLbBleedFilter(e.target.value)}
                >
                  <option value="all">All States</option>
                  <option value="bleeding">Possible Bleed Only 🔴</option>
                  <option value="active">Active Only 🟢</option>
                </select>

                <select 
                  className="input-field" 
                  style={{ width: 'auto' }}
                  value={lbYieldFilter}
                  onChange={e => setLbYieldFilter(e.target.value)}
                >
                  <option value="all">All Yields</option>
                  <option value="15">+15 Rep Yield</option>
                  <option value="10">+10 Rep Yield</option>
                  <option value="6">+6 Rep Yield</option>
                  <option value="3">+3 Rep Yield</option>
                  <option value="1">+1 Rep Yield</option>
                </select>
              </div>
              <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                Found <strong>{filteredLeaderboard.length}</strong> clans
              </div>
            </div>

            {/* Leaderboard list */}
            <div className="table-wrapper">
              <table className="custom-table">
                <thead>
                  <tr>
                    <th>Rank</th>
                    <th>Clan Name</th>
                    <th className="hide-mobile">Master</th>
                    <th>Total Reputation</th>
                    <th>Gain (Snapshot)</th>
                    <th className="hide-mobile">Inactive roster</th>
                    <th>State</th>
                    <th className="hide-mobile">Bleed Score</th>
                    <th style={{ textAlign: 'right' }}>Bleed Yield</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredLeaderboard.map((c) => {
                    const isMyClan = c.id === current.id;
                    return (
                      <tr key={c.id} style={{ borderLeft: isMyClan ? '3px solid var(--color-water)' : 'none' }}>
                        <td>
                          <span className="text-number" style={{ fontWeight: 'bold', color: c.rank <= 10 ? 'var(--color-earth)' : 'var(--text-primary)' }}>
                            #{c.rank}
                          </span>
                        </td>
                        <td>
                          <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <strong 
                              style={{ color: 'var(--text-primary)', cursor: 'pointer', textDecoration: 'underline' }}
                              onClick={() => {
                                setInspectingClan(c);
                              }}
                              title="Click to inspect this clan in detail"
                            >
                              {c.name} {isMyClan && <span style={{ textDecoration: 'none' }} className="badge badge-water">YOUR CLAN</span>}
                            </strong>
                            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>ID: {c.id} | Size: {c.members}/40</span>
                          </div>
                        </td>
                        <td className="hide-mobile">{c.master}</td>
                        <td className="text-number">{c.reputation.toLocaleString()}</td>
                        <td className="text-number">
                          {c.gain > 0 ? (
                            <span style={{ color: 'var(--color-wind)', fontWeight: 'bold' }}>+{c.gain.toLocaleString()}</span>
                          ) : (
                            <span style={{ color: 'var(--text-muted)' }}>0</span>
                          )}
                        </td>
                        <td className="hide-mobile">
                          <span style={{ color: c.inactivePercent > 25 ? 'var(--color-fire)' : 'var(--text-primary)' }}>
                            {c.inactiveCount} ({Math.round(c.inactivePercent)}%)
                          </span>
                        </td>
                        <td>
                          {c.isBleeding ? (
                            <span style={{ color: 'var(--color-fire)', fontWeight: '600', display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
                              <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--color-fire)', display: 'inline-block' }} className="bleeding-pulse"></span>
                              <span>Possible Bleed</span>
                              <span className="bleed-info-tooltip">
                                <IconInfo style={{ color: 'var(--text-muted)', cursor: 'help' }} />
                                <div className="tooltip-card">
                                  <div style={{ fontWeight: 'bold', marginBottom: '0.4rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.2rem', color: 'var(--color-fire)', fontFamily: 'var(--font-gaming)' }}>
                                    🔴 Bleed Analysis
                                  </div>
                                  <div style={{ marginBottom: '0.3rem' }}>
                                    <strong>Score:</strong> {c.bleedScore}/100
                                  </div>
                                  <div style={{ marginBottom: '0.3rem' }}>
                                    <strong>Reason:</strong> {c.bleedReason}
                                  </div>
                                  {c.bleedAttackers && c.bleedAttackers.length > 0 && (
                                    <div>
                                      <strong>Likely Attackers:</strong>
                                      <div style={{ color: 'var(--text-secondary)', marginTop: '0.15rem' }}>
                                        {c.bleedAttackers.map(a => `${a.name} (#${a.rank})`).join(', ')}
                                      </div>
                                    </div>
                                  )}
                                </div>
                              </span>
                            </span>
                          ) : (
                            <span style={{ color: 'var(--color-wind)', fontWeight: '600', display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>
                              <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--color-wind)', display: 'inline-block' }}></span>
                              Active
                            </span>
                          )}
                        </td>
                        <td className="hide-mobile">
                          {c.isBleeding ? (
                            <div>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <span className="text-number" style={{ 
                                  fontWeight: 'bold', 
                                  fontSize: '0.9rem',
                                  color: c.bleedScore >= 70 ? 'var(--color-fire)' : c.bleedScore >= 40 ? 'var(--color-earth)' : 'var(--text-secondary)'
                                }}>
                                  {c.bleedScore}
                                </span>
                                <div className="progress-bar-bg" style={{ flexGrow: 1, height: '6px' }}>
                                  <div className="progress-bar-fill" style={{ 
                                    width: `${c.bleedScore}%`, 
                                    background: c.bleedScore >= 70 ? 'var(--color-fire)' : c.bleedScore >= 40 ? 'var(--color-earth)' : 'var(--text-muted)'
                                  }}></div>
                                </div>
                              </div>
                            </div>
                          ) : (
                            <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>—</span>
                          )}
                        </td>
                        <td style={{ textAlign: 'right' }}>
                          {c.isBleeding ? (
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.2rem' }}>
                              <span 
                                className={`badge ${
                                  c.bleedYield === 15 ? 'badge-fire text-glow-fire' : 
                                  c.bleedYield === 10 ? 'badge-earth text-glow-earth' : 
                                  c.bleedYield === 6 ? 'badge-water text-glow-water' : 
                                  c.bleedYield === 3 ? 'badge-lightning text-glow-lightning' : 'badge-secondary'
                                }`} 
                                style={{ fontWeight: 'bold', fontSize: '0.85rem' }}
                              >
                                +{c.bleedYield} rep
                              </span>
                              {c.repNeededToChange !== null && c.repNeededToChange > 0 && (
                                <span style={{ fontSize: '0.65rem', color: 'var(--color-lightning)', whiteSpace: 'nowrap' }} title={`Next yield tier (+${c.nextLowerYield}) is reached when target loses ${c.repNeededToChange.toLocaleString()} reputation.`}>
                                  -{c.repNeededToChange.toLocaleString()} rep {c.timeToChange !== null && `(~${c.timeToChange.toFixed(1)}h)`}
                                </span>
                              )}
                            </div>
                          ) : (
                            <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>None (0 rep)</span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                  {filteredLeaderboard.length === 0 && (
                    <tr>
                      <td colSpan="9" style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>
                        No clans matched your leaderboard filters.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {/* TAB 3: ROSTER ANALYSIS */}
        {activeTab === 'roster' && (
          <section className="glass-card animate-fade-in">
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', flexGrow: '1', maxWidth: '600px' }}>
                <div style={{ position: 'relative', flexGrow: '1' }}>
                  <input
                    type="text"
                    className="input-field"
                    style={{ paddingLeft: '2.25rem' }}
                    placeholder="Search by member name or ID..."
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                  />
                  <div style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }}>
                    <IconSearch />
                  </div>
                </div>
                <select 
                  className="input-field" 
                  style={{ width: 'auto' }}
                  value={statusFilter}
                  onChange={e => setStatusFilter(e.target.value)}
                >
                  <option value="all">All Members</option>
                  <option value="active">Active (Gaining Rep)</option>
                  <option value="inactive">Inactive (&lt;200 Rep)</option>
                  <option value="bleeding">Zero Rep (0 Contribution)</option>
                  <option value="joined">Joined Recently</option>
                </select>
              </div>

              <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                Showing <strong>{filteredMembers.length}</strong> of <strong>{current.members}</strong> members
              </div>
            </div>

            {rosterAlerts.length > 0 && (
              <div style={{ marginBottom: '1.5rem' }}>
                {rosterAlerts.map((alert, index) => (
                  <div key={index} className={`alert-box alert-box-${alert.type}`} style={{ marginBottom: '0.5rem' }}>
                    <IconAlertTriangle className={alert.type === 'error' ? 'text-glow-fire' : 'text-glow-earth'} style={{ flexShrink: 0 }} />
                    <div>{alert.message}</div>
                  </div>
                ))}
              </div>
            )}

            <div className="table-wrapper">
              <table className="custom-table">
                <thead>
                  <tr>
                    <th style={{ cursor: 'pointer' }} onClick={() => { setSortBy('name'); setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc'); }}>
                      Name {sortBy === 'name' ? (sortOrder === 'asc' ? '▲' : '▼') : ''}
                    </th>
                    <th className="hide-mobile" style={{ cursor: 'pointer' }} onClick={() => { setSortBy('level'); setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc'); }}>
                      Level {sortBy === 'level' ? (sortOrder === 'asc' ? '▲' : '▼') : ''}
                    </th>
                    <th style={{ cursor: 'pointer' }} onClick={() => { setSortBy('reputation'); setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc'); }}>
                      Total Reputation {sortBy === 'reputation' ? (sortOrder === 'asc' ? '▲' : '▼') : ''}
                    </th>
                    <th style={{ cursor: 'pointer' }} onClick={() => { setSortBy('reputationGain'); setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc'); }}>
                      Gain (Reset) {sortBy === 'reputationGain' ? (sortOrder === 'asc' ? '▲' : '▼') : ''}
                    </th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredMembers.map((m, idx) => (
                    <tr key={m.id}>
                      <td>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem', width: '20px' }}>{idx + 1}</span>
                          <strong style={{ color: m.status === 'bleeding' ? 'var(--text-muted)' : 'var(--text-primary)' }}>{m.name}</strong>
                          {m.name === current.master && <span className="badge badge-earth">Master</span>}
                        </div>
                      </td>
                      <td className="hide-mobile">Lvl {m.level}</td>
                      <td className="text-number">{m.reputation.toLocaleString()}</td>
                      <td className="text-number">
                        {m.reputationGain > 0 ? (
                          <span style={{ color: 'var(--color-wind)', fontWeight: 'bold' }}>+{m.reputationGain.toLocaleString()}</span>
                        ) : m.status === 'joined' ? (
                          <span style={{ color: 'var(--color-water)', fontSize: '0.8rem' }}>JOINED</span>
                        ) : (
                          <span style={{ color: 'var(--text-muted)' }}>0</span>
                        )}
                      </td>
                      <td>
                        {m.status === 'active' && <span className="badge badge-wind">Active</span>}
                        {m.status === 'joined' && <span className="badge badge-water">New Joint</span>}
                        {m.status === 'zero-rep' && <span className="badge badge-fire">Zero Contribution</span>}
                        {m.status === 'inactive' && <span className="badge badge-earth">Underperforming</span>}
                        {m.status === 'stale' && <span className="badge badge-secondary">Stale</span>}
                      </td>
                    </tr>
                  ))}
                  {filteredMembers.length === 0 && (
                    <tr>
                      <td colSpan="5" style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>
                        No members matched the search or filter query.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {/* TAB 4: COMPETITIVE STANDINGS */}
        {activeTab === 'competitive' && (
          <section className="glass-card animate-fade-in">
            <h3 style={{ marginBottom: '1rem' }}>CLAN VELOCITY & FORWARD PROJECTIONS</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginBottom: '1.5rem' }}>
              Comparing your reputation velocity against surrounding ranks in the Top 100 Leaderboard. Values calculated based on the latest 6-hour snapshot interval.
            </p>

            {competitiveData ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                {competitiveData.clanAhead && (
                  <div className="glass-card" style={{ background: 'rgba(255, 255, 255, 0.01)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1rem' }}>
                      <div>
                        <span className="badge badge-secondary" style={{ marginBottom: '0.25rem' }}>RANK #{competitiveData.clanAhead.rank}</span>
                        <h4 style={{ fontSize: '1.2rem', color: 'var(--text-primary)' }}>{competitiveData.clanAhead.name}</h4>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>TOTAL REPUTATION</div>
                        <div className="text-number" style={{ fontSize: '1.1rem' }}>{competitiveData.clanAhead.reputation.toLocaleString()}</div>
                      </div>
                    </div>
                    
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                      <div style={{ flexGrow: '1' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', marginBottom: '0.25rem' }}>
                          <span>Farming rate: +{competitiveData.aheadGain.toLocaleString()} rep / snapshot</span>
                          <span>Gap: <strong>{competitiveData.aheadGap.toLocaleString()} rep</strong></span>
                        </div>
                        <div className="progress-bar-bg">
                          <div className="progress-bar-fill" style={{ width: `${Math.min(100, (current.reputation / competitiveData.clanAhead.reputation) * 100)}%`, background: 'var(--color-fire)' }}></div>
                        </div>
                      </div>
                    </div>
                    
                    <div style={{ marginTop: '1rem', padding: '0.75rem', background: 'var(--bg-tertiary)', borderRadius: '6px', fontSize: '0.85rem' }}>
                      Forecast: <strong className={competitiveData.overtakeClass}>{competitiveData.overtakeText}</strong>
                    </div>
                  </div>
                )}

                <div className="glass-card" style={{ border: '2px solid var(--color-water)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1rem' }}>
                    <div>
                      <span className="badge badge-water" style={{ marginBottom: '0.25rem' }}>YOUR CLAN - RANK #{current.rank}</span>
                      <h4 style={{ fontSize: '1.4rem', color: 'var(--color-water)' }}>{current.name}</h4>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>TOTAL REPUTATION</div>
                      <div className="text-number text-glow-water" style={{ fontSize: '1.3rem' }}>{current.reputation.toLocaleString()}</div>
                    </div>
                  </div>
                  <div style={{ fontSize: '0.9rem' }}>
                    Farming Velocity: <strong style={{ color: 'var(--color-wind)' }}>+{totalGain.toLocaleString()} rep</strong> per snapshot
                  </div>
                </div>

                {competitiveData.clanBehind && (
                  <div className="glass-card" style={{ background: 'rgba(255, 255, 255, 0.01)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1rem' }}>
                      <div>
                        <span className="badge badge-secondary" style={{ marginBottom: '0.25rem' }}>RANK #{competitiveData.clanBehind.rank}</span>
                        <h4 style={{ fontSize: '1.2rem', color: 'var(--text-primary)' }}>{competitiveData.clanBehind.name}</h4>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>TOTAL REPUTATION</div>
                        <div className="text-number" style={{ fontSize: '1.1rem' }}>{competitiveData.clanBehind.reputation.toLocaleString()}</div>
                      </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                      <div style={{ flexGrow: '1' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', marginBottom: '0.25rem' }}>
                          <span>Farming rate: +{competitiveData.behindGain.toLocaleString()} rep / snapshot</span>
                          <span>Lead: <strong>{competitiveData.behindGap.toLocaleString()} rep</strong></span>
                        </div>
                        <div className="progress-bar-bg">
                          <div className="progress-bar-fill" style={{ width: `${Math.min(100, (competitiveData.clanBehind.reputation / current.reputation) * 100)}%`, background: 'var(--color-water)' }}></div>
                        </div>
                      </div>
                    </div>

                    <div style={{ marginTop: '1rem', padding: '0.75rem', background: 'var(--bg-tertiary)', borderRadius: '6px', fontSize: '0.85rem' }}>
                      Threat Analysis: <strong className={competitiveData.overtakenClass}>{competitiveData.overtakenText}</strong>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div style={{ color: 'var(--text-muted)', textAlign: 'center', padding: '3rem' }}>
                Please generate at least two snapshots to calculate competitive velocity projections.
              </div>
            )}
          </section>
        )}

        {/* TAB 5: ACTIVITY LOGS */}
        {activeTab === 'activity' && (
          <section className="glass-card animate-fade-in">
            <h3 style={{ marginBottom: '1.5rem' }}>CLAN EVENT TIMELINE</h3>
            
            <div className="timeline">
              {snapshots.slice(1).reverse().map((snapshot, sIdx) => {
                const prevSnapshot = snapshots[snapshots.length - sIdx - 2];
                if (!prevSnapshot) return null;

                const currClan = snapshot.clans.find(c => c.id === current.id);
                const prevClan = prevSnapshot.clans.find(c => c.id === current.id);

                if (!currClan || !prevClan) return null;

                const repDiff = currClan.reputation - prevClan.reputation;
                const rankDiff = prevClan.rank - currClan.rank;

                const joined = [];
                const left = [];
                const bigContributors = [];

                const currMemberList = currClan.member_list || [];
                const prevMemberList = prevClan.member_list || [];

                currMemberList.forEach(cm => {
                  const pm = prevMemberList.find(m => m.id === cm.id);
                  if (!pm) {
                    joined.push(cm);
                  } else if (cm.reputation - pm.reputation >= 1000) {
                    bigContributors.push({ member: cm, gain: cm.reputation - pm.reputation });
                  }
                });

                prevMemberList.forEach(pm => {
                  const cm = currMemberList.some(m => m.id === pm.id);
                  if (!cm) {
                    left.push(pm);
                  }
                });

                return (
                  <div key={snapshot.generated_at} className="timeline-item">
                    <div className="timeline-dot">
                      <IconActivity className="text-glow-water" style={{ width: '16px', height: '16px' }} />
                    </div>
                    <div className="timeline-content">
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.25rem', marginBottom: '0.5rem' }}>
                        <strong style={{ color: 'var(--color-water)' }}>Snapshot Update</strong>
                        <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{snapshot.generated_at}</span>
                      </div>
                      
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', fontSize: '0.9rem' }}>
                        <div>
                          • Reputation changed by <strong className={repDiff >= 0 ? 'text-glow-wind' : 'text-glow-fire'}>{repDiff >= 0 ? `+${repDiff.toLocaleString()}` : repDiff.toLocaleString()}</strong>.
                        </div>
                        {rankDiff !== 0 && (
                          <div>
                            • Clan Rank shifted from #{prevClan.rank} to <strong style={{ color: rankDiff > 0 ? 'var(--color-wind)' : 'var(--color-fire)' }}>#{currClan.rank}</strong>!
                          </div>
                        )}
                        {joined.map(m => (
                          <div key={m.id} style={{ color: 'var(--color-water)' }}>
                            • Member joined: <strong>{m.name}</strong> (Lvl {m.level})
                          </div>
                        ))}
                        {left.map(m => (
                          <div key={m.id} style={{ color: 'var(--color-fire)' }}>
                            • Member left/kicked: <strong>{m.name}</strong> (Total rep: {m.reputation.toLocaleString()})
                          </div>
                        ))}
                        {bigContributors.map(bc => (
                          <div key={bc.member.id} style={{ color: 'var(--text-secondary)' }}>
                            • <strong>{bc.member.name}</strong> contributed <span style={{ color: 'var(--color-wind)', fontWeight: 'bold' }}>+{bc.gain.toLocaleString()} rep</span>!
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}

              <div className="timeline-item">
                <div className="timeline-dot">
                  <IconShield className="text-glow-earth" style={{ width: '16px', height: '16px' }} />
                </div>
                <div className="timeline-content">
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                    <strong style={{ color: 'var(--color-earth)' }}>Baseline Established</strong>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{snapshots[0]?.generated_at}</span>
                  </div>
                  <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                    Tracker initialized. Baseline snapshot loaded with total clan reputation of <strong>{snapshots[0]?.clans.find(c => c.id === current.id)?.reputation.toLocaleString()}</strong> and {snapshots[0]?.clans.find(c => c.id === current.id)?.members} members.
                  </p>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* TAB 6: CONFIG & SIMULATOR Removed */}
      </main>

      {/* Footer */}
      <footer style={{ marginTop: '3rem', padding: '1.5rem 0', borderTop: '1px solid var(--border-color)', textAlign: 'center', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
        <p>Ninja Saga Clan War Tracker © 2026. Custom Analytical Dashboard.</p>
        <p style={{ marginTop: '0.25rem' }}>Current system time: {new Date().toLocaleTimeString()} | Sandbox session: {dataSource}</p>
      </footer>
    </div>

      {/* Clan Inspection Modal */}
      {inspectingClan && (
        <div className="modal-backdrop" onClick={() => setInspectingClan(null)}>
          <div className="modal-container" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="text-glow-water" style={{ margin: 0, fontSize: '1.25rem' }}>
                RANK #{inspectingClan.rank}: {inspectingClan.name}
              </h3>
              <button 
                className="btn-secondary" 
                style={{ padding: '0.25rem 0.5rem', minWidth: '32px' }}
                onClick={() => setInspectingClan(null)}
              >
                ✕
              </button>
            </div>
            <div className="modal-body" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {/* Quick stats grid */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem' }}>
                <div className="glass-card" style={{ padding: '0.75rem 1rem', background: 'var(--bg-tertiary)' }}>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>CLAN MASTER</div>
                  <strong style={{ fontSize: '1rem', color: 'var(--color-earth)' }}>{inspectingClan.master}</strong>
                </div>
                <div className="glass-card" style={{ padding: '0.75rem 1rem', background: 'var(--bg-tertiary)' }}>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>TOTAL REPUTATION</div>
                  <strong className="text-number" style={{ fontSize: '1rem', color: 'var(--text-primary)' }}>
                    {inspectingClan.reputation.toLocaleString()}
                  </strong>
                </div>
                <div className="glass-card" style={{ padding: '0.75rem 1rem', background: 'var(--bg-tertiary)' }}>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>ROSTER SIZE</div>
                  <strong style={{ fontSize: '1rem', color: 'var(--color-water)' }}>
                    {inspectingClan.members || inspectingClan.member_list?.length || 0} / 40
                  </strong>
                </div>
                <div className="glass-card" style={{ padding: '0.75rem 1rem', background: 'var(--bg-tertiary)' }}>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>INACTIVE MEMBERS</div>
                  <strong style={{ fontSize: '1rem', color: inspectingClan.inactivePercent > 25 ? 'var(--color-fire)' : 'var(--text-primary)' }}>
                    {inspectingClan.inactiveCount || 0} ({Math.round(inspectingClan.inactivePercent || 0)}%)
                  </strong>
                </div>
              </div>

              <div>
                <h4 style={{ marginBottom: '0.75rem', fontSize: '1rem', color: 'var(--text-primary)' }}>MEMBER ROSTER CONTRIBUTION</h4>
                <div className="table-wrapper" style={{ maxHeight: '300px', overflowY: 'auto' }}>
                  <table className="custom-table">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Level</th>
                        <th style={{ textAlign: 'right' }}>Gain (Reset)</th>
                        <th style={{ textAlign: 'right' }}>Total Contribution</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {((inspectingClan.member_list || []).slice().sort((a, b) => b.reputation - a.reputation)).map((m, idx) => {
                        const baselineClan = snapshots[0]?.clans?.find(c => c.id === inspectingClan.id);
                        const baselineMember = baselineClan?.member_list?.find(bm => bm.id === m.id);
                        const memberResetGain = baselineMember ? (m.reputation - baselineMember.reputation) : 0;
                        
                        const isZeroRep = m.reputation === 0;
                        const isUnderperforming = m.level >= 80 && m.reputation < 200;
                        
                        let statusBadge = <span className="badge badge-secondary">Stale</span>;
                        if (memberResetGain > 0) {
                          statusBadge = <span className="badge badge-wind">Active</span>;
                        } else if (!baselineMember) {
                          statusBadge = <span className="badge badge-water">Joined</span>;
                        } else if (isZeroRep) {
                          statusBadge = <span className="badge badge-fire">Zero Contribution</span>;
                        } else if (isUnderperforming) {
                          statusBadge = <span className="badge badge-earth">Underperforming</span>;
                        }
                        return (
                          <tr key={m.id}>
                            <td>{idx + 1}</td>
                            <td><strong>{m.name}</strong> <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>ID: {m.id}</span></td>
                            <td>Lvl {m.level}</td>
                            <td className="text-number text-glow-wind" style={{ textAlign: 'right', fontWeight: 'bold' }}>
                              {memberResetGain > 0 ? `+${memberResetGain.toLocaleString()}` : '0'}
                            </td>
                            <td className="text-number" style={{ textAlign: 'right' }}>{m.reputation.toLocaleString()}</td>
                            <td>{statusBadge}</td>
                          </tr>
                        );
                      })}
                      {(!inspectingClan.member_list || inspectingClan.member_list.length === 0) && (
                        <tr>
                          <td colSpan="5" style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-muted)' }}>
                            No member list data available.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button 
                className="btn-primary" 
                onClick={() => setInspectingClan(null)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default App;
