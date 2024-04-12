import { validateRequest } from "@/lib/auth";
import type { GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import MeasurementForm from "@/components/admin/measurement-form";
import connectDB from "@/lib/db";
import UserService from "@/db/services/user";
import { UserItem } from "@/types/user";
import { withRootLayout } from "@/utils/layouts";
import { NextPageWithLayout } from "@/pages/_app";
import { useRouter } from "next/router";
import { useUniqueUser } from "@/hooks/users";
import MeasurementFormSkeleton from "../measurement-form-skeleton";
import Head from "next/head";

export async function getServerSideProps(
  context: GetServerSidePropsContext
): Promise<
  GetServerSidePropsResult<{
    allUsers: UserItem[];
  }>
> {
  const { user } = await validateRequest(context.req, context.res);
  if (!user) {
    return {
      redirect: {
        permanent: false,
        destination: "/login",
      },
    };
  }
  if (user.role !== "administrator") {
    return {
      redirect: {
        permanent: false,
        destination: "/",
      },
    };
  }

  await connectDB();
  const userService = new UserService();
  const users = await userService.getAllUsersButAdmins();
  const allUsers = users.map((user) => {
    return {
      value: user._id,
      label: user.fullname,
    };
  });

  return {
    props: {
      allUsers,
    },
  };
}

const Page: NextPageWithLayout<{ allUsers: UserItem[] }> = ({ allUsers }) => {
  const { query } = useRouter();

  const { user, isLoading: isLoadingUser } = useUniqueUser({
      id: query.userId as string
    });
  if (isLoadingUser) return <MeasurementFormSkeleton />;
  return (
    <>
      <Head>
          <title>Fitnologym App | Agregar nueva Medida</title>
      </Head>
      <MeasurementForm user={user || undefined} users={allUsers} />
    </>
  );
};

withRootLayout(Page);
export default Page;
