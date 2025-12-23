# 💬 Talkies

> A modern chat application built with React — inspired by apps like WhatsApp and Messenger.

**Talkies** (a.k.a App Chat) is a real-time messaging app created to provide a smooth communication experience using modern web technologies.  
It leverages **React**, **Vite**, **Appwrite** for backend services, and **TanStack Query** for efficient data fetching and state management. :contentReference[oaicite:1]{index=1}

---

## 🚀 Features

- 💬 Real-time messaging  
- 👤 User authentication with Appwrite  
- 📁 Organized project structure  
- ⚡ Fast, reactive UI with React & Vite  
- 🧠 Smart data handling with TanStack Query

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | React + JS |
| Bundler | Vite |
| Backend | Appwrite |
| Data Fetching | TanStack Query |
| Styling | Tailwind CSS |
| Linting | ESLint |

---

## 📂 Project Structure

```text
public/
src/
├── components/
├── pages/
├── services/
├── styles/
.gitignore
package.json
vite.config.js
tailwind.config.js
🚀 Getting Started
📦 Requirements
Before running locally, make sure you have:

Node.js 16+

npm or yarn

Appwrite project (self-hosted or cloud)

🛠️ Installation
bash
Copiar código
git clone https://github.com/Estenvanos/talkies.git
cd talkies
npm install
# or
yarn
🔑 Environment Variables
Create a .env file in the root of the project and add your Appwrite configuration:

env
Copiar código
VITE_APPWRITE_ENDPOINT=https://your-appwrite-url
VITE_APPWRITE_PROJECT_ID=your-project-id
📡 Run Locally
bash
Copiar código
npm run dev
# or
yarn dev
Open your browser at: http://localhost:5173

🤝 Contributing
Contributions are welcome! If you’d like to help improve Talkies:

Fork the repository

Create your feature branch

bash
Copiar código
git checkout -b feature/my-feature
Make your changes

Commit and push

Open a Pull Request!

