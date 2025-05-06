
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Calendar, MapPin, Star, ArrowLeft, Check, Phone, Mail } from 'lucide-react';

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AppointmentBooking from "@/components/AppointmentBooking";
import ReviewItem from "@/components/ReviewItem";
import Chatbot from "@/components/Chatbot";

// بيانات مؤقتة للأطباء (هذه ستأتي من واجهة برمجة التطبيقات أو قاعدة بيانات في النظام النهائي)
const doctors = [
  {
    id: 1,
    name: "د. عبدالرحمن العليمي",
    title: "استشاري طب عام",
    specialization: "طب عام",
    location: "مستشفى السلام، عدل",
    address: "شارع الزهراء، مستشفى السلام، الطابق الثالث، عدل",
    image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d",
    price: 120,
    rating: 4.7,
    reviewCount: 93,
    services: ["استشارة عامة", "فحص طبي شامل", "متابعة طبية", "تطعيمات"],
    education: [
      "بكالوريوس الطب والجراحة، جامعة صنعاء، 2005",
      "الزمالة البريطانية في الطب العام، 2010",
      "دكتوراه في الطب العام، جامعة القاهرة، 2013"
    ],
    experience: [
      "استشاري طب عام، مستشفى السلام، 2015 - الآن",
      "أخصائي طب عام، مستشفى الأمل، 2013 - 2015",
      "طبيب مقيم، مستشفى صنعاء المركزي، 2005 - 2013"
    ],
    languages: ["العربية", "الإنجليزية"],
    availableDates: [
      "2025-05-07T09:00:00",
      "2025-05-07T10:30:00",
      "2025-05-07T12:00:00",
      "2025-05-08T09:00:00",
      "2025-05-08T10:30:00",
      "2025-05-09T14:00:00",
      "2025-05-09T15:30:00",
      "2025-05-10T11:00:00",
      "2025-05-10T12:30:00"
    ],
    contactInfo: {
      phone: "+967 77 123 4567",
      email: "dr.aleemi@mahjooz.com"
    },
    reviews: [
      {
        id: 1,
        user: "سعيد القحطاني",
        rating: 5,
        date: "2025-04-15",
        comment: "دكتور ممتاز، متفهم ويشرح بتفصيل. العيادة نظيفة ومنظمة والانتظار قليل.",
        userImage: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e"
      },
      {
        id: 2,
        user: "منى الشمري",
        rating: 4,
        date: "2025-03-28",
        comment: "تجربة جيدة مع الدكتور عبدالرحمن، يستمع جيداً للمريض ويشرح الحالة بوضوح.",
        userImage: "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604"
      },
      {
        id: 3,
        user: "فهد الحربي",
        rating: 5,
        date: "2025-04-22",
        comment: "أحد أفضل الأطباء الذين زرتهم. محترف ولديه معرفة واسعة. أنصح بشدة بزيارته.",
        userImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d"
      }
    ],
    mapLocation: {
      lat: 12.7854,
      lng: 45.0186
    }
  },
  {
    id: 2,
    name: "د. سمية الجابري",
    title: "استشارية طب أطفال",
    specialization: "طب أطفال",
    location: "عيادات النور، عدل",
    address: "حي السلام، عيادات النور، مبنى B، الطابق الثاني، عدل",
    image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f",
    price: 150,
    rating: 4.9,
    reviewCount: 158,
    services: ["استشارة طب أطفال", "فحص نمو الطفل", "تطعيمات الأطفال", "استشارات تغذية الطفل"],
    education: [
      "بكالوريوس الطب والجراحة، جامعة عدن، 2008",
      "ماجستير طب الأطفال، جامعة القاهرة، 2012",
      "الزمالة الأمريكية في طب الأطفال، 2015"
    ],
    experience: [
      "استشارية طب أطفال، عيادات النور، 2018 - الآن",
      "أخصائية طب أطفال، مستشفى الأمومة والطفولة، 2015 - 2018",
      "طبيبة مقيمة، مستشفى عدن العام، 2008 - 2015"
    ],
    languages: ["العربية", "الإنجليزية", "الفرنسية"],
    availableDates: [
      "2025-05-07T15:00:00",
      "2025-05-07T16:30:00",
      "2025-05-08T15:00:00",
      "2025-05-08T16:30:00",
      "2025-05-08T18:00:00",
      "2025-05-09T10:00:00",
      "2025-05-09T11:30:00",
      "2025-05-10T10:00:00",
      "2025-05-10T11:30:00"
    ],
    contactInfo: {
      phone: "+967 77 987 6543",
      email: "dr.aljabri@mahjooz.com"
    },
    reviews: [
      {
        id: 1,
        user: "هاني المهري",
        rating: 5,
        date: "2025-04-20",
        comment: "د. سمية رائعة مع الأطفال، ابني يحب زيارتها ولا يخاف منها أبداً. شرحها ممتاز وتوصي بالعلاج المناسب دون مبالغة.",
        userImage: "https://images.unsplash.com/photo-1599566150163-29194dcaad36"
      },
      {
        id: 2,
        user: "نورة الشمراني",
        rating: 5,
        date: "2025-04-15",
        comment: "نشكر د. سمية على اهتمامها الكبير بالأطفال. طبيبة متميزة وتتابع الحالة حتى بعد العيادة.",
        userImage: "https://images.unsplash.com/photo-1494790108377-be9c29b29330"
      }
    ],
    mapLocation: {
      lat: 12.7954,
      lng: 45.0286
    }
  }
];

const DoctorDetail = () => {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState("about");
  
  const doctorId = parseInt(id || "1");
  const doctor = doctors.find(d => d.id === doctorId) || doctors[0];
  
  return (
    <div className="min-h-screen arabic" dir="rtl">
      <Navbar siteName="محجوز" />
      
      <div className="container mx-auto px-4 py-8">
        {/* زر العودة + اسم الطبيب */}
        <div className="flex items-center justify-between mb-6">
          <Link to="/" className="flex items-center text-gray-600 hover:text-primary transition-colors">
            <ArrowLeft className="ml-2 h-5 w-5" />
            <span>العودة إلى القائمة</span>
          </Link>
          <div className="flex items-center">
            <Star className="h-5 w-5 text-yellow-400 fill-current ml-1" />
            <span className="font-medium">{doctor.rating}</span>
            <span className="text-gray-500 mr-1">({doctor.reviewCount} تقييم)</span>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <div className="flex flex-col md:flex-row items-start gap-6">
              <div className="w-32 h-32 rounded-full overflow-hidden shrink-0">
                <img 
                  src={doctor.image} 
                  alt={doctor.name} 
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div>
                <h1 className="text-3xl font-bold mb-1">{doctor.name}</h1>
                <h2 className="text-xl text-gray-600 mb-3">{doctor.title}</h2>
                
                <div className="flex items-center text-gray-600 mb-4">
                  <Badge variant="secondary" className="ml-2">{doctor.specialization}</Badge>
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 ml-1" />
                    <span className="text-sm">{doctor.location}</span>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-2 md:gap-4">
                  <Button className="flex items-center gap-2" onClick={() => setActiveTab("booking")}>
                    <Calendar className="h-4 w-4" />
                    حجز موعد
                  </Button>
                  <Button variant="outline" className="flex items-center gap-2">
                    <Phone className="h-4 w-4" />
                    اتصال
                  </Button>
                  <Button variant="outline" className="flex items-center gap-2">
                    <Mail className="h-4 w-4" />
                    مراسلة
                  </Button>
                </div>
              </div>
            </div>
            
            {/* تبويبات المعلومات */}
            <div className="mt-12">
              <Tabs defaultValue="about" className="w-full" value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-4 mb-8">
                  <TabsTrigger value="about">عن الطبيب</TabsTrigger>
                  <TabsTrigger value="services">الخدمات</TabsTrigger>
                  <TabsTrigger value="reviews">التقييمات</TabsTrigger>
                  <TabsTrigger value="booking">حجز موعد</TabsTrigger>
                </TabsList>
                
                <TabsContent value="about">
                  <div className="space-y-8">
                    <div>
                      <h2 className="text-xl font-semibold mb-4">المؤهلات العلمية</h2>
                      <ul className="space-y-2">
                        {doctor.education.map((edu, index) => (
                          <li key={index} className="flex items-center">
                            <Check className="h-4 w-4 text-primary ml-2 shrink-0" />
                            <span>{edu}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h2 className="text-xl font-semibold mb-4">الخبرات العملية</h2>
                      <ul className="space-y-2">
                        {doctor.experience.map((exp, index) => (
                          <li key={index} className="flex items-center">
                            <Check className="h-4 w-4 text-primary ml-2 shrink-0" />
                            <span>{exp}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h2 className="text-xl font-semibold mb-4">اللغات</h2>
                      <div className="flex flex-wrap gap-2">
                        {doctor.languages.map((lang, index) => (
                          <Badge key={index} variant="outline">{lang}</Badge>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h2 className="text-xl font-semibold mb-4">معلومات الاتصال</h2>
                      <div className="space-y-3">
                        <div className="flex items-center">
                          <Phone className="h-4 w-4 text-primary ml-2" />
                          <span>{doctor.contactInfo.phone}</span>
                        </div>
                        <div className="flex items-center">
                          <Mail className="h-4 w-4 text-primary ml-2" />
                          <span>{doctor.contactInfo.email}</span>
                        </div>
                        <div className="flex items-center">
                          <MapPin className="h-4 w-4 text-primary ml-2" />
                          <span>{doctor.address}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="services">
                  <h2 className="text-xl font-semibold mb-6">الخدمات المقدمة</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {doctor.services.map((service, index) => (
                      <Card key={index}>
                        <CardContent className="p-6">
                          <div className="flex justify-between items-center">
                            <div className="flex items-center">
                              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center ml-4">
                                <Check className="h-5 w-5 text-primary" />
                              </div>
                              <span className="font-medium">{service}</span>
                            </div>
                            <Badge variant="outline">{doctor.price} ر.س</Badge>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>
                
                <TabsContent value="reviews">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-semibold">تقييمات المرضى</h2>
                    <div className="flex items-center">
                      <Star className="h-5 w-5 text-yellow-400 fill-current ml-1" />
                      <span className="font-medium text-lg">{doctor.rating}</span>
                      <span className="text-gray-500 mr-1">({doctor.reviewCount} تقييم)</span>
                    </div>
                  </div>
                  
                  <div className="space-y-6">
                    {doctor.reviews.map(review => (
                      <ReviewItem key={review.id} review={review} />
                    ))}
                  </div>
                  
                  <div className="mt-8">
                    <Button>عرض جميع التقييمات</Button>
                  </div>
                </TabsContent>
                
                <TabsContent value="booking">
                  <h2 className="text-xl font-semibold mb-6">حجز موعد</h2>
                  <AppointmentBooking doctor={doctor} availableDates={doctor.availableDates} />
                </TabsContent>
              </Tabs>
            </div>
          </div>
          
          <div>
            <Card className="shadow-md sticky top-24">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4">احجز موعدك الآن</h3>
                <p className="text-gray-600 mb-4">سعر الكشف: <span className="font-bold text-primary">{doctor.price} ر.س</span></p>
                <p className="text-gray-600 mb-6">متوسط وقت الانتظار: 15 دقيقة</p>
                <Button className="w-full" onClick={() => setActiveTab("booking")}>
                  حجز موعد
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      
      <Footer />
      <Chatbot />
    </div>
  );
};

export default DoctorDetail;
