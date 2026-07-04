import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { config } from "../config";

const Contact = ({ personalInfo }) => {
  const emailAddress = personalInfo?.email || config.email;
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    setSubmitStatus(null);

    const accessKey = personalInfo?.web3FormsKey || config.web3FormsKey;
    const hasValidKey = accessKey && accessKey !== "YOUR_ACCESS_KEY_HERE";

    if (!hasValidKey) {
      // Fallback: Create mailto link with form data if no valid API key exists
      try {
        const subject = encodeURIComponent(`Portfolio Contact: ${data.subject}`);
        const body = encodeURIComponent(
          `Name: ${data.name}\nEmail: ${data.email}\n\nMessage:\n${data.message}`,
        );
        const mailtoUrl = `mailto:${emailAddress}?subject=${subject}&body=${body}`;

        // Open email client
        window.location.href = mailtoUrl;

        setSubmitStatus("success");
        reset();
      } catch {
        setSubmitStatus("error");
      } finally {
        setIsSubmitting(false);
      }
      return;
    }

    // Main action: Background AJAX submit to Web3Forms API
    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: accessKey,
          name: data.name,
          email: data.email,
          subject: data.subject,
          message: data.message,
        }),
      });

      const result = await response.json();
      if (result.success) {
        setSubmitStatus("success");
        reset();
      } else {
        setSubmitStatus("error");
      }
    } catch (error) {
      console.error("Web3Forms submission error:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 lg:py-32 px-2 md:px-4 relative overflow-hidden">
      {/* Watermark number */}
      <div className="absolute lg:-top-8 lg:-left-2 top-2 left-2 font-display text-[10rem] lg:text-[16rem] font-bold text-ink opacity-[0.05] dark:opacity-[0.1] leading-none select-none pointer-events-none">
        03
      </div>

      {/* Section Header — left aligned */}
      <div className="mb-16 lg:mb-20">
        <div className="font-sans text-[10px] tracking-[0.3em] text-muted uppercase mb-2">
          03 — CONTACT
        </div>
        <h2 className="font-display text-5xl sm:text-7xl lg:text-8xl font-bold tracking-tighter uppercase text-ink">
          LET'S TALK
        </h2>
        <p className="font-sans text-xs tracking-wide uppercase text-muted mt-4 max-w-lg">
          If you're looking to hire a developer or need a website for your
          business, let's discuss how we can work together.
        </p>
      </div>

      {/* Form — left aligned, not centered */}
      <div className="max-w-2xl">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 font-sans text-xs uppercase">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Name */}
            <div>
              <label className="text-[10px] tracking-[0.2em] text-muted font-normal mb-2 block">
                NAME
              </label>
              <input
                type="text"
                placeholder="ENTER NAME"
                {...register("name", { required: "Name is required" })}
                className="w-full py-3 bg-transparent text-ink border-0 border-b border-border-light focus:border-ink transition-colors duration-150 tracking-wider uppercase text-xs font-bold placeholder:text-muted/50 placeholder:font-normal"
              />
              {errors.name && (
                <p className="text-red-500 text-[10px] font-bold mt-1">
                  * {errors.name.message.toUpperCase()}
                </p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="text-[10px] tracking-[0.2em] text-muted font-normal mb-2 block">
                EMAIL
              </label>
              <input
                type="email"
                placeholder="ENTER EMAIL ADDRESS"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: "Invalid email address",
                  },
                })}
                className="w-full py-3 bg-transparent text-ink border-0 border-b border-border-light focus:border-ink transition-colors duration-150 tracking-wider uppercase text-xs font-bold placeholder:text-muted/50 placeholder:font-normal"
              />
              {errors.email && (
                <p className="text-red-500 text-[10px] font-bold mt-1">
                  * {errors.email.message.toUpperCase()}
                </p>
              )}
            </div>
          </div>

          {/* Subject */}
          <div>
            <label className="text-[10px] tracking-[0.2em] text-muted font-normal mb-2 block">
              SUBJECT
            </label>
            <input
              type="text"
              placeholder="ENTER SUBJECT"
              {...register("subject", { required: "Subject is required" })}
              className="w-full py-3 bg-transparent text-ink border-0 border-b border-border-light focus:border-ink transition-colors duration-150 tracking-wider uppercase text-xs font-bold placeholder:text-muted/50 placeholder:font-normal"
            />
            {errors.subject && (
              <p className="text-red-500 text-[10px] font-bold mt-1">
                * {errors.subject.message.toUpperCase()}
              </p>
            )}
          </div>

          {/* Message */}
          <div>
            <label className="text-[10px] tracking-[0.2em] text-muted font-normal mb-2 block">
              MESSAGE
            </label>
            <textarea
              rows={6}
              placeholder="ENTER YOUR MESSAGE"
              {...register("message", { required: "Message is required" })}
              className="w-full py-3 bg-transparent text-ink border-0 border-b border-border-light focus:border-ink transition-colors duration-150 tracking-wider uppercase text-xs font-bold placeholder:text-muted/50 placeholder:font-normal resize-none min-h-[120px]"
            />
            {errors.message && (
              <p className="text-red-500 text-[10px] font-bold mt-1">
                * {errors.message.message.toUpperCase()}
              </p>
            )}
          </div>

          {submitStatus === "success" && (
            <p className="text-ink font-bold text-[10px] tracking-widest">
              {(personalInfo?.web3FormsKey || config.web3FormsKey) && (personalInfo?.web3FormsKey || config.web3FormsKey) !== "YOUR_ACCESS_KEY_HERE"
                ? "MESSAGE SENT SUCCESSFULLY"
                : "EMAIL CLIENT OPENED SUCCESSFULLY"}
            </p>
          )}

          {submitStatus === "error" && (
            <p className="text-red-500 font-bold text-[10px] tracking-widest">
              SOMETHING WENT WRONG. PLEASE TRY AGAIN.
            </p>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-ink text-ground py-4 font-display text-sm tracking-wider uppercase font-bold hover:opacity-80 transition-opacity duration-150 cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "SENDING..." : "SEND MESSAGE"}
          </button>
        </form>

        {/* Direct contact */}
        <div className="mt-20 pt-12">
          <p className="font-sans text-[10px] tracking-widest uppercase text-muted mb-4">
            OR REACH OUT DIRECTLY
          </p>
          <a
            href={`mailto:${emailAddress}`}
            className="font-display text-xl sm:text-2xl font-bold tracking-tight text-ink hover:underline uppercase"
          >
            {emailAddress}
          </a>
        </div>
      </div>
    </section>
  );
};

export default Contact;
