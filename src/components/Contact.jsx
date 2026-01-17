import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { config } from "../config";

const Contact = () => {
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

    try {
      // Create mailto link with form data
      const subject = encodeURIComponent(`Portfolio Contact: ${data.subject}`);
      const body = encodeURIComponent(
        `Name: ${data.name}\nEmail: ${data.email}\n\nMessage:\n${data.message}`,
      );
      const mailtoUrl = `mailto:${config.email}?subject=${subject}&body=${body}`;

      // Open email client
      window.location.href = mailtoUrl;

      setSubmitStatus("success");
      reset();
    } catch (error) {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id='contact' className={`py-20 ${config.colors.primary} px-6`}>
      <div className='max-w-4xl mx-auto text-center'>
        <div className='mb-12'>
          <p className={`${config.colors.accent} mb-4`}>03. What's Next?</p>
          <h2
            className={`${config.colors.textPrimary} text-3xl md:text-5xl font-bold mb-6`}
          >
            Let's Work Together
          </h2>
          <p
            className={`${config.colors.textSecondary} text-lg max-w-2xl mx-auto leading-relaxed`}
          >
            If you're looking to hire a developer or need a website for your
            business, let's discuss how we can work together!
          </p>
        </div>

        <div className='max-w-2xl mx-auto'>
          <form onSubmit={handleSubmit(onSubmit)} className='space-y-6'>
            <div className='grid md:grid-cols-2 gap-6'>
              <div>
                <input
                  type='text'
                  placeholder='Your Name'
                  {...register("name", { required: "Name is required" })}
                  className={`w-full px-4 py-3 ${config.colors.secondary} ${config.colors.textPrimary} border ${config.colors.border} rounded focus:outline-none focus:border-red-300 transition-colors duration-200`}
                />
                {errors.name && (
                  <p className='text-red-400 text-sm mt-1'>
                    {errors.name.message}
                  </p>
                )}
              </div>

              <div>
                <input
                  type='email'
                  placeholder='Your Email'
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^\S+@\S+$/i,
                      message: "Invalid email address",
                    },
                  })}
                  className={`w-full px-4 py-3 ${config.colors.secondary} ${config.colors.textPrimary} border ${config.colors.border} rounded focus:outline-none focus:border-red-300 transition-colors duration-200`}
                />
                {errors.email && (
                  <p className='text-red-400 text-sm mt-1'>
                    {errors.email.message}
                  </p>
                )}
              </div>
            </div>

            <div>
              <input
                type='text'
                placeholder='Subject'
                {...register("subject", { required: "Subject is required" })}
                className={`w-full px-4 py-3 ${config.colors.secondary} ${config.colors.textPrimary} border ${config.colors.border} rounded focus:outline-none focus:border-red-300 transition-colors duration-200`}
              />
              {errors.subject && (
                <p className='text-red-400 text-sm mt-1'>
                  {errors.subject.message}
                </p>
              )}
            </div>

            <div>
              <textarea
                rows={6}
                placeholder='Your Message'
                {...register("message", { required: "Message is required" })}
                className={`w-full px-4 py-3 ${config.colors.secondary} ${config.colors.textPrimary} border ${config.colors.border} rounded focus:outline-none focus:border-red-300 transition-colors duration-200 resize-none`}
              />
              {errors.message && (
                <p className='text-red-400 text-sm mt-1'>
                  {errors.message.message}
                </p>
              )}
            </div>

            {submitStatus === "success" && (
              <p className='text-red-300 text-sm'>
                Email client opened successfully!
              </p>
            )}

            {submitStatus === "error" && (
              <p className='text-red-400 text-sm'>
                Something went wrong. Please try again.
              </p>
            )}

            <button
              type='submit'
              disabled={isSubmitting}
              className={`${config.colors.buttonSecondary} border px-8 py-4 rounded text-sm transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              {isSubmitting ? "Sending..." : "Send Message"}
            </button>
          </form>

          <div className='mt-12'>
            <p className={`${config.colors.textSecondary} text-sm mb-4`}>
              Or reach out directly:
            </p>
            <a
              href={`mailto:${config.email}`}
              className={`${config.colors.accent} ${config.colors.linkHover} text-lg transition-colors duration-200`}
            >
              {config.email}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
