import { z } from "zod";

type Translate = (key: string) => string;

export function createActorFormSchema(t: Translate) {
  return z.object({
    name: z.string().min(1, t("validation.nameRequired")),
    photo: z.string().url(t("validation.photoInvalid")),
    nationality: z.string().min(1, t("validation.nationalityRequired")),
    birthDate: z.string().min(1, t("validation.birthDateRequired")),
    biography: z.string().min(1, t("validation.biographyRequired")),
  });
}

export interface ActorFormData {
  name: string;
  photo: string;
  nationality: string;
  birthDate: string;
  biography: string;
}

//crear schema aca
//usar schema en form component
//logica de envio en page.tsx, no en el componente
