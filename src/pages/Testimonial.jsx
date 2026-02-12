import React from 'react'

const Testimonial = () => {
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
                <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-neutral-900">Physical Store</h3>
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
                <span className="text-neutral-600">1 Staff (Full Package)</span>
                <span className="font-bold text-neutral-900">US$2,250</span>
              </div>
            </div>

            <div className="bg-red-50 rounded-2xl p-6 mb-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-semibold text-red-900 uppercase tracking-wide">Monthly Total</span>
                <span className="text-3xl font-bold text-red-600">US$4,825</span>
              </div>
              <div className="flex justify-between items-center mb-3">
                <span className="text-sm font-semibold text-red-900 uppercase tracking-wide">Annual Total</span>
                <span className="text-2xl font-bold text-red-600">US$57,900</span>
              </div>
            </div>

            <div className="text-center">
              <p className="text-sm text-neutral-600 mb-1">Upfront Startup Cost:</p>
              <p className="text-2xl font-bold text-neutral-900">US$25,000 – US$30,000</p>
            </div>
          </div>

          {/* Mall of Cayman Cost */}
          <div className="cost-card bg-gradient-to-br from-blue-50 to-emerald-50 border-2 border-blue-200 rounded-3xl p-6 md:p-8 lg:p-10 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/10 rounded-full blur-3xl"></div>

            <div className="flex items-center gap-3 mb-6 relative z-10">
              <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path>
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-neutral-900">Mall of Cayman</h3>
            </div>

            <div className="space-y-4 mb-8 relative z-10">
              <div className="flex justify-between items-center pb-3 border-b border-blue-200">
                <span className="text-neutral-700">Monthly Plan</span>
                <span className="font-bold text-blue-600">US$50 – US$160</span>
              </div>
              <div className="flex justify-between items-center pb-3 border-b border-blue-200">
                <span className="text-neutral-700">Store Manager (Optional)</span>
                <span className="font-bold text-blue-600">US$100</span>
              </div>
              <div className="flex justify-between items-center pb-3 border-b border-blue-200">
                <span className="text-neutral-700">Electricity</span>
                <span className="font-bold text-emerald-600">US$0</span>
              </div>
              <div className="flex justify-between items-center pb-3">
                <span className="text-neutral-700 italic text-sm">All other costs</span>
                <span className="font-bold text-emerald-600">US$0</span>
              </div>
            </div>

            <div className="bg-blue-600 rounded-2xl p-6 mb-6 relative z-10">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-semibold text-white uppercase tracking-wide">Monthly Total</span>
                <span className="text-3xl font-bold text-white">US$260</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-semibold text-white uppercase tracking-wide">Annual Total</span>
                <span className="text-2xl font-bold text-white">US$3,120</span>
              </div>
              <p className="text-white/90 text-xs mt-3">Gold Plan (US$160/month) × 12 months + Store Manager (US$100/month) × 12 months</p>
            </div>

            <div className="text-center relative z-10">
              <p className="text-sm text-neutral-700 mb-1">Upfront Startup Cost:</p>
              <p className="text-2xl font-bold text-emerald-600">US$0</p>
            </div>
          </div>
        </div>

        {/* Big Visual Statement */}
        <div className="big-statement bg-gradient-to-r from-blue-600 to-emerald-600 rounded-3xl p-6 md:p-10 lg:p-16 text-center shadow-2xl">
          <p className="text-xl md:text-2xl lg:text-4xl xl:text-5xl font-bold text-white leading-tight">
            One Full Year on Mall of Cayman Costs Less Than
            <span className="block mt-4 text-2xl md:text-4xl lg:text-6xl">65% of ONE MONTH</span>
            <span className="block mt-2 text-lg md:text-2xl lg:text-4xl text-white/90">of a Traditional Store</span>
          </p>
        </div>
      </div>
    </section>

      <section className="pricing-section py-12 md:py-20 lg:py-32 px-6 bg-gradient-to-br from-purple-50 via-pink-50 to-rose-50 animate-on-scroll">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-2xl md:text-3xl lg:text-5xl font-bold text-neutral-900 mb-6">
              Choose Your Plan
            </h2>
            <p className="text-lg md:text-xl text-neutral-600 max-w-3xl mx-auto">
              Lock in <strong className="text-blue-600">50% OFF founding rates</strong> until April 1st, 2026. All plans include full store features, payment processing, and monthly marketing.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Bronze Plan */}
            <div className="pricing-card bg-white border-2 border-neutral-200 rounded-3xl p-8 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
              <div className="mb-6">
                <div className="inline-block bg-neutral-100 text-neutral-700 text-xs font-bold uppercase tracking-wide px-3 py-1 rounded-full mb-4">
                  Bronze
                </div>
                <div className="flex items-baseline gap-2 mb-2">
                  <span className="text-5xl font-bold text-neutral-900">US$50</span>
                  <span className="text-neutral-500">/month</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-neutral-400 line-through text-lg">US$100</span>
                  <span className="inline-block bg-emerald-100 text-emerald-700 text-xs font-bold uppercase px-2 py-1 rounded">50% OFF</span>
                </div>
              </div>

              <ul className="space-y-4 mb-8 text-neutral-700">
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-emerald-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span><strong>15 Products</strong></span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-emerald-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span>Business Profile</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-emerald-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span>Logo Upload</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-emerald-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span>PDF Upload</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-emerald-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span>3 Images/Product</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-neutral-300 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                  </svg>
                  <span className="text-neutral-400">Video Upload</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-neutral-300 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                  </svg>
                  <span className="text-neutral-400">Contact Seller</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-neutral-300 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                  </svg>
                  <span className="text-neutral-400">HTML/CSS Editor</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-neutral-300 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                  </svg>
                  <span className="text-neutral-400">Ad Pre-Approval</span>
                </li>
              </ul>

              <a href="https://www.mallofcayman.com/shop/subscriptions" className="block w-full bg-neutral-900 hover:bg-neutral-800 text-white font-bold text-center py-4 rounded-full transition-all duration-300 hover:shadow-lg cursor-pointer" style={{ pointerEvents: 'auto' }}>
                Join Now
              </a>
            </div>

            {/* Silver Plan (Recommended) */}
            <div className="pricing-card bg-gradient-to-br from-blue-50 to-emerald-50 border-4 border-blue-600 rounded-3xl p-8 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 relative">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                <span className="inline-block bg-blue-600 text-white text-xs font-bold uppercase tracking-wide px-6 py-2 rounded-full shadow-lg">
                  Recommended
                </span>
              </div>

              <div className="mb-6 mt-2">
                <div className="inline-block bg-blue-100 text-blue-700 text-xs font-bold uppercase tracking-wide px-3 py-1 rounded-full mb-4">
                  Silver
                </div>
                <div className="flex items-baseline gap-2 mb-2">
                  <span className="text-5xl font-bold text-neutral-900">US$100</span>
                  <span className="text-neutral-500">/month</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-neutral-400 line-through text-lg">US$200</span>
                  <span className="inline-block bg-emerald-100 text-emerald-700 text-xs font-bold uppercase px-2 py-1 rounded">50% OFF</span>
                </div>
              </div>

              <ul className="space-y-4 mb-8 text-neutral-700">
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span><strong>30 Products</strong></span>
                </li>
                <li className="flex items-start gap-3"><svg className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg><span>Business Profile</span></li>
                <li className="flex items-start gap-3"><svg className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg><span>Logo Upload</span></li>
                <li className="flex items-start gap-3"><svg className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg><span>PDF Upload</span></li>
                <li className="flex items-start gap-3"><svg className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg><span>6 Images/Product</span></li>
                <li className="flex items-start gap-3"><svg className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg><span>Video Upload</span></li>
                <li className="flex items-start gap-3"><svg className="w-5 h-5 text-neutral-300 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg><span className="text-neutral-400">Contact Seller</span></li>
                <li className="flex items-start gap-3"><svg className="w-5 h-5 text-neutral-300 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg><span className="text-neutral-400">HTML/CSS Editor</span></li>
                <li className="flex items-start gap-3"><svg className="w-5 h-5 text-neutral-300 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg><span className="text-neutral-400">Ad Pre-Approval</span></li>
              </ul>

              <a href="https://www.mallofcayman.com/shop/subscriptions" className="block w-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-center py-4 rounded-full transition-all duration-300 hover:shadow-xl cursor-pointer" style={{ pointerEvents: 'auto' }}>
                Join Now
              </a>
            </div>

            {/* Gold Plan */}
            <div className="pricing-card bg-white border-2 border-neutral-200 rounded-3xl p-8 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
              <div className="mb-6">
                <div className="inline-block bg-amber-100 text-amber-700 text-xs font-bold uppercase tracking-wide px-3 py-1 rounded-full mb-4">
                  Gold
                </div>
                <div className="flex items-baseline gap-2 mb-2">
                  <span className="text-5xl font-bold text-neutral-900">US$160</span>
                  <span className="text-neutral-500">/month</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-neutral-400 line-through text-lg">US$320</span>
                  <span className="inline-block bg-emerald-100 text-emerald-700 text-xs font-bold uppercase px-2 py-1 rounded">50% OFF</span>
                </div>
              </div>

              <ul className="space-y-4 mb-8 text-neutral-700">
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span><strong>50 Products</strong></span>
                </li>
                <li className="flex items-start gap-3"><svg className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg><span>Business Profile</span></li>
                <li className="flex items-start gap-3"><svg className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg><span>Logo Upload</span></li>
                <li className="flex items-start gap-3"><svg className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg><span>PDF Upload</span></li>
                <li className="flex items-start gap-3"><svg className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg><span>6 Images/Product</span></li>
                <li className="flex items-start gap-3"><svg className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg><span>Video Upload</span></li>
                <li className="flex items-start gap-3"><svg className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg><span>Contact Seller</span></li>
                <li className="flex items-start gap-3"><svg className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg><span>HTML/CSS Editor</span></li>
                <li className="flex items-start gap-3"><svg className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg><span>Ad Pre-Approval</span></li>
              </ul>

              <a href="https://www.mallofcayman.com/shop/subscriptions" className="block w-full bg-neutral-900 hover:bg-neutral-800 text-white font-bold text-center py-4 rounded-full transition-all duration-300 hover:shadow-lg cursor-pointer" style={{ pointerEvents: 'auto' }}>
                Join Now
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Testimonial