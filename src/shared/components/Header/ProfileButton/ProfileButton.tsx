import React from 'react';
import { UserRound } from 'lucide-react';

interface ProfileButtonProps {
  className?: string;
}

export const ProfileButton: React.FC<ProfileButtonProps> = ({ className }) => {
  return (
    <div className={className}>
      <UserRound size={32} />
    </div>
  );
};
