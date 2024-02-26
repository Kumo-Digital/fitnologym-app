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
	}>
> {
  console.log(context.req.cookies);
	const { user } = await validateRequest(context.req, context.res);
	console.log(user);
	if (!user) {
		return {
			redirect: {
				permanent: false,
				destination: "/login"
			}
		};
	}
	return {
		props: {
			user
		}
	};
}

export default function Page({ user }: InferGetServerSidePropsType<typeof getServerSideProps>) {
	const router = useRouter();

	async function onSubmit(e: FormEvent<HTMLFormElement>) {
		e.preventDefault();
		const formElement = e.target as HTMLFormElement;
		await fetch(formElement.action, {
			method: formElement.method
		});
		router.push("/login");
	}

	return (
		<>
			<h1>Hi, {user.fullname}!</h1>
			<p>Your user ID is {user.id}.</p>
			<p>You are a {user.user_type} user.</p>
			<form method="post" action={`./${API_URL_V1}${apiUrls.auth.logout}`} onSubmit={onSubmit}>
				<button>Sign out</button>
			</form>
		</>
	);
}