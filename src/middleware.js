import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { authKey } from "./constant";

const Protected = [
  "/dashboard",
  "/deposite",
  "/my-properties",
  "/my-favorite-properties",
  "/payment-log",
  "/profile-settings",
  "/subscription-plan",
  "/support-ticket",
  "/wallet",
  "/chats",
  "/add-property",
  "/update-property",
];

const Public = ["/login", "/signup"];

export function middleware(request) {
  const token = cookies().get(authKey)?.value;
  const { pathname } = request.nextUrl;

  if (!token && Protected.includes(pathname)) {
    return NextResponse.redirect(new URL("/login", request.url));
  } else if (token && Public.includes(pathname)) {
    return NextResponse.redirect(new URL("/", request.url));
  } else {
    return NextResponse.next();
  }
}

export const config = {
  matcher: [
    "/login",
    "/signup",
    "/add-property",
    "/update-property",
    "/chats",
    "/chats/:path",
    "/dashboard",
    "/deposite",
    "/deposite:path*",
    "/my-properties",
    "/my-favorite-properties",
    "/payment-log",
    "/profile-settings",
    "/subscription-plan",
    "/support-ticket",
    "/wallet",
  ],
};
