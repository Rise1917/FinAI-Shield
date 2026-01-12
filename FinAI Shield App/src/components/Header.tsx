import { Shield } from 'lucide-react';
import { Button } from './ui/button';

interface HeaderProps {
  language: 'ru' | 'kk';
  setLanguage: (lang: 'ru' | 'kk') => void;
}

export function Header({ language, setLanguage }: HeaderProps) {
  return (
    <header className="bg-white border-b shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 max-w-7xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-br from-blue-600 to-purple-600 p-2 rounded-xl">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl">FinAI Shield</h1>
              <p className="text-sm text-muted-foreground">
                {language === 'ru' 
                  ? 'Умный финансовый защитник' 
                  : 'Ақылды қаржылық қорғаушы'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant={language === 'ru' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setLanguage('ru')}
            >
              РУС
            </Button>
            <Button
              variant={language === 'kk' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setLanguage('kk')}
            >
              ҚАЗ
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
