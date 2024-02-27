import { UserCard } from "@/components/ui/cards/user-card/user-card";
import Head from "next/head";

export default function Login() {
  return (
    <>
      <Head>
        <title>Fitnologym - Components</title>
        <meta name="description" content="Login" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <UserCard
          title="LeanBeefPatty"
          subtitle="ENBOX Fitness"
          description="Se unió el Martes 2, Feb 2024"
        />
      </main>
    </>
  );
}
