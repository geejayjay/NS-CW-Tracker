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


---

## 3. How Bleeding Clans are Identified

A clan is considered **Bleeding** if it is actively being farmed/attacked by other clans. We identify possible bleed targets by analyzing temporal snapshots using two main factors:

### A. Reputation Stagnancy or Loss
* The target clan's reputation gain over the latest snapshot tick is `0` or negative (`tickGain <= 0`), **OR** its cumulative gain since the last timeline boundary reset is `0` or negative (`gain <= 0`).
* A healthy, actively playing clan will continuously increase its reputation. Stagnancy indicates they are not winning matches or are losing points due to successful attacks by opponents.

### B. Proximity to Gaining Competitors (Farming Activity)
* There must be at least one actively farming clan within **$\pm$10 ranks** of the target clan.
* An "actively gaining" clan is one that has a positive reputation gain in the latest tick or has shown a consistent gain streak across consecutive snapshots.
* If a clan is stagnant *and* nearby ranks are gaining rep rapidly, it indicates that those nearby competitors are farming matches against this target, causing it to "bleed".

> [!IMPORTANT]
> **Roster Inactivity $\neq$ Bleeding**:
> A high percentage of inactive or zero-contribution members on a roster indicates poor clan management, but it **does not** automatically classify a clan as bleeding. A bleeding state is purely defined by reputation changes in snapshots relative to nearby active competitor ranks.

---

## 4. Snapshot & Reset Boundaries

* **Reset Timing**:
  * Snapshot calculations reset at the top of the hour (`xx:00`) and the half-hour (`xx:30`).
  * At each boundary, the tracker clears cumulative gains and establishes a fresh baseline snapshot to accurately observe the next interval's velocities.

---

## 5. Bleed Score Calculation

Every clan identified as potentially bleeding is assigned a **Bleed Score** (0–100) that ranks the likelihood and severity of the bleed state. The score is the sum of three weighted factors:

### Factor 1: Reputation Stagnancy (max 65 pts)

| Condition | Points | Rationale |
| :--- | :---: | :--- |
| Tick gain is exactly **0** | **+50** | A clan gaining 0 rep while neighbors gain is the strongest bleed signal ("if it gains 0 rep it is mostly the clan bleeds") |
| Tick gain is **negative** (rep drop) | **+45** | Rep is actively decreasing — also strong, but slightly less definitive than perfect 0 |
| Cumulative gain since reset is **≤ 0** | **+15** | No progress over the entire interval reinforces the bleed signal |

### Factor 2: Nearby Active Attackers (max 25 pts)

* For each actively farming clan within ±10 ranks: **+8 points** (capped at 25)
* More nearby attackers = higher confidence that this clan is the farm target

### Factor 3: Attacker Intensity (max 10 pts)

| Condition | Points |
| :--- | :---: |
| Highest nearby attacker gain **> 1,500 rep** | **+10** |
| Highest nearby attacker gain **> 500 rep** | **+5** |

### Score Interpretation

| Score Range | Confidence | Color |
| :--- | :--- | :--- |
| **70–100** | High — very likely bleeding | 🔴 Red (Fire) |
| **40–69** | Medium — probable bleed target | 🟡 Gold (Earth) |
| **0–39** | Low — possible but uncertain | ⚪ Grey |

---

## 6. Adaptive Polling System

The tracker dynamically adjusts its polling interval based on detected activity to balance responsiveness with efficiency:

### Polling Modes

| Mode | Interval | Trigger |
| :--- | :---: | :--- |
| **Standby** | 60s | Default — no significant activity detected |
| **Active** | 10s | Target clan is gaining reputation (farming). Constant 10s interval to capture incoming contributions. |
| **High-Speed Detection** | 1s | A **new** bleeding clan is detected for the first time. Lasts for 30 ticks (~30s) to rapidly capture per-member gain data (+15, +10, etc.) |

---

## 7. Sounds and Desktop Notifications

The tracker features customized sound chimes and HTML5 push notifications to keep you alerted when critical war events occur.

### Alert Trigger Events
1. **⚔️ Reputation Gain Alerts**: Triggers when your tracked/target clan actively gains reputation.
2. **🔴 Bleeding Target Alerts**: Triggers when a new bleeding opponent is identified in the rankings.

### Customization & Persistent Settings
* **Master Controls**: Turn sound alerts (`🔊/🔇`) and desktop push notifications (`🔔/🔕`) globally ON or OFF via the Polling Control Panel or settings.
* **Specific Event Toggles**: Individually enable or disable alerts specifically for **Reputation Gains** (`⚔️`) or **Bleeding Targets** (`🔴`) to customize the tracker's noise level.
* **Persistence**: All sound and notification choices are automatically stored in the browser's `localStorage` and persist across page reloads.

