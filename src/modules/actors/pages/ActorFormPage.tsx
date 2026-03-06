"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import ActorForm from "../ui/ActorForm";
import { ActorFormData } from "../validation/actorFormSchema";
import { useNotificationStore } from "@/shared/store/useNotificationStore";

interface Props {
  title: string;
  defaultValues?: ActorFormData;
  onSubmit: (data: ActorFormData) => Promise<void>;
}

export default function ActorFormPage({
  title,
  defaultValues,
  onSubmit,
}: Props) {
  //revisa si esta submitting rn o no, para definir como mostrar boton
  const [isSubmitting, setIsSubmitting] = useState(false);
  //guarda errores sin aparecen
  const [error, setError] = useState<string | null>(null);

  //permite que el componente redirija a otra pagina
  const router = useRouter();

  //show notification del store de notificaciones
  //muestra msj de exito o error
  const showNotification = useNotificationStore(
    (state) => state.showNotification
  );

  //main logica para manejar el submit del form
  const handleSubmit = async (data: ActorFormData) => {
    setIsSubmitting(true);
    setError(null);

    try {
      //aca se llama el api se le pasa prop con data
      await onSubmit(data);
      showNotification("Actor saved successfully!", "success");
      //redirect a pagina de actores despues de crear
      router.push("/actors");
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "An error occurred while saving the actor."
      );
    } finally {
      //se resetea estado de submitting a false para volver a a ctivar botons
      setIsSubmitting(false);
    }
  };
  //render del form
  return (
    <div className="bg-black container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">{title}</h1>

      <ActorForm
        onSubmit={handleSubmit}
        defaultValues={defaultValues}
        isSubmitting={isSubmitting}
      />

      {error && <p className="text-red-500 mt-4">{error}</p>}
    </div>
  );
}