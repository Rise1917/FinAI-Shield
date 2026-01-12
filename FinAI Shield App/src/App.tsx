import { useState } from 'react';
import { Dashboard } from './components/Dashboard';
import { FraudChecker } from './components/FraudChecker';
import { AIChat } from './components/AIChat';
import { Gamification } from './components/Gamification';
import { Header } from './components/Header';
import { Shield, LayoutDashboard, MessageSquare, Trophy, ScanLine } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './components/ui/tabs';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [language, setLanguage] = useState<'ru' | 'kk'>('ru');

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Header language={language} setLanguage={setLanguage} />
      
      <main className="container mx-auto px-4 py-6 max-w-7xl">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 lg:w-auto lg:inline-grid bg-white shadow-sm">
            <TabsTrigger value="dashboard" className="gap-2">
              <LayoutDashboard className="w-4 h-4" />
              <span className="hidden sm:inline">
                {language === 'ru' ? 'Дашборд' : 'Басты бет'}
              </span>
            </TabsTrigger>
            <TabsTrigger value="fraud" className="gap-2">
              <ScanLine className="w-4 h-4" />
              <span className="hidden sm:inline">
                {language === 'ru' ? 'Проверка' : 'Тексеру'}
              </span>
            </TabsTrigger>
            <TabsTrigger value="chat" className="gap-2">
              <MessageSquare className="w-4 h-4" />
              <span className="hidden sm:inline">
                {language === 'ru' ? 'ИИ-помощник' : 'AI көмекші'}
              </span>
            </TabsTrigger>
            <TabsTrigger value="achievements" className="gap-2">
              <Trophy className="w-4 h-4" />
              <span className="hidden sm:inline">
                {language === 'ru' ? 'Достижения' : 'Жетістіктер'}
              </span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard">
            <Dashboard language={language} />
          </TabsContent>

          <TabsContent value="fraud">
            <FraudChecker language={language} />
          </TabsContent>

          <TabsContent value="chat">
            <AIChat language={language} />
          </TabsContent>

          <TabsContent value="achievements">
            <Gamification language={language} />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
