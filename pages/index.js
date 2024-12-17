import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openFAQs, setOpenFAQs] = useState({});
  const [isAboutModalOpen, setIsAboutModalOpen] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Replace useState with useEffect for localStorage
  useEffect(() => {
    // Only access localStorage after component mounts in browser
    const darkModePreference = localStorage.getItem("darkMode");
    if (darkModePreference !== null) {
      setIsDarkMode(darkModePreference === "true");
    }
  }, []);

  const toggleDarkMode = () => {
    const newDarkMode = !isDarkMode;
    setIsDarkMode(newDarkMode);
    // Only access localStorage in browser environment
    if (typeof window !== "undefined") {
      localStorage.setItem("darkMode", newDarkMode.toString());
    }
  };

  return (
    <div
      className={`min-h-screen flex flex-col ${
        isDarkMode ? "bg-gray-900 text-white" : "bg-gray-200 text-black"
      }`}
    >
      <div className="max-w-6xl min-w-6xl mx-auto w-full">
        {/* Header */}
        <header
          className={`border-2 ${
            isDarkMode ? "border-gray-700" : "border-gray-400"
          } rounded-md p-4 mb-3 mt-4`}
        >
          <div className="flex justify-between items-center">
            <Link href="/" className="text-xl font-bold text-blue-600">
              Webflow to Next.js
            </Link>
            <nav className="hidden sm:flex space-x-8 items-center">
              {["Features", "Pricing"].map((item) => (
                <Link
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className={`${
                    isDarkMode
                      ? "text-gray-300 hover:text-blue-400"
                      : "text-gray-600 hover:text-blue-600"
                  }`}
                >
                  {item}
                </Link>
              ))}
              <button
                onClick={() => setIsAboutModalOpen(true)}
                className={`${
                  isDarkMode
                    ? "text-gray-300 hover:text-blue-400"
                    : "text-gray-600 hover:text-blue-600"
                }`}
              >
                About
              </button>
              <Link
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  setIsContactModalOpen(true);
                }}
                className={`${
                  isDarkMode
                    ? "text-gray-300 hover:text-blue-400"
                    : "text-gray-600 hover:text-blue-600"
                }`}
              >
                Contact
              </Link>
            </nav>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="sm:hidden"
            >
              Menu
            </button>
          </div>
          {mobileMenuOpen && (
            <nav className="sm:hidden mt-4">
              {["Features", "Pricing"].map((item) => (
                <Link
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className={`block py-2 ${
                    isDarkMode
                      ? "text-gray-300 hover:text-blue-400"
                      : "text-gray-600 hover:text-blue-600"
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item}
                </Link>
              ))}
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setIsAboutModalOpen(true);
                }}
                className={`block w-full text-left py-2 ${
                  isDarkMode
                    ? "text-gray-300 hover:text-blue-400"
                    : "text-gray-600 hover:text-blue-600"
                }`}
              >
                About
              </button>
              <Link
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  setMobileMenuOpen(false);
                  setIsContactModalOpen(true);
                }}
                className={`block py-2 ${
                  isDarkMode
                    ? "text-gray-300 hover:text-blue-400"
                    : "text-gray-600 hover:text-blue-600"
                }`}
              >
                Contact
              </Link>
            </nav>
          )}
        </header>

        <main>
          {/* Hero */}
          <section
            className={`border-2 ${
              isDarkMode ? "border-gray-700" : "border-gray-400"
            } rounded-md p-8 mb-3 text-center`}
          >
            <h1 className="text-4xl font-bold mb-4">
              Convert Webflow to Next.js in Seconds
            </h1>
            <p
              className={`text-xl mb-3 ${
                isDarkMode ? "text-gray-300" : "text-gray-600"
              }`}
            >
              Transform your Webflow projects into powerful Next.js applications
              with our automated conversion tool. Get clean, optimized code that
              maintains your design while unlocking the full potential of
              Next.js features.
            </p>
            <a
              href="https://buy.stripe.com/dR615ybatepugXCfYY"
              className="inline-block bg-blue-600 text-white px-8 py-3 rounded-md font-semibold hover:bg-blue-700"
            >
              Start Converting
            </a>
          </section>

          {/* Features */}
          <section
            id="features"
            className={`border-2 ${
              isDarkMode ? "border-gray-700" : "border-gray-400"
            } rounded-md p-8 mb-3`}
          >
            <h2 className="text-3xl font-bold mb-6 text-center">
              Key Features
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                {
                  title: "Seamless Conversion",
                  description:
                    "Convert your Webflow site to Next.js with just a few clicks. No manual coding required.",
                  icon: "🔄",
                },
                {
                  title: "Design Fidelity",
                  description:
                    "Maintain pixel-perfect design accuracy during conversion. Your site will look exactly the same.",
                  icon: "🎨",
                },
                {
                  title: "Performance Boost",
                  description:
                    "Leverage Next.js optimization features for faster loading times and better SEO.",
                  icon: "⚡",
                },
                {
                  title: "React Integration",
                  description:
                    "Get clean, component-based React code that's easy to maintain and extend.",
                  icon: "⚛️",
                },
              ].map((feature) => (
                <div
                  key={feature.title}
                  className={`p-6 border-2 ${
                    isDarkMode ? "border-gray-700" : "border-gray-400"
                  } rounded-lg`}
                >
                  <div className="text-3xl mb-3">{feature.icon}</div>
                  <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                  <p className={isDarkMode ? "text-gray-300" : "text-gray-600"}>
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </section>
          {/*  */}

          {/* Pricing */}
          <section
            id="pricing"
            className={`border-2 ${
              isDarkMode ? "border-gray-700" : "border-gray-400"
            } rounded-md p-8 mb-3`}
          >
            <h2 className="text-3xl font-bold mb-8 text-center">
              Simple Pricing
            </h2>
            <div className="flex flex-col md:flex-row gap-8 justify-center max-w-4xl mx-auto">
              <div
                className={`flex-1 border-2 rounded-lg p-8 border-blue-600 shadow-lg relative ${
                  isDarkMode ? "bg-gray-800" : ""
                }`}
              >
                <div className="absolute -top-4 right-4 bg-blue-600 text-white px-4 py-1 rounded-full text-sm">
                  Most Popular
                </div>
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold mb-2">Single Page</h3>
                  <p className="text-4xl font-bold mb-4 text-blue-600">$50</p>
                  <p className="text-blue-600 font-bold text-xl bg-yellow-100 mb-2 inline-block px-4 py-1 rounded-full">
                    One-time payment
                  </p>
                  <p
                    className={
                      isDarkMode ? "text-gray-300 mt-2" : "text-gray-600 mt-2"
                    }
                  >
                    Perfect for landing pages and simple websites
                  </p>
                </div>

                <ul className="space-y-3 mb-8">
                  {[
                    "One page conversion",
                    "Mobile responsiveness",
                    "SEO optimization",
                    "Fast delivery (5-10 minutes)",
                  ].map((feature) => (
                    <li
                      key={feature}
                      className={`flex items-center ${
                        isDarkMode ? "text-gray-300" : "text-gray-600"
                      }`}
                    >
                      <svg
                        className="w-5 h-5 mr-2 text-green-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>

                <a
                  href="https://buy.stripe.com/dR615ybatepugXCfYY"
                  className="block w-full bg-blue-600 text-white text-center px-6 py-3 rounded-md hover:bg-blue-700 transition-colors font-semibold"
                >
                  Get Started
                </a>
              </div>

              <div
                className={`flex-1 border-2 rounded-lg p-8 ${
                  isDarkMode
                    ? "border-gray-700 bg-gray-800"
                    : "border-gray-400 "
                } shadow-sm`}
              >
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold mb-2">Multiple Pages</h3>
                  <p className="text-4xl font-bold mb-4 text-blue-600">
                    Custom
                  </p>
                  <p className="text-blue-600 font-bold text-xl bg-yellow-100 mb-2 inline-block px-4 py-1 rounded-full">
                    One-time payment
                  </p>
                  <p
                    className={
                      isDarkMode ? "text-gray-300 mt-2" : "text-gray-600 mt-2"
                    }
                  >
                    For larger websites and complex projects
                  </p>
                </div>

                <ul className="space-y-3 mb-8">
                  {[
                    "Multiple page conversion",
                    "Mobile responsiveness",
                    "Advanced SEO optimization",
                    "Priority delivery",
                    "Technical consultation",
                    "Performance optimization",
                  ].map((feature) => (
                    <li
                      key={feature}
                      className={`flex items-center ${
                        isDarkMode ? "text-gray-300" : "text-gray-600"
                      }`}
                    >
                      <svg
                        className="w-5 h-5 mr-2 text-green-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>

                <a
                  href="https://forms.gle/pU4meTYcVE51iHkr7"
                  className="block w-full bg-blue-600 text-white text-center px-6 py-3 rounded-md hover:bg-blue-700 transition-colors font-semibold"
                >
                  Contact Us
                </a>
              </div>
            </div>
          </section>
          {/*  */}

          {/* Testimonials */}
          <section
            id="testimonials"
            className={`border-2 ${
              isDarkMode ? "border-gray-700" : "border-gray-400"
            } rounded-md p-8 mb-3`}
          >
            <h2 className="text-3xl font-bold mb-6 text-center">
              Testimonials
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                {
                  quote:
                    "I never knew converting files could be so energy-efficient. My electricity bill has never looked better!",
                  author: "— Person with suspiciously low electricity bill",
                  image: "/happy-man.jpg",
                },
                {
                  quote:
                    "The file converter is my precious! It's so easy to use, even a hobbit could do it.",
                  author: "— Gollum, ring enthusiast",
                  image: "/gollum.jpg",
                },
                {
                  quote:
                    "After using this converter, I found a portal to Narnia in my closet. The hosting savings must be magical!",
                  author: "— Lucy Pevensie, Queen of Narnia",
                  image: "/queen.jpg",
                },
                {
                  quote:
                    "After using this converter, I found $20 in my pocket that I didn't know I had. It must be all the money I'm saving on hosting!",
                  author: "— Satisfied customer",
                  image: "/happy-girl.jpg",
                },
              ].map((testimonial, index) => (
                <div
                  key={index}
                  className={`p-6 border-2 ${
                    isDarkMode ? "border-gray-700" : "border-gray-400"
                  } rounded-lg`}
                >
                  {testimonial.image && (
                    <div className="w-24 h-24 mx-auto mb-4 relative">
                      <Image
                        src={testimonial.image}
                        alt="Testimonial"
                        fill
                        className="rounded-full object-cover"
                      />
                    </div>
                  )}
                  <p
                    className={`text-lg italic mb-4 ${
                      isDarkMode ? "text-gray-300" : "text-gray-600"
                    }`}
                  >
                    {testimonial.quote}
                  </p>
                  <p
                    className={`${
                      isDarkMode ? "text-gray-300" : "text-gray-600"
                    } font-semibold`}
                  >
                    {testimonial.author}
                  </p>
                </div>
              ))}
            </div>
          </section>
          {/*  */}

          {/* FAQs */}
          <section
            id="faq"
            className={`border-2 ${
              isDarkMode ? "border-gray-700" : "border-gray-400"
            } rounded-md p-8 mb-3`}
          >
            <h2 className="text-3xl font-bold mb-6 text-center">
              Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              {[
                {
                  question:
                    "What's the difference between converting manually vs using your service?",
                  answer:
                    "Manual conversion requires extensive knowledge of both Webflow and Next.js, significant development time, and careful attention to maintaining design fidelity. Our service automates this process, handling the technical complexities while preserving your design, saving you weeks of development time and potential headaches. We also ensure best practices are followed and provide thorough testing of the converted site.",
                },
                {
                  question: "Is my Webflow site too complex to convert?",
                  answer:
                    "We've successfully converted a wide range of Webflow sites, from simple landing pages to complex multi-page applications. Our conversion process can handle custom animations, interactions, CMS integrations, and complex layouts. If your site has any particularly unique features, we'll assess them during our initial review and communicate any specific considerations.",
                },
                {
                  question:
                    "Will my SEO rankings be affected by the conversion?",
                  answer:
                    "When done correctly, converting to Next.js should actually improve your SEO rankings. We maintain all your existing meta tags, URLs, and content structure while leveraging Next.js's superior SEO capabilities like automatic static generation and server-side rendering. We also implement proper redirects and ensure all SEO best practices are followed during the conversion.",
                },
                {
                  question:
                    "What kind of performance improvements can I expect?",
                  answer:
                    "Next.js sites typically show significant performance improvements over Webflow sites. You can expect faster page load times due to server-side rendering, improved Core Web Vitals scores, better mobile performance, and reduced server costs. Many of our clients see Google PageSpeed scores improve by 20-40 points after conversion.",
                },
                {
                  question:
                    "What happens to my Webflow interactions and animations?",
                  answer:
                    "We carefully recreate all your Webflow interactions and animations in Next.js using modern animation libraries like Framer Motion or GSAP. In many cases, we can even improve the performance and smoothness of these animations. Complex interactions are thoroughly tested to ensure they match or exceed the original Webflow implementation.",
                },
                {
                  question: "Is there a size limit for sites you can convert?",
                  answer:
                    "There's no strict size limit for sites we can convert. We've successfully handled sites ranging from single-page applications to large multi-page websites with hundreds of pages and complex CMS structures. The conversion timeline may vary based on size and complexity, but we'll provide a detailed estimate after reviewing your site.",
                },

                {
                  question:
                    "How long does the conversion process typically take?",
                  answer:
                    "The conversion time varies depending on the complexity and size of your Webflow project. Simple websites can be converted within a few hours, while more complex sites with custom interactions may take a few days. We provide estimated timelines for each project after an initial assessment.",
                },
                {
                  question:
                    "Do I need to know Next.js to use the converted project?",
                  answer:
                    "While having knowledge of Next.js is beneficial, it's not strictly necessary to use the converted project. The basic structure and functionality will be set up for you. However, for further customization, adding new features, or optimizing performance, familiarity with Next.js and React would be advantageous. We provide documentation and support to help you get started with your converted project.",
                },
                {
                  question:
                    "Can I still use Webflow's CMS after converting to Next.js?",
                  answer:
                    "While you can't directly use Webflow's CMS after conversion, you can set up a headless CMS that integrates with your Next.js site. This allows you to maintain a similar content management workflow while benefiting from Next.js's performance and flexibility. Popular options include Contentful, Sanity, or Strapi.",
                },
                {
                  question:
                    "What are the main benefits of converting from Webflow to Next.js?",
                  answer:
                    "Converting to Next.js offers several advantages: improved performance through server-side rendering and static site generation, better SEO capabilities, the ability to add complex functionality using React, easier integration with APIs and databases, and the flexibility to scale your application as your needs grow. It also opens up a vast ecosystem of React libraries and tools.",
                },
              ].map((faq, index) => {
                return (
                  <div
                    key={index}
                    className={`border-2 ${
                      isDarkMode ? "border-gray-700" : "border-gray-400"
                    } rounded-lg overflow-hidden`}
                  >
                    <button
                      onClick={() =>
                        setOpenFAQs((prev) => ({
                          ...prev,
                          [index]: !prev[index],
                        }))
                      }
                      className="w-full p-6 text-left flex justify-between items-center transition-colors duration-200"
                    >
                      <h3 className="text-xl font-bold">{faq.question}</h3>
                      <svg
                        className={`w-6 h-6 transform transition-transform duration-200 ${
                          openFAQs[index] ? "rotate-180" : ""
                        }`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </button>
                    <div
                      className={`transition-all duration-200 ease-in-out ${
                        openFAQs[index]
                          ? "max-h-96 opacity-100"
                          : "max-h-0 opacity-0"
                      }`}
                    >
                      <p
                        className={`px-6 pb-6 ${
                          isDarkMode ? "text-gray-300" : "text-gray-600"
                        }`}
                      >
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
          {/*  */}
        </main>

        <footer
          className={`border-2 ${
            isDarkMode ? "border-gray-700" : "border-gray-400"
          } rounded-md p-4 text-center mb-6`}
        >
          <div className="flex justify-center items-center gap-4">
            <p>
              &copy; {new Date().getFullYear()} Webflow to Next.js Converter |{" "}
              Created by&nbsp;
              <a
                href="https://www.joshmmay.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600"
              >
                Josh May
              </a>
            </p>
            <button
              onClick={toggleDarkMode}
              className={`p-2 rounded-md ${
                isDarkMode
                  ? "bg-gray-700 text-yellow-300"
                  : "bg-gray-300 text-gray-700"
              }`}
            >
              {isDarkMode ? "☀️" : "🌙"}
            </button>
          </div>
        </footer>
      </div>

      {/* Add the modal */}
      {isAboutModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div
            className={`${
              isDarkMode ? "bg-gray-800" : ""
            } p-8 rounded-lg max-w-md relative`}
          >
            <button
              onClick={() => setIsAboutModalOpen(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            <h2 className="text-2xl font-bold mb-4">About This Project</h2>
            <p className={isDarkMode ? "text-gray-300" : "text-gray-600"}>
              I built this tool to scratch my own itch. I was trying to convert
              a client&apos;s product page from Webflow to Next.js and
              couldn&apos;t find anything great so... Walaaa! 😊
              <br />
              <br />-
              <a
                href="https://www.joshmmay.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600"
              >
                Josh May
              </a>
            </p>
          </div>
        </div>
      )}

      {isContactModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div
            className={`${
              isDarkMode ? "bg-gray-800" : ""
            } p-8 rounded-lg max-w-md relative`}
          >
            <button
              onClick={() => setIsContactModalOpen(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            <h2 className="text-2xl font-bold mb-4">Contact Me</h2>
            <p className={isDarkMode ? "text-gray-300" : "text-gray-600"}>
              You can reach me at:{" "}
              <a
                href="mailto:hey@joshmmay.com"
                className="text-blue-600 hover:text-blue-700"
              >
                hey@joshmmay.com
              </a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
