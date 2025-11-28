import React, { useState, useEffect } from 'react';
import './App.css';

const NicknameGenerator = () => {
  const [nickname, setNickname] = useState('');
  const [copied, setCopied] = useState(false);


  const prefixes = [
    'Тёмный', 'Светлый', 'Быстрый', 'Мудрый', 'Сильный', 'Храбрый',
    'Тайный', 'Древний', 'Бесконечный', 'Вечный', 'Лунный', 'Солнечный',
    'Огненный', 'Ледяной', 'Стальной', 'Золотой', 'Абсолютный',
    'Безжалостный', 'Великий', 'Грозный', 'Легендарный', 'Могучий', 
    'Неумолимый', 'Свирепый', 'Смертоносный', 'Тихий', 'Яростный', 
    'Астральный', 'Бездонный', 'Зачарованный', 'Изумрудный', 'Мистический', 
    'Обсидиановый', 'Призрачный', 'Серебряный', 'Скрытый', 'Теневой', 
    'Хрустальный', 'Эфирный', 'Гладкий', 'Кристальный', 
    'Идеальный', 'Косой', 'Кривой', 'Ловкий', 'Прямой', 
    'Резкий', 'Странный', 'Холодный', 'Стремительный', 'Незыблемый', 
    'Потусторонний', 'Загадочный', 'Величавый', 'Безумный', 'Радикальный', 
    'Бесплотный', 'Искажённый', 'Блистательный', 'Пустынный', 
    'Одинокий', 'Зловещий', 'Глубокий',
    'Бессмертный', 'Кочевой', 'Ядовитый', 'Секретный', 'Изначальный'
  ];

  const suffixes = [
    'Волк', 'Орёл', 'Дракон', 'Тигр', 'Феникс', 'Единорог',
    'Воин', 'Маг', 'Странник', 'Рыцарь', 'Охотник', 'Защитник',
    'Призрак', 'Путник', 'Мститель', 'Хранитель', 'Берсерк', 'Варвар', 
    'Ворон', 'Титан', 'Колосс', 'Голем', 'Оборотень', 
    'Демон', 'Ангел', 'Вампир', 'Гигант', 'Вихрь', 
    'Вулкан', 'Камень', 'Ледник', 'Факел', 'Взрыв',
    'Океан', 'Поток', 'Утёс', 'Ураган',
    'Клинок', 'Молот', 'Щит', 'Кинжал', 'Арбалет', 
    'Шип', 'Меч', 'Апокалипсис', 'Изгой', 
    'Парадокс', 'Принцип', 'Сон', 'Хаос', 
    'Оракул', 'Провидец', 'Ассасин', 'Алхимик', 
    'Монах', 'Скиталец', 'Паладин', 'Ниндзя', 'Самурай',
    'Метеор', 'Смерч', 'Артефакт', 'Лабиринт', 'Кристалл',
    'Граф', 'Барон', 'Ведьмак',
    'Чародей', 'Волшебник', 'Друид', 'Жрец',
    'Следопыт', 'Бард', 'Шут', 'Кузнец', 'Грифон'
  ];

   const generateRandomNumber = () => {
    const formats = [
      () => Math.floor(Math.random() * 1000),
      () => {
        const digit = Math.floor(Math.random() * 10);
        return parseInt(`${digit}${digit}${digit}`);
      },
      () => Math.floor(Math.random() * 50) + 1980,
      () => Math.floor(Math.random() * 100),
      () => Math.floor(Math.random() * 10000)
    ];
    
    const randomFormat = formats[Math.floor(Math.random() * formats.length)];
    return randomFormat();
  };

  const generateNickname = () => {
    const randomPrefix = prefixes[Math.floor(Math.random() * prefixes.length)];
    const randomSuffix = suffixes[Math.floor(Math.random() * suffixes.length)];
    const randomNumber = generateRandomNumber();
    
     const formats = [
      `${randomPrefix}${randomSuffix}`,
      `${randomPrefix}_${randomSuffix}`,
      `${randomSuffix}${randomNumber}`,
      `${randomPrefix}${randomNumber}`,
      `${randomSuffix}_${randomNumber}`,
      `${randomPrefix}_${randomSuffix}_${randomNumber}`,
      `${randomSuffix}${randomNumber}`,
      `${randomPrefix}${randomNumber}`,
      `${randomPrefix}${randomSuffix}`,
      `${randomPrefix}_${randomSuffix}`
    ];
    
    const newNickname = formats[Math.floor(Math.random() * formats.length)];
    setNickname(newNickname);
    setCopied(false);
  };

  const copyToClipboard = async () => {
    if (!nickname) return;
    
    try {
      await navigator.clipboard.writeText(nickname);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      const textArea = document.createElement('textarea');
      textArea.value = nickname;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  useEffect(() => {
    generateNickname();
  }, []);

  return (
    <div className="app">
      <div className="container">
        <h1>Генератор никнеймов</h1>
        
        <div className="nickname-display">
          <div className="nickname-text">{nickname || 'Нажмите "Сгенерировать"'}</div>
          {nickname && (
            <button 
              className={`copy-btn ${copied ? 'copied' : ''}`}
              onClick={copyToClipboard}
            >
              {copied ? 'Скопировано!' : 'Копировать'}
            </button>
          )}
        </div>

        <div className="controls">
          <button className="generate-btn" onClick={generateNickname}>
            Сгенерировать новый
          </button>
        </div>
      </div>
    </div>
  );
};

export default NicknameGenerator;