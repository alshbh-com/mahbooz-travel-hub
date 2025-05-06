
import { useState, useEffect } from 'react';
import ReviewItem from './ReviewItem';

interface HotelReviewsProps {
  hotelId: number;
}

const HotelReviews = ({ hotelId }: HotelReviewsProps) => {
  const [reviews, setReviews] = useState([
    {
      id: 1,
      user: "أحمد محمد",
      rating: 5,
      date: "2025-01-15",
      comment: "إقامة رائعة! الفندق نظيف جداً والخدمة ممتازة. سأعود بالتأكيد مرة أخرى.",
      userImage: "https://i.pravatar.cc/150?img=1"
    },
    {
      id: 2,
      user: "سارة عبدالله",
      rating: 4,
      date: "2025-02-10",
      comment: "موقع ممتاز قريب من جميع المعالم السياحية. الإفطار كان شهياً والغرف مريحة جداً.",
      userImage: "https://i.pravatar.cc/150?img=5"
    },
    {
      id: 3,
      user: "فاطمة العلي",
      rating: 5,
      date: "2025-03-05",
      comment: "من أفضل الفنادق التي أقمت بها! المرافق ممتازة والموظفون ودودون ومتعاونون.",
      userImage: "https://i.pravatar.cc/150?img=10"
    },
    {
      id: 4,
      user: "خالد العمري",
      rating: 4,
      date: "2025-03-20",
      comment: "تجربة ممتعة، الغرف واسعة ونظيفة. المسبح رائع وخدمة الغرف سريعة.",
      userImage: "https://i.pravatar.cc/150?img=12"
    },
    {
      id: 5,
      user: "نورة المالكي",
      rating: 5,
      date: "2025-04-02",
      comment: "فندق ممتاز من جميع النواحي. الإطلالة رائعة والخدمات متكاملة. أنصح به بشدة.",
      userImage: "https://i.pravatar.cc/150?img=25"
    }
  ]);

  return (
    <div className="space-y-6 mt-8">
      <h3 className="text-2xl font-bold">التعليقات والتقييمات</h3>
      {reviews.map((review) => (
        <ReviewItem key={review.id} review={review} />
      ))}
    </div>
  );
};

export default HotelReviews;
