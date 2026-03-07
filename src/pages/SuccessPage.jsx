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
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-4 relative overflow-hidden">
      <ConfettiCanvas />

      {/* Glow rings */}
      <div className="absolute w-96 h-96 rounded-full bg-green-100 opacity-40 blur-3xl -top-24 -left-24" />
      <div className="absolute w-96 h-96 rounded-full bg-blue-100 opacity-40 blur-3xl -bottom-24 -right-24" />

      <div className="relative z-10 max-w-lg w-full text-center space-y-6">
        {/* Animated check */}
        <div className="flex justify-center">
          <div className="w-28 h-28 rounded-full bg-gradient-to-br from-green-400 to-emerald-600 flex items-center justify-center shadow-2xl animate-bounce-once">
            <svg
              className="w-14 h-14 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
        </div>

        {/* Main message */}
        <div className="space-y-3">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 leading-tight">
            🎉 Congratulations!
          </h1>
          <p className="text-xl sm:text-2xl font-semibold text-green-600">
            Welcome aboard, {shopName}!
          </p>
          <p className="text-base sm:text-lg text-gray-700 font-medium">
            You have successfully purchased the{" "}
            <span className="text-yellow-600 font-bold">Gold Plan</span> —{" "}
            {billingLabel} billing at{" "}
            <span className="font-bold text-gray-900">
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
          <p className="text-sm text-gray-500">
            Your store is now verified and your subscription is active. Start
            listing products and reach customers across the Cayman Islands.
          </p>
        </div>

        {/* Subscription badge */}
        {planLabel && (
          <div className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-full shadow-lg text-sm font-semibold">
            <span className="text-xl">💎</span>
            {planLabel} Plan · {billingLabel} Billing
            {paymentFree && (
              <span className="ml-1 bg-white/20 px-2 py-0.5 rounded-full text-xs">
                Revenue Share
              </span>
            )}
          </div>
        )}

        {/* Info card */}
        <div className="bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 rounded-2xl p-6 text-left shadow-sm">
          <h3 className="font-bold text-green-900 text-lg mb-4">
            What happens next?
          </h3>
          <ol className="space-y-3 text-sm text-green-800">
            {[
              "Your account is active and ready to use",
              paymentFree
                ? "You'll pay 10% commission only when you make sales"
                : "Your subscription is confirmed and payment processed",
              "Admin will review your trade license documents",
              "Once approved you can start listing products",
              "Customers across Cayman Islands can discover your shop!",
            ].map((step, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-green-500 text-white text-xs font-bold flex items-center justify-center">
                  {i + 1}
                </span>
                {step}
              </li>
            ))}
          </ol>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
          <Link
            to="/"
            className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all shadow-md hover:shadow-lg"
          >
            🏠 Back to Home
          </Link>
          <a
            href="mailto:info@mallofcayman.com"
            className="px-8 py-3 bg-white border-2 border-gray-200 text-gray-700 font-semibold rounded-xl hover:border-blue-400 hover:text-blue-600 transition-all"
          >
            ✉️ Contact Support
          </a>
        </div>

        <p className="text-xs text-gray-400">
          {shopEmail ? (
            <>
              A confirmation email has been sent to{" "}
              <span className="font-semibold text-gray-600">{shopEmail}</span>.
            </>
          ) : (
            "A confirmation email will be sent to your registered address shortly."
          )}
        </p>
      </div>
    </div>
  );
};

export default SuccessPage;
