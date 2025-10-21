# Getting Started with Create React App
## How to Run This Project

Follow these steps to set up and run the Product Recommendation project:

### 1. Prerequisites

- [Node.js](https://nodejs.org/) (v14 or above recommended)
- [npm](https://www.npmjs.com/) (comes with Node.js)

### 2. Clone the Repository

Clone this repository to your local machine:

```powershell
git clone <repository-url>
cd product-recommendation
```

### 3. Install Dependencies

Install all required npm packages:

```powershell
npm install
```

### 4. Configure Environment Variables

Create a `.env` file in the root directory (if not present) and add your API key:

```env
REACT_APP_AIMLAPI_KEY=your_api_key_here
```

Replace `your_api_key_here` with your actual API key.

### 5. Start the Development Server

Run the following command to start the app:

```powershell
npm start
```

This will launch the app in development mode. Open [http://localhost:3000](http://localhost:3000) in your browser to view it.

### 6. Build for Production

To create a production build, run:

```powershell
npm run build
```

The optimized build will be in the `build` folder.
