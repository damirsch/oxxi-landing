import { Header } from "@/components/shared/header";
import { Footer } from "@/components/shared/footer";

export default function Home() {
	return (
		<>
			<Header />
			<main className="flex-1">
				<section className="flex justify-center items-center min-h-[80vh]">
					<h1 className="text-4xl font-bold text-primary-text">
						Oxxi Landing
					</h1>
				</section>
			</main>
			<Footer />
		</>
	);
}
