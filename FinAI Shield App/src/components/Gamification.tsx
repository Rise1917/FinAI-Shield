import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Trophy, Award, Target, Shield, TrendingDown, Zap, Star, CheckCircle } from 'lucide-react';

interface GamificationProps {
  language: 'ru' | 'kk';
}

export function Gamification({ language }: GamificationProps) {
  const translations = {
    ru: {
      title: 'Твои достижения',
      subtitle: 'Зарабатывай очки и бейджи за ответственное управление финансами',
      totalPoints: 'Всего очков',
      level: 'Уровень',
      nextLevel: 'До следующего уровня',
      badges: 'Полученные бейджи',
      challenges: 'Активные челленджи',
      leaderboard: 'Топ пользователей',
      you: 'Вы',
      points: 'очков',
      completed: 'выполнено',
    },
    kk: {
      title: 'Сіздің жетістіктеріңіз',
      subtitle: 'Жауапты қаржыны басқару үшін ұпай мен белгілер алыңыз',
      totalPoints: 'Барлық ұпай',
      level: 'Деңгей',
      nextLevel: 'Келесі деңгейге дейін',
      badges: 'Алынған белгілер',
      challenges: 'Белсенді челленджтер',
      leaderboard: 'Топ пайдаланушылар',
      you: 'Сіз',
      points: 'ұпай',
      completed: 'орындалды',
    }
  };

  const t = translations[language];

  const badges = [
    {
      id: 1,
      name: language === 'ru' ? 'Первый шаг' : 'Бірінші қадам',
      description: language === 'ru' ? 'Подключил банк' : 'Банкті қосты',
      icon: CheckCircle,
      color: 'bg-green-100 text-green-600',
      unlocked: true,
    },
    {
      id: 2,
      name: language === 'ru' ? 'Экономный' : 'Үнемшіл',
      description: language === 'ru' ? 'Сэкономил 50,000 ₸' : '50,000 ₸ үнемдеді',
      icon: TrendingDown,
      color: 'bg-blue-100 text-blue-600',
      unlocked: true,
    },
    {
      id: 3,
      name: language === 'ru' ? 'Защитник' : 'Қорғаушы',
      description: language === 'ru' ? 'Проверил 10 переводов' : '10 аударымды тексерді',
      icon: Shield,
      color: 'bg-purple-100 text-purple-600',
      unlocked: true,
    },
    {
      id: 4,
      name: language === 'ru' ? 'Накопитель' : 'Жинаушы',
      description: language === 'ru' ? 'Достиг цели накопления' : 'Жинақтау мақсатына жетті',
      icon: Target,
      color: 'bg-yellow-100 text-yellow-600',
      unlocked: false,
    },
    {
      id: 5,
      name: language === 'ru' ? 'Мастер бюджета' : 'Бюджет шебері',
      description: language === 'ru' ? '3 месяца в рамках бюджета' : '3 ай бюджетте',
      icon: Star,
      color: 'bg-orange-100 text-orange-600',
      unlocked: false,
    },
    {
      id: 6,
      name: language === 'ru' ? 'Финансовый гуру' : 'Қаржылық гуру',
      description: language === 'ru' ? 'Набрал 10,000 очков' : '10,000 ұпай жинады',
      icon: Trophy,
      color: 'bg-red-100 text-red-600',
      unlocked: false,
    },
  ];

  const challenges = [
    {
      id: 1,
      name: language === 'ru' ? 'Неделя экономии' : 'Үнемдеу аптасы',
      description: language === 'ru' ? 'Не трать больше 40,000 ₸ эту неделю' : 'Осы аптада 40,000 ₸ астам жұмсамаңыз',
      progress: 68,
      reward: 250,
      icon: TrendingDown,
    },
    {
      id: 2,
      name: language === 'ru' ? 'Умные покупки' : 'Ақылды сатып алулар',
      description: language === 'ru' ? 'Используй кэшбэк 5 раз' : 'Кэшбэкті 5 рет қолданыңыз',
      progress: 40,
      reward: 150,
      icon: Zap,
    },
    {
      id: 3,
      name: language === 'ru' ? 'Безопасность прежде всего' : 'Алдымен қауіпсіздік',
      description: language === 'ru' ? 'Проверь 5 переводов на мошенничество' : '5 аударымды алаяқтыққа тексеріңіз',
      progress: 80,
      reward: 200,
      icon: Shield,
    },
  ];

  const leaderboard = [
    { rank: 1, name: 'Айгерим К.', points: 8450, avatar: 'АК' },
    { rank: 2, name: 'Даулет М.', points: 7820, avatar: 'ДМ' },
    { rank: 3, name: 'Сая Н.', points: 7340, avatar: 'СН' },
    { rank: 4, name: language === 'ru' ? 'Вы' : 'Сіз', points: 5680, avatar: t.you, isUser: true },
    { rank: 5, name: 'Арман Б.', points: 5230, avatar: 'АБ' },
  ];

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Trophy className="w-6 h-6 text-yellow-600" />
            {t.title}
          </CardTitle>
          <CardDescription>{t.subtitle}</CardDescription>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>{t.totalPoints}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl">5,680</div>
            <div className="flex items-center gap-2 mt-2">
              <Trophy className="w-4 h-4 text-yellow-600" />
              <span className="text-sm text-muted-foreground">{t.level} 8</span>
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader className="pb-2">
            <CardDescription>{t.nextLevel}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>{t.level} 8</span>
                <span>{t.level} 9</span>
              </div>
              <Progress value={73} className="h-3" />
              <p className="text-sm text-muted-foreground">1,820 {t.points}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{t.badges}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {badges.map((badge) => {
              const Icon = badge.icon;
              return (
                <div
                  key={badge.id}
                  className={`flex flex-col items-center gap-2 p-4 rounded-lg border-2 transition-all ${
                    badge.unlocked
                      ? 'border-blue-200 bg-blue-50/50'
                      : 'border-muted bg-muted/30 opacity-50'
                  }`}
                >
                  <div className={`w-16 h-16 rounded-full flex items-center justify-center ${badge.color}`}>
                    <Icon className="w-8 h-8" />
                  </div>
                  <div className="text-center">
                    <p className="text-sm">{badge.name}</p>
                    <p className="text-xs text-muted-foreground">{badge.description}</p>
                  </div>
                  {badge.unlocked && (
                    <Badge variant="secondary" className="text-xs">
                      {language === 'ru' ? 'Получено' : 'Алынды'}
                    </Badge>
                  )}
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>{t.challenges}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {challenges.map((challenge) => {
              const Icon = challenge.icon;
              return (
                <div key={challenge.id} className="p-4 rounded-lg border bg-card">
                  <div className="flex items-start gap-3 mb-3">
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                      <Icon className="w-5 h-5 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <h4>{challenge.name}</h4>
                          <p className="text-sm text-muted-foreground">{challenge.description}</p>
                        </div>
                        <Badge variant="secondary" className="flex-shrink-0">
                          +{challenge.reward} {t.points}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span>{challenge.progress}% {t.completed}</span>
                    </div>
                    <Progress value={challenge.progress} />
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>{t.leaderboard}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {leaderboard.map((user) => (
              <div
                key={user.rank}
                className={`flex items-center justify-between p-3 rounded-lg ${
                  user.isUser ? 'bg-blue-50 border-2 border-blue-200' : 'bg-muted/50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    user.rank === 1 ? 'bg-yellow-100 text-yellow-600' :
                    user.rank === 2 ? 'bg-gray-100 text-gray-600' :
                    user.rank === 3 ? 'bg-orange-100 text-orange-600' :
                    'bg-blue-100 text-blue-600'
                  }`}>
                    {user.rank <= 3 ? <Trophy className="w-4 h-4" /> : `#${user.rank}`}
                  </div>
                  <div>
                    <p>{user.name}</p>
                    <p className="text-sm text-muted-foreground">{user.points.toLocaleString()} {t.points}</p>
                  </div>
                </div>
                {user.isUser && (
                  <Badge variant="default">{t.you}</Badge>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
