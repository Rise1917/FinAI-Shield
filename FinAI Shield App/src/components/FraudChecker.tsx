import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Alert, AlertDescription } from './ui/alert';
import { Shield, AlertTriangle, CheckCircle, Search, Phone, CreditCard, Globe } from 'lucide-react';

interface FraudCheckerProps {
  language: 'ru' | 'kk';
}

export function FraudChecker({ language }: FraudCheckerProps) {
  const [checkType, setCheckType] = useState<'phone' | 'card' | 'website'>('phone');
  const [inputValue, setInputValue] = useState('');
  const [result, setResult] = useState<any>(null);
  const [isChecking, setIsChecking] = useState(false);

  const translations = {
    ru: {
      title: 'Проверка на мошенничество',
      subtitle: 'Проверьте номер телефона, карту или сайт перед переводом',
      checkPhone: 'Проверить номер',
      checkCard: 'Проверить карту',
      checkWebsite: 'Проверить сайт',
      phonePlaceholder: '+7 (777) 123-45-67',
      cardPlaceholder: '4400 4301 2345 6789',
      websitePlaceholder: 'example.com',
      check: 'Проверить',
      safe: 'Безопасно',
      warning: 'Осторожно',
      danger: 'Опасно',
      recentChecks: 'Недавние проверки',
      fraudStats: 'Статистика мошенничества',
      totalChecks: 'Всего проверок',
      fraudDetected: 'Обнаружено мошенников',
      safeTrans: 'Безопасных переводов',
    },
    kk: {
      title: 'Алаяқтықты тексеру',
      subtitle: 'Аударудан бұрын телефон нөмірін, картаны немесе сайтты тексеріңіз',
      checkPhone: 'Нөмірді тексеру',
      checkCard: 'Картаны тексеру',
      checkWebsite: 'Сайтты тексеру',
      phonePlaceholder: '+7 (777) 123-45-67',
      cardPlaceholder: '4400 4301 2345 6789',
      websitePlaceholder: 'example.com',
      check: 'Тексеру',
      safe: 'Қауіпсіз',
      warning: 'Абай болыңыз',
      danger: 'Қауіпті',
      recentChecks: 'Соңғы тексерулер',
      fraudStats: 'Алаяқтық статистикасы',
      totalChecks: 'Барлық тексерулер',
      fraudDetected: 'Алаяқтар анықталды',
      safeTrans: 'Қауіпсіз аударымдар',
    }
  };

  const t = translations[language];

  const fraudDatabase = {
    phones: {
      '+77771234567': { risk: 'high', complaints: 12, reason: language === 'ru' ? 'Множественные жалобы на OLX и Telegram' : 'OLX және Telegram-да көптеген шағымдар' },
      '+77779876543': { risk: 'medium', complaints: 3, reason: language === 'ru' ? 'Подозрительная активность' : 'Күдікті әрекет' },
      '+77012345678': { risk: 'low', complaints: 0, reason: language === 'ru' ? 'Нет жалоб' : 'Шағымдар жоқ' },
    },
    cards: {
      '4400430123456789': { risk: 'high', complaints: 8, reason: language === 'ru' ? 'Связана с мошенничеством' : 'Алаяқтыққа байланысты' },
      '5500450187654321': { risk: 'low', complaints: 0, reason: language === 'ru' ? 'Безопасная карта' : 'Қауіпсіз карта' },
    },
    websites: {
      'fake-kaspi.com': { risk: 'high', complaints: 45, reason: language === 'ru' ? 'Фишинговый сайт!' : 'Фишинг сайты!' },
      'olx-scam.kz': { risk: 'high', complaints: 23, reason: language === 'ru' ? 'Поддельный OLX' : 'Жалған OLX' },
      'kaspi.kz': { risk: 'low', complaints: 0, reason: language === 'ru' ? 'Официальный сайт' : 'Ресми сайт' },
    }
  };

  const handleCheck = () => {
    setIsChecking(true);
    
    setTimeout(() => {
      const cleanValue = inputValue.replace(/\s|-|\(|\)/g, '');
      let checkResult;

      if (checkType === 'phone') {
        checkResult = fraudDatabase.phones[cleanValue] || { risk: 'low', complaints: 0, reason: t.safe };
      } else if (checkType === 'card') {
        checkResult = fraudDatabase.cards[cleanValue] || { risk: 'low', complaints: 0, reason: t.safe };
      } else {
        checkResult = fraudDatabase.websites[inputValue] || { risk: 'low', complaints: 0, reason: t.safe };
      }

      setResult(checkResult);
      setIsChecking(false);
    }, 1500);
  };

  const getRiskColor = (risk: string) => {
    if (risk === 'high') return 'bg-red-500';
    if (risk === 'medium') return 'bg-yellow-500';
    return 'bg-green-500';
  };

  const getRiskIcon = (risk: string) => {
    if (risk === 'high') return <AlertTriangle className="w-6 h-6" />;
    if (risk === 'medium') return <AlertTriangle className="w-6 h-6" />;
    return <CheckCircle className="w-6 h-6" />;
  };

  const recentChecks = [
    { value: '+7 777 123 45 67', type: 'phone', risk: 'high', date: '08.10.2025' },
    { value: 'kaspi.kz', type: 'website', risk: 'low', date: '08.10.2025' },
    { value: '4400 4301 2345 6789', type: 'card', risk: 'high', date: '07.10.2025' },
    { value: '+7 701 234 56 78', type: 'phone', risk: 'low', date: '07.10.2025' },
  ];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="w-6 h-6 text-blue-600" />
            {t.title}
          </CardTitle>
          <CardDescription>{t.subtitle}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-3 gap-2">
            <Button
              variant={checkType === 'phone' ? 'default' : 'outline'}
              onClick={() => setCheckType('phone')}
              className="gap-2"
            >
              <Phone className="w-4 h-4" />
              {t.checkPhone}
            </Button>
            <Button
              variant={checkType === 'card' ? 'default' : 'outline'}
              onClick={() => setCheckType('card')}
              className="gap-2"
            >
              <CreditCard className="w-4 h-4" />
              {t.checkCard}
            </Button>
            <Button
              variant={checkType === 'website' ? 'default' : 'outline'}
              onClick={() => setCheckType('website')}
              className="gap-2"
            >
              <Globe className="w-4 h-4" />
              {t.checkWebsite}
            </Button>
          </div>

          <div className="flex gap-2">
            <Input
              placeholder={
                checkType === 'phone' ? t.phonePlaceholder :
                checkType === 'card' ? t.cardPlaceholder :
                t.websitePlaceholder
              }
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
            <Button onClick={handleCheck} disabled={!inputValue || isChecking}>
              <Search className="w-4 h-4 mr-2" />
              {t.check}
            </Button>
          </div>

          {result && (
            <Alert className={`${getRiskColor(result.risk)} text-white border-none`}>
              <div className="flex items-start gap-3">
                {getRiskIcon(result.risk)}
                <div className="flex-1">
                  <AlertDescription className="text-white">
                    <div className="mb-2">
                      <Badge variant="secondary" className="mb-2">
                        {result.risk === 'high' ? t.danger : result.risk === 'medium' ? t.warning : t.safe}
                      </Badge>
                    </div>
                    <p className="mb-1">{result.reason}</p>
                    {result.complaints > 0 && (
                      <p className="text-sm opacity-90">
                        {language === 'ru' ? `Жалобы: ${result.complaints}` : `Шағымдар: ${result.complaints}`}
                      </p>
                    )}
                  </AlertDescription>
                </div>
              </div>
            </Alert>
          )}
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>{t.totalChecks}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl">1,247</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardDescription>{t.fraudDetected}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl text-red-600">89</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardDescription>{t.safeTrans}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl text-green-600">1,158</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{t.recentChecks}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recentChecks.map((check, index) => (
              <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                <div className="flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full ${getRiskColor(check.risk)}`} />
                  <div>
                    <p>{check.value}</p>
                    <p className="text-sm text-muted-foreground capitalize">{check.type}</p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">{check.date}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
