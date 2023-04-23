"use client";

import classNames from "classnames";
import Link from "next/link";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

export default function ShopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="p-6 border-lime-400 border-dotted relative border-2">
      <div className="absolute left-1 top-1 text-lime-400">shop layout</div>
      <div className="py-2 flex gap-2">
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
          href="/admin"
          className={classNames({
            ["text-gray-800"]: pathname === "/admin",
            ["text-blue-500"]: pathname !== "/admin",
          })}
        >
          Admin
        </Link>
      </div>
      {children}
    </div>
  );
}
