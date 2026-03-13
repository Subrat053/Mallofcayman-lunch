import React, { useEffect, useState } from 'react'

const Marketing = () => {
    const [daysLeft, setDaysLeft] = useState('00');

    useEffect(() => {
        const countDownDate = new Date('2026-04-01T00:00:00-05:00').getTime();
        const updateDays = () => {
            const now = new Date().getTime();
            const distance = countDownDate - now;
            if (distance < 0) {
                setDaysLeft('00');
            } else {
                const days = Math.floor(distance / (1000 * 60 * 60 * 24));
                setDaysLeft(String(days).padStart(2, '0'));
            }
        };
        updateDays();
        const interval = setInterval(updateDays, 60 * 1000); // update every minute
        return () => clearInterval(interval);
    }, []);
    return (
        <>
            {/* Social Media Marketing Section */}
            <section className="marketing-section py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-slate-50 animate-on-scroll">
                <div className="max-w-5xl mx-auto text-center">
                    <span className="inline-block bg-emerald-100 text-emerald-700 text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-5">
                        Save on Marketing Cost!!
                    </span>
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 mb-3">
                        We Promote You Monthly
                    </h2>
                    <div className="w-12 h-1 bg-amber-500 mx-auto rounded-full mb-5"></div>
                    <p className="text-base md:text-lg text-slate-500 mb-12 max-w-2xl mx-auto leading-relaxed">
                        Mall of Cayman actively markets our vendors across <strong className="text-slate-800">Facebook, Instagram, and Youtube</strong> every month through vendor spotlights, product highlights, and seasonal campaigns.
                    </p>

                    <div className="grid sm:grid-cols-3 gap-6">
                        {/* Facebook */}
                        <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm hover:shadow-md transition-all duration-300 group">
                            <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-5 group-hover:bg-blue-100 transition-colors">
                                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" className="text-indigo-600" viewBox="0 0 16 16">
                                    <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951" />
                                </svg>
                            </div>
                            <h3 className="text-lg font-bold text-slate-900 mb-2">Facebook</h3>
                            <p className="text-slate-500 text-sm leading-relaxed">Monthly vendor features & product showcases</p>
                        </div>

                        {/* Instagram */}
                        <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm hover:shadow-md transition-all duration-300 group">
                            <div className="w-14 h-14 bg-pink-50 rounded-2xl flex items-center justify-center mx-auto mb-5 group-hover:bg-pink-100 transition-colors">
                                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" className="text-pink-600" viewBox="0 0 16 16">
                                    <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.9 3.9 0 0 0-1.417.923A3.9 3.9 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.9 3.9 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.9 3.9 0 0 0-.923-1.417A3.9 3.9 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599s.453.546.598.92c.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.5 2.5 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.5 2.5 0 0 1-.92-.598 2.5 2.5 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233s.008-2.388.046-3.231c.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92s.546-.453.92-.598c.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92m-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217m0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334" />
                                </svg>
                            </div>
                            <h3 className="text-lg font-bold text-slate-900 mb-2">Instagram</h3>
                            <p className="text-slate-500 text-sm leading-relaxed">Story highlights & carousel posts</p>
                        </div>

                        {/* YouTube */}
                        <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm hover:shadow-md transition-all duration-300 group">
                            <div className="w-14 h-14 bg-red-50 rounded-2xl flex items-center justify-center mx-auto mb-5 group-hover:bg-red-100 transition-colors">
                                <img src="/youtube-logo.png" alt="YouTube Logo" className="w-10 h-10 scale-125" />
                            </div>
                            <h3 className="text-lg font-bold text-slate-900 mb-2">YouTube</h3>
                            <p className="text-slate-500 text-sm leading-relaxed">Product demos, tutorials & behind-the-scenes</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Final CTA */}
            <section className="final-cta-section py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-slate-900 text-white animate-on-scroll">
                <div className="max-w-4xl mx-auto text-center">
                    <span className="inline-block border border-amber-500/40 bg-amber-500/10 text-amber-400 text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-6">
                        Limited Time Offer
                    </span>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold mb-3 leading-tight">
                        Lock In Your Founding Rate
                    </h2>
                    <p className="text-xl md:text-2xl font-light text-slate-300 mb-3">Before Prices Double</p>
                    <div className="w-16 h-1 bg-amber-500 mx-auto rounded-full mb-8"></div>
                    <p className="text-base md:text-lg text-slate-400 mb-12 max-w-2xl mx-auto leading-relaxed">
                        Pre-Launch pricing ends <strong className="text-white">April 1st, 2026</strong>. After that, monthly plans renew at standard rates. Don't miss your chance to lock in 50% OFF.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
                        <a
                            href="/register"
                            className="inline-block bg-amber-500 hover:bg-amber-400 text-slate-900 font-extrabold text-lg px-10 py-4 rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105 cursor-pointer"
                            style={{ pointerEvents: 'auto' }}
                        >
                            Join Now
                        </a>
                        <div className="flex items-center gap-2 text-slate-400 text-sm">
                            <svg className="w-4 h-4 text-amber-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span><strong className="text-white">{daysLeft}</strong> days until launch</span>
                        </div>
                    </div>

                    <div className="flex flex-wrap justify-center gap-6 text-sm text-slate-400">
                        {[
                            "No upfront costs",
                            "Cancel after Subscription period",
                            "Full support included",
                        ].map((item) => (
                            <div key={item} className="flex items-center gap-2">
                                <svg className="w-4 h-4 text-emerald-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                </svg>
                                <span>{item}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
};

export default Marketing;