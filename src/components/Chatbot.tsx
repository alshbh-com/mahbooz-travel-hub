
import { useState, useEffect, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Sheet, 
  SheetContent, 
  SheetHeader, 
  SheetTitle,
  SheetTrigger,
  SheetFooter
} from "@/components/ui/sheet";
import { MessageCircle, Send, Mic, Phone, ArrowRight } from 'lucide-react';
import { toast } from "@/hooks/use-toast";

interface Suggestion {
  text: string;
  onClick: () => void;
}

interface Hotel {
  id: number;
  name: string;
  location: string;
  price: number;
  rating: number;
  country: string;
  image: string;
  features?: string[];
  description?: string;
  availability?: string;
  amenities: string[];
  roomTypes?: {
    name: string;
    price: number;
    capacity: number;
  }[];
}

const Chatbot = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      text: 'مرحباً بك في محجوز! كيف يمكنني مساعدتك في العثور على فندق مناسب في اليمن؟',
    },
  ]);
  const [newMessage, setNewMessage] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  // قائمة الفنادق اليمنية
  const hotels: Hotel[] = [
    {
      id: 1,
      name: "فندق القمة صنعاء",
      location: "شارع الزبيري، صنعاء، اليمن",
      image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4",
      price: 220,
      rating: 4.6,
      country: "اليمن",
      features: ["إطلالة على الجبال", "موقع مركزي", "بوفيه إفطار"],
      description: "فندق فاخر في قلب صنعاء القديمة، يتميز بتصميم يجمع بين الأصالة اليمنية والخدمات العصرية",
      availability: "متاح على مدار العام",
      amenities: ["واي فاي", "مطعم", "موقف سيارات", "قاعة اجتماعات", "خدمة الغرف"],
      roomTypes: [
        { name: "غرفة قياسية", price: 220, capacity: 2 },
        { name: "جناح ديلوكس", price: 350, capacity: 3 },
        { name: "جناح فاخر", price: 450, capacity: 4 }
      ]
    },
    {
      id: 2,
      name: "استراحة النخيل عدن",
      location: "شارع الساحل، عدن، اليمن",
      image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa",
      price: 180,
      rating: 4.5,
      country: "اليمن",
      features: ["إطلالة بحرية", "شاطئ خاص", "حدائق واسعة"],
      description: "منتجع ساحلي هادئ بالقرب من شواطئ عدن، يوفر إقامة مريحة مع إطلالات خلابة على البحر",
      availability: "متاح للحجز المسبق",
      amenities: ["واي فاي", "مسبح", "مطعم", "قاعة اجتماعات", "مكان للشواء"],
      roomTypes: [
        { name: "غرفة عادية", price: 180, capacity: 2 },
        { name: "غرفة عائلية", price: 280, capacity: 4 },
        { name: "فيلا صغيرة", price: 380, capacity: 6 }
      ]
    },
    {
      id: 3,
      name: "فندق قصر سبأ",
      location: "منطقة الروضة، صنعاء، اليمن",
      image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa",
      price: 250,
      rating: 4.7,
      country: "اليمن",
      features: ["تصميم تراثي", "أثاث تقليدي", "قاعة احتفالات"],
      description: "فندق تراثي يعكس الثقافة اليمنية الأصيلة، مصمم على الطراز المعماري اليمني التقليدي",
      availability: "متاح طوال السنة",
      amenities: ["واي فاي", "مطعم تقليدي", "صالة شاي", "جلسات تراثية", "موقف سيارات"],
      roomTypes: [
        { name: "غرفة تراثية", price: 250, capacity: 2 },
        { name: "جناح ملكي", price: 400, capacity: 4 }
      ]
    },
    {
      id: 4,
      name: "منتجع الشاطئ الذهبي",
      location: "خليج التواهي، عدن، اليمن",
      image: "https://images.unsplash.com/photo-1564501049412-61c2a3083791",
      price: 300,
      rating: 4.8,
      country: "اليمن",
      features: ["شاطئ خاص", "رياضات مائية", "مطل بانورامي"],
      description: "منتجع فاخر على شاطئ البحر العربي، يوفر تجربة استجمام متكاملة مع خدمات راقية",
      availability: "متاح بحجز مسبق",
      amenities: ["واي فاي", "مسبح لانهائي", "سبا", "مطاعم متعددة", "نادي للأطفال", "رياضات مائية"],
      roomTypes: [
        { name: "غرفة بإطلالة بحرية", price: 300, capacity: 2 },
        { name: "جناح شاطئي", price: 450, capacity: 3 },
        { name: "فيلا على الماء", price: 600, capacity: 6 }
      ]
    },
    {
      id: 5,
      name: "فندق تراث حضرموت",
      location: "وادي حضرموت، اليمن",
      image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb",
      price: 190,
      rating: 4.5,
      country: "اليمن",
      features: ["غرف طينية تقليدية", "إطلالات على الوادي", "طعام محلي تقليدي"],
      description: "فندق بناء تقليدي في قلب وادي حضرموت، يمنح الضيوف تجربة أصيلة للحياة الحضرمية",
      availability: "متاح طوال السنة باستثناء موسم الأمطار",
      amenities: ["واي فاي", "مطعم محلي", "جولات سياحية", "حديقة", "موقف سيارات"],
      roomTypes: [
        { name: "غرفة تقليدية", price: 190, capacity: 2 },
        { name: "جناح عائلي", price: 280, capacity: 5 }
      ]
    },
    {
      id: 6,
      name: "فندق جزيرة سقطرى",
      location: "جزيرة سقطرى، اليمن",
      image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4",
      price: 220,
      rating: 4.4,
      country: "اليمن",
      features: ["قريب من الطبيعة", "جولات بيئية", "أجواء استوائية"],
      description: "فندق بيئي فريد في جزيرة سقطرى الاستوائية، محاط بالنباتات النادرة والطبيعة الخلابة",
      availability: "متاح في الموسم السياحي (أكتوبر-أبريل)",
      amenities: ["واي فاي محدود", "وجبات محلية", "تنظيم رحلات استكشافية", "منطقة استرخاء"],
      roomTypes: [
        { name: "كوخ تقليدي", price: 220, capacity: 2 },
        { name: "خيمة فاخرة", price: 300, capacity: 3 }
      ]
    },
    {
      id: 7,
      name: "فندق باب اليمن",
      location: "شارع الستين، صنعاء، اليمن",
      image: "https://images.unsplash.com/photo-1566073771259-6a8506099945",
      price: 210,
      rating: 4.3,
      country: "اليمن",
      features: ["قريب من الأسواق التراثية", "تراس علوي", "مباني تاريخية"],
      description: "فندق وسط المدينة القديمة، على بعد خطوات من باب اليمن الشهير والأسواق التقليدية",
      availability: "متاح طوال السنة",
      amenities: ["واي فاي", "مطعم", "جلسة سطح", "خدمة استقبال 24 ساعة", "موقف سيارات"],
      roomTypes: [
        { name: "غرفة اقتصادية", price: 210, capacity: 2 },
        { name: "غرفة عائلية", price: 320, capacity: 4 }
      ]
    },
    {
      id: 8,
      name: "منتجع جبل الشرق",
      location: "تعز، اليمن",
      image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa",
      price: 240,
      rating: 4.6,
      country: "اليمن",
      features: ["إطلالة جبلية", "هواء نقي", "بيئة هادئة"],
      description: "منتجع جبلي هادئ يقع على ارتفاعات تعز، يوفر الهدوء والاسترخاء بعيدًا عن صخب المدينة",
      availability: "متاح طوال السنة",
      amenities: ["واي فاي", "مطعم", "حديقة", "تدفئة", "موقف سيارات"],
      roomTypes: [
        { name: "غرفة جبلية", price: 240, capacity: 2 },
        { name: "شاليه خاص", price: 380, capacity: 4 },
        { name: "جناح عائلي", price: 450, capacity: 6 }
      ]
    }
  ];

  // التمرير التلقائي إلى آخر رسالة
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const openWhatsApp = () => {
    const whatsappNumber = "201204486263";
    const message = "مرحباً، أود التحدث مع فريق الدعم في محجوز";
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  // وظيفة لاقتراح فنادق بناءً على ميزانية المستخدم والموقع
  const recommendHotels = (budget: number, location?: string, rating?: number, amenities?: string[]) => {
    let filtered = hotels;
    
    // تصفية حسب الميزانية
    if (budget) {
      filtered = filtered.filter(hotel => hotel.price <= budget);
    }
    
    // تصفية حسب الموقع إذا تم تحديده
    if (location) {
      filtered = filtered.filter(hotel => 
        hotel.location.includes(location) 
      );
    }
    
    // تصفية حسب التقييم إذا تم تحديده
    if (rating) {
      filtered = filtered.filter(hotel => hotel.rating >= rating);
    }
    
    // تصفية حسب وسائل الراحة إذا تم تحديدها
    if (amenities && amenities.length > 0) {
      filtered = filtered.filter(hotel => 
        amenities.some(amenity => hotel.amenities.some(a => a.includes(amenity)))
      );
    }
    
    // ترتيب النتائج حسب السعر (من الأرخص للأغلى)
    filtered.sort((a, b) => a.price - b.price);
    
    // إرجاع 3 فنادق كحد أقصى
    return filtered.slice(0, 3);
  };

  // البحث عن معلومات فندق محدد بالاسم
  const getHotelInfo = (hotelName: string) => {
    const hotel = hotels.find(h => h.name.includes(hotelName));
    return hotel;
  };

  // تحليل طلب المستخدم لاستخراج الميزانية والموقع
  const parseUserRequest = (text: string) => {
    // استخراج الميزانية
    const budgetMatch = text.match(/(\d+)\s*(ريال|دولار|$)/i);
    const budget = budgetMatch ? parseInt(budgetMatch[1]) : undefined;
    
    // استخراج الموقع
    const locations = ["صنعاء", "عدن", "تعز", "حضرموت", "سقطرى"];
    let location;
    
    for (const loc of locations) {
      if (text.includes(loc)) {
        location = loc;
        break;
      }
    }
    
    // استخراج التقييم المطلوب
    let rating;
    if (text.includes("5 نجوم") || text.includes("خمس نجوم")) {
      rating = 5;
    } else if (text.includes("4 نجوم") || text.includes("أربع نجوم")) {
      rating = 4;
    }
    
    // استخراج وسائل الراحة المطلوبة
    const amenities = [];
    if (text.includes("مسبح")) amenities.push("مسبح");
    if (text.includes("واي فاي") || text.includes("انترنت")) amenities.push("واي فاي");
    if (text.includes("إفطار") || text.includes("وجبة")) amenities.push("مطعم");
    if (text.includes("سبا") || text.includes("منتجع صحي")) amenities.push("سبا");
    
    return { budget, location, rating, amenities };
  };

  // تحويل الفنادق المقترحة إلى نص رد
  const formatHotelRecommendations = (recommendations: Hotel[]) => {
    if (recommendations.length === 0) {
      return "عذراً، لم أجد فنادق تناسب معاييرك. هل يمكنك توضيح ميزانيتك أو متطلباتك؟";
    }
    
    let response = "إليك بعض الفنادق التي قد تناسبك:\n\n";
    
    recommendations.forEach((hotel, index) => {
      response += `${index + 1}. ${hotel.name} (${hotel.location})\n`;
      response += `   السعر: ${hotel.price} ريال في الليلة\n`;
      response += `   التقييم: ${hotel.rating} ⭐\n`;
      if (hotel.features) {
        response += `   المميزات: ${hotel.features.join('، ')}\n`;
      }
      response += `\n`;
    });
    
    response += "هل ترغب في معرفة المزيد عن أي من هذه الفنادق؟";
    
    return response;
  };

  // تحويل معلومات فندق معين إلى نص رد
  const formatHotelDetails = (hotel: Hotel) => {
    if (!hotel) {
      return "عذراً، لم أجد معلومات عن هذا الفندق. هل يمكنك توضيح اسم الفندق؟";
    }
    
    let response = `معلومات عن ${hotel.name}:\n\n`;
    response += `الموقع: ${hotel.location}\n`;
    response += `السعر: يبدأ من ${hotel.price} ريال في الليلة\n`;
    response += `التقييم: ${hotel.rating} ⭐\n\n`;
    
    if (hotel.description) {
      response += `${hotel.description}\n\n`;
    }
    
    response += `وسائل الراحة: ${hotel.amenities.join('، ')}\n\n`;
    
    if (hotel.roomTypes && hotel.roomTypes.length > 0) {
      response += "أنواع الغرف:\n";
      hotel.roomTypes.forEach(room => {
        response += `- ${room.name}: ${room.price} ريال (تتسع لـ ${room.capacity} أشخاص)\n`;
      });
      response += "\n";
    }
    
    if (hotel.availability) {
      response += `التوافر: ${hotel.availability}\n\n`;
    }
    
    response += "هل ترغب في حجز هذا الفندق أو معرفة المزيد عن الخدمات المتوفرة؟";
    
    return response;
  };

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    // إضافة رسالة المستخدم
    const userMessage = {
      id: messages.length + 1,
      type: 'user',
      text: newMessage,
    };
    
    setMessages(prevMessages => [...prevMessages, userMessage]);
    setNewMessage('');
    setIsTyping(true);
    setSuggestions([]);

    // محاكاة رد المساعد الذكي
    setTimeout(() => {
      let botReply = '';
      let newSuggestions: Suggestion[] = [];
      
      // تحليل طلب المستخدم
      const userText = newMessage.toLowerCase();
      
      // البحث عن معلومات فندق محدد
      if (userText.includes('معلومات عن') || userText.includes('تفاصيل') || userText.includes('اخبرني عن')) {
        // استخراج اسم الفندق من الرسالة
        for (const hotel of hotels) {
          if (userText.includes(hotel.name.toLowerCase()) || 
              userText.includes(hotel.name.substring(0, 10).toLowerCase())) {
            const hotelInfo = getHotelInfo(hotel.name);
            botReply = formatHotelDetails(hotelInfo!);
            
            // اقتراحات متابعة
            newSuggestions = [
              { 
                text: 'حجز هذا الفندق', 
                onClick: () => handleSuggestionClick(`أريد حجز ${hotel.name}`)
              },
              { 
                text: 'البحث عن فندق آخر', 
                onClick: () => handleSuggestionClick('أريد فندق آخر')
              }
            ];
            break;
          }
        }
        
        // إذا لم يتم العثور على اسم فندق محدد
        if (!botReply) {
          botReply = "هل يمكنك توضيح اسم الفندق الذي تريد معرفة المزيد عنه؟";
          
          // اقتراح بعض الفنادق
          newSuggestions = hotels.slice(0, 3).map(hotel => ({
            text: hotel.name,
            onClick: () => handleSuggestionClick(`معلومات عن ${hotel.name}`)
          }));
        }
      } 
      // البحث عن فنادق بناءً على المعايير المحددة
      else if (userText.includes('فندق') || 
               userText.includes('حجز') || 
               userText.includes('ميزانية') || 
               userText.includes('سعر') ||
               userText.includes('ريال') ||
               userText.includes('دولار')) {
        
        const { budget, location, rating, amenities } = parseUserRequest(userText);
        
        if (budget || location || rating || (amenities && amenities.length > 0)) {
          const recommendations = recommendHotels(budget || 1000, location, rating, amenities);
          botReply = formatHotelRecommendations(recommendations);
          
          // اقتراحات متابعة
          if (recommendations.length > 0) {
            recommendations.forEach(hotel => {
              newSuggestions.push({
                text: `معلومات عن ${hotel.name}`,
                onClick: () => handleSuggestionClick(`أريد معرفة المزيد عن ${hotel.name}`)
              });
            });
          }
        } else {
          botReply = "يمكنني مساعدتك في إيجاد فندق يناسب ميزانيتك في اليمن. ما هي ميزانيتك التقريبية لليلة الواحدة؟";
          
          newSuggestions = [
            { 
              text: 'أقل من 200 ريال', 
              onClick: () => handleSuggestionClick('أبحث عن فندق بميزانية 200 ريال')
            },
            { 
              text: '200-300 ريال', 
              onClick: () => handleSuggestionClick('أبحث عن فندق بميزانية 300 ريال')
            },
            { 
              text: 'أكثر من 300 ريال', 
              onClick: () => handleSuggestionClick('أبحث عن فندق فاخر بميزانية 400 ريال')
            }
          ];
        }
      } 
      // استفسارات حول المدن والمناطق
      else if (userText.includes('صنعاء') || userText.includes('عدن') || 
               userText.includes('تعز') || userText.includes('حضرموت') ||
               userText.includes('سقطرى') || userText.includes('مدن')) {
        
        let location = '';
        if (userText.includes('صنعاء')) location = 'صنعاء';
        else if (userText.includes('عدن')) location = 'عدن';
        else if (userText.includes('تعز')) location = 'تعز';
        else if (userText.includes('حضرموت')) location = 'حضرموت';
        else if (userText.includes('سقطرى')) location = 'سقطرى';
        
        if (location) {
          const recommendations = recommendHotels(1000, location);
          botReply = `إليك الفنادق المتاحة في ${location}:\n\n`;
          botReply += formatHotelRecommendations(recommendations);
        } else {
          botReply = "نوفر فنادق في العديد من المدن اليمنية مثل صنعاء وعدن وتعز وحضرموت وجزيرة سقطرى. هل تبحث عن فندق في مدينة محددة؟";
          
          newSuggestions = [
            { text: 'فنادق في صنعاء', onClick: () => handleSuggestionClick('فنادق في صنعاء') },
            { text: 'فنادق في عدن', onClick: () => handleSuggestionClick('فنادق في عدن') },
            { text: 'فنادق في تعز', onClick: () => handleSuggestionClick('فنادق في تعز') },
          ];
        }
      }
      // استفسارات حول المرافق والخدمات
      else if (userText.includes('مسبح') || userText.includes('واي فاي') || 
               userText.includes('مطعم') || userText.includes('سبا') ||
               userText.includes('خدمات')) {
        
        let amenityRequest = [];
        if (userText.includes('مسبح')) amenityRequest.push('مسبح');
        if (userText.includes('واي فاي') || userText.includes('انترنت')) amenityRequest.push('واي فاي');
        if (userText.includes('مطعم') || userText.includes('طعام')) amenityRequest.push('مطعم');
        if (userText.includes('سبا')) amenityRequest.push('سبا');
        
        if (amenityRequest.length > 0) {
          const recommendations = recommendHotels(1000, undefined, undefined, amenityRequest);
          botReply = `إليك الفنادق التي توفر ${amenityRequest.join(' و ')}:\n\n`;
          botReply += formatHotelRecommendations(recommendations);
        } else {
          botReply = "توفر فنادقنا مجموعة متنوعة من المرافق مثل المسابح والواي فاي والمطاعم والسبا. هل تبحث عن خدمة معينة؟";
          
          newSuggestions = [
            { text: 'فنادق مع مسبح', onClick: () => handleSuggestionClick('فنادق بها مسبح') },
            { text: 'فنادق مع واي فاي', onClick: () => handleSuggestionClick('فنادق تقدم واي فاي') },
            { text: 'فنادق مع مطاعم', onClick: () => handleSuggestionClick('فنادق بها مطاعم') },
          ];
        }
      }
      else if (userText.includes('دعم') || userText.includes('مساعدة') || userText.includes('مشكلة')) {
        botReply = 'يمكنك التواصل مع فريق الدعم الفني عبر واتساب على مدار الساعة للحصول على المساعدة الفورية.';
        
        newSuggestions = [
          { 
            text: 'تواصل عبر واتساب', 
            onClick: openWhatsApp
          }
        ];
      } 
      else if (userText.includes('دفع') || userText.includes('بطاقة') || userText.includes('حساب')) {
        botReply = 'نحن نقبل الدفع عبر بطاقات الائتمان والدفع الإلكتروني. كما يمكنك الدفع عند الوصول في بعض الفنادق.';
        
        newSuggestions = [
          { 
            text: 'معرفة المزيد عن طرق الدفع', 
            onClick: () => handleSuggestionClick('كيف يمكنني الدفع؟')
          }
        ];
      } 
      // إذا لم يتطابق مع أي من الحالات السابقة
      else {
        botReply = 'يمكنني مساعدتك في إيجاد فندق مناسب في اليمن. هل يمكنك إخباري بميزانيتك التقريبية والمدينة التي تريد الإقامة فيها؟';
        
        newSuggestions = [
          { 
            text: 'فنادق رخيصة', 
            onClick: () => handleSuggestionClick('أبحث عن فندق رخيص بميزانية 200 ريال')
          },
          { 
            text: 'فنادق متوسطة', 
            onClick: () => handleSuggestionClick('أبحث عن فندق متوسط بميزانية 300 ريال')
          },
          { 
            text: 'فنادق فاخرة', 
            onClick: () => handleSuggestionClick('أبحث عن فندق فاخر بميزانية 400 ريال')
          },
          { 
            text: 'التواصل مع الدعم', 
            onClick: openWhatsApp
          }
        ];
      }
      
      setIsTyping(false);
      
      const botResponse = {
        id: messages.length + 2,
        type: 'bot',
        text: botReply,
      };
      
      setMessages(prevMessages => [...prevMessages, botResponse]);
      setSuggestions(newSuggestions);
    }, 1500);
  };

  const handleSuggestionClick = (text: string) => {
    setNewMessage(text);
    // يمكننا إرسال الرسالة مباشرة أو السماح للمستخدم بالتعديل عليها قبل الإرسال
    // handleSendMessage();
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  const showWhatsAppToast = () => {
    toast({
      title: "تم التوجيه إلى واتساب",
      description: "سيتم توجيهك للتواصل مع فريق الدعم الفني عبر واتساب",
    });
  };

  return (
    <>
      {/* زر الدردشة العائم */}
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button 
            className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg bg-gradient-to-r from-primary to-secondary hover:opacity-90"
            size="icon"
          >
            <MessageCircle className="h-6 w-6" />
          </Button>
        </SheetTrigger>
        <SheetContent side="right" className="w-[90%] sm:w-[400px] h-[600px] max-h-[90vh] flex flex-col">
          <SheetHeader>
            <SheetTitle className="text-right arabic">المساعد الذكي - محجوز اليمن</SheetTitle>
            <div className="flex gap-2 justify-end">
              <Button variant="outline" size="sm" onClick={openWhatsApp} className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                <span>دعم فوري واتساب</span>
              </Button>
            </div>
          </SheetHeader>
          
          <div className="flex-1 overflow-y-auto py-4 arabic" ref={chatContainerRef}>
            {messages.map(message => (
              <div 
                key={message.id} 
                className={`mb-4 flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div 
                  className={`px-4 py-2 rounded-lg max-w-[80%] ${
                    message.type === 'user' 
                      ? 'bg-gradient-to-r from-primary to-secondary text-white rounded-tr-none' 
                      : 'bg-gray-100 text-gray-800 rounded-tl-none'
                  }`}
                >
                  {message.text.split('\n').map((line, i) => (
                    <div key={i} className={i > 0 ? 'mt-1' : ''}>
                      {line}
                    </div>
                  ))}
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="mb-4 flex justify-start">
                <div className="px-4 py-2 rounded-lg bg-gray-100 text-gray-800">
                  <div className="flex gap-1">
                    <span className="animate-bounce">●</span>
                    <span className="animate-bounce" style={{ animationDelay: '0.2s' }}>●</span>
                    <span className="animate-bounce" style={{ animationDelay: '0.4s' }}>●</span>
                  </div>
                </div>
              </div>
            )}
            
            {suggestions.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2 mb-4">
                {suggestions.map((suggestion, index) => (
                  <Button 
                    key={index} 
                    variant="outline" 
                    size="sm" 
                    onClick={suggestion.onClick}
                    className="bg-gray-50 hover:bg-gray-100"
                  >
                    {suggestion.text}
                  </Button>
                ))}
              </div>
            )}
          </div>
          
          <SheetFooter className="border-t pt-4">
            <div className="flex w-full items-center space-x-2 rtl:space-x-reverse">
              <Button variant="outline" size="icon" className="shrink-0">
                <Mic className="h-4 w-4" />
              </Button>
              <Input 
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="اكتب رسالتك هنا..."
                className="arabic"
              />
              <Button 
                size="icon" 
                onClick={handleSendMessage} 
                className="shrink-0 bg-gradient-to-r from-primary to-secondary hover:opacity-90"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </SheetFooter>
        </SheetContent>
      </Sheet>
      
      {/* زر الدعم الفوري عبر واتساب */}
      <Button 
        className="fixed bottom-6 left-6 rounded-full shadow-lg flex items-center gap-2 bg-green-500 hover:bg-green-600"
        size="sm"
        onClick={() => {
          openWhatsApp();
          showWhatsAppToast();
        }}
      >
        <span>دعم فوري</span>
        <ArrowRight className="h-4 w-4" />
      </Button>
    </>
  );
};

export default Chatbot;
