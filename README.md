#  Minisky

It is only a demo application, a realization of a test task

## Installation

```bash
git clone ...
cd minisky
composer install

# npm
npm install
npm run assets
```

## Usage

```bash
# launch the application
php ./bin/console minisky:run

# and open in your browser - http://localhost:8000
open http://localhost:8000
```

## Task

Разработайте одностраничное приложение «Словарь», с помощью которого пользователь сможет проверить свое знание языка.

Пользовательский сценарий:
Пользователь вводит свое имя и нажимает кнопку “Начать тест”.
Система показывает пользователю русское или английское слово, предлагая четыре варианта перевода: один правильный и три рандомных. 
Если пользователь выбирает правильный перевод, система начисляет пользователю один балл и показывает следующее слово.
Если пользователь выбирает неправильный перевод, система говорит ему об ошибке и дает выбрать еще раз. Система сохраняет на сервере неправильный ответ для того, чтобы в будущем можно было бы вывести самые популярные ошибки.
После трех ошибок или после того, как все слова из словаря поучаствовали в тесте, система заканчивает тест и показывает пользователю количество набранных баллов.
Система сохраняет на сервере имя пользователя и количество набранных им баллов.

Нельзя хранить на клиенте лишние данные: словарь и правильные ответы к словам.

Технологические ограничения:

* бэкэнд: Yii или Symfony
* фронтэнд: AngularJS

Словарь у системы может быть большой(несколько сотен тысяч слов!), но вот его часть, достаточная для разработки приложения:

```json
{
    "apple": "яблоко",
    "pear": "персик",
    "orange": "апельсин",
    "grape": "виноград",
    "lemon": "лимон",
    "pineapple": "ананас",
    "watermelon": "арбуз",
    "coconut": "кокос",
    "banana": "банан",
    "pomelo": "помело",
    "strawberry": "клубника",
    "raspberry": "малина",
    "melon": "дыня",
    "apricot": "абрикос",
    "mango": "манго",
    "drain": "слива",
    "pomegranate": "гранат",
    "cherry": "вишня"
}
```

Итоговое приложение должно запускаться на встроенном в php сервере.

Код приложения выложите на github или bitbucket, приложите инструкцию для разворачивания.

