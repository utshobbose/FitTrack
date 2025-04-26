import Navbar from "../components/navbar";

export default function AboutUsPage() {
    return (
        <div className="min-h-screen bg-white dark:bg-gray-900">
            <Navbar />
            <section className="relative flex flex-wrap lg:h-screen lg:items-center">
                <div className="w-full px-4 py-12 sm:px-6 sm:py-16 lg:w-1/2 lg:px-8 lg:py-24">
                    <div className="mx-auto max-w-lg text-left">
                        <h1 className="text-4xl font-extrabold sm:text-5xl text-gray-900 dark:text-white mb-6">
                            About <span className="text-teal-500">FitTrack</span>
                        </h1>

                        <p className="mt-4 text-gray-600 dark:text-gray-300">
                            FitTrack is more than just a fitness platform. We are a movement dedicated
                            to empowering individuals to take control of their health and wellness. Whether
                            you are a beginner or an advanced athlete, our personalized plans, expert guidance,
                            and intuitive tools help you reach your goals effectively.
                        </p>

                        <p className="mt-4 text-gray-600 dark:text-gray-300">
                            Our mission is to simplify fitness by bringing together everything you need —
                            from workout videos and meal plans to yoga, meditation, and progress tracking —
                            all in one place.
                        </p>

                        <div className="mt-8 flex gap-4">
                            <a
                                href="/"
                                className="inline-block bg-teal-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-teal-700"
                            >
                                Get Started
                            </a>
                            <a
                                href="/blog"
                                className="inline-block bg-gray-200 text-teal-800 px-6 py-3 rounded-lg font-medium hover:bg-gray-300"
                            >
                                Read Our Blog
                            </a>
                        </div>
                    </div>
                </div>

                <div className="relative h-64 w-full sm:h-96 lg:h-full lg:w-1/2">
                    <img
                        alt="Fitness Team"
                        src="https://images.unsplash.com/photo-1605296867304-46d5465a13f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1770&q=80"
                        className="absolute inset-0 h-full w-full object-cover"
                    />
                </div>
            </section>
        </div>
    );
}
