import Link from "next/link";
import { getSortedPostsData } from "../../lib/posts";
import { useState } from "react";

export default function BlogIndex({ posts }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-white shadow">
        <div className="container mx-auto px-4 sm:px-6 py-4 sm:py-5 flex justify-between items-center">
          <Link
            href="/"
            className="text-xl sm:text-2xl font-bold text-blue-600"
          >
            Webflow to Next.js Converter
          </Link>
          <nav className="hidden sm:block">
            <ul className="flex space-x-6">
              {["Features", "Pricing"].map((item) => (
                <li key={item}>
                  <Link
                    href={`#${item.toLowerCase()}`}
                    className="text-base sm:text-lg text-gray-700 hover:text-blue-600"
                  >
                    {item}
                  </Link>
                </li>
              ))}
              <li>
                <button
                  onClick={() => openModal("about")}
                  className="text-base sm:text-lg text-gray-700 hover:text-blue-600"
                >
                  About
                </button>
              </li>
              <li>
                <button
                  onClick={() => openModal("contact")}
                  className="text-base sm:text-lg text-gray-700 hover:text-blue-600"
                >
                  Contact
                </button>
              </li>
            </ul>
          </nav>
          <div className="sm:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-gray-700 hover:text-blue-600"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
        {mobileMenuOpen && (
          <nav className="sm:hidden mt-4 pb-4">
            <ul className="flex flex-col space-y-2">
              {["Features", "Pricing"].map((item) => (
                <li key={item}>
                  <Link
                    href={`#${item.toLowerCase()}`}
                    className="block text-base text-gray-700 hover:text-blue-600"
                  >
                    {item}
                  </Link>
                </li>
              ))}
              <li>
                <button
                  onClick={() => openModal("about")}
                  className="block text-left w-full text-base text-gray-700 hover:text-blue-600"
                >
                  About
                </button>
              </li>
              <li>
                <button
                  onClick={() => openModal("contact")}
                  className="block text-left w-full text-base text-gray-700 hover:text-blue-600"
                >
                  Contact
                </button>
              </li>
            </ul>
          </nav>
        )}
      </header>

      <main className="flex-grow container mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <section className="text-center pb-16 border-b border-gray-300">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 text-gray-900">
            Blog
          </h1>
          <p className="text-lg sm:text-xl lg:text-2xl text-gray-600 mb-6 sm:mb-8 max-w-3xl mx-auto">
            Explore our latest articles on Webflow to Next.js conversion, web
            development tips, and more.
          </p>
        </section>

        <section className="py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <Link href={`/blog/${post.slug}`} key={post.slug}>
                <div className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow duration-300">
                  <h2 className="text-xl font-semibold mb-2 text-gray-900">
                    {post.title}
                  </h2>
                  <p className="text-gray-600 mb-4">{post.excerpt}</p>
                  <span className="text-blue-600 font-semibold">
                    Read more →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>

      <footer className="bg-gray-100 py-6 text-gray-600">
        <div className="container mx-auto px-4">
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <div className="mb-4 sm:mb-0 flex items-center space-x-2">
              <span>
                &copy; {new Date().getFullYear()} Webflow to Next.js Converter
              </span>
              <span className="text-gray-400">|</span>
              <a
                href="https://www.joshmay.xyz/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-600 transition-colors duration-300 flex items-center"
              >
                <span>Created by Josh May</span>
                <span className="ml-1" role="img" aria-label="Unicorn">
                  🦄💨
                </span>
              </a>
            </div>
            <nav>
              <ul className="flex space-x-4">
                <li>
                  <Link href="/#" className="hover:text-blue-600">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/#" className="hover:text-blue-600">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <button
                    onClick={() => openModal("contact")}
                    className="hover:text-blue-600"
                  >
                    Contact
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </footer>
    </div>
  );
}

export async function getStaticProps() {
  const posts = getSortedPostsData();
  return {
    props: {
      posts,
    },
  };
}
