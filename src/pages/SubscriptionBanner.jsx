import React, { useState, useEffect } from "react";
import SubscriptionService from "../services/SubscriptionService";

const SubscriptionBanner = ({ compact = false }) => {
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    SubscriptionService.getSubscriptionStatus()
      .then((data) => setStatus(data))
      .catch(() => setStatus(null))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center py-4">
        <div className="animate-pulse bg-slate-200 rounded-xl h-20 w-full max-w-2xl" />
      </div>
    );
  }

  if (!status) return null;

  // ── Free slots available ──────────────────────────────────────────────────
  if (status.freeAvailable) {
    if (compact) {
      return (
        <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-xl px-4 py-3 text-center shadow-lg">
          <p className="font-bold text-sm">
            🔥 Only {status.remainingSlots} Free Slot{status.remainingSlots !== 1 ? "s" : ""} Remaining!
          </p>
        </div>
      );
    }

    return (
      <div className="relative overflow-hidden bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 rounded-2xl px-6 py-6 md:px-8 md:py-8 text-white shadow-xl">
        {/* Decorative circles */}
        <div className="absolute -top-6 -right-6 w-24 h-24 bg-white/10 rounded-full" />
        <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-white/10 rounded-full" />

        <div className="relative z-10 text-center">
          <p className="text-3xl md:text-4xl font-extrabold mb-2">
            🔥 Early Seller Offer
          </p>
          <p className="text-lg md:text-xl font-medium mb-4 text-white/90">
            First {status.freeSellerLimit} sellers get <span className="underline decoration-yellow-300 decoration-2">FREE</span> subscription!
          </p>
          <div className="inline-flex items-center gap-3 bg-white/20 backdrop-blur-sm rounded-full px-6 py-3">
            <span className="text-2xl md:text-3xl font-extrabold">
              {status.remainingSlots}
            </span>
            <span className="text-sm md:text-base font-semibold text-white/90">
              Free Slot{status.remainingSlots !== 1 ? "s" : ""} Remaining
            </span>
          </div>
        </div>
      </div>
    );
  }

  // ── All free slots taken ──────────────────────────────────────────────────
  if (compact) {
    return (
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl px-4 py-3 text-center shadow-lg">
        <p className="font-bold text-sm">
          Subscription Plans Starting at ${status.monthlyPrice}/month
        </p>
      </div>
    );
  }

  return (
    <div className="relative overflow-hidden bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700 rounded-2xl px-6 py-6 md:px-8 md:py-8 text-white shadow-xl">
      <div className="absolute -top-6 -right-6 w-24 h-24 bg-white/10 rounded-full" />
      <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-white/10 rounded-full" />

      <div className="relative z-10 text-center">
        <p className="text-2xl md:text-3xl font-extrabold mb-2">
          Subscription Required
        </p>
        <p className="text-lg md:text-xl font-medium text-white/90">
          Plans starting at <span className="text-yellow-300 font-extrabold">${status.monthlyPrice}/month</span>
        </p>
      </div>
    </div>
  );
};

export default SubscriptionBanner;
