import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials"

export const options: NextAuthOptions = {
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
                    // Return the user data that should be stored in the token
                    return {
                        id: user.user?._id || user.user?.id,
                        email: credentials?.email,
                        name: user.user?.name,
                        ...user
                    }
                }
                return null
            }
        })
    ],

    session: {
        strategy: "jwt",
        maxAge: 30 * 24 * 60 * 60, 
    },

    pages: {
        signIn: '/login'
    },

    callbacks: {
        async jwt({ token, user }) {
            // Add user data to token on initial sign in
            if (user) {
                token.user = user;
            }
            return token;
        },
        
        async session({ session, token }) {
            // Send user data to client
            session.user = token.user as any;
            return session;
        },
        
        async redirect({ url, baseUrl }) {
            // Redirect to home page after login
            return baseUrl + "/";
        }
    },

    secret: process.env.NEXTAUTH_SECRET 
}

const handler = NextAuth(options);
export { handler as GET, handler as POST };