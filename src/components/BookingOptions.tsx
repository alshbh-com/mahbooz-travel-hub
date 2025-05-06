
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { 
  Popover, 
  PopoverContent, 
  PopoverTrigger 
} from "@/components/ui/popover";
import { format } from "date-fns";
import { Calendar as CalendarIcon, Users, MapPin } from "lucide-react";
import { cn } from '@/lib/utils';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const BookingOptions = () => {
  const [date, setDate] = useState<Date>();
  const [checkoutDate, setCheckoutDate] = useState<Date>();
  const [activeTab, setActiveTab] = useState("hotels");
  const [guestCount, setGuestCount] = useState("2");

  return (
    <div className="relative z-10 -mt-24 mb-24">
      <div className="container mx-auto px-4">
        <div className="bg-white rounded-2xl shadow-xl p-6">
          <Tabs defaultValue="hotels" className="w-full" onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-1 mb-6 max-w-md mx-auto">
              <TabsTrigger value="hotels" className="py-3">
                الفنادق والإقامة
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="hotels" className="arabic">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Location */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium">الموقع</label>
                  <div className="relative">
                    <MapPin className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <Input placeholder="اختر الوجهة" className="pr-10 text-right" />
                  </div>
                </div>
                
                {/* Check-in date */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium">تاريخ الوصول</label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className="w-full justify-between text-right pointer-events-auto"
                      >
                        {date ? format(date, "PPP") : <span>اختر التاريخ</span>}
                        <CalendarIcon className="h-4 w-4 opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        initialFocus
                        className="p-3 pointer-events-auto"
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                
                {/* Check-out date */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium">تاريخ المغادرة</label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className="w-full justify-between text-right pointer-events-auto"
                      >
                        {checkoutDate ? format(checkoutDate, "PPP") : <span>اختر التاريخ</span>}
                        <CalendarIcon className="h-4 w-4 opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={checkoutDate}
                        onSelect={setCheckoutDate}
                        initialFocus
                        className="p-3 pointer-events-auto"
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                
                {/* Guests */}
                <div className="space-y-2 md:col-span-2">
                  <label className="block text-sm font-medium">عدد الضيوف</label>
                  <Select value={guestCount} onValueChange={setGuestCount}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="عدد البالغين والأطفال" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1 شخص</SelectItem>
                      <SelectItem value="2">2 أشخاص</SelectItem>
                      <SelectItem value="3">3 أشخاص</SelectItem>
                      <SelectItem value="4">4+ أشخاص</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                {/* Submit button */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium opacity-0">بحث</label>
                  <Button className="w-full">
                    حجز الآن
                  </Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default BookingOptions;
