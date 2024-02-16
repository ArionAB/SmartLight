'use client'

import { selectCurrentUser } from "@/utils/Store/Selectors/usersSelectors";
import { useAppSelector } from "@/utils/Store/hooks";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function withAuth(WrappedComponent: any, adminOnly: boolean) {
    return function WithAuth(props: any) {
        const currentUser = useAppSelector(selectCurrentUser);
        const router = useRouter();

        useEffect(() => {
            if (adminOnly && currentUser?.role_type !== 'Admin') {
                // router.push("/");
            }
            if (!adminOnly && !currentUser) {
                router.push("/login");
            } else return;
            //eslint-disable-next-line
        }, [currentUser, router]);

        // if (adminOnly && currentUser?.role_type === 'Admin') {
        //     return <p>Loading...</p>;
        // }
        // if (!adminOnly && currentUser?.role_type !== 'User') {
        //     return <p>Loading...</p>;
        // }

        return <WrappedComponent {...props} />;
    };
}
