import { ScrollArea } from "@/components/ui/scroll-area";

export default function Responsibility() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200">
      <ScrollArea className="flex p-6 h-[600px] w-[400px] rounded-lg shadow-md">
        <section className="space-y-8 w-full">
          <header className="flex items-center gap-2 mb-2">
            <span className="text-2xl">🔒</span>
            <h2 className="text-xl font-bold">Политика обработки персональных данных</h2>
          </header>

          <div>
            <h3 className="font-semibold mb-1">📋 Какие данные мы собираем</h3>
            <ul className="list-disc pl-5 space-y-1 text-sm">
              <li><strong>Контактные данные:</strong> имя, фамилия, email, телефон — для обратной связи и поддержки.</li>
              <li><strong>Техническая информация:</strong> IP-адрес, тип устройства, браузер, ОС — для безопасности и корректной работы сайта.</li>
              <li><strong>Данные о действиях:</strong> посещённые страницы, время на сайте, клики — для улучшения сервиса.</li>
              <li><strong>Cookie-файлы:</strong> для персонализации и аналитики.</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-1">🎯 Для чего мы используем ваши данные</h3>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div className="bg-blue-50 dark:bg-blue-900 rounded p-2 flex flex-col items-center">
                <span className="text-lg">📧</span>
                <h4 className="font-semibold">Связь</h4>
                <p className="text-xs text-center">Обратная связь, ответы на вопросы, уведомления</p>
              </div>
              <div className="bg-blue-50 dark:bg-blue-900 rounded p-2 flex flex-col items-center">
                <span className="text-lg">📊</span>
                <h4 className="font-semibold">Аналитика</h4>
                <p className="text-xs text-center">Анализ посещаемости, улучшение сайта</p>
              </div>
              <div className="bg-blue-50 dark:bg-blue-900 rounded p-2 flex flex-col items-center">
                <span className="text-lg">🛡️</span>
                <h4 className="font-semibold">Безопасность</h4>
                <p className="text-xs text-center">Защита от мошенничества, предотвращение атак</p>
              </div>
              <div className="bg-blue-50 dark:bg-blue-900 rounded p-2 flex flex-col items-center">
                <span className="text-lg">⚖️</span>
                <h4 className="font-semibold">Соблюдение закона</h4>
                <p className="text-xs text-center">Выполнение требований законодательства</p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-1">📜 На каком основании мы обрабатываем данные</h3>
            <ol className="list-decimal pl-5 text-sm space-y-1">
              <li><strong>Согласие пользователя</strong> (ст. 6 ФЗ №152-ФЗ)</li>
              <li><strong>Исполнение договора</strong> с пользователем</li>
              <li><strong>Законные интересы</strong> сервиса</li>
              <li><strong>Защита жизненно важных интересов</strong> пользователя</li>
            </ol>
          </div>

          <div>
            <h3 className="font-semibold mb-1">👤 Ваши права</h3>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div className="flex items-center gap-2 bg-gray-50 dark:bg-gray-800 rounded p-2">
                <span>ℹ️</span>
                <div>
                  <strong>Получать информацию</strong>
                  <div className="text-xs">о целях и способах обработки</div>
                </div>
              </div>
              <div className="flex items-center gap-2 bg-gray-50 dark:bg-gray-800 rounded p-2">
                <span>✏️</span>
                <div>
                  <strong>Вносить изменения</strong>
                  <div className="text-xs">уточнять или исправлять данные</div>
                </div>
              </div>
              <div className="flex items-center gap-2 bg-gray-50 dark:bg-gray-800 rounded p-2">
                <span>❌</span>
                <div>
                  <strong>Удалять данные</strong>
                  <div className="text-xs">по вашему запросу</div>
                </div>
              </div>
              <div className="flex items-center gap-2 bg-gray-50 dark:bg-gray-800 rounded p-2">
                <span>🚫</span>
                <div>
                  <strong>Отзывать согласие</strong>
                  <div className="text-xs">на обработку в любой момент</div>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-1">🔐 Как мы защищаем ваши данные</h3>
            <ul className="list-disc pl-5 text-sm space-y-1">
              <li><span className="mr-1">🔑</span>SSL-шифрование для безопасной передачи информации</li>
              <li><span className="mr-1">🏢</span>Доступ к данным только у уполномоченных сотрудников</li>
              <li><span className="mr-1">💾</span>Регулярное резервное копирование</li>
              <li><span className="mr-1">🔍</span>Постоянный мониторинг безопасности</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-1">⏱️ Сроки хранения данных</h3>
            <table className="w-full text-xs border border-gray-300 dark:border-gray-700 rounded overflow-hidden">
              <thead className="bg-gray-200 dark:bg-gray-800">
                <tr>
                  <th className="p-1 font-semibold">Тип данных</th>
                  <th className="p-1 font-semibold">Срок хранения</th>
                  <th className="p-1 font-semibold">Основание</th>
                </tr>
              </thead>
              <tbody>
                <tr className="even:bg-gray-50 dark:even:bg-gray-900">
                  <td className="p-1">Контактные данные</td>
                  <td className="p-1">3 года после последнего обращения</td>
                  <td className="p-1">Согласие пользователя</td>
                </tr>
                <tr className="even:bg-gray-50 dark:even:bg-gray-900">
                  <td className="p-1">Аналитические данные</td>
                  <td className="p-1">2 года</td>
                  <td className="p-1">Законные интересы</td>
                </tr>
                <tr className="even:bg-gray-50 dark:even:bg-gray-900">
                  <td className="p-1">Cookie-файлы</td>
                  <td className="p-1">До 1 года</td>
                  <td className="p-1">Согласие пользователя</td>
                </tr>
                <tr className="even:bg-gray-50 dark:even:bg-gray-900">
                  <td className="p-1">Журналы безопасности</td>
                  <td className="p-1">6 месяцев</td>
                  <td className="p-1">Требования безопасности</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div>
            <h3 className="font-semibold mb-1">📞 Контакты для связи</h3>
            <ul className="text-sm space-y-1">
              <li><span className="mr-1">📧</span><strong>Email:</strong> <a href="mailto:privacy@example.com" className="text-blue-600 underline ml-1">privacy@example.com</a></li>
              <li><span className="mr-1">📱</span><strong>Телефон:</strong> <a href="tel:+74951234567" className="text-blue-600 underline ml-1">+7 (495) 123-45-67</a></li>
              <li><span className="mr-1">📍</span><strong>Адрес:</strong> <span className="ml-1">г. Москва, ул. Примерная, д. 123, офис 456</span></li>
            </ul>
          </div>

          <div className="flex items-center gap-2 text-xs text-gray-500 mt-2">
            <span>🔄</span>
            <div>
              <strong>Последнее обновление:</strong> <time dateTime="2025-07-02">02 июля 2025 года</time>
              <br />
              <small>Ответственный: <code>Idzey</code></small>
            </div>
          </div>
        </section>
      </ScrollArea>
    </div>
  );
}