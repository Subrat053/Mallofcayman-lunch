import React, { useState, useRef, useCallback } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { HiOutlineCamera } from "react-icons/hi";
import { MdMyLocation } from "react-icons/md";
import { FiMapPin, FiArrowLeft, FiArrowRight, FiCheck } from "react-icons/fi";
import { BsCreditCard, BsCheckCircle } from "react-icons/bs";
import { loadStripe } from "@stripe/stripe-js";
import {
  CardElement,
  Elements,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";

// ─── CONFIG ──────────────────────────────────────────────────────────────────
// Read from Mallofcayman-lunch/.env  →  VITE_STRIPE_PUBLISHABLE_KEY=pk_test_...
const STRIPE_PUBLISHABLE_KEY =
  import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || "";
const stripeKeyValid =
  STRIPE_PUBLISHABLE_KEY.startsWith("pk_") &&
  !STRIPE_PUBLISHABLE_KEY.includes("PASTE_YOUR") &&
  !STRIPE_PUBLISHABLE_KEY.includes("REPLACE_WITH");
const stripePromise = stripeKeyValid
  ? loadStripe(STRIPE_PUBLISHABLE_KEY)
  : null;

const API_BASE = `${import.meta.env.VITE_BACKEND_URI || "http://localhost:5000"}/api`;

// ─── SUBSCRIPTION PLANS ──────────────────────────────────────────────────────
const GOLD_PLAN = {
  id: "gold",
  name: "Gold",
  color: "from-yellow-400 to-yellow-600",
  price: { monthly: 5, quarterly: 12.5, semiannual: 25.5, annual: 48 },
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
        { payment_method: { card } },
      );

      if (error) {
        setCardError(error.message);
        toast.error(error.message || "Payment failed");
        setIsLoading(false);
      } else if (paymentIntent?.status === "succeeded") {
        onSuccess(paymentIntent.id);
      } else {
        toast.error("Payment could not be completed");
        setIsLoading(false);
      }
    } catch (err) {
      toast.error(err.message || "An unexpected error occurred");
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handlePay} className="space-y-5">
      <div className="p-4 border-2 border-gray-200 rounded-xl bg-white focus-within:border-blue-400 transition-colors">
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
        className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
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
      <p className="text-center text-xs text-gray-500">
        🔒 Payments are secure and encrypted via Stripe
      </p>
      <p className="text-center text-xs text-blue-600 font-medium">
        Test card: 4242 4242 4242 4242 · Any future date · Any CVC
      </p>
    </form>
  );
};

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────
const Register = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [currentStep, setCurrentStep] = useState(1);
  const [billingCycle, setBillingCycle] = useState(
    location.state?.billingCycle || "monthly",
  );
  // Gold is the only plan – always pre-selected
  const [selectedPlan, setSelectedPlan] = useState("gold");
  const [visible, setVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [avatar, setAvatar] = useState(null);
  const [tradeLicenses, setTradeLicenses] = useState([]);
  const [clientSecret, setClientSecret] = useState(null);
  const [isLoadingMap, setIsLoadingMap] = useState(false);
  const [errors, setErrors] = useState({ name: "", email: "", password: "" });

  const [formData, setFormData] = useState({
    email: "",
    name: "",
    phoneNumber: "",
    gstNumber: "",
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
    if (tradeLicenses.length === 0) {
      toast.error("Please upload at least one Trade & Business License");
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
      await fetchPaymentIntent();
      return; // fetchPaymentIntent advances the step on success
    }
    setCurrentStep((s) => s + 1);
  };

  const prevStep = () => setCurrentStep((s) => s - 1);

  // ── Stripe: get client secret ─────────────────────────────────────────────
  const fetchPaymentIntent = async () => {
    const plan = PLANS.find((p) => p.id === selectedPlan);
    const price = plan?.price[billingCycle] || 0;

    if (price === 0) {
      // Revenue-share: free plan – skip payment step
      setClientSecret(null);
      setCurrentStep(4);
      return;
    }

    setIsLoading(true);
    try {
      const { data } = await axios.post(
        `${API_BASE}/stripe/create-payment-intent`,
        {
          selectedPlan,
          billingCycle,
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
      form.append("selectedPlan", selectedPlan);
      form.append("billingCycle", billingCycle);
      form.append("stripePaymentIntentId", stripePaymentIntentId);
      form.append("paymentStatus", stripePaymentIntentId ? "paid" : "free");

      const { data } = await axios.post(`${API_BASE}/shop/register`, form, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (data.success) {
        navigate("/success", {
          state: {
            name: formData.name,
            email: formData.email,
            selectedPlan,
            billingCycle,
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
    const plan = PLANS.find((p) => p.id === selectedPlan);
    return plan?.price[billingCycle] || 0;
  };

  const billingLabel = () =>
    ({
      quarterly: "3 Months",
      semiannual: "6 Months",
      annual: "12 Months",
      monthly: "Monthly",
    })[billingCycle];

  // ─────────────────────────────────────────────────────────────────────────
  // STEP 1 – Basic Information
  // ─────────────────────────────────────────────────────────────────────────
  const renderStep1 = () => (
    <div className="space-y-5">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">
        Basic Information
      </h2>

      {/* Avatar */}
      <div className="flex justify-center mb-6">
        <div className="relative">
          {avatar ? (
            <img
              src={URL.createObjectURL(avatar)}
              alt="avatar"
              className="w-32 h-32 rounded-full object-cover border-4 border-blue-200"
            />
          ) : (
            <div className="w-32 h-32 rounded-full bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center border-4 border-blue-200">
              <span className="text-4xl text-gray-400">🏪</span>
            </div>
          )}
          <label
            htmlFor="avatar-input"
            className="absolute bottom-0 right-0 bg-blue-600 text-white p-2 rounded-full cursor-pointer hover:bg-blue-700 transition-colors shadow-lg"
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
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Shop Name <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleInput}
          className={`w-full px-3 py-2.5 border-2 rounded-lg focus:ring-2 bg-gray-50 focus:bg-white transition-all ${errors.name ? "border-red-400 focus:ring-red-400 focus:border-red-400" : "border-gray-200 focus:ring-purple-500 focus:border-purple-500"}`}
          placeholder="Your shop name"
        />
        {errors.name && (
          <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
            <span>⚠</span> {errors.name}
          </p>
        )}
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Email Address <span className="text-red-500">*</span>
        </label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleInput}
          className={`w-full px-3 py-2.5 border-2 rounded-lg focus:ring-2 bg-gray-50 focus:bg-white transition-all ${errors.email ? "border-red-400 focus:ring-red-400 focus:border-red-400" : "border-gray-200 focus:ring-purple-500 focus:border-purple-500"}`}
          placeholder="shop@example.com"
        />
        {errors.email && (
          <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
            <span>⚠</span> {errors.email}
          </p>
        )}
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Password <span className="text-red-500">*</span>
        </label>
        <div className="relative">
          <input
            type={visible ? "text" : "password"}
            name="password"
            value={formData.password}
            onChange={handleInput}
            className={`w-full px-3 py-2.5 border-2 rounded-lg focus:ring-2 bg-gray-50 focus:bg-white transition-all ${errors.password ? "border-red-400 focus:ring-red-400 focus:border-red-400" : "border-gray-200 focus:ring-purple-500 focus:border-purple-500"}`}
            placeholder="Minimum 6 characters"
          />
          <button
            type="button"
            onClick={() => setVisible(!visible)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
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
          <p className="text-xs text-gray-500 mt-1">
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
      <h2 className="text-2xl font-bold text-gray-800 mb-4">
        Business Details
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Phone Number <span className="text-red-500">*</span>
          </label>
          <input
            type="tel"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleInput}
            className="w-full px-3 py-2.5 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 bg-gray-50 focus:bg-white transition-all"
            placeholder="+1 345 000 0000"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            GST / Tax Number <span className="text-gray-400">(Optional)</span>
          </label>
          <input
            type="text"
            name="gstNumber"
            value={formData.gstNumber}
            onChange={handleInput}
            className="w-full px-3 py-2.5 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 bg-gray-50 focus:bg-white transition-all"
            placeholder="Tax registration number"
          />
        </div>
      </div>

      {/* PayPal Email Required */}
      <div className="bg-gradient-to-br from-yellow-50 to-amber-50 border-2 border-yellow-300 rounded-xl p-4 shadow-sm">
        <div className="flex items-start gap-3 mb-3">
          <div className="flex-shrink-0 w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
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
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            PayPal Email <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            name="paypalEmail"
            value={formData.paypalEmail}
            onChange={handleInput}
            className="w-full px-3 py-2.5 border-2 border-yellow-400 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 bg-white transition-all"
            placeholder="your@paypal.com"
          />
          <p className="text-xs text-yellow-700 mt-2 flex items-center gap-1">
            <span>✅</span> Money arrives instantly when customers buy your
            products
          </p>
        </div>
      </div>

      {/* Bank Account Details (Optional) */}
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-xl p-4 shadow-sm">
        <div className="flex items-center gap-3 mb-1">
          <div className="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
            <BsCreditCard className="w-5 h-5 text-blue-600" />
          </div>
          <p className="font-bold text-blue-900 text-lg">
            Bank Account Details
          </p>
          <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full font-medium">
            Optional
          </span>
        </div>
        <p className="text-sm text-blue-700 mb-4 ml-13">
          Provide bank details for backup payment methods or future withdrawals
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Account Holder Name
            </label>
            <input
              type="text"
              name="bankAccountName"
              value={formData.bankAccountName}
              onChange={handleInput}
              className="w-full px-3 py-2.5 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white transition-all"
              placeholder="John Doe"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Account Number
            </label>
            <input
              type="text"
              name="bankAccountNumber"
              value={formData.bankAccountNumber}
              onChange={handleInput}
              className="w-full px-3 py-2.5 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white transition-all"
              placeholder="1234567890"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Bank Name
            </label>
            <input
              type="text"
              name="bankName"
              value={formData.bankName}
              onChange={handleInput}
              className="w-full px-3 py-2.5 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white transition-all"
              placeholder="e.g. First Caribbean International Bank"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              IFSC / Routing Code
            </label>
            <input
              type="text"
              name="ifscCode"
              value={formData.ifscCode}
              onChange={handleInput}
              className="w-full px-3 py-2.5 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white transition-all"
              placeholder="e.g. SBIN0001234"
            />
          </div>
        </div>
        <div className="mt-4">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Account Type
          </label>
          <select
            name="bankAccountType"
            value={formData.bankAccountType}
            onChange={handleInput}
            className="w-full px-3 py-2.5 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white transition-all"
          >
            <option value="">Select type</option>
            <option value="savings">Savings</option>
            <option value="checking">Checking</option>
            <option value="current">Current</option>
          </select>
        </div>
        <p className="text-xs text-blue-600 mt-3 flex items-center gap-1">
          <span>🏦</span> Bank details are optional but recommended for backup
          payment methods
        </p>
      </div>

      {/* Address */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
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
            className="flex-1 px-3 py-2.5 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 bg-gray-50 focus:bg-white transition-all"
            placeholder="Start typing your address…"
            required
          />
          <button
            type="button"
            onClick={getCurrentLocation}
            disabled={isLoadingMap}
            className="px-3 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
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
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Zip / Postal Code <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          name="zipCode"
          value={formData.zipCode}
          onChange={handleInput}
          className="w-full px-3 py-2.5 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 bg-gray-50 focus:bg-white transition-all"
          placeholder="KY1-1100"
          required
        />
      </div>

      {/* Trade License Upload */}
      <div className="bg-gradient-to-br from-red-50 to-orange-50 border-2 border-red-300 rounded-xl p-4 shadow-sm">
        <div className="flex items-start gap-2 mb-3">
          <div className="flex-shrink-0 w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
            <span className="text-xl">📄</span>
          </div>
          <div>
            <p className="font-bold text-red-900 text-lg">
              Trade &amp; Business License{" "}
              <span className="text-red-500">*</span>
            </p>
            <p className="text-sm text-red-700 mt-1 leading-relaxed">
              Upload your Trade License and Business Registration documents.
              This is <strong>mandatory</strong> for verification.
            </p>
          </div>
        </div>

        <label
          htmlFor="license-input"
          className="flex flex-col items-center justify-center w-full h-28 border-2 border-red-300 border-dashed rounded-lg cursor-pointer bg-white hover:bg-red-50 transition-colors"
        >
          <svg
            className="w-8 h-8 mb-2 text-red-500"
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
          <p className="text-sm text-red-600">
            <span className="font-semibold">Click to upload</span> or drag &
            drop
          </p>
          <p className="text-xs text-red-500 mt-1">
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
            <p className="text-sm font-medium text-gray-700">
              Uploaded ({tradeLicenses.length}/5):
            </p>
            {tradeLicenses.map((file, i) => (
              <div
                key={i}
                className="flex items-center justify-between bg-white p-2.5 rounded-lg border border-gray-200"
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
                    <p className="text-sm font-medium text-gray-800 max-w-[180px] truncate">
                      {file.name}
                    </p>
                    <p className="text-xs text-gray-500">
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
  // STEP 3 – Choose Plan (Gold only)
  // ─────────────────────────────────────────────────────────────────────────
  const renderStep3 = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-800">Gold Plan</h2>
        <p className="text-gray-500 mt-1">Choose your billing period</p>
      </div>

      {/* Billing cycle selector */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          {
            value: "monthly",
            label: "1 Month",
            price: GOLD_PLAN.price.monthly,
            discount: null,
          },
          {
            value: "quarterly",
            label: "3 Months",
            price: GOLD_PLAN.price.quarterly,
            discount: "10%",
          },
          {
            value: "semiannual",
            label: "6 Months",
            price: GOLD_PLAN.price.semiannual,
            discount: "15%",
          },
          {
            value: "annual",
            label: "12 Months",
            price: GOLD_PLAN.price.annual,
            discount: "20%",
          },
        ].map((c) => (
          <button
            key={c.value}
            type="button"
            onClick={() => setBillingCycle(c.value)}
            className={`relative flex flex-col items-center py-4 px-3 rounded-xl border-2 font-medium transition-all ${
              billingCycle === c.value
                ? "border-yellow-500 bg-yellow-50 shadow-lg"
                : "border-gray-200 bg-white hover:border-yellow-300"
            }`}
          >
            {c.discount && (
              <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 text-xs bg-green-500 text-white px-2 py-0.5 rounded-full whitespace-nowrap">
                Save {c.discount}
              </span>
            )}
            <span
              className={`text-sm font-semibold ${
                billingCycle === c.value ? "text-yellow-700" : "text-gray-700"
              }`}
            >
              {c.label}
            </span>
            <span
              className={`text-xl font-bold mt-1 ${
                billingCycle === c.value ? "text-yellow-600" : "text-gray-900"
              }`}
            >
              ${c.price}
            </span>
            {billingCycle === c.value && (
              <FiCheck className="w-4 h-4 text-yellow-600 mt-1" />
            )}
          </button>
        ))}
      </div>

      {/* Single Gold plan card */}
      <div className="relative p-6 rounded-2xl border-2 border-yellow-500 bg-yellow-50 shadow-xl">
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-yellow-400 to-yellow-600 text-white px-5 py-1 rounded-full text-xs font-bold tracking-wide">
          ✦ GOLD PLAN ✦
        </div>
        <div className="absolute top-4 right-4">
          <BsCheckCircle className="w-7 h-7 text-yellow-600" />
        </div>

        <div className="flex items-center gap-4 mb-5">
          <div className="w-14 h-14 rounded-xl bg-gradient-to-r from-yellow-400 to-yellow-600 flex items-center justify-center shadow-md">
            <span className="text-3xl">💎</span>
          </div>
          <div>
            <h3 className="text-2xl font-bold text-gray-900">Gold</h3>
            <p className="text-gray-500 text-sm">Everything you need to grow</p>
          </div>
          <div className="ml-auto text-right">
            <span className="text-4xl font-extrabold text-gray-900">
              ${GOLD_PLAN.price[billingCycle]}
            </span>
            <span className="text-gray-500 text-sm block">
              /{billingLabel().toLowerCase()}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {GOLD_PLAN.features.map((f, i) => (
            <div key={i} className="flex items-center text-gray-700 text-sm">
              <FiCheck className="w-4 h-4 text-yellow-600 mr-2 flex-shrink-0" />
              {f}
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // ─────────────────────────────────────────────────────────────────────────
  // STEP 4 – Payment / Confirmation
  // ─────────────────────────────────────────────────────────────────────────
  const renderStep4 = () => {
    const price = getPrice();
    const isFree = price === 0;

    return (
      <div className="space-y-6">
        {/* Order summary */}
        <div className="bg-white border border-gray-200 rounded-xl p-5">
          <h3 className="font-semibold text-gray-800 mb-4">Order Summary</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Shop Name</span>
              <span className="font-medium">{formData.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Plan</span>
              <span className="font-medium">
                {PLANS.find((p) => p.id === selectedPlan)?.name}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Billing</span>
              <span className="font-medium">{billingLabel()}</span>
            </div>
            <div className="border-t pt-3 mt-2 flex justify-between">
              <span className="font-semibold text-gray-800">Total</span>
              <span className="text-2xl font-bold text-gray-900">
                {isFree ? "Free" : `$${price}`}
              </span>
            </div>
          </div>
        </div>

        {isFree ? (
          /* Revenue-share – no payment needed */
          <div className="space-y-4">
            <div className="bg-purple-50 border border-purple-200 rounded-xl p-5">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-400 to-purple-600 flex items-center justify-center text-2xl">
                  🚀
                </div>
                <div>
                  <p className="font-bold text-purple-900">
                    Revenue Share Plan – No Upfront Cost!
                  </p>
                  <p className="text-sm text-purple-700">
                    You pay 10% commission only when you earn.
                  </p>
                </div>
              </div>
            </div>
            <button
              onClick={handleFreeSubmit}
              disabled={isLoading}
              className="w-full py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading
                ? "Creating your account…"
                : "Complete Registration – It's Free!"}
            </button>
          </div>
        ) : clientSecret && stripeKeyValid ? (
          /* Stripe Payment */
          <div className="bg-white border border-gray-200 rounded-xl p-5">
            <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <BsCreditCard className="text-blue-600" /> Secure Payment –
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
                      VITE_STRIPE_PUBLISHABLE_KEY=pk_test_…
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
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-500" />
          </div>
        )}

        <div className="text-center text-xs text-gray-500">
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
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 py-6 px-4 sm:px-6 lg:px-8">
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">
            Start Your Seller Journey
          </h1>
          <p className="text-sm sm:text-base text-gray-600">
            Join thousands of successful sellers on Mall of Cayman
          </p>
        </div>

        {/* Progress Steps */}
        <div className="mb-6 bg-white rounded-xl shadow-sm p-4">
          <div className="flex items-center justify-between relative">
            {/* Track */}
            <div
              className="absolute top-6 h-1 bg-gray-200"
              style={{
                left: "calc(24px)",
                right: "calc(24px)",
                width: "calc(100% - 48px)",
              }}
            />
            {/* Fill */}
            <div
              className="absolute top-6 h-1 bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-500"
              style={{
                left: "calc(24px)",
                width: `calc(${((currentStep - 1) / 3) * 100}% - 48px)`,
              }}
            />

            {stepMeta.map((s) => (
              <div key={s.num} className="flex flex-col items-center z-10">
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center font-bold transition-all duration-300 ${
                    currentStep >= s.num
                      ? "bg-gradient-to-br from-blue-500 to-purple-600 text-white shadow-lg scale-110"
                      : "bg-white border-2 border-gray-300 text-gray-400"
                  }`}
                >
                  {currentStep > s.num ? (
                    <FiCheck className="w-6 h-6" />
                  ) : (
                    <span className="text-lg">{s.icon}</span>
                  )}
                </div>
                <span
                  className={`text-xs sm:text-sm mt-2 font-medium hidden sm:block ${
                    currentStep >= s.num ? "text-blue-600" : "text-gray-500"
                  }`}
                >
                  {s.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
          {/* Gradient Header */}
          <div className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 p-4 text-white">
            <h2 className="text-xl sm:text-2xl font-bold">
              {headerTitles[currentStep - 1]}
            </h2>
            <p className="mt-1 text-blue-50 text-xs sm:text-sm">
              {headerSubs[currentStep - 1]}
            </p>
          </div>

          {/* Content */}
          <div className="p-5 sm:p-6">{renderStep()}</div>

          {/* Navigation */}
          <div className="flex justify-between items-center px-5 sm:px-6 py-4 bg-gray-50 border-t border-gray-200">
            {currentStep > 1 ? (
              <button
                onClick={prevStep}
                className="flex items-center gap-2 px-5 py-2.5 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 hover:border-gray-400 transition-all font-medium shadow-sm"
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
                className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all font-semibold shadow-md hover:shadow-lg transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
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
        <div className="mt-6 text-center bg-white rounded-xl shadow-sm p-4">
          <p className="text-gray-600 text-sm">
            Already have a seller account?{" "}
            <Link
              to="/"
              className="text-blue-600 hover:text-blue-700 font-semibold hover:underline transition-colors"
            >
              Back to Home →
            </Link>
          </p>
          <p className="text-gray-500 text-xs mt-2">
            Need help? Contact us at{" "}
            <a
              href="mailto:info@mallofcayman.com"
              className="text-blue-600 hover:underline"
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
