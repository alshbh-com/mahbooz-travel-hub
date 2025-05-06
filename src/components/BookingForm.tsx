
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
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

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
  onClose?: () => void;
}

// نموذج التحقق من بيانات الحجز
const formSchema = z.object({
  name: z.string().min(3, { message: "الاسم يجب أن يكون 3 حروف على الأقل" }),
  phone: z.string().min(10, { message: "رقم الهاتف غير صحيح" }),
  guests: z.string().min(1, { message: "يرجى اختيار عدد الضيوف" }),
  startDate: z.date({ required_error: "تاريخ الوصول مطلوب" }),
  endDate: z.date({ required_error: "تاريخ المغادرة مطلوب" }),
});

type FormValues = z.infer<typeof formSchema>;

const BookingForm = ({ hotel, room, onClose }: BookingFormProps) => {
  const [loading, setLoading] = useState(false);

  // إعداد نموذج الاستمارة
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      phone: "",
      guests: "2",
      startDate: new Date(),
      endDate: new Date(new Date().setDate(new Date().getDate() + 1)),
    },
  });

  const price = room ? room.price : (hotel as any).price || 350;
  const nights = form.watch("startDate") && form.watch("endDate")
    ? Math.max(1, Math.ceil((form.watch("endDate").getTime() - form.watch("startDate").getTime()) / (1000 * 60 * 60 * 24)))
    : 1;
  const totalPrice = price * nights;

  const onSubmit = (data: FormValues) => {
    setLoading(true);
    
    setTimeout(() => {
      setLoading(false);
      
      // تكوين رسالة WhatsApp
      const roomInfo = room ? `نوع الغرفة: ${room.type}, ` : '';
      const checkIn = data.startDate ? `تاريخ الوصول: ${format(data.startDate, 'yyyy-MM-dd')}، ` : '';
      const checkOut = data.endDate ? `تاريخ المغادرة: ${format(data.endDate, 'yyyy-MM-dd')}، ` : '';
      const guestsInfo = `عدد الضيوف: ${data.guests}`;
      const customerInfo = `الاسم: ${data.name}، رقم الهاتف: ${data.phone}`;
      
      const message = `مرحباً، أود حجز غرفة في ${hotel.name} - ${hotel.location}. ${roomInfo}${checkIn}${checkOut}${guestsInfo}. ${customerInfo}`;
      
      // فتح WhatsApp
      const whatsappNumber = "201204486263";
      const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
      window.open(whatsappUrl, '_blank');
      
      toast.success("تم إرسالك إلى واتساب لإكمال الحجز");

      if (onClose) {
        onClose();
      }
    }, 1000);
  };

  return (
    <div className="space-y-4">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>الاسم الكامل</FormLabel>
                <FormControl>
                  <Input placeholder="أدخل اسمك الكامل" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>رقم الهاتف</FormLabel>
                <FormControl>
                  <Input placeholder="أدخل رقم هاتفك" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-2 gap-3">
            <FormField
              control={form.control}
              name="startDate"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel>تاريخ الوصول</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          className="w-full flex justify-between items-center"
                        >
                          {field.value ? format(field.value, 'dd/MM/yyyy') : "اختر تاريخ"}
                          <Calendar className="h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <CalendarComponent
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) => date < new Date()}
                        initialFocus
                        className="p-3 pointer-events-auto"
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="endDate"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel>تاريخ المغادرة</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          className="w-full flex justify-between items-center"
                        >
                          {field.value ? format(field.value, 'dd/MM/yyyy') : "اختر تاريخ"}
                          <Calendar className="h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <CalendarComponent
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) => 
                          date < new Date() || 
                          (form.watch("startDate") ? date <= form.watch("startDate") : false)
                        }
                        initialFocus
                        className="p-3 pointer-events-auto"
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          
          <FormField
            control={form.control}
            name="guests"
            render={({ field }) => (
              <FormItem>
                <FormLabel>عدد الضيوف</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="اختر عدد الضيوف" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="1">1 شخص</SelectItem>
                    <SelectItem value="2">2 أشخاص</SelectItem>
                    <SelectItem value="3">3 أشخاص</SelectItem>
                    <SelectItem value="4">4 أشخاص</SelectItem>
                    <SelectItem value="5">5 أشخاص</SelectItem>
                    <SelectItem value="6">6 أشخاص</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          
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
            type="submit"
            disabled={loading}
          >
            {loading ? (
              <span>جاري التجهيز...</span>
            ) : (
              <>
                إكمال الحجز
                <ArrowRight className="mr-2 h-5 w-5 rtl:rotate-180" />
              </>
            )}
          </Button>
          
          <p className="text-center text-sm text-gray-500">
            لن يتم خصم أي مبلغ الآن
          </p>
        </form>
      </Form>
    </div>
  );
};

export default BookingForm;
