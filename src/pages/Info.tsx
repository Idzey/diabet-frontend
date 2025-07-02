import { ScrollArea } from "@/components/ui/scroll-area";

export default function Info() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200">
      <ScrollArea className="flex p-6 h-[600px] w-[400px] rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-4">Важная информация</h2>
        <p className="mb-2">
          Вся информация, размещённая на этом сайте, предназначена исключительно для ознакомительных целей и не является медицинской рекомендацией, диагнозом или руководством к действию.
        </p>
        <p className="mb-2">
          Перед принятием любых решений, связанных с вашим здоровьем, обязательно проконсультируйтесь с квалифицированным специалистом.
        </p>
        <ul className="disclaimer-list mb-4 list-disc pl-5">
          <li>Администрация сайта не гарантирует точность, полноту и актуальность размещённой информации.</li>
          <li>Сервис может быть временно недоступен по техническим причинам.</li>
          <li>Использование информации с сайта осуществляется на ваш страх и риск.</li>
          <li>Мы не несем ответственности за возможные последствия, возникшие в результате использования материалов сайта.</li>
        </ul>
        <blockquote className="disclaimer-quote border-l-4 border-blue-400 pl-4 italic mb-4">
          <p>
            Любые действия, предпринятые на основании информации с данного сайта, вы совершаете самостоятельно и под свою ответственность.
          </p>
        </blockquote>
        <div className="disclaimer-update text-sm text-gray-500 mb-2">
          <strong>Последнее обновление:</strong> <time dateTime="2025-07-02">02 июля 2025 года</time>
        </div>
        <div className="disclaimer-contact text-sm">
          <p>
            По вопросам и предложениям пишите на почту:
            <a href="mailto:info@example.com" className="disclaimer-link text-blue-600 underline ml-1">
              info@example.com
            </a>
          </p>
        </div>
      </ScrollArea>
    </div>
  );
}
