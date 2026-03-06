"use client";

import { useState } from "react";
import { createActor, CreateActorPayload, Actor } from "../services/actorService";

interface Props {
  onActorCreated: (newActor: Actor) => void;
}

const emptyForm: CreateActorPayload = {
  name: "",
  photo: "",
  nationality: "",
  birthDate: "",
  biography: "",
};

export default function ActorForm({ onActorCreated }: Props) {
  const [form, setForm] = useState<CreateActorPayload>(emptyForm);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Single handler for all fields — reads the input's name attribute
  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();           // prevents page reload
    setLoading(true);
    setError(null);

    try {
      const newActor = await createActor(form);
      onActorCreated(newActor);   // bubble the new actor up to the page
      setForm(emptyForm);         // reset form after success
    } catch {
      setError("Failed to create actor. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Name</label>
        <input name="name" value={form.name} onChange={handleChange} required />
      </div>

      <div>
        <label>Photo URL</label>
        <input name="photo" value={form.photo} onChange={handleChange} />
      </div>

      <div>
        <label>Nationality</label>
        <input name="nationality" value={form.nationality} onChange={handleChange} />
      </div>

      <div>
        <label>Birth Date</label>
        <input name="birthDate" type="date" value={form.birthDate} onChange={handleChange} />
      </div>

      <div>
        <label>Biography</label>
        <textarea name="biography" value={form.biography} onChange={handleChange} rows={4} />
      </div>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <button type="submit" disabled={loading}>
        {loading ? "Creating..." : "Create Actor"}
      </button>
    </form>
  );
}