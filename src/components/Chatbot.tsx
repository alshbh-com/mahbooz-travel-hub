
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
}

const Chatbot = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      text: 'مرحباً بك في محجوز! كيف يمكنني مساعدتك اليوم؟',
    },
  ]);
  const [newMessage, setNewMessage] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  // قائمة الفنادق (نستخدم نفس البيانات الموجودة في الموقع)
  const hotels: Hotel[] = [
    {
      id: 1,
      name: "فندق رويال الرياض",
      location: "الرياض، السعودية",
      image: "https://images.unsplash.com/photo-1566073771259-6a8506099945",
      price: 350,
      rating: 4.8,
      country: "السعودية"
    },
    {
      id: 2,
      name: "برج الفيصلية للأجنحة الفندقية",
      location: "جدة، السعودية",
      image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b",
      price: 420,
      rating: 4.9,
      country: "السعودية"
    },
    {
      id: 3,
      name: "فندق القمة",
      location: "صنعاء، اليمن",
      image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4",
      price: 220,
      rating: 4.6,
      country: "اليمن"
    },
    {
      id: 4,
      name: "استراحة النخيل",
      location: "عدن، اليمن",
      image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa",
      price: 180,
      rating: 4.5,
      country: "اليمن"
    },
    {
      id: 5,
      name: "فندق الماسة القاهرة",
      location: "القاهرة، مصر",
      image: "https://images.unsplash.com/photo-1566073771259-6a8506099945",
      price: 280,
      rating: 4.7,
      country: "مصر"
    },
    {
      id: 6,
      name: "برج العرب",
      location: "دبي، الإمارات",
      image: "https://images.unsplash.com/photo-1590073844006-33379778ae09",
      price: 950,
      rating: 5.0,
      country: "الإمارات"
    },
    {
      id: 7,
      name: "قصر الإمارات",
      location: "أبو ظبي، الإمارات",
      image: "https://images.unsplash.com/photo-1566665797739-1674de7a421a",
      price: 850,
      rating: 4.9,
      country: "الإمارات"
    },
    {
      id: 8,
      name: "مندرين أورينتال الدوحة",
      location: "الدوحة، قطر",
      image: "https://images.unsplash.com/photo-1564501049412-61c2a3083791",
      price: 780,
      rating: 4.8,
      country: "قطر"
    },
    {
      id: 9,
      name: "فندق الشعلة الدوحة",
      location: "الدوحة، قطر",
      image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa",
      price: 650,
      rating: 4.7,
      country: "قطر"
    },
    {
      id: 10,
      name: "فندق الجبل الأخضر",
      location: "مسقط، عمان",
      image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb",
      price: 320,
      rating: 4.6,
      country: "عمان"
    },
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
  const recommendHotels = (budget: number, country?: string, rating?: number) => {
    let filtered = hotels;
    
    // تصفية حسب الميزانية
    if (budget) {
      filtered = filtered.filter(hotel => hotel.price <= budget);
    }
    
    // تصفية حسب البلد إذا تم تحديده
    if (country) {
      filtered = filtered.filter(hotel => 
        hotel.country.includes(country) || 
        hotel.location.includes(country)
      );
    }
    
    // تصفية حسب التقييم إذا تم تحديده
    if (rating) {
      filtered = filtered.filter(hotel => hotel.rating >= rating);
    }
    
    // ترتيب النتائج حسب السعر (من الأرخص للأغلى)
    filtered.sort((a, b) => a.price - b.price);
    
    // إرجاع 3 فنادق كحد أقصى
    return filtered.slice(0, 3);
  };

  // تحليل طلب المستخدم لاستخراج الميزانية والموقع
  const parseUserRequest = (text: string) => {
    // استخراج الميزانية
    const budgetMatch = text.match(/(\d+)\s*(ريال|دولار|$)/i);
    const budget = budgetMatch ? parseInt(budgetMatch[1]) : undefined;
    
    // استخراج البلد
    const countries = ["السعودية", "اليمن", "مصر", "الإمارات", "قطر", "عمان"];
    let country;
    
    for (const c of countries) {
      if (text.includes(c)) {
        country = c;
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
    
    return { budget, country, rating };
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
      response += `   التقييم: ${hotel.rating} ⭐\n\n`;
    });
    
    response += "هل ترغب في معرفة المزيد عن أي من هذه الفنادق؟";
    
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
      
      // تحليل الكلمات المفتاحية
      if (newMessage.includes('فندق') || 
          newMessage.includes('حجز') || 
          newMessage.includes('ميزانية') || 
          newMessage.includes('سعر') ||
          newMessage.includes('ريال') ||
          newMessage.includes('دولار')) {
        
        const { budget, country, rating } = parseUserRequest(newMessage);
        
        if (budget) {
          const recommendations = recommendHotels(budget, country, rating);
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
          botReply = "يمكنني مساعدتك في إيجاد فندق يناسب ميزانيتك. ما هي ميزانيتك التقريبية لليلة الواحدة؟";
          
          newSuggestions = [
            { 
              text: 'أقل من 200 ريال', 
              onClick: () => handleSuggestionClick('أبحث عن فندق بميزانية 200 ريال')
            },
            { 
              text: '200-500 ريال', 
              onClick: () => handleSuggestionClick('أبحث عن فندق بميزانية 500 ريال')
            },
            { 
              text: 'أكثر من 500 ريال', 
              onClick: () => handleSuggestionClick('أبحث عن فندق فاخر بميزانية 1000 ريال')
            }
          ];
        }
      } 
      else if (newMessage.includes('دعم') || newMessage.includes('مساعدة') || newMessage.includes('مشكلة')) {
        botReply = 'يمكنك التواصل مع فريق الدعم الفني عبر واتساب على مدار الساعة للحصول على المساعدة الفورية.';
        
        newSuggestions = [
          { 
            text: 'تواصل عبر واتساب', 
            onClick: openWhatsApp
          }
        ];
      } 
      else if (newMessage.includes('دفع') || newMessage.includes('بطاقة') || newMessage.includes('حساب')) {
        botReply = 'نحن نقبل الدفع عبر بطاقات الائتمان والدفع الإلكتروني. كما يمكنك الدفع عند الوصول في بعض الفنادق.';
      } 
      else {
        botReply = 'يمكنني مساعدتك في إيجاد فندق مناسب لميزانيتك واحتياجاتك. هل يمكنك إخباري بالميزانية التقريبية وأي متطلبات خاصة؟';
        
        newSuggestions = [
          { 
            text: 'فنادق رخيصة', 
            onClick: () => handleSuggestionClick('أبحث عن فندق رخيص بميزانية 200 ريال')
          },
          { 
            text: 'فنادق متوسطة', 
            onClick: () => handleSuggestionClick('أبحث عن فندق متوسط بميزانية 400 ريال')
          },
          { 
            text: 'فنادق فاخرة', 
            onClick: () => handleSuggestionClick('أبحث عن فندق فاخر بميزانية 800 ريال')
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
            className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg"
            size="icon"
          >
            <MessageCircle className="h-6 w-6" />
          </Button>
        </SheetTrigger>
        <SheetContent side="right" className="w-[90%] sm:w-[400px] h-[600px] max-h-[90vh] flex flex-col">
          <SheetHeader>
            <SheetTitle className="text-right arabic">المساعد الذكي</SheetTitle>
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
                      ? 'bg-primary text-white rounded-tr-none' 
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
                    className="bg-gray-50"
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
              <Button size="icon" onClick={handleSendMessage} className="shrink-0">
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
