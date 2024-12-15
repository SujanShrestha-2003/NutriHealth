import Header from "../components/Header";
import HeroSection from "../components/HeroSection";
import Footer from "../components/Footer";
import { motion } from "framer-motion";


const LandingPage = () => {
    return (
        <motion.div>
            <Header />
            <HeroSection />
            <Footer />
        </motion.div>
    );
}

export default LandingPage;
