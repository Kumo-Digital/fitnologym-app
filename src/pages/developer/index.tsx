import { MeasureCard } from "@/components/ui/card/measure-card/measure-card";
import GymModal from "@/components/ui/modal/gym-modal/gym-modal";
import UserModal from "@/components/ui/modal/user-modal/user-modal";
import WelcomeModal from "@/components/ui/modal/welcome-modal/welcome-modal";
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
        <UserModal />
        <GymModal />
        <WelcomeModal />

        <MeasureCard
          percent={10}
          color="orange.6"
          measureTitle="Indice de Masa Corporal"
          measure={23.5}
          measureType="BMI"
          percentTitle="Evolución"
          percentText={2.3}
        />
      </main>
    </>
  );
}
