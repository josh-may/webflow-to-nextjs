import Link from "next/link";
import { useState, useEffect } from "react";

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openFAQs, setOpenFAQs] = useState({});
  const [isAboutModalOpen, setIsAboutModalOpen] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
  const [webflowUrl, setWebflowUrl] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [submitModalStep, setSubmitModalStep] = useState(1);

  useEffect(() => {
    const darkModePreference = localStorage.getItem("darkMode");
    if (darkModePreference !== null) {
      setIsDarkMode(darkModePreference === "true");
    }
  }, []);

  const toggleDarkMode = () => {
    const newDarkMode = !isDarkMode;
    setIsDarkMode(newDarkMode);
    if (typeof window !== "undefined") {
      localStorage.setItem("darkMode", newDarkMode.toString());
    }
  };

  const handleConvertClick = (e) => {
    e.preventDefault();
    if (!webflowUrl) return;
    // Enhanced URL validation
    if (isValidWebflowUrl(webflowUrl)) {
      setIsSubmitModalOpen(true);
    } else {
      alert("Please enter a valid URL");
    }
  };

  const isValidWebflowUrl = (url) => {
    try {
      // Add https:// if no protocol is specified
      const urlToCheck = url.startsWith("http") ? url : `https://${url}`;
      const parsedUrl = new URL(urlToCheck);
      // Allow any valid URL
      return true;
    } catch (err) {
      return false;
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setSubmitModalStep(2);
  };

  const handleInputSubmit = (e) => {
    if (e.key === "Enter" && webflowUrl) {
      e.preventDefault();
      if (isValidWebflowUrl(webflowUrl)) {
        setIsSubmitModalOpen(true);
      } else {
        alert("Please enter a valid URL");
      }
    }
  };

  return (
    <div
      className={`min-h-screen flex flex-col ${
        isDarkMode ? "bg-zinc-950 text-white" : "bg-zinc-100 text-black"
      }`}
    >
      <div className="max-w-7xl min-w-6xl mx-auto w-full">
        {/* Header */}
        <header
          className={`border-2 ${
            isDarkMode
              ? "border-zinc-600 bg-zinc-800"
              : "border-zinc-300 bg-white"
          } rounded-sm p-5 mb-3 mt-4 shadow-md`}
        >
          <div className="flex justify-between items-center">
            <Link href="/" className="text-xl font-bold ">
              Webflow to Next.js Converter
            </Link>
            <nav className="hidden sm:flex space-x-8 items-center">
              {["Features"].map((item) => (
                <Link
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className={`${
                    isDarkMode
                      ? "text-zinc-300 hover:text-green-400"
                      : "text-zinc-600 hover:text-green-600"
                  }`}
                >
                  {item}
                </Link>
              ))}
              <button
                onClick={() => setIsAboutModalOpen(true)}
                className={`${
                  isDarkMode
                    ? "text-zinc-300 hover:text-green-400"
                    : "text-zinc-600 hover:text-green-600"
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
                    ? "text-zinc-300 hover:text-green-400"
                    : "text-zinc-600 hover:text-green-600"
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
                      ? "text-zinc-300 hover:text-green-400"
                      : "text-zinc-600 hover:text-green-600"
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
                    ? "text-zinc-300 hover:text-green-400"
                    : "text-zinc-600 hover:text-green-600"
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
                    ? "text-zinc-300 hover:text-green-400"
                    : "text-zinc-600 hover:text-green-600"
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
              isDarkMode
                ? "border-zinc-600 bg-zinc-800"
                : "border-zinc-300 bg-white"
            } rounded-sm p-4 sm:p-8 mb-3 text-center shadow-md`}
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 sm:mb-6 mt-3 sm:mt-5 max-w-5xl mx-auto">
              Webflow to Next.js Converter
            </h1>
            <p
              className={`text-lg sm:text-xl mb-4 sm:mb-5 max-w-4xl mx-auto px-2 sm:px-0 ${
                isDarkMode ? "text-zinc-300" : "text-zinc-600"
              }`}
            >
              Transform your Webflow projects into powerful Next.js
              applications. Get clean, optimized code that maintains your design
              while unlocking the full potential of Next.js features.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center items-center max-w-2xl mx-auto">
              <input
                type="url"
                value={webflowUrl}
                onChange={(e) => setWebflowUrl(e.target.value)}
                onKeyDown={handleInputSubmit}
                placeholder="Enter your URL"
                pattern="https:\/\/.*\.webflow\.(io|com).*"
                required
                className={`flex-1 w-full sm:w-auto px-4 py-2 sm:py-3 rounded-sm ${
                  isDarkMode
                    ? "bg-zinc-900 border-zinc-700 text-white"
                    : "bg-white border-zinc-300 text-black"
                } border-2 focus:outline-none focus:border-green-600`}
              />
              <button
                onClick={handleConvertClick}
                className="w-full sm:w-auto bg-green-700 text-base sm:text-lg text-white px-6 sm:px-8 py-2 sm:py-3 rounded-sm font-semibold hover:bg-green-800"
              >
                Convert Now
              </button>
            </div>
          </section>

          {/* Features */}
          <section
            id="features"
            className={`border-2 ${
              isDarkMode
                ? "border-zinc-600 bg-zinc-800"
                : "border-zinc-300 bg-white"
            } rounded-sm p-8 mb-3 shadow-md`}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                {
                  title: "Seamless Conversion",
                  description:
                    "Convert your Webflow site to Next.js with just a few clicks. Our automated process handles all the heavy lifting while maintaining your site's functionality.",
                  icon: "🔄",
                  benefits: [
                    "Automated conversion process",
                    "Preserves all functionality",
                    "Quick turnaround time",
                  ],
                },
                {
                  title: "Design Fidelity",
                  description:
                    "Maintain pixel-perfect design accuracy during conversion. Every animation, interaction, and styling detail is meticulously preserved.",
                  icon: "🎨",
                  benefits: [
                    "Exact visual match",
                    "Preserved animations",
                    "Responsive layouts",
                  ],
                },
                {
                  title: "Performance Optimization",
                  description:
                    "Leverage Next.js's powerful features for significantly faster loading times, improved Core Web Vitals, and better SEO rankings.",
                  icon: "⚡",
                  benefits: [
                    "Faster page loads",
                    "Better Core Web Vitals",
                    "Improved SEO scores",
                  ],
                },
                {
                  title: "Next.js Architecture",
                  description:
                    "Get clean, modular Next.js code following best practices. Easily maintain and extend your site with modern development workflows.",
                  icon: "⚛️",
                  benefits: [
                    "Component-based structure",
                    "Modern Next.js patterns",
                    "Extensible codebase",
                  ],
                },
                {
                  title: "SEO Enhancement",
                  description:
                    "Boost your search engine rankings with Next.js-optimized code and improved performance metrics.",
                  icon: "🎯",
                  benefits: [
                    "Meta tag optimization",
                    "Fast loading times",
                    "Search engine friendly",
                  ],
                },
                {
                  title: "Developer Experience",
                  description:
                    "Work with clean, well-documented code that follows Next.js best practices and modern development standards.",
                  icon: "👨‍💻",
                  benefits: [
                    "Clean code structure",
                    "Detailed documentation",
                    "Industry best practices",
                  ],
                },
              ].map((feature) => (
                <div
                  key={feature.title}
                  className={`p-6 border-2 ${
                    isDarkMode
                      ? "border-zinc-700 bg-zinc-900"
                      : "border-zinc-300 bg-zinc-50"
                  } rounded-lg shadow-md`}
                >
                  <h3 className="text-xl font-bold mb-2 flex items-center gap-2">
                    <span>{feature.title}</span>
                    <span>{feature.icon}</span>
                  </h3>
                  <p
                    className={`${
                      isDarkMode ? "text-zinc-300" : "text-zinc-600"
                    } mb-4`}
                  >
                    {feature.description}
                  </p>
                  <ul
                    className={`list-disc pl-5 ${
                      isDarkMode ? "text-zinc-400" : "text-zinc-500"
                    }`}
                  >
                    {feature.benefits.map((benefit, index) => (
                      <li key={index} className="mb-1">
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>
          {/*  */}

          {/* FAQs */}
          <section
            id="faq"
            className={`border-2 ${
              isDarkMode
                ? "border-zinc-600 bg-zinc-800"
                : "border-zinc-300 bg-white"
            } rounded-sm p-8 mb-3 shadow-md`}
          >
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
                    "When done correctly, converting to Next.js should actually improve your SEO rankings. We maintain all your existing meta tags, URLs, and content structure while leveraging Next.js's superior SEO capabilities. We also implement proper greenirects and ensure all SEO best practices are followed during the conversion.",
                },
                {
                  question:
                    "What kind of performance improvements can I expect?",
                  answer:
                    "Next.js sites typically show significant performance improvements over Webflow sites. You can expect faster page load times, improved Core Web Vitals scores, better mobile performance, and greenuced server costs. Many of our clients see Google PageSpeed scores improve by 20-40 points after conversion.",
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
                    "There's no strict size limit for sites we can convert. We've successfully handled sites ranging from single-page applications to large multi-page websites with greens of pages and complex CMS structures. The conversion timeline may vary based on size and complexity, but we'll provide a detailed estimate after reviewing your site.",
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
                    "While having knowledge of Next.js is beneficial, it's not strictly necessary to use the converted project. The basic structure and functionality will be set up for you. However, for further customization, adding new features, or optimizing performance, familiarity with Next.js would be advantageous. We provide documentation and support to help you get started with your converted project.",
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
                    "Converting to Next.js offers several advantages: improved performance through modern rendering techniques, better SEO capabilities, the ability to add complex functionality using Next.js, easier integration with APIs and databases, and the flexibility to scale your application as your needs grow. It also opens up a vast ecosystem of Next.js libraries and tools.",
                },
              ].map((faq, index) => {
                return (
                  <div
                    key={index}
                    className={`border-2 ${
                      isDarkMode
                        ? "border-zinc-700 bg-zinc-900"
                        : "border-zinc-300 bg-zinc-50"
                    } rounded-lg overflow-hidden shadow-md`}
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
                          isDarkMode ? "text-zinc-300" : "text-zinc-600"
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
            isDarkMode
              ? "border-zinc-600 bg-zinc-800"
              : "border-zinc-300 bg-white"
          } rounded-sm p-4 text-center mb-6 shadow-md`}
        >
          <div className="flex justify-center items-center gap-4">
            <p>
              &copy; {new Date().getFullYear()} Webflow to Next.js Converter |{" "}
              Created by&nbsp;
              <a
                href="https://www.joshmmay.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-green-600"
              >
                Josh May
              </a>
            </p>
            |
            <button
              onClick={toggleDarkMode}
              className={`p-2 rounded-sm ${
                isDarkMode ? " text-yellow-300" : "text-zinc-700"
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
              isDarkMode ? "bg-zinc-800" : "bg-white"
            } p-8 rounded-lg max-w-md relative shadow-xl`}
          >
            <button
              onClick={() => setIsAboutModalOpen(false)}
              className="absolute top-4 right-4 text-zinc-500 hover:text-zinc-700"
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
            <p className={isDarkMode ? "text-zinc-300" : "text-zinc-600"}>
              I built this tool to scratch my own itch. I was trying to convert
              a client&apos;s product page from Webflow to Next.js and
              couldn&apos;t find anything great so... Walaaa! 😊
              <br />
              <br />-
              <a
                href="https://www.joshmmay.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-green-600"
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
              isDarkMode ? "bg-zinc-800" : "bg-white"
            } p-8 rounded-lg max-w-md relative shadow-xl`}
          >
            <button
              onClick={() => setIsContactModalOpen(false)}
              className="absolute top-4 right-4 text-zinc-500 hover:text-zinc-700"
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
            <p className={isDarkMode ? "text-zinc-300" : "text-zinc-600"}>
              You can reach me at:{" "}
              <a
                href="mailto:hey@joshmmay.com"
                className="text-green-600 hover:text-green-700"
              >
                hey@joshmmay.com
              </a>
            </p>
          </div>
        </div>
      )}

      {isSubmitModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
          <div
            className={`${
              isDarkMode ? "bg-zinc-800" : "bg-white"
            } p-12 rounded-lg ${
              submitModalStep === 1 ? "max-w-2xl" : "max-w-5xl"
            } w-full relative shadow-xl mx-4`}
          >
            <button
              onClick={() => {
                setIsSubmitModalOpen(false);
                setSubmitModalStep(1);
              }}
              className="absolute top-6 right-6 text-zinc-500 hover:text-zinc-700"
            >
              <svg
                className="w-8 h-8"
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

            {submitModalStep === 1 ? (
              <>
                <h2 className="text-3xl font-bold mb-8">
                  Where should we send your code?
                </h2>

                <form onSubmit={handleFormSubmit} className="space-y-6">
                  <div>
                    <div className="flex items-center mb-1">
                      <span className="text-red-500 mr-1">*</span>
                      <label
                        className={
                          isDarkMode ? "text-zinc-300" : "text-zinc-600"
                        }
                      >
                        Name
                      </label>
                    </div>
                    <input
                      type="text"
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                      placeholder="Your name..."
                      required
                      className={`w-full px-6 py-4 text-lg rounded-sm ${
                        isDarkMode
                          ? "bg-zinc-900 border-zinc-700 text-white"
                          : "bg-white border-zinc-300 text-black"
                      } border-2 focus:outline-none focus:border-green-600`}
                    />
                  </div>

                  <div>
                    <div className="flex items-center mb-1">
                      <span className="text-red-500 mr-1">*</span>
                      <label
                        className={
                          isDarkMode ? "text-zinc-300" : "text-zinc-600"
                        }
                      >
                        Email
                      </label>
                    </div>
                    <input
                      type="email"
                      value={userEmail}
                      onChange={(e) => setUserEmail(e.target.value)}
                      placeholder="Your email..."
                      required
                      className={`w-full px-6 py-4 text-lg rounded-sm ${
                        isDarkMode
                          ? "bg-zinc-900 border-zinc-700 text-white"
                          : "bg-white border-zinc-300 text-black"
                      } border-2 focus:outline-none focus:border-green-600`}
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-green-700 text-white px-8 py-4 text-lg rounded-sm font-semibold hover:bg-green-800"
                  >
                    Submit
                  </button>
                </form>
              </>
            ) : (
              <>
                <h2 className="text-3xl font-bold mb-8">Select Your Package</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div
                    className={`p-6 border-2 rounded-lg ${
                      isDarkMode
                        ? "border-zinc-700 bg-zinc-900"
                        : "border-zinc-300 bg-zinc-50"
                    } flex flex-col h-full`}
                  >
                    <div className="mb-4">
                      <h3 className="text-2xl font-bold mb-2">
                        Single Page Conversion
                      </h3>
                      <div className="mb-4">
                        <span className="text-3xl font-bold text-green-600">
                          $39
                        </span>
                        <span
                          className={`ml-2 ${
                            isDarkMode ? "text-zinc-400" : "text-zinc-600"
                          }`}
                        >
                          one-time payment
                        </span>
                      </div>
                      <p
                        className={`mb-6 ${
                          isDarkMode ? "text-zinc-300" : "text-zinc-600"
                        }`}
                      >
                        Perfect for landing pages or simple websites
                      </p>
                    </div>

                    <div className="mb-6 flex-grow">
                      <ul className="space-y-3">
                        {[
                          "One page conversion",
                          "SEO optimization",
                          "Fast delivery",
                          "Clean code",
                          "Modern Next.js best practices",
                        ].map((feature) => (
                          <li key={feature} className="flex items-center">
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
                            <span
                              className={
                                isDarkMode ? "text-zinc-300" : "text-zinc-600"
                              }
                            >
                              {feature}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <a
                      href="https://buy.stripe.com/bIYdSka6p3KQ22IeUW"
                      className="block w-full bg-green-600 text-white text-center px-6 py-4 rounded-sm hover:bg-green-700 transition-colors font-semibold"
                    >
                      Get Started
                    </a>
                  </div>

                  <div
                    className={`p-6 border-2 rounded-lg ${
                      isDarkMode
                        ? "border-zinc-700 bg-zinc-900"
                        : "border-zinc-300 bg-zinc-50"
                    } flex flex-col h-full`}
                  >
                    <div className="mb-4">
                      <h3 className="text-2xl font-bold mb-2">
                        Multiple Pages
                      </h3>
                      <div className="mb-4">
                        <span className="text-3xl font-bold text-green-600">
                          Custom
                        </span>
                        <span
                          className={`ml-2 ${
                            isDarkMode ? "text-zinc-400" : "text-zinc-600"
                          }`}
                        >
                          based on project scope
                        </span>
                      </div>
                      <p
                        className={`mb-6 ${
                          isDarkMode ? "text-zinc-300" : "text-zinc-600"
                        }`}
                      >
                        For larger websites and complex projects
                      </p>
                    </div>

                    <div className="mb-6 flex-grow">
                      <ul className="space-y-3">
                        {[
                          "Multiple page conversion",
                          "Priority support",
                          "Performance optimization",
                          "Integration support",
                        ].map((feature) => (
                          <li key={feature} className="flex items-center">
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
                            <span
                              className={
                                isDarkMode ? "text-zinc-300" : "text-zinc-600"
                              }
                            >
                              {feature}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <a
                      href="https://forms.gle/pU4meTYcVE51iHkr7"
                      className="block w-full bg-green-600 text-white text-center px-6 py-4 rounded-sm hover:bg-green-700 transition-colors font-semibold"
                    >
                      Contact for Quote
                    </a>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
