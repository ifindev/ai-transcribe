# AI Transcribe

An audio transcriber application that captures audio and transforms it into text using OpenAI's Whisper API.

![Screenshot 2025-04-25 at 10 47 21](https://github.com/user-attachments/assets/ce16edc3-4d4b-4483-9431-a81e08c1b23d)

## Detailed Write up

There is a two-series Medium article explaining everything in this project:

- Part 1: [Basic requirements, flowchart diagrams, and core UI components implementation](https://medium.com/@muhammadarifineffendi/build-an-ai-speech-to-text-app-with-openai-whisper-next-js-part-1-db6546e26fb0)
- Part 2: [Integration with OpenAI SDK with Next.js Server Action](https://medium.com/@muhammadarifineffendi/build-an-ai-speech-to-text-app-with-openai-whisper-next-js-app-router-part-2-992f49700472)

Feel free to read those articles before exploring the codes to get more context about this project.

## Overview

AI Transcribe is an application focused on transcribing audio into text and insights. It captures audio through your device's microphone, processes it, and returns accurate transcriptions within seconds. The project demonstrates how to build a complete audio transcription system with a modern UI using Next.js. See demo video below to see it in action.

https://github.com/user-attachments/assets/163d3734-9294-46d7-bc57-1b4791499109

### Key Features

- **Real-time Audio Capture**: Records audio through your device's microphone
- **Audio Processing**: Chunks and processes audio for optimal transcription performance
- **OpenAI Whisper Integration**: Utilizes the powerful Whisper API for accurate speech-to-text conversion
- **Modern UI**: Built with a clean, responsive interface using Tailwind CSS and Shadcn UI

## Tech Stack

- **Frontend**: Next.js 15, React 19, Tailwind CSS
- **UI Components**: Shadcn UI components
- **API Integration**: OpenAI API, Next.js Server Action
- **State Management**: React Hooks
- **Styling**: Tailwind CSS with class-variance-authority

## Getting Started

### Prerequisites

- Node.js 18.17 or higher
- An OpenAI API key

### Environment Setup

1. Clone the repository:

    ```bash
    git clone https://github.com/ifindev/ai-transcribe.git
    cd ai-transcribe
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

3. Create a `.env.local` file in the root directory with the following variables:

    ```
    OPENAI_API_KEY=your-openai-api-key
    ```

4. Start the development server:

    ```bash
    npm run dev
    ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to use the application.

### Using the Application

1. Click on the record button to start capturing audio
2. Speak clearly into your microphone
3. The application will process your speech and display the transcription in real-time
4. You can pause, resume, or stop the recording at any time
5. Review your transcription history in the recordings list

## Project Structure

- `src/app`: Next.js app router pages and layouts
- `src/components`: Reusable UI components
- `src/hooks`: Custom React hooks for audio recording and processing
- `src/modules`: Feature-specific modules (workspace, etc.)
- `src/services`: Service layer for external API integrations
- `src/actions`: Server actions for API requests
- `src/models`: TypeScript type definitions
- `src/utils`: Utility functions
- `src/libs`: Third party library instantioation

## Future Enhancements

- Support for multiple languages
- Speaker identification
- Searchable transcription history
- Export options (PDF, Word, etc.)
- Automatic summarization using AI

## Troubleshooting

### Microphone Access Issues

Make sure to grant microphone access permission when prompted by your browser. If you accidentally denied it, you may need to reset permissions in your browser settings.

### Transcription Quality Issues

For best results:

- Use a high-quality microphone
- Minimize background noise
- Speak clearly and at a moderate pace
- Position the microphone close to the speaker

## License

MIT License

Copyright (c) 2025 - Muhammad Arifin
