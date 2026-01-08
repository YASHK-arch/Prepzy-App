┌───────────────────────────────┐
│        USER OPENS APP         │
└───────────────┬───────────────┘
                │
                ▼
┌───────────────────────────────┐
│        index.html              │
│   (Dashboard Entry Point)      │
└───────────────┬───────────────┘
                │
                ▼
┌───────────────────────────────┐
│   Load Dashboard UI            │
│  - Subjects                    │
│  - Topic Cards                 │
│  - Global Progress Bar         │
│  - Read localStorage           │
└───────────────┬───────────────┘
                │
                ▼
┌───────────────────────────────┐
│     USER SELECTS SUBJECT       │
│   (Java / JS / Maths)          │
└───────────────┬───────────────┘
                │
                ▼
┌───────────────────────────────┐
│   subjects/{subject}.html     │
│   (Topic Listing Page)        │
└───────────────┬───────────────┘
                │
                ▼
┌───────────────────────────────┐
│     Display Topics             │
│  - Topic Progress              │
│  - Locked / Unlocked State     │
└───────────────┬───────────────┘
                │
                ▼
┌───────────────────────────────┐
│   USER SOLVES QUESTIONS        │
└───────────────┬───────────────┘
                │
                ▼
┌───────────────────────────────┐
│       script.js                │
│  - Validate Answers            │
│  - Mark Question Complete      │
│  - Update localStorage         │
└───────────────┬───────────────┘
                │
                ▼
┌───────────────────────────────┐
│   Recalculate Topic Progress   │
│   Update Progress Bar          │
└───────────────┬───────────────┘
                │
                ▼
┌───────────────────────────────┐
│     quiz-unlocked.js           │
│   Check: Topic Progress        │
│        == 100% ?               │
└───────────────┬───────────────┘
        YES ─────┘               └───── NO
         ▼                            ▼
┌──────────────────────┐   ┌──────────────────────────┐
│    Unlock Quiz       │   │   Keep Quiz Locked        │
│  Enable Quiz Button  │   │ Show Toast Message        │
└──────────┬───────────┘   └──────────┬───────────────┘
           │                            │
           ▼                            │
┌───────────────────────────────┐      │
│     USER STARTS QUIZ           │◄─────┘
└───────────────┬───────────────┘
                │
                ▼
┌───────────────────────────────┐
│         quiz.html              │
│   - Load Questions             │
│   - Start Timer                │
│   - Initialize Score           │
└───────────────┬───────────────┘
                │
                ▼
┌───────────────────────────────┐
│        QUIZ LOOP               │
│  Display Question              │
│  Select Option                 │
│  Validate Answer               │
│  Next Question                 │
└───────────────┬───────────────┘
                │
                ▼
┌───────────────────────────────┐
│     LAST QUESTION ANSWERED     │
└───────────────┬───────────────┘
                │
                ▼
┌───────────────────────────────┐
│     Calculate Final Score      │
│     Stop Timer                 │
│     Save Completion            │
│     Update localStorage        │
└───────────────┬───────────────┘
                │
                ▼
┌───────────────────────────────┐
│  Update Global Progress        │
│  Unlock Next Milestone         │
└───────────────┬───────────────┘
                │
                ▼
┌───────────────────────────────┐
│     toast.js                   │
│  Show Floating Notification    │
│  - Quiz Completed              │
│  - Progress Updated            │
└───────────────┬───────────────┘
                │
                ▼
┌───────────────────────────────┐
│       USER CONTINUES           │
│   (Next Topic / Subject)       │
└───────────────────────────────┘
