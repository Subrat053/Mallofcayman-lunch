import React, { useEffect, useRef } from "react";
import { useLocation, Link } from "react-router-dom";

// Simple confetti burst using canvas
const ConfettiCanvas = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = Array.from({ length: 120 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height - canvas.height,
      r: Math.random() * 6 + 4,
      d: Math.random() * 120 + 10,
      color: `hsl(${Math.random() * 360}, 80%, 55%)`,
      tilt: Math.random() * 10 - 10,
      tiltAngle: 0,
      tiltAngleIncrement: Math.random() * 0.07 + 0.05,
    }));

    let frame;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.tiltAngle += p.tiltAngleIncrement;
        p.y += (Math.cos(p.d) + 2) * 1.2;
        p.tilt = Math.sin(p.tiltAngle) * 15;

        ctx.beginPath();
        ctx.lineWidth = p.r / 2;
        ctx.strokeStyle = p.color;
        ctx.moveTo(p.x + p.tilt + p.r / 4, p.y);
        ctx.lineTo(p.x + p.tilt, p.y + p.tilt + p.r / 4);
        ctx.stroke();

        if (p.y > canvas.height) {
          p.x = Math.random() * canvas.width;
          p.y = -10;
        }
      });
      frame = requestAnimationFrame(draw);
    };
    draw();

    const timeout = setTimeout(() => cancelAnimationFrame(frame), 6000);
    return () => {
      cancelAnimationFrame(frame);
      clearTimeout(timeout);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-50"
    />
  );
};

const SuccessPage = () => {
  const { state } = useLocation();
  const shopName = state?.name || "Seller";
  const shopEmail = state?.email || "";
  const plan = state?.selectedPlan || "";
  const billing = state?.billingCycle || "";
  const paymentFree = state?.paymentFree ?? false;

  const planLabel = plan
    ? plan.charAt(0).toUpperCase() + plan.slice(1).replace("-", " ")
    : "";

  const billingLabel =
    {
      monthly: "Monthly",
      quarterly: "3-Month",
      semiannual: "6-Month",
      annual: "Annual",
    }[billing] || "";

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col items-center justify-center px-4 py-12 relative overflow-hidden">
      <ConfettiCanvas />

      {/* Background decoration */}
      <div className="absolute w-[500px] h-[500px] rounded-full bg-indigo-100 opacity-30 blur-3xl -top-32 -left-32 pointer-events-none" />
      <div className="absolute w-[500px] h-[500px] rounded-full bg-emerald-100 opacity-30 blur-3xl -bottom-32 -right-32 pointer-events-none" />

      <div className="relative z-10 w-full max-w-xl">
        {/* Card */}
        <div className="bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden">
          {/* Top banner */}
          <div className="bg-indigo-700 px-8 py-10 text-center">
            <div className="flex justify-center mb-5">
              <div className="w-20 h-20 rounded-full bg-white/20 border-4 border-white/30 flex items-center justify-center shadow-lg">
                <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white mb-2">
              🎉 Congratulations!
            </h1>
            <p className="text-indigo-200 text-lg font-medium">Welcome aboard, {shopName}!</p>
          </div>

          <div className="px-6 sm:px-8 py-8 space-y-6">
            {/* Description */}
            <div className="text-center space-y-2">
              <p className="text-slate-700 font-medium">
                You have successfully purchased the{" "}
                <span className="text-amber-600 font-bold">Gold Plan</span> —{" "}
                {billingLabel} billing at{" "}
                <span className="font-bold text-slate-900">
                  $
                  {{
                    monthly: "99",
                    "3-Month": "267.30",
                    "6-Month": "504.90",
                    Annual: "950.40",
                  }[billingLabel] || "99"}
                </span>
                .
              </p>
              <p className="text-sm text-slate-500">
                Your store is now verified and your subscription is active. Start
                listing products and reach customers across the Cayman Islands.
              </p>
            </div>

            {/* Subscription badge */}
            {planLabel && (
              <div className="flex justify-center">
                <div className="inline-flex items-center gap-2.5 bg-indigo-50 border border-indigo-200 text-indigo-800 px-5 py-2.5 rounded-full text-sm font-semibold">
                  <span className="text-lg">💎</span>
                  {planLabel} Plan · {billingLabel} Billing
                  {paymentFree && (
                    <span className="ml-1 bg-indigo-200 text-indigo-700 px-2 py-0.5 rounded-full text-xs font-bold">
                      Revenue Share
                    </span>
                  )}
                </div>
              </div>
            )}

            {/* What happens next */}
            <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-5">
              <h3 className="font-bold text-slate-900 text-base mb-4">
                What happens next?
              </h3>
              <ol className="space-y-2.5">
                {[
                  "Your account is active and ready to use",
                  paymentFree
                    ? "You'll pay 10% commission only when you make sales"
                    : "Your subscription is confirmed and payment processed",
                  "Admin will review your trade license documents",
                  "Once approved you can start listing products",
                  "Customers across Cayman Islands can discover your shop!",
                ].map((step, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-slate-700">
                    <span className="flex-shrink-0 w-5 h-5 rounded-full bg-emerald-500 text-white text-xs font-bold flex items-center justify-center mt-0.5">
                      {i + 1}
                    </span>
                    {step}
                  </li>
                ))}
              </ol>
            </div>

            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                to="/"
                className="flex-1 text-center px-6 py-3 bg-indigo-700 hover:bg-indigo-800 text-white font-semibold rounded-xl transition-all duration-200 shadow-md hover:shadow-lg"
              >
                🏠 Back to Home
              </Link>
              <a
                href="mailto:info@mallofcayman.com"
                className="flex-1 text-center px-6 py-3 bg-white border-2 border-slate-200 text-slate-700 font-semibold rounded-xl hover:border-indigo-400 hover:text-indigo-600 transition-all duration-200"
              >
                ✉️ Contact Support
              </a>
            </div>

            {/* Email note */}
            <p className="text-center text-xs text-slate-400">
              {shopEmail ? (
                <>
                  A confirmation email has been sent to{" "}
                  <span className="font-semibold text-slate-600">{shopEmail}</span>.
                </>
              ) : (
                "A confirmation email will be sent to your registered address shortly."
              )}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuccessPage;
