import React, { useState, useEffect } from 'react';
import cayman from '../assets/cayman.mp4'
import img from '../assets/img.jpg'
import SubscriptionBanner from './SubscriptionBanner';
const Hero = () => {
    const [timeLeft, setTimeLeft] = useState({
        days: '00',
        hours: '00',
        minutes: '00',
        seconds: '00',
    });

    useEffect(() => {
        const countDownDate = new Date('2026-04-01T00:00:00-05:00').getTime();

        const interval = setInterval(() => {
            const now = new Date().getTime();
            const distance = countDownDate - now;

            if (distance < 0) {
                clearInterval(interval);
                setTimeLeft({ days: '00', hours: '00', minutes: '00', seconds: '00' });
            } else {
                const days = Math.floor(distance / (1000 * 60 * 60 * 24));
                const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((distance % (1000 * 60)) / 1000);

                setTimeLeft({
                    days: String(days).padStart(2, '0'),
                    hours: String(hours).padStart(2, '0'),
                    minutes: String(minutes).padStart(2, '0'),
                    seconds: String(seconds).padStart(2, '0'),
                });
            }
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -10% 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        document.querySelectorAll('.animate-on-scroll').forEach(el => observer.observe(el));

        return () => observer.disconnect();
    }, []);

    return (
        <>
            <section className="mt-24 lg:mt-16 hero-section relative lg:min-h-[calc(100vh-56px)] min-h-[calc(100vh-96px)] flex items-end justify-center overflow-hidden bg-blue-100">
                {/* Video Background */}
                <div className="absolute inset-0 w-full h-full">
                    <video
                        className="w-full h-full border border-red-700 object-cover lg:object-contain opacity-90"
                        autoPlay
                        muted
                        loop
                        controls
                        playsInline
                        // poster="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1920' height='1080'%3E%3Crect fill='%23f5f5f5' width='1920' height='1080'/%3E%3C/svg%3E"
                    >
                        <source src={cayman} type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                    <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70 pointer-events-none"></div>
                </div>

                {/* Hero Content */}
                <div className="relative bottom-8 z-10 max-w-7xl mx-auto px-6 pt-10 mb-10 text-center animate-on-scroll w-full">
                    {/* Countdown Timer */}
                    <div className="countdown-container inline-flex items-center gap-2 md:gap-4 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl px-4 py-4 md:px-8 md:py-6 mb-4 lg:mb-8 shadow-2xl">
                        <div className="countdown-item text-center">
                            <div className="countdown-value text-2xl md:text-4xl lg:text-6xl font-bold text-white" id="days">{timeLeft.days}</div>
                            <div className="countdown-label text-[10px] md:text-xs lg:text-sm text-white/70 uppercase tracking-widest mt-1">Days</div>
                        </div>
                        <div className="countdown-separator text-2xl md:text-4xl lg:text-6xl text-white/50 font-light">:</div>
                        <div className="countdown-item text-center">
                            <div className="countdown-value text-2xl md:text-4xl lg:text-6xl font-bold text-white" id="hours">{timeLeft.hours}</div>
                            <div className="countdown-label text-[10px] md:text-xs lg:text-sm text-white/70 uppercase tracking-widest mt-1">Hours</div>
                        </div>
                        <div className="countdown-separator text-2xl md:text-4xl lg:text-6xl text-white/50 font-light">:</div>
                        <div className="countdown-item text-center">
                            <div className="countdown-value text-2xl md:text-4xl lg:text-6xl font-bold text-white" id="minutes">{timeLeft.minutes}</div>
                            <div className="countdown-label text-[10px] md:text-xs lg:text-sm text-white/70 uppercase tracking-widest mt-1">Minutes</div>
                        </div>
                        <div className="countdown-separator text-2xl md:text-4xl lg:text-6xl text-white/50 font-light">:</div>
                        <div className="countdown-item text-center ">
                            <div className="countdown-value text-2xl md:text-4xl lg:text-6xl font-bold text-white" id="seconds">{timeLeft.seconds}</div>
                            <div className="countdown-label text-[10px] md:text-xs lg:text-sm text-white/70 uppercase tracking-widest mt-1">Seconds</div>
                        </div>
                    </div>

                    <h1 className="text-3xl md:text-4xl lg:text-6xl xl:text-7xl font-bold text-white mb-3 lg:mb-6 leading-tight">
                        Mall of Cayman
                    </h1>
                    <p className="text-sm md:text-lg lg:text-2xl text-white/90 max-w-3xl mx-auto mb-1 font-medium">
                        Where Cayman's Next Business Leaders Begin
                    </p>
                </div>
            </section>

            {/* Early Seller Subscription Banner */}
            <section className="py-8 px-6">
                <div className="max-w-4xl mx-auto">
                    <SubscriptionBanner />
                </div>
            </section>

            <section className="emotional-capture-section py-12 md:py-20 lg:py-32 px-6 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 animate-on-scroll">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-2xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-neutral-900 mb-8 leading-tight">
                        The Moment You Just Felt <span className="text-blue-600">Was Opportunity.</span>
                    </h2>
                    <p className="text-base md:text-lg lg:text-xl text-neutral-600 mb-12 leading-relaxed max-w-3xl mx-auto">
                        You've dreamed of launching your own business. You've felt the weight of high costs holding you back. Today, that changes. Mall of Cayman is opening its doors to Cayman's next generation of entrepreneurs—and you can secure your spot at <strong className="text-neutral-900">50% OFF founding rates</strong>.
                    </p>
                    <a href="/register" className="cta-button inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold text-lg px-10 py-5 rounded-full shadow-xl transition-all duration-300 hover:shadow-2xl hover:scale-105 cursor-pointer" style={{ pointerEvents: 'auto' }}>
                        Join Now
                    </a>
                </div>
            </section>

            <section className="max-w-7xl mx-auto px-6 py-16">
                <div className="grid md:grid-cols-2 gap-10 items-center">

                    {/* Image */}
                    <div>
                        <img
                            src={img}
                            alt="WhatsApp Content"
                            className="rounded-2xl shadow-xl w-full"
                        />
                    </div>

                    {/* Text */}
                    <div>
                        <h2 className="text-3xl font-bold mb-4 text-blue-700">
                            Mall Of Cayman
                        </h2>
                        <p className=" leading-relaxed">
                            The cost of living in Cayman is rising. Starting a physical store is expensive.
                        </p>
                        <p>So we built something different.</p>
                        <p>Mall of Cayman gives you a platform to launch your business online without the cost of storefront rent.</p>
                        <p>Prelaunch vendors receive <strong>50% OFF</strong> subscription pricing.</p>
                        <p>Lock in your rate before April increases.</p>
                    </div>

                </div>
            </section>
        </>
    )
}

export default Hero