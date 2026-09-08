
# MockAI

An AI-powered full-stack career preparation platform that helps users **analyze and improve their resumes, optimize ATS compatibility, practice technical and behavioral interviews, and receive personalized AI-powered feedback**.

Built with **Next.js, React, Gemini AI, PostgreSQL, Drizzle ORM, Clerk Authentication, Tailwind CSS, and RAG-based resume analysis**.

---

## 🚀 Overview

The **AI Resume Analyzer & Mock Interview Platform** combines two important career-preparation workflows into one application:

- 📄 **AI Resume Analyzer** — Analyze a resume against a target job description and receive ATS scores, skill matching, keyword analysis, and improvement suggestions.
- 🎤 **AI Mock Interview** — Practice role-specific technical and behavioral interviews with AI-generated questions and receive AI-powered evaluation and feedback.
- 📊 **Personalized Dashboard** — Track interview history, resume analysis, scores, and performance.
- 🔐 **Authentication** — Secure user authentication and protected application areas using Clerk.
- 🧠 **RAG-Based Resume Analysis** — Processes resume information into relevant sections/context before AI analysis.

---

# ✨ Features

## 📄 AI Resume Analyzer

The Resume Analyzer helps candidates understand how well their resume matches a target job.

### Key capabilities

- 📤 Resume upload
- 📑 Resume text processing
- 🎯 Job-description based analysis
- 📊 ATS score
- 🔎 Keyword matching
- 🧠 Skill alignment analysis
- 💼 Experience relevance analysis
- 📝 ATS formatting analysis
- 📈 Quantified impact analysis
- ❌ Identification of missing keywords
- 💡 Resume improvement suggestions
- 📋 Detailed score breakdown
- 🤖 AI-powered resume recommendations

---

## 🧠 RAG-Based Resume Analysis

The application uses a RAG-oriented approach to process resume content before generating the final AI analysis.

The resume analysis pipeline is designed to break the resume into meaningful information and provide relevant context to the AI model.

### Resume Analysis Pipeline


                    Resume Upload
                         │
                         ▼
                 Resume Text Extraction
                         │
                         ▼
                  Text Normalization
                         │
                         ▼
                Resume Section Chunking
                         │
                         ▼
                 Relevant Context
                         │
                         ▼
                    Gemini AI
                         │
                         ▼
                Resume Evaluation
                         │
          ┌──────────────┼──────────────┐
          ▼              ▼              ▼
      ATS Score      Skill Match    Keywords
          │              │              │
          └──────────────┼──────────────┘
                         ▼
                Improvement Suggestions


## System Architecture
                         ┌──────────────────┐
                         │       User       │
                         └────────┬─────────┘
                                  │
                                  ▼
                    ┌─────────────────────────┐
                    │     Next.js Frontend    │
                    │   React + Tailwind CSS  │
                    └────────────┬────────────┘
                                 │
                                 ▼
                    ┌─────────────────────────┐
                    │       API Routes        │
                    │         Next.js         │
                    └────────────┬────────────┘
                                 │
                 ┌───────────────┼────────────────┐
                 │               │                │
                 ▼               ▼                ▼
        ┌──────────────┐ ┌──────────────┐ ┌──────────────┐
        │  Gemini AI   │ │ RAG Analyzer │ │ PostgreSQL   │
        │              │ │              │ │              │
        │ AI Analysis  │ │ Resume       │ │ User Data    │
        │ Interview AI │ │ Processing   │ │ Interviews   │
        └──────────────┘ └──────────────┘ └──────────────┘
                                                 │
                                                 ▼
                                         ┌──────────────┐
                                         │ Drizzle ORM  │
                                         └──────────────┘

                         Authentication
                               │
                               ▼
                         Clerk Auth

# 🛠️ Tech Stack

## 🎨 Frontend

- **Next.js** – Full-stack React framework
- **React.js** – Component-based UI development
- **Tailwind CSS** – Responsive and modern styling
- **Responsive Design** – Mobile, tablet, and desktop support
- **Dark / Light Mode** – Theme support

## ⚙️ Backend

- **Next.js API Routes** – Backend API and server-side endpoints
- **Node.js** – Server-side JavaScript runtime
- **Server-Side Processing** – Secure handling of application logic and AI requests

## 🗄️ Database

- **PostgreSQL** – Relational database
- **Neon PostgreSQL** – Serverless PostgreSQL database platform
- **Drizzle ORM** – Type-safe database queries and schema management

## 🤖 AI & Generative AI

- **Google Gemini AI** – AI-powered analysis and content generation
- **Prompt Engineering** – Structured prompts for reliable AI responses
- **Generative AI** – Intelligent resume and interview analysis
- **AI Resume Analysis** – Automated resume evaluation and insights
- **ATS Resume Scoring** – Resume compatibility and scoring
- **AI Interview Question Generation** – Personalized interview questions
- **AI Answer Evaluation** – AI-powered answer assessment and feedback

## 🧠 RAG & NLP

- **Retrieval-Augmented Generation (RAG)** – Context-aware AI analysis
- **Resume Text Extraction** – Extracting structured content from resumes
- **Text Normalization** – Cleaning and standardizing extracted text
- **Semantic Resume Chunking** – Breaking resumes into meaningful sections
- **Relevant Context Retrieval** – Supplying relevant resume information to the AI model
- **Context-Aware Analysis** – Generating responses based on retrieved resume content

## 🔐 Authentication

- **Clerk** – User authentication and account management

## 🚀 Deployment & Infrastructure

- **Vercel** – Application deployment and hosting
- **Neon PostgreSQL** – Production database infrastructure

## 🧰 Development Tools

- **Git** – Version control
- **GitHub** – Source code hosting and collaboration
- **npm** – Package and dependency management



## 📁 Project Structure

```text
AI-Resume-Analyzer-and-Mock-Interview/
│
├── app/
│   ├── (auth)/
│   │   ├── sign-in/
│   │   └── sign-up/
│   │
│   ├── api/
│   │   └── ...
│   │
│   ├── dashboard/
│   │
│   ├── resume-analyzer/
│   │
│   ├── about-us/
│   ├── how-it-works/
│   ├── layout.js
│   ├── page.js
│   └── not-found.js
│
├── components/
│   └── ...
│
├── lib/
│   ├── db.js
│   ├── GeminiAIModal.js
│   ├── ragAnalyzer.js
│   └── schema.js
│
├── public/
│   └── ...
│
├── .env.example
├── .gitignore
├── drizzle.config.js
├── jsconfig.json
├── components.json
├── package.json
└── README.md
```


## 🔥 Resume Analyzer Architecture

The Resume Analyzer uses a **RAG-based AI pipeline** to process uploaded resumes, extract meaningful information, and generate structured insights using **Google Gemini AI**.

### 🧠 Core RAG & Analysis Logic

#### `lib/ragAnalyzer.js`

The core module responsible for resume processing, contextual analysis, and evaluation.

**Responsibilities:**

- 📄 Resume text processing
- 🧹 Text normalization and cleaning
- ✂️ Semantic resume section chunking
- 🔎 Relevant context identification
- 🧠 RAG-based contextual analysis
- 📊 ATS score calculation
- 🛠️ Skill alignment analysis
- 💼 Experience relevance analysis
- 🔑 Keyword matching
- 📈 Quantified impact analysis
- 💡 Resume improvement suggestions

### 🤖 Gemini AI Integration

#### `lib/GeminiAIModal.js`

Handles communication with the **Google Gemini AI API** and manages AI-powered resume analysis and content generation.

**Responsibilities:**

- Gemini model integration
- Prompt construction
- AI response generation
- Structured resume analysis
- Interview question generation
- AI-powered answer evaluation

### 🎨 Resume Analyzer UI

#### `app/dashboard/resume-analyzer/`

Contains the frontend interface for the Resume Analyzer.

**Responsibilities:**

- Resume upload interface
- Resume analysis workflow
- ATS score visualization
- Skill and keyword insights
- Improvement recommendations
- AI-generated analysis display

### ⚙️ Backend API Layer

#### `app/api/`

Contains the backend API routes responsible for connecting the frontend with the AI and database layers.

**Responsibilities:**

- API request handling
- Resume processing requests
- Gemini AI communication
- Database operations
- Server-side business logic

### 🗄️ Database Layer

#### `lib/db.js`

Handles database connectivity and provides the database instance used throughout the application.

#### `lib/schema.js`

Contains the **Drizzle ORM database schema definitions** for application data.

**Responsibilities:**

- Database table definitions
- Column and relationship definitions
- Type-safe database structure
- Data persistence configuration

### 🔄 Resume Analysis Flow

```text
Resume Upload
      │
      ▼
Resume Text Extraction
      │
      ▼
Text Normalization
      │
      ▼
Resume Section Chunking
      │
      ▼
Relevant Context
      │
      ▼
Gemini AI Analysis
      │
      ▼
┌─────┴─────────────┬──────────────┐
▼                   ▼              ▼
ATS Score       Skill Match    Keyword Analysis
│                   │              │
└───────────────────┴──────────────┘
                    │
                    ▼
        Improvement Suggestions
```

## 🎤 AI Mock Interview Flow
```text
User Selects Job Role
        │
        ▼
Interview Configuration
        │
        ▼
Gemini AI Generates Questions
        │
        ▼
User Answers
        │
        ▼
AI Evaluates Answer
        │
        ▼
Score + Feedback
        │
        ▼
Performance Tracking

```
## Environment Variables

Create a `.env.local` file:

```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=

NEXT_PUBLIC_DRIZZLE_DB_URL=

NEXT_PUBLIC_GEMINI_API_KEY=
```

---

## Installation

```bash
git clone https://github.com/yourusername/AI-Resume-Analyzer-and-Mock-Interview.git

cd AI-Resume-Analyzer-and-Mock-Interview

npm install
```

---

## Run Development Server

```bash
npm run dev
```

---

## Database Migration

```bash
npx drizzle-kit push
```

---

## Future Enhancements

* Voice-based AI interviews
* AI career roadmap generation
* Multi-language interview support
* PDF interview reports
* AI coding interview evaluator

---

## Deployment

Frontend deployed on Vercel.

Database hosted on Neon PostgreSQL.

---

## License

This project is licensed under the MIT License.


## Table of Contents
- [Overview](#overview)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
  - [Installation](#installation)
  - [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Overview
The Full Stack AI Mock Interview App allows users to practice technical and behavioral interview questions in an interactive environment. The app generates custom questions based on user preferences and delivers instant feedback on answers to help users improve their interview skills.

## Features
- **AI-Driven Questions**: Get custom-tailored interview questions based on your profile and feedback.
- **User Authentication**: Secure login and signup using Clerk.
- **Real-Time Feedback**: Answer interview questions and receive immediate feedback with the help of Gemini AI.
- **Interactive UI**: A responsive, user-friendly interface built with React.
- **Data Persistence**: User data and interview history managed through Drizzle ORM.

## Technologies Used
- **[Next.js](https://nextjs.org/)**: Framework for server-rendered React applications.
- **[React](https://reactjs.org/)**: JavaScript library for building user interfaces.
- **[Drizzle ORM](https://drizzle.team/)**: ORM for managing database interactions.
- **[Gemini AI](https://gemini.ai/)**: AI API for generating interview questions and analyzing answers.
- **[Clerk](https://clerk.dev/)**: Authentication and user management.

## Getting Started

### Installation
To get started with the project, follow these steps:

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/ai-mock-interview.git
   ```

2. Navigate to the project directory:
   ```bash
   cd full-stack-ai-mock-interview-app
   ```

3. Install the dependencies:
   ```bash
   npm install
   ```

### Usage
1. Start the development server:
   ```bash
   npm run dev
   ```

2. Open your browser and visit [http://localhost:3000](http://localhost:3000) to see the app in action!

## Contributing
We welcome contributions! Please follow these steps to contribute:

1. **Fork the repository**: Click the "Fork" button at the top right corner of this repository.
2. **Clone your fork**:
   ```bash
   git clone https://github.com/yourusername/full-stack-ai-mock-interview-app.git
   ```
3. **Create a new branch**:
   ```bash
   git checkout -b your-feature-branch
   ```
4. **Make your changes**: Add features or fix bugs.
5. **Commit your changes**:
   ```bash
   git commit -m "Describe your changes"
   ```
6. **Push your branch**:
   ```bash
   git push origin your-feature-branch
   ```
7. **Create a pull request**: Go to the original repository and open a pull request.

For more details, please refer to the [CONTRIBUTING.md](CONTRIBUTING.md).

## License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.


