'use client';

import { motion } from "framer-motion";
import { TypingText } from "./index";

import styles from "../../styles";
import { fadeIn, staggerContainer } from "../../utils/motion";

const About = () => (
  <section className={`${styles.paddings} relative z-10 mt-5`}>
    <div className="gradient-02 z-0" />
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="show"
      viewport={{ once: false, amount: 0.25 }}
      className={`${styles.innerWidth} mx-auto ${styles.flexCenter} flex-col`}
    >
      <h1 className="flex items-center text-5xl font-extrabold text-white border-b-4 pb-1 border-[#65aedb]">
        About
        <span className="bg-[#7184f0] text-[#331062] text-2xl font-semibold me-2 px-2.5 py-0.5 rounded  ms-4">
          Docify
        </span>
      </h1>

      <motion.div
        variants={fadeIn("up", "tween", 0.2, 1)}
        className="mt-[8px] font-normal sm:text-[32px] text-[20px] text-center text-secondary-white"
      >
        <blockquote className="text-2xl  text-gray-900 p-8">
          <svg
            className="w-8 h-8 text-gray-400 dark:text-gray-600 mb-4"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 18 14"
          >
            <path d="M6 0H2a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3H2a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Zm10 0h-4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3h-1a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Z" />
          </svg>
          <div className="text-transparent bg-clip-text bg-gradient-to-r to-[#905dc4] from-sky-400">
          "Revolutionize your project documentation process with our innovative tool. Effortlessly streamline analysis and generate essential components like testing plans, UML diagrams, and README files. Our platform seamlessly integrates with GitHub repositories for maximum efficiency. Experience the future of project documentation with us."
          </div>
        </blockquote>
      </motion.div>

      <motion.img
        variants={fadeIn("up", "tween", 0.3, 1)}
        src="/arrow-down.svg"
        alt="arrow down"
        className="w-[18px] h-[28px] object-contain mt-[28px]"
      />
    </motion.div>
  </section>
);

export default About;
