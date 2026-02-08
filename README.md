# 🧭 Future Map – Degree Decider

**Future Map** is a web-based **degree recommendation and decision-support system** that helps students choose the most suitable academic path based on their interests, skills, goals, and constraints.

This project focuses on **clarity, guidance, and personalization**, enabling students to make informed decisions about their future education.

---

## 🎯 Problem Statement

Many students struggle to decide:

* Which degree suits their interests?
* What career paths align with their strengths?
* How to compare multiple options objectively?

**Future Map – Degree Decider** addresses this by collecting structured inputs and mapping them to **data-driven degree recommendations**.

---

## 🚀 Key Features

* 🧠 Personalized degree recommendations
* 📋 Interest & skill-based input flow
* 🧩 Rule-based + extensible logic for decision making
* 🌐 Modern web UI
* 🔐 Backend-ready architecture using Supabase
* 📈 Scalable for analytics & insights

---

## 🧱 Project Structure

```
Future-Map/
│
├── DegreeDecider Web App UI/
│   ├── guidelines/                 # Degree & decision guidelines
│   ├── src/                        # Frontend source code
│   ├── utils/supabase/             # Supabase client utilities
│   ├── supabase/functions/server/  # Backend functions (API / logic)
│   ├── index.html                  # App entry point
│   ├── package.json                # Dependencies & scripts
│   ├── vite.config.ts              # Vite configuration
│   ├── postcss.config.mjs          # Styling configuration
│   ├── ATTRIBUTIONS.md             # Credits & licenses
│   └── README.md                   # UI-specific documentation
│
├── README.md                       # Main project documentation
└── LICENSE
```

---

## 🛠️ Tech Stack

* **Frontend**: Vite + Modern JavaScript / TypeScript
* **Backend**: Supabase (Functions + Auth-ready)
* **Database**: Supabase / PostgreSQL
* **Styling**: PostCSS / Utility-first CSS
* **Hosting**: Vercel / Netlify / Supabase

---

## ▶️ How the Degree Decider Works

### 1️⃣ User Input Collection

The system collects inputs such as:

* Interests (STEM, Arts, Business, etc.)
* Strengths (Math, Logic, Creativity, Communication)
* Career goals
* Preferred learning style

---

### 2️⃣ Decision Logic

Based on predefined **guidelines and rules**, the system:

* Scores user preferences
* Matches them with suitable degree options
* Filters out mismatches

---

### 3️⃣ Recommendation Output

The user receives:

* 🎓 Recommended degrees
* 📌 Reasoning behind each recommendation
* 🔁 Alternative paths to explore

---

## ⚙️ Running the Project Locally

### 1️⃣ Install Dependencies

```bash
npm install
```

---

### 2️⃣ Start Development Server

```bash
npm run dev
```

---

### 3️⃣ Open in Browser

```
http://localhost:5173
```

---

## 🔐 Backend & Supabase

* Supabase functions handle server-side logic
* Ready for:

  * User authentication
  * Data persistence
  * Analytics

Configuration files are located in:

```
utils/supabase/
supabase/functions/server/
```

---

## 📈 Future Enhancements

* AI-powered degree recommendations
* Career roadmap generation
* College & university suggestions
* Resume & skill gap analysis
* User profiles & history

---

## 🎓 Use Cases

* High school students choosing degrees
* College freshmen exploring streams
* Career counseling platforms
* EdTech startups

---

## 🧑‍💻 Author

**Manish**
Full Stack | System Design | EdTech Enthusiast

⭐ If this project helped you, consider starring the repository!
