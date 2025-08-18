export default function FeaturesBento() {
  return (
    <section className="max-w-6xl mx-auto px-6 py-20">
      <h2 className="text-4xl font-bold text-center mb-12">
        🩺 Smart Healthcare with <span className="text-emerald-500">MediVoice AI</span>
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* AI Medical Agent */}
        <div className="md:col-span-2 row-span-2 bg-gradient-to-br from-emerald-100 to-emerald-300 dark:from-emerald-900 dark:to-emerald-700 
                        rounded-3xl p-8 flex flex-col justify-between shadow-lg">
          <div>
            <h3 className="text-2xl font-semibold mb-4">🤖 AI Medical Agent</h3>
            <p className="text-gray-700 dark:text-gray-200">
              Get instant consultations from our intelligent AI — available 24/7 for your healthcare needs.
            </p>
          </div>
          
        </div>

        {/* Medical Reports */}
        <div className="md:col-span-2 bg-white dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700
                        rounded-3xl p-6 shadow-md flex flex-col justify-between">
          <div>
            <h3 className="text-xl font-semibold mb-2">📄 Auto Medical Reports</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Receive clear and concise reports after every consultation — no extra steps needed.
            </p>
          </div>
       
        </div>

        {/* Affordable Pricing */}
        <div className="md:col-span-1 bg-gradient-to-br from-yellow-200 to-yellow-400 dark:from-yellow-700 dark:to-yellow-500
                        rounded-3xl p-6 shadow-md flex flex-col justify-between">
          <div>
            <h3 className="text-lg font-semibold mb-2">💰 Affordable</h3>
            <p className="text-gray-700 dark:text-gray-200">
              Best medical guidance at the lowest price, accessible for everyone.
            </p>
          </div>
          
        </div>

        {/* Accessibility */}
        <div className="md:col-span-1 bg-white dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 
                        rounded-3xl p-6 shadow-md flex flex-col justify-between">
          <div>
            <h3 className="text-lg font-semibold mb-2">🌍 Accessible Anywhere</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Connect with MediVoice AI from any device, anytime, anywhere.
            </p>
          </div>
          
        </div>
      </div>
    </section>
  );
}
