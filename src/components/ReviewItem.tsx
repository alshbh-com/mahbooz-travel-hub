
import React from 'react';
import { Star } from 'lucide-react';

interface ReviewItemProps {
  review: {
    id: number;
    user: string;
    rating: number;
    date: string;
    comment: string;
    userImage?: string;
  };
}

const ReviewItem = ({ review }: ReviewItemProps) => {
  const formattedDate = new Date(review.date).toLocaleDateString('ar-EG', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  
  return (
    <div className="border-b pb-6">
      <div className="flex items-start">
        <div className="ml-4 shrink-0">
          <div className="h-10 w-10 rounded-full overflow-hidden bg-gray-200">
            {review.userImage && (
              <img 
                src={review.userImage} 
                alt={review.user} 
                className="h-full w-full object-cover"
              />
            )}
          </div>
        </div>
        <div className="flex-1">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
            <h4 className="font-semibold">{review.user}</h4>
            <div className="flex items-center mt-1 sm:mt-0">
              <div className="flex items-center ml-2">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star 
                    key={i}
                    className={`h-4 w-4 ${
                      i < review.rating 
                        ? 'text-yellow-400 fill-current' 
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm text-gray-500">{formattedDate}</span>
            </div>
          </div>
          <p className="text-gray-700">{review.comment}</p>
        </div>
      </div>
    </div>
  );
};

export default ReviewItem;
