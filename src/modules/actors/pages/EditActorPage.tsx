/*"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import ActorFormPage from "../pages/ActorFormPage";
import { fetchActorById, updateActor } from "../services/actorService";
import { ActorFormData } from "../validation/actorFormSchema";

export default function EditActorPage() {

  const params = useParams();
  const [actor, setActor] = useState<ActorFormData>();

  useEffect(() => {
    fetchActorById(params.id as string).then(setActor);
  }, [params.id]);

  if (!actor) return <p>Loading...</p>;

  const handleUpdateActor = async (data: ActorFormData) => {
    await updateActor(params.id as string, data);
  };

  return (
    <ActorFormPage
      title="Editar Actor"
      defaultValues={actor}
      onSubmit={handleUpdateActor}
    />
  );
}*/

"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import ActorForm from "../ui/ActorForm";
import { ActorFormData } from "../validation/actorFormSchema";
import { fetchActorById, updateActor } from "../services/actorService";
import { useActorStore } from "@/shared/store/useActorStore";

export default function EditActorPage() {
  const [actor, setActor] = useState<ActorFormData | undefined>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const editActor = useActorStore((state) => state.editActor);

  const router = useRouter();
  const params = useParams();

  /*useEffect(() => {
    fetchActorById(params.id as string).then((data) => {
      setActor(data);
    });
  }, [params.id]);*/

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


  /*const handleUpdateActor = async (data: ActorFormData) => {
    console.log("form data", data);
    setIsSubmitting(true);

    await updateActor(params.id as string, data);

    router.push("/actors");
  };*/

  const handleUpdateActor = async (data: ActorFormData) => {
    try{
      setIsSubmitting(true);
      
      await editActor(params.id as string, data);
      
      console.log("ACTOR UPDATED")
      
      router.push("/actors");
      router.refresh();
    } catch (error) {
      console.error("Error updating actor:", error);
    } finally {
      setIsSubmitting(false);
    }
    
    //console.log("SUBMIT CLICKED", data);
    //console.log("form data", data);

    //setIsSubmitting(true);
    //console.log("CALLING editActor");
    //await editActor(params.id as string, data);
    //await updateActor(params.id as string, data);
    //router.push("/actors");
  };

  if (!actor) return <p>Loading...</p>;

  return (
    <div className="bg-black container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">Edit Actor</h1>

      <ActorForm
        onSubmit={handleUpdateActor}
        defaultValues={actor}
        isSubmitting={isSubmitting}
      />
    </div>
  );
}