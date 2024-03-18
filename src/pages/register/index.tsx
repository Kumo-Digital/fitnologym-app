import RegisterForm from "@/components/register/RegisterForm";
import { withAuthLayout } from "@/utils/layouts";
import Head from "next/head";

function Register() {
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

withAuthLayout(Register);
export default Register;
