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

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();

  const showNotification = useNotificationStore(
    (state) => state.showNotification
  );

  const handleSubmit = async (data: ActorFormData) => {
    setIsSubmitting(true);
    setError(null);

    try {
      await onSubmit(data);
      showNotification("Actor saved successfully!", "success");
      router.push("/actors");
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "An error occurred while saving the actor."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

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