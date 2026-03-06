"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  actorFormSchema,
  ActorFormData,
} from "../validation/actorFormSchema";

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
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ActorFormData>({
    resolver: zodResolver(actorFormSchema),
    //defaultValues: {
    //  ...defaultValues,
    //},
  });
  
  useEffect(() => {
    if(defaultValues) {
      reset(defaultValues);
    }
  }, [defaultValues, reset]);

  return (
    <form onSubmit = {handleSubmit(onSubmit)} className = "space-y-4">
      <div className="form-container">
        <label htmlFor="name" className="block font-medium">
          Name:
        </label>
        <input
          id="name"
          {...register("name")}
          className="w-full p-2 border rounded"
        />
        {errors.name && (
          <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
        )}
      </div>
      <div className="form-container">
        <label htmlFor="photo" className="block font-medium">
          Photo:
        </label>
        <input
          id="photo"
          {...register("photo")}
          className="w-full p-2 border rounded"
        />
        {errors.photo && (
          <p className="text-red-500 text-sm mt-1">{errors.photo.message}</p>
        )}
      </div>
      <div className="form-container">
        <label htmlFor="nationality" className="block font-medium">
          Nationality:
        </label>
        <input
          id="nationality"
          {...register("nationality")}
          className="w-full p-2 border rounded"
        />
        {errors.nationality && (
          <p className="text-red-500 text-sm mt-1">{errors.nationality.message}</p>
        )}
      </div>
      <div className="form-container">
        <label htmlFor="birthDate" className="block font-medium">
          Birth Date:
        </label>
        <input
          id="birthDate"
          {...register("birthDate")}
          className="w-full p-2 border rounded"
        />
        {errors.birthDate && (
          <p className="text-red-500 text-sm mt-1">{errors.birthDate.message}</p>
        )}
      </div>
      <div className="form-container">
        <label htmlFor="biography" className="block font-medium">
          Biography:
        </label>
        <input
          id="biography"
          {...register("biography")}
          className="w-full p-2 border rounded"
        />
        {errors.biography && (
          <p className="text-red-500 text-sm mt-1">{errors.biography.message}</p>
        )}
      </div>
      <button
        type="submit"
        disabled={isSubmitting}
        className="block mx-auto bg-white text-black font-bold py-2 px-6 rounded hover:bg-gray-200 disabled:bg-gray-300"
      >
        {isSubmitting ? "Saving..." : "Save Actor"}
      </button>
    </form>
  )
}
