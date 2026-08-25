# 🤖 AI Developer Interview Simulator

An AI-powered full-stack platform for practicing technical interviews through timed coding sessions, automated code execution, AI-powered evaluation, and performance analytics.

## 🚀 Overview

**AI Developer Interview Simulator** brings the core experience of a technical coding interview into one platform.

Users can:

- 🔐 Create an account or sign in with Google
- 💻 Browse and solve coding problems
- 📝 Write code using the Monaco Editor
- 🧪 Run solutions against test cases
- 🚀 Submit solutions for evaluation
- 🤖 Receive AI-generated scores and feedback
- ⏱️ Practice in a timed 45-minute interview environment
- 📊 Track submissions and performance analytics

---

## ✨ Features

### 🔐 Authentication

- Email/password registration and login
- Google OAuth authentication
- JWT-based authentication
- HTTP-only authentication cookies
- Protected routes
- API rate limiting

### 💻 Coding Environment

- Monaco Editor for an IDE-like coding experience
- Coding problem descriptions and constraints
- Test-case execution
- Automated output comparison
- Solution submission and tracking

### 🤖 AI-Powered Evaluation

- Google Gemini API integration
- AI evaluation of submitted solutions
- Score out of 10
- Detailed feedback on submitted solutions
- Evaluation of correctness and solution quality
- Failed solutions are prevented from receiving inflated AI scores

### ⏱️ Interview Mode

- 45-minute timed technical interview
- Problems selected for each interview session
- Interview progress tracking
- Submission tracking during the session
- Final interview performance summary

### 📊 Analytics

- Average AI score
- Coding success rate
- Submission history
- Recent activity
- AI interviewer feedback
- Overall interview performance

### 🐳 Code Execution

- Docker-based code execution
- Automated test-case validation
- Output comparison
- Isolated execution workflow

---

## 🛠️ Tech Stack

### Frontend

- React 19
- Vite
- Tailwind CSS
- React Router
- Axios
- Monaco Editor
- React Markdown

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- Google OAuth
- bcryptjs
- Express Rate Limit

### AI & Execution

- Google Gemini API
- Docker
- Node.js

---

## 🏗️ Architecture

<pre>
┌──────────────────────┐
│      React App       │
│   Vite + Tailwind    │
└──────────┬───────────┘
           │ REST API
           ▼
┌──────────────────────┐
│   Express Backend    │
│       Node.js        │
└──────────┬───────────┘
           │
     ┌─────┼─────┐
     ▼     ▼     ▼
┌────────┐ ┌────────┐ ┌────────┐
│MongoDB │ │ Gemini │ │ Docker │
│Database│ │   AI   │ │ Runner │
└────────┘ └────────┘ └────────┘
</pre>

---

## 📁 Project Structure

<pre>
ai-interview-simulator/
│
├── frontend/
│   ├── public/
│   └── src/
│       ├── components/
│       │   ├── ActionCard.jsx
│       │   ├── Card.jsx
│       │   ├── DifficultyBadge.jsx
│       │   ├── Navbar.jsx
│       │   └── ProtectedRoute.jsx
│       │
│       ├── pages/
│       │   ├── Analytics.jsx
│       │   ├── Dashboard.jsx
│       │   ├── Interview.jsx
│       │   ├── Login.jsx
│       │   ├── ProblemPage.jsx
│       │   ├── Problems.jsx
│       │   ├── Register.jsx
│       │   └── Submissions.jsx
│       │
│       ├── services/
│       │   └── api.js
│       ├── App.jsx
│       └── main.jsx
│
├── backend/
│   └── src/
│       ├── config/
│       │   └── db.js
│       ├── controllers/
│       │   ├── authController.js
│       │   ├── problemController.js
│       │   └── submissionController.js
│       ├── middleware/
│       │   ├── authMiddleware.js
│       │   └── rateLimiter.js
│       ├── models/
│       │   ├── Problem.js
│       │   ├── Submission.js
│       │   └── User.js
│       ├── routes/
│       │   ├── authRoutes.js
│       │   ├── problemRoutes.js
│       │   └── submissionRoutes.js
│       ├── services/
│       │   ├── aiService.js
│       │   └── dockerService.js
│       ├── utils/
│       │   └── compareOutput.js
│       ├── app.js
│       └── server.js
│
├── docker/
│   ├── Dockerfile
│   └── runner.js
│
└── README.md
</pre>

---

## 🔄 Submission Flow

**Write Code**  
↓  
**Run / Submit Code**  
↓  
**Docker Code Execution**  
↓  
**Test Case Validation**  
↓  
**Gemini AI Evaluation**  
↓  
**Score + Feedback**  
↓  
**Save Submission**  
↓  
**View Analytics**

---

## 🤖 AI Evaluation

When a solution is submitted, the backend follows this process:

1. The submitted solution is executed against the problem's test cases.
2. The output is compared with the expected output.
3. The solution context and execution result are sent to Gemini.
4. Gemini generates structured feedback and a score.
5. The score is constrained based on whether the solution passed the test cases.
6. The submission, score, and feedback are stored in MongoDB.
7. The frontend displays the evaluation to the user.

---

## ⏱️ Interview Mode

The interview mode is designed to simulate a real technical coding interview.

### Interview Flow

**Start Interview**  
→ **45-Minute Timer**  
→ **Solve Coding Problems**  
→ **Submit Solutions**  
→ **AI Evaluation**  
→ **Interview Summary**  
→ **Performance Analytics**

The interview session tracks submissions made during the session and provides a final performance summary.

---

## 📊 Analytics

The analytics dashboard provides insights into coding performance, including:

- Average AI score
- Submission history
- Successful submissions
- Coding success rate
- Recent activity
- AI-generated interviewer feedback
- Overall interview performance

---

## 🔑 Environment Variables

### Backend

Create:

`backend/.env`

Add:

```env
PORT=5001
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
GEMINI_API_KEY=your_gemini_api_key
GOOGLE_CLIENT_ID=your_google_client_id
```

### Frontend

Create:

`frontend/.env`

Add:

```env
VITE_GOOGLE_CLIENT_ID=your_google_client_id
```

> **Important:** Never commit `.env` files, API keys, database credentials, or other secrets to GitHub.

---

## ⚙️ Installation & Setup

### 1. Clone the repository

```bash
git clone https://github.com/Nilaksh7/ai-developer-interview-simulator.git
cd ai-developer-interview-simulator
```

### 2. Install frontend dependencies

```bash
cd frontend
npm install
```

### 3. Install backend dependencies

Open another terminal or return to the project root:

```bash
cd ../backend
npm install
```

### 4. Configure environment variables

Create:

```text
frontend/.env
backend/.env
```

Add the credentials described in the **Environment Variables** section.

### 5. Start the backend

```bash
cd backend
npm run dev
```

The backend runs on:

```text
http://localhost:5001
```

### 6. Start the frontend

Open another terminal:

```bash
cd frontend
npm run dev
```

Vite will display the local frontend URL in the terminal.

---

## 📜 Available Scripts

### Frontend

```bash
npm run dev
npm run build
npm run lint
npm run preview
```

### Backend

```bash
npm run dev
npm start
```

---

## 🔒 Security

The application includes:

- JWT authentication
- HTTP-only cookies
- Password hashing with bcryptjs
- Protected API routes
- API rate limiting
- Docker-based code execution
- Environment-based secret management

For production deployment, code execution should additionally use strict container isolation, CPU and memory limits, execution timeouts, network restrictions, and sandboxing.

---

## 🚧 Future Improvements

- 🌐 Multi-language code execution
- 🗣️ Conversational AI interviewer
- 🎙️ Voice-based interviews
- 📄 Resume-based interview generation
- 🧠 Adaptive problem difficulty
- 📈 Personalized learning recommendations
- 🏆 Interview leaderboards
- 🔍 Advanced time and space complexity analysis
- ☁️ Production-ready cloud code execution
- 🔄 CI/CD and automated deployment

---

## 🎯 Project Goal

Technical interview preparation is more than simply solving coding problems.

This project aims to provide a realistic environment where developers can:

**Practice → Code → Execute → Get Evaluated → Analyze → Improve**

The platform combines coding practice, interview pressure, automated execution, and AI-powered feedback into a single developer interview simulator.

---

## 👨‍💻 Author

**Nilaksh Berwal**

Computer Science & Engineering  
**NIT Delhi**

GitHub: https://github.com/Nilaksh7

---

⭐ **If you find this project useful, consider starring the repository!**
