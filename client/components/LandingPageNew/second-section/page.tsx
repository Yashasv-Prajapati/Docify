'use client'

import React from "react"
import Image from "next/image"


const features = [
  {
    name: "Github",
    description:
      "Integrate seamlessly with GitHub for enhanced project management.",
    image: "/github.avif",
    alt: "Github",
    color: "blue"
  },
  {
    name: "UML Diagrams",
    description:
      "Visualize code architecture with automated UML diagrams.",
    image: "/uml.png",
    alt: "UML",
  },
  {
    name: "Dependency",
    description:
      "Streamline dependency management for efficient development.",
    image: "/dep.jpg",
    alt: "Dependency",
  },
  {
    name: "Testing Plans",
    description:
      "Define comprehensive testing plans to ensure the reliability and quality of your software.",
    image: "/test.avif",
    alt: "Testing",
  },
  {
    name: "Code Coverage",
    description:
      " Generate reports to visualize code coverage and identify areas that require additional testing.",
    image: "/code_coverage.webp",
    alt: "Code",
  },
  {
    name: "Documentation",
    image: "/Docu.png",
    description: " Streamline documentation and README generation with automated tools and edit them with ease.",
    alt: "Documentation",
  },
]

const SecondSection = () => {
  return (
    <div className="">
      <div className="flex-col items-center justify-center">
        <div className="mt-8 flex justify-center pt-5 text-3xl font-medium  text-black md:text-5xl">
          Features
        </div>
        <p className='md-10 mt-4 bg-gradient-to-r from-black to-gray-400 bg-clip-text text-center text-base font-normal text-transparent md:text-lg'>
          Streamline your project with docify. Get all the capabilities,
        </p>
        <p className='md-10 mb-8  bg-gradient-to-r from-black to-gray-400 bg-clip-text text-center text-base font-normal text-transparent md:text-lg'>
          without the complexity.
        </p>

        <div className="grid grid-cols-1 gap-4 p-4 md:grid md:grid-cols-3 md:px-40">
          {features.map((feature, index) => (
            <div
              key={index}
              className="w-full flex-col items-center justify-center space-y-6 rounded-xl border p-8 pb-10 shadow-md transition-all duration-500 ease-in-out hover:scale-105"
            >
              <div className=" text-3xl font-bold text-gray-600">
                <Image
                  src={feature.image}
                  alt={feature.alt}
                  width={600}
                  height={600}
                  className="mb-3 flex h-40 items-center justify-center object-contain"
                />
                <div>
                  <div className="border-b-2 border-gray-300 pb-1 text-2xl font-medium text-black">
                    {feature.name}
                  </div>

                  <div className="pt-1 text-lg font-normal text-gray-500">
                    {feature.description}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>



  );
}

export default SecondSection;