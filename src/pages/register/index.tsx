import RegisterForm from "@/components/register/RegisterForm";
import Head from "next/head";

export default function Register() {
    return (
        <>
        <Head>
            <title>Fitnologym - Registro</title>
            <meta name="description" content="Login" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link rel="icon" href="/favicon.ico" />
        </Head>
        <main>
            <RegisterForm />
        </main>
        </>
    );
}