import { z } from "zod";

export const diabetSchema = z.object({
  pregnancies: z
    .number({ required_error: 'Обязательное поле', invalid_type_error: 'Введите количество беременностей' })
    .min(0, 'Минимум 0')
    .max(15, 'Максимум 15')
    .optional(),
  glucose: z
    .number({ required_error: 'Обязательное поле', invalid_type_error: 'Введите уровень глюкозы' })
    .min(50, 'Минимум 50')
    .max(300, 'Максимум 300'),
  bloodPressure: z
    .number({ required_error: 'Обязательное поле', invalid_type_error: 'Введите артериальное давление' })
    .min(40, 'Минимум 40')
    .max(180, 'Максимум 180'),
  skinThickness: z
    .number({ required_error: 'Обязательное поле', invalid_type_error: 'Введите толщину кожи' })
    .min(0, 'Минимум 0')
    .max(70, 'Максимум 70'),
  insulin: z
    .number({ required_error: 'Обязательное поле', invalid_type_error: 'Введите уровень инсулина' })
    .min(0, 'Минимум 0')
    .max(900, 'Максимум 900'),
  diabetesPedigreeFunction: z
    .string({ required_error: 'Обязательное поле', invalid_type_error: 'Выберите вариант' })
    .min(0)
    .max(3),
  age: z
    .number({ required_error: 'Обязательное поле', invalid_type_error: 'Введите возраст' })
    .min(0, 'Минимум 0')
    .max(120, 'Максимум 120'),
});