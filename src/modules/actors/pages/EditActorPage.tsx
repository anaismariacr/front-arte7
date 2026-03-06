"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import ActorForm from "../ui/ActorForm";
import { ActorFormData } from "../validation/actorFormSchema";
import { fetchActorById, updateActor } from "../services/actorService";

export default function EditActorPage() {
  const [actor, setActor] = useState<ActorFormData | undefined>();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const router = useRouter();
  const params = useParams();

  useEffect(() => {
    fetchActorById(params.id as string).then((data) => {
      setActor(data);
    });
  }, [params.id]);


  const handleUpdateActor = async (data: ActorFormData) => {
    console.log("form data", data);
    setIsSubmitting(true);

    await updateActor(params.id as string, data);

    router.push("/actors");
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