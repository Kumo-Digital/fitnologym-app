import AuthLayout from "@/components/layouts/auth-layout";
import { RootLayout } from "@/components/layouts/root-layout";
import { NextPageWithLayout } from "@/pages/_app";

export const withRootLayout = (Page: NextPageWithLayout) => {
  return (Page.getLayout = (page) => {
    return <RootLayout>{page}</RootLayout>;
  });
};

export const withAuthLayout = (Page: NextPageWithLayout) => {
  return (Page.getLayout = (page) => {
    return <AuthLayout>{page}</AuthLayout>;
  });
};
