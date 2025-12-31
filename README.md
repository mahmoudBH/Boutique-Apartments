/**
 * How to Run Locally
 * ------------------
 * 1. Make sure you have Node.js and npm installed. You can download them here:
 *    https://nodejs.org/
 * 
 * 2. Clone the project repository or copy your project files to your local machine.
 * 
 * 3. Open two terminal windows/tabs:
 *    - One for the backend server
 *    - One for the frontend React app
 * 
 * 4. Backend setup:
 *    - Navigate to the backend folder:
 *      cd backend
 *    - Install dependencies:
 *      npm install
 *    - Start the backend server:
 *      npm start
 *    - Backend runs by default on http://localhost:4000
 * 
 * 5. Frontend setup:
 *    - Open a new terminal and navigate to the frontend folder:
 *      cd frontend
 *    - Install dependencies:
 *      npm install
 *    - Make sure your frontend config points to the backend API URL (e.g. via .env file)
 *    - Start the frontend React app:
 *      npm start
 *    - Frontend runs by default on http://localhost:3000
 * 
 * 6. Open your browser and visit:
 *    http://localhost:3000
 *    The app should load and you can see your Footer component in action.
 * 
 * 7. To stop the servers, press Ctrl + C in each terminal window.
 *
 * Notes:
 * - Ensure all styled-components (FooterContainer, FooterGrid, etc.) used in Footer
 *   are correctly defined and imported in your project.
 * - If you use FontAwesome icons as shown, make sure the fontawesome CSS is included
 *   in your index.html or installed via npm/yarn.
 * - If you encounter CORS errors, make sure the backend server allows requests
 *   from the frontend origin (http://localhost:3000).
 */
