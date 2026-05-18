import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const html = String.raw;

const noisePattern = `url("data:image/svg+xml;charset=utf-8,${encodeURIComponent(
	html`
		<svg xmlns="http://www.w3.org/2000/svg" width="250" height="250" viewBox="0 0 100 100">
			<filter id="n">
				<feTurbulence type="turbulence" baseFrequency="1.4" numOctaves="1" seed="2" stitchTiles="stitch" result="n" />
				<feComponentTransfer result="g">
					<feFuncR type="linear" slope="4" intercept="1" />
					<feFuncG type="linear" slope="4" intercept="1" />
					<feFuncB type="linear" slope="4" intercept="1" />
				</feComponentTransfer>
				<feColorMatrix type="saturate" values="0" in="g" />
			</filter>
			<rect width="100%" height="100%" filter="url(#n)" />
		</svg>
	`.replace(/\s+/g, " "),
)}")`;

const container = {
	hidden: { opacity: 0 },
	show: {
		opacity: 1,
		transition: { staggerChildren: 0.15, delayChildren: 0.2 },
	},
};

const fadeUp = {
	hidden: { opacity: 0, y: 24 },
	show: {
		opacity: 1,
		y: 0,
		transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
	},
};

export const Route = createFileRoute("/")({
	component: HomeComponent,
});

function HomeComponent() {
	const problems = [
		{
			bold: "Your landing page gets traffic",
			text: "but you have no idea what's stopping people from buying",
		},
		{
			bold: "Your marketplace listing exists",
			text: "but reads like an afterthought next to category leaders",
		},
		{
			bold: "People start your trial",
			text: "and ghost you within 48 hours — and you never find out why",
		},
	];

	const [pricingTab, setPricingTab] = useState("Landing Page");

	const pricing = {
		"Landing Page": {
			title: "Landing Page",
			subtitle: "Revamp",
			description:
				"Redesigning your landing page to be more conversion-friendly, visually engaging, and built around customer objections.",
			price: "$299",
			delivery: "15-20 Days",
			deliverables: [
				"Custom layout & copywriting document",
				"Desktop, tablet, mobile responsive",
				"Figma file with all components (Optional)",
				"Unlimited revisions",
				"Updates every 48 hours",
			],
			addons: [
				{ label: "Add Development", price: "+$199" },
				{ label: "Animations", price: "+$99/page" },
				{
					label: "Conversion Tracking + Monthly Reports (3 Months)",
					price: "+$399",
				},
			],
		},
		"Marketplace Listing": {
			title: "Marketplace Listing",
			subtitle: "Revamp",
			description:
				"Rebuilding your marketplace listing to stand out, build trust, and compete with category leaders.",
			price: "$349",
			delivery: "15-20 Days",
			deliverables: [
				"Custom listing layout & design",
				"Screenshot redesign",
				"Copy rewrite for all sections",
				"Figma file with all assets (Optional)",
				"A/B test variant included",
			],
			addons: [
				{ label: "Simple Branding", price: "+$199" },
				{ label: "Video Preview", price: "+$299" },
				{
					label: "Conversion Tracking + Monthly Reports (3 Months)",
					price: "+$399",
				},
			],
		},
		"Onboarding Audit": {
			title: "Onboarding",
			subtitle: "Audit & Fix",
			description:
				"Mapping your first-run experience, finding where users drop off, and redesigning the flow to boost activation.",
			price: "$499",
			delivery: "15-20 Days",
			deliverables: [
				"Full onboarding audit report",
				"User flow mapping & analysis",
				"Redesigned flow in Figma",
				"In-app copy & microcopy",
				"Activation metrics tracked",
			],
			addons: [],
		},
		Branding: {
			title: "Branding",
			subtitle: "Identity",
			description:
				"Building a complete brand identity from scratch, including logo, typography, color system, and a ready-to-use brand kit.",
			price: "$599",
			delivery: "15-20 Days",
			deliverables: [
				"Logo, typography & color palette",
				"Brand assets & illustrations",
				"Social media templates",
				"Comprehensive brand guidelines",
				"5 full brand explorations",
				"Ready-to-use brand kit",
			],
			addons: [],
		},
	};

	const active = pricing[pricingTab];

	const [selectedAddons, setSelectedAddons] = useState<
		Record<string, Record<string, boolean>>
	>({});

	const toggleAddon = (service: string, addonLabel: string) => {
		setSelectedAddons((prev) => ({
			...prev,
			[service]: {
				...prev[service],
				[addonLabel]: !prev[service]?.[addonLabel],
			},
		}));
	};

	const parsePrice = (price: string) =>
		Number.parseInt(price.replace(/[^0-9,]/g, "").replace(",", ""), 10);

	const calculateTotal = (service: string) => {
		const base = parsePrice(pricing[service]?.price ?? "0");
		const addonsTotal = (pricing[service]?.addons ?? []).reduce(
			(sum, addon) => {
				if (selectedAddons[service]?.[addon.label])
					return sum + parsePrice(addon.price);
				return sum;
			},
			0,
		);
		return base + addonsTotal;
	};

	const formatPrice = (n: number) => `$${n.toLocaleString("en-US")}`;

	useEffect(() => {
		const script = document.createElement("script");
		script.src = "https://platform.twitter.com/widgets.js";
		script.async = true;
		document.body.appendChild(script);
		return () => {
			document.body.removeChild(script);
		};
	}, []);

	return (
		<>
			<motion.section
				variants={container}
				initial="hidden"
				animate="show"
				className="relative flex flex-col items-center justify-center overflow-hidden bg-[#EFE7E5]/70 px-4 py-16 text-center backdrop-blur-sm sm:px-6 md:py-32"
			>
				<div
					className="pointer-events-none absolute inset-0 mix-blend-overlay"
					style={{
						backgroundPosition: "center",
						backgroundImage: noisePattern,
					}}
				/>
				<div className="pointer-events-none absolute -bottom-48 -left-48 h-[600px] w-[600px] rounded-full bg-[radial-gradient(circle,_#FFB26A_0%,_transparent_70%)]" />
				<motion.h1
					variants={fadeUp}
					className="relative z-10 font-medium font-serif text-5xl text-foreground leading-tight tracking-tight sm:text-6xl xl:text-7xl"
				>
					Your site isn&apos;t converting.
					<br />
					Let&apos;s fix that.
				</motion.h1>
				<motion.p
					variants={fadeUp}
					className="relative z-10 mt-6 max-w-2xl text-base/7 text-muted-foreground md:text-lg/8"
				>
					ReetLab is a conversion design studio for solo founders and small
					teams. We design landing pages, marketplace listings, and onboarding
					flows that turn browsers into buyers.
				</motion.p>
				<motion.div
					variants={fadeUp}
					className="relative z-10 mt-10 flex flex-col items-center gap-3 sm:flex-row sm:gap-4"
				>
					<a
						href="https://wa.me/+917424904259"
						target="_blank"
						rel="noopener noreferrer"
						className="inline-flex items-center gap-2 rounded-full bg-primary py-3 pr-4 pl-5 font-normal text-base text-primary-foreground transition-opacity hover:opacity-90"
					>
						Let&apos;s Talk
						<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
							<path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
						</svg>
					</a>
					<Link
						to="/results"
						className="inline-flex items-center gap-2 rounded-full px-6 py-3 font-normal text-base text-foreground transition-colors hover:bg-muted"
					>
						Check our work
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							strokeWidth={1.5}
							stroke="currentColor"
							className="size-5"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3"
							/>
						</svg>
					</Link>
				</motion.div>
				<motion.div
					variants={fadeUp}
					className="relative z-10 mt-14 w-full max-w-xl"
				>
					<div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
						{[
							"Acctual",
							"Cap",
							"Steel",
							"Melrose",
							"Sonatic",
							"OrangeChain",
						].map((name) => (
							<span
								key={name}
								className="font-semibold text-foreground/50 text-sm tracking-wide"
							>
								{name}
							</span>
						))}
					</div>
				</motion.div>
			</motion.section>

			<section className="border-neutral-200 border-t bg-background px-4 py-16 sm:px-6 md:py-24">
				<div className="mx-auto max-w-3xl">
					<span className="font-medium text-primary text-sm uppercase tracking-wider">
						The problem
					</span>
					<h3 className="mt-4 text-pretty font-serif text-4xl text-foreground leading-snug tracking-tight sm:text-5xl">
						You're losing customers right now and you don't even know why
					</h3>
					<ul className="mt-12 flex list-none flex-col gap-6 pl-0">
						{problems.map(({ bold, text }) => (
							<li key={bold} className="flex items-start gap-3 lg:gap-5">
								<div className="relative mt-0.5 w-8 shrink-0">
									<svg
										className="size-7 text-destructive"
										viewBox="0 0 24 24"
										fill="currentColor"
									>
										<path
											fillRule="evenodd"
											d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-1.72 6.97a.75.75 0 10-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 101.06 1.06L12 13.06l1.72 1.72a.75.75 0 101.06-1.06L13.06 12l1.72-1.72a.75.75 0 10-1.06-1.06L12 10.94l-1.72-1.72z"
											clipRule="evenodd"
										/>
									</svg>
								</div>
								<p className="text-pretty text-foreground text-lg leading-relaxed sm:text-xl">
									<strong>
										<span
											className="lr-highlight"
											style={{ backgroundColor: "#ffe5e5" }}
										>
											{bold}
										</span>
									</strong>{" "}
									{text}
								</p>
							</li>
						))}
					</ul>
					<div className="mt-8">
						<p className="text-pretty text-foreground text-lg leading-relaxed sm:text-xl">
							Meanwhile, competitors with worse products are{" "}
							<strong>
								<span
									className="lr-highlight"
									style={{ backgroundColor: "#ffe5e5" }}
								>
									quietly optimizing every pixel for conversion
								</span>
							</strong>
							. &#9785;&#65039;
						</p>
					</div>
				</div>
			</section>

			<section id="how-we-help" className="px-0 py-16 sm:px-6 md:py-24">
				<div className="mx-auto max-w-5xl bg-white p-6 sm:p-8 md:p-12">
					<span className="font-medium text-primary text-sm uppercase tracking-wider">
						How we help
					</span>
					<h3 className="mt-4 text-pretty font-serif text-4xl text-foreground leading-snug tracking-tight sm:text-5xl">
						Every customer you&apos;re losing has a reason. We fix three.
					</h3>

					<div className="mt-14 grid gap-8 lg:grid-cols-3">
						<div className="border border-border bg-muted/30 p-6">
							<div className="mb-4 flex size-10 items-center justify-center rounded-lg bg-primary text-primary-foreground">
								<svg
									width="20"
									height="20"
									viewBox="0 0 24 24"
									fill="currentColor"
								>
									<path d="M5.566 4.657A4.505 4.505 0 0 1 6.75 4.5h10.5c.41 0 .806.055 1.183.157A3 3 0 0 0 15.75 3h-7.5a3 3 0 0 0-2.684 1.657ZM2.25 12a3 3 0 0 1 3-3h13.5a3 3 0 0 1 3 3v6a3 3 0 0 1-3 3H5.25a3 3 0 0 1-3-3v-6ZM5.25 7.5c-.41 0-.806.055-1.184.157A3 3 0 0 1 6.75 6h10.5a3 3 0 0 1 2.683 1.657A4.505 4.505 0 0 0 18.75 7.5H5.25Z" />
								</svg>
							</div>
							<h4 className="font-semibold text-foreground text-xl">
								Landing Pages
							</h4>
							<p className="mt-3 text-base/relaxed text-muted-foreground">
								We rewrite and redesign around the objections that make people
								bounce.
							</p>
						</div>

						<div className="border border-border bg-muted/30 p-6">
							<div className="mb-4 flex size-10 items-center justify-center rounded-lg bg-primary text-primary-foreground">
								<svg
									width="20"
									height="20"
									viewBox="0 0 24 24"
									fill="currentColor"
								>
									<path d="M5.223 2.25c-.497 0-.974.198-1.325.55l-1.3 1.298A3.75 3.75 0 0 0 7.5 9.75c.627.47 1.406.75 2.25.75.844 0 1.624-.28 2.25-.75.626.47 1.406.75 2.25.75.844 0 1.623-.28 2.25-.75a3.75 3.75 0 0 0 4.902-5.652l-1.3-1.299a1.875 1.875 0 0 0-1.325-.549H5.223Z" />
									<path
										fillRule="evenodd"
										d="M3 20.25v-8.755c1.42.674 3.08.673 4.5 0A5.234 5.234 0 0 0 9.75 12c.804 0 1.568-.182 2.25-.506a5.234 5.234 0 0 0 2.25.506c.804 0 1.567-.182 2.25-.506 1.42.674 3.08.675 4.5.001v8.755h.75a.75.75 0 0 1 0 1.5H2.25a.75.75 0 0 1 0-1.5H3Zm3-6a.75.75 0 0 1 .75-.75h3a.75.75 0 0 1 .75.75v3a.75.75 0 0 1-.75.75h-3a.75.75 0 0 1-.75-.75v-3Zm8.25-.75a.75.75 0 0 0-.75.75v5.25c0 .414.336.75.75.75h3a.75.75 0 0 0 .75-.75v-5.25a.75.75 0 0 0-.75-.75h-3Z"
										clipRule="evenodd"
									/>
								</svg>
							</div>
							<h4 className="font-semibold text-foreground text-xl">
								Marketplace Listings
							</h4>
							<p className="mt-3 text-base/relaxed text-muted-foreground">
								We rebuild your listing to steal clicks from the category
								leaders.
							</p>
						</div>

						<div className="border border-border bg-muted/30 p-6">
							<div className="mb-4 flex size-10 items-center justify-center rounded-lg bg-primary text-primary-foreground">
								<svg
									width="20"
									height="20"
									viewBox="0 0 24 24"
									fill="currentColor"
								>
									<path
										fillRule="evenodd"
										d="M17.303 5.197A7.5 7.5 0 0 0 6.697 15.803a.75.75 0 0 1-1.061 1.061A9 9 0 1 1 21 10.5a.75.75 0 0 1-1.5 0c0-1.92-.732-3.839-2.197-5.303Zm-2.121 2.121a4.5 4.5 0 0 0-6.364 6.364.75.75 0 1 1-1.06 1.06A6 6 0 1 1 18 10.5a.75.75 0 0 1-1.5 0c0-1.153-.44-2.303-1.318-3.182Zm-3.634 1.314a.75.75 0 0 1 .82.311l5.228 7.917a.75.75 0 0 1-.777 1.148l-2.097-.43 1.045 3.9a.75.75 0 0 1-1.45.388l-1.044-3.899-1.601 1.42a.75.75 0 0 1-1.247-.606l.569-9.47a.75.75 0 0 1 .554-.68Z"
										clipRule="evenodd"
									/>
								</svg>
							</div>
							<h4 className="font-semibold text-foreground text-xl">
								Onboarding
							</h4>
							<p className="mt-3 text-base/relaxed text-muted-foreground">
								We map the drop-offs and redesign the flow so users activate
								instead of ghosting.
							</p>
						</div>
					</div>

					<div className="mt-12 text-center">
						<a
							href="https://wa.me/+917424904259"
							target="_blank"
							rel="noopener noreferrer"
							className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 font-normal text-base text-primary-foreground transition-opacity hover:opacity-90"
						>
							Let&apos;s fix yours next
							<svg
								width="18"
								height="18"
								viewBox="0 0 24 24"
								fill="currentColor"
							>
								<path
									fillRule="evenodd"
									d="M16.72 7.72a.75.75 0 0 1 1.06 0l3.75 3.75a.75.75 0 0 1 0 1.06l-3.75 3.75a.75.75 0 1 1-1.06-1.06l2.47-2.47H3a.75.75 0 0 1 0-1.5h16.19l-2.47-2.47a.75.75 0 0 1 0-1.06Z"
									clipRule="evenodd"
								/>
							</svg>
						</a>
					</div>
				</div>
			</section>

			<section className="px-4 py-12 sm:px-6 md:py-16">
				<div className="mx-auto max-w-3xl text-center">
					<div className="mb-6 flex items-center justify-center gap-1 text-primary">
						{[...Array(5)].map((_, i) => (
							<svg
								key={i}
								width="20"
								height="20"
								viewBox="0 0 24 24"
								fill="currentColor"
							>
								<path
									fillRule="evenodd"
									d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
									clipRule="evenodd"
								/>
							</svg>
						))}
					</div>
					<blockquote className="text-pretty font-serif text-2xl text-foreground leading-relaxed tracking-normal sm:text-3xl lg:text-4xl">
						"We hired ReetLab to fix our landing page and they ended up finding
						leaks across our entire funnel. They don&apos;t just design —{" "}
						<span
							className="lr-highlight"
							style={{ backgroundColor: "#ffe5e5" }}
						>
							they diagnose
						</span>
						. Every change they made was{" "}
						<span
							className="lr-highlight"
							style={{ backgroundColor: "#ffe5e5" }}
						>
							backed by data
						</span>
						."
					</blockquote>
					<div className="mt-6">
						<p className="font-medium text-base text-foreground">
							Dr. Benubrata Das
						</p>
						<p className="text-muted-foreground text-sm">
							Committee Member, Guha Research Conference
						</p>
					</div>
				</div>
			</section>

			<section className="px-4 py-16 sm:px-6 md:py-24">
				<div className="mx-auto max-w-5xl">
					<span className="font-medium text-primary text-sm uppercase tracking-wider">
						The difference
					</span>
					<div className="mt-4 grid gap-12 lg:grid-cols-2">
						<div>
							<h2 className="text-pretty font-serif text-4xl text-foreground leading-snug tracking-tight sm:text-5xl">
								We track conversion. Others just ship and hope.
							</h2>
							<p className="mt-6 max-w-lg text-lg/relaxed text-muted-foreground">
								Our unfair advantage: we stay until the numbers move. Every
								project includes conversion tracking setup so you know exactly
								what your design investment returned.
							</p>
							<div className="mt-8 flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:gap-4">
								<a
									href="https://wa.me/+917424904259"
									target="_blank"
									rel="noopener noreferrer"
									className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 font-normal text-base text-primary-foreground transition-opacity hover:opacity-90"
								>
									Let&apos;s find what&apos;s leaking
									<svg
										width="18"
										height="18"
										viewBox="0 0 24 24"
										fill="currentColor"
									>
										<path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
									</svg>
								</a>
								<Link
									to="/results"
									className="inline-flex items-center gap-2 rounded-full px-6 py-3 font-normal text-base text-foreground transition-colors hover:bg-muted"
								>
									Read more
									<svg
										width="18"
										height="18"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										strokeWidth={1.5}
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3"
										/>
									</svg>
								</Link>
							</div>
						</div>

						<div className="rounded-lg border border-border bg-[#FBF9FA] p-6">
							<div className="mb-5 flex h-48 items-center justify-center rounded-md border border-border border-dashed bg-muted/30 text-muted-foreground text-sm">
								Screenshot placeholder
							</div>
							<div className="flex items-start justify-between">
								<h4 className="font-semibold text-foreground text-lg">
									Landing Page Redesign
								</h4>
								<span className="font-bold font-serif text-3xl text-primary tracking-wide">
									2x
								</span>
							</div>
							<p className="mt-4 text-base/relaxed text-muted-foreground">
								Redesigned a micro-SaaS homepage focusing on social proof and
								CTA clarity. Conversion rate doubled in 3 weeks.
							</p>
						</div>
					</div>
				</div>
			</section>

			<section id="pricing" className="bg-white px-4 py-16 sm:px-6 md:py-24">
				<div className="mx-auto max-w-4xl">
					<span className="font-medium text-primary text-sm uppercase tracking-wider">
						Pricing
					</span>
					<h2 className="mt-4 text-pretty font-serif text-4xl text-foreground leading-snug tracking-tight sm:text-5xl">
						One service, clear price.
					</h2>

					<div className="mt-6 flex flex-wrap items-center gap-2">
						{Object.keys(pricing).map((tab) => (
							<button
								type="button"
								key={tab}
								onClick={() => setPricingTab(tab)}
								className={
									tab === pricingTab
										? "rounded-full bg-foreground px-4 py-2 font-medium text-background text-sm transition-colors"
										: "rounded-full bg-muted px-4 py-2 font-medium text-muted-foreground text-sm transition-colors hover:bg-muted/70"
								}
							>
								{tab}
							</button>
						))}
					</div>

					<div className="mt-10 grid gap-6 overflow-hidden border border-border bg-white p-2 md:grid-cols-2 md:p-4">
						<div className="flex flex-col gap-4 p-3 md:p-4">
							<div className="flex items-center gap-2.5">
								<h3 className="font-semibold text-2xl text-foreground uppercase tracking-normal">
									{active.title}
								</h3>
								<span className="inline-flex shrink-0 items-center gap-1 rounded-md border border-border px-2.5 py-1 font-medium text-muted-foreground text-xs">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 24 24"
										strokeWidth={1.5}
										stroke="currentColor"
										className="size-3.5"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
										/>
									</svg>
									{active.delivery}
								</span>
							</div>

							<div className="flex flex-col gap-3">
								{active.addons.map((addon) => {
									const isSelected =
										selectedAddons[pricingTab]?.[addon.label] ?? false;
									return (
										<button
											type="button"
											key={addon.label}
											onClick={() => toggleAddon(pricingTab, addon.label)}
											className={`flex items-center justify-between rounded-xl p-3 text-left transition-colors ${
												isSelected
													? "bg-primary/10 ring-2 ring-primary/30"
													: "bg-muted/60 hover:bg-muted/80"
											}`}
										>
											<span className="flex items-center gap-2.5 font-medium text-foreground text-sm">
												<span
													className={`flex size-5 shrink-0 items-center justify-center rounded border-2 transition-colors ${
														isSelected
															? "border-primary bg-primary text-primary-foreground"
															: "border-muted-foreground/30"
													}`}
												>
													{isSelected && (
														<svg
															width="12"
															height="12"
															viewBox="0 0 256 256"
															fill="currentColor"
														>
															<path d="M232.49 80.49l-128 128a12 12 0 0 1-17 0l-56-56a12 12 0 1 1 17-17L96 183 215.51 63.51a12 12 0 0 1 17 17Z" />
														</svg>
													)}
												</span>
												{addon.label}
											</span>
											<span
												className={`font-semibold text-sm ${
													isSelected ? "text-primary" : "text-muted-foreground"
												}`}
											>
												{addon.price}
											</span>
										</button>
									);
								})}
							</div>

							<div className="flex flex-col gap-2.5">
								{active.deliverables.map((item) => (
									<div key={item} className="flex items-center gap-2">
										<svg
											width="18"
											height="18"
											viewBox="0 0 256 256"
											fill="currentColor"
											className="shrink-0 text-green-600"
										>
											<path d="M232.49 80.49l-128 128a12 12 0 0 1-17 0l-56-56a12 12 0 1 1 17-17L96 183 215.51 63.51a12 12 0 0 1 17 17Z" />
										</svg>
										<span className="font-medium text-foreground text-sm">
											{item}
										</span>
									</div>
								))}
							</div>
						</div>

						<div className="relative flex flex-col justify-center overflow-hidden border border-border bg-[#FBF9FA] p-6 text-center">
							<div className="relative z-10 mx-auto max-w-xs">
								<h3 className="font-normal text-base text-neutral-600">
									No subscriptions, no surprises.
								</h3>
								<p className="mt-6 flex items-baseline justify-center gap-x-2">
									<span className="font-semibold text-4xl text-foreground tracking-tight sm:text-5xl">
										{formatPrice(calculateTotal(pricingTab))}
									</span>
									<span className="font-medium text-muted-foreground text-sm tracking-wide">
										USD
									</span>
								</p>
								{calculateTotal(pricingTab) !== parsePrice(active.price) && (
									<p className="mt-1 text-muted-foreground text-xs">
										<del>{active.price}</del> with selected add-ons
									</p>
								)}
								<a
									href="https://wa.me/+917424904259"
									target="_blank"
									rel="noopener noreferrer"
									className="mt-10 block w-full rounded-full bg-foreground px-3 py-2.5 text-center font-medium text-background text-sm transition-opacity hover:opacity-90"
								>
									Send a message
								</a>
								<p className="mt-6 text-muted-foreground text-xs">
									Invoice provided. Reimbursement-friendly for teams.
								</p>
							</div>
						</div>
					</div>
				</div>
			</section>

			<section id="our-work" className="px-4 py-16 sm:px-6 md:py-24">
				<div className="mx-auto max-w-5xl">
					<span className="font-medium text-primary text-sm uppercase tracking-wider">
						Our work
					</span>
					<h2 className="mt-4 text-pretty font-serif text-4xl text-foreground leading-snug tracking-tight sm:text-5xl">
						Projects we&apos;ve shipped
					</h2>
					<div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
						{[
							{
								name: "Acctual",
								tagline: "Fiat & Crypto invoicing",
								desc: "We 1.5x'd Acctual's conversions by qualifying leads better and signaling trust. The brand and design work sharpened how they present themselves: more legible, clearer, fully transparent.",
								bg: "from-blue-50 to-indigo-100",
							},
							{
								name: "Steel",
								tagline: "Session Control Platform",
								desc: "With Steel since 2024. Brand, website, product. Rethought session control from the ground up. Rebuilt onboarding so users get going faster. They closed their Seed during the run.",
								bg: "from-zinc-100 to-neutral-200",
							},
							{
								name: "Melrose",
								tagline: "Logistics & Supply Chain",
								desc: "Brand and website for Melrose. We positioned them as a leader in logistics, lifted brand awareness, and tightened how the site qualifies leads.",
								bg: "from-amber-50 to-yellow-100",
							},
							{
								name: "Cap",
								tagline: "Open Source Screen Recorder",
								desc: "Redesigned cap.so and ran workshops with the team to lock in the visual language. The site went viral on launch. Cap now has 30,000+ teams using it including Microsoft, Figma, and Coinbase.",
								bg: "from-green-50 to-emerald-100",
							},
							{
								name: "Sonatic",
								tagline: "Fresh off a $6.88M a16z-led round",
								desc: "Sonatic came to us for their first website. We shipped in under two weeks.",
								bg: "from-violet-50 to-purple-100",
							},
							{
								name: "Stablecoin Directory",
								tagline: "Built with Acctual",
								desc: "A product that maps where stablecoins are accepted around the world. It doubles as a public utility and a way to grow awareness for the Acctual brand.",
								bg: "from-rose-50 to-pink-100",
							},
						].map((project) => (
							<div
								key={project.name}
								className="group flex flex-col overflow-hidden rounded-xl border border-border bg-white transition-shadow hover:shadow-md"
							>
								<div
									className={`flex h-40 items-center justify-center bg-gradient-to-br ${project.bg}`}
								>
									<span className="font-semibold text-2xl text-foreground/30 tracking-tight">
										{project.name}
									</span>
								</div>
								<div className="flex flex-1 flex-col gap-2 p-5">
									<h4 className="font-semibold text-foreground text-lg leading-snug">
										{project.name}
									</h4>
									<p className="font-medium text-muted-foreground text-sm">
										{project.tagline}
									</p>
									<p className="mt-1 text-muted-foreground text-sm leading-relaxed">
										{project.desc}
									</p>
								</div>
							</div>
						))}
					</div>
				</div>
			</section>

			<section className="px-4 py-16 sm:px-6 md:py-24">
				<div className="mx-auto max-w-6xl text-center">
					<span className="font-medium text-primary text-sm uppercase tracking-wider">
						Social proof
					</span>
					<h2 className="mt-4 text-pretty font-serif text-4xl text-foreground leading-snug tracking-tight sm:text-5xl">
						What founders are saying
					</h2>
					<div className="mt-8 columns-1 gap-4 sm:mt-12 sm:columns-2 sm:gap-5 lg:columns-3 lg:gap-6">
						{[
							"https://x.com/noobyco/status/2041410731074326658",
							"https://x.com/sourin_inc/status/2041148109657669672",
							"https://x.com/Shadabshs/status/2051358852508201245",
							"https://x.com/samtwtss/status/2009935266426016203",
							"https://x.com/themergency/status/1998030206213451878",
							"https://x.com/SoraiaDev/status/1997725961501258174",
							"https://x.com/justshipit_v0/status/1997723465055699248",
							"https://x.com/adriaandotcom/status/1991546549281931486",
							"https://x.com/itsjoaki/status/1988317896569975113",
							"https://x.com/sourin_inc/status/1957746012921250072",
						].map((url) => {
							const id = url.split("/status/")[1];
							return (
								<blockquote
									key={id}
									className="twitter-tweet mb-4 break-inside-avoid sm:mb-5 lg:mb-6"
									data-theme="light"
								>
									<a href={url}>Loading tweet...</a>
								</blockquote>
							);
						})}
					</div>
				</div>
			</section>

			<section className="bg-background px-4 py-16 sm:px-6 md:py-24">
				<div className="mx-auto max-w-3xl">
					<span className="font-medium text-primary text-sm uppercase tracking-wider">
						FAQ
					</span>
					<h2 className="mt-4 text-pretty font-serif text-4xl text-foreground leading-snug tracking-tight sm:text-5xl">
						Quick answers before you message us.
					</h2>
					<div className="mt-12 flex flex-col gap-0">
						{[
							{
								q: "What makes you different from a typical design agency?",
								a: "We only work with post-launch founders and small teams. We track conversion metrics, not just deliver files. And we actually understand marketplace listings — something most agencies ignore entirely.",
							},
							{
								q: "Do you only design, or do you develop too?",
								a: "Every project includes design files + copywriting tailored to your service. Development is available as an add-on for Next.js, Webflow, and Shopify depending on scope. We clarify this on the call so there are no surprises.",
							},
							{
								q: "How long does a typical project take?",
								a: "Most projects take 15-20 days. You get progress updates every 48 hours, not a big reveal at the end.",
							},
							{
								q: "What is included in conversion tracking?",
								a: "We set up analytics to measure your full funnel: page view → click → signup/install → activation. You get a dashboard and 3 months of monthly reports with actionable insights.",
							},
							{
								q: "How do I get started?",
								a: "Send us a message. Tell us what you're building and what stage you're in. We'll reply within a few hours with next steps or a free 15-minute strategy call.",
							},
						].map((faq, i) => (
							<details
								key={faq.q}
								className="group border-border border-b"
								open={i === 0}
							>
								<summary className="flex cursor-pointer items-center justify-between py-5 font-medium text-foreground text-lg transition-colors hover:text-primary [&::-webkit-details-marker]:hidden">
									<span className="pr-6">{faq.q}</span>
									<span className="shrink-0 text-xl transition-transform duration-200 group-open:rotate-45">
										+
									</span>
								</summary>
								<p className="pb-5 text-base text-muted-foreground leading-relaxed">
									{faq.a}
								</p>
							</details>
						))}
					</div>
				</div>
			</section>

			<section className="bg-white px-4 py-16 sm:px-6 md:py-24">
				<div className="mx-auto max-w-2xl text-center">
					<h2 className="text-pretty font-serif text-4xl text-foreground leading-snug tracking-tight sm:text-5xl">
						Stop guessing. Start converting.
					</h2>
					<p className="mt-6 text-lg text-muted-foreground leading-relaxed">
						We&apos;ll look at your current page and tell you the biggest leak —
						no pitch, no pressure.
					</p>
					<div className="mt-8">
						<a
							href="https://wa.me/+917424904259"
							target="_blank"
							rel="noopener noreferrer"
							className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 font-normal text-base text-primary-foreground transition-opacity hover:opacity-90"
						>
							Let&apos;s Talk
							<svg
								width="18"
								height="18"
								viewBox="0 0 24 24"
								fill="currentColor"
							>
								<path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
							</svg>
						</a>
					</div>
					<p className="mt-6 font-medium text-muted-foreground text-sm">
						Only 2 project spots remaining for this month
					</p>
				</div>
			</section>

			<footer className="bg-white">
				<div className="mx-auto max-w-5xl px-4 py-6 sm:px-6 md:flex md:items-center md:justify-between md:py-8">
					<div className="flex justify-center gap-x-6 md:order-2">
						<a
							href="#"
							className="text-muted-foreground transition-colors hover:text-foreground"
						>
							<span className="sr-only">X (Twitter)</span>
							<svg
								width="20"
								height="20"
								viewBox="0 0 24 24"
								fill="currentColor"
							>
								<path d="M13.6823 10.6218L20.2391 3H18.6854L12.9921 9.61788L8.44486 3H3.2002L10.0765 13.0074L3.2002 21H4.75404L10.7663 14.0113L15.5685 21H20.8131L13.6819 10.6218H13.6823ZM11.5541 13.0956L10.8574 12.0991L5.31391 4.16971H7.70053L12.1742 10.5689L12.8709 11.5655L18.6861 19.8835H16.2995L11.5541 13.096V13.0956Z" />
							</svg>
						</a>
						<a
							href="#"
							className="text-muted-foreground transition-colors hover:text-foreground"
						>
							<span className="sr-only">YouTube</span>
							<svg
								width="20"
								height="20"
								viewBox="0 0 24 24"
								fill="currentColor"
							>
								<path d="M19.812 5.418c.861.23 1.538.907 1.768 1.768C21.998 8.746 22 12 22 12s0 3.255-.418 4.814a2.504 2.504 0 0 1-1.768 1.768c-1.56.419-7.814.419-7.814.419s-6.255 0-7.814-.419a2.505 2.505 0 0 1-1.768-1.768C2 15.255 2 12 2 12s0-3.255.417-4.814a2.507 2.507 0 0 1 1.768-1.768C5.744 5 11.998 5 11.998 5s6.255 0 7.814.418ZM15.194 12 10 15V9l5.194 3Z" />
							</svg>
						</a>
						<a
							href="#"
							className="text-muted-foreground transition-colors hover:text-foreground"
						>
							<span className="sr-only">LinkedIn</span>
							<svg
								width="20"
								height="20"
								viewBox="0 0 24 24"
								fill="currentColor"
							>
								<path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
							</svg>
						</a>
					</div>
					<p className="mt-6 text-center text-muted-foreground text-sm md:order-1 md:mt-0">
						&copy; 2025 ReetLab. All rights reserved.
					</p>
				</div>
			</footer>
		</>
	);
}
