export interface TimeInterval {
  start: number;
  end: number;
}

export interface VideoProgress {
  intervals: TimeInterval[];
  totalProgress: number;
  lastPosition: number;
}