
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Star, Users, Calendar, ArrowRight } from "lucide-react";
import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import BookingForm from "@/components/BookingForm";

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
  city?: string;
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
  label,
  city
}: HotelCardProps) => {
  const [showBookingForm, setShowBookingForm] = useState(false);

  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-xl group border-0 shadow-md">
      <div className="relative overflow-hidden h-56">
        <img 
          src={image} 
          alt={name} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        {label && (
          <Badge className="absolute top-4 right-4 bg-gradient-to-r from-primary to-secondary font-medium">
            {label}
          </Badge>
        )}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 opacity-0 group-hover:opacity-100 transition-opacity">
          <span className="text-white text-sm">{city || "اليمن"}</span>
        </div>
      </div>
      
      <CardContent className="p-6 arabic bg-white">
        <div className="flex justify-between items-start">
          <h3 className="text-xl font-semibold mb-2 text-gray-900">{name}</h3>
          <div className="flex items-center ml-2 bg-yellow-50 px-2 py-1 rounded-md">
            <Star className="h-4 w-4 text-yellow-500 fill-current" />
            <span className="text-sm font-medium ml-1 text-yellow-700">{rating}</span>
            <span className="text-xs text-gray-500 ml-1">({reviewCount})</span>
          </div>
        </div>
        
        <div className="flex items-center text-gray-500 mb-4">
          <MapPin className="h-4 w-4 ml-1" />
          <span className="text-sm line-clamp-1">{location}</span>
        </div>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {amenities.slice(0, 3).map((amenity, index) => (
            <Badge key={index} variant="secondary" className="text-xs bg-gray-100 text-gray-700">
              {amenity}
            </Badge>
          ))}
          {amenities.length > 3 && (
            <Badge variant="secondary" className="text-xs bg-gray-100 text-gray-700">
              +{amenities.length - 3}
            </Badge>
          )}
        </div>
        
        <div className="flex justify-between items-center mt-4 border-t pt-4">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-green-500" />
            <span className="text-sm text-green-600">متاح اليوم</span>
          </div>
          <div className="text-xl font-bold text-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            {price} ر.س
            <span className="text-sm font-normal text-gray-500">/ليلة</span>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="p-0 bg-gray-50">
        <div className="w-full grid grid-cols-2 divide-x divide-x-reverse">
          <Button variant="ghost" size="sm" className="text-gray-600 p-4 rounded-none h-auto">
            تفاصيل أكثر
          </Button>
          <Button 
            onClick={() => setShowBookingForm(true)} 
            className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 text-white rounded-none p-4 h-auto"
          >
            احجز الآن
            <ArrowRight className="mr-2 h-4 w-4" />
          </Button>
        </div>
      </CardFooter>

      <Dialog open={showBookingForm} onOpenChange={setShowBookingForm}>
        <DialogContent className="sm:max-w-[500px]" dir="rtl">
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-center bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              حجز {name}
            </h2>
            <BookingForm 
              hotel={{id, name, location}} 
              onClose={() => setShowBookingForm(false)} 
            />
          </div>
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default HotelCard;
