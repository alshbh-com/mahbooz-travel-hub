
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Calendar, Users, MapPin, Star, ArrowLeft, Check, X, ChevronDown, ChevronUp } from 'lucide-react';

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Chatbot from "@/components/Chatbot";
import ImageGallery from "@/components/ImageGallery";
import BookingForm from "@/components/BookingForm";
import ReviewItem from "@/components/ReviewItem";

// بيانات مؤقتة للفنادق (هذه ستأتي من واجهة برمجة التطبيقات أو قاعدة بيانات في النظام النهائي)
const hotels = [
  {
    id: 1,
    name: "فندق القمة",
    location: "وسط مدينة عدل، اليمن",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945",
    price: 350,
    rating: 4.8,
    reviewCount: 124,
    amenities: ["واي فاي", "مسبح", "موقف سيارات", "مطعم", "صالة ألعاب رياضية", "مكيف هواء", "خدمة الغرف"],
    description: "يقع فندق القمة في قلب مدينة عدل، على بعد دقائق من معظم المعالم السياحية الرئيسية والمراكز التجارية. يوفر الفندق إقامة فاخرة مع إطلالات رائعة على المدينة والبحر.",
    rooms: [
      {
        id: 1,
        type: "غرفة عادية",
        price: 350,
        capacity: 2,
        beds: "سرير مزدوج",
        size: "28 متر مربع",
        amenities: ["تلفزيون", "ميني بار", "خزنة", "حمام خاص"],
        images: [
          "https://images.unsplash.com/photo-1611892440504-42a792e24d32",
          "https://images.unsplash.com/photo-1598928636135-d146006ff4be"
        ]
      },
      {
        id: 2,
        type: "جناح فاخر",
        price: 650,
        capacity: 4,
        beds: "سرير ملكي وسريران مفردان",
        size: "52 متر مربع",
        amenities: ["تلفزيون", "ميني بار", "خزنة", "حمام جاكوزي", "غرفة معيشة", "شرفة خاصة"],
        images: [
          "https://images.unsplash.com/photo-1591088398332-8a7791972843",
          "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b"
        ]
      }
    ],
    reviews: [
      {
        id: 1,
        user: "أحمد محمد",
        rating: 5,
        date: "2023-11-15",
        comment: "إقامة رائعة! الفندق نظيف والخدمة ممتازة. سأعود بالتأكيد مرة أخرى.",
        userImage: "https://images.unsplash.com/photo-1599566150163-29194dcaad36"
      },
      {
        id: 2,
        user: "سارة عبدالله",
        rating: 4,
        date: "2023-10-28",
        comment: "موقع مثالي، قريب من جميع المعالم السياحية. الغرفة كانت نظيفة ومريحة، لكن الإفطار كان عاديا.",
        userImage: "https://images.unsplash.com/photo-1494790108377-be9c29b29330"
      },
      {
        id: 3,
        user: "خالد العمري",
        rating: 5,
        date: "2023-12-02",
        comment: "أحد أفضل الفنادق التي أقمت فيها. الموظفون ودودون للغاية والمرافق ممتازة. أنصح به بشدة.",
        userImage: "https://images.unsplash.com/photo-1607746882042-944635dfe10e"
      }
    ],
    images: [
      "https://images.unsplash.com/photo-1566073771259-6a8506099945",
      "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa",
      "https://images.unsplash.com/photo-1445019980597-93fa8acb246c",
      "https://images.unsplash.com/photo-1584132915807-fd1f5fbc078f",
      "https://images.unsplash.com/photo-1562778612-e1e0cda9915c",
      "https://images.unsplash.com/photo-1601565415267-ec9a1d7e7fbd"
    ],
    policies: {
      checkIn: "من الساعة 14:00",
      checkOut: "حتى الساعة 12:00",
      cancellation: "إلغاء مجاني حتى 24 ساعة قبل موعد الوصول",
      children: "الأطفال مرحب بهم",
      pets: "لا يسمح باصطحاب الحيوانات الأليفة",
      payment: "بطاقات الائتمان، الدفع النقدي",
      smoking: "غرف لغير المدخنين متوفرة"
    },
    mapLocation: {
      lat: 12.7854,
      lng: 45.0186
    }
  },
  {
    id: 2,
    name: "استراحة النخيل",
    location: "شمال مدينة عدل، اليمن",
    image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b",
    price: 220,
    rating: 4.6,
    reviewCount: 86,
    amenities: ["واي فاي", "حديقة", "منطقة شواء", "مسبح خارجي", "ملعب أطفال", "موقف سيارات"],
    description: "استراحة النخيل هي ملاذ هادئ محاط بالحدائق الخضراء في شمال مدينة عدل. توفر الاستراحة أجواء مريحة وخاصة مع مسبح خارجي ومنطقة للشواء، مما يجعلها مثالية للعائلات والمجموعات.",
    rooms: [
      {
        id: 1,
        type: "استراحة صغيرة",
        price: 220,
        capacity: 6,
        beds: "سرير مزدوج و4 أسرة مفردة",
        size: "85 متر مربع",
        amenities: ["تلفزيون", "مطبخ صغير", "تكييف", "حمام خاص", "تراس"],
        images: [
          "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b",
          "https://images.unsplash.com/photo-1598928636135-d146006ff4be"
        ]
      },
      {
        id: 2,
        type: "استراحة كبيرة",
        price: 380,
        capacity: 10,
        beds: "سريران مزدوجان و6 أسرة مفردة",
        size: "120 متر مربع",
        amenities: ["تلفزيون", "مطبخ كامل", "تكييف", "حمامان", "تراس كبير", "شواية"],
        images: [
          "https://images.unsplash.com/photo-1576013551627-0ae7d1d231c7",
          "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85"
        ]
      }
    ],
    reviews: [
      {
        id: 1,
        user: "محمد العامري",
        rating: 5,
        date: "2023-12-15",
        comment: "مكان رائع للعائلة! استمتعنا بالمسبح والحديقة. الاستراحة نظيفة ومجهزة بشكل ممتاز.",
        userImage: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61"
      },
      {
        id: 2,
        user: "لينا الهاشمي",
        rating: 4,
        date: "2023-11-28",
        comment: "قضينا وقتًا ممتعًا في الاستراحة. المكان هادئ وجميل، لكن المسبح كان يحتاج إلى تنظيف.",
        userImage: "https://images.unsplash.com/photo-1664575602554-2087b04935a5"
      }
    ],
    images: [
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b",
      "https://images.unsplash.com/photo-1576013551627-0ae7d1d231c7",
      "https://images.unsplash.com/photo-1564501049412-61c2a3083791",
      "https://images.unsplash.com/photo-1508253578933-20b529302151"
    ],
    policies: {
      checkIn: "من الساعة 15:00",
      checkOut: "حتى الساعة 13:00",
      cancellation: "إلغاء مجاني حتى 48 ساعة قبل موعد الوصول",
      children: "الأطفال مرحب بهم",
      pets: "لا يسمح باصطحاب الحيوانات الأليفة",
      payment: "الدفع المسبق مطلوب",
      smoking: "التدخين مسموح في المناطق الخارجية فقط"
    },
    mapLocation: {
      lat: 12.8154,
      lng: 45.0286
    }
  },
  {
    id: 3,
    name: "فندق روز جاردن",
    location: "جنوب مدينة عدل، اليمن",
    image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4",
    price: 420,
    rating: 4.9,
    reviewCount: 201,
    amenities: ["واي فاي", "مسبح", "مطعم", "صالة رياضية", "منتجع صحي", "خدمة غرف على مدار 24 ساعة", "نادي للأطفال"],
    description: "فندق روز جاردن هو منتجع فاخر يقع في المنطقة الهادئة جنوب مدينة عدل، محاط بالحدائق المورقة وإطلالات على البحر. يتميز بخدماته الاستثنائية ومرافقه الراقية.",
    rooms: [
      {
        id: 1,
        type: "غرفة ديلوكس",
        price: 420,
        capacity: 2,
        beds: "سرير كينغ",
        size: "32 متر مربع",
        amenities: ["تلفزيون بشاشة مسطحة", "ميني بار", "خزنة", "حمام فاخر", "روب حمام", "شرفة"],
        images: [
          "https://images.unsplash.com/photo-1618773928121-c32242e63f39",
          "https://images.unsplash.com/photo-1584132915807-fd1f5fbc078f"
        ]
      },
      {
        id: 2,
        type: "جناح تنفيذي",
        price: 780,
        capacity: 3,
        beds: "سرير كينغ وسرير مفرد",
        size: "62 متر مربع",
        amenities: ["تلفزيون بشاشة مسطحة", "ميني بار", "خزنة", "حمام جاكوزي", "صالة", "تراس خاص", "خدمة باتلر"],
        images: [
          "https://images.unsplash.com/photo-1591088398332-8a7791972843",
          "https://images.unsplash.com/photo-1578683010236-d716f9a3f461"
        ]
      }
    ],
    reviews: [
      {
        id: 1,
        user: "فيصل القاسم",
        rating: 5,
        date: "2024-01-15",
        comment: "تجربة استثنائية! الخدمة والنظافة والمرافق كلها فوق الممتازة. المنتجع الصحي رائع!",
        userImage: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5"
      },
      {
        id: 2,
        user: "رنا الشمري",
        rating: 5,
        date: "2023-12-18",
        comment: "من أفضل الفنادق في المنطقة. الغرفة مريحة ومجهزة بشكل جيد، والإفطار متنوع وشهي.",
        userImage: "https://images.unsplash.com/photo-1569913486515-b74bf7751574"
      }
    ],
    images: [
      "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4",
      "https://images.unsplash.com/photo-1582719508461-905c673771fd",
      "https://images.unsplash.com/photo-1455587734955-081b22074882",
      "https://images.unsplash.com/photo-1530229540764-e6faaf2e794e",
      "https://images.unsplash.com/photo-1621275471769-e6aa344546d5"
    ],
    policies: {
      checkIn: "من الساعة 15:00",
      checkOut: "حتى الساعة 11:00",
      cancellation: "إلغاء مجاني حتى 72 ساعة قبل موعد الوصول",
      children: "الأطفال مرحب بهم. نادي للأطفال متوفر",
      pets: "لا يسمح باصطحاب الحيوانات الأليفة",
      payment: "جميع البطاقات الائتمانية الرئيسية مقبولة",
      smoking: "فندق لغير المدخنين"
    },
    mapLocation: {
      lat: 12.7654,
      lng: 45.0386
    }
  }
];

const HotelDetail = () => {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState("details");
  const [showAllAmenities, setShowAllAmenities] = useState(false);
  const [roomSelection, setRoomSelection] = useState<number | null>(null);
  
  const hotelId = parseInt(id || "1");
  const hotel = hotels.find(h => h.id === hotelId) || hotels[0];
  
  const displayedAmenities = showAllAmenities ? hotel.amenities : hotel.amenities.slice(0, 4);
  
  return (
    <div className="min-h-screen arabic" dir="rtl">
      <Navbar siteName="محجوز" />
      
      <div className="container mx-auto px-4 py-8">
        {/* زر العودة + اسم الفندق */}
        <div className="flex items-center justify-between mb-6">
          <Link to="/" className="flex items-center text-gray-600 hover:text-primary transition-colors">
            <ArrowLeft className="ml-2 h-5 w-5" />
            <span>العودة إلى القائمة</span>
          </Link>
          <div className="flex items-center">
            <Star className="h-5 w-5 text-yellow-400 fill-current ml-1" />
            <span className="font-medium">{hotel.rating}</span>
            <span className="text-gray-500 mr-1">({hotel.reviewCount} تقييم)</span>
          </div>
        </div>
        
        <h1 className="text-3xl font-bold mb-2">{hotel.name}</h1>
        
        <div className="flex items-center text-gray-600 mb-6">
          <MapPin className="h-5 w-5 ml-2" />
          <span>{hotel.location}</span>
        </div>
        
        {/* معرض الصور */}
        <ImageGallery images={hotel.images} />
        
        {/* تبويبات المعلومات */}
        <div className="mt-12">
          <Tabs defaultValue="details" className="w-full" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-4 mb-8">
              <TabsTrigger value="details">التفاصيل</TabsTrigger>
              <TabsTrigger value="rooms">الغرف</TabsTrigger>
              <TabsTrigger value="reviews">التقييمات</TabsTrigger>
              <TabsTrigger value="policies">السياسات</TabsTrigger>
            </TabsList>
            
            <TabsContent value="details" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="md:col-span-2">
                  <h2 className="text-2xl font-semibold mb-4">عن الفندق</h2>
                  <p className="text-gray-700 mb-8 leading-relaxed">
                    {hotel.description}
                  </p>
                  
                  <h2 className="text-2xl font-semibold mb-4">المرافق والخدمات</h2>
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    {displayedAmenities.map((amenity, index) => (
                      <div key={index} className="flex items-center">
                        <Check className="h-4 w-4 text-primary ml-2" />
                        <span className="text-gray-700">{amenity}</span>
                      </div>
                    ))}
                  </div>
                  
                  {hotel.amenities.length > 4 && (
                    <Button
                      variant="ghost"
                      onClick={() => setShowAllAmenities(!showAllAmenities)}
                      className="text-primary mt-2"
                    >
                      {showAllAmenities ? (
                        <>
                          <ChevronUp className="ml-1 h-4 w-4" />
                          عرض أقل
                        </>
                      ) : (
                        <>
                          <ChevronDown className="ml-1 h-4 w-4" />
                          عرض جميع المرافق ({hotel.amenities.length})
                        </>
                      )}
                    </Button>
                  )}
                </div>
                
                <div>
                  <Card className="shadow-md border-t-4 border-primary">
                    <CardContent className="pt-6">
                      <BookingForm hotel={hotel} />
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="rooms">
              <h2 className="text-2xl font-semibold mb-6">الغرف والأجنحة</h2>
              <div className="space-y-6">
                {hotel.rooms.map((room) => (
                  <Card key={room.id} className={`overflow-hidden transition-all ${roomSelection === room.id ? 'border-primary ring-1 ring-primary' : ''}`}>
                    <div className="grid grid-cols-1 md:grid-cols-3">
                      <div className="h-48 md:h-full overflow-hidden">
                        <img 
                          src={room.images[0]} 
                          alt={room.type}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="p-6 md:col-span-2">
                        <div className="flex justify-between items-start">
                          <h3 className="text-xl font-semibold mb-3">{room.type}</h3>
                          <div className="text-xl font-bold text-primary">
                            {room.price} ر.س
                            <span className="text-sm font-normal text-gray-500">/ليلة</span>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4 mb-4">
                          <div className="flex items-center text-gray-600">
                            <Users className="h-4 w-4 ml-2" />
                            <span>السعة: {room.capacity} أشخاص</span>
                          </div>
                          <div className="flex items-center text-gray-600">
                            <span>الأسرّة: {room.beds}</span>
                          </div>
                          <div className="flex items-center text-gray-600">
                            <span>المساحة: {room.size}</span>
                          </div>
                        </div>
                        
                        <div className="mb-4">
                          <div className="flex flex-wrap gap-2">
                            {room.amenities.map((amenity, index) => (
                              <Badge key={index} variant="outline">{amenity}</Badge>
                            ))}
                          </div>
                        </div>
                        
                        <div className="flex justify-end">
                          <Button 
                            onClick={() => setRoomSelection(room.id === roomSelection ? null : room.id)}
                            className={roomSelection === room.id ? 'bg-green-600 hover:bg-green-700' : ''}
                          >
                            {roomSelection === room.id ? 'تم الاختيار' : 'اختر هذه الغرفة'}
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}

                {roomSelection && (
                  <div className="mt-8">
                    <Card className="border-t-4 border-primary">
                      <CardContent className="pt-6">
                        <h3 className="text-xl font-semibold mb-4">احجز الغرفة المختارة</h3>
                        <BookingForm 
                          hotel={hotel} 
                          room={hotel.rooms.find(r => r.id === roomSelection)} 
                        />
                      </CardContent>
                    </Card>
                  </div>
                )}
              </div>
            </TabsContent>
            
            <TabsContent value="reviews">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="md:col-span-2">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-semibold">تقييمات النزلاء</h2>
                    <div className="flex items-center">
                      <Star className="h-5 w-5 text-yellow-400 fill-current ml-1" />
                      <span className="font-medium text-lg">{hotel.rating}</span>
                      <span className="text-gray-500 mr-1">({hotel.reviewCount} تقييم)</span>
                    </div>
                  </div>
                  
                  <div className="space-y-6">
                    {hotel.reviews.map(review => (
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
                      <p className="text-gray-600 mb-4">شارك تجربتك مع النزلاء الآخرين</p>
                      <Button className="w-full">كتابة تقييم</Button>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="policies">
              <h2 className="text-2xl font-semibold mb-6">سياسات الفندق</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <div className="mb-6">
                    <h3 className="font-semibold text-lg mb-2">الوصول والمغادرة</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-gray-600">تسجيل الوصول:</p>
                        <p className="font-medium">{hotel.policies.checkIn}</p>
                      </div>
                      <div>
                        <p className="text-gray-600">تسجيل المغادرة:</p>
                        <p className="font-medium">{hotel.policies.checkOut}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <h3 className="font-semibold text-lg mb-2">سياسة الإلغاء</h3>
                    <p>{hotel.policies.cancellation}</p>
                  </div>
                  
                  <div className="mb-6">
                    <h3 className="font-semibold text-lg mb-2">الأطفال والأسرة الإضافية</h3>
                    <p>{hotel.policies.children}</p>
                  </div>
                </div>
                
                <div>
                  <div className="mb-6">
                    <h3 className="font-semibold text-lg mb-2">الحيوانات الأليفة</h3>
                    <p>{hotel.policies.pets}</p>
                  </div>
                  
                  <div className="mb-6">
                    <h3 className="font-semibold text-lg mb-2">طرق الدفع المقبولة</h3>
                    <p>{hotel.policies.payment}</p>
                  </div>
                  
                  <div className="mb-6">
                    <h3 className="font-semibold text-lg mb-2">سياسة التدخين</h3>
                    <p>{hotel.policies.smoking}</p>
                  </div>
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

export default HotelDetail;
