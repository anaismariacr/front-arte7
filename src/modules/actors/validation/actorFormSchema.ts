import { z } from "zod";

export const actorFormSchema = z.object({
    name: z.string().min(1, "Name is required"),
    photo: z.string().url("Must be a valid URL"),
    nationality: z.string().min(1, "Nationality is required"),
    birthDate: z.string().datetime("Must be a valid date"),
    biography: z.string().min(1, "Biography is required"),
});

export type ActorFormData = z.infer<typeof actorFormSchema>;

//crear schema aca
//usar schema en form component
//logica de envio en page.tsx, no en el componente