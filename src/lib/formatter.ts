/**
 * Formats a time value to minutes and seconds.
 * @param time - The time value to format.
 * @returns A string representing the time in minutes and seconds.
 *
 * @example
 * formatTimeToMinutesAndSeconds(60)    // "01:00"
 * formatTimeToMinutesAndSeconds(120)   // "02:00"
 * formatTimeToMinutesAndSeconds(120.5) // "02:00"
 * formatTimeToMinutesAndSeconds(120.5) // "02:00"
 * formatTimeToMinutesAndSeconds(120.5) // "02:00"
 * formatTimeToMinutesAndSeconds(120.5) // "02:00"
 */
export const formatTimeToMinutesAndSeconds = (time: number) => {
    if (isNaN(time) || !isFinite(time)) return '00:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
};
