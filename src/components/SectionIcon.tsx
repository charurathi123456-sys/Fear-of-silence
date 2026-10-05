import React from 'react';
import {
  Heart,
  Shield,
  Compass,
  Moon,
  Headphones,
  Sparkles,
  MessageCircle,
  Volume2,
  Brain,
  Smartphone,
  Wind,
  Clock,
  BookOpen,
} from 'lucide-react';

interface SectionIconProps {
  name?: string;
  className?: string;
}

export const SectionIcon: React.FC<SectionIconProps> = ({
  name,
  className = 'w-5 h-5 text-[#936B45]',
}) => {
  switch (name) {
    case 'heart':
      return <Heart className={className} />;
    case 'shield':
      return <Shield className={className} />;
    case 'compass':
      return <Compass className={className} />;
    case 'moon':
      return <Moon className={className} />;
    case 'headphones':
      return <Headphones className={className} />;
    case 'sparkles':
      return <Sparkles className={className} />;
    case 'message':
      return <MessageCircle className={className} />;
    case 'volume':
      return <Volume2 className={className} />;
    case 'brain':
      return <Brain className={className} />;
    case 'smartphone':
      return <Smartphone className={className} />;
    case 'wind':
      return <Wind className={className} />;
    case 'clock':
      return <Clock className={className} />;
    default:
      return <BookOpen className={className} />;
  }
};
