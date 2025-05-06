
import React, { useState } from 'react';
import { Calendar, MapPin, ArrowRight } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { 
  Popover,
  PopoverContent,
  PopoverTrigger, 
} from "@/components/ui/popover";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { format, addDays, isBefore, isAfter, isSameDay } from 'date-fns';
import { ar } from 'date-fns/locale';
import { toast } from "sonner";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface AvailableDateRange {
  startDate: string;
  endDate: string;
}

interface Car {
  id: number;
  name: string;
  location: string;
  price: number;
  availableDates: AvailableDateRange[];
}

interface CarBookingFormProps {
  car: Car;
}

const CarBookingForm = ({ car }: CarBookingFormProps) => {
  const [startDate, setStartDate] = useState<Date | undefined>(new Date());
  const [endDate, setEndDate] = useState<Date | undefined>(
    new Date(new Date().setDate(new Date().getDate() + 3))
  );
  const [pickupLocation, setPickupLocation] = useState("office");
  const [dropoffLocation, setDropoffLocation] = useState("office");
  const [additionalDrivers, setAdditionalDrivers] = useState(false);
  const [childSeat, setChildSeat] = useState(false);
  const [gps, setGps] = useState(false);
  const [loading, setLoading] = useState(false);
  
  // تحويل نطاقات التواريخ المتاحة إلى كائنات Date
  const availableDateRanges = car.availableDates.map(range => ({
    startDate: new Date(range.startDate),
    endDate: new Date(range.endDate)
  }));
  
  const days = startDate && endDate 
    ? Math.max(1, Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)))
    : 1;
  
  const basePrice = car.price * days;
  const additionalDriversPrice = additionalDrivers ? 30 : 0;
  const childSeatPrice = childSeat ? 15 : 0;
  const gpsPrice = gps ? 20 : 0;
  const totalPrice = basePrice + additionalDriversPrice + childSeatPrice + gpsPrice;
  
  // التحقق مما إذا كان التاريخ ضمن النطاقات المتاحة
  const isDateAvailable = (date: Date): boolean => {
    // تحقق إذا كان هناك نطاق واحد على الأقل يحتوي التاريخ
    return availableDateRanges.some(range => 
      (isAfter(date, range.startDate) || isSameDay(date, range.startDate)) && 
      (isBefore(date, range.endDate) || isSameDay(date, range.endDate))
    );
  };
  
  const isDateDisabled = (date: Date): boolean => {
    // تعطيل التواريخ الماضية والتواريخ غير المتاحة
    return isBefore(date, new Date()) || !isDateAvailable(date);
  };
  
  const handleBookNow = () => {
    if (!startDate || !endDate) {
      toast.error("يرجى تحديد تواريخ الاستلام والإرجاع");
      return;
    }
    
    setLoading(true);
    
    setTimeout(() => {
      setLoading(false);
      
      // تكوين رسالة WhatsApp
      const pickupLocationText = pickupLocation === "office" ? "مكتب الشركة" : "توصيل للموقع";
      const dropoffLocationText = dropoffLocation === "office" ? "مكتب الشركة" : "استلام من الموقع";
      
      const extras = [];
      if (additionalDrivers) extras.push("سائق إضافي");
      if (childSeat) extras.push("مقعد أطفال");
      if (gps) extras.push("نظام تحديد المواقع GPS");
      
      const extrasText = extras.length > 0 ? `الإضافات: ${extras.join(', ')}. ` : '';
      
      const message = `مرحباً، أود حجز سيارة ${car.name} من ${format(startDate, 'yyyy-MM-dd')} إلى ${format(endDate, 'yyyy-MM-dd')} (${days} يوم). مكان الاستلام: ${pickupLocationText}. مكان الإرجاع: ${dropoffLocationText}. ${extrasText}الإجمالي: ${totalPrice} ر.س.`;
      
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
        {car.price} ر.س
        <span className="text-sm font-normal text-gray-500">/يوم</span>
      </div>
      
      <div className="space-y-3">
        <div className="grid grid-cols-1 gap-3">
          <div className="space-y-2">
            <Label htmlFor="pickupDate">تاريخ الاستلام</Label>
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
                  disabled={isDateDisabled}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="dropoffDate">تاريخ الإرجاع</Label>
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
                    isDateDisabled(date) || 
                    (startDate ? isBefore(date, startDate) : false)
                  }
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-2">
            <Label htmlFor="pickupLocation">مكان الاستلام</Label>
            <Select value={pickupLocation} onValueChange={setPickupLocation}>
              <SelectTrigger id="pickupLocation">
                <SelectValue placeholder="اختر مكان الاستلام" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="office">مكتب الشركة</SelectItem>
                <SelectItem value="delivery">توصيل للموقع</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="dropoffLocation">مكان الإرجاع</Label>
            <Select value={dropoffLocation} onValueChange={setDropoffLocation}>
              <SelectTrigger id="dropoffLocation">
                <SelectValue placeholder="اختر مكان الإرجاع" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="office">مكتب الشركة</SelectItem>
                <SelectItem value="pickup">استلام من الموقع</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div className="space-y-3 mt-2">
          <h3 className="font-medium mb-2">إضافات اختيارية</h3>
          <div className="flex items-center space-x-2 rtl:space-x-reverse">
            <Checkbox id="additionalDrivers" checked={additionalDrivers} onCheckedChange={() => setAdditionalDrivers(!additionalDrivers)} />
            <div className="grid gap-1.5 leading-none">
              <label
                htmlFor="additionalDrivers"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                سائق إضافي
              </label>
              <p className="text-xs text-muted-foreground">
                30 ر.س لكامل فترة الإيجار
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2 rtl:space-x-reverse">
            <Checkbox id="childSeat" checked={childSeat} onCheckedChange={() => setChildSeat(!childSeat)} />
            <div className="grid gap-1.5 leading-none">
              <label
                htmlFor="childSeat"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                مقعد أطفال
              </label>
              <p className="text-xs text-muted-foreground">
                15 ر.س لكامل فترة الإيجار
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2 rtl:space-x-reverse">
            <Checkbox id="gps" checked={gps} onCheckedChange={() => setGps(!gps)} />
            <div className="grid gap-1.5 leading-none">
              <label
                htmlFor="gps"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                نظام تحديد المواقع GPS
              </label>
              <p className="text-xs text-muted-foreground">
                20 ر.س لكامل فترة الإيجار
              </p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="border-t border-b py-4 my-4">
        <div className="flex justify-between mb-2">
          <span className="text-gray-600">{car.price} ر.س × {days} يوم</span>
          <span>{basePrice} ر.س</span>
        </div>
        {additionalDrivers && (
          <div className="flex justify-between mb-2">
            <span className="text-gray-600">سائق إضافي</span>
            <span>30 ر.س</span>
          </div>
        )}
        {childSeat && (
          <div className="flex justify-between mb-2">
            <span className="text-gray-600">مقعد أطفال</span>
            <span>15 ر.س</span>
          </div>
        )}
        {gps && (
          <div className="flex justify-between mb-2">
            <span className="text-gray-600">نظام GPS</span>
            <span>20 ر.س</span>
          </div>
        )}
      </div>
      
      <div className="flex justify-between items-center font-bold text-lg">
        <span>المجموع</span>
        <span>{totalPrice} ر.س</span>
      </div>
      
      <Button 
        className="w-full py-6 text-lg"
        onClick={handleBookNow}
        disabled={loading || !startDate || !endDate}
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
        لا حاجة للدفع الآن، يمكنك الدفع عند الاستلام
      </p>
    </div>
  );
};

export default CarBookingForm;
