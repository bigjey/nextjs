"use client";

import { useRef, useState } from "react";
import { LoginSchemaType } from "~/app/libs/LoginModel";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const emailRef = useRef<HTMLInputElement | null>(null);
  const formRef = useRef<HTMLFormElement | null>(null);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const router = useRouter();

  return (
    <div className="flex flex-col p-4 gap-2 max-w-xl">
      <div className="text-2xl">Sign In</div>
      <form
        ref={formRef}
        className="flex flex-col gap-1"
        onSubmit={async (e) => {
          e.preventDefault();

          setLoading(true);
          setErrors({});

          const payload: LoginSchemaType = {
            email: emailRef.current!.value,
            password: passwordRef.current!.value,
          } as any;

          const r = await fetch("/api/auth/login", {
            method: "post",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify(payload),
          });

          const d = await r.json();
          if (r.ok) {
            router.push("/");
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
        />
        {errors?.password ? (
          <div className="text-red-400 text-sm">{errors.password}</div>
        ) : null}

        <button
          type="submit"
          className="border-[1px] border-blue-500 p-4 rounded"
          disabled={loading}
        >
          {loading ? "Processing..." : "Sign In"}
        </button>
        {errors?.form ? (
          <div className="text-red-400 text-sm">{errors.form}</div>
        ) : null}
      </form>
    </div>
  );
}
