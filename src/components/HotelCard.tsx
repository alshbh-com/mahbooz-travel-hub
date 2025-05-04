
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Star, Users, Calendar, ArrowRight } from "lucide-react";

interface HotelCardProps {
  id: number;
  name: string;
  location: string;
  image: string;
  price: number;
  rating: number;
  reviewCount: number;
  amenities: string[];
  label?: string;
}

const HotelCard = ({ 
  id, 
  name, 
  location, 
  image, 
  price, 
  rating, 
  reviewCount, 
  amenities,
  label
}: HotelCardProps) => {
  // وظيفة لفتح الواتساب عند حجز
  const handleBookNow = () => {
    const whatsappNumber = "201204486263";
    const message = `مرحباً، أود حجز ${name} في ${location}`;
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-xl">
      <div className="relative overflow-hidden h-56">
        <img 
          src={image} 
          alt={name} 
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
        />
        {label && (
          <Badge className="absolute top-4 right-4 bg-primary">
            {label}
          </Badge>
        )}
      </div>
      
      <CardContent className="p-6 arabic">
        <div className="flex justify-between items-start">
          <h3 className="text-xl font-semibold mb-2">{name}</h3>
          <div className="flex items-center ml-2">
            <Star className="h-4 w-4 text-yellow-400 fill-current" />
            <span className="text-sm font-medium ml-1">{rating}</span>
            <span className="text-xs text-gray-500 ml-1">({reviewCount})</span>
          </div>
        </div>
        
        <div className="flex items-center text-gray-500 mb-4">
          <MapPin className="h-4 w-4 ml-1" />
          <span className="text-sm">{location}</span>
        </div>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {amenities.map((amenity, index) => (
            <Badge key={index} variant="secondary" className="text-xs">
              {amenity}
            </Badge>
          ))}
        </div>
        
        <div className="flex justify-between items-center mt-4">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-gray-500" />
            <span className="text-sm text-gray-500">متاح اليوم</span>
          </div>
          <div className="text-xl font-bold text-primary">
            {price} ر.س
            <span className="text-sm font-normal text-gray-500">/ليلة</span>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="p-6 pt-0 flex justify-between items-center">
        <Button variant="ghost" size="sm" className="text-gray-500">
          تفاصيل أكثر
        </Button>
        <Button onClick={handleBookNow}>
          احجز الآن
          <ArrowRight className="mr-2 h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default HotelCard;
