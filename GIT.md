**Рабочее окружение**

Вы закончили работу над задачей для клиента и у вас есть рабочий код, который был создан без использования git. Клиент создал пустой репозиторий [git@example.com](mailto:git@example.com):example/test.git и расшалил для вас доступ.

**Задание**

Опишите ваши дальнейшие действия что бы ваш код появился в ветке master в репозитории [git@example.com](mailto:git@example.com):example/test.git

1. Ініціалізую Git у локальному проекті:
    git init

2. Обираю усі файли мого проекту:
    git add .

3. Створюю комміт:
    git commit -m "комміт"

4. Додаю віддалений репозиторій:
    git remote add origin git@example.com:example/test.git

5. Завантажую мій код у репозиторій:
    git push -u origin master