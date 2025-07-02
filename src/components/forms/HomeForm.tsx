import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "../ui/sheet";
import { diabetSchema } from "./shemas/diabetSchema";
import { DiabetService } from "@/services/diabet.service";
import { ModelType } from "@/types/models";
import { useResultPredictStore } from "@/store/resultPredict.store";
import useIMTStore from "@/store/IMT.store";
import { toast } from "sonner";
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { DialogClose } from "@radix-ui/react-dialog";
import { Alert, AlertDescription } from "../ui/alert";
import { AlertCircleIcon } from "lucide-react";
import { Badge } from "../ui/badge";

export default function HomeForm({ isWomen }: { isWomen?: boolean }) {
  const setOpenResult = useResultPredictStore((state) => state.setOpen);
  const setResult = useResultPredictStore((state) => state.setResult);
  const imt = useIMTStore((state) => state.imt);

  const form = useForm({
    resolver: zodResolver(diabetSchema),
    mode: "onChange",
    reValidateMode: "onChange",
  });

  const [sheetOpen, setSheetOpen] = React.useState(false);

  const onSubmit = async (data: z.infer<typeof diabetSchema>) => {
    if (!imt) {
      return toast.error(
        "Пожалуйста, рассчитайте индекс массы тела (ИМТ) перед отправкой формы."
      );
    }
    const predictionData = {
      patient_data: {
        pregnancies: data.pregnancies || 0,
        glucose: data.glucose,
        blood_pressure: data.bloodPressure,
        skin_thickness: data.skinThickness,
        insulin: data.insulin,
        bmi: imt,
        diabetes_pedigree: Number(data.diabetesPedigreeFunction),
        age: data.age,
      },
      model_type: ModelType.random_forest as ModelType,
    };
    try {
      const result = await DiabetService.getPrediction(predictionData);
      setResult(result);
      setOpenResult(true);

      console.log("Form submitted with data:", predictionData);
      console.log("Prediction result:", result);
    } catch (error) {
      setOpenResult(false);
      console.error("Error during form submission:", error);
      throw error;
    }
  };

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {!isWomen && (
              <FormField
                control={form.control}
                name="pregnancies"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Беременности</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min={0}
                        max={15}
                        placeholder="число беременностей"
                        {...field}
                        value={field.value ?? ""}
                        onChange={(e) => field.onChange(e.target.valueAsNumber)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
            <FormField
              control={form.control}
              name="glucose"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Уровень глюкозы</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      min={50}
                      max={300}
                      placeholder="mg/dL"
                      {...field}
                      value={field.value ?? ""}
                      onChange={(e) => field.onChange(e.target.valueAsNumber)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="bloodPressure"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Артериальное давление</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      min={40}
                      max={180}
                      placeholder="мм рт.ст"
                      {...field}
                      value={field.value ?? ""}
                      onChange={(e) => field.onChange(e.target.valueAsNumber)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="skinThickness"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Толщина кожи</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      min={0}
                      max={70}
                      placeholder="мм"
                      {...field}
                      value={field.value ?? ""}
                      onChange={(e) => field.onChange(e.target.valueAsNumber)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="insulin"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Уровень инсулина</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      min={0}
                      max={900}
                      placeholder="мкЕд/мл"
                      {...field}
                      value={field.value ?? ""}
                      onChange={(e) => field.onChange(e.target.valueAsNumber)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex items-end justify-center">
              <Button
                className="w-full"
                variant="outline"
                type="button"
                onClick={() => setSheetOpen(true)}
              >
                Рассчитать ИМТ
              </Button>
            </div>

            <FormField
              control={form.control}
              name="age"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Возраст</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      min={0}
                      max={120}
                      placeholder="лет"
                      {...field}
                      value={field.value ?? ""}
                      onChange={(e) => field.onChange(e.target.valueAsNumber)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="diabetesPedigreeFunction"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel>Предрасположенность к диабету</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    className="flex flex-col"
                  >
                    <FormItem className="flex items-center gap-3">
                      <FormControl>
                        <RadioGroupItem value="0" />
                      </FormControl>
                      <FormLabel>ни у кого в семье нет диабета</FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center gap-3">
                      <FormControl>
                        <RadioGroupItem value="1" />
                      </FormControl>
                      <FormLabel>диабет есть у одного из родителей</FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center gap-3">
                      <FormControl>
                        <RadioGroupItem value="2" />
                      </FormControl>
                      <FormLabel>
                        диабет есть у обоих родителей или нескольких
                        родственников
                      </FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center gap-3">
                      <FormControl>
                        <RadioGroupItem value="3" />
                      </FormControl>
                      <FormLabel>диабет у многих родственников</FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Рассчитать</Button>
        </form>
      </Form>

      <IMTSheet open={sheetOpen} setOpen={setSheetOpen} />
    </>
  );
}

function IMTSheet({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
}) {
  const IMTFormSchema = z.object({
    weight: z
      .number({ required_error: "Введите вес" })
      .min(30, "Минимум 30 кг")
      .max(200, "Максимум 200 кг"),
    height: z
      .number({ required_error: "Введите рост" })
      .min(100, "Минимум 100 см")
      .max(250, "Максимум 250 см"),
  });
  const imtStore = useIMTStore();
  const [openResult, setOpenResult] = React.useState(false);

  const form = useForm({
    resolver: zodResolver(IMTFormSchema),
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: {
      weight: 0,
      height: 0,
    },
  });

  const onSubmit = (values: { weight: number; height: number }) => {
    const bmi = values.weight / Math.pow(values.height / 100, 2);
    imtStore.setIMT(Number(bmi.toFixed(2)));
    setOpen(false);
    setOpenResult(true);
  };

  return (
    <div className="flex items-end w-full">
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Рассчитать индекс массы тела</SheetTitle>
            <SheetDescription>
              Введите ваш вес и рост, чтобы рассчитать ИМТ.
            </SheetDescription>
          </SheetHeader>
          <div className="flex flex-col p-5 gap-5 h-full">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex flex-col gap-4 h-full flex-1"
                style={{ minHeight: 0 }}
              >
                <div className="flex-1 flex flex-col gap-4">
                  <FormField
                    control={form.control}
                    name="weight"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Вес</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="кг"
                            {...field}
                            value={field.value}
                            onChange={(e) =>
                              field.onChange(e.target.valueAsNumber)
                            }
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="height"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Рост</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="см"
                            {...field}
                            value={field.value}
                            onChange={(e) =>
                              field.onChange(e.target.valueAsNumber)
                            }
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="mt-auto pt-4">
                  <Button className="w-full" type="submit">
                    Узнать
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </SheetContent>
      </Sheet>
      <IMTResultDialog open={openResult} setOpen={setOpenResult} />
    </div>
  );
}

function IMTResultDialog({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
}) {
  const imt = useIMTStore((state) => state.imt);
  if (!imt) {
    return null;
  }
  const IMTCategory = {
    Good: "Good",
    Warning: "Warning",
    Bad: "Bad",
  } as const;

  type IMTCategoryType = (typeof IMTCategory)[keyof typeof IMTCategory];

  let imtCategory: IMTCategoryType;

  if (imt < 18.5) {
    imtCategory = IMTCategory.Warning;
  } else if (imt >= 18.5 && imt < 24.9) {
    imtCategory = IMTCategory.Good;
  } else if (imt >= 25 && imt < 29.9) {
    imtCategory = IMTCategory.Warning;
  } else {
    imtCategory = IMTCategory.Bad;
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Результат</DialogTitle>
          <DialogDescription>ыотьвыльвыывывыв</DialogDescription>
        </DialogHeader>

        <Alert variant="default" className="mb-4">
          <AlertCircleIcon />
          <AlertDescription>
            <p>
              Индекс массы тела (ИМТ) успешно рассчитан. Ваш результат:
              <Badge variant={
                imtCategory === "Good"
                  ? "default"
                  : imtCategory === "Warning"
                  ? "secondary"
                  : "destructive"
              }>
                {imt.toFixed(2)} ({imtCategory})
              </Badge>
            </p>
            <a
              className="text-blue-500"
              href="https://www.who.int/ru/news-room/fact-sheets/detail/obesity-and-overweight"
              target="_blank"
            >
              Подробнее...
            </a>
          </AlertDescription>
        </Alert>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline" onClick={() => setOpen(false)}>Ок</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
