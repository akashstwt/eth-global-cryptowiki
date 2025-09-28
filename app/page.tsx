import WalletConnect from "@/components/walletconnect";
import Header from "@/components/Header";
import Hero from "@/components/hero";
import ScrollFillText from "@/components/Test";
import ProblemSolutions from "@/components/ProblemSolutions";
import ChatInterface from "@/components/ChatInterface";
import {Footer} from "@/components/Footer";

export default async function Home() {
	return( 			
			<main className="min-h-screen bg-black">
				<Header />
				<Hero />
				{/* <WalletConnect /> */}
				<ScrollFillText />
				<ProblemSolutions />
				<ChatInterface />
				<Footer />
			</main>
	);
}