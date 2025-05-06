
import React, { useState } from 'react';
import { Calendar, Clock, Users, ArrowRight } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { 
  Popover,
  PopoverContent,
  PopoverTrigger, 
} from "@/components/ui/popover";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { format } from 'date-fns';
import { ar } from 'date-fns/locale';
import { toast } from "sonner";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";

interface Doctor {
  id: number;
  name: string;
  specialization: string;
  price: number;
}

interface AppointmentBookingProps {
  doctor: Doctor;
  availableDates: string[];
}

const AppointmentBooking = ({ doctor, availableDates }: AppointmentBookingProps) => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string | null>(null);
  const [appointmentType, setAppointmentType] = useState("new");
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [notes, setNotes] = useState("");

  // تحويل سلسلة التواريخ إلى كائنات Date
  const availableDateObjects = availableDates.map(dateStr => new Date(dateStr));
  
  // تجميع المواعيد المتاحة حسب التاريخ
  const groupedTimeSlots: Record<string, string[]> = {};
  availableDateObjects.forEach(date => {
    const dateKey = format(date, 'yyyy-MM-dd');
    const timeStr = format(date, 'HH:mm');
    
    if (!groupedTimeSlots[dateKey]) {
      groupedTimeSlots[dateKey] = [];
    }
    groupedTimeSlots[dateKey].push(timeStr);
  });
  
  // تحديد المواعيد المتاحة للتاريخ المحدد
  const selectedDateKey = selectedDate ? format(selectedDate, 'yyyy-MM-dd') : '';
  const availableTimeSlotsForDate = groupedTimeSlots[selectedDateKey] || [];

  const handleBookAppointment = () => {
    if (!selectedDate || !selectedTimeSlot || !name || !phone) {
      toast.error("يرجى ملء جميع الحقول المطلوبة");
      return;
    }
    
    setLoading(true);
    
    setTimeout(() => {
      setLoading(false);
      
      // تكوين رسالة WhatsApp
      const formattedDate = format(selectedDate, 'yyyy-MM-dd');
      const message = `مرحباً، أود حجز موعد مع ${doctor.name} (${doctor.specialization}) في تاريخ ${formattedDate} الساعة ${selectedTimeSlot}. الاسم: ${name}. رقم الهاتف: ${phone}.${notes ? ` ملاحظات إضافية: ${notes}` : ''}`;
      
      // فتح WhatsApp
      const whatsappNumber = "201204486263";
      const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
      window.open(whatsappUrl, '_blank');
      
      toast.success("تم إرسالك إلى واتساب لإكمال الحجز");
    }, 1000);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>اختر تاريخ الموعد</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full flex justify-between items-center"
                >
                  {selectedDate ? format(selectedDate, 'dd/MM/yyyy') : "اختر تاريخ"}
                  <Calendar className="h-4 w-4 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <CalendarComponent
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  disabled={(date) => {
                    const dateKey = format(date, 'yyyy-MM-dd');
                    return !groupedTimeSlots[dateKey] || date < new Date();
                  }}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
          
          {selectedDate && availableTimeSlotsForDate.length > 0 ? (
            <div className="space-y-2">
              <Label>اختر وقت الموعد</Label>
              <RadioGroup 
                onValueChange={setSelectedTimeSlot} 
                value={selectedTimeSlot || ''}
                className="grid grid-cols-3 gap-2"
              >
                {availableTimeSlotsForDate.map((time, index) => (
                  <div key={index} className="flex items-center space-x-2 rtl:space-x-reverse">
                    <RadioGroupItem value={time} id={`time-${time}`} />
                    <Label htmlFor={`time-${time}`} className="cursor-pointer">
                      {time}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
          ) : selectedDate ? (
            <div className="text-center p-4 bg-yellow-50 text-yellow-800 rounded-md">
              لا توجد مواعيد متاحة في هذا التاريخ. يرجى اختيار تاريخ آخر.
            </div>
          ) : null}
          
          <div className="space-y-2">
            <Label>نوع الموعد</Label>
            <RadioGroup 
              onValueChange={setAppointmentType} 
              value={appointmentType}
              className="flex space-x-4 rtl:space-x-reverse"
            >
              <div className="flex items-center space-x-2 rtl:space-x-reverse">
                <RadioGroupItem value="new" id="new" />
                <Label htmlFor="new">كشف جديد</Label>
              </div>
              <div className="flex items-center space-x-2 rtl:space-x-reverse">
                <RadioGroupItem value="follow" id="follow" />
                <Label htmlFor="follow">متابعة</Label>
              </div>
            </RadioGroup>
          </div>
        </div>
        
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">الاسم</Label>
            <Input id="name" value={name} onChange={(e) => setName(e.target.value)} required />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="phone">رقم الهاتف</Label>
            <Input id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} required />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="notes">ملاحظات إضافية (اختياري)</Label>
            <Textarea 
              id="notes" 
              placeholder="اكتب أي ملاحظات إضافية هنا..." 
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="resize-none"
              rows={3}
            />
          </div>
        </div>
      </div>
      
      <div className="border-t pt-4">
        <div className="flex justify-between items-center mb-4">
          <span className="font-medium">سعر الكشف:</span>
          <span className="font-bold text-primary">{doctor.price} ر.س</span>
        </div>
        
        <Button 
          className="w-full py-6 text-lg"
          onClick={handleBookAppointment}
          disabled={loading || !selectedDate || !selectedTimeSlot || !name || !phone}
        >
          {loading ? (
            <span>جاري التجهيز...</span>
          ) : (
            <>
              تأكيد الحجز
              <ArrowRight className="mr-2 h-5 w-5 rtl:rotate-180" />
            </>
          )}
        </Button>
        
        <p className="text-center text-sm text-gray-500 mt-2">
          {appointmentType === "new" ? 
            "مطلوب الحضور قبل الموعد المحدد بـ 15 دقيقة" : 
            "يرجى إحضار التقارير الطبية السابقة"}
        </p>
      </div>
    </div>
  );
};

export default AppointmentBooking;
