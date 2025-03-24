import React from 'react';
import { MessageCircle } from 'lucide-react';
import { groupsOrderTemplate } from '@/shared/constants/common';

interface DynamicIconProps {
  className?: string;
  color?: string;
  id: number;
}

export const DynamicIcon: React.FC<DynamicIconProps> = ({
  className,
  id,
  color,
}) => {
  const IconComponent =
    groupsOrderTemplate.find(icon => icon.id === id)?.icon || MessageCircle; // Если код не найден, используем запасную иконку

  return <IconComponent className={className} color={color} />;
};
