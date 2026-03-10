"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { ActorFormData, createActorFormSchema } from "../validation/actorFormSchema";

interface ActorFormProps {
  onSubmit: SubmitHandler<ActorFormData>;
  defaultValues?: ActorFormData;
  isSubmitting: boolean; 
}

export default function ActorForm({
  onSubmit,
  defaultValues,
  isSubmitting,
}: ActorFormProps) {
  const t = useTranslations("actorForm");
  const actorFormSchema = createActorFormSchema(t);

  const {register, handleSubmit,reset, formState: { errors },} = useForm<ActorFormData>({
    resolver: zodResolver(actorFormSchema),
    defaultValues
  });
  
  useEffect(() => {
    if(defaultValues) {
      reset(defaultValues);
    }
  }, [defaultValues, reset]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} aria-label={t("aria.form")}>
      <div className="form-container">
        <label htmlFor="name" className="block font-medium">
          {t("fields.name")}
        </label>
        <input
          id="name"
          {...register("name")}
          aria-label={t("fields.name")}
          aria-invalid={Boolean(errors.name)}
          aria-describedby={errors.name ? "name-error" : undefined}
          className="w-full p-2 border rounded"
        />
        {errors.name && (
          <p id="name-error" className="text-red-500 text-sm mt-1">
            {errors.name.message}
          </p>
        )}
      </div>
      <div className="form-container">
        <label htmlFor="photo" className="block font-medium">
          {t("fields.photo")}
        </label>
        <input
          id="photo"
          {...register("photo")}
          aria-label={t("fields.photo")}
          aria-invalid={Boolean(errors.photo)}
          aria-describedby={errors.photo ? "photo-error" : undefined}
          className="w-full p-2 border rounded"
        />
        {errors.photo && (
          <p id="photo-error" className="text-red-500 text-sm mt-1">
            {errors.photo.message}
          </p>
        )}
      </div>
      <div className="form-container">
        <label htmlFor="nationality" className="block font-medium">
          {t("fields.nationality")}
        </label>
        <input
          id="nationality"
          {...register("nationality")}
          aria-label={t("fields.nationality")}
          aria-invalid={Boolean(errors.nationality)}
          aria-describedby={errors.nationality ? "nationality-error" : undefined}
          className="w-full p-2 border rounded"
        />
        {errors.nationality && (
          <p id="nationality-error" className="text-red-500 text-sm mt-1">
            {errors.nationality.message}
          </p>
        )}
      </div>
      <div className="form-container">
        <label htmlFor="birthDate" className="block font-medium">
          {t("fields.birthDate")}
        </label>
        <input
          id="birthDate"
          {...register("birthDate")}
          aria-label={t("fields.birthDate")}
          aria-invalid={Boolean(errors.birthDate)}
          aria-describedby={errors.birthDate ? "birthDate-error" : undefined}
          className="w-full p-2 border rounded"
        />
        {errors.birthDate && (
          <p id="birthDate-error" className="text-red-500 text-sm mt-1">
            {errors.birthDate.message}
          </p>
        )}
      </div>
      <div className="form-container">
        <label htmlFor="biography" className="block font-medium">
          {t("fields.biography")}
        </label>
        <input
          id="biography"
          {...register("biography")}
          aria-label={t("fields.biography")}
          aria-invalid={Boolean(errors.biography)}
          aria-describedby={errors.biography ? "biography-error" : undefined}
          className="w-full p-2 border rounded"
        />
        {errors.biography && (
          <p id="biography-error" className="text-red-500 text-sm mt-1">
            {errors.biography.message}
          </p>
        )}
      </div>
      <button
        type="submit"
        disabled={isSubmitting}
        aria-label={isSubmitting ? t("actions.saving") : t("actions.save")}
        className="block mx-auto bg-white text-black font-bold py-2 px-6 rounded hover:bg-gray-200 disabled:bg-gray-300"
      >
        {isSubmitting ? t("actions.saving") : t("actions.save")}
      </button>
    </form>
  )
}


//    <form onSubmit = {handleSubmit(onSubmit)} className = "space-y-4">
