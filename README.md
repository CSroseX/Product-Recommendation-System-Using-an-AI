# AI-Powered Product Recommendation System

A sophisticated product recommendation engine leveraging artificial intelligence and natural language processing to deliver personalized product suggestions based on user queries. This application demonstrates the integration of modern frontend technologies with AI-driven recommendation algorithms to create an intuitive, responsive, and intelligent e-commerce search experience.

## Key Technical Achievements

- Implemented natural language understanding using AI/ML APIs for semantic product search
- Architected a responsive single-page application with React 19 and React Router DOM for seamless client-side navigation
- Integrated TanStack React Query for efficient server state management and optimized data fetching
- Designed an elegant, animated UI using Framer Motion and Tailwind CSS with gradient-based design system
- Developed JSON schema-based structured responses for consistent AI recommendation outputs
- Built scalable component architecture following React best practices and modern hooks patterns

## Tech Stack

<img src="https://img.shields.io/badge/React-61DAFB?logo=react&logoColor=black&style=for-the-badge"> <img src="https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black&style=for-the-badge"> <img src="https://img.shields.io/badge/TailwindCSS-06B6D4?logo=tailwindcss&logoColor=white&style=for-the-badge"> <img src="https://img.shields.io/badge/React_Router-CA4245?logo=reactrouter&logoColor=white&style=for-the-badge"> <img src="https://img.shields.io/badge/Framer_Motion-0055FF?logo=framer&logoColor=white&style=for-the-badge"> <img src="https://img.shields.io/badge/Node.js-339933?logo=nodedotjs&logoColor=white&style=for-the-badge"> <img src="https://img.shields.io/badge/npm-CB3837?logo=npm&logoColor=white&style=for-the-badge">

## How to Run This Project

Follow these steps to set up and run the Product Recommendation System:

### 1. Prerequisites

Ensure you have the following installed on your development environment:

- [Node.js](https://nodejs.org/) (v14 or above recommended)
- [npm](https://www.npmjs.com/) (comes bundled with Node.js)

### 2. Clone the Repository

Clone this repository to your local machine:

```bash
git clone <repository-url>
cd product-recommendation
```

### 3. Install Dependencies

Install all required npm packages using the package manager:

```bash
npm install
```

### 4. Configure Environment Variables

Create a `.env` file in the root directory (if not present) and configure your API credentials:

```env
REACT_APP_AIMLAPI_KEY=your_api_key_here
```

Replace `your_api_key_here` with your actual AI/ML API key.

### 5. Start the Development Server

Launch the application in development mode:

```bash
npm start
```

This will start the development server. Open [http://localhost:3000](http://localhost:3000) in your browser to view the application. The page will automatically reload when you make changes to the source code.

### 6. Build for Production

To create an optimized production build:

```bash
npm run build
```

The production-ready build will be generated in the `build` folder, with minimized bundles and optimized assets ready for deployment.
