"use client";

import { motion } from "framer-motion";

const signals = [
  "barely slept last night",
  "missing home today",
  "needed some space",
  "actually felt good today",
];

const positions = [
  { top: "22%", left: "12%" },
  { top: "28%", right: "12%" },
  { top: "65%", left: "14%" },
  { top: "70%", right: "14%" },
];

export default function LandingPage() {
  return (
    <div className="bg-black text-white">

      {/* HERO */}
      <section className="relative min-h-screen flex items-center justify-center text-center px-6 overflow-hidden">

        {/* SIGNALS */}
        {signals.map((text, i) => (
          <motion.div
            key={i}
            className="absolute px-5 py-2.5 rounded-full bg-white/5 backdrop-blur-xl text-white/70 text-[15px]"
            style={positions[i]}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{
              opacity: [0.2, 0.5, 0.3],
              y: [0, -15, 8, 0],
            }}
            transition={{
              duration: 12 + i * 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            {text}
          </motion.div>
        ))}

        {/* CONTENT */}
        <div className="relative z-10">
          <h1 className="text-[44px] sm:text-[64px] lg:text-[80px] font-bold leading-[1.05]">
            Know your friends<br />
            like your roommate.
          </h1>

          <p className="mt-6 text-[#A1A1A1] text-[18px]">
            One question a day.<br />
            The little things that make you actually know someone.
          </p>

          <button
            onClick={() =>
              (window.location.href =
                "mailto:aakashkakkar1205@gmail.com?subject=I want access to RareLens")
            }
            className="mt-10 bg-white text-black px-8 h-[56px] rounded-xl font-semibold hover:scale-[1.02] transition"
          >
            Get Early Access
          </button>
        </div>
      </section>

      {/* SECTION 2 */}
      <section className="py-[120px] flex justify-center text-center px-6">
        <div className="max-w-[640px]">
          <div className="text-[32px] font-bold leading-[1.2]">
            10 hours online.<br />
            Still out of sync with the people who matter.
          </div>

          <div className="h-10" />

          <div className="text-[#E0E0E0] text-[18px]">
            You see everyone.<br />
            You don’t see your people.
          </div>

          <div className="h-10" />

          <div className="text-white font-semibold text-[20px]">
            RareLens fixes that.
          </div>
        </div>
      </section>

      {/* SECTION 3 */}
      <section className="py-[140px] flex justify-center text-center px-6">
        <div className="max-w-[720px]">
          <div className="text-[40px] font-bold leading-[1.1]">
            This works when your people are here.
          </div>

          <div className="h-6" />

          <div className="text-[#A1A1A1] text-[18px]">
            Your campus is where your people already are.<br />
            That’s where this starts.
          </div>
        </div>
      </section>

      {/* SECTION 4 */}
      <section className="py-[140px] bg-[#0A0A0A] text-center px-6 flex justify-center">
        <div className="max-w-[900px] w-full">
          <div className="text-[13px] uppercase text-[#6B6B6B] tracking-wide">
            How it works
          </div>

          <div className="h-10" />

          <div className="grid md:grid-cols-3 gap-10">
            <div>
              <div className="text-[#6B6B6B] text-[14px]">01</div>
              <div className="text-[22px] font-bold mt-3">
                One question, every day
              </div>
            </div>

            <div>
              <div className="text-[#6B6B6B] text-[14px]">02</div>
              <div className="text-[22px] font-bold mt-3">
                Answer in 30 seconds
              </div>
            </div>

            <div>
              <div className="text-[#6B6B6B] text-[14px]">03</div>
              <div className="text-[22px] font-bold mt-3">
                Unlock friends' updates
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5 */}
      <section className="py-[140px] flex justify-center text-center px-6">
        <div className="max-w-[640px]">
          <div className="text-[32px] font-bold">
            One answer changes everything.
          </div>

          <div className="h-8" />

          <div className="text-[#E0E0E0] text-[18px] leading-[1.6]">
            What someone’s going through.<br />
            What’s shifting in their life.<br />
            How they actually feel — day to day.
          </div>

          <div className="h-8" />

          <div className="text-[22px] font-semibold">
            This isn’t content.<br />
            It’s understanding.
          </div>

          <div className="h-8" />

          <div className="text-[#BDBDBD] text-[18px]">
            Over time, you don’t have to guess anymore.<br />
            You just know where people are in life.
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-[160px] flex justify-center text-center px-6">
        <div>
          <div className="text-[44px] font-bold">
            Know your people.
          </div>
          <div className="text-[44px] text-[#E0E0E0]">
            Really know them.
          </div>

          <div className="h-8" />

          <button
            onClick={() =>
              (window.location.href =
                "mailto:aakashkakkar1205@gmail.com?subject=I want access to RareLens")
            }
            className="bg-white text-black px-10 h-[58px] rounded-xl font-semibold hover:scale-[1.03] transition"
          >
            Get Early Access
          </button>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="text-center pb-10">
        <div className="text-[#A1A1A1]">RareLens</div>

        <div className="mt-4 text-[#6B6B6B] flex justify-center gap-6 text-sm">
          <a href="/privacy">Privacy Policy</a>
          <a href="/terms">Terms & Conditions</a>
        </div>

        <div className="mt-4 text-[#6B6B6B] text-sm">
          © 2026 RareLens
        </div>
      </footer>

    </div>
  );
}