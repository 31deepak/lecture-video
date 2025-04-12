import React, { useEffect, useRef, useState } from 'react';
import ReactPlayer from 'react-player';
import { Play, Pause } from 'lucide-react';
import { TimeInterval, VideoProgress } from '../types';
import {
  addInterval,
  calculateProgress,
  loadProgress,
  saveProgress,
} from '../utils/progressTracker';

interface VideoPlayerProps {
  videoId: string;
  url: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ videoId, url }) => {
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState<VideoProgress>(loadProgress(videoId));
  const [duration, setDuration] = useState(0);
  const lastPlayedTime = useRef(0);
  const playerRef = useRef<ReactPlayer>(null);

  useEffect(() => {
    const savedProgress = loadProgress(videoId);
    setProgress(savedProgress);
    if (playerRef.current && savedProgress.lastPosition) {
      playerRef.current.seekTo(savedProgress.lastPosition, 'seconds');
    }
  }, [videoId]);

  const handleProgress = ({ playedSeconds }: { playedSeconds: number }) => {
    if (!playing) return;

    const currentTime = Math.floor(playedSeconds);
    if (currentTime === Math.floor(lastPlayedTime.current)) return;

    const newInterval: TimeInterval = {
      start: Math.floor(lastPlayedTime.current),
      end: currentTime,
    };

    const updatedIntervals = addInterval(progress.intervals, newInterval);
    const totalProgress = calculateProgress(updatedIntervals, duration);

    const newProgress = {
      intervals: updatedIntervals,
      totalProgress,
      lastPosition: currentTime,
    };

    setProgress(newProgress);
    saveProgress(videoId, newProgress);
    lastPlayedTime.current = currentTime;
  };

  const handleDuration = (duration: number) => {
    setDuration(duration);
  };

  const handlePlayPause = () => {
    setPlaying(!playing);
    if (!playing) {
      lastPlayedTime.current = playerRef.current?.getCurrentTime() || 0;
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="relative aspect-video bg-black rounded-lg overflow-hidden">
        <ReactPlayer
          ref={playerRef}
          url={url}
          width="100%"
          height="100%"
          playing={playing}
          onProgress={handleProgress}
          onDuration={handleDuration}
          progressInterval={1000}
          controls={false}
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
          <div className="flex items-center gap-4">
            <button
              onClick={handlePlayPause}
              className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
            >
              {playing ? (
                <Pause className="w-6 h-6 text-white" />
              ) : (
                <Play className="w-6 h-6 text-white" />
              )}
            </button>
            <div className="flex-1">
              <div className="h-1 bg-white/30 rounded-full overflow-hidden">
                <div
                  className="h-full bg-blue-500 transition-all duration-300"
                  style={{ width: `${progress.totalProgress}%` }}
                />
              </div>
              <div className="mt-1 text-sm text-white/90">
                Progress: {Math.round(progress.totalProgress)}%
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;