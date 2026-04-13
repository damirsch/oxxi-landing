import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin({
	requestConfig: "./src/i18n/request.ts",
	experimental: {
		createMessagesDeclaration: "./messages/en.json",
	},
});

const nextConfig: NextConfig = {
	reactStrictMode: false,
};

export default withNextIntl(nextConfig);
