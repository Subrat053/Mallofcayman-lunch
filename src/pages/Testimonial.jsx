import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import SubscriptionService from "../services/SubscriptionService";

const DEFAULT_MONTHLY_GOLD_PRICE = 160;

const getGoldPrices = (monthlyPrice) => ({
  monthly: monthlyPrice,
  quarterly: monthlyPrice * 3,
  semiannual: monthlyPrice * 6,
  annual: monthlyPrice * 12,
});

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
  const [subscriptionStatus, setSubscriptionStatus] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    SubscriptionService.getSubscriptionStatus()
      .then((data) => {
        setSubscriptionStatus(data);
      })
      .catch(() => setSubscriptionStatus(null));
  }, []);

  const monthlyGoldPrice =
    Number(subscriptionStatus?.planPricing?.gold?.monthly) ||
    Number(subscriptionStatus?.monthlyPrice) ||
    DEFAULT_MONTHLY_GOLD_PRICE;
  const GOLD_PRICES = useMemo(
    () => getGoldPrices(monthlyGoldPrice),
    [monthlyGoldPrice],
  );
  const isEarlySellerFree = Boolean(subscriptionStatus?.freeAvailable);

  const billingOptions = isEarlySellerFree
    ? [
        {
          value: "annual",
          label: "1 Year Free",
          price: 0,
          discount: "100%",
        },
      ]
    : [
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
          discount: null,
        },
        {
          value: "semiannual",
          label: "6 Months",
          price: GOLD_PRICES.semiannual,
          discount: null,
        },
        {
          value: "annual",
          label: "12 Months",
          price: GOLD_PRICES.annual,
          discount: null,
        },
      ];

  useEffect(() => {
    if (isEarlySellerFree) {
      setBillingCycle("annual");
      return;
    }
    if (!billingOptions.some((option) => option.value === billingCycle)) {
      setBillingCycle("monthly");
    }
  }, [isEarlySellerFree, billingCycle, billingOptions]);

  const currentSelection =
    billingOptions.find((option) => option.value === billingCycle) ||
    billingOptions[0];

  const billingLabel = {
    monthly: "Monthly",
    quarterly: "3 Months",
    semiannual: "6 Months",
    annual: "12 Months",
  }[billingCycle];

  const displayPrice = isEarlySellerFree ? 0 : currentSelection?.price || 0;

  return (
    <>
      <div className="font-sans antialiased text-slate-900 bg-white">
        {/* Cost Comparison Section */}
        <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-slate-50 border-b border-slate-200">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-14">
              <span className="inline-block bg-red-100 text-red-700 text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-4">
                Cost Comparison
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 mb-4">
                The Numbers Don't Lie
              </h2>
              <div className="w-16 h-1 bg-amber-500 mx-auto rounded-full"></div>
            </div>

            <div className="grid md:grid-cols-2 gap-6 lg:gap-8 mb-10">
              {/* Physical Store Card */}
              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
                <div className="px-7 py-5 border-b border-slate-100 flex items-center gap-4 bg-red-50">
                  <div className="w-11 h-11 bg-red-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900">Physical Store</h3>
                </div>
                <div className="px-7 py-5 flex-grow space-y-0">
                  {[
                    { label: "Rent", value: "US$2,250" },
                    { label: "Electricity", value: "US$250" },
                    { label: "Water", value: "US$75" },
                    { label: "1 Staff (Full Package)", value: "US$2,250" },
                  ].map((item) => (
                    <div key={item.label} className="flex justify-between items-center py-3 border-b border-slate-100 last:border-0">
                      <span className="text-slate-500 text-sm">{item.label}</span>
                      <span className="font-semibold text-slate-800">{item.value}</span>
                    </div>
                  ))}
                </div>
                <div className="bg-red-50 px-7 py-5 border-t border-red-100">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Monthly Total</span>
                    <span className="text-3xl font-extrabold text-red-600">US$4,825</span>
                  </div>
                  <div className="flex justify-between items-center pb-4 border-b border-red-100 mb-4">
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Annual Total</span>
                    <span className="text-xl font-bold text-red-600">US$57,900</span>
                  </div>
                  <div className="text-center">
                    <p className="text-xs text-slate-400 uppercase tracking-widest mb-1">Upfront Startup Cost</p>
                    <p className="text-xl font-bold text-slate-800">US$25,000 - US$30,000</p>
                  </div>
                </div>
              </div>

              {/* Mall of Cayman Card */}
              <div className="bg-white rounded-2xl border-2 border-indigo-500 shadow-lg overflow-hidden flex flex-col relative">
                <div className="absolute -top-1 left-28 lg:-top-1 lg:left-52 bg-indigo-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest">
                  Our Solution
                </div>
                <div className="px-7 py-5 border-b border-slate-100 flex items-center gap-4 bg-indigo-50">
                  <div className="w-11 h-11 bg-indigo-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-indigo-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-indigo-900">Mall of Cayman</h3>
                </div>
                <div className="px-7 py-5 flex-grow space-y-0">
                  {[
                    { label: "Monthly Plan", value: "US$50 - US$160" },
                    { label: "Store Manager (Optional)", value: "US$100" },
                    { label: "Electricity", value: "US$0" },
                    { label: "All other costs", value: "US$0", italic: true },
                  ].map((item) => (
                    <div key={item.label} className="flex justify-between items-center py-3 border-b border-slate-100 last:border-0">
                      <span className={`text-sm ${item.italic ? "text-slate-400 italic" : "text-slate-500"}`}>{item.label}</span>
                      <span className="font-semibold text-slate-800">{item.value}</span>
                    </div>
                  ))}
                </div>
                <div className="bg-indigo-700 px-7 py-5 border-t border-indigo-600">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-xs font-bold text-indigo-200 uppercase tracking-widest">Monthly Total</span>
                    <span className="text-3xl font-extrabold text-white">US$260</span>
                  </div>
                  <div className="flex justify-between items-center pb-4 border-b border-indigo-600 mb-4">
                    <span className="text-xs font-bold text-indigo-200 uppercase tracking-widest">Annual Total</span>
                    <span className="text-xl font-bold text-white">US$3,120</span>
                  </div>
                  <p className="text-indigo-300 text-xs mb-4 leading-relaxed">
                    Gold Plan (US$160/month) - 12 months + Store Manager (US$100/month) - 12 months
                  </p>
                  <div className="text-center border-t border-indigo-600 pt-4">
                    <p className="text-xs text-indigo-200 uppercase tracking-widest mb-1">Upfront Startup Cost</p>
                    <p className="text-2xl font-bold text-white">US$0</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Big Visual Statement */}
            <div className="bg-slate-900 rounded-2xl px-8 sm:px-14 md:px-20 py-14 md:py-20 text-center">
              <p className="text-base sm:text-xl md:text-2xl font-light text-slate-300 uppercase tracking-wide mb-4">
                One Full Year on Mall of Cayman Costs Less Than
              </p>
              <p className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold text-amber-500 tracking-tight mb-3">
                65% of ONE MONTH
              </p>
              <p className="text-sm sm:text-base md:text-lg text-slate-400 uppercase tracking-wide">
                of a Traditional Store
              </p>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <span className="inline-block bg-amber-100 text-amber-700 text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-4">
                Pricing
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 mb-4">
                Choose Your Gold Plan
              </h2>
              <div className="w-16 h-1 bg-indigo-600 mx-auto rounded-full mb-5"></div>
              <p className="text-base md:text-lg text-slate-500 max-w-2xl mx-auto leading-relaxed">
                {isEarlySellerFree
                  ? `First ${subscriptionStatus?.freeSellerLimit || 15} sellers get 1 full year of Gold for free. ${subscriptionStatus?.remainingSlots ?? ""} slot${subscriptionStatus?.remainingSlots === 1 ? "" : "s"} left.`
                  : "One plan. All features. Choose the billing period that works for you."}
              
              </p>
            </div>

            {/* Billing cycle toggles */}
            <div className={`grid ${isEarlySellerFree ? "grid-cols-1 sm:grid-cols-1" : "grid-cols-2"} grid-cols-2 sm:grid-cols-4 gap-3 mb-10 max-w-2xl mx-auto`}>
              {billingOptions.map((c) => (
                <button
                  key={c.value}
                  type="button"
                  onClick={() => setBillingCycle(c.value)}
                  className={`relative flex flex-col items-center justify-center py-4 px-3 rounded-xl border-2 font-medium transition-all cursor-pointer ${
                    billingCycle === c.value
                      ? "border-indigo-600 bg-indigo-600 text-white shadow-lg"
                      : "border-slate-200 bg-white text-slate-600 hover:border-indigo-300 hover:bg-indigo-50"
                  }`}
                >
                  {c.discount && (
                    <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 text-[10px] bg-amber-500 text-white px-2 py-0.5 rounded-full whitespace-nowrap font-bold">
                      {isEarlySellerFree ? `FREE ${c.discount}` : `Save ${c.discount}`}
                    </span>
                  )}
                  <span className={`text-xs font-bold uppercase tracking-wide mb-1 ${
                    billingCycle === c.value ? "text-indigo-100" : "text-slate-400"
                  }`}>
                    {c.label}
                  </span>
                  <span className="text-2xl font-extrabold">${c.price}</span>
                </button>
              ))}
            </div>

            {/* Gold Plan Card */}
            <div className="max-w-md mx-auto bg-white rounded-2xl border border-slate-200 shadow-xl overflow-hidden">
              <div className="bg-indigo-700 text-white text-center py-8 px-6">
                <svg className="w-8 h-8 mx-auto mb-3 text-amber-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                </svg>
                <h3 className="text-2xl font-extrabold uppercase tracking-widest mb-1">Gold Plan</h3>
                <p className="text-indigo-300 text-sm">Everything you need to grow</p>
              </div>

              <div className="p-8">
                <div className="text-center mb-8 pb-8 border-b border-slate-100">
                  <span className="text-5xl font-extrabold text-slate-900">${displayPrice}</span>
                  <span className="text-slate-400 font-semibold block text-sm mt-1 uppercase tracking-wide">
                    / {isEarlySellerFree ? "1 year" : billingLabel.toLowerCase()}
                  </span>
                  {isEarlySellerFree && (
                    <span className="text-emerald-600 text-sm font-semibold block mt-2">
                      First {subscriptionStatus?.freeSellerLimit || 15} sellers only
                    </span>
                  )}
                </div>

                <ul className="space-y-3 mb-8">
                  {GOLD_FEATURES.map((f, i) => (
                    <li key={i} className="flex items-center gap-3 text-slate-700 text-sm font-medium">
                      <span className="flex-shrink-0 w-5 h-5 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center">
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                        </svg>
                      </span>
                      {f}
                    </li>
                  ))}
                </ul>

                <button
                  type="button"
                  onClick={() => navigate("/register", { state: { billingCycle } })}
                  className="w-full bg-indigo-700 hover:bg-indigo-800 text-white font-bold uppercase tracking-widest py-4 rounded-xl transition-all duration-200 shadow-md hover:shadow-lg"
                >
                  {isEarlySellerFree ? "Get Started Free" : `Get Started $${displayPrice}`}
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Testimonial;
