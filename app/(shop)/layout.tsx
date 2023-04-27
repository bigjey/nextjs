"use client";

import classNames from "classnames";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";

export default function ShopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const session = useSession();

  return (
    <div className="p-6 border-lime-400 border-dotted relative border-2">
      <div className="absolute left-1 top-1 text-lime-400">shop layout</div>
      {session.status === "loading" ? (
        <>Loading...</>
      ) : (
        <>
          <div className="py-2 flex gap-2 align-middle">
            <Link
              href="/"
              className={classNames({
                ["text-gray-800"]: pathname === "/",
                ["text-blue-500"]: pathname !== "/",
              })}
            >
              Home
            </Link>
            <Link
              href="/catalog"
              className={classNames({
                ["text-gray-800"]: pathname === "/catalog",
                ["text-blue-500"]: pathname !== "/catalog",
              })}
            >
              Catalog
            </Link>

            <div className="ml-auto flex gap-2 align-middle">
              {session.status === "authenticated" ? (
                <div className="flex gap-1 align-middle">
                  {session.data.user?.image ? (
                    <div>
                      <img
                        src={session.data.user.image}
                        className="w-[24px] h-[24px]"
                      />
                    </div>
                  ) : null}
                  <button
                    onClick={async () => {
                      const result = await signOut({ redirect: false });
                      console.log(result);
                    }}
                  >
                    Log Out{" "}
                    {session.data.user?.name ? (
                      <>({session.data.user?.name})</>
                    ) : null}
                  </button>
                </div>
              ) : (
                <>
                  <Link
                    href="/login"
                    className={classNames({
                      ["text-gray-800"]: pathname === "/login",
                      ["text-blue-500"]: pathname !== "/login",
                    })}
                  >
                    Sign In
                  </Link>
                  <Link
                    href="/register"
                    className={classNames({
                      ["text-gray-800"]: pathname === "/register",
                      ["text-blue-500"]: pathname !== "/register",
                    })}
                  >
                    Sign Up
                  </Link>
                </>
              )}
              <Link
                href="/admin"
                className={classNames({
                  ["text-gray-800"]: pathname === "/admin",
                  ["text-blue-500"]: pathname !== "/admin",
                })}
              >
                Admin
              </Link>
            </div>
          </div>
          {children}
        </>
      )}
    </div>
  );
}
