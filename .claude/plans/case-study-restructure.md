# Case Study Restructure Plan
## Based on: All 3 drafts, PRD V1, Phase 2 PRD, 7 diary entries, revision feedback

---

## SECTION 1 — Hero
**Status:** Keep, with updates

**Changes:**
- Update timeline from "Solo weekend sprint" → "8-Day Build Sprint" (honest per diary)
- Add note: "MVP shipped in one weekend; iterated over 8 days"
- Keep title, description, and tags as-is

---

## SECTION 2 — Quick Facts (4 columns)
**Status:** Keep, with updates

| # | Title | Current | Revised |
|---|-------|---------|---------|
| 01 | My Role | Keep as-is | Keep |
| 02 | Timeline | "Solo weekend sprint" | "8 days (Jan 31 – Feb 7, 2026). Core MVP in one weekend; features, debugging, and polish through Day 8." |
| 03 | Stack | Keep as-is | Keep |
| 04 | Key Result | Keep as-is | Add: "$40/month total cost" |

---

## SECTION 3 — Tool Stack Logos
**Status:** Keep as-is. No changes.

---

## SECTION 4 — Discovery: Personal Motivation (NEW)
**Status:** NEW section

**Source:** Draft 3 "Personal Motivation" + user revision note: *"the goal is add 'education/received information' that is easy to understand and also practical that we can apply to daily use cases"*

**Content direction:**
- Open with personal story: as a design leader with broad intellectual curiosity (psychology, AI, neuroscience, design), I was drowning in app proliferation
- The core frustration: educational content is either too academic/complex OR too shallow. Nothing delivers practical, plain-language insights you can actually apply to your work that day
- What I actually needed:
  1. Consolidated access — one system, all my interests, no app-switching
  2. Practical application — content connected to real daily work challenges, not abstract theory
  3. Cognitive accessibility — complex concepts explained simply enough to digest in 5 minutes
  4. Native language — bilingual delivery so I can process in whichever language works faster
  5. Proactive delivery — insights come to me, not the other way around
- Closing: "This wasn't about building another learning app — it was about creating a system that eliminates the friction between curiosity and practical knowledge."

**Diary source (1/31):** "I decided to pick up the 'daily insights' idea again. Before I spent any money, I first consult with Claude and Gemini to access what Tech tools I need."

---

## SECTION 5 — Discovery: Research & Pain Points
**Status:** Rework existing Problem section

**Keep:** The 6 pain-point cards with phone mockups (these are strong)
**Keep:** The failure chain

**Changes:**
- Update section header from "The Problem" → "The Problem" (can stay same)
- Update intro paragraph to connect from personal motivation: "Beyond my own needs, conversations with design leaders upskilling in AI revealed similar pain points"
- The 6 cards are good as-is: Generic Content, Broken Continuity, App Proliferation, Language Friction, Theory Without Practice, Passive Content

---

## SECTION 6 — Discovery: Opportunities (NEW)
**Status:** NEW section

**Source:** Figma screenshot showing 6 opportunity cards from Discovery/Opportunities page

**Content:** 6 cards mapping each pain point to how LLMs specifically solve it:

| # | Title | Description | Tag |
|---|-------|-------------|-----|
| 01 | AI-Curated Personalization at Scale | Use LLMs to deliver insights tailored to each user's goals and subject interests — moving beyond generic, one-size-fits-all content. | PERSONALIZATION LAYER |
| 02 | Bilingual Cognitive Access | Deliver insights in English and Chinese — reducing cognitive load for bilingual users and enabling deeper comprehension and reflection. | LANGUAGE INTELLIGENCE |
| 03 | Frictionless Daily Ritual | Push insights directly to email — removing app-switching fatigue and letting learning integrate seamlessly into existing daily routines. | HABIT ARCHITECTURE |
| 04 | Cross-Domain Knowledge Synthesis | Bridge psychology, neuroscience, philosophy, and astrology into unified insights — connecting wisdom traditions that modern tools overlook. | KNOWLEDGE GRAPH |
| 05 | Compounding Growth Over Time | Build a personal insight archive — enabling meaningful reflection, visible progress, and the satisfying experience of knowledge compounding. | RETENTION ENGINE |
| 06 | End-to-End Builder Narrative | Showcase full-stack fluency — Claude API, Supabase, Resend — as a tangible portfolio signal of AI-native design and product thinking. | PORTFOLIO PROOF POINT |

**Visual:** 5 cards in first row, 1 card in second row (matching Figma layout). Each card has an icon, number, title, description, and colored tag at bottom.

---

## SECTION 7 — Solution Architecture
**Status:** Keep structure, revise content

**Changes per user revision:**
1. Input panel: change "Career Goals" → "Learning Goals"
2. Add a new visual: the solution flow process diagram (user mentioned uploading a new screenshot and Figma link)
3. Keep the 3-panel layout (Input: User Profile → Processing: Claude API → Output: Daily Insight)

**Note:** Need to get the Figma link/screenshot for the solution flow process from the user.

---

## SECTION 8 — User Experience: App + Email (Revised)
**Status:** Major revision

**User feedback:** "I don't think it clearly explained how the AI product works. It is missing the important ideas: 1. app — need to explain what features/functionalities are included in the app 2. email — need to explain users receive daily emails of related content based on the subjects they chosen"

**New structure — split into two clear subsections:**

### 8A: The App Experience
Show what the app does with key features:
- Onboarding wizard (4 steps: select subjects → set schedule → choose language → set reading level)
- Dashboard showing today's insight
- Interactive chat for follow-up questions and deeper exploration
- Language toggle (English ↔ Chinese) within insights
- Profile/settings management
- Source: Phase 2 PRD details (40+ subjects, 8 languages, 4 reading levels)

### 8B: The Daily Email Experience
Show how the proactive delivery works:
- Users receive a personalized AI-generated insight every day at their chosen time
- Content is based on subjects they selected during onboarding
- Each email has structured sections: Hook → Insight → Why It Matters → Reflection Prompt → Dig Deeper
- Delivered in user's preferred language
- Designed for 5-minute consumption

**Visual:** Could use the 5-step flow but restructured around these two experiences rather than abstract steps.

---

## SECTION 9 — Live Product
**Status:** Keep as-is. No changes.

---

## SECTION 10 — Challenges & Pivots (NEW)
**Status:** NEW section

**Source:** Diary entries (2/1, 2/7, 2/17, 3/1) + Draft 2 detailed challenges

**3-4 challenge cards, each with: Problem → What I tried → Solution → Learning**

### Challenge 1: The Cron Job Nightmare (Days 2–6)
- **Problem:** Supabase native cron kept failing with cryptic errors ("schema 'net' does not exist", "pg_net.http_post does not exist"). 6+ hours debugging across multiple days.
- **Diary (2/17 audit):** Full backend audit revealed "No cron jobs exist — cron.job table is empty. The old rogue cron was removed but no replacement was set up."
- **Solution:** Pivoted to external cron-job.org. Set up in 30 minutes. 100% reliability since.
- **Learning:** "Don't fall for sunk cost fallacy. If something takes 6 hours and still doesn't work, try a different approach."

### Challenge 2: Email Template Persistence (Day 8)
- **Problem:** Email template kept reverting to old dark green design. Changes worked temporarily, then disappeared when updating send time.
- **Diary (2/7):** "Setting up the email sent took the most back and forth. Either the email didn't send as the requested time, or the email template keeps going back to the old version every time when I ask for an update of email sent time."
- **Solution:** Went directly into Edge Function code and hardcoded the template. Not elegant, but it worked.
- **Learning:** "When AI tools fail, go to the code level. And decouple your concerns — scheduling and templating shouldn't be in the same function."

### Challenge 3: Duplicate Emails & Wrong Sender (Day 17)
- **Problem:** A rogue second email was being sent at 4am from noreply@resend.dev instead of the correct onboarding@resend.dev.
- **Diary (2/17):** Full diagnostic audit of all 6 services. Discovered the end-to-end flow was "Broken at Step 1" — no cron job existed, Resend was still in sandbox mode.
- **Solution:** Removed duplicate trigger, recreated clean cron job, wrote diagnostic audit prompt to systematically check each service.
- **Learning:** "When debugging complex multi-service systems, audit each service systematically rather than guessing."

### Challenge 4: Simplified vs. Traditional Chinese
- **Problem:** Default "translate to Chinese" prompt produced Simplified Chinese (简体), not Traditional Chinese (繁體) needed for Taiwan audience.
- **Solution:** Updated Claude prompt to specify "Taiwan Traditional Chinese (台灣繁體)" with vocabulary examples (軟體 not 软件, 網路 not 网络).
- **Learning:** "AI prompts need extreme specificity. 'Chinese' has multiple variants — always provide examples, not just descriptions."

---

## SECTION 11 — Design Decisions
**Status:** REMOVE per user revision

---

## SECTION 12 — Before / After Table
**Status:** Keep as-is. No changes.

---

## SECTION 13 — Results & Impact (NEW)
**Status:** NEW section

**Content from diary + drafts:**

### Build Metrics
- 8 days from concept to deployed product
- $40/month total cost (Lovable $20 + Claude API $20, Supabase/Resend/cron free tiers)
- ~2,000 lines of code (mostly generated by Lovable)
- 51 AI-generated insights in production database
- 4 API integrations (Claude, Supabase, Resend, cron-job.org)

### Performance Metrics
- 100% email delivery success rate (since cron-job.org switch)
- 3–5 second AI generation time per insight
- <2 second page load time
- Bilingual content generated in a single API call

### What This Demonstrates
- Full-stack capability: design AND build end-to-end
- AI integration: actual API integration and prompt engineering, not just "I used ChatGPT"
- Problem-solving: pivoted when Supabase cron failed, didn't give up on email debugging
- Global thinking: bilingual support from day one
- Startup mentality: shipped on $40/month budget

---

## SECTION 14 — Learnings (Rewritten)
**Status:** Rewrite with specific stories from diary

**3 learning cards, each grounded in real diary moments:**

### Learning 1: Build First, Design Second (For AI Products)
- Source: Diary shows building on Day 1-2, Figma design on Day 6
- Specific: "I discovered Supabase cron was unreliable BEFORE designing a UI for it. I learned Claude API takes 3-5 seconds BEFORE designing loading states. I found bilingual content works in one API call BEFORE assuming I needed separate calls."
- Takeaway: For novel AI features, validate feasibility first, design second. For established patterns (login, settings), design first is fine.

### Learning 2: AI Prompts Need Extreme Specificity
- Source: Diary — Chinese translation defaulting to Simplified, content tone too academic
- Specific: "I rewrote the daily insights prompt to speak to a 15-year-old. 'Chinese' defaulted to Simplified — I had to specify 'Taiwan Traditional Chinese (台灣繁體)' with vocabulary examples."
- Takeaway: Prompt engineering is a design discipline. The same UX principles (clarity, specificity, user mental models) apply to LLM interactions.

### Learning 3: Ship Working Solutions Over Architectural Purity
- Source: Diary — 6 hours on Supabase cron → 30 minutes on cron-job.org
- Specific: "I spent 6 hours trying to make Supabase native cron work because it felt like the 'right' solution. External cron-job.org solved it in 30 minutes with 100% reliability."
- Takeaway: External dependencies aren't "cheating" — they're pragmatic. Being technical means knowing when NOT to code.

---

## SECTION 15 — What's Next: Phase 2 (NEW)
**Status:** NEW section

**Source:** Phase 2 PRD + diary (2/8 feature planning, 2/28 roadmap, 3/1 Remix + onboarding)

**Content:**

### Phase 2: Multi-User Personalization (In Progress)
- Authenticated user accounts with onboarding wizard
- 40+ subjects across 8 categories for users to choose from
- 4 reading levels (Explorer → Learner → Practitioner → Expert) calibrating AI tone and complexity
- 8 language support (English, Spanish, French, German, Chinese, Japanese, Portuguese, Arabic)
- Time zone-aware scheduling

### Future Roadmap (from diary 2/8 planning)
- Insight archive with search
- Streaks & gamification for habit formation
- Audio narration for learning on the go
- Weekly digest for re-engagement
- Collections for structured learning paths

### Monetization Path
- Free tier: 3 insights/week, 3 topics
- Pro tier ($5/month): Daily insights, unlimited topics, full archive, audio
- Premium tier ($10/month): Everything + collections, smart recommendations, PDF export

---

## FINAL SECTION ORDER (15 → 13 sections after removing Design Decisions)

1. Hero (updated timeline)
2. Quick Facts (updated timeline + cost)
3. Tool Stack
4. **Discovery: Personal Motivation** (NEW)
5. Discovery: Research & Pain Points (reworked from current Problem section)
6. **Discovery: Opportunities** (NEW — 6 cards from Figma)
7. Solution Architecture (revised: learning goals + flow process)
8. User Experience: App + Email (revised to explain features clearly)
9. Live Product
10. **Challenges & Pivots** (NEW — 4 challenge stories from diary)
11. Before / After
12. **Results & Impact** (NEW — metrics)
13. Learnings (rewritten with diary stories)
14. **What's Next: Phase 2** (NEW — roadmap)
15. Next Project link + Footer

---

## OPEN QUESTIONS FOR USER
1. Section 7: You mentioned uploading a new screenshot and Figma link for the solution flow process — can you share that?
2. Section 8: Do you have screenshots of the app's onboarding wizard or email template to include?
3. Section 6: Should the Opportunities cards use the exact Figma copy, or should I refine it?
