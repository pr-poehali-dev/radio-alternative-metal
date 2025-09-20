import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import Icon from "@/components/ui/icon";

interface Track {
  title: string;
  artist: string;
  duration: string;
  genre: string;
  audioUrl?: string;
}

interface AudioPlayerProps {
  track: Track;
  isPlaying: boolean;
  onPlayPause: () => void;
  onNext?: () => void;
  onPrevious?: () => void;
}

const AudioPlayer = ({ track, isPlaying, onPlayPause, onNext, onPrevious }: AudioPlayerProps) => {
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(75);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Wave animation bars
  const WaveVisualizer = ({ isPlaying }: { isPlaying: boolean }) => {
    const bars = Array.from({ length: 5 }, (_, i) => i);
    
    return (
      <div className="flex items-center gap-1 h-8">
        {bars.map((bar) => (
          <div
            key={bar}
            className={`w-1 bg-gradient-to-t from-electric-orange to-secondary rounded-full transition-all duration-300 ${
              isPlaying 
                ? `animate-pulse h-${4 + (bar % 3) * 2}` 
                : 'h-2'
            }`}
            style={{
              animationDelay: `${bar * 0.1}s`,
              animationDuration: `${0.6 + (bar * 0.1)}s`
            }}
          />
        ))}
      </div>
    );
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', updateDuration);

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', updateDuration);
    };
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.play().catch(console.error);
    } else {
      audio.pause();
    }
  }, [isPlaying]);

  const handleSeek = (value: number[]) => {
    const audio = audioRef.current;
    if (audio) {
      audio.currentTime = value[0];
      setCurrentTime(value[0]);
    }
  };

  const handleVolumeChange = (value: number[]) => {
    const audio = audioRef.current;
    if (audio) {
      audio.volume = value[0] / 100;
      setVolume(value[0]);
    }
  };

  return (
    <Card className="bg-card border-2 border-purple-accent/30 backdrop-blur-md">
      <CardContent className="p-6">
        {/* Hidden audio element */}
        <audio 
          ref={audioRef}
          src={track.audioUrl || "/placeholder-audio.mp3"}
          preload="metadata"
        />

        <div className="space-y-4">
          {/* Track Info & Wave Visualizer */}
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <h3 className="text-lg font-heading font-bold text-white">{track.title}</h3>
              <p className="text-gray-400 text-sm">{track.artist}</p>
              <span className="text-xs text-gray-500 bg-purple-accent/20 px-2 py-1 rounded-full">
                {track.genre}
              </span>
            </div>
            <WaveVisualizer isPlaying={isPlaying} />
          </div>

          {/* Progress Bar */}
          <div className="space-y-2">
            <Slider
              value={[currentTime]}
              max={duration || 100}
              step={1}
              onValueChange={handleSeek}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-gray-400">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {onPrevious && (
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={onPrevious}
                  className="text-gray-400 hover:text-electric-orange"
                >
                  <Icon name="SkipBack" size={16} />
                </Button>
              )}
              
              <Button
                onClick={onPlayPause}
                className="bg-gradient-to-r from-electric-orange to-primary hover:scale-110 transition-all duration-300 text-white rounded-full w-12 h-12 p-0"
              >
                <Icon name={isPlaying ? "Pause" : "Play"} size={20} />
              </Button>
              
              {onNext && (
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={onNext}
                  className="text-gray-400 hover:text-electric-orange"
                >
                  <Icon name="SkipForward" size={16} />
                </Button>
              )}
            </div>

            {/* Volume Control */}
            <div className="flex items-center gap-2 w-24">
              <Icon name="Volume2" size={16} className="text-gray-400" />
              <Slider
                value={[volume]}
                max={100}
                step={1}
                onValueChange={handleVolumeChange}
                className="flex-1"
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AudioPlayer;