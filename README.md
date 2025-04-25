# AI Transcribe

A real-time audio transcription application built with Next.js that allows users to record audio and get instant transcriptions using OpenAI's Whisper API.

## Detailed Write up

There is a two-series Medium article explaining everything in this project:

- Part 1: [Basic requirements, flowchart diagrams, and core UI components implementation](https://medium.com/@muhammadarifineffendi/build-an-ai-speech-to-text-app-with-openai-whisper-next-js-part-1-db6546e26fb0)
- Part 2: [Integration with OpenAI SDK with Next.js Server Action](https://medium.com/@muhammadarifineffendi/build-an-ai-speech-to-text-app-with-openai-whisper-next-js-app-router-part-2-992f49700472)

Feel free to read those articles before exploring the codes to get more context about this project.

## Features

- **Audio Recording**: Capture audio directly from your browser using the MediaRecorder API
- **Real-time Transcription**: Convert speech to text using OpenAI's Whisper API
- **Simple User Interface**: Clean, intuitive UI for recording and viewing transcriptions
- **Error Handling**: Proper error management for recording and transcription issues

## Tech Stack

- **Frontend Framework**: Next.js 15.3.0 with React 19
- **Styling**: Tailwind CSS
- **Audio Processing**: MediaRecorder API for capturing audio
- **Transcription API**: OpenAI Whisper API for speech-to-text conversion
- **Audio Visualization**: WaveSurfer.js for audio waveform display

## Getting Started

### Prerequisites

- Node.js 18.x or later
- OpenAI API key

### Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/yourusername/ai-transcribe.git
    cd ai-transcribe
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

3. Create a `.env.local` file in the root directory with your OpenAI API key:

    ```
    OPENAI_API_KEY=your_openai_api_key_here
    ```

4. Start the development server:

    ```bash
    npm run dev
    ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to use the application.

## How It Works

1. The user clicks the "Start Recording" button to begin capturing audio through their microphone
2. The application uses the MediaRecorder API to record audio in chunks
3. When the user clicks "Stop Recording", the audio chunks are combined into a single Blob
4. The audio Blob is sent to the server-side transcription action
5. The server uses OpenAI's Whisper API to transcribe the audio to text
6. The transcription result is displayed on the screen

## Project Structure

- `src/app`: Main Next.js application routes and layouts
- `src/components`: React components for UI elements
- `src/services`: Services for interacting with external APIs
- `src/libs`: Utility libraries and configurations
- `src/models`: TypeScript interfaces and types

## Environment Variables

- `OPENAI_API_KEY`: Your OpenAI API key for accessing the Whisper API

## License

MIT License

Copyright (c) 2025 Muhammad Arifin
