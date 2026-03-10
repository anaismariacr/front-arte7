"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { useRouter } from "@/i18n/navigation";
import ActorForm from "../ui/ActorForm";
import { ActorFormData } from "../validation/actorFormSchema";
import { fetchActorById } from "../services/actorService";
import { useActorStore } from "@/shared/store/useActorStore";
import { useNotificationStore } from "@/shared/store/useNotificationStore";

export default function EditActorPage() {
  const t = useTranslations("actors");
  //actor tiene info del actor que se busco
  const [actor, setActor] = useState<ActorFormData | undefined>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  //maneja el estado del edit del actor
  //no llama service directamente
  const editActor = useActorStore((state) => state.editActor);
  const showNotification = useNotificationStore(
    (state) => state.showNotification
  );
  
  //redirect
  const router = useRouter();
  //coge el id del actor del url
  const params = useParams();

  //fetch the actor por id
  //settea los valores del actor fetcheado para mostrarlos en el form
  useEffect(() => {
  fetchActorById(params.id as string).then((data) => {
    setActor({
      name: data.name,
      photo: data.photo,
      nationality: data.nationality,
      birthDate: data.birthDate,
      biography: data.biography,
    });
  });
}, [params.id]);

  const handleUpdateActor = async (data: ActorFormData) => {
    try{
      setIsSubmitting(true);
      
      //usa edit actor del useActor store
      //el store se encarga de llamar a servicios
      await editActor(params.id as string, data);
      
      console.log("ACTOR UPDATED")
      
      showNotification(t("updatedSuccess"), "success");
      router.push("/actors");
      router.refresh();
    } catch (error) {
      console.error("Error updating actor:", error);
      showNotification(t("updateError"), "error");
    } finally {
      setIsSubmitting(false);
    }
    
  };
  //por si data no se ha cargado yet
  //no renderiza form hasta que se cargue el actor
  if (!actor) return <p>{t("loading")}</p>;

  return (
    <div className="bg-black container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">{t("editTitle")}</h1>

      <ActorForm
        onSubmit={handleUpdateActor}
        defaultValues={actor}
        isSubmitting={isSubmitting}
      />
    </div>
  );
}
