'use client'

import { useState } from 'react'

export default function HeroSection() {
  return (
    <div className="relative min-h-screen flex items-center overflow-hidden bg-[#0B1120]">

      {/* Animated Background Glow */}
      <div className="absolute top-[-200px] left-[-100px] w-[500px] h-[500px] bg-cyan-500/20 rounded-full blur-3xl animate-pulse"></div>

      <div className="absolute bottom-[-200px] right-[-100px] w-[500px] h-[500px] bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>

      {/* Grid Background */}
      <div
        className="
          absolute
          inset-0
          w-full
          h-full
          opacity-30
          bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px)]
          bg-[size:50px_50px]
        "
      ></div>

      <div className="relative isolate px-6 pt-14 lg:px-8 w-full">

        {/* Top Gradient */}
        <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80">
          <div
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
            className="
              relative
              left-[calc(50%+3rem)]
              aspect-[1155/678]
              w-[36.125rem]
              -translate-x-1/2
              bg-gradient-to-tr
              from-cyan-500
              to-purple-500
              opacity-30
              sm:left-[calc(50%+36rem)]
              sm:w-[72.1875rem]
              animate-pulse
            "
          />
        </div>

        <div className="mx-auto max-w-4xl py-16 sm:py-24 lg:py-20">

          {/* Badge */}
          <div className="hidden sm:mb-8 sm:flex sm:justify-center">
            <div className="
              relative
              rounded-full
              px-5
              py-2
              text-sm
              leading-6
              text-cyan-300
              border
              border-cyan-500/20
              bg-white/5
              backdrop-blur-xl
              hover:border-cyan-400/40
              transition-all
              duration-300
            ">
              ✨ How to use this AI interview mocker.

              <a
                href="/how-it-works"
                className="font-semibold text-white ml-2 hover:text-cyan-300 transition"
              >
                <span aria-hidden="true" className="absolute inset-0" />
                Read more →
              </a>
            </div>
          </div>

          {/* Main Content */}
          <div className="text-center animate-fadeIn">

            <h1 className="
              text-4xl
              font-black
              tracking-tight
              text-white
              sm:text-6xl
              leading-tight
            ">
              Your Personal

              <span className="
                block
                mt-2
                bg-gradient-to-r
                from-cyan-400
                via-blue-500
                to-purple-500
                bg-clip-text
                text-transparent
              ">
                AI Interview Coach
              </span>
            </h1>

            <p className="
              mt-6
              text-lg
              leading-8
              text-gray-300
              sm:text-xl
            ">
              Double your chances of landing that job offer with our AI-powered interview prep
            </p>

            {/* Buttons */}
            <div className="mt-10 flex items-center justify-center gap-x-6">

              <a
                href="/dashboard"
                className="
                  relative
                  inline-flex
                  items-center
                  justify-center
                  overflow-hidden
                  rounded-2xl
                  px-6
                  py-3
                  text-sm
                  font-semibold
                  text-white
                  transition-all
                  duration-300
                  hover:scale-105
                "
              >

                <span className="
                  absolute
                  inset-0
                  bg-gradient-to-r
                  from-cyan-500
                  via-blue-500
                  to-purple-500
                "></span>

                <span className="relative z-10">
                  Get started
                </span>

              </a>

              <a
                href="/dashboard"
                className="
                  text-sm
                  font-semibold
                  leading-6
                  text-gray-200
                  hover:text-cyan-300
                  transition-all
                  duration-300
                "
              >
                Learn more →
              </a>

            </div>
          </div>
        </div>

        {/* Bottom Gradient */}
        <div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 -z-10 transform-gpu overflow-hidden blur-3xl"
        >
          <div
            style={{
              clipPath:
                'polygon(24% 0%, 100% 0%, 76% 100%, 0% 100%)',
            }}
            className="
              relative
              left-[calc(50%+3rem)]
              aspect-[1155/678]
              w-[36.125rem]
              -translate-x-1/2
              bg-gradient-to-tr
              from-purple-500
              to-cyan-500
              opacity-30
              sm:left-[calc(50%+36rem)]
              sm:w-[72.1875rem]
              animate-pulse
            "
          />
        </div>

      </div>
    </div>
  )
}