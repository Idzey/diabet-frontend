import React from "react";
import { useInView } from "react-intersection-observer";
import HomeForm from "@/components/forms/HomeForm";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useResultPredictStore } from "@/store/resultPredict.store";
import { DialogClose } from "@radix-ui/react-dialog";
import { BriefcaseMedical } from "lucide-react";
import { NavBar } from "@/components/ui/nav-bar";
import DialogPermissions from "@/components/dialog/DialogPermissions";

export default function Home() {
  const [activeSection, setActiveSection] = React.useState<string>("");
  const {
    ref: whyRef,
    inView: whyInView,
    entry: whyEntry,
  } = useInView({ threshold: 0.18 });
  const {
    ref: checkRef,
    inView: checkInView,
    entry: checkEntry,
  } = useInView({ threshold: 0.18 });

  React.useEffect(() => {
    if (checkInView && whyInView) {
      if (
        whyEntry &&
        checkEntry &&
        whyEntry.boundingClientRect.top < checkEntry.boundingClientRect.top
      ) {
        setActiveSection("#why-this-need");
      } else {
        setActiveSection("#check-yourself");
      }
    } else if (checkInView) {
      setActiveSection("#check-yourself");
    } else if (whyInView) {
      setActiveSection("#why-this-need");
    } else {
      setActiveSection("");
    }
  }, [checkInView, whyInView, whyEntry, checkEntry]);

  return (
    <>
      <DialogPermissions />
      <div className="min-h-screen flex flex-col bg-gray-100 dark:bg-gray-900 scroll-smooth">
        <header>
          <NavBar activeSection={activeSection} />
        </header>
        <div className="mt-10 px-10">
          <main className="flex flex-col items-center justify-center mt-10">
            <StartBlock />
            <WhyThisNeed sectionRef={whyRef} />
            <CheckYourselfBlock sectionRef={checkRef} />
          </main>
        </div>
        <Footer />
        <DialogResult />
      </div>
    </>
  );
}

function Footer() {
  return (
    <footer className="mt-auto p-4 text-sm md:text-md text-center text-gray-600 dark:text-gray-400">
      <p>© 2025 | Сделал К.В. Пантюхин в ходе курсовой работы | г. Воронеж</p>
    </footer>
  );
}

function CheckYourselfBlock({
  sectionRef,
}: {
  sectionRef: React.RefCallback<HTMLDivElement>;
}) {
  return (
    <div
      id="check-yourself"
      ref={sectionRef}
      className="flex flex-col items-center pt-20"
    >
      <h1 className="text-xl md:text-4xl font-bold text-gray-800 dark:text-gray-200">
        Проверьте себя на предрасположенность к диабету
      </h1>
      <div className="max-w-200 md:p-12">
        <Tabs
          defaultValue="w"
          className="flex flex-col gap-3 w-full  md:w-[600px]"
        >
          <TabsList className="flex gap-3 p-4">
            <p>Пол: </p>
            <div>
              <TabsTrigger value="w">Мужской</TabsTrigger>
              <TabsTrigger value="m">Женский</TabsTrigger>
            </div>
          </TabsList>
          <TabsContent value="w">
            <Card className="p-6">
              <HomeForm isWomen={true} />
            </Card>
          </TabsContent>
          <TabsContent value="m">
            <Card className="p-6">
              <HomeForm isWomen={false} />
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

function StartBlock() {
  return (
    <div className="flex flex-col md:flex-row gap-2 md:px-10 lg:px-30 items-stretch mb-20">
      <div
        className="relative bg-cover min-h-56 md:h-auto bg-center w-full md:w-1/2 py-6 rounded-lg shadow-lg flex items-center justify-end p-6"
        style={{ backgroundImage: 'url("/images/diabetes.jpg")' }}
      >
        <div className="absolute inset-0 bg-black/40 rounded-lg" />
      </div>

      <Card className="w-full md:w-1/2 min-h-56 md:h-auto bg-black/40 flex">
        <CardContent className="p-6 flex items-center justify-center w-full">
          <p className="w-full text-white text-sm md:text-md relative z-10 overflow-y-auto max-h-[60vh]">
            <span className="font-bold">Сахарный диабет</span> — одно из самых
            распространённых хронических заболеваний в мире, которое нередко
            развивается незаметно. Раннее выявление риска позволяет своевременно
            принять меры: скорректировать образ жизни, питание, физическую
            активность и вовремя обратиться к врачу.
            <br />
            Этот сервис помогает быстро оценить вероятность развития диабета на
            основе основных медицинских показателей. Это удобно для всех: как
            для врачей, так и для самих пользователей, которые заботятся о своём
            здоровье.
            <br />
            Простая форма ввода и наглядный результат делают систему доступной
            даже без медицинского образования — всё, что нужно, это ввести
            параметры и получить объективную оценку уровня риска.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

function DialogResult() {
  const data = useResultPredictStore((state) => state.result);
  const open = useResultPredictStore((state) => state.open);
  const setOpen = useResultPredictStore((state) => state.setOpen);

  if (!data) {
    return null;
  }

  const percent = (data.probability_diabetes * 100).toFixed(1);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Результат</DialogTitle>
          <DialogDescription>
            Это предварительная оценка риска развития сахарного диабета на
            основе введённых вами данных. Для постановки диагноза и получения
            рекомендаций обязательно обратитесь к врачу.
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-4 mb-2">
          <div className="flex text-lg font-semibold mb-2 gap-4">
            Вероятность диабета: {percent}%
            {data.risk_level === "Низкий" ? (
              <Badge className="text-sm px-2 py-1 bg-green-400">
                Низкий риск
              </Badge>
            ) : data.risk_level === "Высокий" ? (
              <Badge className="text-sm px-2 py-1 bg-orange-300">
                Средний риск
              </Badge>
            ) : (
              <Badge className="text-sm px-2 py-1 bg-red-500">
                Высокий риск
              </Badge>
            )}
          </div>

          <div>
            <Progress value={Number(percent)} className="h-4 mb-4" />
            <div className="w-full flex justify-between">
              <Badge className="text-sm px-2 py-1 bg-green-400">Низкий</Badge>
              <Badge className="text-sm px-2 py-1 bg-orange-300">Средний</Badge>
              <Badge className="text-sm px-2 py-1 bg-red-500">Высокий</Badge>
            </div>
          </div>
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function WhyThisNeed({
  sectionRef,
}: {
  sectionRef: React.RefCallback<HTMLDivElement>;
}) {
  const items = [
    {
      icon: <BriefcaseMedical className="w-8 h-8 text-blue-500" />,
      title: "Профилактика заболеваний",
      description:
        "Раннее выявление риска диабета позволяет предотвратить развитие заболевания и его осложнений.",
    },
    {
      icon: <BriefcaseMedical className="w-8 h-8 text-blue-500" />,
      title: "Удобство и доступность",
      description:
        "Простой интерфейс и быстрая проверка позволяют любому человеку оценить свой риск без необходимости посещения врача.",
    },
    {
      icon: <BriefcaseMedical className="w-8 h-8 text-blue-500" />,
      title: "Образование и информирование",
      description:
        "Сервис помогает людям лучше понять своё здоровье и принять осознанные решения о профилактике и лечении.",
    },
  ];

  return (
    <div
      ref={sectionRef}
      className="flex flex-col items-center pt-20"
      id="why-this-need"
    >
      <h1 className="text-xl md:text-4xl font-bold text-gray-800 dark:text-gray-200">
        Почему это важно?
      </h1>
      <div className="w-full flex flex-col md:flex-row gap-4 p-10">
        {items.map((item, index: number) => (
          <WhyThisNeedItem
            title={item.title}
            description={item.description}
            icon={item.icon}
            key={index}
          />
        ))}
      </div>
    </div>
  );
}

function WhyThisNeedItem({
  title,
  description,
  icon,
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="w-full md:w-1/3 flex flex-col items-center gap-4 p-4 shadow-md rounded-lg bg-white dark:bg-gray-800">
      <div className="flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
        {icon}
      </div>

      <div className="flex flex-col items-center text-center gap-2">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
          {title}
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          {description}
        </p>
      </div>
    </div>
  );
}
