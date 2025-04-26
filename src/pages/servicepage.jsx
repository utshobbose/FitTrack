import Navbar from "../components/navbar";

export default function ServicesPage() {
    return (
        <div className="min-h-screen bg-white dark:bg-gray-900">
            <Navbar />
            <section className="flex flex-col lg:flex-row lg:h-screen">
                {/* Text Section */}
                <div className="w-full lg:w-1/2 px-6 py-12 lg:py-24 flex items-center justify-center bg-gray-900 text-white">
                    <div className="max-w-lg">
                        <h1 className="text-4xl font-extrabold sm:text-5xl text-white mb-6">
                            Our <span className="text-teal-500">Services</span>
                        </h1>

                        <p className="mt-4 text-gray-300">
                            FitTrack offers a variety of services tailored to support your
                            wellness journey. Whether you are just starting out or are a fitness enthusiast,
                            we have the tools and guidance to help you thrive.
                        </p>

                        <ul className="mt-6 space-y-3 text-gray-200 list-disc list-inside">
                            <li>💪 Personalized Workout Routines</li>
                            <li>🥗 Custom Diet and Meal Plans</li>
                            <li>🧘 Yoga & Meditation Programs</li>
                            <li>📊 Progress & Health Tracking</li>
                            <li>🛒 Fitness Products and Supplements</li>
                            <li>📚 Expert Blogs & Guides</li>
                        </ul>

                        <div className="mt-8 flex gap-4">
                            <a
                                href="/"
                                className="inline-block bg-teal-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-teal-700"
                            >
                                Explore Now
                            </a>
                            <a
                                href="/contact"
                                className="inline-block bg-gray-200 text-teal-800 px-6 py-3 rounded-lg font-medium hover:bg-gray-300"
                            >
                                Contact Us
                            </a>
                        </div>
                    </div>
                </div>

                {/* Image Section */}
                <div className="w-full lg:w-1/2 h-96 lg:h-full">
                    <img
                        alt="Fitness Services"
                        src="https://sport.exeter.ac.uk/v8media/universityofexeter/campusservices/sport/images930x500/Tracey_spot_checking_-_website.png"
                        className="w-full h-full object-cover"
                    />
                </div>
            </section>
        </div>
    );
}