# Prepzy-App
Revise Hard question interactively with progress display and mock quiz, to ace coding exams with ease.

Great, this is a **well-thought-out client-side architecture**, and your scripts are actually cooperating like a small state machine using `localStorage` 👍
Below is a **deep, structured explanation** of **each script**, **what problem it solves**, and then a **full execution flow (who runs first → who feeds whom)**.

I’ll explain in **4 layers**:

1. **Big-picture architecture**
2. **Each file in detail**
3. **How data flows between files**
4. **Exact execution sequence (timeline)**

---

## 1️⃣ Big-Picture Architecture (Mental Model)

Your **Prepzy Revision App** works on a **3-level hierarchy**:

```
Question Page (Q1.html, Q2.html...)
        ↓
Subject Page (java.html, js.html, maths.html)
        ↓
Dashboard (index.html)
```

Each level has **one dedicated script**:

| Level     | Script                | Responsibility                   |
| --------- | --------------------- | -------------------------------- |
| Question  | `storage.js`          | Save completion state            |
| Subject   | `data.js`, `topic.js` | Calculate progress + UI behavior |
| Dashboard | `dashboard.js`        | Aggregate global progress        |

The **single source of truth** is:

```
localStorage
```

---

## 2️⃣ File-by-File Detailed Explanation

---

## 📁 1. `storage.js` – **Question-Level Progress Saver**



### 🎯 Purpose

Handles **marking an individual question as completed** and persists it across pages.

---

### 🔹 What happens step-by-step

#### **A. Runs on `DOMContentLoaded`**

```js
document.addEventListener('DOMContentLoaded', () => {
```

Ensures the DOM is ready before querying buttons.

---

#### **B. Generates a UNIQUE storage key**

```js
const storageKey = `status_${folderName}_${fileName}`;
```

Example:

```
status_Prefix sum_Q1.html
```

✅ This avoids conflicts like:

* Same filename in different folders
* Same question number across subjects

---

#### **C. On page load: Restore UI state**

```js
if (localStorage.getItem(storageKey) === 'completed') {
```

If already done:

* Shows `COMPLETED`
* Disables button
* Prevents double counting

This is **state hydration**.

---

#### **D. On “Done” button click**

```js
localStorage.setItem(storageKey, 'completed');
```

✔ Saves progress
✔ Updates UI
✔ Logs to console

---

### 📌 What this file **does NOT do**

❌ It does **not calculate progress**
❌ It does **not update dashboard**

It only **writes truth to localStorage**.

---

## 📁 2. `data.js` – **Subject Page Brain**



### 🎯 Purpose

Calculates:

* Per-topic progress
* Subject-level progress
* Reports totals to the dashboard

---

### 🔹 Execution Trigger

```js
window.addEventListener('load', () => {
```

Runs **after everything loads**, including images & DOM.

---

### 🔹 SECTION 1: Report totals to Dashboard

```js
localStorage.setItem(`total_questions_${subjectName}`, allQuestionsOnPage.length);
```

Example:

```
total_questions_java = 120
```

✔ This allows **dashboard.js** to work **without scanning files**

---

### 🔹 SECTION 2: Per-topic progress calculation

For **each `.topic-group`**:

* Finds all questions
* Builds same storage key as `storage.js`
* Checks completion status

```js
if (localStorage.getItem(storageKey) === 'completed')
```

---

### 🔹 Visual Feedback

If completed:

* Turns question green
* Adds ✔ check icon

This makes the app **feel alive & responsive**.

---

### 🔹 SECTION 3: Subject header progress

Calculates:

```js
overallPercentage = completed / total
```

Updates:

* Top progress bar
* Stats text

---

### 📌 What this file depends on

* `storage.js` having saved keys
* HTML structure consistency
* Folder names matching URLs

---

## 📁 3. `dashboard.js` – **Global Aggregator**



### 🎯 Purpose

Shows:

* Progress per subject
* Overall Prepzy progress

---

### 🔹 Runs on DOMContentLoaded

```js
document.addEventListener('DOMContentLoaded', ...)
```

---

### 🔹 Subject Configuration (Core Mapping)

```js
const subjects = [
  { id: "java", folders: [...] }
];
```

This mapping tells the dashboard:

> “Which folders belong to which subject”

Very important for counting correctly.

---

### 🔹 How completed questions are counted

```js
key.startsWith('status_') && value === 'completed'
```

Then:

```js
folder name ∈ subject.folders
```

✔ Smart pattern matching
✔ No need to hardcode question counts

---

### 🔹 Dashboard UI Update

For each subject card:

* Text: `X/Y Questions Mastered`
* Progress bar width
* Percentage label

---

### 🔹 Global Progress Bar

```js
grandTotalCompleted / grandTotalQuestions
```

This is the **sum of all subjects**.

---

### 📌 Why this design is good

✔ Decoupled
✔ Scales with new subjects
✔ No backend needed

---

## 📁 4. `topic.js` – **UI Interaction Controller**



### 🎯 Purpose

Controls **expand / collapse behavior** of topic sections.

---

### 🔹 On load

```js
grp.classList.add('active');
```

All topic groups are visible initially.

---

### 🔹 On clicking “View / Close”

* Collapses other topics
* Expands selected one
* Toggles button text

This gives:
✔ Focus mode
✔ Clean UI
✔ No reloads

---

### 📌 Important Note

`topic.js`:

* Does **not touch localStorage**
* Does **not calculate progress**
* Purely **UI state**

---

## 3️⃣ How Data Flows Between Files

```
storage.js
   ↓ (writes)
localStorage
   ↓ (reads)
data.js
   ↓ (writes totals)
localStorage
   ↓ (reads)
dashboard.js
```

`topic.js` runs **in parallel** (UI only).

---

## 4️⃣ FULL EXECUTION SEQUENCE (Timeline)

### 🔁 Scenario: User opens a question → marks done → checks dashboard

---

### 🟢 STEP 1: Question Page Loads

```
storage.js
```

✔ Builds key
✔ Restores completion state if exists

---

### 🟢 STEP 2: User clicks “Done”

```
storage.js → localStorage
```

✔ Saves `status_folder_file = completed`

---

### 🟢 STEP 3: User opens Subject Page

```
data.js
```

✔ Counts all questions
✔ Reads completion keys
✔ Updates topic bars
✔ Saves `total_questions_subject`

```
topic.js
```

✔ Controls dropdown UI

---

### 🟢 STEP 4: User opens Dashboard

```
dashboard.js
```

✔ Reads totals from data.js
✔ Reads completed keys from storage.js
✔ Calculates global progress
✔ Updates dashboard UI

---

## ✅ Final Evaluation (Important)

You have:

* ✔ Proper separation of concerns
* ✔ Clean localStorage key strategy
* ✔ Scalable structure
* ✔ No unnecessary re-computation

This is **production-grade frontend logic** for a no-backend app.

---

If you want next, I can:

* 📊 Draw a **visual flow diagram**
* 🧠 Suggest **optimizations**
* 🔧 Convert this into **React / Vue**
* 🗃️ Add **export / analytics**

Just tell me 👍

