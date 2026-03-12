import React, { useState, useRef, useCallback } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { HiOutlineCamera } from "react-icons/hi";
import { MdMyLocation } from "react-icons/md";
import { FiMapPin, FiArrowLeft, FiArrowRight, FiCheck } from "react-icons/fi";
import { BsCreditCard } from "react-icons/bs";
import { loadStripe } from "@stripe/stripe-js";
import {
  CardElement,
  Elements,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { API_CONFIG } from "../config/api.config";
import SubscriptionService from "../services/SubscriptionService";
import SubscriptionBanner from "./SubscriptionBanner";

const API_BASE = `${API_CONFIG.baseURL}/api`;
const DEFAULT_MONTHLY_GOLD_PRICE = 160;

const getGoldPriceMap = (monthlyPrice) => ({
  monthly: monthlyPrice,
  quarterly: monthlyPrice * 3,
  semiannual: monthlyPrice * 6,
  annual: monthlyPrice * 12,
});

const getPaidPlans = (monthlyPrice) => [
  {
    id: "monthly",
    label: "Monthly",
    price: monthlyPrice,
    cycle: "monthly",
    period: "/month",
  },
  {
    id: "semiannual",
    label: "Semiannual",
    price: monthlyPrice * 6,
    cycle: "semiannual",
    period: "/6 months",
  },
  {
    id: "annual",
    label: "Annual",
    price: monthlyPrice * 12,
    cycle: "annual",
    period: "/year",
    save: "Best Value",
  },
];

// ─── CONFIG ──────────────────────────────────────────────────────────────────
// Load Stripe with public key from environment
const STRIPE_PUBLISHABLE_KEY = API_CONFIG.stripePublicKey || "";
const stripeKeyValid =
  STRIPE_PUBLISHABLE_KEY.startsWith("pk_") &&
  !STRIPE_PUBLISHABLE_KEY.includes("PASTE_YOUR") &&
  !STRIPE_PUBLISHABLE_KEY.includes("REPLACE_WITH");
const stripePromise = stripeKeyValid
  ? loadStripe(STRIPE_PUBLISHABLE_KEY)
  : null;

// ─── SUBSCRIPTION PLANS ──────────────────────────────────────────────────────
const GOLD_PLAN = {
  id: "gold",
  name: "Gold",
  color: "from-yellow-400 to-yellow-600",
  features: [
    "Unlimited Products",
    "Business profile & logo",
    "10 images/product",
    "Video option",
    "Contact seller",
    "PDF upload",
    "HTML/CSS editor",
    "Ad pre-approval",
  ],
};

// Keep PLANS as a single-item array so the rest of the code (getPrice, order
// summary lookups) works without any other changes.
const PLANS = [GOLD_PLAN];

// ─── STRIPE PAYMENT FORM ─────────────────────────────────────────────────────
const StripePaymentForm = ({
  onSuccess,
  clientSecret,
  isLoading,
  setIsLoading,
}) => {
  const stripe = useStripe();
  const elements = useElements();
  const [cardError, setCardError] = React.useState(null);

  const handlePay = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    const card = elements.getElement(CardElement);
    setIsLoading(true);
    setCardError(null);

    try {
      const { error, paymentIntent } = await stripe.confirmCardPayment(
        clientSecret,
        {
          payment_method: {
            card,
          },
        },
      );

      if (error) {
        setCardError(error.message);
        toast.error(error.message || "Payment failed");
        setIsLoading(false);
        return;
      }

      if (!paymentIntent || paymentIntent.status !== "succeeded") {
        setCardError("Payment was not completed.");
        toast.error("Payment was not completed.");
        setIsLoading(false);
        return;
      }

      onSuccess(paymentIntent.id);
    } catch (err) {
      toast.error(err.response?.data?.message || "An unexpected error occurred");
      setCardError(err.response?.data?.message);
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handlePay} className="space-y-5">
      <div className="p-4 border-2 border-slate-200 rounded-xl bg-white focus-within:border-indigo-400 transition-colors">
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#374151",
                fontFamily: "ui-sans-serif, system-ui, sans-serif",
                "::placeholder": { color: "#9ca3af" },
              },
              invalid: { color: "#ef4444" },
            },
            hidePostalCode: false,
          }}
          onChange={(e) => setCardError(e.error?.message || null)}
        />
      </div>
      {cardError && <p className="text-red-500 text-sm">{cardError}</p>}
      <button
        type="submit"
        disabled={!stripe || isLoading}
        className="w-full py-3 bg-indigo-700 hover:bg-indigo-800 text-white font-semibold rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
      >
        {isLoading ? (
          <span className="flex items-center justify-center gap-2">
            <span className="animate-spin rounded-full h-4 w-4 border-b-2 border-white" />
            Processing Payment…
          </span>
        ) : (
          "Pay Now & Register"
        )}
      </button>
      <p className="text-center text-xs text-slate-500">
        🔒 Payments are secure and encrypted via Stripe
      </p>
    </form>
  );
};

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────
const Register = () => {
  const navigate = useNavigate();

  const [currentStep, setCurrentStep] = useState(1);
  // Gold is the only plan – always pre-selected
  const [selectedPlan, setSelectedPlan] = useState("gold");
  const [visible, setVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [avatar, setAvatar] = useState(null);
  const [tradeLicenses, setTradeLicenses] = useState([]);
  const [clientSecret, setClientSecret] = useState(null);
  const [isLoadingMap, setIsLoadingMap] = useState(false);
  const [errors, setErrors] = useState({ name: "", email: "", password: "" });
  const [subscriptionStatus, setSubscriptionStatus] = useState(null);
  const [isFreeEarlySeller, setIsFreeEarlySeller] = useState(false);
  const [paidPlanCycle, setPaidPlanCycle] = useState("monthly");
  const [monthlyGoldPrice, setMonthlyGoldPrice] = useState(
    DEFAULT_MONTHLY_GOLD_PRICE,
  );

  const goldPrices = React.useMemo(
    () => getGoldPriceMap(monthlyGoldPrice),
    [monthlyGoldPrice],
  );
  const paidPlans = React.useMemo(
    () => getPaidPlans(monthlyGoldPrice),
    [monthlyGoldPrice],
  );

  const [formData, setFormData] = useState({
    email: "",
    name: "",
    phoneNumber: "",
    address: "",
    zipCode: "",
    password: "",
    latitude: "",
    longitude: "",
    paypalEmail: "",
    bankAccountName: "",
    bankAccountNumber: "",
    bankName: "",
    ifscCode: "",
    bankAccountType: "",
  });

  const addressInputRef = useRef(null);

  // ── Fetch early seller subscription status ────────────────────────────────
  React.useEffect(() => {
    SubscriptionService.getSubscriptionStatus()
      .then((data) => {
        setSubscriptionStatus(data);
        const backendMonthly =
          Number(data?.planPricing?.gold?.monthly) ||
          Number(data?.monthlyPrice) ||
          DEFAULT_MONTHLY_GOLD_PRICE;
        setMonthlyGoldPrice(backendMonthly);
        if (data.freeAvailable) {
          setIsFreeEarlySeller(true);
        }
      })
      .catch(() => setSubscriptionStatus(null));
  }, []);

  // ── Autocomplete ──────────────────────────────────────────────────────────
  const initAutocomplete = useCallback(() => {
    if (window.google && addressInputRef.current && !window._autocompleteInit) {
      window._autocompleteInit = true;
      const ac = new window.google.maps.places.Autocomplete(
        addressInputRef.current,
        { types: ["address"] },
      );
      ac.addListener("place_changed", () => {
        const place = ac.getPlace();
        if (place.geometry) {
          const lat = place.geometry.location.lat();
          const lng = place.geometry.location.lng();
          const postal =
            place.address_components?.find((c) =>
              c.types.includes("postal_code"),
            )?.long_name || "";
          setFormData((p) => ({
            ...p,
            address: place.formatted_address || place.name,
            latitude: lat.toString(),
            longitude: lng.toString(),
            zipCode: postal || p.zipCode,
          }));
        }
      });
    }
  }, []);

  React.useEffect(() => {
    if (currentStep === 2) {
      if (window.google) {
        initAutocomplete();
      } else {
        const s = document.createElement("script");
        // Replace with your Google Maps key if needed
        s.src =
          "https://maps.googleapis.com/maps/api/js?key=AIzaSyBecpP3O2kfTa0z-lLIiShmsZE6e1kDmOk&libraries=places";
        s.async = true;
        s.onload = initAutocomplete;
        document.body.appendChild(s);
      }
    }
  }, [currentStep, initAutocomplete]);

  // ── Geolocation ──────────────────────────────────────────────────────────
  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      return toast.error("Geolocation not supported by your browser");
    }
    setIsLoadingMap(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const lat = pos.coords.latitude;
        const lng = pos.coords.longitude;
        setFormData((p) => ({
          ...p,
          latitude: lat.toString(),
          longitude: lng.toString(),
        }));
        if (window.google) {
          new window.google.maps.Geocoder().geocode(
            { location: { lat, lng } },
            (results, status) => {
              if (status === "OK" && results[0]) {
                const postal =
                  results[0].address_components?.find((c) =>
                    c.types.includes("postal_code"),
                  )?.long_name || "";
                setFormData((p) => ({
                  ...p,
                  address: results[0].formatted_address,
                  zipCode: postal || p.zipCode,
                }));
              }
              setIsLoadingMap(false);
            },
          );
        } else {
          setIsLoadingMap(false);
        }
      },
      () => {
        toast.error("Unable to get location");
        setIsLoadingMap(false);
      },
    );
  };

  // ── Handlers ─────────────────────────────────────────────────────────────
  const handleInput = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleAvatar = (e) => setAvatar(e.target.files[0]);

  // ── Validation ────────────────────────────────────────────────────────────
  const validateStep1 = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const newErrors = { name: "", email: "", password: "" };
    let valid = true;

    if (!formData.name.trim() || formData.name.trim().length < 2) {
      newErrors.name = "Shop name must be at least 2 characters";
      valid = false;
    }
    if (!formData.email.trim()) {
      newErrors.email = "Email address is required";
      valid = false;
    } else if (!emailRegex.test(formData.email.trim())) {
      newErrors.email = "Please enter a valid email address";
      valid = false;
    }
    if (!formData.password) {
      newErrors.password = "Password is required";
      valid = false;
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const validateStep2 = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.phoneNumber) {
      toast.error("Please enter phone number");
      return false;
    }
    if (!formData.paypalEmail.trim()) {
      toast.error("PayPal email is required to receive payments");
      return false;
    }
    if (!emailRegex.test(formData.paypalEmail.trim())) {
      toast.error("Please enter a valid PayPal email address");
      return false;
    }
    if (!formData.address.trim()) {
      toast.error("Please enter address");
      return false;
    }
    if (!formData.zipCode) {
      toast.error("Please enter zip code");
      return false;
    }
    return true;
  };

  const validateStep3 = () => {
    // Gold plan is always selected – nothing to validate
    return true;
  };

  // ── Step navigation ───────────────────────────────────────────────────────
  const nextStep = async () => {
    if (currentStep === 1 && !validateStep1()) return;
    if (currentStep === 2 && !validateStep2()) return;
    if (currentStep === 3) {
      if (!validateStep3()) return;
      // If free early seller, skip payment and go directly to step 4
      if (isFreeEarlySeller) {
        setClientSecret(null);
        setCurrentStep(4);
        return;
      }
      await fetchPaymentIntent();
      return; // fetchPaymentIntent advances the step on success
    }
    setCurrentStep((s) => s + 1);
  };

  const prevStep = () => setCurrentStep((s) => s - 1);

  // ── Stripe: get client secret ─────────────────────────────────────────────
  const fetchPaymentIntent = async () => {
    // When free slots gone, use PAID_PLANS pricing
    const paidPlan = paidPlans.find((p) => p.cycle === paidPlanCycle);
    const price = paidPlan?.price || monthlyGoldPrice;

    if (price === 0) {
      setClientSecret(null);
      setCurrentStep(4);
      return;
    }

    setIsLoading(true);
    try {
      const { data } = await axios.post(
        `${API_BASE}/stripe/create-payment-intent`,
        {
          selectedPlan: "gold",
          billingCycle: paidPlanCycle,
        },
      );
      if (data.success) {
        setClientSecret(data.clientSecret);
        setCurrentStep(4);
      } else {
        toast.error(data.message || "Failed to initialise payment");
      }
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Server error – payment not initialised",
      );
    } finally {
      setIsLoading(false);
    }
  };

  // ── Registration submit ───────────────────────────────────────────────────
  const handleRegister = async (stripePaymentIntentId = "") => {
    setIsLoading(true);
    try {
      const form = new FormData();
      if (avatar) form.append("avatar", avatar);
      tradeLicenses.forEach((f) => form.append("tradeLicenses", f));

      Object.entries(formData).forEach(([k, v]) => {
        if (v) form.append(k, v);
      });
      const effectiveBillingCycle = isFreeEarlySeller ? "annual" : paidPlanCycle;

      form.append("selectedPlan", selectedPlan);
      form.append("billingCycle", effectiveBillingCycle);
      form.append("stripePaymentIntentId", stripePaymentIntentId);
      form.append(
        "paymentStatus",
        stripePaymentIntentId ? "paid" : "free",
      );

      const { data } = await axios.post(`${API_BASE}/shop/register`, form, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (data.success) {
        navigate("/success", {
          state: {
            name: formData.name,
            email: formData.email,
            // Use production schema field names for the success page
            subscription: {
              plan: selectedPlan,
              billingCycle: effectiveBillingCycle,
              paymentStatus: stripePaymentIntentId ? "paid" : "free",
            },
            // Legacy keys kept for SuccessPage backward compat
            selectedPlan,
            billingCycle: effectiveBillingCycle,
            paymentFree: !stripePaymentIntentId,
          },
        });
      } else {
        toast.error(data.message || "Registration failed");
        setIsLoading(false);
      }
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Registration failed. Please try again.",
      );
      setIsLoading(false);
    }
  };

  // ── Called by StripePaymentForm on success ────────────────────────────────
  const onPaymentSuccess = (intentId) => handleRegister(intentId);

  // ── Free plan (revenue-share): submit directly ────────────────────────────
  const handleFreeSubmit = () => handleRegister("");

  // ─── RENDER HELPERS ───────────────────────────────────────────────────────
  const getPrice = () => {
    if (isFreeEarlySeller) return 0;
    const paidPlan = paidPlans.find((p) => p.cycle === paidPlanCycle);
    return paidPlan?.price || monthlyGoldPrice;
  };

  // ─────────────────────────────────────────────────────────────────────────
  // STEP 1 – Basic Information
  // ─────────────────────────────────────────────────────────────────────────
  const renderStep1 = () => (
    <div className="space-y-5">
      <h2 className="text-xl font-bold text-slate-800 mb-4">
        Basic Information
      </h2>

      {/* Avatar */}
      <div className="flex justify-center mb-6">
        <div className="relative">
          {avatar ? (
            <img
              src={URL.createObjectURL(avatar)}
              alt="avatar"
              className="w-32 h-32 rounded-full object-cover border-4 border-slate-200"
            />
          ) : (
            <div className="w-32 h-32 rounded-full bg-slate-100 flex items-center justify-center border-4 border-slate-200">
              <span className="text-4xl text-slate-400">🏪</span>
            </div>
          )}
          <label
            htmlFor="avatar-input"
            className="absolute bottom-0 right-0 bg-indigo-700 text-white p-2 rounded-full cursor-pointer hover:bg-indigo-800 transition-colors shadow-lg"
          >
            <HiOutlineCamera className="w-5 h-5" />
          </label>
          <input
            type="file"
            id="avatar-input"
            accept=".jpg,.jpeg,.png"
            onChange={handleAvatar}
            className="hidden"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold text-slate-700 mb-2">
          Shop Name <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleInput}
          className={`w-full px-3 py-2.5 border rounded-lg focus:ring-2 bg-white transition-all ${errors.name ? "border-red-400 focus:ring-red-400 focus:border-red-400" : "border-slate-300 focus:ring-indigo-500 focus:border-indigo-500"}`}
          placeholder="Your shop name"
        />
        {errors.name && (
          <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
            <span>⚠</span> {errors.name}
          </p>
        )}
      </div>

      <div>
        <label className="block text-sm font-semibold text-slate-700 mb-2">
          Email Address <span className="text-red-500">*</span>
        </label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleInput}
          className={`w-full px-3 py-2.5 border rounded-lg focus:ring-2 bg-white transition-all ${errors.email ? "border-red-400 focus:ring-red-400 focus:border-red-400" : "border-slate-300 focus:ring-indigo-500 focus:border-indigo-500"}`}
          placeholder="shop@example.com"
        />
        {errors.email && (
          <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
            <span>⚠</span> {errors.email}
          </p>
        )}
      </div>

      <div>
        <label className="block text-sm font-semibold text-slate-700 mb-2">
          Password <span className="text-red-500">*</span>
        </label>
        <div className="relative">
          <input
            type={visible ? "text" : "password"}
            name="password"
            value={formData.password}
            onChange={handleInput}
            className={`w-full px-3 py-2.5 border rounded-lg focus:ring-2 bg-white transition-all ${errors.password ? "border-red-400 focus:ring-red-400 focus:border-red-400" : "border-slate-300 focus:ring-indigo-500 focus:border-indigo-500"}`}
            placeholder="Minimum 6 characters"
          />
          <button
            type="button"
            onClick={() => setVisible(!visible)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-700"
          >
            {visible ? (
              <AiOutlineEye className="w-5 h-5" />
            ) : (
              <AiOutlineEyeInvisible className="w-5 h-5" />
            )}
          </button>
        </div>
        {errors.password ? (
          <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
            <span>⚠</span> {errors.password}
          </p>
        ) : (
          <p className="text-xs text-slate-500 mt-1">
            Must be at least 6 characters
          </p>
        )}
      </div>
    </div>
  );

  // ─────────────────────────────────────────────────────────────────────────
  // STEP 2 – Business Details
  // ─────────────────────────────────────────────────────────────────────────
  const renderStep2 = () => (
    <div className="space-y-5">
      <h2 className="text-xl font-bold text-slate-800 mb-4">
        Business Details
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Phone Number <span className="text-red-500">*</span>
          </label>
          <input
            type="tel"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleInput}
            className="w-full px-3 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white transition-all"
            placeholder="+1 345 000 0000"
            required
          />
        </div>
      </div>

      {/* PayPal Email Required */}
      <div className="bg-amber-50 border-2 border-amber-300 rounded-xl p-4 shadow-sm">
        <div className="flex items-start gap-3 mb-3">
          <div className="flex-shrink-0 w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center">
            <span className="text-xl">💰</span>
          </div>
          <div>
            <p className="font-bold text-yellow-900 text-lg">
              PayPal Email Required
            </p>
            <p className="text-sm text-yellow-800 mt-1 leading-relaxed">
              Customer payments will be sent <strong>directly</strong> to your
              PayPal account. Without this, you won't receive any money from
              sales!
            </p>
          </div>
        </div>
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            PayPal Email <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            name="paypalEmail"
            value={formData.paypalEmail}
            onChange={handleInput}
            className="w-full px-3 py-2.5 border border-amber-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 bg-white transition-all"
            placeholder="your@paypal.com"
          />
          <p className="text-xs text-yellow-700 mt-2 flex items-center gap-1">
            <span>✅</span> Money arrives instantly when customers buy your
            products
          </p>
        </div>
      </div>

      {/* Bank Account Details (Optional) */}
      <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 shadow-sm">
        <div className="flex items-center gap-3 mb-1">
          <div className="flex-shrink-0 w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center">
            <BsCreditCard className="w-5 h-5 text-indigo-600" />
          </div>
          <p className="font-bold text-slate-900 text-lg">
            Bank Account Details
          </p>
          <span className="text-xs bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded-full font-medium">
            Optional
          </span>
        </div>
        <p className="text-sm text-slate-600 mb-4 ml-13">
          Provide bank details for backup payment methods or future withdrawals
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Account Holder Name
            </label>
            <input
              type="text"
              name="bankAccountName"
              value={formData.bankAccountName}
              onChange={handleInput}
              className="w-full px-3 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white transition-all"
              placeholder="John Doe"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Account Number
            </label>
            <input
              type="text"
              name="bankAccountNumber"
              value={formData.bankAccountNumber}
              onChange={handleInput}
              className="w-full px-3 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white transition-all"
              placeholder="1234567890"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Bank Name
            </label>
            <input
              type="text"
              name="bankName"
              value={formData.bankName}
              onChange={handleInput}
              className="w-full px-3 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white transition-all"
              placeholder="e.g. First Caribbean International Bank"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              IFSC / Routing Code
            </label>
            <input
              type="text"
              name="ifscCode"
              value={formData.ifscCode}
              onChange={handleInput}
              className="w-full px-3 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white transition-all"
              placeholder="e.g. SBIN0001234"
            />
          </div>
        </div>
        <div className="mt-4">
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Account Type
          </label>
          <select
            name="bankAccountType"
            value={formData.bankAccountType}
            onChange={handleInput}
            className="w-full px-3 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white transition-all"
          >
            <option value="">Select type</option>
            <option value="savings">Savings</option>
            <option value="checking">Checking</option>
            <option value="current">Current</option>
          </select>
        </div>
        <p className="text-xs text-indigo-600 mt-3 flex items-center gap-1">
          <span>🏦</span> Bank details are optional but recommended for backup
          payment methods
        </p>
      </div>

      {/* Address */}
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-2">
          <FiMapPin className="inline mr-1" />
          Address <span className="text-red-500">*</span>
        </label>
        <div className="flex gap-2">
          <input
            type="text"
            ref={addressInputRef}
            name="address"
            value={formData.address}
            onChange={handleInput}
            className="flex-1 px-3 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white transition-all"
            placeholder="Start typing your address…"
            required
          />
          <button
            type="button"
            onClick={getCurrentLocation}
            disabled={isLoadingMap}
            className="px-3 py-2.5 bg-indigo-700 text-white rounded-lg hover:bg-indigo-800 transition-colors disabled:opacity-50"
            title="Use my current location"
          >
            {isLoadingMap ? (
              <span className="animate-spin inline-block">⌛</span>
            ) : (
              <MdMyLocation className="w-5 h-5" />
            )}
          </button>
        </div>
        {formData.latitude && (
          <p className="text-xs text-green-600 mt-1">
            ✅ Location captured: {parseFloat(formData.latitude).toFixed(4)},{" "}
            {parseFloat(formData.longitude).toFixed(4)}
          </p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-2">
          Zip / Postal Code <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          name="zipCode"
          value={formData.zipCode}
          onChange={handleInput}
          className="w-full px-3 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white transition-all"
          placeholder="KY1-1100"
          required
        />
      </div>

      {/* Trade License Upload */}
      <div className="bg-gradient-to-br from-amber-50 to-orange-50 border-2 border-amber-300 rounded-xl p-4 shadow-sm">
        <div className="flex items-start gap-2 mb-3">
          <div className="flex-shrink-0 w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center">
            <span className="text-xl">📄</span>
          </div>
          <div>
            <p className="font-bold text-amber-900 text-lg">
              Trade &amp; Business License
              <span className="text-amber-700 text-sm font-medium"> (Optional)</span>
            </p>
            <p className="text-sm text-amber-800 mt-1 leading-relaxed">
              Upload your Trade License and Business Registration documents.
              This is <strong>strongly recommended</strong> for faster verification.
            </p>
          </div>
        </div>

        <label
          htmlFor="license-input"
          className="flex flex-col items-center justify-center w-full h-28 border-2 border-amber-300 border-dashed rounded-lg cursor-pointer bg-white hover:bg-amber-50 transition-colors"
        >
          <svg
            className="w-8 h-8 mb-2 text-amber-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
            />
          </svg>
          <p className="text-sm text-amber-700">
            <span className="font-semibold">Click to upload</span> or drag &
            drop
          </p>
          <p className="text-xs text-amber-600 mt-1">
            PNG, JPG, PDF · Max 10 MB · Up to 5 files
          </p>
          <input
            id="license-input"
            type="file"
            accept=".jpg,.jpeg,.png,.pdf"
            multiple
            className="hidden"
            onChange={(e) => {
              const files = Array.from(e.target.files);
              if (files.length + tradeLicenses.length > 5) {
                toast.error("Maximum 5 files allowed");
                return;
              }
              const valid = files.filter((f) => {
                if (f.size > 10 * 1024 * 1024) {
                  toast.error(`${f.name} exceeds 10 MB`);
                  return false;
                }
                return true;
              });
              setTradeLicenses((p) => [...p, ...valid]);
            }}
          />
        </label>

        {tradeLicenses.length > 0 && (
          <div className="mt-3 space-y-2">
            <p className="text-sm font-medium text-slate-700">
              Uploaded ({tradeLicenses.length}/5):
            </p>
            {tradeLicenses.map((file, i) => (
              <div
                key={i}
                className="flex items-center justify-between bg-white p-2.5 rounded-lg border border-slate-200"
              >
                <div className="flex items-center gap-2">
                  {file.type === "application/pdf" ? (
                    <div className="w-9 h-9 bg-red-100 rounded flex items-center justify-center text-red-600 text-xs font-bold">
                      PDF
                    </div>
                  ) : (
                    <img
                      src={URL.createObjectURL(file)}
                      alt={file.name}
                      className="w-9 h-9 object-cover rounded"
                    />
                  )}
                  <div>
                    <p className="text-sm font-medium text-slate-800 max-w-[180px] truncate">
                      {file.name}
                    </p>
                    <p className="text-xs text-slate-500">
                      {(file.size / 1024).toFixed(1)} KB
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() =>
                    setTradeLicenses((p) => p.filter((_, idx) => idx !== i))
                  }
                  className="p-1 text-red-500 hover:bg-red-100 rounded"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );

  // ─────────────────────────────────────────────────────────────────────────
  // STEP 3 – Choose Plan
  // ─────────────────────────────────────────────────────────────────────────
  const renderStep3 = () => (
    <div className="space-y-6">
      {/* Subscription Banner */}
      <SubscriptionBanner compact={false} />

      {isFreeEarlySeller ? (
        /* ── Free Early Seller ─────────────────────────────────────────── */
        <div className="space-y-4">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-slate-800">🎉 Congratulations!</h2>
            <p className="text-slate-500 mt-1">You qualify for a FREE subscription</p>
          </div>

          <div className="relative p-6 rounded-2xl border-2 border-emerald-300 bg-emerald-50 shadow-md">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-emerald-600 text-white px-5 py-1 rounded-full text-xs font-bold tracking-widest uppercase">
              ✦ FREE PLAN ✦
            </div>

            <div className="flex items-center gap-4 mb-5 mt-2">
              <div className="w-12 h-12 rounded-xl bg-emerald-600 flex items-center justify-center shadow-md">
                <span className="text-2xl">🎁</span>
              </div>
              <div>
                <h3 className="text-xl font-extrabold text-slate-900">Gold Plan – Free</h3>
                <p className="text-slate-500 text-sm">Early seller benefit – 1 year free Gold membership</p>
              </div>
              <div className="ml-auto text-right">
                <span className="text-3xl font-extrabold text-emerald-600">$0</span>
                <span className="text-slate-400 text-sm block line-through">${goldPrices.monthly}/month</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {GOLD_PLAN.features.map((f, i) => (
                <div key={i} className="flex items-center text-slate-700 text-sm">
                  <FiCheck className="w-4 h-4 text-emerald-600 mr-2 flex-shrink-0" />
                  {f}
                </div>
              ))}
            </div>
          </div>

          {subscriptionStatus && (
            <p className="text-center text-sm text-slate-500">
              Only <span className="font-bold text-orange-600">{subscriptionStatus.remainingSlots}</span> free slot{subscriptionStatus.remainingSlots !== 1 ? "s" : ""} remaining — claim yours now!
            </p>
          )}
        </div>
      ) : (
        /* ── Paid Plans ────────────────────────────────────────────────── */
        <div className="space-y-4">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-slate-800">Choose Your Plan</h2>
            <p className="text-slate-500 mt-1">Select a billing period that works for you</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {paidPlans.map((plan) => (
              <button
                key={plan.id}
                type="button"
                onClick={() => setPaidPlanCycle(plan.cycle)}
                className={`relative flex flex-col items-center py-6 px-4 rounded-2xl border-2 font-medium transition-all ${
                  paidPlanCycle === plan.cycle
                    ? "border-indigo-600 bg-indigo-50 shadow-lg ring-2 ring-indigo-200"
                    : "border-slate-200 bg-white text-slate-600 hover:border-indigo-300 hover:shadow-md"
                }`}
              >
                {plan.save && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 text-xs bg-emerald-500 text-white px-3 py-1 rounded-full font-bold whitespace-nowrap">
                    {plan.save}
                  </span>
                )}
                <span className="text-lg font-bold text-slate-800">{plan.label}</span>
                <span className="text-3xl font-extrabold text-indigo-700 mt-2">
                  ${plan.price}
                </span>
                <span className="text-sm text-slate-500">{plan.period}</span>
                {paidPlanCycle === plan.cycle && (
                  <FiCheck className="w-5 h-5 text-indigo-600 mt-2" />
                )}
              </button>
            ))}
          </div>

          {/* Gold plan features */}
          <div className="relative p-6 rounded-2xl border-2 border-indigo-200 bg-indigo-50 shadow-md">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-indigo-700 text-white px-5 py-1 rounded-full text-xs font-bold tracking-widest uppercase">
              ✦ GOLD PLAN ✦
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-3">
              {GOLD_PLAN.features.map((f, i) => (
                <div key={i} className="flex items-center text-slate-700 text-sm">
                  <FiCheck className="w-4 h-4 text-indigo-600 mr-2 flex-shrink-0" />
                  {f}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );

  // ─────────────────────────────────────────────────────────────────────────
  // STEP 4 – Payment / Confirmation
  // ─────────────────────────────────────────────────────────────────────────
  const renderStep4 = () => {
    const price = getPrice();
    const isFree = price === 0 || isFreeEarlySeller;

    return (
      <div className="space-y-6">
        {/* Order summary */}
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-5">
          <h3 className="font-semibold text-slate-800 mb-4">Order Summary</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-slate-600">Shop Name</span>
              <span className="font-medium">{formData.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-600">Plan</span>
              <span className="font-medium">Gold</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-600">Billing</span>
              <span className="font-medium">
                {isFreeEarlySeller
                  ? "Annual (Early Seller Free)"
                  : paidPlans.find((p) => p.cycle === paidPlanCycle)?.label || "Monthly"}
              </span>
            </div>
            {isFreeEarlySeller && (
              <div className="flex justify-between text-emerald-700">
                <span>🎁 Early Seller Discount</span>
                <span className="font-bold">-100%</span>
              </div>
            )}
            <div className="border-t pt-3 mt-2 flex justify-between">
              <span className="font-semibold text-slate-800">Total</span>
              <span className="text-2xl font-bold text-slate-900">
                {isFree ? "Free" : `$${price}`}
              </span>
            </div>
          </div>
        </div>

        {isFree ? (
          /* Free early seller – no payment needed */
          <div className="space-y-4">
            <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-5">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center text-2xl">
                  🎉
                </div>
                <div>
                  <p className="font-bold text-slate-900">
                    {isFreeEarlySeller
                      ? "Early Seller Offer – FREE Subscription!"
                      : "Revenue Share Plan – No Upfront Cost!"}
                  </p>
                  <p className="text-sm text-slate-600">
                    {isFreeEarlySeller
                      ? "You're one of the first 15 sellers — Gold is free for 1 full year."
                      : "You pay 10% commission only when you earn."}
                  </p>
                </div>
              </div>
            </div>
            <button
              onClick={handleFreeSubmit}
              disabled={isLoading}
              className="w-full py-3 bg-emerald-700 hover:bg-emerald-800 text-white font-semibold rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
            >
              {isLoading
                ? "Creating your account…"
                : "Complete Registration – It's Free!"}
            </button>
          </div>
        ) : clientSecret && stripeKeyValid ? (
          /* Stripe Payment */
          <div className="bg-white border border-slate-200 rounded-xl p-5">
            <h3 className="font-semibold text-slate-800 mb-4 flex items-center gap-2">
              <BsCreditCard className="text-indigo-600" /> Secure Payment –
              Powered by Stripe
            </h3>
            <Elements stripe={stripePromise}>
              <StripePaymentForm
                onSuccess={onPaymentSuccess}
                clientSecret={clientSecret}
                isLoading={isLoading}
                setIsLoading={setIsLoading}
              />
            </Elements>
          </div>
        ) : clientSecret && !stripeKeyValid ? (
          /* Keys not configured correctly */
          <div className="bg-red-50 border-2 border-red-300 rounded-xl p-6">
            <div className="flex items-start gap-3">
              <span className="text-3xl flex-shrink-0">⚠️</span>
              <div>
                <p className="font-bold text-red-900 text-lg mb-1">
                  Stripe Keys Not Configured
                </p>
                <p className="text-red-700 text-sm mb-3">
                  Your Stripe publishable key is missing or invalid. Both the
                  publishable key and secret key must come from the{" "}
                  <strong>same account</strong> and be copied directly from the
                  Stripe dashboard without any edits.
                </p>
                <ol className="text-sm text-red-800 space-y-2 list-decimal list-inside">
                  <li>
                    Visit{" "}
                    <a
                      href="https://dashboard.stripe.com/test/apikeys"
                      target="_blank"
                      rel="noreferrer"
                      className="underline font-semibold"
                    >
                      dashboard.stripe.com/test/apikeys
                    </a>
                  </li>
                  <li>
                    Copy the <strong>Publishable key</strong> (
                    <code className="bg-red-100 px-1 rounded">pk_test_…</code>)
                    and paste it into{" "}
                    <code className="bg-red-100 px-1 rounded">
                      Mallofcayman-lunch/.env
                    </code>
                    :<br />
                    <code className="bg-red-100 px-1 rounded text-xs">
                      VITE_STRIPE_PUBLIC_KEY=pk_test_…
                    </code>
                  </li>
                  <li>
                    Copy the <strong>Secret key</strong> (
                    <code className="bg-red-100 px-1 rounded">sk_test_…</code>)
                    and paste it into{" "}
                    <code className="bg-red-100 px-1 rounded">
                      backend/.env
                    </code>
                    :
                    <br />
                    <code className="bg-red-100 px-1 rounded text-xs">
                      STRIPE_SECRET_KEY=sk_test_…
                    </code>
                  </li>
                  <li>Restart both servers after saving</li>
                </ol>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex justify-center py-10">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-indigo-500" />
          </div>
        )}

        <div className="text-center text-xs text-slate-500">
          <p>💰 100% refund guaranteed if your shop is not approved by admin</p>
        </div>
      </div>
    );
  };

  const renderStep = () => {
    if (currentStep === 1) return renderStep1();
    if (currentStep === 2) return renderStep2();
    if (currentStep === 3) return renderStep3();
    if (currentStep === 4) return renderStep4();
    return null;
  };

  const stepMeta = [
    { num: 1, label: "Account", icon: "👤" },
    { num: 2, label: "Business", icon: "📍" },
    { num: 3, label: "Plan", icon: "💎" },
    { num: 4, label: "Payment", icon: "💳" },
  ];

  const headerTitles = [
    "Tell us about your business",
    "Where are you located?",
    "Choose your perfect plan",
    "Complete your payment",
  ];

  const headerSubs = [
    "Start with some basic information",
    "Help customers find your store easily",
    "Select a plan that grows with you",
    "Secure payment powered by Stripe",
  ];

  return (
    <div className="min-h-screen bg-slate-100 py-8 px-4 sm:px-6 lg:px-8">
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-1 tracking-tight">
            Start Your Seller Journey
          </h1>
          <p className="text-sm sm:text-base text-slate-500">
            Join thousands of successful sellers on Mall of Cayman
          </p>
        </div>

        {/* Progress Steps */}
        <div className="mb-6 bg-white rounded-2xl shadow-sm p-5 border border-slate-200">
          <div className="flex items-center justify-between relative">
            {/* Track */}
            <div
              className="absolute top-5 h-0.5 bg-slate-200"
              style={{
                left: "calc(20px)",
                right: "calc(20px)",
                width: "calc(100% - 40px)",
              }}
            />
            {/* Fill */}
            <div
              className="absolute top-5 h-0.5 bg-indigo-600 transition-all duration-500"
              style={{
                left: "calc(20px)",
                width: `calc(${((currentStep - 1) / 3) * 100}% - 40px)`,
              }}
            />

            {stepMeta.map((s) => (
              <div key={s.num} className="flex flex-col items-center z-10">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all duration-300 ${
                    currentStep >= s.num
                      ? "bg-indigo-700 text-white shadow-md"
                      : "bg-white border-2 border-slate-300 text-slate-400"
                  }`}
                >
                  {currentStep > s.num ? (
                    <FiCheck className="w-5 h-5" />
                  ) : (
                    <span className="text-base">{s.icon}</span>
                  )}
                </div>
                <span
                  className={`text-xs sm:text-sm mt-2 font-semibold hidden sm:block ${
                    currentStep >= s.num ? "text-indigo-700" : "text-slate-400"
                  }`}
                >
                  {s.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-2xl shadow-md border border-slate-200 overflow-hidden">
          {/* Header */}
          <div className="bg-indigo-700 px-6 py-5 text-white">
            <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight">
              {headerTitles[currentStep - 1]}
            </h2>
            <p className="mt-1 text-indigo-200 text-xs sm:text-sm">
              {headerSubs[currentStep - 1]}
            </p>
          </div>

          {/* Content */}
          <div className="p-5 sm:p-6">{renderStep()}</div>

          {/* Navigation */}
          <div className="flex justify-between items-center px-5 sm:px-6 py-4 bg-slate-50 border-t border-slate-200">
            {currentStep > 1 ? (
              <button
                onClick={prevStep}
                className="flex items-center gap-2 px-5 py-2.5 bg-white border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 hover:border-slate-400 transition-all font-medium shadow-sm"
              >
                <FiArrowLeft className="w-4 h-4" />
                <span className="hidden sm:inline">Previous</span>
                <span className="sm:hidden">Back</span>
              </button>
            ) : (
              <div />
            )}

            {currentStep < 4 && (
              <button
                onClick={nextStep}
                disabled={currentStep === 3 && isLoading}
                className="flex items-center gap-2 px-6 py-2.5 bg-indigo-700 hover:bg-indigo-800 text-white rounded-lg transition-all font-semibold shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span>
                  {currentStep === 3 && isLoading ? "Loading…" : "Continue"}
                </span>
                {!(currentStep === 3 && isLoading) && (
                  <FiArrowRight className="w-4 h-4" />
                )}
              </button>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 text-center bg-white rounded-2xl shadow-sm p-5 border border-slate-200">
          <p className="text-slate-600 text-sm">
            Already have a seller account?{" "}
            <Link
              to="/"
              className="text-indigo-700 hover:text-indigo-800 font-semibold hover:underline transition-colors"
            >
              Back to Home →
            </Link>
          </p>
          <p className="text-slate-400 text-xs mt-2">
            Need help? Contact us at{" "}
            <a
              href="mailto:info@mallofcayman.com"
              className="text-indigo-600 hover:underline"
            >
              info@mallofcayman.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
