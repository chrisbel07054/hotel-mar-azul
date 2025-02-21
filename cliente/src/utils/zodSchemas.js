import { z } from "zod"

export const bookingSchema = z
  .object({
    fechaEntrada: z.string().min(1, "La fecha de entrada es requerida"),
    fechaSalida: z.string().min(1, "La fecha de salida es requerida"),
    huespedes: z.number().min(1, "Mínimo 1 huésped").max(5, "Máximo 5 huéspedes"),
    nombreHabitacion: z.enum(["habitación estándar", "habitación deluxe", "habitación suite"], {
      errorMap: (issue) => {
        if (issue.code === "invalid_enum_value") {
          return { message: "Seleccione un tipo de habitación" }
        }
        return { message: issue.message }
      },
    }),
  })
  .refine(
    (data) => {
      const fechaEntrada = new Date(data.fechaEntrada)
      const fechaSalida = new Date(data.fechaSalida)
      return fechaSalida > fechaEntrada
    },
    {
      message: "La fecha de salida debe ser posterior a la fecha de entrada",
      path: ["fechaSalida"],
    },
  )