import React from 'react';
import {
  Share2,
  Video,
  Code2,
  ShieldCheck,
  Radio,
  Mic,
  Terminal,
  Cloud,
  Layers,
} from 'lucide-react';

const iconMap = {
  Share2,
  Video,
  Code2,
  ShieldCheck,
  Radio,
  Mic,
  Terminal,
  Cloud,
};

const ServiceIcon = ({ name, className = 'w-6 h-6' }) => {
  const IconComponent = iconMap[name] || Layers;
  return <IconComponent className={className} />;
};

export default ServiceIcon;