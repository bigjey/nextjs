"use client";

import { useRef, useState } from "react";

export default function LoginPage() {
  const [loginMessage, setLoginMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const loginInputRef = useRef<HTMLInputElement | null>(null);

  return (
    <>
      <div className="flex flex-col p-4 gap-2 max-w-xl">
        <div className="text-2xl">Login Form</div>
        <div className="flex flex-col gap-1">
          <input
            type="text"
            ref={loginInputRef}
            placeholder="Login"
            className="border-[1px] rounded p-2 border-slate-400"
            autoFocus
          />
          <div className="text-gray-400 text-sm">try admin</div>
        </div>
        <button
          className="border-[1px] border-blue-500 p-4 rounded"
          disabled={loading}
          onClick={async () => {
            setLoading(true);
            setLoginMessage("");

            const r = await fetch("/api/auth/login", {
              method: "post",
              headers: {
                "content-type": "application/json",
              },
              body: JSON.stringify({ login: loginInputRef.current?.value }),
            });
            const d = await r.json();
            setLoginMessage(JSON.stringify(d));
            setLoading(false);
          }}
        >
          {loading ? "Processing..." : "Log In"}
        </button>
        {loginMessage ? loginMessage : null}
      </div>
    </>
  );
}
