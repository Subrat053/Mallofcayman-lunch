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
      <section className="financial-comparison-section py-12 md:py-20 lg:py-32 px-6 bg-gradient-to-br from-indigo-100 via-blue-100 to-cyan-100 animate-on-scroll">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl md:text-3xl lg:text-5xl font-bold text-center text-neutral-900 mb-10 md:mb-16">
            The Numbers Don't Lie
          </h2>

          <div className="grid md:grid-cols-2 gap-8 md:gap-12 mb-10 md:mb-16">
            {/* Traditional Store Cost */}
            <div className="cost-card bg-white border-2 border-neutral-200 rounded-3xl p-6 md:p-8 lg:p-10 shadow-lg">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-red-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                    ></path>
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-neutral-900">
                  Physical Store
                </h3>
              </div>

              <div className="space-y-4 mb-8">
                <div className="flex justify-between items-center pb-3 border-b border-neutral-200">
                  <span className="text-neutral-600">Rent</span>
                  <span className="font-bold text-neutral-900">US$2,250</span>
                </div>
                <div className="flex justify-between items-center pb-3 border-b border-neutral-200">
                  <span className="text-neutral-600">Electricity</span>
                  <span className="font-bold text-neutral-900">US$250</span>
                </div>
                <div className="flex justify-between items-center pb-3 border-b border-neutral-200">
                  <span className="text-neutral-600">Water</span>
                  <span className="font-bold text-neutral-900">US$75</span>
                </div>
                <div className="flex justify-between items-center pb-3 border-b border-neutral-200">
                  <span className="text-neutral-600">
                    1 Staff (Full Package)
                  </span>
                  <span className="font-bold text-neutral-900">US$2,250</span>
                </div>
              </div>

              <div className="bg-red-50 rounded-2xl p-6 mb-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-semibold text-red-900 uppercase tracking-wide">
                    Monthly Total
                  </span>
                  <span className="text-3xl font-bold text-red-600">
                    US$4,825
                  </span>
                </div>
                <div className="flex justify-between items-center mb-3">
                  <span className="text-sm font-semibold text-red-900 uppercase tracking-wide">
                    Annual Total
                  </span>
                  <span className="text-2xl font-bold text-red-600">
                    US$57,900
                  </span>
                </div>
              </div>

              <div className="text-center">
                <p className="text-sm text-neutral-600 mb-1">
                  Upfront Startup Cost:
                </p>
                <p className="text-2xl font-bold text-neutral-900">
                  US$25,000 – US$30,000
                </p>
              </div>
            </div>

            {/* Mall of Cayman Cost */}
            <div className="cost-card bg-gradient-to-br from-blue-50 to-emerald-50 border-2 border-blue-200 rounded-3xl p-6 md:p-8 lg:p-10 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/10 rounded-full blur-3xl"></div>

              <div className="flex items-center gap-3 mb-6 relative z-10">
                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                    ></path>
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-neutral-900">
                  Mall of Cayman
                </h3>
              </div>

              <div className="space-y-4 mb-8 relative z-10">
                <div className="flex justify-between items-center pb-3 border-b border-blue-200">
                  <span className="text-neutral-700">Monthly Plan</span>
                  <span className="font-bold text-blue-600">
                    US$50 – US$160
                  </span>
                </div>
                <div className="flex justify-between items-center pb-3 border-b border-blue-200">
                  <span className="text-neutral-700">
                    Store Manager (Optional)
                  </span>
                  <span className="font-bold text-blue-600">US$100</span>
                </div>
                <div className="flex justify-between items-center pb-3 border-b border-blue-200">
                  <span className="text-neutral-700">Electricity</span>
                  <span className="font-bold text-emerald-600">US$0</span>
                </div>
                <div className="flex justify-between items-center pb-3">
                  <span className="text-neutral-700 italic text-sm">
                    All other costs
                  </span>
                  <span className="font-bold text-emerald-600">US$0</span>
                </div>
              </div>

              <div className="bg-blue-600 rounded-2xl p-6 mb-6 relative z-10">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-semibold text-white uppercase tracking-wide">
                    Monthly Total
                  </span>
                  <span className="text-3xl font-bold text-white">US$260</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-semibold text-white uppercase tracking-wide">
                    Annual Total
                  </span>
                  <span className="text-2xl font-bold text-white">
                    US$3,120
                  </span>
                </div>
                <p className="text-white/90 text-xs mt-3">
                  Gold Plan (US$160/month) × 12 months + Store Manager
                  (US$100/month) × 12 months
                </p>
              </div>

              <div className="text-center relative z-10">
                <p className="text-sm text-neutral-700 mb-1">
                  Upfront Startup Cost:
                </p>
                <p className="text-2xl font-bold text-emerald-600">US$0</p>
              </div>
            </div>
          </div>

          {/* Big Visual Statement */}
          <div className="big-statement bg-gradient-to-r from-blue-600 to-emerald-600 rounded-3xl p-6 md:p-10 lg:p-16 text-center shadow-2xl">
            <p className="text-xl md:text-2xl lg:text-4xl xl:text-5xl font-bold text-white leading-tight">
              One Full Year on Mall of Cayman Costs Less Than
              <span className="block mt-4 text-2xl md:text-4xl lg:text-6xl">
                65% of ONE MONTH
              </span>
              <span className="block mt-2 text-lg md:text-2xl lg:text-4xl text-white/90">
                of a Traditional Store
              </span>
            </p>
          </div>
        </div>
      </section>

      <section className="pricing-section py-12 md:py-20 lg:py-32 px-6 bg-gradient-to-br from-purple-50 via-pink-50 to-rose-50 animate-on-scroll">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-2xl md:text-3xl lg:text-5xl font-bold text-neutral-900 mb-6">
              Choose Your Gold Plan
            </h2>
            <p className="text-lg md:text-xl text-neutral-600 max-w-3xl mx-auto">
              One plan. All features. Choose the billing period that works for
              you — the longer you commit, the more you save.
            </p>
          </div>

          <div className="max-w-2xl mx-auto">
            {/* Billing cycle toggles */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
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
                  className={`relative flex flex-col items-center py-4 px-3 rounded-xl border-2 font-medium transition-all cursor-pointer ${
                    billingCycle === c.value
                      ? "border-yellow-500 bg-yellow-50 shadow-lg"
                      : "border-gray-200 bg-white hover:border-yellow-300"
                  }`}
                >
                  {c.discount && (
                    <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 text-xs bg-green-500 text-white px-2 py-0.5 rounded-full whitespace-nowrap">
                      Save {c.discount}
                    </span>
                  )}
                  <span
                    className={`text-sm font-semibold ${
                      billingCycle === c.value
                        ? "text-yellow-700"
                        : "text-gray-700"
                    }`}
                  >
                    {c.label}
                  </span>
                  <span
                    className={`text-xl font-bold mt-1 ${
                      billingCycle === c.value
                        ? "text-yellow-600"
                        : "text-gray-900"
                    }`}
                  >
                    ${c.price}
                  </span>
                  {billingCycle === c.value && (
                    <svg
                      className="w-4 h-4 text-yellow-600 mt-1"
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
                  )}
                </button>
              ))}
            </div>

            {/* Single Gold plan feature card */}
            <div className="relative p-6 rounded-2xl border-2 border-yellow-500 bg-yellow-50 shadow-xl">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-yellow-400 to-yellow-600 text-white px-5 py-1 rounded-full text-xs font-bold tracking-wide whitespace-nowrap">
                ✦ GOLD PLAN ✦
              </div>
              <div className="absolute top-4 right-4">
                <svg
                  className="w-7 h-7 text-yellow-500"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2a10 10 0 100 20A10 10 0 0012 2zm-1 14.41V17a1 1 0 002 0v-.59A3.001 3.001 0 0012 11a1 1 0 110-2 3 3 0 013 3 3.001 3.001 0 01-1 2.24V15a1 1 0 01-2 0v-.59z" />
                </svg>
              </div>

              <div className="flex items-center gap-4 mb-5">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-r from-yellow-400 to-yellow-600 flex items-center justify-center shadow-md">
                  <span className="text-3xl">💎</span>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">Gold</h3>
                  <p className="text-gray-500 text-sm">
                    Everything you need to grow
                  </p>
                </div>
                <div className="ml-auto text-right">
                  <span className="text-4xl font-extrabold text-gray-900">
                    ${GOLD_PRICES[billingCycle]}
                  </span>
                  <span className="text-gray-500 text-sm block">
                    /{billingLabel.toLowerCase()}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-6">
                {GOLD_FEATURES.map((f, i) => (
                  <div
                    key={i}
                    className="flex items-center text-gray-700 text-sm"
                  >
                    <svg
                      className="w-4 h-4 text-yellow-600 mr-2 flex-shrink-0"
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
                    {f}
                  </div>
                ))}
              </div>

              <button
                type="button"
                onClick={() =>
                  navigate("/register", { state: { billingCycle } })
                }
                className="block w-full bg-gradient-to-r from-yellow-400 to-yellow-600 hover:from-yellow-500 hover:to-yellow-700 text-white font-bold text-center py-4 rounded-full transition-all duration-300 hover:shadow-lg cursor-pointer"
              >
                Get Started — ${GOLD_PRICES[billingCycle]}
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Testimonial;
