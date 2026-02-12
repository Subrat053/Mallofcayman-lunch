import React from 'react'

const Marketing = () => {
  return (
    <>
     <section className="marketing-section py-12 md:py-20 lg:py-32 px-6 bg-gradient-to-br from-violet-100 via-purple-100 to-fuchsia-100 animate-on-scroll">
        <div className="max-w-5xl mx-auto text-center">
            <div className="inline-block bg-emerald-500 text-white text-sm md:text-base font-bold uppercase tracking-wider px-6 py-3 rounded-full mb-6 shadow-lg">
                SAVE ON MARKETING COST!!
            </div>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-neutral-900 mb-6">
                We Promote You Monthly
            </h2>
            <p className="text-lg md:text-xl text-neutral-600 mb-12 max-w-3xl mx-auto leading-relaxed">
                Mall of Cayman actively markets our vendors across <strong className="text-neutral-900">Facebook, Instagram, and TikTok</strong> every month through vendor spotlights, product highlights, and seasonal campaigns.
            </p>

            <div className="grid md:grid-cols-3 gap-8">
                <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg className="w-8 h-8 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-1.689.072-4.948.072-3.204.013-3.583.072-4.949.072-3.259 0-3.668-.014-4.948-.072-3.26-.149-4.771-1.664 4.919-4.92.058-1.265.073-1.644.073-4.948 0-3.204-.014-3.667-.072-4.949-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.644-.073-4.949-.073zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.205.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 3.26-.149 4.771-1.664 4.919-4.92.058-1.265.073-1.644.073-4.948 0-3.204-.014-3.667-.072-4.949-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.644-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                        </svg>
                    </div>
                    <h3 className="text-xl font-bold text-neutral-900 mb-2">Facebook</h3>
                    <p className="text-neutral-600 text-sm">Monthly vendor features & product showcases</p>
                </div>

                <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg className="w-8 h-8 text-pink-600" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12.525.02c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.205.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 3.26-.149 4.771-1.664 4.919-4.92.058-1.265.073-1.644.073-4.948 0-3.204-.014-3.667-.072-4.949-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.644-.073-4.949-.073zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.205.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 3.26-.149 4.771-1.664 4.919-4.92.058-1.265.073-1.644.073-4.948 0-3.204-.014-3.667-.072-4.949-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.644-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                        </svg>
                    </div>
                    <h3 className="text-xl font-bold text-neutral-900 mb-2">Instagram</h3>
                    <p className="text-neutral-600 text-sm">Story highlights & carousel posts</p>
                </div>

                <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <div className="w-16 h-16 bg-neutral-900 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12.525.02c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.205.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 3.26-.149 4.771-1.664 4.919-4.92.058-1.265.073-1.644.073-4.948 0-3.204-.014-3.667-.072-4.949-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.644-.073-4.949-.073zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.205.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 3.26-.149 4.771-1.664 4.919-4.92.058-1.265.073-1.644.073-4.948 0-3.204-.014-3.667-.072-4.949-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.644-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                        </svg>
                    </div>
                    <h3 className="text-xl font-bold text-neutral-900 mb-2">TikTok</h3>
                    <p className="text-neutral-600 text-sm">Viral product trends & seasonal campaigns</p>
                </div>
            </div>
        </div>
    </section>

    <section className="final-cta-section py-12 md:py-20 lg:py-32 px-6 bg-gradient-to-br from-blue-600 to-emerald-600 text-white animate-on-scroll">
        <div className="max-w-5xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-8 leading-tight">
                Lock In Your Founding Rate
                <span className="block mt-2 text-xl md:text-3xl lg:text-4xl xl:text-5xl text-white/90">Before Prices Double</span>
            </h2>
            <p className="text-xl md:text-2xl text-white/90 mb-12 max-w-3xl mx-auto leading-relaxed">
                Pre-Launch pricing ends <strong className="text-white">April 1st, 2026</strong>. After that, monthly plans renew at standard rates. Don't miss your chance to lock in 50% OFF.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12">
                <a href="https://www.mallofcayman.com/shop/subscriptions" className="inline-block bg-white text-blue-600 hover:bg-neutral-100 font-bold text-lg px-12 py-5 rounded-full shadow-2xl transition-all duration-300 hover:shadow-3xl hover:scale-105 cursor-pointer" style={{ pointerEvents: 'auto' }}>
                    Join Now
                </a>
                <div className="text-white/80 text-sm">
                    <div className="flex items-center gap-2 justify-center">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                        <span id="urgency-days">000</span> days until launch
                    </div>
                </div>
            </div>

            <div className="flex flex-wrap justify-center gap-4 text-sm text-white/70">
                <div className="flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span>No upfront costs</span>
                </div>
                <div className="flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span>Cancel after Subscription period</span>
                </div>
                <div className="flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span>Full support included</span>
                </div>
            </div>
        </div>
    </section>

    </>
  )
}

export default Marketing