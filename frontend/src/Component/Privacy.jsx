import React from 'react'

const Privacy = () => {
  return (
    <div className="w-full min-h-screen bg-gray-50 py-20 px-5">
      <div className="max-w-7xl mx-auto rounded-2xl md:p-12">
        <h1 className="font-palyfair text-4xl md:text-5xl lg:text-6xl font-bold text-[#fb823f] mb-8">
          Privacy Policy
        </h1>
        
        <div className="space-y-6 font-popines text-gray-700">
          <p className="text-sm text-gray-500">
            Last updated: February 25, 2026
          </p>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-800">1. Introduction</h2>
            <p className="text-justify">
              Welcome to Installation World. We respect your privacy and are committed to protecting your personal information.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-800">2. Information We Collect</h2>
            <p className="text-justify">
              We do not collect, store, sell, or share any personal data from visitors to our website.
              The only information we receive is the details you voluntarily provide when filling out the AC service request form,
              such as your name, phone number, and address, strictly for the purpose of providing service.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-800">3. How We Use Information</h2>
            <p className="text-justify">
              The information submitted through the service form is used only to contact you
              regarding your AC installation or repair request. We do not use your information for marketing purposes.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-800">4. Data Security</h2>
            <p className="text-justify">
              We take reasonable steps to protect the information you provide through our service request form.
              Your information is not shared with any third parties except as required to complete your service request.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-800">5. Contact Us</h2>
            <p className="text-justify">
              If you have any questions about this Privacy Policy, please contact us:
            </p>
            <ul className="list-none space-y-2 ml-4">
              <li><strong>Email:</strong> installationworld5858@gmail.com</li>
              <li><strong>Phone:</strong> +91 8376996688</li>
              <li><strong>Address:</strong> F 48 Shopping Centre 1 Mansarovar Garden New Delhi 110015</li>
            </ul>
          </section>

        </div>
      </div>
    </div>
  )
}

export default Privacy