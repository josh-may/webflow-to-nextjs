import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <section className="relative min-h-screen">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://cdn.prod.website-files.com/67634ad034d5ee18ab6c7752/67634ad034d5ee18ab6c793c_image%2075%20(2)%20(1).webp"
            alt="Tech professional working"
            fill
            className="object-cover"
            priority
          />
        </div>

        <div className="absolute inset-0 z-10 bg-gradient-to-b from-black/60 via-black/20 to-transparent"></div>

        <div className="relative z-20">
          <nav
            className={`fixed top-0 left-0 right-0 px-6 py-8 flex justify-between items-center transition-all duration-300 ${
              isScrolled ? "bg-[#0B1B35]" : ""
            }`}
          >
            <Link
              href="http://www.hodltalent.xyz"
              className="flex-shrink-0 hover:opacity-80 transition-opacity"
            >
              <Image
                src="https://cdn.prod.website-files.com/67634ad034d5ee18ab6c7752/6763a99c6c9bf69e5e829ad5_Your%20paragraph%20text%20(2).svg"
                alt="HODL Talent"
                width={180}
                height={45}
                className="logo-header"
              />
            </Link>

            <div className="hidden md:flex gap-12 text-white font-medium text-lg">
              <Link
                href="#our-difference"
                className="hover:text-orange-300 transition-colors"
              >
                Our Difference
              </Link>
              <Link
                href="#our-work"
                className="hover:text-orange-300 transition-colors"
              >
                Our Work
              </Link>
              <Link
                href="#our-clients"
                className="hover:text-orange-300 transition-colors"
              >
                Our Clients
              </Link>
            </div>

            <Link
              href="https://tidycal.com/jakemarmulstein/intro"
              className="px-8 py-3 bg-orange-300 text-black font-semibold rounded-full hover:bg-orange-400 transition-all hover:scale-105 flex-shrink-0 text-lg shadow-lg"
            >
              Let&apos;s Talk
            </Link>
          </nav>

          <div className="min-h-screen flex items-center">
            <div className="container mx-auto px-8">
              <div className="flex flex-col justify-center max-w-2xl">
                <div className="bg-[#FFF5EB] rounded-3xl p-16 shadow-lg">
                  <p className="text-gray-600 font-semibold mb-6 text-lg">
                    SPEED + QUALITY GUARANTEED
                  </p>
                  <h1 className="text-6xl font-bold mb-6">
                    Hire Top
                    <br /> Tech Talent
                    <br /> 70% Faster
                  </h1>
                  <p className="text-gray-600 mb-10 text-lg">
                    Save time, hire and retain top talent
                  </p>
                  <div className="flex gap-6">
                    <Link
                      href="https://tidycal.com/jakemarmulstein/intro"
                      className="px-8 py-4 bg-orange-300 rounded-full hover:bg-orange-400 transition-colors text-lg"
                    >
                      Let&apos;s Talk
                    </Link>
                    <Link
                      href="#our-clients"
                      className="px-8 py-4 bg-navy-900 text-white rounded-full hover:bg-navy-800 transition-colors text-lg"
                    >
                      Learn More
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-[#FEF4EB] py-32 md:py-40">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 md:gap-16 items-center min-h-[600px]">
          <div className="space-y-6">
            <h2 className="text-4xl font-semibold text-gray-900">
              Our Difference
            </h2>
            <p className="text-gray-700">
              We are software entrepreneurs with software company exits. We
              became experts in hiring talent and building teams.
            </p>
            <ul className="space-y-4">
              <li className="flex items-start space-x-2">
                <span className="text-gray-700">•</span>
                <p className="text-gray-700">
                  We send you engineers pre-vetted for technical and cultural
                  fit
                </p>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-gray-700">•</span>
                <p className="text-gray-700">
                  We screen for life stability and run reference checks prior to
                  hiring
                </p>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-gray-700">•</span>
                <p className="text-gray-700">
                  We operate on retention so our interests are aligned on
                  quality
                </p>
              </li>
            </ul>
          </div>
          <div className="relative h-[500px] w-full rounded-2xl overflow-hidden">
            <Image
              src="https://cdn.prod.website-files.com/67634ad034d5ee18ab6c7752/676afc04dbfbff2fd606e28f_pexels-claudio-emanuel-709239809-18935831.jpg"
              alt="Developer coding environment"
              fill
              className="object-cover"
            />
          </div>
          <div className="space-y-12">
            <div>
              <p className="text-[#F4AA7D] text-6xl font-bold">50+</p>
              <p className="text-gray-700 text-xl">remote hires</p>
              <div className="w-full h-px bg-gray-300 mt-4"></div>
            </div>
            <div>
              <p className="text-[#F4AA7D] text-6xl font-bold">4 year</p>
              <p className="text-gray-700 text-xl">average retention rate</p>
              <div className="w-full h-px bg-gray-300 mt-4"></div>
            </div>
            <div>
              <p className="text-[#F4AA7D] text-6xl font-bold">60%</p>
              <p className="text-gray-700 text-xl">payroll savings</p>
              <div className="w-full h-px bg-gray-300 mt-4"></div>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-[#0B1B35] text-white py-32">
        <div className="container mx-auto px-8">
          <h2 className="text-5xl font-bold mb-20 text-center">How We Work</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
            <div className="space-y-6">
              <div className="w-8 h-8 rounded-full bg-blue-300"></div>
              <h3 className="text-2xl font-semibold">End to end hiring</h3>
              <div className="space-y-4">
                <p className="text-gray-300">
                  You take over at the late stage interview then decide and we
                  handle the rest
                </p>
                <p className="text-gray-300">
                  We help with onboarding to make the transition as smooth as
                  possible
                </p>
              </div>
            </div>
            <div className="space-y-6">
              <div className="w-8 h-8 rounded-full bg-orange-300"></div>
              <h3 className="text-2xl font-semibold">
                Payroll, compliance, and team integration
              </h3>
              <div className="space-y-4">
                <p className="text-gray-300">
                  Your employees show up enabled to work. To avoid currency
                  fluctuation we pay monthly in USD
                </p>
                <p className="text-gray-300">
                  We can also offer your new team branded swag, health insurance
                  and lifestyle benefits
                </p>
              </div>
            </div>
            <div className="space-y-6">
              <div className="w-8 h-8 rounded-full bg-yellow-300"></div>
              <h3 className="text-2xl font-semibold">
                Fraction HR to set you up for scale
              </h3>
              <div className="space-y-4">
                <p className="text-gray-300">
                  We help bridge any gaps and run monthly check-ins with each
                  hire as well as a slack community
                </p>
                <p className="text-gray-300">
                  We can provision computers in country and assist with other
                  scale operations like employer branding
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="py-20 px-4 bg-[#FFF5EB]">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-5xl font-bold text-center mb-16">
            Meet the Experts
          </h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="flex flex-col items-center">
              <div className="relative w-[320px] h-[380px] mb-6">
                <Image
                  src="https://cdn.prod.website-files.com/67634ad034d5ee18ab6c7752/676384356bb6489e17d2abc6_Anu.jpg"
                  alt="Anu"
                  fill
                  className="object-cover rounded-lg"
                />
              </div>
              <h3 className="text-2xl font-bold mb-2">Anu</h3>
              <p className="text-lg mb-4">Technical Founder</p>
              <p className="text-center text-gray-600 mb-4 max-w-sm">
                A fullstack software engineer with experience working in
                engineering teams for F100 companies
              </p>
              <a
                href="https://www.linkedin.com/in/anubhav-ga-rg/"
                target="blank"
                rel="noopener noreferrer"
                className="p-2 border border-gray-300 rounded-full hover:bg-gray-50 transition-colors"
              >
                <svg
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.3 6.5a1.78 1.78 0 01-1.8 1.75zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0013 14.19a.66.66 0 000 .14V19h-3v-9h2.9v1.3a3.11 3.11 0 012.7-1.4c1.55 0 3.36.86 3.36 3.66z"></path>
                </svg>
              </a>
            </div>
            <div className="flex flex-col items-center">
              <div className="relative w-[320px] h-[380px] mb-6">
                <Image
                  src="https://cdn.prod.website-files.com/67634ad034d5ee18ab6c7752/67638434ff4968e2f3539751_Jake.jpg"
                  alt="Jake"
                  fill
                  className="object-cover rounded-lg"
                />
              </div>
              <h3 className="text-2xl font-bold mb-2">Jake</h3>
              <p className="text-lg mb-4">Business Founder</p>
              <p className="text-center text-gray-600 mb-4 max-w-sm">
                Previously founded and scaled a Proptech SaaS with 50 employees
                to exit. Has 10 years of experience building remote teams
              </p>
              <a
                href="https://www.linkedin.com/in/jakemarmulstein/"
                target="blank"
                rel="noopener noreferrer"
                className="p-2 border border-gray-300 rounded-full hover:bg-gray-50 transition-colors"
              >
                <svg
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.3 6.5a1.78 1.78 0 01-1.8 1.75zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0013 14.19a.66.66 0 000 .14V19h-3v-9h2.9v1.3a3.11 3.11 0 012.7-1.4c1.55 0 3.36.86 3.36 3.66z"></path>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 px-4 bg-[#FEE2C3]">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-gray-500 text-sm font-medium tracking-wider mb-12">
            TESTIMONIALS
          </p>
          <div className="relative">
            {/* First Testimonial */}
            <div
              className={`testimonial transition-opacity duration-300 ${
                currentTestimonial === 0 ? "opacity-100" : "opacity-0 hidden"
              }`}
            >
              <h2 className="text-3xl md:text-4xl font-medium text-gray-800 mb-12 max-w-3xl mx-auto leading-relaxed">
                &ldquo;We would have never built such a strong engineering team
                had it not been for Jake and Anu. Not only did things move
                quickly, but we found top talent at an affordable cost.&rdquo;
              </h2>
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 relative rounded-full overflow-hidden mb-4 border-2 border-white shadow-sm">
                  <Image
                    src="https://cdn.prod.website-files.com/67634ad034d5ee18ab6c7752/676384356ff0672ec59ac471_Scott.jpg"
                    alt="Scott Woodside"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="mb-4">
                  <h3 className="font-medium text-gray-900 mb-1">
                    Scott Woodside
                  </h3>
                  <p className="text-gray-500 text-sm">
                    Founder and CEO, Bankbarn
                  </p>
                </div>
              </div>
            </div>

            {/* Second Testimonial */}
            <div
              className={`testimonial transition-opacity duration-300 ${
                currentTestimonial === 1 ? "opacity-100" : "opacity-0 hidden"
              }`}
            >
              <h2 className="text-3xl md:text-4xl font-medium text-gray-800 mb-12 max-w-3xl mx-auto leading-relaxed">
                &ldquo;After running an engineering staffing agency for 10
                years, I wish we had their model. Jake and Anu solve the
                conflict between recruiter incentives and employee
                performance&rdquo;
              </h2>
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 relative rounded-full overflow-hidden mb-4 border-2 border-white shadow-sm">
                  <Image
                    src="https://cdn.prod.website-files.com/67634ad034d5ee18ab6c7752/6763930a0cec96451db53b1a_jason.jpg"
                    alt="Testimonial author"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="mb-4">
                  <h3 className="font-medium text-gray-900 mb-1">
                    Jason Walkow
                  </h3>
                  <p className="text-gray-500 text-sm">
                    Founder and CEO, Tallience
                  </p>
                </div>
              </div>
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-center items-center gap-12">
              <button
                onClick={() =>
                  setCurrentTestimonial((prev) => (prev === 0 ? 1 : 0))
                }
                className="w-10 h-10 rounded-full border border-gray-200 text-gray-400 flex items-center justify-center hover:bg-gray-50 hover:text-gray-600 transition-all"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <path d="M15 18l-6-6 6-6" />
                </svg>
              </button>
              <button
                onClick={() =>
                  setCurrentTestimonial((prev) => (prev === 0 ? 1 : 0))
                }
                className="w-10 h-10 rounded-full border border-gray-200 text-gray-400 flex items-center justify-center hover:bg-gray-50 hover:text-gray-600 transition-all"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 py-20">
        <div className="max-w-6xl mx-auto">
          <div className="bg-[#E5F4FF] rounded-3xl overflow-hidden">
            <div className="grid md:grid-cols-2 items-center gap-8 p-12">
              <div className="space-y-6">
                <h2 className="text-5xl font-bold text-[#0B1B35]">
                  Ready To Talk?
                </h2>
                <p className="text-gray-700 text-lg">
                  Your time is valuable. Let&apos;s get to know your culture and
                  needs so we can quickly begin delivering value.
                </p>
                <a
                  href="https://tidycal.com/jakemarmulstein/intro"
                  className="inline-block px-8 py-3 bg-[#0B1B35] text-white rounded-full hover:bg-opacity-90 transition-colors"
                >
                  Contact Us
                </a>
              </div>
              <div className="relative h-[400px]">
                <Image
                  src="https://cdn.prod.website-files.com/67634ad034d5ee18ab6c7752/676afcfbfa700f0bce970d70_pexels-thisisengineering-3861964%202.jpg"
                  alt="Laptop showing video call interface"
                  fill
                  className="object-cover rounded-xl"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-[#0B1B35] text-white py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
            <div>
              <h5 className="text-2xl font-semibold mb-6">Contact</h5>
              <div className="space-y-4">
                <a
                  href="https://maps.app.goo.gl/FTuH3KVSffRr9EW58"
                  className="block text-gray-300 hover:text-white transition-colors"
                >
                  222 W. Merchandise Mart Plaza,
                  <br />
                  Suite 1212, Chicago, IL 60654
                </a>
                <a
                  href="tel:(816)226-6643"
                  className="block text-gray-300 hover:text-white transition-colors"
                >
                  (816) 226-6643
                </a>
                <a
                  href="mailto:anu@hodltalent.xyz"
                  className="block text-gray-300 hover:text-white transition-colors"
                >
                  anu@hodltalent.xyz
                </a>
              </div>
            </div>
            <div>
              <h5 className="text-2xl font-semibold mb-6">Company</h5>
              <div className="space-y-4">
                <a
                  href="#our-difference"
                  className="block text-gray-300 hover:text-white transition-colors"
                >
                  Our Difference
                </a>
                <a
                  href="#our-work"
                  className="block text-gray-300 hover:text-white transition-colors"
                >
                  Our Work
                </a>
                <a
                  href="#our-clients"
                  className="block text-gray-300 hover:text-white transition-colors"
                >
                  Our Clients
                </a>
              </div>
            </div>
            <div>
              <h5 className="text-2xl font-semibold mb-6">
                Sign up for our free compensation guides!
              </h5>
              <form className="flex gap-2">
                <input
                  type="email"
                  placeholder="Enter your email address"
                  className="flex-1 px-4 py-2 bg-white/10 rounded-full focus:outline-none focus:ring-2 focus:ring-orange-300"
                />
                <button
                  type="submit"
                  className="p-2 bg-orange-300 rounded-full hover:bg-orange-400 transition-colors"
                >
                  <svg
                    className="w-6 h-6 text-[#0B1B35]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    />
                  </svg>
                </button>
              </form>
            </div>
          </div>
          <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-white/20">
            <Image
              src="https://cdn.prod.website-files.com/67634ad034d5ee18ab6c7752/67638af86bb6489e17d7d07d_Your%20paragraph%20text%20(1).svg"
              alt="HODL Talent"
              width={120}
              height={30}
            />
            <p className="text-gray-400 text-sm mt-4 md:mt-0">
              ©HODL Talent 2025. All Rights Reserved.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
