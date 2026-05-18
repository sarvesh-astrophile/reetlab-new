import { Toaster } from "@reetlab-new/ui/components/sonner";
import {
	createRootRouteWithContext,
	HeadContent,
	Outlet,
	Scripts,
} from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

import NavBar from "../components/header";

import appCss from "../index.css?url";

export type RouterAppContext = {};

export const Route = createRootRouteWithContext<RouterAppContext>()({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1",
			},
			{
				title: "ReetLab — Conversion Design for Solo Founders & Small Teams",
			},
			{
				name: "description",
				content:
					"ReetLab is a conversion design studio. We design landing pages, marketplace listings, and onboarding flows that turn browsers into buyers. Fixed-price, no subscriptions.",
			},
			{ name: "author", content: "ReetLab" },
			{ name: "robots", content: "index, follow" },
			{ property: "og:type", content: "website" },
			{
				property: "og:title",
				content: "ReetLab — Conversion Design for Solo Founders & Small Teams",
			},
			{
				property: "og:description",
				content:
					"Landing pages, marketplace listings, and onboarding flows that turn browsers into buyers. Fixed-price, no subscriptions.",
			},
			{ property: "og:site_name", content: "ReetLab" },
			{ property: "og:locale", content: "en_US" },
			{ name: "twitter:card", content: "summary_large_image" },
			{
				name: "twitter:title",
				content: "ReetLab — Conversion Design Studio",
			},
			{
				name: "twitter:description",
				content:
					"Landing pages, marketplace listings, and onboarding flows that turn browsers into buyers.",
			},
		],
		links: [
			{ rel: "stylesheet", href: appCss },
			{ rel: "canonical", href: "https://reetlab.com" },
		],
	}),

	component: RootDocument,
});

function RootDocument() {
	return (
		<html lang="en" className="dark" suppressHydrationWarning>
			<head>
				<HeadContent />
			</head>
			<body>
				<div className="grid min-h-svh grid-rows-[auto_1fr]">
					<NavBar />
					<main>
						<Outlet />
					</main>
					<Toaster richColors />
					<TanStackRouterDevtools position="bottom-left" />
					<Scripts />
				</div>
			</body>
		</html>
	);
}
