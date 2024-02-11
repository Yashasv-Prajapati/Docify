"use client";

import { motion } from "framer-motion";
import Lottie from "lottie-react";
import animationData from "../../public/Animation - 1707626346860.json";
import { useRouter } from "next/router";

import styles from "../../styles";
import { slideIn, staggerContainer, textVariant } from "../../utils/motion";

const Hero = () => {
  const router = useRouter();
  return (
    <div>
    <section className={`${styles.yPaddings} sm:pl-16 pl-6`}>
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, amount: 0.25 }}
        className={`${styles.innerWidth} mx-auto flex flex-col`}
      >
        <div className="flex justify-center items-center flex-col relative z-10 p-9">
          <motion.h1 variants={textVariant(1.1)}>
            {/* Lets Us handle  */}

            <div className="text-2xl font-extrabold text-white  md:text-3xl lg:text-4xl">
              <div className="text-transparent bg-clip-text bg-gradient-to-r to-[#8e29f3] from-sky-400">
                Streamline your project documentation:
              </div>{" "}
              Automate analysis, Generate essentials!
            </div>
          </motion.h1>
          <motion.div
            variants={textVariant(1.2)}
            className="flex flex-row justify-center items-center"
          ></motion.div>
        </div>

        <motion.div
          variants={slideIn("right", "tween", 0.2, 1)}
          className="relative w-full md:-mt-[20px] -mt-[12px]"
        >
          <div className="absolute w-full h-[400px] hero-gradient rounded-tl-[140px] z-[0] -top-[30px]" />

          <img
            src="/cover.png"
            alt="hero_cover"
            className="w-full sm:h-[500px] h-[350px] object-cover rounded-tl-[140px] z-10 relative"
          />
          <div className="absolute top-20 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
            <button
              onClick={() => router.push('/auth/signup')}
              type="button"
              className="mr-10  text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-2xl text-sm px-5 py-2.5 text-center me-2 mb-2"
            >
              Get Started
            </button>
            <button
              type="button"
              className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-2xl text-sm px-5 py-2.5 text-center me-2 mb-2"
            >
              Get a Demo
            </button>
          </div>

          <a href="#explore">
            <div className=" w-full flex justify-end sm:-mt-[70px] -mt-[50px]  relative z-10 ">
              <span className="pr-11">
                <span className="w-min flex justify-end sm:-mt-[70px] -mt-[50px]  relative z-10  rounded-full bg-gradient-to-r to-[#2a0670] from-[#250b47]">
                  <Lottie
                    animationData={animationData}
                    className="sm:w-[155px] w-[100px] sm:h-[155px] h-[100px] object-contain"
                  />
                </span>
              </span>
            </div>
          </a>
        </motion.div>
      </motion.div>
    </section>
    </div>
  );
};

export default Hero;
