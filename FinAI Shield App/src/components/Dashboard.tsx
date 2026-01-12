import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { 
  TrendingDown, 
  TrendingUp, 
  Target, 
  Eye,
  ShoppingCart,
  Utensils,
  Car,
  Home,
  Zap,
  CreditCard,
  ArrowUpRight,
  ArrowDownRight,
  AlertCircle
} from 'lucide-react';
import { BarChart, Bar, PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface DashboardProps {
  language: 'ru' | 'kk';
}

const COLORS = ['#3b82f6', '#8b5cf6', '#ec4899', '#f59e0b', '#10b981', '#6366f1'];

export function Dashboard({ language }: DashboardProps) {
  const [mode, setMode] = useState<'economy' | 'savings' | 'balance'>('balance');

  const translations = {
    ru: {
      mode: 'Режим',
      economy: 'Экономия',
      savings: 'Накопление',
      balance: 'Баланс',
      totalBalance: 'Общий баланс',
      monthlySpending: 'Расходы за месяц',
      monthlyIncome: 'Доход за месяц',
      savingsGoal: 'Цель накоплений',
      aiInsights: 'AI Рекомендации',
      spendingByCategory: 'Расходы по категориям',
      recentTransactions: 'Последние транзакции',
      trends: 'Тренды за 6 месяцев',
      food: 'Еда',
      transport: 'Транспорт',
      shopping: 'Покупки',
      utilities: 'Коммунальные',
      entertainment: 'Развлечения',
      other: 'Другое',
    },
    kk: {
      mode: 'Режим',
      economy: 'Үнемдеу',
      savings: 'Жинақтау',
      balance: 'Баланс',
      totalBalance: 'Жалпы баланс',
      monthlySpending: 'Айлық шығын',
      monthlyIncome: 'Айлық табыс',
      savingsGoal: 'Жинақтау мақсаты',
      aiInsights: 'AI Ұсыныстар',
      spendingByCategory: 'Санат бойынша шығын',
      recentTransactions: 'Соңғы транзакциялар',
      trends: '6 айдағы үрдістер',
      food: 'Тамақ',
      transport: 'Көлік',
      shopping: 'Сатып алулар',
      utilities: 'Коммуналдық',
      entertainment: 'Ойын-сауық',
      other: 'Басқа',
    }
  };

  const t = translations[language];

  const spendingData = [
    { name: t.food, value: 85000, icon: Utensils, color: COLORS[0] },
    { name: t.transport, value: 45000, icon: Car, color: COLORS[1] },
    { name: t.shopping, value: 62000, icon: ShoppingCart, color: COLORS[2] },
    { name: t.utilities, value: 38000, icon: Home, color: COLORS[3] },
    { name: t.entertainment, value: 29000, icon: Zap, color: COLORS[4] },
    { name: t.other, value: 23000, icon: CreditCard, color: COLORS[5] },
  ];

  const monthlyTrends = [
    { month: language === 'ru' ? 'Май' : 'Мамыр', income: 320000, spending: 245000 },
    { month: language === 'ru' ? 'Июн' : 'Маусым', income: 320000, spending: 268000 },
    { month: language === 'ru' ? 'Июл' : 'Шілде', income: 340000, spending: 291000 },
    { month: language === 'ru' ? 'Авг' : 'Тамыз', income: 320000, spending: 274000 },
    { month: language === 'ru' ? 'Сен' : 'Қыркүйек', income: 350000, spending: 259000 },
    { month: language === 'ru' ? 'Окт' : 'Қазан', income: 320000, spending: 282000 },
  ];

  const recentTransactions = [
    { id: 1, name: 'Small Астана', category: t.food, amount: -8500, date: '08.10.2025', type: 'expense' },
    { id: 2, name: 'Яндекс Такси', category: t.transport, amount: -2300, date: '08.10.2025', type: 'expense' },
    { id: 3, name: language === 'ru' ? 'Зарплата' : 'Жалақы', category: language === 'ru' ? 'Доход' : 'Табыс', amount: 320000, date: '07.10.2025', type: 'income' },
    { id: 4, name: 'Магнум', category: t.food, amount: -15600, date: '07.10.2025', type: 'expense' },
    { id: 5, name: 'Netflix', category: t.entertainment, amount: -4990, date: '06.10.2025', type: 'expense' },
  ];

  const getAIInsight = () => {
    if (mode === 'economy') {
      return language === 'ru' 
        ? '🎯 Ты тратишь 42% на еду — это выше среднего по Казахстану. Попробуй готовить дома чаще — сэкономишь до 28,000 ₸ в месяц!'
        : '🎯 Сіз тамаққа 42% жұмсайсыз — бұл Қазақстан бойынша орташадан жоғары. Үйде жиі пісіріп көріңіз — айына 28,000 ₸ үнемдейсіз!';
    } else if (mode === 'savings') {
      return language === 'ru'
        ? '💰 Хочешь накопить 500,000 ₸ к Новому году? Просто откладывай 2,100 ₸ каждый день — и достигнешь цели!'
        : '💰 Жаңа жылға 500,000 ₸ жинағыңыз келе ме? Күн сайын 2,100 ₸ үнемдеңіз — мақсатқа жетесіз!';
    } else {
      return language === 'ru'
        ? '✅ Отлично! Ты откладываешь 22% от дохода. Продолжай в том же духе — финансовая подушка растёт!'
        : '✅ Керемет! Сіз кірістің 22%-ын үнемдейсіз. Осылай жалғастырыңыз — қаржылық қорыңыз өседі!';
    }
  };

  const totalSpending = spendingData.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className="space-y-6">
      {/* Mode Selector */}
      <Card>
        <CardHeader>
          <CardTitle>{t.mode}</CardTitle>
          <CardDescription>
            {language === 'ru' 
              ? 'Выберите режим работы FinAI Shield' 
              : 'FinAI Shield жұмыс режимін таңдаңыз'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button
              variant={mode === 'economy' ? 'default' : 'outline'}
              className="h-auto py-4 flex-col gap-2"
              onClick={() => setMode('economy')}
            >
              <TrendingDown className="w-6 h-6" />
              <span>{t.economy}</span>
            </Button>
            <Button
              variant={mode === 'savings' ? 'default' : 'outline'}
              className="h-auto py-4 flex-col gap-2"
              onClick={() => setMode('savings')}
            >
              <Target className="w-6 h-6" />
              <span>{t.savings}</span>
            </Button>
            <Button
              variant={mode === 'balance' ? 'default' : 'outline'}
              className="h-auto py-4 flex-col gap-2"
              onClick={() => setMode('balance')}
            >
              <Eye className="w-6 h-6" />
              <span>{t.balance}</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* AI Insights */}
      <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-blue-600" />
            {t.aiInsights}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-lg">{getAIInsight()}</p>
        </CardContent>
      </Card>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>{t.totalBalance}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl">425,000 ₸</div>
            <div className="flex items-center gap-1 text-sm text-green-600 mt-1">
              <TrendingUp className="w-4 h-4" />
              +12.5%
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardDescription>{t.monthlyIncome}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl">320,000 ₸</div>
            <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
              <ArrowUpRight className="w-4 h-4" />
              {language === 'ru' ? 'Стабильно' : 'Тұрақты'}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardDescription>{t.monthlySpending}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl">282,000 ₸</div>
            <div className="flex items-center gap-1 text-sm text-red-600 mt-1">
              <ArrowDownRight className="w-4 h-4" />
              +8.2%
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardDescription>{t.savingsGoal}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl">500,000 ₸</div>
            <Progress value={68} className="mt-2" />
            <p className="text-sm text-muted-foreground mt-1">68% {language === 'ru' ? 'выполнено' : 'орындалды'}</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Spending by Category */}
        <Card>
          <CardHeader>
            <CardTitle>{t.spendingByCategory}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {spendingData.map((item) => {
                const Icon = item.icon;
                const percentage = ((item.value / totalSpending) * 100).toFixed(1);
                return (
                  <div key={item.name}>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <Icon className="w-4 h-4" style={{ color: item.color }} />
                        <span>{item.name}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-muted-foreground">{percentage}%</span>
                        <span>{item.value.toLocaleString()} ₸</span>
                      </div>
                    </div>
                    <Progress value={parseFloat(percentage)} className="h-2" />
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Trends Chart */}
        <Card>
          <CardHeader>
            <CardTitle>{t.trends}</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={monthlyTrends}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="income" 
                  stroke="#10b981" 
                  name={language === 'ru' ? 'Доход' : 'Табыс'}
                  strokeWidth={2}
                />
                <Line 
                  type="monotone" 
                  dataKey="spending" 
                  stroke="#ef4444" 
                  name={language === 'ru' ? 'Расход' : 'Шығын'}
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Recent Transactions */}
      <Card>
        <CardHeader>
          <CardTitle>{t.recentTransactions}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recentTransactions.map((transaction) => (
              <div 
                key={transaction.id} 
                className="flex items-center justify-between p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    transaction.type === 'income' ? 'bg-green-100' : 'bg-red-100'
                  }`}>
                    {transaction.type === 'income' ? (
                      <ArrowUpRight className="w-5 h-5 text-green-600" />
                    ) : (
                      <ArrowDownRight className="w-5 h-5 text-red-600" />
                    )}
                  </div>
                  <div>
                    <p>{transaction.name}</p>
                    <p className="text-sm text-muted-foreground">{transaction.category}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={transaction.type === 'income' ? 'text-green-600' : ''}>
                    {transaction.amount > 0 ? '+' : ''}{transaction.amount.toLocaleString()} ₸
                  </p>
                  <p className="text-sm text-muted-foreground">{transaction.date}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
