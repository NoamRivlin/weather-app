# Weather App

This is a web-based weather application that provides current weather conditions and a five-day forecast. The application is built using Vite, TypeScript, Chakra UI, Redux, and Express. It leverages the AccuWeather API to fetch weather data.

## Screenshots and videos
<img width="1707" alt="screenshot" src="https://github.com/user-attachments/assets/f1932fa6-26a0-43ae-8549-96734f1f65ab" />



###### Functionality


https://github.com/user-attachments/assets/d742cf64-f575-43b4-ab5d-3ac80935f8fd




###### Responsiveness


https://github.com/user-attachments/assets/92670d8c-9c9e-41fc-b0bf-97dd79905de1






## Getting Started

Before running the project, please note that you need an AccuWeather API key for authentication. The free tier of the AccuWeather API offers 50 daily requests. If you plan to fork and run the project, obtain your API key [here](https://developer.accuweather.com/) and replace the placeholders in the code.

### Backend

#### Installation

```bash
cd backend
npm install
```

#### Usage

```bash
# Run in development mode
npm run dev

# Build for production
npm run build

# Start in production mode
npm start
```

### Frontend

#### Installation

```bash
cd weather-app-frontend
npm install
```

#### Usage

```bash
# Run in development mode
npm run dev

# Build for production
npm run build

# Preview the production build
npm run preview
```

## Project Structure

- **backend:** Express server for handling API requests.
  - **Dependencies:**
    - axios
    - cors
    - dotenv
    - express
  - **Dev Dependencies:**
    - @types/cors
    - @types/express
    - nodemon
    - ts-node
    - typescript

- **frontend:** Vite-based React application for the user interface.
  - **Dependencies:**
    - Chakra UI
    - Axios
    - Redux Toolkit
    - React Router
    - Chakra React Select
    - lodash
  - **Dev Dependencies:**
    - TypeScript
    - Vite

 

Visit [http://localhost:${process.env.PORT || 3000}](http://localhost:${process.env.PORT || 3000}) in your browser.

Feel free to fork, modify, and adapt the code for your needs! If you encounter any issues or have questions, please refer to the project's documentation or open an issue on the repository.
