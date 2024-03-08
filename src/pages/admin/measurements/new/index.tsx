import { validateRequest } from "@/lib/auth";
import type {
	GetServerSidePropsContext,
	GetServerSidePropsResult,
	InferGetServerSidePropsType
} from "next";
import type { User } from "lucia";
import MeasurementForm from "@/components/admin/measurement-form";
import connectDB from "@/lib/db";
import UserService from "@/db/services/user";
import { UserItem } from "@/types/user";

export async function getServerSideProps(context: GetServerSidePropsContext): Promise<
	GetServerSidePropsResult<{
		allUsers: UserItem[];
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
	if (user.role !== 'administrator') {
		console.log('NO PUEDES ESTAR AQUI!!!');
		return {
			redirect: {
				permanent: false,
				destination: "/"
			}
		};
	}

	await connectDB();
	const userService = new UserService();
	const users = await userService.getAllUsersButAdmins();
	const allUsers = users.map((user) => {
		return {
			value: user._id,
			label: user.fullname,
		}
	});
	
	return {
		props: {
			allUsers,
		}
	};
}

export default function Page({ allUsers }: InferGetServerSidePropsType<typeof getServerSideProps>) {

	return (
		<>
			<MeasurementForm users={allUsers} />
		</>
	);
}