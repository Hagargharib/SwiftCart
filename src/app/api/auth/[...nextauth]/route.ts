import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials"


export const options: NextAuthOptions = {

    // providers credentials
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: { label: "email", type: "text" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {

                const res = await fetch("https://ecommerce.routemisr.com/api/v1/auth/signin", {
                    method: 'POST',
                    body: JSON.stringify({
                        email: credentials?.email,
                        password: credentials?.password
                    }),
                    headers: { "Content-Type": "application/json" }
                })
                const user = await res.json()

                if (res.ok && user) {
                    return user
                }
                return null
            }
        })
    ],

    // srategy JWT session
    session: {
        strategy: "jwt"
    },

    // pages login
    pages: {
        signIn: '/login'
    },

    // callbacks
    callbacks: {
        async session({ session, token, user }) {
            return { ...session, ...token, ...user }
        },
        async jwt({ token, user }) {
            return { ...token, ...user }
        }
    },

    // encrytion
    secret: process.env.AUTH_SECRET
}

const handler = NextAuth(options);
export { handler as GET, handler as POST }