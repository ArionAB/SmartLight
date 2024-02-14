'use client'

import Link from "next/link";
import { headers, cookies } from "next/headers";
import { redirect, usePathname } from "next/navigation";
import { useAppDispatch } from "@/utils/Store/hooks";
import { useEffect } from "react";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/router";

export default function Login({
    searchParams,
}: {
    searchParams: { message: string };
}) {
    const dispatch = useAppDispatch()

    useEffect(() => {
        const currentUser = async () => {
            const supabase = createClient()
            const {
                data: { user },
            } = await supabase.auth.getUser()
            if (user) {
                console.log(user)
                // setUser(user)
                // dispatch(setCurrentUser(user))
                // dispatch(getProfile(user.id))
                // dispatch(getCartItems(user.id))
            }
        }

        currentUser()
    }, [])


    // const router = useRouter()
    // const pathname = usePathname()
    // const supabase = createClient()
    const signIn = async (formData: FormData) => {


        const email = formData.get('email') as string
        const password = formData.get('password') as string
        const supabase = createClient()

        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        })
        // router.refresh()
        if (error) {
            return redirect('/login?message=Could not authenticate user')
        }
    }


    return (
        <div className="flex-1 flex flex-col w-full px-8 sm:max-w-md justify-center gap-2">
            <Link
                href="/"
                className="absolute left-8 top-8 py-2 px-4 rounded-md no-underline text-foreground bg-btn-background hover:bg-btn-background-hover flex items-center group text-sm"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1"
                >
                    <polyline points="15 18 9 12 15 6" />
                </svg>{" "}
                Back
            </Link>

            <form
                className="animate-in flex-1 flex flex-col w-full justify-center gap-2 text-foreground"
                action={signIn}
            >
                <label className="text-md" htmlFor="email">
                    Email
                </label>
                <input
                    className="rounded-md px-4 py-2 bg-inherit border mb-6"
                    name="email"
                    placeholder="you@example.com"
                    required
                />
                <label className="text-md" htmlFor="password">
                    Password
                </label>
                <input
                    className="rounded-md px-4 py-2 bg-inherit border mb-6"
                    type="password"
                    name="password"
                    placeholder="••••••••"
                    required
                />
                <button className="bg-green-700 rounded-md px-4 py-2 text-foreground mb-2">
                    Sign In
                </button>
                {searchParams?.message && (
                    <p className="mt-4 p-4 bg-foreground/10 text-foreground text-center">
                        {searchParams.message}
                    </p>
                )}
            </form>
        </div>
    );
}
