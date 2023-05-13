import { motion } from "framer-motion";
import { fromLeftAnim } from "../../animations/animations";

interface Props {
	title: string;
}

export const H2 = ({ title }: Props) => {
	return <motion.h2 variants={fromLeftAnim} className='font-bold text-lg sm:text-xl md:text-2xl lg:text-3xl '>{title}</motion.h2>;
};
