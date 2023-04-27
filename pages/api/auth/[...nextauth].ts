import NextAuth from "next-auth";
import { authOptions } from "~/utils/session/authOptions";

export default NextAuth(authOptions);
