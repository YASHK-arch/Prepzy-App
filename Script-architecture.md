  1️⃣QUESTION PAGE FLOW
  📄 Example: /JAVA/Prefix sum/Q1.html   
  ┌──────────────────────────────┐
  │ Question Page Loads          │
  │ (Q1.html)                    │
  └──────────────┬───────────────┘
                 │
                 ▼
  ┌──────────────────────────────┐
  │ storage.js                   │
  │ DOMContentLoaded             │
  └──────────────┬───────────────┘
                 │
                 ▼
  ┌────────────────────────────────────────┐
  │ Extract folder + filename from URL     │
  │ "/JAVA/Prefix sum/Q1.html"             │
  │                                       │
  │ storageKey =                            │
  │ status_Prefix sum_Q1.html              │
  └──────────────┬─────────────────────────┘
                 │
       ┌─────────▼─────────┐
       │ Check localStorage│
       │ Is completed?     │
       └───────┬───────────┘
               │YES
               ▼
     ┌─────────────────────────┐
     │ Disable Done button     │
     │ Show COMPLETED UI       │
     └─────────────────────────┘
               │
               │NO
               ▼
  ┌──────────────────────────────┐
  │ User clicks "Done" button    │
  └──────────────┬───────────────┘
                 ▼
  ┌──────────────────────────────┐
  │ localStorage.setItem(        │
  │ status_Prefix sum_Q1.html,  │
  │ 'completed')                │
  └──────────────────────────────┘








2️⃣ SUBJECT PAGE FLOW
📄 Example: java.html
┌──────────────────────────────┐
│ Subject Page Loads           │
│ (java.html)                  │
└──────────────┬───────────────┘
               │
               ▼
┌──────────────────────────────┐
│ data.js                      │
│ window.onload                │
└──────────────┬───────────────┘
               │
               ▼
┌────────────────────────────────────────┐
│ Detect subject from filename           │
│ "java.html" → subjectName = "java"     │
└──────────────┬─────────────────────────┘
               │
               ▼
┌────────────────────────────────────────┐
│ Count all .question-item elements      │
│ Save to localStorage:                  │
│ total_questions_java = N               │
└──────────────┬─────────────────────────┘
               │
               ▼
┌────────────────────────────────────────┐
│ For each .topic-group                  │
│ (Prefix Sum, Sliding Window, etc.)     │
└──────────────┬─────────────────────────┘
               │
               ▼
┌────────────────────────────────────────┐
│ For each question link <a href>        │
│ Extract folder + file                  │
│ Build storageKey                       │
│ status_Folder_File.html                │
└──────────────┬─────────────────────────┘
               │
     ┌─────────▼──────────┐
     │ Is completed?      │
     └───────┬────────────┘
             │YES
             ▼
┌──────────────────────────────┐
│ Increment groupCompleted     │
│ Add green checkmark          │
└──────────────────────────────┘



📊 SUBJECT PAGE UI UPDATE
┌────────────────────────────────────────┐
│ Calculate:                             │
│ groupPercentage                        │
│ subjectTotalCompleted                  │
│ subjectTotalQuestions                  │
└──────────────┬─────────────────────────┘
               ▼
┌────────────────────────────────────────┐
│ Update:                                │
│ - Folder progress bars                 │
│ - Folder percentages                   │
│ - Subject header progress bar          │
│ - Subject stats text                   │
└────────────────────────────────────────┘



3️⃣ topic.js (UI TOGGLING – PARALLEL FLOW)
┌──────────────────────────────┐
│ topic.js loads               │
└──────────────┬───────────────┘
               ▼
┌──────────────────────────────┐
│ All topic-groups ACTIVE      │
└──────────────┬───────────────┘
               ▼
┌──────────────────────────────┐
│ User clicks "View"            │
└──────────────┬───────────────┘
               ▼
┌────────────────────────────────────────┐
│ Collapse other groups                  │
│ Expand selected sub-menu               │
│ Toggle button text View ↔ Close        │
└────────────────────────────────────────┘





4️⃣ DASHBOARD FLOW
📄 index.html

┌──────────────────────────────┐
│ Dashboard Loads              │
│ (index.html)                 │
└──────────────┬───────────────┘
               ▼
┌──────────────────────────────┐
│ dashboard.js                 │
│ DOMContentLoaded             │
└──────────────┬───────────────┘
               ▼
┌────────────────────────────────────────┐
│ Read subject definitions               │
│ java / js / maths                      │
│ + folder mappings                      │
└──────────────┬─────────────────────────┘
               ▼
┌────────────────────────────────────────┐
│ Read localStorage:                     │
│ total_questions_java                   │
│ total_questions_js                     │
│ total_questions_maths                  │
└──────────────┬─────────────────────────┘
               ▼
┌────────────────────────────────────────┐
│ Scan all localStorage keys             │
│ Filter status_* === completed          │
└──────────────┬─────────────────────────┘
               ▼
┌────────────────────────────────────────┐
│ Match completed keys to subject folders│
│ Count completed per subject            │
└──────────────┬─────────────────────────┘
               ▼

🌍 GLOBAL DASHBOARD CALCULATION
┌────────────────────────────────────────┐
│ grandTotalQuestions                    │
│ grandTotalCompleted                    │
└──────────────┬─────────────────────────┘
               ▼
┌────────────────────────────────────────┐
│ globalPercent =                        │
│ (completed / total) * 100              │
└──────────────┬─────────────────────────┘
               ▼
┌────────────────────────────────────────┐
│ Update Dashboard UI                    │
│ - Subject cards                        │
│ - Subject progress bars                │
│ - Global violet bar                    │
│ - Overall % label                      │
└────────────────────────────────────────┘
  
