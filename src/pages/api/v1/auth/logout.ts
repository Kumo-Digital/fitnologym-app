import { lucia, validateRequest } from "@/lib/auth";

import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	if (req.method !== "POST") {
		res.status(404).end();
		return;
	}
	const { session } = await validateRequest(req, res);
	console.log('Estoy por hacer log out...');
	console.log(session);
	if (!session) {
		res.status(401).end();
		return;
	}
	await lucia.invalidateSession(session.id);
	res.setHeader("Set-Cookie", lucia.createBlankSessionCookie().serialize()).status(200).end();
}