import { div } from 'framer-motion/client'
import React from 'react'

const Store = () => {
  return (
    <>
      <section className="store-manager-section py-12 md:py-20 lg:py-32 px-6 bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 animate-on-scroll">
        <div className="max-w-5xl mx-auto">
          <div className="bg-white border-2 border-blue-200 rounded-3xl p-6 md:p-10 lg:p-12 shadow-xl">
            <div className="grid md:grid-cols-2 gap-8 md:gap-10 items-center">
              <div>
                <div className="inline-block bg-blue-100 text-blue-700 text-xs font-bold uppercase tracking-wide px-3 py-1 rounded-full mb-4">
                  Optional Add-On
                </div>
                <h3 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
                  Store Manager Service
                </h3>
                <div className="flex items-baseline gap-2 mb-6">
                  <span className="text-5xl font-bold text-blue-600">US$100</span>
                  <span className="text-neutral-500">/month</span>
                </div>
                <div className="flex items-center gap-2 mb-8">
                  <span className="text-neutral-400 line-through text-lg">US$200</span>
                  <span className="inline-block bg-emerald-100 text-emerald-700 text-xs font-bold uppercase px-2 py-1 rounded">50% OFF Pre-Launch</span>
                </div>
              </div>
              <div>
                <p className="text-neutral-700 mb-6 leading-relaxed">
                  Focus on creating your products while we handle the backend. Our Store Manager service includes:
                </p>
                <ul className="space-y-3 text-neutral-700">
                  <li className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span>Product uploads & descriptions</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span>Inventory updates & tracking</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span>Order management support</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span>Backend administration</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

       <section className="pricing-terms-section py-12 md:py-20 lg:py-32 px-6 bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 animate-on-scroll">
        <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center text-neutral-900 mb-8 md:mb-12">
                Pricing Terms – Clear & Simple
            </h2>

            <div className="bg-blue-50 border-2 border-blue-200 rounded-3xl p-6 md:p-8 lg:p-10 mb-8">
                <div className="flex items-start gap-4 mb-6">
                    <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
                        </svg>
                    </div>
                    <div>
                        <h3 className="text-xl font-bold text-neutral-900 mb-3">Monthly Plans</h3>
                        <p className="text-neutral-700 mb-4 leading-relaxed">
                            All monthly plans receive <strong className="text-blue-600">50% OFF until April 1st, 2026</strong>. After launch, monthly plans renew at standard pricing.
                        </p>
                        <div className="bg-white rounded-xl p-4 border border-blue-200">
                            <p className="text-sm text-neutral-700 mb-2"><strong>Example:</strong></p>
                            <ul className="space-y-2 text-sm text-neutral-700">
                                <li className="flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 bg-blue-600 rounded-full"></span>
                                    <span>Gold Plan: <strong>US$160/month</strong> during Pre-Launch</span>
                                </li>
                                <li className="flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 bg-blue-600 rounded-full"></span>
                                    <span>After April 1st, 2026: Renews at <strong>US$320/month</strong></span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-emerald-50 border-2 border-emerald-200 rounded-3xl p-6 md:p-8 lg:p-10">
                <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-emerald-600 rounded-full flex items-center justify-center">
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                    </div>
                    <div>
                        <h3 className="text-xl font-bold text-neutral-900 mb-3">Annual Plans (Best Value)</h3>
                        <p className="text-neutral-700 mb-4 leading-relaxed">
                            Lock in the <strong className="text-emerald-600">50% founding rate for the first year</strong> by choosing an annual plan. Plus, receive an additional <strong className="text-emerald-600">10% OFF Year 2 renewal</strong>.
                        </p>
                        <div className="bg-white rounded-xl p-4 border border-emerald-200">
                            <p className="text-sm text-neutral-700 mb-2"><strong>Example:</strong></p>
                            <ul className="space-y-2 text-sm text-neutral-700">
                                <li className="flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 bg-emerald-600 rounded-full"></span>
                                    <span>Gold Annual: <strong>US$1,920/year</strong> (US$160/month rate locked in)</span>
                                </li>
                                <li className="flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 bg-emerald-600 rounded-full"></span>
                                    <span>Year 2 Renewal: <strong>US$1,728/year</strong> (10% discount applied)</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    </>
  )
}

export default Store