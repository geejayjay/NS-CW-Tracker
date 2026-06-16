# Ninja Saga Clan War (NS-CW) Reference Guide

This document captures the factual mechanics, rules, and analytical indicators of the Ninja Saga Clan War system, specifically focusing on the **Bleed Attack Yield** system and how **Bleeding Clans** are identified.

---

## 1. Core Clan Reputation Facts

* **Clan Reputation vs. Member Sum**:
  * The actual reputation of a clan (`clan.reputation` in the ranking JSON) is **not** the sum of its members' individual reputations (`member_list[].reputation`).
  * Member reputations can lag, reflect outdated stats, or differ due to join/leave events.
  * **Rule**: Always use the official `clan.reputation` field for all rankings, gaps, and yield calculations. Do not calculate clan reputation by summing member rosters.
* **Deductions**:
  * Clans can suffer reputation deductions (penalties) for rules violations. These deductions directly subtract from the clan's total reputation.

---

## 2. The Bleed Attack Yield System

When you attack an opponent clan in Clan War, the reputation points gained per victory depend on whether that opponent is in a **Bleeding** state and how their total reputation compares to yours.

If the target clan is **Bleeding**, your gain per victory scales dynamically based on the percentage difference between their reputation and yours:

| Opponent Rep compared to Your Clan | Reputation Gained per Win | Color Indicator |
| :--- | :---: | :---: |
| **> 25% higher** than yours | **+15 rep** | 🔴 Red (Fire) |
| **> 10% to 25% higher** than yours | **+10 rep** | 🟡 Gold (Earth) |
| **0% to 10% higher** (or equal) | **+6 rep** | 🔵 Cyan (Water) |
| **Within 10% lower** than yours | **+3 rep** | 🟣 Purple (Lightning) |
| **> 10% lower** than yours | **+1 rep** (Standard) | ⚪ Grey (Secondary) |

> [!NOTE]
> If a clan is **not** in a bleeding state, attacks on them will yield **0 reputation** per victory, regardless of the reputation difference.

These brackets are defined in the `YIELD_BRACKETS` constant in `src/constants.js` alongside all analysis tuning parameters (`ANALYSIS_CONFIG`). Both can be extended or adjusted without touching the main `App.jsx` logic.

---

## 3. How Bleeding Clans are Identified

Bleed targets are identified using a **yield-bracket inference** algorithm that reverse-engineers which clan an attacker is farming based on real game mechanics.

### Step 1: Detect Actively Gaining Clans

A clan is classified as **actively gaining** using recency-weighted analysis across all snapshots since the last reset boundary:

* Each snapshot pair is assigned an exponentially decaying weight (`0.65^distance`), so recent ticks matter more than older ones.
* A **normalized activity score** (0 to 1) summarizes the clan's overall gain pattern across the entire reset.
* **Hysteresis** prevents flicker: once a clan enters "gaining" status, it stays locked in until strong contradicting evidence across the whole reset period (not just one idle tick).

| Transition | Condition |
| :--- | :--- |
| **Enter** gaining | `tickGain > 0` OR (`gain > 0` AND `normalizedActivity > 0.15`) |
| **Exit** gaining | `normalizedActivity ≤ -0.15` AND `gain ≤ 0` (sustained negative evidence) |

### Step 2: Infer the Yield Bracket from Attacker's Gain

When a gaining clan is detected, the tracker analyzes **per-member reputation gains** to estimate which yield bracket (+1, +3, +6, +10, +15) the attacker is earning per battle win.

1. Compare each member's rep to the previous snapshot to count active members and their individual gains.
2. Compute the average per-member gain.
3. For each yield bracket, calculate the implied battles per tick (`avgMemberGain / yield`).
4. Select the bracket that gives the most reasonable battle count (targeting ~5 wins per member per tick).
5. If member data isn't available, fall back to estimating from total clan gain with ~40% active members.

* **Yield Bracket Caching**: To prevent flickering when an attacker clan temporarily has a snapshot with 0 gain (making it impossible to calculate members' tick gains), the tracker **caches and reuses** the last successfully inferred yield bracket for each attacker in the current reset period.

### Step 3: Compute the Target Rep Range

The inferred yield bracket maps to a percentage range of the **target clan's rep relative to the attacker's rep**:

| Yield | Target clan rep is... | Rep Range |
| :--- | :--- | :--- |
| +15 | > 25% higher | `attackerRep × 1.25` → ∞ |
| +10 | 10–25% higher | `attackerRep × 1.10` → `× 1.25` |
| +6 | 0–10% higher | `attackerRep × 1.00` → `× 1.10` |
| +3 | 0–10% lower | `attackerRep × 0.90` → `× 1.00` |
| +1 | > 10% lower | 0 → `attackerRep × 0.90` |

### Step 4: Match Clans in the Inferred Range

Instead of using ±10 rank proximity, the tracker finds **clans whose actual reputation falls within the computed range**. This includes:
* **Non-gaining clans** (stagnant or losing rep) — traditional bleed candidates
* **Gaining clans** that fall in range — evaluated by Step 4.5 for slow-gainer detection

### Step 4.5: Slow-Gainer Bleed Detection (Gaining-But-Bleeding)

A clan can be **both gaining rep AND being bled** if its own members are farming while attackers bleed it. The tracker detects this by comparing **gain-per-active-member** rates:

1. Compute `gainPerActiveMember` for each actively gaining clan (using per-member rep deltas, or estimated from total clan gain with ~40% active ratio as fallback).
2. Compute the **median gain rate** across all gaining clans.
3. For each attacker, find other gaining clans in its inferred target range.
4. Flag a gaining clan as a **slow gainer** if its gain rate is ≤ `SLOW_GAINER_THRESHOLD` × median rate (default: 50%).

| Gain Rate vs Median | Detection |
| :--- | :--- |
| ≤ 25% of median | 🐌 **Very slow gainer** (+20 pts) |
| ≤ 50% of median | 🐌 **Slow gainer** (+12 pts) |
| > 50% of median | Not flagged |

> [!NOTE]
> **Examples:**
> * Top 2-5 all gain at +6 rate, top 1 only gains at +3 rate → top 1 is flagged as slow gainer (it's the only one in range gaining much slower)
> * Top 3 gains +6, top 1 and 2 gain +3 → both flagged; the one with the lower per-member rate scores higher
> * All clans gaining at similar rates → no false positives (no one is ≤ 50% of median)

Slow-gainer bleed scores are **capped at 60** (medium confidence) since the signal is inherently weaker than a fully stagnant clan. The threshold and cap are configurable via `ANALYSIS_CONFIG.SLOW_GAINER_THRESHOLD` and `ANALYSIS_CONFIG.SLOW_GAINER_MAX_SCORE` in `src/constants.js`.

### Step 5: Score and Rank Bleed Candidates

Clans qualify for scoring if they are **either**:
* In an attacker's inferred range **AND weighted-stagnant** across the reset, OR
* Flagged as a **slow-gainer candidate** by Step 4.5

The stagnancy check uses hysteresis:

| Transition | Condition |
| :--- | :--- |
| **Enter** stagnant | `normalizedActivity ≤ -0.1` OR 2+ consecutive stagnant ticks |
| **Exit** stagnant | `normalizedActivity ≥ 0.2` AND `gain > 0` (sustained recovery) |

> [!IMPORTANT]
> **Roster Inactivity ≠ Bleeding**:
> A high percentage of inactive or zero-contribution members indicates poor clan management, but it **does not** automatically classify a clan as bleeding. Bleeding is purely defined by reputation stagnancy + being in an attacker's inferred yield range, or by slow-gainer detection.

---

## 4. Snapshot & Reset Boundaries

* **Reset Timing**:
  * Snapshot calculations reset at the top of the hour (`xx:00`) and the half-hour (`xx:30`).
  * At each boundary, the tracker clears cumulative gains, establishes a fresh baseline snapshot, and resets all hysteresis locks (gaining, bleeding, sound notifications).
* **Whole-Reset Analysis**:
  * All analysis (velocity, activity scoring, stagnancy) uses **the entire reset period's data** with recency weighting, not just the last 2 snapshots. This makes the output stable and resistant to single-tick noise.

---

## 5. Bleed Score Calculation

Every clan identified as potentially bleeding is assigned a **Bleed Score** (0–100). The score is computed across multiple factors and adjusted by cross-context suppression.

### Factor 1: Position in Attacker's Target Range (max 30 pts per attacker)

* For each attacker that has this clan in its inferred yield range, the clan is ranked by weighted velocity (lowest velocity = most likely victim).
* The #1 victim (lowest velocity) gets **30 points**; the last in the list gets **~5 points**.
* Being the **primary target** (⚡) of any attacker is flagged explicitly.

### Factor 2: Absolute Velocity Across Entire Reset (max 25 pts)

| Condition | Points |
| :--- | :---: |
| Weighted velocity ≤ **-50** rep/tick | **+25** |
| Weighted velocity ≤ **0** rep/tick | **+20** |
| Weighted velocity ≤ **30** rep/tick | **+12** |
| Weighted velocity ≤ **80** rep/tick | **+5** |

### Factor 3: Cumulative Gain Since Reset (max 15 pts)

| Condition | Points |
| :--- | :---: |
| Cumulative gain ≤ **0** | **+15** |
| Cumulative gain < **100** | **+8** |

### Factor 4: Weighted Stagnancy Depth (max 10 pts)

| Condition | Points |
| :--- | :---: |
| `normalizedActivity ≤ -0.3` (deeply stagnant) | **+10** |
| `normalizedActivity ≤ -0.1` (stagnant) | **+5** |

### Factor 5: Multiple Attackers Targeting Same Clan (max 8 pts)

| Condition | Points |
| :--- | :---: |
| Targeted by **3+** attackers | **+8** |
| Targeted by **2** attackers | **+4** |

### Factor 6: Slow-Gainer Detection (max 20 pts, score capped at 60)

Applied only to gaining clans flagged by Step 4.5 as slow-gainer bleed candidates:

| Condition | Points |
| :--- | :---: |
| Gain rate ≤ **25%** of median | **+20** |
| Gain rate ≤ **50%** of median | **+12** |

> [!NOTE]
> Slow-gainer candidates have their **total score capped at 60** (`SLOW_GAINER_MAX_SCORE`) regardless of other factors. This reflects the inherently weaker signal compared to fully stagnant clans.

### Cross-Context Suppression

If an attacker has a **clear primary victim** (its velocity is significantly lower than the next candidate), other clans in the same target range have their scores **suppressed proportionally**:

| Velocity gap from primary | Suppression |
| :--- | :---: |
| > 200 rep/tick | 80% reduction |
| > 100 rep/tick | 60% reduction |
| > 50 rep/tick | 40% reduction |
| ≤ 50 rep/tick | 15% reduction |

This prevents marking 8 clans as bleeding when only 1–2 are the actual victims.

### Bleed Hysteresis (Persistence & Cooldown)

Once a clan is identified as bleeding, it **stays locked** as bleeding to prevent status flickering during short-term attacker inactivity or burst polling:
* **Persistence Cooldown**: When a bleeding clan is no longer actively targeted, it remains locked as bleeding for a minimum of **30 seconds** (`BLEED_PERSISTENCE_DURATION`) and **5 snapshots/ticks** (`BLEED_PERSISTENCE_TICKS`).
* **Attacker & Score Retention**: While locked in the cooldown period, the target **retains its last active attackers, its bleed score, and its bleed reason** rather than showing empty attackers or immediately fading.
* **Immediate Recovery (Override)**: A target will unlock immediately, overriding the cooldown, if:
  * For stagnant clans: they show positive tick gain and normalized activity recovers (`normalizedActivity >= 0.2`).
  * For slow-gainer clans: their gain rate per active member rises back above the slow gainer threshold.
* All locks and history cache clear at the 30-minute boundary.

### Score Interpretation

| Score Range | Confidence | Color |
| :--- | :--- | :--- |
| **70–100** | High — very likely bleeding | 🔴 Red (Fire) |
| **40–69** | Medium — probable bleed target | 🟡 Gold (Earth) |
| **0–39** | Low — possible but uncertain | ⚪ Grey |

---

## 6. Adaptive Polling System

The tracker dynamically adjusts its polling interval across three tiers to balance data quality with API efficiency:

### Polling Tiers

| Tier | Interval | Duration | Trigger | Purpose |
| :--- | :---: | :---: | :--- | :--- |
| **Burst** | 1s | 5 ticks (~5s) | New bleeding clan detected | Rapid per-member rep capture for yield bracket inference |
| **Active** | 5s | Sustained | Gaining or established bleeds | Monitor changes without excessive API calls |
| **Standby** | 60s | Default | No significant activity | Conserve API requests |

> [!NOTE]
> The 1s burst is intentionally short (5 ticks). Its sole purpose is to capture per-member reputation deltas so the yield bracket inference can determine which rep range the attacker is targeting. Once that data is captured, the 5s active tier provides sufficient granularity for all other analysis.

### Background Tab Support (Web Worker)

All timers run via a **Web Worker** (`timerWorker.js`) instead of main-thread `setInterval`. Browsers aggressively throttle `setInterval` in background tabs (sometimes to 1 tick/minute), but Worker timers are exempt. This ensures:
* Countdowns (bleed reset, CW end) stay accurate when alt-tabbed
* Auto-polling fires on schedule even when the tab is not visible
* All downstream analysis (state updates, useMemo recomputation, notifications) executes normally since `Worker.onmessage` is not throttled

---

## 7. Sounds and Desktop Notifications

The tracker features synthesized Web Audio sound chimes and HTML5 push notifications for critical war events.

### Alert Trigger Events
1. **⚔️ Reputation Gain Alerts**: Triggers when your tracked/target clan actively gains reputation.
2. **🔴 Bleeding Target Alerts**: Triggers when a new bleeding opponent is identified in the rankings.

### Once-Per-Reset Rate Limiting

Each sound type (gain / bleed) fires **at most once per 30-minute reset cycle**:
* When gain is first detected → plays gain chime → no more gain sounds until the next reset boundary.
* When bleed is first detected → plays bleed warning → no more bleed sounds until the next reset boundary.
* Flags reset automatically when `handleTimeReset` fires at the boundary crossing.

This prevents sound spam during rapid polling while still alerting on the first occurrence.

### Customization & Persistent Settings
* **Master Controls**: Turn sound alerts (`🔊/🔇`) and desktop push notifications (`🔔/🔕`) globally ON or OFF via the Polling Control Panel or settings.
* **Specific Event Toggles**: Individually enable or disable alerts specifically for **Reputation Gains** (`⚔️`) or **Bleeding Targets** (`🔴`) to customize the tracker's noise level.
* **Persistence**: All sound and notification choices are automatically stored in the browser's `localStorage` and persist across page reloads.
