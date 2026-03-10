"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { useRouter } from "@/i18n/navigation";
import ActorForm from "../ui/ActorForm";
import { ActorFormData } from "../validation/actorFormSchema";
import { createActor } from "../services/actorService";
import { useNotificationStore } from "@/shared/store/useNotificationStore";

export default function CreateActorPage() {
  const t = useTranslations("actors");
  //revisa si esta submitting rn o no, para definir como mostrar boton
  const [isSubmitting, setIsSubmitting] = useState(false);
  //posibles errores al crear actor
  const [error, setError] = useState<string | null>(null);
  //permite que componente redirija
  const router = useRouter(); 

  //usa show notification del store de notificaciones
  const showNotification = useNotificationStore(
    (state) => state.showNotification
  );
  //logica para manejar la creacion del actor
  const handleCreateActor = async (data: ActorFormData) => {
    setIsSubmitting(true);
    setError(null);

    //llama a la funcion de crear actor del service
    //le pasa data del form
    try{
      await createActor(data);
      showNotification(t("createdSuccess"), "success");
      //redirect a actores despues de crear
      router.push("/actors");
    } catch (err) {
      setError(
        err instanceof Error
        ? err.message
        : t("createError")
      );
    } finally {
      setIsSubmitting(false);
      console.log("Actor created successfully");
      console.log(data);
    }
  };

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">{t("createTitle")}</h1>
      <ActorForm onSubmit={handleCreateActor} isSubmitting={isSubmitting} />
      {error && <p className="text-red-500 mt-4">{error}</p>}
    </div>
  );
}
