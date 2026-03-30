import React from "react";

function PaymentDue() {
  return (
    <div className="py-20 flex items-center justify-center bg-gray-100 px-4">
      <div className="max-w-2xl w-full bg-white shadow-xl rounded-2xl p-8 text-center">
        
        {/* Icon */}
        <div className="flex justify-center mb-6">
          <div className="bg-orange-100 p-4 rounded-full">
            <svg
              className="w-10 h-10 text-orange-500"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 8c.667-2 2-3 4-3 2.5 0 4 2 4 4 0 3-4 6-8 9-4-3-8-6-8-9 0-2 1.5-4 4-4 2 0 3.333 1 4 3z"
              />
            </svg>
          </div>
        </div>

        {/* Title */}
        <h1 className="text-3xl font-bold text-gray-800 mb-3">
          Payment Due
        </h1>

        {/* Subtitle */}
        <p className="text-gray-600 mb-6">
          Your service is currently on hold due to pending payment.
          Please contact the developer to continue using the system.
        </p>

        {/* Divider */}
        <div className="border-t border-gray-200 my-6"></div>

        {/* Contact Info */}
        {/* <div className="space-y-3 text-gray-700">
          <p>
            📞 <span className="font-semibold">+91 8376996688</span>
          </p>
          <p>
            📧{" "}
            <span className="font-semibold">
              installationworld5858@gmail.com
            </span>
          </p>
        </div> */}

        {/* Button */}
        {/* <div className="mt-8">
          <a
            href="tel:+918376996688"
            className="inline-block bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold transition duration-300"
          >
            Contact Now
          </a>
        </div> */}

        {/* Footer Note */}
        <p className="text-sm text-gray-400 mt-6">
          Installation World • Service Management System
        </p>
      </div>
    </div>
  );
}

export default PaymentDue;