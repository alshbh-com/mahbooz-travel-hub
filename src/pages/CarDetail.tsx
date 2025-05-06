
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Calendar, MapPin, Star, ArrowLeft, Check, X } from 'lucide-react';

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Chatbot from "@/components/Chatbot";
import ImageGallery from "@/components/ImageGallery";
import CarBookingForm from "@/components/CarBookingForm";
import ReviewItem from "@/components/ReviewItem";

// بيانات مؤقتة للسيارات (هذه ستأتي من واجهة برمجة التطبيقات أو قاعدة بيانات في النظام النهائي)
const cars = [
  {
    id: 1,
    name: "تويوتا كامري 2023",
    type: "سيدان",
    brand: "تويوتا",
    model: "كامري",
    year: 2023,
    location: "وكالة السلام، عدل",
    address: "طريق المطار، مجمع السلام، عدل",
    image: "https://images.unsplash.com/photo-1550355291-bbee04a92027",
    price: 180,
    rating: 4.5,
    reviewCount: 76,
    features: ["تأمين شامل", "كيلومترات مفتوحة", "توصيل مجاني", "نظام GPS", "بلوتوث", "كاميرا خلفية"],
    specifications: {
      engine: "2.5 لتر، 4 سلندر",
      transmission: "أوتوماتيكي",
      fuelType: "بنزين",
      seats: 5,
      doors: 4,
      luggage: "3 حقائب كبيرة",
      airConditioning: true,
      bluetooth: true,
      gps: true,
      usbPorts: true,
      automaticTransmission: true,
      fuelEfficiency: "15.5 كم/لتر"
    },
    terms: {
      minAge: 21,
      license: "رخصة قيادة سارية المفعول لمدة لا تقل عن سنة",
      deposit: "500 ريال سعودي",
      insurance: "تأمين شامل مع تحمل 1000 ريال في حالة الحوادث",
      fuelPolicy: "استلام بخزان ممتلئ وتسليم بخزان ممتلئ",
      cancellationPolicy: "إلغاء مجاني حتى 24 ساعة قبل الاستلام"
    },
    availableDates: [
      {
        startDate: "2025-05-07",
        endDate: "2025-05-20"
      },
      {
        startDate: "2025-05-25",
        endDate: "2025-06-15"
      }
    ],
    images: [
      "https://images.unsplash.com/photo-1550355291-bbee04a92027",
      "https://images.unsplash.com/photo-1541038018606-83218db4b785",
      "https://images.unsplash.com/photo-1592976112147-2a3fee93364c",
      "https://images.unsplash.com/photo-1587750059049-e7e14c950b35"
    ],
    reviews: [
      {
        id: 1,
        user: "محمد الأحمدي",
        rating: 5,
        date: "2025-04-10",
        comment: "سيارة رائعة ونظيفة جداً، استلام وتسليم سريع وبدون تعقيدات. أنصح بها بشدة.",
        userImage: "https://images.unsplash.com/photo-1599566150163-29194dcaad36"
      },
      {
        id: 2,
        user: "سارة الزهراني",
        rating: 4,
        date: "2025-03-22",
        comment: "تجربة إيجابية. السيارة في حالة ممتازة ومريحة. الخدمة جيدة لكن كان هناك تأخير بسيط في التسليم.",
        userImage: "https://images.unsplash.com/photo-1494790108377-be9c29b29330"
      }
    ],
    mapLocation: {
      lat: 12.7854,
      lng: 45.0186
    }
  },
  {
    id: 2,
    name: "نيسان التيما 2022",
    type: "سيدان",
    brand: "نيسان",
    model: "التيما",
    year: 2022,
    location: "مركز الإيجار الدولي، عدل",
    address: "شارع الخليج، مركز الإيجار الدولي، عدل",
    image: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341",
    price: 150,
    rating: 4.3,
    reviewCount: 52,
    features: ["تأمين شامل", "GPS", "بلوتوث", "كاميرا خلفية", "مثبت سرعة"],
    specifications: {
      engine: "2.0 لتر، 4 سلندر",
      transmission: "أوتوماتيكي",
      fuelType: "بنزين",
      seats: 5,
      doors: 4,
      luggage: "2 حقائب كبيرة",
      airConditioning: true,
      bluetooth: true,
      gps: true,
      usbPorts: true,
      automaticTransmission: true,
      fuelEfficiency: "16 كم/لتر"
    },
    terms: {
      minAge: 21,
      license: "رخصة قيادة سارية المفعول",
      deposit: "400 ريال سعودي",
      insurance: "تأمين شامل مع تحمل 800 ريال في حالة الحوادث",
      fuelPolicy: "استلام بخزان ممتلئ وتسليم بخزان ممتلئ",
      cancellationPolicy: "إلغاء مجاني حتى 48 ساعة قبل الاستلام"
    },
    availableDates: [
      {
        startDate: "2025-05-07",
        endDate: "2025-05-30"
      }
    ],
    images: [
      "https://images.unsplash.com/photo-1549399542-7e3f8b79c341",
      "https://images.unsplash.com/photo-1550900440-5e7ba159850c",
      "https://images.unsplash.com/photo-1607853554439-0069ec0f29b6",
      "https://images.unsplash.com/photo-1549177595-c0eeb82eb64b"
    ],
    reviews: [
      {
        id: 1,
        user: "أحمد العتيبي",
        rating: 5,
        date: "2025-04-20",
        comment: "سيارة اقتصادية وموفرة في استهلاك الوقود. الشركة محترمة في التعامل.",
        userImage: "https://images.unsplash.com/photo-1599566150163-29194dcaad36"
      },
      {
        id: 2,
        user: "نورة القحطاني",
        rating: 4,
        date: "2025-03-15",
        comment: "سيارة جيدة ومريحة. خدمة العملاء ممتازة والاستلام كان سريعًا.",
        userImage: "https://images.unsplash.com/photo-1494790108377-be9c29b29330"
      }
    ],
    mapLocation: {
      lat: 12.7954,
      lng: 45.0286
    }
  }
];

const CarDetail = () => {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState("details");
  
  const carId = parseInt(id || "1");
  const car = cars.find(c => c.id === carId) || cars[0];
  
  return (
    <div className="min-h-screen arabic" dir="rtl">
      <Navbar siteName="محجوز" />
      
      <div className="container mx-auto px-4 py-8">
        {/* زر العودة + اسم السيارة */}
        <div className="flex items-center justify-between mb-6">
          <Link to="/" className="flex items-center text-gray-600 hover:text-primary transition-colors">
            <ArrowLeft className="ml-2 h-5 w-5" />
            <span>العودة إلى القائمة</span>
          </Link>
          <div className="flex items-center">
            <Star className="h-5 w-5 text-yellow-400 fill-current ml-1" />
            <span className="font-medium">{car.rating}</span>
            <span className="text-gray-500 mr-1">({car.reviewCount} تقييم)</span>
          </div>
        </div>
        
        <h1 className="text-3xl font-bold mb-2">{car.name}</h1>
        
        <div className="flex items-center text-gray-600 mb-6">
          <MapPin className="h-5 w-5 ml-2" />
          <span>{car.location}</span>
        </div>
        
        {/* معرض الصور */}
        <ImageGallery images={car.images} />
        
        {/* تبويبات المعلومات */}
        <div className="mt-12">
          <Tabs defaultValue="details" className="w-full" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-4 mb-8">
              <TabsTrigger value="details">التفاصيل</TabsTrigger>
              <TabsTrigger value="specifications">المواصفات</TabsTrigger>
              <TabsTrigger value="terms">الشروط والأحكام</TabsTrigger>
              <TabsTrigger value="reviews">التقييمات</TabsTrigger>
            </TabsList>
            
            <TabsContent value="details" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="md:col-span-2">
                  <h2 className="text-2xl font-semibold mb-4">معلومات السيارة</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600">العلامة التجارية:</span>
                        <span className="font-medium">{car.brand}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">الموديل:</span>
                        <span className="font-medium">{car.model}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">سنة الصنع:</span>
                        <span className="font-medium">{car.year}</span>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600">النوع:</span>
                        <span className="font-medium">{car.type}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">ناقل الحركة:</span>
                        <span className="font-medium">{car.specifications.transmission}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">نوع الوقود:</span>
                        <span className="font-medium">{car.specifications.fuelType}</span>
                      </div>
                    </div>
                  </div>
                  
                  <h2 className="text-2xl font-semibold mb-4">المميزات</h2>
                  <div className="grid grid-cols-2 gap-4 mb-8">
                    {car.features.map((feature, index) => (
                      <div key={index} className="flex items-center">
                        <Check className="h-4 w-4 text-primary ml-2" />
                        <span className="text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                  
                  <h2 className="text-2xl font-semibold mb-4">موقع الاستلام</h2>
                  <div className="bg-gray-100 p-4 rounded-lg">
                    <p>{car.address}</p>
                  </div>
                </div>
                
                <div>
                  <Card className="shadow-md border-t-4 border-primary">
                    <CardContent className="pt-6">
                      <CarBookingForm car={car} />
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="specifications">
              <h2 className="text-2xl font-semibold mb-6">المواصفات التفصيلية</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <div className="border rounded-lg overflow-hidden">
                    <div className="grid grid-cols-2 text-sm">
                      <div className="bg-gray-50 p-3 border-b border-r">المحرك</div>
                      <div className="p-3 border-b">{car.specifications.engine}</div>
                      
                      <div className="bg-gray-50 p-3 border-b border-r">ناقل الحركة</div>
                      <div className="p-3 border-b">{car.specifications.transmission}</div>
                      
                      <div className="bg-gray-50 p-3 border-b border-r">نوع الوقود</div>
                      <div className="p-3 border-b">{car.specifications.fuelType}</div>
                      
                      <div className="bg-gray-50 p-3 border-b border-r">كفاءة استهلاك الوقود</div>
                      <div className="p-3 border-b">{car.specifications.fuelEfficiency}</div>
                      
                      <div className="bg-gray-50 p-3 border-r">عدد المقاعد</div>
                      <div className="p-3">{car.specifications.seats}</div>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold mb-2">المميزات المتوفرة</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="flex items-center">
                      {car.specifications.airConditioning ? 
                        <Check className="h-4 w-4 text-green-500 ml-2" /> : 
                        <X className="h-4 w-4 text-red-500 ml-2" />}
                      <span>مكيف هواء</span>
                    </div>
                    <div className="flex items-center">
                      {car.specifications.bluetooth ? 
                        <Check className="h-4 w-4 text-green-500 ml-2" /> : 
                        <X className="h-4 w-4 text-red-500 ml-2" />}
                      <span>بلوتوث</span>
                    </div>
                    <div className="flex items-center">
                      {car.specifications.gps ? 
                        <Check className="h-4 w-4 text-green-500 ml-2" /> : 
                        <X className="h-4 w-4 text-red-500 ml-2" />}
                      <span>نظام تحديد المواقع GPS</span>
                    </div>
                    <div className="flex items-center">
                      {car.specifications.usbPorts ? 
                        <Check className="h-4 w-4 text-green-500 ml-2" /> : 
                        <X className="h-4 w-4 text-red-500 ml-2" />}
                      <span>منافذ USB</span>
                    </div>
                    <div className="flex items-center">
                      {car.specifications.automaticTransmission ? 
                        <Check className="h-4 w-4 text-green-500 ml-2" /> : 
                        <X className="h-4 w-4 text-red-500 ml-2" />}
                      <span>ناقل حركة أوتوماتيكي</span>
                    </div>
                  </div>
                  
                  <div className="mt-6">
                    <h3 className="text-lg font-semibold mb-2">سعة الأمتعة</h3>
                    <p>{car.specifications.luggage}</p>
                  </div>
                  
                  <div className="mt-6">
                    <h3 className="text-lg font-semibold mb-2">عدد الأبواب</h3>
                    <p>{car.specifications.doors} أبواب</p>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="terms">
              <h2 className="text-2xl font-semibold mb-6">شروط وأحكام الإيجار</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div>
                    <h3 className="font-semibold text-lg mb-2">متطلبات السائق</h3>
                    <div className="space-y-2">
                      <div className="flex items-start">
                        <Check className="h-4 w-4 text-primary ml-2 mt-1" />
                        <div>
                          <p className="font-medium">الحد الأدنى للعمر: {car.terms.minAge} سنة</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <Check className="h-4 w-4 text-primary ml-2 mt-1" />
                        <div>
                          <p className="font-medium">رخصة القيادة:</p>
                          <p className="text-gray-600">{car.terms.license}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-lg mb-2">الضمان والتأمين</h3>
                    <div className="space-y-2">
                      <div className="flex items-start">
                        <Check className="h-4 w-4 text-primary ml-2 mt-1" />
                        <div>
                          <p className="font-medium">مبلغ التأمين (الضمان):</p>
                          <p className="text-gray-600">{car.terms.deposit}</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <Check className="h-4 w-4 text-primary ml-2 mt-1" />
                        <div>
                          <p className="font-medium">التأمين:</p>
                          <p className="text-gray-600">{car.terms.insurance}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="font-semibold text-lg mb-2">سياسة الوقود</h3>
                    <p>{car.terms.fuelPolicy}</p>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-lg mb-2">سياسة الإلغاء</h3>
                    <p>{car.terms.cancellationPolicy}</p>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-lg mb-2">الكيلومترات المسموح بها</h3>
                    <p>كيلومترات مفتوحة (غير محدودة)</p>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="reviews">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="md:col-span-2">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-semibold">تقييمات المستأجرين</h2>
                    <div className="flex items-center">
                      <Star className="h-5 w-5 text-yellow-400 fill-current ml-1" />
                      <span className="font-medium text-lg">{car.rating}</span>
                      <span className="text-gray-500 mr-1">({car.reviewCount} تقييم)</span>
                    </div>
                  </div>
                  
                  <div className="space-y-6">
                    {car.reviews.map(review => (
                      <ReviewItem key={review.id} review={review} />
                    ))}
                  </div>
                  
                  <div className="mt-8">
                    <Button>عرض جميع التقييمات</Button>
                  </div>
                </div>
                
                <div>
                  <Card className="shadow-md">
                    <CardContent className="pt-6">
                      <h3 className="text-lg font-semibold mb-4">أضف تقييمك</h3>
                      <p className="text-gray-600 mb-4">شارك تجربتك مع المستخدمين الآخرين</p>
                      <Button className="w-full">كتابة تقييم</Button>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
      
      <Footer />
      <Chatbot />
    </div>
  );
};

export default CarDetail;
