import React from 'react'

const Store = () => {
  return (
    <>
      {/* Store Manager Service */}
      <section className="store-manager-section py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-slate-50 animate-on-scroll">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <span className="inline-block bg-indigo-100 text-indigo-700 text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-4">
              Optional Add-On
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 mb-3">
              Store Manager Service
            </h2>
            <div className="w-12 h-1 bg-amber-500 mx-auto rounded-full"></div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 shadow-md overflow-hidden">
            <div className="grid md:grid-cols-2">
              {/* Left – Pricing */}
              <div className="p-8 md:p-10 border-b md:border-b-0 md:border-r border-slate-100">
                <div className="flex items-baseline gap-2 mb-3">
                  <span className="text-5xl font-extrabold text-indigo-700">US$100</span>
                  <span className="text-slate-400 font-medium">/month</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-slate-400 line-through text-base">US$200</span>
                  <span className="bg-emerald-100 text-emerald-700 text-xs font-bold uppercase tracking-wide px-2.5 py-1 rounded-full">
                    50% OFF Pre-Launch
                  </span>
                </div>
              </div>

              {/* Right – Features */}
              <div className="p-8 md:p-10 bg-slate-50">
                <p className="text-slate-600 mb-6 leading-relaxed text-sm">
                  Focus on creating your products while we handle the backend. Our Store Manager service includes:
                </p>
                <ul className="space-y-3">
                  {[
                    "Product uploads & descriptions",
                    "Inventory updates & tracking",
                    "Order management support",
                    "Backend administration",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <span className="flex-shrink-0 w-5 h-5 mt-0.5 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center">
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                        </svg>
                      </span>
                      <span className="text-slate-700 text-sm font-medium">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Terms */}
      <section className="pricing-terms-section py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-white animate-on-scroll">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <span className="inline-block bg-slate-100 text-slate-600 text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-4">
              Transparency
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 mb-3">
              Pricing Terms – Clear & Simple
            </h2>
            <div className="w-12 h-1 bg-amber-500 mx-auto rounded-full"></div>
          </div>

          <div className="space-y-5">
            {/* Monthly Plans */}
            <div className="bg-indigo-50 border border-indigo-200 rounded-2xl p-6 md:p-8">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-slate-900 mb-2">Monthly Plans</h3>
                  <p className="text-slate-600 text-sm mb-4 leading-relaxed">
                    All monthly plans receive <strong className="text-indigo-700">50% OFF until April 1st, 2026</strong>. After launch, monthly plans renew at standard pricing.
                  </p>
                  <div className="bg-white rounded-xl p-4 border border-indigo-100">
                    <p className="text-sm font-semibold text-slate-700 mb-2">Example:</p>
                    <ul className="space-y-1.5 text-sm text-slate-600">
                      <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-indigo-600 rounded-full flex-shrink-0"></span>
                        <span>Gold Plan: <strong className="text-slate-800">US$160/month</strong> during Pre-Launch</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-indigo-600 rounded-full flex-shrink-0"></span>
                        <span>After April 1st, 2026: Renews at <strong className="text-slate-800">US$320/month</strong></span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Annual Plans */}
            <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6 md:p-8">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-emerald-600 rounded-xl flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-slate-900 mb-2">Annual Plans (Best Value)</h3>
                  <p className="text-slate-600 text-sm mb-4 leading-relaxed">
                    Lock in the <strong className="text-emerald-700">50% founding rate for the first year</strong> by choosing an annual plan. Plus, receive an additional <strong className="text-emerald-700">10% OFF Year 2 renewal</strong>.
                  </p>
                  <div className="bg-white rounded-xl p-4 border border-emerald-100">
                    <p className="text-sm font-semibold text-slate-700 mb-2">Example:</p>
                    <ul className="space-y-1.5 text-sm text-slate-600">
                      <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-emerald-600 rounded-full flex-shrink-0"></span>
                        <span>Gold Annual: <strong className="text-slate-800">US$1,920/year</strong> (US$160/month rate locked in)</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-emerald-600 rounded-full flex-shrink-0"></span>
                        <span>Year 2 Renewal: <strong className="text-slate-800">US$1,728/year</strong> (10% discount applied)</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Store;