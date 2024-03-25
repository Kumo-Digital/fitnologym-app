import { validateRequest } from "@/lib/auth";
import type { GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import MeasurementForm from "@/components/admin/measurement-form";
import { withRootLayout } from "@/utils/layouts";
import { NextPageWithLayout } from "@/pages/_app";
import { useUniqueMeasure } from "@/hooks/measurements";
import { useRouter } from "next/router";
import { User } from "lucia";
import { useUniqueUser } from "@/hooks/users";

export async function getServerSideProps(context: GetServerSidePropsContext): Promise<GetServerSidePropsResult<{
  user: User;
}>> {
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
  return {
    props: {
      user,
    },
  };
}

const Page: NextPageWithLayout = () => {
  const { query } = useRouter();
  const { measurement, isLoading: isLoadingMeasure } = useUniqueMeasure(query.id as string);
  const { user, isLoading: isLoadingUser } = useUniqueUser({id: measurement?.user_id});

  if (isLoadingMeasure || isLoadingUser) {
    return "La wea fome";
    // TODO: Add Skeleton to isLoading MeasurementForm
  }
  return (
    <MeasurementForm users={user} measurement={measurement} />
  );
};

withRootLayout(Page);
export default Page;
