/**
 * Stop all tracks in a MediaStream
 * @param stream - MediaStream
 */
export const stopMediaTracks = (stream: MediaStream) => {
    stream.getTracks().forEach((track) => track.stop());
};

/**
 * Create audio blob and URL from chunks
 * @param chunks - Blob[]
 * @param type - string
 * @returns { blob: Blob, url: string }
 */
export const createAudioBlob = (chunks: Blob[], type = 'audio/webm') => {
    const blob = new Blob(chunks, { type });
    return { blob, url: URL.createObjectURL(blob) };
};
