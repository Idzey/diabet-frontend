import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "../ui/dialog";
import { Button } from "../ui/button";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Checkbox } from "../ui/checkbox";
import { Form, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import React from "react";
import { NavLink } from "react-router-dom";

export default function DialogPermissions() {
  const [open, setOpen] = React.useState(true);
  console.log("DialogPermissions rendered");

  const permissionsSchema = z.object({
    personal: z
      .boolean()
      .refine((val) => val === true, { message: "Обязательное поле" }),
    medical: z
      .boolean()
      .refine((val) => val === true, { message: "Обязательное поле" }),
  });

  React.useEffect(() => {
    const permissions = localStorage.getItem("permissions");
    console.log("Permissions from localStorage:", permissions);
    if (permissions) {
        setOpen(false);
    }
  }, []);

  const form = useForm<z.infer<typeof permissionsSchema>>({
    resolver: zodResolver(permissionsSchema),
    defaultValues: {
      personal: false,
      medical: false,
    },
    mode: "onChange",
  });

  const onSubmit = () => {
    localStorage.setItem("permissions", "true");
    setOpen(false);
  };

  return (
    <Dialog open={open}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Разрешения</DialogTitle>
          <DialogDescription>
            Разрешите доступ к данным.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="personal"
              render={({ field }) => (
                <FormItem className="flex items-center gap-2">
                  <Checkbox
                    id="personal"
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                  <FormLabel htmlFor="personal">
                    Я разрешаю <NavLink className="text-blue-400" target="_blank" to="/permissions/info" end>сбор обработку персональных данных</NavLink>
                  </FormLabel>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="medical"
              render={({ field }) => (
                <FormItem className="flex items-center gap-2">
                  <Checkbox
                    id="medical"
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                  <FormLabel htmlFor="medical">
                    <NavLink target="_blank" className="text-blue-400" to="/permissions/responsibility" end>Отказ от ответсвенности</NavLink>
                  </FormLabel>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-end space-x-2 pt-2">
              <Button
                onClick={() => document.location.replace("https://ya.ru/")}
                variant="outline"
                type="button"
              >
                Отмена
              </Button>
              <Button type="submit">Разрешить</Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
