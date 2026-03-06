/*"use client";

import ActorFormPage from "../pages/ActorFormPage";
import { createActor } from "../services/actorService";
import { ActorFormData } from "../validation/actorFormSchema";

export default function CreateActorPage() {

  const handleCreateActor = async (data: ActorFormData) => {
    await createActor(data);
  };

  return (
    <ActorFormPage
      title="Crear Nuevo Actor"
      onSubmit={handleCreateActor}
    />
  );
}*/

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import ActorForm from "../ui/ActorForm";
import { ActorFormData } from "../validation/actorFormSchema";
import { createActor } from "../services/actorService";
import { useNotificationStore } from "@/shared/store/useNotificationStore";

export default function CreateActorPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter(); 

  const showNotification = useNotificationStore(
    (state) => state.showNotification
  );

  const handleCreateActor = async (data: ActorFormData) => {
    setIsSubmitting(true);
    setError(null);
    
    try{
      await createActor(data);
      showNotification("Actor created successfully!", "success");
      router.push("/actors");
    } catch (err) {
      setError(
        err instanceof Error
        ? err.message
        : "An error ocurred while creating the actor."
      );
    } finally {
      setIsSubmitting(false);
      console.log("Actor created successfully");
      console.log(data);
    }
  };

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">Crear Nuevo Actor</h1>
      <ActorForm onSubmit={handleCreateActor} isSubmitting={isSubmitting} />
      {error && <p className="text-red-500 mt-4">{error}</p>}
    </div>
  );
}
