const authConfig = {
	nanoRounds: Number(process.env.NANOROUNDS) || 5,
	saltRounds: Number(process.env.SALT_ROUNDS) || 12,
	jwtExpires: Number(process.env.JWTEXPIRES) || 86400 * 7,
	jwtExpiresString: process.env.JWTEXPIRESSTRING || '7d',
};

export default authConfig;

