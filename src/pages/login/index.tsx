import LoginForm from "@/components/login/LoginForm";
import Head from "next/head";

export default function Login() {
  return (
    <>
      <Head>
        <title>Fitnologym - Login</title>
        <meta name="description" content="Login" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <LoginForm />
      </main>
    </>
  );
}