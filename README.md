# Weather App

This is a web-based weather application that provides current weather conditions and a five-day forecast. The application is built using Vite, TypeScript, Chakra UI, Redux, and Express. It leverages the AccuWeather API to fetch weather data.

## Screenshots and videos
![Screenshot 2023-11-28 at 15 46 59](https://github.com/NoamRivlin/noam-rivlin-19-11-23/assets/88899637/4fa1c60e-082e-42ce-94cb-83b3b78e4712)


###### Functionality
https://github.com/NoamRivlin/noam-rivlin-19-11-23/assets/88899637/deab78c2-b7bc-4c96-9429-4bcf19384121


###### Responsiveness
https://github.com/NoamRivlin/noam-rivlin-19-11-23/assets/88899637/0c40e6d0-0d52-4d58-8e1c-6c05ffbe6c57




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
