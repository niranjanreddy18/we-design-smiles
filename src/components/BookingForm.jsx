import { useState, useId } from "react";
import { useForm, useWatch } from "react-hook-form";

/**
 * Calculates current local date and +60 days date in YYYY-MM-DD format
 * for date input boundaries.
 */
function getMinMaxDates() {
  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, "0");
  const dd = String(today.getDate()).padStart(2, "0");
  const minDate = `${yyyy}-${mm}-${dd}`;

  const maxObj = new Date(today);
  maxObj.setDate(maxObj.getDate() + 60);
  const maxY = maxObj.getFullYear();
  const maxM = String(maxObj.getMonth() + 1).padStart(2, "0");
  const maxD = String(maxObj.getDate()).padStart(2, "0");
  const maxDate = `${maxY}-${maxM}-${maxD}`;

  return { minDate, maxDate };
}

const SERVICE_OPTIONS = [
  "Cleaning",
  "Whitening",
  "Restoration",
  "Consultation",
  "Other",
];

/**
 * Professional appointment booking form component for "WE DESIGN SMILES" dental clinic.
 *
 * @param {Object} props
 * @param {Function} [props.onSubmit] - Optional async/sync callback called with validated data
 */
export default function BookingForm({ onSubmit }) {
  const formUid = useId();
  const [submissionStatus, setSubmissionStatus] = useState("idle"); // "idle" | "success" | "error"
  const [errorMessage, setErrorMessage] = useState("");

  const { minDate, maxDate } = getMinMaxDates();

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      service: "",
      date: "",
      time: "",
      message: "",
    },
  });

  const messageValue = useWatch({ control, name: "message", defaultValue: "" });
  const charCount = messageValue ? messageValue.length : 0;

  /**
   * Submission handler: validates through React Hook Form,
   * then calls custom `onSubmit` or prepares for Django REST API POST /api/appointments/
   */
  const handleFormSubmit = async (data) => {
    setSubmissionStatus("idle");
    setErrorMessage("");

    try {
      if (onSubmit) {
        await onSubmit(data);
      } else {
        /**
         * ────────────────────────────────────────────────────────────
         * Django REST API Integration Point
         * ────────────────────────────────────────────────────────────
         * Endpoint: POST /api/appointments/
         * Payload:
         *   {
         *     fullName: data.fullName,
         *     email: data.email,
         *     phone: data.phone,
         *     service: data.service,
         *     date: data.date,
         *     time: data.time,
         *     message: data.message
         *   }
         *
         * When Django REST Framework backend is active:
         * const response = await fetch("/api/appointments/", {
         *   method: "POST",
         *   headers: { "Content-Type": "application/json" },
         *   body: JSON.stringify(data),
         * });
         * if (!response.ok) throw new Error("Server rejected booking request");
         * ────────────────────────────────────────────────────────────
         */
        // Simulate network latency during frontend development
        await new Promise((resolve) => setTimeout(resolve, 1000));
      }

      setSubmissionStatus("success");
      reset();
    } catch (err) {
      setSubmissionStatus("error");
      setErrorMessage(
        err?.message || "Something went wrong. Please try again."
      );
    }
  };

  const handleResetForNewBooking = () => {
    reset();
    setSubmissionStatus("idle");
    setErrorMessage("");
  };

  return (
    <div className="w-full max-w-[600px] mx-auto">
      {/* Form Container Card with Light Teal Background #f0f9ff */}
      <div className="bg-[#f0f9ff] border border-cyan-100 rounded-3xl p-6 sm:p-10 shadow-xl shadow-cyan-900/5">

        {/* Header Branding */}
        <div className="text-center mb-8">
          <span className="text-[11px] sm:text-xs font-bold uppercase tracking-widest text-[#06b6d4] bg-white px-3.5 py-1.5 rounded-full border border-cyan-200/60 shadow-xs inline-block">
            Appointment Reservation
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-3">
            Book Your Dental Visit
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-2 max-w-md mx-auto">
            Experience gentle, master-crafted dental care. Fill out the form below to secure your consultation.
          </p>
        </div>

        {/* ─── Success State ─── */}
        {submissionStatus === "success" ? (
          <div
            className="p-8 bg-white border border-cyan-200 rounded-2xl text-center space-y-4 shadow-sm"
            role="status"
            aria-live="polite"
          >
            <div className="w-14 h-14 bg-cyan-100 text-[#06b6d4] rounded-full mx-auto flex items-center justify-center shadow-xs">
              <svg
                className="w-8 h-8"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2.5"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-900">
                Thank you! We&#39;ll contact you soon.
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-1.5">
                We&#39;ve received your appointment request and will get back to you shortly.
              </p>
            </div>
            <button
              type="button"
              onClick={handleResetForNewBooking}
              className="mt-4 px-6 py-2.5 rounded-full bg-[#06b6d4] hover:bg-[#0891b2] text-slate-950 font-bold text-xs sm:text-sm tracking-wide transition-all shadow-sm hover:shadow-md cursor-pointer"
            >
              Book Another Appointment
            </button>
          </div>
        ) : (
          /* ─── Main Booking Form ─── */
          <form
            onSubmit={handleSubmit(handleFormSubmit)}
            noValidate
            className="space-y-5"
          >
            {/* Global Error Banner if submission failed */}
            {submissionStatus === "error" && (
              <div
                className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-800 text-xs sm:text-sm flex items-start gap-2.5"
                role="alert"
                aria-live="assertive"
              >
                <svg
                  className="w-5 h-5 text-red-500 shrink-0 mt-0.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
                <span>
                  {errorMessage || "Something went wrong. Please try again."}
                </span>
              </div>
            )}

            {/* 1. Full Name */}
            <div>
              <label
                htmlFor={`${formUid}-fullName`}
                className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1.5"
              >
                Full Name <span className="text-[#06b6d4]">*</span>
              </label>
              <input
                id={`${formUid}-fullName`}
                type="text"
                placeholder="Dr. / Mr. / Ms. Jane Doe"
                aria-invalid={errors.fullName ? "true" : "false"}
                aria-describedby={errors.fullName ? `${formUid}-fullName-error` : undefined}
                className={`w-full px-4 py-3 rounded-xl bg-white border text-sm text-slate-900 placeholder:text-slate-400 outline-none transition-all ${
                  errors.fullName
                    ? "border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-400/20 bg-red-50/20"
                    : "border-slate-200 hover:border-slate-300 focus:border-[#06b6d4] focus:ring-2 focus:ring-[#06b6d4]/20"
                }`}
                {...register("fullName", {
                  required: "Full name is required",
                  minLength: {
                    value: 2,
                    message: "Full name must be at least 2 characters",
                  },
                })}
              />
              {errors.fullName && (
                <p
                  id={`${formUid}-fullName-error`}
                  className="mt-1.5 text-xs text-red-600 font-medium flex items-center gap-1"
                >
                  <span aria-hidden="true">⚠</span> {errors.fullName.message}
                </p>
              )}
            </div>

            {/* 2. Email & 3. Phone (2 Columns on tablet/desktop) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
              {/* Email */}
              <div>
                <label
                  htmlFor={`${formUid}-email`}
                  className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1.5"
                >
                  Email Address <span className="text-[#06b6d4]">*</span>
                </label>
                <input
                  id={`${formUid}-email`}
                  type="email"
                  placeholder="jane.doe@example.com"
                  aria-invalid={errors.email ? "true" : "false"}
                  aria-describedby={errors.email ? `${formUid}-email-error` : undefined}
                  className={`w-full px-4 py-3 rounded-xl bg-white border text-sm text-slate-900 placeholder:text-slate-400 outline-none transition-all ${
                    errors.email
                      ? "border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-400/20 bg-red-50/20"
                      : "border-slate-200 hover:border-slate-300 focus:border-[#06b6d4] focus:ring-2 focus:ring-[#06b6d4]/20"
                  }`}
                  {...register("email", {
                    required: "Email address is required",
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "Please enter a valid email address",
                    },
                  })}
                />
                {errors.email && (
                  <p
                    id={`${formUid}-email-error`}
                    className="mt-1.5 text-xs text-red-600 font-medium flex items-center gap-1"
                  >
                    <span aria-hidden="true">⚠</span> {errors.email.message}
                  </p>
                )}
              </div>

              {/* Phone */}
              <div>
                <label
                  htmlFor={`${formUid}-phone`}
                  className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1.5"
                >
                  Phone Number <span className="text-[#06b6d4]">*</span>
                </label>
                <input
                  id={`${formUid}-phone`}
                  type="tel"
                  placeholder="10-digit number"
                  maxLength={10}
                  aria-invalid={errors.phone ? "true" : "false"}
                  aria-describedby={errors.phone ? `${formUid}-phone-error` : undefined}
                  className={`w-full px-4 py-3 rounded-xl bg-white border text-sm text-slate-900 placeholder:text-slate-400 outline-none transition-all ${
                    errors.phone
                      ? "border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-400/20 bg-red-50/20"
                      : "border-slate-200 hover:border-slate-300 focus:border-[#06b6d4] focus:ring-2 focus:ring-[#06b6d4]/20"
                  }`}
                  {...register("phone", {
                    required: "Phone number is required",
                    pattern: {
                      value: /^\d{10}$/,
                      message: "Phone number must be exactly 10 digits",
                    },
                  })}
                />
                {errors.phone && (
                  <p
                    id={`${formUid}-phone-error`}
                    className="mt-1.5 text-xs text-red-600 font-medium flex items-center gap-1"
                  >
                    <span aria-hidden="true">⚠</span> {errors.phone.message}
                  </p>
                )}
              </div>
            </div>

            {/* 4. Preferred Service */}
            <div>
              <label
                htmlFor={`${formUid}-service`}
                className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1.5"
              >
                Preferred Service <span className="text-[#06b6d4]">*</span>
              </label>
              <div className="relative">
                <select
                  id={`${formUid}-service`}
                  aria-invalid={errors.service ? "true" : "false"}
                  aria-describedby={errors.service ? `${formUid}-service-error` : undefined}
                  className={`w-full appearance-none px-4 py-3 rounded-xl bg-white border text-sm text-slate-900 outline-none transition-all pr-10 cursor-pointer ${
                    errors.service
                      ? "border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-400/20 bg-red-50/20"
                      : "border-slate-200 hover:border-slate-300 focus:border-[#06b6d4] focus:ring-2 focus:ring-[#06b6d4]/20"
                  }`}
                  {...register("service", {
                    required: "Please select a preferred service",
                  })}
                >
                  <option value="">Select a treatment or service...</option>
                  {SERVICE_OPTIONS.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
                <div
                  className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3.5 text-slate-500"
                  aria-hidden="true"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
              {errors.service && (
                <p
                  id={`${formUid}-service-error`}
                  className="mt-1.5 text-xs text-red-600 font-medium flex items-center gap-1"
                >
                  <span aria-hidden="true">⚠</span> {errors.service.message}
                </p>
              )}
            </div>

            {/* 5. Preferred Date & 6. Preferred Time (2 Columns) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
              {/* Preferred Date */}
              <div>
                <label
                  htmlFor={`${formUid}-date`}
                  className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1.5"
                >
                  Preferred Date <span className="text-[#06b6d4]">*</span>
                </label>
                <input
                  id={`${formUid}-date`}
                  type="date"
                  min={minDate}
                  max={maxDate}
                  aria-invalid={errors.date ? "true" : "false"}
                  aria-describedby={errors.date ? `${formUid}-date-error` : undefined}
                  className={`w-full px-4 py-3 rounded-xl bg-white border text-sm text-slate-900 outline-none transition-all cursor-pointer ${
                    errors.date
                      ? "border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-400/20 bg-red-50/20"
                      : "border-slate-200 hover:border-slate-300 focus:border-[#06b6d4] focus:ring-2 focus:ring-[#06b6d4]/20"
                  }`}
                  {...register("date", {
                    required: "Appointment date is required",
                    min: {
                      value: minDate,
                      message: "Date cannot be in the past",
                    },
                    max: {
                      value: maxDate,
                      message: "Date must be within 60 days from today",
                    },
                  })}
                />
                {errors.date && (
                  <p
                    id={`${formUid}-date-error`}
                    className="mt-1.5 text-xs text-red-600 font-medium flex items-center gap-1"
                  >
                    <span aria-hidden="true">⚠</span> {errors.date.message}
                  </p>
                )}
              </div>

              {/* Preferred Time */}
              <div>
                <label
                  htmlFor={`${formUid}-time`}
                  className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1.5"
                >
                  Preferred Time <span className="text-[#06b6d4]">*</span>
                  <span className="text-[10px] text-slate-500 font-normal ml-1">
                    (9:00 AM – 6:00 PM)
                  </span>
                </label>
                <input
                  id={`${formUid}-time`}
                  type="time"
                  step="900"
                  aria-invalid={errors.time ? "true" : "false"}
                  aria-describedby={errors.time ? `${formUid}-time-error` : undefined}
                  className={`w-full px-4 py-3 rounded-xl bg-white border text-sm text-slate-900 outline-none transition-all cursor-pointer ${
                    errors.time
                      ? "border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-400/20 bg-red-50/20"
                      : "border-slate-200 hover:border-slate-300 focus:border-[#06b6d4] focus:ring-2 focus:ring-[#06b6d4]/20"
                  }`}
                  {...register("time", {
                    required: "Appointment time is required",
                    validate: (value) => {
                      if (!value) return "Please choose a preferred time";
                      // Business hours: 09:00 to 18:00
                      if (value < "09:00" || value > "18:00") {
                        return "Time must be within business hours (9:00 AM to 6:00 PM)";
                      }
                      return true;
                    },
                  })}
                />
                {errors.time && (
                  <p
                    id={`${formUid}-time-error`}
                    className="mt-1.5 text-xs text-red-600 font-medium flex items-center gap-1"
                  >
                    <span aria-hidden="true">⚠</span> {errors.time.message}
                  </p>
                )}
              </div>
            </div>

            {/* 7. Message with Character Counter */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label
                  htmlFor={`${formUid}-message`}
                  className="block text-xs font-bold text-slate-800 uppercase tracking-wider"
                >
                  Message <span className="text-slate-400 font-normal">(Optional)</span>
                </label>
                <span
                  className={`text-[11px] font-medium ${
                    charCount > 300 ? "text-red-500 font-bold" : "text-slate-500"
                  }`}
                  aria-live="polite"
                >
                  {charCount} / 300
                </span>
              </div>
              <textarea
                id={`${formUid}-message`}
                rows={3}
                placeholder="Share any dental concerns, medical notes, or questions..."
                maxLength={300}
                aria-invalid={errors.message ? "true" : "false"}
                aria-describedby={errors.message ? `${formUid}-message-error` : undefined}
                className={`w-full px-4 py-3 rounded-xl bg-white border text-sm text-slate-900 placeholder:text-slate-400 outline-none transition-all resize-none ${
                  errors.message
                    ? "border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-400/20 bg-red-50/20"
                    : "border-slate-200 hover:border-slate-300 focus:border-[#06b6d4] focus:ring-2 focus:ring-[#06b6d4]/20"
                }`}
                {...register("message", {
                  maxLength: {
                    value: 300,
                    message: "Message cannot exceed 300 characters",
                  },
                })}
              />
              {errors.message && (
                <p
                  id={`${formUid}-message-error`}
                  className="mt-1.5 text-xs text-red-600 font-medium flex items-center gap-1"
                >
                  <span aria-hidden="true">⚠</span> {errors.message.message}
                </p>
              )}
            </div>

            {/* Primary CTA: Book Appointment */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 px-6 rounded-xl bg-[#06b6d4] hover:bg-[#0891b2] text-slate-950 font-bold text-sm tracking-wide transition-all shadow-md shadow-[#06b6d4]/20 hover:shadow-lg hover:shadow-[#06b6d4]/30 active:scale-[0.99] disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer"
              >
                {isSubmitting ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-2 h-4 w-4 text-slate-950"
                      fill="none"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    Processing Reservation...
                  </>
                ) : (
                  "Book Appointment"
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
