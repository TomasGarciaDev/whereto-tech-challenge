# 10 Most Recent Album Carousel

A React TypeScript application that displays 10 most recent album covers and track listings from a Subsonic API, featuring a visually appealing carousel where the center image is scaled larger while side images are smaller.

## Features

- **Dynamic Album Carousel**: Displays album covers with the center image scaled larger and side images smaller
- **Track Listings**: Shows track listings for the currently selected album
- **Keyboard Navigation**: Navigate through albums using arrow keys
- **Responsive Design**: Works on various screen sizes
- **Accessibility**: ARIA attributes and keyboard support for better accessibility
- **Error Handling**: Graceful error handling with retry functionality
- **Loading States**: User-friendly loading indicators

## Technologies Used

- **React**: Frontend library for building the user interface
- **TypeScript**: Type safety and better developer experience
- **CSS**: Custom styling for layout, animations, and responsive design
- **Subsonic API**: Backend API for fetching album data

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm or yarn

### Installation

1. Clone the repository:

   ```
   git clone <repository-url>
   cd whereto
   ```

2. Install dependencies:

   ```
   npm install
   ```

   or

   ```
   yarn install
   ```

3. Start the development server:

   ```
   npm start
   ```

   or

   ```
   yarn start
   ```

4. Open your browser and navigate to `http://localhost:3000`

## Usage

### Navigating the Carousel

- **Mouse**: Click the left and right arrow buttons to navigate between albums
- **Keyboard**: Use the left and right arrow keys to navigate between albums

### Viewing Track Listings

The track listing for the currently selected album is automatically displayed below the carousel.

## Project Structure

- `src/App.tsx`: Main application component that fetches data from the Subsonic API
- `src/componets/Carrusel.tsx`: Carousel component that displays album covers
- `src/componets/Carrusel.css`: Styling for the carousel component
- `src/App.css`: Global application styling

## API Integration

The application integrates with the Subsonic API to fetch album data. It makes the following API calls:

1. `getAlbumList2`: Fetches a list of albums
2. `getAlbum`: Fetches details for a specific album, including tracks
3. `getCoverArt`: Fetches album cover images

## License

This project is licensed under the MIT License - see the LICENSE file for details.
