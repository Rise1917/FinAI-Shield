import { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { ScrollArea } from './ui/scroll-area';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Send, Bot, User } from 'lucide-react';

interface AIChatProps {
  language: 'ru' | 'kk';
}

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

export function AIChat({ language }: AIChatProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: language === 'ru' 
        ? 'Привет! Я FinAI — твой умный финансовый помощник. Спроси меня о расходах, накоплениях или безопасности переводов!' 
        : 'Сәлем! Мен FinAI — сіздің ақылды қаржылық көмекшіңізмін. Маған шығындар, жинақтаулар немесе аударымдардың қауіпсіздігі туралы сұраңыз!',
      sender: 'ai',
      timestamp: new Date(),
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const translations = {
    ru: {
      title: 'FinAI Помощник',
      subtitle: 'Задавайте вопросы о финансах',
      placeholder: 'Напишите ваш вопрос...',
      suggestions: 'Популярные вопросы:',
      question1: 'Где я больше всего трачу?',
      question2: 'Как накопить на цель?',
      question3: 'Проверить безопасность перевода',
      question4: 'Советы по экономии',
    },
    kk: {
      title: 'FinAI Көмекші',
      subtitle: 'Қаржы туралы сұрақтар қойыңыз',
      placeholder: 'Сұрағыңызды жазыңыз...',
      suggestions: 'Танымал сұрақтар:',
      question1: 'Мен қайда көбірек жұмсаймын?',
      question2: 'Мақсатқа қалай жинақтау керек?',
      question3: 'Аударымның қауіпсіздігін тексеру',
      question4: 'Үнемдеу бойынша кеңестер',
    }
  };

  const t = translations[language];

  const aiResponses = {
    ru: {
      spending: 'По моему анализу, больше всего ты тратишь на еду — 85,000 ₸ в месяц (42%). Это выше среднего по Казахстану на 15%. Попробуй:\n\n• Готовить дома чаще\n• Покупать продукты оптом в Magnum\n• Использовать кэшбэк от Kaspi\n\nЭто сэкономит до 28,000 ₸/месяц!',
      savings: 'Отличный вопрос! Вот твой план накопления:\n\n🎯 Цель: 500,000 ₸\n💰 Уже накоплено: 340,000 ₸ (68%)\n📅 До Нового года: 84 дня\n💵 Откладывай: 1,905 ₸/день\n\nТы на правильном пути! Продолжай в том же духе.',
      security: 'Перед переводом я рекомендую:\n\n✅ Проверить номер/карту в разделе "Проверка"\n✅ Убедиться, что знаешь получателя\n✅ Не переводить по ссылкам из SMS/Telegram\n\nХочешь проверить конкретный номер? Используй раздел "Проверка на мошенничество"',
      tips: 'Вот мои топ-советы для экономии:\n\n💡 Отменяй неиспользуемые подписки (Netflix, Spotify)\n🏪 Покупай продукты раз в неделю списком\n🚗 Используй каршеринг вместо такси\n💳 Включи автоперевод 10% в накопления\n\nЭто сэкономит минимум 35,000 ₸/месяц!',
      default: 'Отличный вопрос! Я могу помочь с:\n\n• Анализом расходов\n• Планированием бюджета\n• Проверкой безопасности\n• Советами по накоплениям\n\nЧто именно интересует?'
    },
    kk: {
      spending: 'Менің талдауым бойынша, сіз тамаққа көбірек жұмсайсыз — айына 85,000 ₸ (42%). Бұл Қазақстан бойынша орташадан 15% жоғары. Көріңіз:\n\n• Үйде жиі пісіру\n• Магнумда өнімдерді көлемді сатып алу\n• Каспидің кэшбэгін пайдалану\n\nБұл айына 28,000 ₸ үнемдейді!',
      savings: 'Керемет сұрақ! Міне сіздің жинақтау жоспарыңыз:\n\n🎯 Мақсат: 500,000 ₸\n💰 Жинақталған: 340,000 ₸ (68%)\n📅 Жаңа жылға дейін: 84 күн\n💵 Үнемдеңіз: 1,905 ₸/күн\n\nСіз дұрыс жолдасыз! Осылай жалғастырыңыз.',
      security: 'Аударымнан бұрын мен ұсынамын:\n\n✅ "Тексеру" бөлімінде нөмірді/картаны тексеру\n✅ Алушыны білетініңізге көз жеткізіңіз\n✅ SMS/Telegram сілтемелері бойынша аудармаңыз\n\nНақты нөмірді тексергіңіз келе ме? "Алаяқтықты тексеру" бөлімін пайдаланыңыз',
      tips: 'Міне үнемдеу үшін менің кеңестерім:\n\n💡 Пайдаланылмайтын жазылымдарды болдырмау (Netflix, Spotify)\n🏪 Тізім бойынша аптасына бір рет өнім сатып алу\n🚗 Такси орнына каршеринг пайдалану\n💳 Жинаққа 10% автоаударымды қосу\n\nБұл айына кемінде 35,000 ₸ үнемдейді!',
      default: 'Керемет сұрақ! Мен көмектесе аламын:\n\n• Шығындарды талдау\n• Бюджетті жоспарлау\n• Қауіпсіздікті тексеру\n• Жинақтау бойынша кеңестер\n\nНені білгіңіз келеді?'
    }
  };

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const getAIResponse = (userMessage: string) => {
    const responses = aiResponses[language];
    const lowerMessage = userMessage.toLowerCase();

    if (lowerMessage.includes('трач') || lowerMessage.includes('расход') || lowerMessage.includes('жұмса') || lowerMessage.includes('шығын')) {
      return responses.spending;
    } else if (lowerMessage.includes('накоп') || lowerMessage.includes('цел') || lowerMessage.includes('жинақ') || lowerMessage.includes('мақсат')) {
      return responses.savings;
    } else if (lowerMessage.includes('безопас') || lowerMessage.includes('провер') || lowerMessage.includes('мошенн') || lowerMessage.includes('қауіпсіз') || lowerMessage.includes('тексер') || lowerMessage.includes('алаяқ')) {
      return responses.security;
    } else if (lowerMessage.includes('совет') || lowerMessage.includes('эконом') || lowerMessage.includes('кеңес') || lowerMessage.includes('үнем')) {
      return responses.tips;
    }
    return responses.default;
  };

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: messages.length + 1,
      text: input,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages([...messages, userMessage]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      const aiMessage: Message = {
        id: messages.length + 2,
        text: getAIResponse(input),
        sender: 'ai',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1000);
  };

  const handleSuggestionClick = (question: string) => {
    setInput(question);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <Card className="lg:col-span-2 flex flex-col h-[600px]">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bot className="w-6 h-6 text-blue-600" />
            {t.title}
          </CardTitle>
          <CardDescription>{t.subtitle}</CardDescription>
        </CardHeader>
        <CardContent className="flex-1 flex flex-col p-0">
          <ScrollArea className="flex-1 px-6" ref={scrollRef}>
            <div className="space-y-4 py-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex gap-3 ${message.sender === 'user' ? 'flex-row-reverse' : ''}`}
                >
                  <Avatar className="w-8 h-8">
                    <AvatarFallback className={message.sender === 'ai' ? 'bg-blue-100' : 'bg-purple-100'}>
                      {message.sender === 'ai' ? <Bot className="w-4 h-4 text-blue-600" /> : <User className="w-4 h-4 text-purple-600" />}
                    </AvatarFallback>
                  </Avatar>
                  <div
                    className={`rounded-2xl px-4 py-3 max-w-[80%] ${
                      message.sender === 'user'
                        ? 'bg-blue-600 text-white'
                        : 'bg-muted'
                    }`}
                  >
                    <p className="whitespace-pre-line">{message.text}</p>
                    <p className={`text-xs mt-1 ${message.sender === 'user' ? 'text-blue-100' : 'text-muted-foreground'}`}>
                      {message.timestamp.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex gap-3">
                  <Avatar className="w-8 h-8">
                    <AvatarFallback className="bg-blue-100">
                      <Bot className="w-4 h-4 text-blue-600" />
                    </AvatarFallback>
                  </Avatar>
                  <div className="rounded-2xl px-4 py-3 bg-muted">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                      <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                      <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>
          <div className="p-4 border-t">
            <div className="flex gap-2">
              <Input
                placeholder={t.placeholder}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              />
              <Button onClick={handleSend} disabled={!input.trim()}>
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>{t.suggestions}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <Button
            variant="outline"
            className="w-full justify-start h-auto py-3 px-4 text-left"
            onClick={() => handleSuggestionClick(t.question1)}
          >
            {t.question1}
          </Button>
          <Button
            variant="outline"
            className="w-full justify-start h-auto py-3 px-4 text-left"
            onClick={() => handleSuggestionClick(t.question2)}
          >
            {t.question2}
          </Button>
          <Button
            variant="outline"
            className="w-full justify-start h-auto py-3 px-4 text-left"
            onClick={() => handleSuggestionClick(t.question3)}
          >
            {t.question3}
          </Button>
          <Button
            variant="outline"
            className="w-full justify-start h-auto py-3 px-4 text-left"
            onClick={() => handleSuggestionClick(t.question4)}
          >
            {t.question4}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
