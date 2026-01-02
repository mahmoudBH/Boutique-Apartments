# 🏙️ Toronto Boutique Apartments - Immersive Web Experience

[![CI/CD Pipeline](https://github.com/mahmoudBH/Boutique-Apartments/actions/workflows/main.yml/badge.svg)](https://github.com/mahmoudBH/Boutique-Apartments/actions)
[![Live Demo](https://img.shields.io/badge/demo-live-green.svg)](https://toronto-apartments.vercel.app/)

A premium, high-end real estate web application designed to showcase luxury executive rentals in Toronto. Developed by **Mahmoud Bousbih**, this project focuses on **high-performance rendering**, **immersive UI/UX**, and **modern DevOps practices**.

---

## ✨ Key Features
- **Immersive Visuals**: High-resolution image galleries and smooth scroll animations using Framer Motion.
- **Micro-Interactions**: Custom cursor, section transitions, and interactive count-up statistics.
- **Responsive Architecture**: Fully fluid design optimized for mobile, tablet, and desktop.
- **CI/CD Ready**: Automated testing and build pipelines via GitHub Actions.
- **Dockerized Environment**: Production-ready Nginx configuration for high-availability serving.

---

## 🚀 Tech Stack

| Component       | Technology Stack                               |
| :-------------- | :--------------------------------------------- |
| **Frontend** | React 18, Styled Components, Framer Motion     |
| **Infrastructure** | Docker, Docker Compose, Nginx Alpine        |
| **CI/CD** | GitHub Actions                                 |
| **Deployment** | Vercel (Production Hosting)                    |
| **Tools** | ESLint, Prettier, Lucide Icons                 |

---

## 🛠️ Infrastructure & DevOps

This project implements a professional software development lifecycle (SDLC) to ensure scalability and reliability.

### 🐳 Dockerization
The application is containerized using a **multi-stage build** process:
1.  **Build Stage**: Uses `node:18-alpine` to compile the React production build.
2.  **Production Stage**: Uses `nginx:stable-alpine` to serve the static files, ensuring a lightweight and secure footprint.
3.  **Custom Configuration**: A custom `nginx.conf` handles client-side routing (SPA) to prevent 404 errors on refresh.



### ⚙️ CI/CD Workflow
Every push to the `main` branch triggers an automated GitHub Actions pipeline:
* **Code Linting**: Checks for syntax errors and style consistency using ESLint.
* **Build Verification**: Ensures the project compiles successfully before any manual review.
* **Automated Deployment**: Seamless integration with the hosting environment.

---

## 🏃 Setup & Installation

### Local Development
To run the project locally without Docker:
```bash
# Clone the repository
git clone [https://github.com/mahmoudBH/Boutique-Apartments.git](https://github.com/mahmoudBH/Boutique-Apartments.git)

# Install dependencies
npm install

# Start the development server
npm start

```
Docker Deployment
To simulate the production environment locally:
```bash

# Build and launch containers
docker-compose up --build
```

The application will be accessible at http://localhost:3000.


📈 Roadmap (Version 2.0)
The project is evolving from a static showcase to a full-stack platform:

[ ] Backend Integration: Node.js & Express API for dynamic listings.

[ ] Database Storage: MongoDB to manage booking inquiries and property data.

[ ] Admin Dashboard: A secure portal for managing unit availability and pricing.

[ ] Auth System: Protected routes for executive clients and administrators.

👤 Author

Mahmoud Bousbih
💼 Full-Stack Developer

GitHub: @mahmoudBH
Portfolio: https://toronto-apartments.vercel.app/

📄 License
This project is licensed under the MIT License.
Feel free to use, modify, and distribute.