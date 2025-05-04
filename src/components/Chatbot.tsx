
import { useState } from 'react';
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
import { MessageCircle, Send } from 'lucide-react';

const Chatbot = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      text: 'مرحباً بك في محبوز! كيف يمكنني مساعدتك اليوم؟',
    },
  ]);
  const [newMessage, setNewMessage] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    // Add user message
    const userMessage = {
      id: messages.length + 1,
      type: 'user',
      text: newMessage,
    };
    
    setMessages([...messages, userMessage]);
    setNewMessage('');

    // Simulate bot response (would be replaced with actual AI in production)
    setTimeout(() => {
      const botResponses = {
        'فندق': 'لدينا مجموعة واسعة من الفنادق في مختلف المناطق. هل تبحث عن منطقة محددة أو ميزانية معينة؟',
        'طبيب': 'يمكنك البحث عن الأطباء حسب التخصص والموقع. هل تبحث عن تخصص طبي محدد؟',
        'سيارة': 'لدينا خيارات متعددة لتأجير السيارات، من السيارات الاقتصادية إلى الفاخرة. ما هو نوع السيارة التي تبحث عنها؟',
        'موعد': 'يمكنك حجز موعد طبي عن طريق اختيار التخصص والطبيب المناسب ثم تحديد الوقت المناسب لك.',
        'دفع': 'نقبل الدفع عبر بطاقات الائتمان والدفع الإلكتروني من خلال منصات مثل Moyasar وStripe.',
      };

      let botReply = 'شكراً لسؤالك! سأساعدك في العثور على ما تبحث عنه.';
      
      // Simple keyword matching (would use advanced NLP in production)
      for (const [keyword, response] of Object.entries(botResponses)) {
        if (newMessage.includes(keyword)) {
          botReply = response;
          break;
        }
      }

      const botResponse = {
        id: messages.length + 2,
        type: 'bot',
        text: botReply,
      };
      
      setMessages(prevMessages => [...prevMessages, botResponse]);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Chat Floating Button */}
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
          </SheetHeader>
          
          <div className="flex-1 overflow-y-auto py-4 arabic">
            {messages.map(message => (
              <div 
                key={message.id} 
                className={`mb-4 flex ${message.type === 'user' ? 'justify-start' : 'justify-end'}`}
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
          </div>
          
          <SheetFooter className="border-t pt-4">
            <div className="flex w-full items-center space-x-2 rtl:space-x-reverse">
              <Input 
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="اكتب رسالتك هنا..."
                className="arabic"
              />
              <Button size="icon" onClick={handleSendMessage}>
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default Chatbot;
