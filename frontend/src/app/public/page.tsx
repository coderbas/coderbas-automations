// src/app/page.tsx
import Head from 'next/head';
import Link from 'next/link';

export default function Home() {
  return (
    <>
      <Head>
        <title>Coderbas Automations – Empowering Your Growth</title>
        <meta name="description" content="Discover how our cutting-edge automation tools can transform your business." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="min-h-screen flex flex-col">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
          <div className="max-w-6xl mx-auto px-4 py-20 text-center">
            <h1 className="text-5xl md:text-6xl font-extrabold mb-6">
              Welcome to Coderbas Automations
            </h1>
            <p className="text-xl md:text-2xl mb-8">
              Discover how our advanced automation tools can optimize and transform your business.
            </p>
            <div>
              {/* Link to login so new users can get started */}
              <Link href="/public/login" legacyBehavior>
                <a className="bg-white text-blue-600 font-bold px-8 py-4 rounded-full shadow-lg hover:bg-gray-100 transition">
                  Get Started
                </a>
              </Link>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Why Choose Us?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Feature 1 */}
              <div className="bg-white p-8 rounded-lg shadow-md text-center">
                <div className="mb-4">
                  <svg
                    className="w-12 h-12 mx-auto text-blue-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M13 7H7v6h6V7z" />
                    <path
                      fillRule="evenodd"
                      d="M5 3a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2V5a2 2 0 00-2-2H5zm10 12H5V5h10v10z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Efficient Automation</h3>
                <p className="text-gray-600">
                  Streamline your operations with cutting-edge automation tools.
                </p>
              </div>
              {/* Feature 2 */}
              <div className="bg-white p-8 rounded-lg shadow-md text-center">
                <div className="mb-4">
                  <svg
                    className="w-12 h-12 mx-auto text-blue-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 3a1 1 0 01.894.553l6 10A1 1 0 0116 15H4a1 1 0 01-.894-1.447l6-10A1 1 0 0110 3z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Real-Time Analytics</h3>
                <p className="text-gray-600">
                  Monitor your performance with powerful analytics and insights.
                </p>
              </div>
              {/* Feature 3 */}
              <div className="bg-white p-8 rounded-lg shadow-md text-center">
                <div className="mb-4">
                  <svg
                    className="w-12 h-12 mx-auto text-blue-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h4l2 2 2-2h4a2 2 0 002-2V5a2 2 0 00-2-2H4z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Secure & Reliable</h3>
                <p className="text-gray-600">
                  Built with state-of-the-art security and reliability in mind.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Call To Action Section */}
        <section className="bg-blue-600 text-white py-16">
          <div className="max-w-6xl mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to transform your business?</h2>
            <p className="mb-8 text-lg">
              Join us today and harness the power of automation and insights.
            </p>
            <Link href="/public/register" legacyBehavior>
              <a className="bg-white text-blue-600 font-bold px-8 py-4 rounded-full shadow-lg hover:bg-gray-100 transition">
                Get Started
              </a>
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
