//import Footer from "../components/footer";
import Navbar from "../components/navbar";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gray-900 text-white ">
      <Navbar />

      <section className="flex items-center justify-center px-6 py-24">
        <div className="w-full max-w-xl bg-gray-800 p-10 rounded-xl shadow-lg">
          <h1 className="text-4xl font-extrabold text-center mb-6">
            Get in <span className="text-teal-400">Touch</span>
          </h1>
          <p className="text-center text-gray-300 mb-10">
            Have questions or want to learn more? Fill out the form below and our team will get back to you shortly.
          </p>

          <form className="space-y-6">
            <input
              type="text"
              placeholder="Your Name"
              className="w-full p-4 rounded-lg bg-gray-700 text-white border border-gray-600 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500"
              required
            />

            <input
              type="email"
              placeholder="Your Email"
              className="w-full p-4 rounded-lg bg-gray-700 text-white border border-gray-600 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500"
              required
            />

            <textarea
              rows="5"
              placeholder="Your Message"
              className="w-full p-4 rounded-lg bg-gray-700 text-white border border-gray-600 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500"
              required
            ></textarea>

            <button
              type="submit"
              className="w-full bg-teal-500 hover:bg-teal-600 text-white font-semibold py-3 rounded-lg transition"
            >
              Send Message
            </button>
          </form>
        </div>
      </section>
      {/* <div className="border-t border-teal-500 py-6 mt-10">
      <Footer />
      </div> */}
      

    </div>
  );
}
