'use client';

import { Star } from 'lucide-react';
import React from 'react';

interface RatingProps {
  rating: number;
}

const Rating = ({ rating }: RatingProps) => {
  return (
    <div className="flex items-center gap-1">
      <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
      <span className="text-sm text-gray-600">{rating.toFixed(1)}</span>
    </div>
  );
};

export default Rating;