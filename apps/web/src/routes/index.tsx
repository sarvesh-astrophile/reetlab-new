import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";

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

	return (
		<>
			<motion.section
				variants={container}
				initial="hidden"
				animate="show"
				className="relative flex min-h-[calc(100svh-3.5rem)] flex-col items-center justify-center overflow-hidden bg-[#EFE7E5]/70 px-6 text-center backdrop-blur-sm"
			>
				<div className="pointer-events-none absolute -bottom-48 -left-48 h-[600px] w-[600px] rounded-full bg-[radial-gradient(circle,_#FFB26A_0%,_transparent_70%)]" />
				<motion.h1
					variants={fadeUp}
					className="font-medium font-serif text-6xl text-foreground leading-tight tracking-tighter sm:text-6xl md:text-7xl"
				>
					High-Converting Design
					<br />
					for Solo Founders &amp; Small Teams
				</motion.h1>
				<motion.p
					variants={fadeUp}
					className="mt-6 max-w-2xl text-base/7 text-muted-foreground md:text-lg/8"
				>
					We don&apos;t just make things pretty. We design landing pages,
					marketplace listings, and onboarding flows that turn visitors into
					customers — then we track what actually works.
				</motion.p>
				<motion.div variants={fadeUp} className="mt-10 flex items-center gap-4">
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
						className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 font-normal text-base text-foreground transition-colors hover:bg-muted"
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
					<span className="font-medium text-base text-primary uppercase tracking-wider">
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
		</>
	);
}
