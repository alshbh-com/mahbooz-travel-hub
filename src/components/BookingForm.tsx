
import React, { useState } from 'react';
import { Calendar, Users, ArrowRight } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { 
  Popover,
  PopoverContent,
  PopoverTrigger, 
} from "@/components/ui/popover";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { format } from 'date-fns';
import { ar } from 'date-fns/locale';
import { toast } from "sonner";

interface Room {
  id: number;
  type: string;
  price: number;
}

interface Hotel {
  id: number;
  name: string;
  location: string;
}

interface BookingFormProps {
  hotel: Hotel;
  room?: Room;
}

const BookingForm = ({ hotel, room }: BookingFormProps) => {
  const [startDate, setStartDate] = useState<Date | undefined>(new Date());
  const [endDate, setEndDate] = useState<Date | undefined>(
    new Date(new Date().setDate(new Date().getDate() + 1))
  );
  const [guests, setGuests] = useState("2");
  const [loading, setLoading] = useState(false);

  const price = room ? room.price : (hotel as any).price;
  const nights = startDate && endDate 
    ? Math.max(1, Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)))
    : 1;
  const totalPrice = price * nights;

  const handleBookNow = () => {
    setLoading(true);
    
    setTimeout(() => {
      setLoading(false);
      
      // تكوين رسالة WhatsApp
      const roomInfo = room ? `نوع الغرفة: ${room.type}, ` : '';
      const checkIn = startDate ? `تاريخ الوصول: ${format(startDate, 'yyyy-MM-dd')}، ` : '';
      const checkOut = endDate ? `تاريخ المغادرة: ${format(endDate, 'yyyy-MM-dd')}، ` : '';
      const guestsInfo = `عدد الضيوف: ${guests}`;
      const message = `مرحباً، أود حجز غرفة في ${hotel.name} - ${hotel.location}. ${roomInfo}${checkIn}${checkOut}${guestsInfo}`;
      
      // فتح WhatsApp
      const whatsappNumber = "201204486263";
      const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
      window.open(whatsappUrl, '_blank');
      
      toast.success("تم إرسالك إلى واتساب لإكمال الحجز");
    }, 1000);
  };

  return (
    <div className="space-y-4">
      <div className="text-xl font-bold text-primary mb-4">
        {price} ر.س
        <span className="text-sm font-normal text-gray-500">/ليلة</span>
      </div>
      
      <div className="space-y-3">
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-2">
            <Label htmlFor="checkin">تاريخ الوصول</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full flex justify-between items-center"
                >
                  {startDate ? format(startDate, 'dd/MM/yyyy') : "اختر تاريخ"}
                  <Calendar className="h-4 w-4 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <CalendarComponent
                  mode="single"
                  selected={startDate}
                  onSelect={setStartDate}
                  disabled={(date) => date < new Date()}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="checkout">تاريخ المغادرة</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full flex justify-between items-center"
                >
                  {endDate ? format(endDate, 'dd/MM/yyyy') : "اختر تاريخ"}
                  <Calendar className="h-4 w-4 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <CalendarComponent
                  mode="single"
                  selected={endDate}
                  onSelect={setEndDate}
                  disabled={(date) => 
                    date < new Date() || 
                    (startDate ? date <= startDate : false)
                  }
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="guests">عدد الضيوف</Label>
          <Select value={guests} onValueChange={setGuests}>
            <SelectTrigger id="guests" className="w-full">
              <SelectValue placeholder="عدد الضيوف" />
            </SelectTrigger>
            <SelectContent position="popper">
              <SelectItem value="1">1 شخص</SelectItem>
              <SelectItem value="2">2 أشخاص</SelectItem>
              <SelectItem value="3">3 أشخاص</SelectItem>
              <SelectItem value="4">4 أشخاص</SelectItem>
              <SelectItem value="5">5 أشخاص</SelectItem>
              <SelectItem value="6">6 أشخاص</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div className="border-t border-b py-4 my-4">
        <div className="flex justify-between mb-2">
          <span className="text-gray-600">{price} ر.س × {nights} ليلة</span>
          <span>{totalPrice} ر.س</span>
        </div>
        <div className="flex justify-between mb-2">
          <span className="text-gray-600">رسوم الخدمة</span>
          <span>50 ر.س</span>
        </div>
      </div>
      
      <div className="flex justify-between items-center font-bold text-lg">
        <span>المجموع</span>
        <span>{totalPrice + 50} ر.س</span>
      </div>
      
      <Button 
        className="w-full py-6 text-lg"
        onClick={handleBookNow}
        disabled={loading}
      >
        {loading ? (
          <span>جاري التجهيز...</span>
        ) : (
          <>
            احجز الآن
            <ArrowRight className="mr-2 h-5 w-5 rtl:rotate-180" />
          </>
        )}
      </Button>
      
      <p className="text-center text-sm text-gray-500">
        لن يتم خصم أي مبلغ الآن
      </p>
    </div>
  );
};

export default BookingForm;
