# Bouncing Elephant Recorder

A fun web application that creates a DVD-style bouncing elephant animation with recording capabilities.

## Prerequisites

Before starting, make sure you have these installed on your computer:
1. [Node.js](https://nodejs.org/) (which includes npm)
2. [Git](https://git-scm.com/downloads)
3. A code editor (like Cursor)

## Step-by-Step Setup Guide

### 1. Clone the Repository
Open your terminal (Command Prompt on Windows or Terminal on Mac) and run:
```bash
git clone https://github.com/0xKMG/Bouncing-Elephant-Recorder.git
cd bouncing-elephant
```

### 2. Install Dependencies
In the project directory, run:
```bash
npm install
```

### 3. Add the Elephant Image
- Place your `elephant.png` file in the `public` folder
- Make sure the file is named exactly `elephant.png`

### 4. Start the Server
Run the following command:
```bash
node server.js
```
You should see: "Server running at http://localhost:3000"

### 5. View the Application
- Open your web browser
- Go to: `http://localhost:3000`
- You should see the bouncing elephant animation

## Using the Recorder

1. **Start Recording**
   - Click the "Start Recording" button at the bottom of the screen
   - The elephant animation will be recorded

2. **Stop Recording**
   - Click the "Stop Recording" button when you want to finish
   - The recording will automatically download as a WebM video file
   - The file will be named `bouncing-elephant.webm`

## Important Notes

- The recording will be saved in WebM format, which works in most modern browsers
- You can convert the WebM file to MP4 using online converters if needed
- The elephant will bounce around the screen continuously until you close the browser window
- If you need to stop the server, press `Ctrl + C` in the terminal

## Troubleshooting

If you see any errors:
1. Make sure Node.js is installed correctly
2. Verify that the `elephant.png` file is in the correct location
3. Check that port 3000 isn't being used by another application
4. Try closing and reopening your terminal

## Using Cursor IDE

If you're using Cursor IDE for making changes:

1. **Opening the Project**
   - Open Cursor IDE
   - File → Open Folder → Select the bouncing-elephant folder

2. **Getting Context**
   - Use `Command + Enter` (Mac) or `Ctrl + Enter` (Windows) to activate the AI assistant
   - This will help you understand the codebase and make informed changes

3. **Making Changes**
   - Always save your changes before running the application
   - Restart the server after making changes to see the updates

## Need Help?

If you run into any issues, try these steps:
1. Make sure all files are in their correct locations
2. Verify that you're in the correct directory when running commands
3. Check that all the code files match the repository versions
4. Ensure your browser is up to date
```
