import { validateRequest } from "@/lib/auth";
import { useRouter } from "next/router";

import type {
  GetServerSidePropsContext,
  GetServerSidePropsResult,
  InferGetServerSidePropsType,
} from "next";
import type { User } from "lucia";
import { appUrls } from "@/lib/appUrls";

export async function getServerSideProps(
  context: GetServerSidePropsContext
): Promise<
  GetServerSidePropsResult<{
    user: User;
  }>
> {
  const { user } = await validateRequest(context.req, context.res);

  if (!user) {
    return {
      redirect: {
        permanent: false,
        destination: appUrls.auth.login,
      },
    };
  }

  if (user.role === "administrator")
    return {
      redirect: {
        permanent: false,
        destination: appUrls.admin,
      },
    };

  if (user.role === "user")
    return {
      redirect: {
        permanent: false,
        destination: appUrls.user.my_profile,
      },
    };

  return {
    props: {
      user,
    },
  };
}

export default function Page({}: InferGetServerSidePropsType<
  typeof getServerSideProps
>) {
  return <></>;
}
