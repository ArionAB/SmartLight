
import { redirect } from "next/navigation";
import { useAppDispatch } from "@/utils/Store/hooks";
import { useEffect, useState } from "react";
import supabase from "@/utils/supabase/createClient";
import { Box, Button, Card, Container, TextField } from "@mui/material";
import Image from "next/image";
import { addAppNotification } from "@/utils/Store/Slices/appNotificationSlice";
// import { useRouter } from "next/router";
import { useRouter } from "next/navigation";
import Auth from "@/components/Auth/Auth";

const Login = () => {

    return (

        <Container>
            <Auth />
        </Container>

    );
}

export default Login