import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useState } from "react";

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
			delivery: "7 Days",
			deliverables: [
				"Custom wireframe & layout",
				"Desktop, tablet, mobile responsive",
				"Figma file with all components",
				"Unlimited revisions",
				"Updates every 48 hours",
			],
			addons: [
				{ label: "Add Development", price: "+$799" },
				{ label: "Extra Pages", price: "+$200/page" },
				{ label: "Animations", price: "+$300/page" },
			],
		},
		"Marketplace Listing": {
			title: "Marketplace Listing",
			subtitle: "Revamp",
			description:
				"Rebuilding your marketplace listing to stand out, build trust, and compete with category leaders.",
			price: "$349",
			delivery: "10 Days",
			deliverables: [
				"Custom listing layout & design",
				"Screenshot redesign",
				"Copy rewrite for all sections",
				"Figma file with all assets",
				"A/B test variant included",
			],
			addons: [
				{ label: "Add Development", price: "+$799" },
				{ label: "Extra Screens", price: "+$150/screen" },
				{ label: "Video Preview", price: "+$500" },
			],
		},
		"Onboarding Audit": {
			title: "Onboarding",
			subtitle: "Audit & Fix",
			description:
				"Mapping your first-run experience, finding where users drop off, and redesigning the flow to boost activation.",
			price: "$499",
			delivery: "14 Days",
			deliverables: [
				"Full onboarding audit report",
				"User flow mapping & analysis",
				"Redesigned flow in Figma",
				"In-app copy & microcopy",
				"Activation metrics tracked",
			],
			addons: [
				{ label: "Add Development", price: "+$1,299" },
				{ label: "User Testing", price: "+$500" },
				{ label: "Analytics Dashboard", price: "+$800" },
			],
		},
	};

	const active = pricing[pricingTab];

	return (
		<>
			<motion.section
				variants={container}
				initial="hidden"
				animate="show"
				className="relative flex min-h-[calc(100svh-3.5rem)] flex-col items-center justify-center overflow-hidden bg-[#EFE7E5]/70 px-6 text-center backdrop-blur-sm"
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
					className="relative z-10 font-medium font-serif text-6xl text-foreground leading-tight tracking-tight sm:text-6xl md:text-7xl"
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
					className="relative z-10 mt-10 flex items-center gap-4"
				>
					<Link
						to="/contact"
						className="inline-flex items-center gap-2 rounded-full bg-primary py-3 pr-4 pl-5 font-normal text-base text-primary-foreground transition-opacity hover:opacity-90"
					>
						Let&apos;s Talk
						<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
							<path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
						</svg>
					</Link>
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
			</motion.section>

			<section className="border-neutral-200 border-t bg-background px-6 py-24">
				<div className="mx-auto max-w-3xl">
					<span className="font-medium text-primary text-sm uppercase tracking-wider">
						The problem
					</span>
					<h3 className="mt-4 text-pretty font-serif text-4xl text-foreground leading-snug tracking-tight md:text-5xl">
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
								<p className="text-pretty text-foreground text-xl">
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
						<p className="text-pretty text-foreground text-xl">
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

			<section className="px-6 py-24">
				<div className="mx-auto max-w-5xl bg-white p-12">
					<span className="font-medium text-primary text-sm uppercase tracking-wider">
						How we help
					</span>
					<h3 className="mt-4 text-pretty font-serif text-4xl text-foreground leading-snug tracking-tight md:text-5xl">
						Every customer you&apos;re losing has a reason. We fix three.
					</h3>

					<div className="mt-14 grid gap-8 md:grid-cols-3">
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
						<Link
							to="/contact"
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
						</Link>
					</div>
				</div>
			</section>

			<section className="px-6 py-12">
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
					<blockquote className="text-pretty font-serif text-3xl text-foreground leading-relaxed tracking-normal md:text-4xl">
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

			<section className="px-6 py-24">
				<div className="mx-auto max-w-5xl">
					<span className="font-medium text-primary text-sm uppercase tracking-wider">
						The difference
					</span>
					<div className="mt-4 grid gap-12 md:grid-cols-2">
						<div>
							<h2 className="text-pretty font-serif text-4xl text-foreground leading-snug tracking-tight md:text-5xl">
								We track conversion. Others just ship and hope.
							</h2>
							<p className="mt-6 max-w-lg text-lg/relaxed text-muted-foreground">
								Our unfair advantage: we stay until the numbers move. Every
								project includes conversion tracking setup so you know exactly
								what your design investment returned.
							</p>
							<Link
								to="/contact"
								className="mt-8 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 font-normal text-base text-primary-foreground transition-opacity hover:opacity-90"
							>
								Let&apos;s find what&apos;s leaking
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
							</Link>
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

			<section className="bg-white px-6 py-24">
				<div className="mx-auto max-w-4xl">
					<span className="font-medium text-primary text-sm uppercase tracking-wider">
						Pricing
					</span>
					<h2 className="mt-4 text-pretty font-serif text-4xl text-foreground leading-snug tracking-tight md:text-5xl">
						One service, clear price.
					</h2>

					<div className="mt-6 flex flex-wrap gap-2">
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

					<div className="mt-10 grid gap-6 overflow-hidden rounded-2xl border border-border bg-[#FBF9FA] p-6 md:grid-cols-2 md:p-8">
						<div className="flex flex-col gap-4">
							<div className="flex items-center gap-2.5">
								<h3 className="font-extrabold text-2xl text-foreground uppercase tracking-tight">
									{active.title}
								</h3>
								<span className="rounded-md border border-border px-2.5 py-1 font-medium text-muted-foreground text-xs">
									{active.delivery}
								</span>
							</div>

							<div className="flex flex-col gap-3">
								{active.addons.map((addon) => (
									<div
										key={addon.label}
										className="flex items-center justify-between rounded-xl bg-muted/60 p-3"
									>
										<span className="font-medium text-foreground text-sm">
											{addon.label}
										</span>
										<span className="font-extrabold text-muted-foreground text-sm">
											{addon.price}
										</span>
									</div>
								))}
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

						<div className="flex flex-col justify-between rounded-2xl border border-border bg-primary/5 p-6">
							<div>
								<span className="font-bold font-mono text-primary text-sm uppercase tracking-widest">
									{active.title} Design
								</span>
								<p className="mt-1 font-extrabold text-[40px] text-primary leading-none tracking-tight">
									{active.price}
								</p>
								<p className="mt-3 text-muted-foreground text-sm/relaxed">
									{active.description}
								</p>
							</div>
							<div className="mt-8">
								<Link
									to="/contact"
									className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-foreground py-3 font-medium text-background text-sm transition-opacity hover:opacity-90"
								>
									Send a Message
									<svg
										width="16"
										height="16"
										viewBox="0 0 24 24"
										fill="currentColor"
									>
										<path
											fillRule="evenodd"
											d="M16.72 7.72a.75.75 0 0 1 1.06 0l3.75 3.75a.75.75 0 0 1 0 1.06l-3.75 3.75a.75.75 0 1 1-1.06-1.06l2.47-2.47H3a.75.75 0 0 1 0-1.5h16.19l-2.47-2.47a.75.75 0 0 1 0-1.06Z"
											clipRule="evenodd"
										/>
									</svg>
								</Link>
							</div>
						</div>
					</div>
				</div>
			</section>
		</>
	);
}
