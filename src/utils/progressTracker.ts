import { TimeInterval } from '../types';

export const mergeIntervals = (intervals: TimeInterval[]): TimeInterval[] => {
  if (intervals.length <= 1) return intervals;

  const sorted = [...intervals].sort((a, b) => a.start - b.start);
  const merged: TimeInterval[] = [sorted[0]];

  for (let i = 1; i < sorted.length; i++) {
    const current = sorted[i];
    const previous = merged[merged.length - 1];

    if (current.start <= previous.end) {
      previous.end = Math.max(previous.end, current.end);
    } else {
      merged.push(current);
    }
  }

  return merged;
};

export const calculateProgress = (
  intervals: TimeInterval[],
  totalDuration: number
): number => {
  if (!totalDuration) return 0;

  const merged = mergeIntervals(intervals);
  const watchedTime = merged.reduce(
    (total, interval) => total + (interval.end - interval.start),
    0
  );

  return Math.min((watchedTime / totalDuration) * 100, 100);
};

export const addInterval = (
  intervals: TimeInterval[],
  newInterval: TimeInterval
): TimeInterval[] => {
  return mergeIntervals([...intervals, newInterval]);
};

export const saveProgress = (videoId: string, progress: any) => {
  localStorage.setItem(`video-progress-${videoId}`, JSON.stringify(progress));
};

export const loadProgress = (videoId: string) => {
  const saved = localStorage.getItem(`video-progress-${videoId}`);
  if (!saved) {
    return {
      intervals: [],
      totalProgress: 0,
      lastPosition: 0,
    };
  }
  return JSON.parse(saved);
};