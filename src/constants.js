/**
 * Yield Brackets — maps per-win reputation gain to the target clan's
 * rep range relative to the attacker's clan rep.
 *
 * When attacking a bleeding clan, you earn rep based on how their total
 * rep compares to yours. By reverse-engineering the yield from an
 * attacker's gain, we can infer which rep range the target falls in.
 *
 * Fields:
 *   yield       — rep gained per battle win
 *   minPercent  — target clan rep is at least this % relative to attacker
 *   maxPercent  — target clan rep is at most this % relative to attacker
 *                 (positive = higher, negative = lower)
 *   label       — human-readable description
 *
 * To add a new tier (e.g. +20 for >50% higher), just add an entry here.
 * The rest of the codebase reads this array dynamically.
 */
export const YIELD_BRACKETS = [
  { yield: 15, minPercent: 25,        maxPercent: Infinity, label: '+15 (>25% higher)' },
  { yield: 10, minPercent: 10,        maxPercent: 25,       label: '+10 (10-25% higher)' },
  { yield: 6,  minPercent: 0,         maxPercent: 10,       label: '+6 (0-10% higher)' },
  { yield: 3,  minPercent: -10,       maxPercent: 0,        label: '+3 (0-10% lower)' },
  { yield: 1,  minPercent: -Infinity, maxPercent: -10,      label: '+1 (>10% lower)' },
];

/**
 * Analysis tuning constants — separated here so they can be easily adjusted.
 */
export const ANALYSIS_CONFIG = {
  // Recency weighting decay base for activity scoring.
  // Each older tick-pair gets weight = DECAY_BASE ^ distance.
  // 0.65 means the second-most-recent tick has 65% the weight of the latest.
  DECAY_BASE: 0.65,

  // ── Hysteresis thresholds for "actively gaining" status ──
  // Entry is easy (start showing as gaining quickly).
  // Exit is harder (stay locked until strong contradicting evidence).
  GAIN_ENTRY_THRESHOLD: 0.15,   // normalized activity to ENTER gaining
  GAIN_EXIT_THRESHOLD: -0.15,   // normalized activity to EXIT gaining

  // ── Hysteresis thresholds for "weighted stagnant" status ──
  // Entry: must show sustained stagnancy across reset.
  // Exit: must show meaningful gain across reset to break out.
  STAGNANT_ENTRY_THRESHOLD: -0.1,  // normalized activity to ENTER stagnant
  STAGNANT_EXIT_THRESHOLD: 0.2,    // normalized activity to EXIT stagnant

  // ── Yield bracket inference tuning ──
  // When inferring which bracket an attacker is farming, we estimate
  // battles-per-tick from (avgMemberGain / yield). These define the
  // reasonable range and the ideal target.
  TARGET_BATTLES_PER_TICK: 5,
  MIN_BATTLES_PER_TICK: 1,
  MAX_BATTLES_PER_TICK: 20,

  // Fallback active member ratio when per-member data isn't available.
  // Used as: estimatedActiveMembers = totalMembers * ratio
  FALLBACK_ACTIVE_MEMBER_RATIO: 0.4,

  // ── Slow-gainer bleed detection ──
  // A gaining clan is flagged as a "slow gainer" (possible bleed-while-gaining)
  // if its rep gain per active member is this fraction or less of the median
  // gain per active member among all gaining clans.
  // 0.5 = flagged if gaining at ≤50% of the median rate.
  SLOW_GAINER_THRESHOLD: 0.5,

  // Maximum bleed score for slow-gainer candidates (medium confidence cap).
  // Lower than the 100-point ceiling for stagnant bleed candidates because
  // the signal is inherently weaker when the clan IS still gaining.
  SLOW_GAINER_MAX_SCORE: 85,

  // ── Bleeding status persistence ──
  // A clan marked as bleeding remains locked as bleeding for at least this long
  // to prevent flickering during 1s/5s polling when attackers temporarily pause.
  BLEED_PERSISTENCE_DURATION: 30, // minimum seconds to persist bleeding status
  BLEED_PERSISTENCE_TICKS: 10,     // minimum snapshots/ticks to persist bleeding status

  // ── Long-term bleed target hysteresis config ──
  LONG_TERM_BLEED_TICKS: 5,         // ticks to qualify as a long-term target
  LONG_TERM_PERSISTENCE_DURATION: 60, // extended cooldown in seconds
  LONG_TERM_PERSISTENCE_TICKS: 20,    // extended cooldown in snapshots/ticks
  LONG_TERM_RECOVERY_ACTIVITY: 0.35,  // minimum normalized activity to unlock
  LONG_TERM_RECOVERY_GAIN: 150,       // minimum cumulative reset gain to unlock

  // ── Adaptive Polling Configuration (seconds) ──
  ACTIVE_POLLING_INTERVAL: 1,
  STANDBY_POLLING_INTERVAL: 60,

  // ── Bleeding target narrowing and thresholding ──
  MIN_BLEED_SCORE: 50,             // minimum score to qualify as bleeding
  VELOCITY_TIE_MARGIN: 10,         // velocity margin (rep/tick) to consider stagnant targets tied
  SLOW_GAINER_TIE_MARGIN: 0.1,     // percentage margin (10%) to consider slow gainers tied
};
