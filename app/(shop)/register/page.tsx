"use client";

import { useRef, useState } from "react";
import { RegisterSchemaType } from "~/app/libs/RegisterModel";

export default function RegisterPage() {
  const nameRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const passwordConfirmRef = useRef<HTMLInputElement | null>(null);
  const emailRef = useRef<HTMLInputElement | null>(null);
  const formRef = useRef<HTMLFormElement | null>(null);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  return (
    <div className="flex flex-col p-4 gap-2 max-w-xl">
      <div className="text-2xl">Sign Up</div>
      <form
        ref={formRef}
        className="flex flex-col gap-1"
        onSubmit={async (e) => {
          e.preventDefault();

          setLoading(true);
          setErrors({});

          const payload: RegisterSchemaType = {
            name: nameRef.current?.value,
            email: emailRef.current!.value,
            password: passwordRef.current!.value,
            passwordConfirm: passwordConfirmRef.current!.value,
          } as any;

          const r = await fetch("/api/auth/register", {
            method: "post",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify(payload),
          });

          const d = await r.json();
          if (r.ok) {
            formRef.current?.reset();
            nameRef.current?.focus();
          } else {
            if (r.status === 400) {
              setErrors(d);
            } else {
              setErrors({
                form: "Failed to process",
              });
            }
          }
          setLoading(false);
        }}
      >
        <input
          type="text"
          ref={nameRef}
          placeholder="Name"
          className="border-[1px] rounded p-2 border-slate-400"
          autoFocus
        />
        {errors?.name ? (
          <div className="text-red-400 text-sm">{errors.name}</div>
        ) : null}
        <input
          type="email"
          ref={emailRef}
          required
          placeholder="Email"
          className="border-[1px] rounded p-2 border-slate-400"
        />
        {errors?.email ? (
          <div className="text-red-400 text-sm">{errors.email}</div>
        ) : null}
        <input
          type="password"
          ref={passwordRef}
          required
          placeholder="Password"
          className="border-[1px] rounded p-2 border-slate-400"
          minLength={8}
        />
        {errors?.password ? (
          <div className="text-red-400 text-sm">{errors.password}</div>
        ) : null}
        <input
          type="password"
          ref={passwordConfirmRef}
          required
          placeholder="Confirm Password"
          className="border-[1px] rounded p-2 border-slate-400"
          minLength={8}
        />
        {errors?.passwordConfirm ? (
          <div className="text-red-400 text-sm">{errors.passwordConfirm}</div>
        ) : null}
        <button
          type="submit"
          className="border-[1px] border-blue-500 p-4 rounded"
          disabled={loading}
        >
          {loading ? "Processing..." : "Sign Up"}
        </button>
        {errors?.form ? (
          <div className="text-red-400 text-sm">{errors.form}</div>
        ) : null}
      </form>
    </div>
  );
}
