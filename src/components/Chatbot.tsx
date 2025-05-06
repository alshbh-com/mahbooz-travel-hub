
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

    // محاكاة رد المساعد الذكي (سيتم استبدالها بالذكاء الاصطناعي الفعلي في الإنتاج)
    setTimeout(() => {
      let botReply = '';
      let newSuggestions: Suggestion[] = [];
      
      // تحليل بسيط للكلمات المفتاحية (سيتم استبدالها بـ NLP متقدم في الإنتاج)
      if (newMessage.includes('فندق') || newMessage.includes('حجز') || newMessage.includes('استراحة') || newMessage.includes('غرفة')) {
        botReply = 'لدينا مجموعة واسعة من الفنادق والاستراحات في مختلف المناطق. هل تبحث عن منطقة محددة أو ميزانية معينة؟';
        
        newSuggestions = [
          { 
            text: 'فنادق في الرياض', 
            onClick: () => handleSuggestionClick('أريد معلومات عن الفنادق المتاحة في الرياض')
          },
          { 
            text: 'فنادق رخيصة', 
            onClick: () => handleSuggestionClick('أبحث عن فنادق بأسعار اقتصادية')
          },
          { 
            text: 'فنادق مع مسبح', 
            onClick: () => handleSuggestionClick('أبحث عن فنادق توفر مسبح خاص')
          }
        ];
      } 
      else if (newMessage.includes('سعر') || newMessage.includes('تكلفة')) {
        botReply = 'تختلف أسعار الفنادق حسب التصنيف والموقع والمواسم. هل هناك فندق محدد تريد معرفة سعره؟';
        
        newSuggestions = [
          { 
            text: 'فنادق 5 نجوم', 
            onClick: () => handleSuggestionClick('ما هي أسعار فنادق الخمس نجوم؟')
          },
          { 
            text: 'أرخص الفنادق', 
            onClick: () => handleSuggestionClick('ما هي أرخص الفنادق المتاحة؟')
          }
        ];
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
        botReply = 'شكراً لتواصلك معنا! هل يمكنني مساعدتك في البحث عن فندق أو الإجابة عن أي استفسارات أخرى؟';
        
        newSuggestions = [
          { 
            text: 'فنادق قريبة مني', 
            onClick: () => handleSuggestionClick('أبحث عن فنادق قريبة من موقعي الحالي')
          },
          { 
            text: 'عروض خاصة', 
            onClick: () => handleSuggestionClick('هل لديكم عروض خاصة للحجوزات؟')
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
      
      // اقتراحات ذكية بناءً على تاريخ التصفح (محاكاة)
      if (Math.random() > 0.5) {
        setTimeout(() => {
          const recommendationMessage = {
            id: messages.length + 3,
            type: 'bot',
            text: 'بناءً على تفضيلاتك السابقة، قد تهتم بفندق القمة في الرياض. هل ترغب في معرفة المزيد عنه؟',
          };
          setMessages(prevMessages => [...prevMessages, recommendationMessage]);
        }, 3000);
      }
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
                  {message.text}
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
