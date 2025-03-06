#!/bin/bash  # Указывает, что скрипт должен выполняться в bash-интерпретаторе

# Определяем путь к каталогу, где находится сам скрипт
REL_PATH=$(dirname "$0")
# Сохраняем текущий рабочий каталог
CURRENT_DIR=$(pwd)

# Проверяем, установлен ли pm2 (менеджер процессов)
if ! command -v pm2 &> /dev/null
then
 echo "pm2 is not installed or not in PATH"  # Выводим сообщение, если pm2 не найден
 exit 1  # Завершаем скрипт с кодом ошибки
fi

echo '######################'
echo '### Running tests! ###'
echo '######################'

# Останавливаем все процессы pm2 перед запуском тестов
echo '### Killing test backend and frontend before running tests'
pm2 kill

echo '### API'

# Переходим в каталог API (серверной части)
cd ../api || exit 1  # Если переход не удался, завершаем скрипт

# Запускаем команду для заполнения базы данных тестовыми данными (fixtures)
echo '### Running fixtures'
npm run seed:test

# Запускаем API-сервер в тестовом режиме через pm2
echo '### Running API server in test mode'
pm2 start "npm run start:test" --name="shop-api-test"

echo '### Frontend'

# Переходим в каталог frontend (клиентской части)
cd ../frontend || exit 1  # Если переход не удался, завершаем скрипт

# Запускаем фронтенд в тестовом режиме через pm2
echo '### Running Frontend in test mode'
pm2 start "npm run start:test" --name="shop-frontend-test"

# Ждём, пока фронтенд запустится и начнёт слушать порт 5183
while ! nc -z localhost 5183; do
 sleep 0.1  # Проверяем каждые 0.1 секунды
done

echo '### Running tests'

# Переходим в каталог с тестами
cd '../tests' || exit 1  # Если переход не удался, завершаем скрипт

# Запускаем тесты с CodeceptJS, передавая дополнительные аргументы
npx codeceptjs run --steps "$@"

# Сохраняем код завершения тестов (0 — успех, ненулевое значение — ошибка)
EXIT_CODE=$?

# Завершаем все тестовые процессы pm2 после выполнения тестов
echo '### Killing test processes'
pm2 kill

# Выходим из скрипта с тем же кодом завершения, что и тесты
exit ${EXIT_CODE}
