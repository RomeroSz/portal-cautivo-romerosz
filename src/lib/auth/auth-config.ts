const authConfig = {
	nanoRounds: Number(process.env.NEXT_PUBLIC_NANOROUNDS) || 5,
	saltRounds: Number(process.env.SALT_ROUNDS) || 12,
	jwtExpires: Number(process.env.NEXT_PUBLIC_JWTEXPIRES) || 86400 * 7,
	jwtExpiresString: process.env.NEXT_PUBLIC_JWTEXPIRESSTRING || '7d',
};

export default authConfig;

