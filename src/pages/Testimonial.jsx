import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const GOLD_PRICES = {
  monthly: 5,
  quarterly: 13.5,
  semiannual: 25.5,
  annual: 48,
};

const GOLD_FEATURES = [
  "50 Products",
  "Business Profile & Logo",
  "10 Images/Product",
  "Video Upload",
  "Contact Seller",
  "PDF Upload",
  "HTML/CSS Editor",
  "Ad Pre-Approval",
];

const Testimonial = () => {
  const [billingCycle, setBillingCycle] = useState("monthly");
  const navigate = useNavigate();

  const billingLabel = {
    monthly: "Monthly",
    quarterly: "3 Months",
    semiannual: "6 Months",
    annual: "12 Months",
  }[billingCycle];

  return (
    <>
      <div className="font-sans antialiased text-gray-900 bg-white">
        <section className="py-16 md:py-24 px-6 bg-gray-50 border-b border-gray-200">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-extrabold text-black uppercase tracking-tight mb-4">
                The Numbers Don't Lie
              </h2>
              <div className="h-1 w-24 bg-red-600 mx-auto"></div>
            </div>

            <div className="grid md:grid-cols-2 gap-8 md:gap-12 mb-16">
              {/* Traditional Store Cost */}
              <div className="bg-white border border-gray-300 shadow-sm flex flex-col">
                <div className="p-8 border-b border-gray-200 flex items-center gap-4">
                  <div className="w-12 h-12 bg-gray-100 border border-gray-300 flex items-center justify-center">
                    <svg
                      className="w-6 h-6 text-red-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="square"
                        strokeLinejoin="miter"
                        strokeWidth="2"
                        d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                      ></path>
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-black uppercase tracking-wide">
                    Physical Store
                  </h3>
                </div>

                <div className="p-8 flex-grow space-y-4">
                  <div className="flex justify-between items-center pb-3 border-b border-gray-100">
                    <span className="text-gray-600">Rent</span>
                    <span className="font-bold text-black">US$2,250</span>
                  </div>
                  <div className="flex justify-between items-center pb-3 border-b border-gray-100">
                    <span className="text-gray-600">Electricity</span>
                    <span className="font-bold text-black">US$250</span>
                  </div>
                  <div className="flex justify-between items-center pb-3 border-b border-gray-100">
                    <span className="text-gray-600">Water</span>
                    <span className="font-bold text-black">US$75</span>
                  </div>
                  <div className="flex justify-between items-center pb-3 border-b border-gray-100">
                    <span className="text-gray-600">1 Staff (Full Package)</span>
                    <span className="font-bold text-black">US$2,250</span>
                  </div>
                </div>

                <div className="bg-gray-100 p-8 border-t border-gray-300">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-sm font-bold text-gray-800 uppercase tracking-widest">
                      Monthly Total
                    </span>
                    <span className="text-3xl font-extrabold text-red-600">
                      US$4,825
                    </span>
                  </div>
                  <div className="flex justify-between items-center pb-6 border-b border-gray-300">
                    <span className="text-sm font-bold text-gray-800 uppercase tracking-widest">
                      Annual Total
                    </span>
                    <span className="text-xl font-bold text-red-600">
                      US$57,900
                    </span>
                  </div>
                  <div className="mt-6 text-center">
                    <p className="text-sm text-gray-500 uppercase tracking-widest mb-2">
                      Upfront Startup Cost:
                    </p>
                    <p className="text-2xl font-bold text-black">
                      US$25,000 – US$30,000
                    </p>
                  </div>
                </div>
              </div>

              {/* Mall of Cayman Cost */}
              <div className="bg-white border-2 border-blue-800 shadow-lg flex flex-col relative">
                <div className="absolute top-0 right-0 bg-blue-800 text-white text-xs font-bold px-4 py-1 uppercase tracking-widest">
                  Our Solution
                </div>
                <div className="p-8 border-b border-gray-200 flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-50 border border-blue-200 flex items-center justify-center">
                    <svg
                      className="w-6 h-6 text-blue-800"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="square"
                        strokeLinejoin="miter"
                        strokeWidth="2"
                        d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                      ></path>
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-blue-900 uppercase tracking-wide">
                    Mall of Cayman
                  </h3>
                </div>

                <div className="p-8 flex-grow space-y-4">
                  <div className="flex justify-between items-center pb-3 border-b border-gray-100">
                    <span className="text-gray-600">Monthly Plan</span>
                    <span className="font-bold text-black">US$50 – US$160</span>
                  </div>
                  <div className="flex justify-between items-center pb-3 border-b border-gray-100">
                    <span className="text-gray-600">Store Manager (Optional)</span>
                    <span className="font-bold text-black">US$100</span>
                  </div>
                  <div className="flex justify-between items-center pb-3 border-b border-gray-100">
                    <span className="text-gray-600">Electricity</span>
                    <span className="font-bold text-black">US$0</span>
                  </div>
                  <div className="flex justify-between items-center pb-3 border-b border-gray-100">
                    <span className="text-gray-500 italic">All other costs</span>
                    <span className="font-bold text-black">US$0</span>
                  </div>
                </div>

                <div className="bg-blue-900 p-8 text-white">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-sm font-bold text-blue-200 uppercase tracking-widest">
                      Monthly Total
                    </span>
                    <span className="text-3xl font-extrabold text-white">
                      US$260
                    </span>
                  </div>
                  <div className="flex justify-between items-center pb-6 border-b border-blue-800">
                    <span className="text-sm font-bold text-blue-200 uppercase tracking-widest">
                      Annual Total
                    </span>
                    <span className="text-xl font-bold text-white">
                      US$3,120
                    </span>
                  </div>
                  <p className="text-blue-300 text-xs mt-4 mb-6 leading-relaxed">
                    Gold Plan (US$160/month) × 12 months + Store Manager
                    (US$100/month) × 12 months
                  </p>
                  <div className="mt-6 text-center border-t border-blue-800 pt-6">
                    <p className="text-sm text-blue-200 uppercase tracking-widest mb-2">
                      Upfront Startup Cost:
                    </p>
                    <p className="text-2xl font-bold text-white">US$0</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Big Visual Statement */}
            <div className="bg-black border border-gray-800 p-8 md:p-16 text-center shadow-xl">
              <p className="text-xl md:text-3xl lg:text-4xl font-light text-white leading-tight uppercase tracking-wide">
                One Full Year on Mall of Cayman Costs Less Than
                <span className="block mt-6 mb-4 text-3xl md:text-5xl lg:text-7xl font-extrabold text-red-600 tracking-tight">
                  65% of ONE MONTH
                </span>
                <span className="block text-lg md:text-2xl text-gray-400">
                  of a Traditional Store
                </span>
              </p>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section className="py-16 md:py-24 px-6 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-extrabold text-black uppercase tracking-tight mb-4">
                Choose Your Gold Plan
              </h2>
              <div className="h-1 w-24 bg-blue-800 mx-auto mb-6"></div>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
                One plan. All features. Choose the billing period that works for
                you — the longer you commit, the more you save.
              </p>
            </div>

            <div className="max-w-4xl mx-auto">
              {/* Billing cycle toggles */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
                {[
                  {
                    value: "monthly",
                    label: "1 Month",
                    price: GOLD_PRICES.monthly,
                    discount: null,
                  },
                  {
                    value: "quarterly",
                    label: "3 Months",
                    price: GOLD_PRICES.quarterly,
                    discount: "10%",
                  },
                  {
                    value: "semiannual",
                    label: "6 Months",
                    price: GOLD_PRICES.semiannual,
                    discount: "15%",
                  },
                  {
                    value: "annual",
                    label: "12 Months",
                    price: GOLD_PRICES.annual,
                    discount: "20%",
                  },
                ].map((c) => (
                  <button
                    key={c.value}
                    type="button"
                    onClick={() => setBillingCycle(c.value)}
                    className={`relative flex flex-col items-center justify-center p-6 border-2 transition-all cursor-pointer ${billingCycle === c.value
                        ? "border-black bg-black text-white"
                        : "border-gray-200 bg-white text-gray-600 hover:border-gray-400"
                      }`}
                  >
                    {c.discount && (
                      <span className="absolute -top-3 right-[-10px] md:right-auto md:left-1/2 md:-translate-x-1/2 text-xs bg-red-600 text-white px-3 py-1 font-bold uppercase tracking-widest shadow-sm">
                        Save {c.discount}
                      </span>
                    )}
                    <span
                      className={`text-sm font-bold uppercase tracking-widest mb-2 ${billingCycle === c.value ? "text-gray-300" : "text-gray-500"
                        }`}
                    >
                      {c.label}
                    </span>
                    <span className="text-2xl font-extrabold tracking-tight">
                      ${c.price}
                    </span>
                  </button>
                ))}
              </div>

              {/* Single Gold plan feature card */}
              <div className="max-w-lg mx-auto bg-white border border-gray-300 shadow-2xl relative overflow-hidden">
                <div className="bg-blue-900 text-white text-center py-8 px-6 border-b-4 border-black relative">
                  <svg
                    className="w-8 h-8 mx-auto mb-4 text-white opacity-80"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                  </svg>
                  <h3 className="text-3xl font-extrabold uppercase tracking-widest mb-2">
                    Gold Plan
                  </h3>
                  <p className="text-blue-200 text-sm tracking-wide">
                    Everything you need to grow
                  </p>
                </div>

                <div className="p-8 md:p-12">
                  <div className="text-center mb-10 pb-10 border-b border-gray-200">
                    <span className="text-6xl font-extrabold text-black tracking-tight">
                      ${GOLD_PRICES[billingCycle]}
                    </span>
                    <span className="text-gray-500 font-bold uppercase tracking-widest block mt-2">
                      / {billingLabel.toLowerCase()}
                    </span>
                  </div>

                  <div className="space-y-4 mb-10">
                    {GOLD_FEATURES.map((f, i) => (
                      <div key={i} className="flex items-center text-black font-medium">
                        <svg
                          className="w-5 h-5 text-blue-800 mr-4 flex-shrink-0"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="square"
                            strokeLinejoin="miter"
                            strokeWidth="3"
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        {f}
                      </div>
                    ))}
                  </div>

                  <button
                    type="button"
                    onClick={() =>
                      navigate("/register", { state: { billingCycle } })
                    }
                    className="w-full bg-black hover:bg-gray-800 text-white font-extrabold uppercase tracking-widest text-center py-5 transition-colors cursor-pointer"
                  >
                    Get Started — ${GOLD_PRICES[billingCycle]}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Testimonial;
