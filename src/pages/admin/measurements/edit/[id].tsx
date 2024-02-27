import { validateRequest } from "@/lib/auth";
import { useRouter } from "next/router";

import type {
	GetServerSidePropsContext,
	GetServerSidePropsResult,
	InferGetServerSidePropsType
} from "next";
import type { User } from "lucia";
import type { FormEvent } from "react";
import { API_URL_V1, apiUrls } from "@/lib/apiUrls";

export async function getServerSideProps(context: GetServerSidePropsContext): Promise<
	GetServerSidePropsResult<{
		user: User;
    id: number;
	}>
> {
  console.log(context.req.cookies);
  const { id } = context.params;
  console.log('Editar la Medida con ID:', id);
	const { user } = await validateRequest(context.req, context.res);
	console.log(user);
	if (!user || !id) {
		return {
			redirect: {
				permanent: false,
				destination: "/login"
			}
		};
	}
  if (user.role !== 'administrator') {
		console.log('NO PUEDES ESTAR AQUI!!!');
		return {
			redirect: {
				permanent: false,
				destination: "/"
			}
		};
	}
	return {
		props: {
			user,
      id,
		}
	};
}

export default function Page({ user, id }: InferGetServerSidePropsType<typeof getServerSideProps>) {

	return (
		<>
			<h1>You want the measure: {id}</h1>
			<p>Your user ID is {user.id}.</p>
			<p>You are a {user.role} user.</p>
		</>
	);
}