// app/contact/page.tsx
"use client";

import apiClient from "@/api/client";
import useAuth from "@/auth/useAuth";
import { WHATSAPP_NUMBER } from "@/constants";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { FaWhatsapp } from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";

const emailValidation = (email) => {
  const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  return regex.test(email);
}


export default function ContactPage() {
  const { user } = useAuth()
  const [status, setStatus] = useState("idle"); // idle | success | error

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

  const [errors, setErrors] = useState({})

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const validate = () => {
    const errors = {}
    const { name, email, subject, message } = formData
    if (!name?.trim()) {
      errors.name = "Name is required"
    }
    if (!email?.trim()) {
      errors.email = "Email is required"
    }
    else if (!emailValidation(email?.trim())) {
      errors.email = "Please enter a valid email address"
    }
    if (!subject) {
      errors.subject = "Subject is required"
    }
    if (!message) {
      errors.message = "Message is required"
    }
    setErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    // TODO: integrate with your API
    // fake submit
    // console.log("submitting")
    if (!validate()) return;
    try {
      const { name, email, subject, message } = formData
      const response = await apiClient.post("/support/add-support-request", {
        user: user?.id,
        name,
        email,
        subject,
        message
      })
      console.log("response", response)
      if (!response.ok) {
        throw new Error("Failed to send message")
      }
      toast.success("Message Sent Successfully")
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: ""
      })
      setStatus("success");
      e.target.reset();
      // setTimeout(() => setStatus("idle"), 3000);
    } catch (err) {
      setStatus("error");
      toast.error("Failed to send message")
      // setTimeout(() => setStatus("idle"), 3000);
    } finally {
      setTimeout(() => setStatus("idle"), 3000);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f9f5f1] text-slate-900">
      {/* Page Content */}
      <main className="flex-1">
        {/* Hero Section */}
        <section className="border-b border-slate-200 bg-gradient-to-br from-[#f9f5f1] to-[#f1e4d4]">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 grid md:grid-cols-2 gap-10 items-center">
            <div>
              <p className="text-xs uppercase tracking-[0.25em] text-amber-900 mb-3">
                Contact
              </p>
              <h1 className=" text-3xl sm:text-4xl lg:text-5xl leading-tight mb-4 text-slate-900">
                We&apos;d love to hear from you.
              </h1>
              <p className="text-sm sm:text-base text-slate-700 mb-4">
                Whether you have a question about an order, are looking for bulk
                sourcing, or want to partner as an artisan, our team is here to
                help.
              </p>
              <p className="text-sm text-slate-600">
                BundeliCrafts is dedicated to preserving the rich cultural
                heritage of Bundelkhand through authentic handmade crafts that
                tell stories of tradition and skill.
              </p>
            </div>

            <div className="relative">
              <div className="absolute -inset-4 bg-amber-900/5 rounded-3xl -z-10" />
              <div className="rounded-3xl border border-amber-900/10 bg-white p-6 sm:p-8 shadow-sm flex flex-col gap-4">
                <div className="flex gap-4 items-start">
                  <div className="h-10 w-10 rounded-full bg-amber-900 text-amber-50 flex items-center justify-center text-xl">
                    🪔
                  </div>
                  <div>
                    <h2 className=" text-xl mb-1">Crafted with heritage.</h2>
                    <p className="text-sm text-slate-600">
                      Each piece on BundeliCrafts is sourced from artisans
                      across Bundelkhand, ensuring authenticity and fair value.
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm mt-2">
                  <div className="bg-[#f9f5f1] rounded-xl p-3 shadow-md shadow-amber-900/10">
                    <p className="text-xs text-slate-500 mb-1">From</p>
                    <p className="font-medium">Bundelkhand</p>
                  </div>
                  <div className="bg-[#f9f5f1] rounded-xl p-3 shadow-lg shadow-amber-900/10">
                    <p className="text-xs text-slate-500 mb-1">To</p>
                    <p className="font-medium">Homes Worldwide</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Main Contact Area */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
          <div className="grid lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1.3fr)] gap-8">
            {/* Contact Info */}
            <aside className="space-y-6">
              <div className="rounded-2xl border border-amber-900/15 bg-white p-6 sm:p-7 shadow-sm">
                <h2 className=" text-xl mb-2">Get in touch</h2>
                <p className="text-sm text-slate-600 mb-4">
                  Reach out to us through email, WhatsApp, or phone. We usually
                  respond within 24 hours.
                </p>

                <div className="space-y-4 text-sm">
                  <div className="flex gap-3">
                    <span className="mt-0.5">📍</span>
                    <div>
                      <p className="text-xs uppercase tracking-wide text-slate-500 mb-1">
                        Location
                      </p>
                      <p className="font-medium">
                        Lucknow, Uttar Pradesh, India
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <span className="mt-0.5">✉️</span>
                    <div>
                      <p className="text-xs uppercase tracking-wide text-slate-500 mb-1">
                        Email
                      </p>
                      <a
                        href="mailto:support@bundelicrafts.com"
                        className="font-medium text-amber-900 hover:underline"
                      >
                        support@bundelicrafts.com
                      </a>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <span className="mt-0.5">📞</span>
                    <div>
                      <p className="text-xs uppercase tracking-wide text-slate-500 mb-1">
                        Phone / WhatsApp
                      </p>
                      <a
                        href="tel:+919876543210"
                        className="font-medium text-slate-800"
                      >
                        +91 98765 43210
                      </a>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <span className="mt-0.5">🕒</span>
                    <div>
                      <p className="text-xs uppercase tracking-wide text-slate-500 mb-1">
                        Support Hours
                      </p>
                      <p className="font-medium text-slate-800">
                        Daily, 10:00 AM – 7:00 PM IST
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex flex-col sm:flex-row gap-3">
                  <a
                    href={`https://wa.me/${WHATSAPP_NUMBER}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-white shadow-sm hover:bg-secondary transition"
                  >
                    <FaWhatsapp className="w-4 h-4" />
                    Chat on WhatsApp
                  </a>

                  <a
                    href="mailto:support@bundelicrafts.com"
                    className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-300 px-5 py-2.5 text-sm font-medium text-slate-800 hover:border-amber-900 hover:text-amber-900 transition"
                  >
                    <MdOutlineEmail className="w-4 h-4" />
                    Email Us
                  </a>

                </div>
              </div>

              <div className="rounded-2xl border border-amber-900/10 bg-[#f9f5f1] p-5 sm:p-6">
                <h3 className=" text-lg mb-2">Bulk & Corporate Orders</h3>
                <p className="text-sm text-slate-600 mb-3">
                  Looking to source Bundelkhand crafts for your brand, hotel, or
                  gifting requirements?
                </p>
                <p className="text-sm text-slate-700">
                  Select <span className="font-medium">“Bulk / corporate”</span>{" "}
                  in the contact form topic and our team will get back with
                  catalog & pricing.
                </p>
              </div>
            </aside>

            {/* Contact Form */}
            <section className="rounded-2xl border border-amber-900/15 bg-white p-6 sm:p-8 shadow-sm">
              <h2 className=" text-xl mb-2">Send us a message</h2>
              <p className="text-sm text-slate-600 mb-6">
                Fill out the form and we&apos;ll get back to you as soon as we
                can.
              </p>

              {status === "success" && (
                <div className="mb-4 rounded-xl border border-emerald-500/30 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
                  ✅ Your message has been sent. We&apos;ll get back to you
                  shortly.
                </div>
              )}
              {status === "error" && (
                <div className="mb-4 rounded-xl border border-red-500/30 bg-red-50 px-4 py-3 text-sm text-red-700">
                  ⚠️ Something went wrong. Please try again.
                </div>
              )}

              <form className="space-y-5" onSubmit={handleSubmit}>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-amber-900 focus:ring-1 focus:ring-amber-900/40"
                      placeholder="Enter your full name"
                    />
                    {errors.name && <p className="text-red-600 text-sm mt-1">{errors.name}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Email Address *
                    </label>
                    <input
                      type="text"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-amber-900 focus:ring-1 focus:ring-amber-900/40"
                      placeholder="you@example.com"
                    />
                    {errors.email && <p className="text-red-600 text-sm mt-1">{errors.email}</p>}
                  </div>
                </div>

                {/* <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-amber-900 focus:ring-1 focus:ring-amber-900/40"
                      placeholder="+91 98765 43210"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Order ID
                    </label>
                    <input
                      type="text"
                      name="orderId"
                      className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-amber-900 focus:ring-1 focus:ring-amber-900/40"
                      placeholder="If related to an existing order"
                    />
                  </div>
                </div> */}

                {/* <div>
                  <label className="block text-sm font-medium mb-1">
                    Topic *
                  </label>
                  <select
                    name="topic"
                    className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-amber-900 focus:ring-1 focus:ring-amber-900/40"
                  >
                    <option value="">Select a topic</option>
                    <option value="general">General enquiry</option>
                    <option value="order">Order issue</option>
                    <option value="bulk">Bulk / corporate order</option>
                    <option value="artisan">Artisan partnership</option>
                    <option value="website">Website feedback</option>
                  </select>
                </div> */}

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Subject *
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-amber-900 focus:ring-1 focus:ring-amber-900/40"
                    placeholder="What is your query about?"
                  />
                  {errors.subject && <p className="text-red-600 text-sm mt-1">{errors.subject}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Message *
                  </label>
                  <textarea
                    name="message"
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-amber-900 focus:ring-1 focus:ring-amber-900/40 resize-none"
                    placeholder="Tell us how we can help you..."
                  />
                  {errors.message && <p className="text-red-600 text-sm mt-1">{errors.message}</p>}
                </div>

                {/* <div className="flex items-start gap-2">
                  <input
                    id="newsletter"
                    type="checkbox"
                    name="newsletter"
                    className="mt-1 h-4 w-4 rounded border-slate-300 text-amber-900 focus:ring-amber-900"
                  />
                  <label
                    htmlFor="newsletter"
                    className="text-xs sm:text-sm text-slate-600"
                  >
                    I&apos;d like to receive updates about new collections and
                    offers.
                  </label>
                </div> */}

                <button
                  type="submit"
                  className="w-full inline-flex items-center justify-center rounded-full bg-primary px-6 py-2.5 text-sm font-medium text-amber-50 shadow-sm hover:bg-amber-950 transition"
                >
                  Send Message
                </button>
              </form>
            </section>
          </div>
        </section>

        {/* Trust Bar */}
        <section className="border-y border-slate-200 bg-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: "Secure Payments", icon: "🔒" },
              { label: "Easy Returns", icon: "↩️" },
              { label: "Authentic Products", icon: "✅" },
              { label: "Support 24/7", icon: "🕰️" },
            ].map((item) => (
              <div
                key={item.label}
                className="flex items-center gap-3 text-sm bg-[#f9f5f1] rounded-2xl px-3 py-3"
              >
                <div className="text-lg">{item.icon}</div>
                <p className="font-medium text-slate-800">{item.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Help & FAQ + Map */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h2 className=" text-xl mb-2">Need quick help?</h2>
              <p className="text-sm text-slate-600 mb-4">
                You might find your answer in our support sections.
              </p>
              <div className="grid gap-3 text-sm">
                <a
                  href="/faq"
                  className="flex items-center justify-between rounded-xl border border-slate-200 bg-white px-4 py-3 hover:border-amber-900 hover:bg-[#f9f5f1] transition"
                >
                  <span>FAQ</span>
                  <span>→</span>
                </a>
                <a
                  href="/shipping-and-returns"
                  className="flex items-center justify-between rounded-xl border border-slate-200 bg-white px-4 py-3 hover:border-amber-900 hover:bg-[#f9f5f1] transition"
                >
                  <span>Shipping &amp; Returns</span>
                  <span>→</span>
                </a>
                <a
                  href="/privacy-policy"
                  className="flex items-center justify-between rounded-xl border border-slate-200 bg-white px-4 py-3 hover:border-amber-900 hover:bg-[#f9f5f1] transition"
                >
                  <span>Privacy Policy</span>
                  <span>→</span>
                </a>
                <a
                  href="/terms-and-conditions"
                  className="flex items-center justify-between rounded-xl border border-slate-200 bg-white px-4 py-3 hover:border-amber-900 hover:bg-[#f9f5f1] transition"
                >
                  <span>Terms &amp; Conditions</span>
                  <span>→</span>
                </a>
              </div>
            </div>

            <div className="rounded-2xl border border-amber-900/10 bg-[#f9f5f1] p-6 flex flex-col justify-between">
              <div>
                <h2 className=" text-xl mb-2">Our base</h2>
                <p className="text-sm text-slate-600 mb-4">
                  BundeliCrafts is proudly based in Lucknow, Uttar Pradesh,
                  connecting Bundelkhand artisans with craft lovers across the
                  globe.
                </p>
              </div>
              <div className="mt-2 rounded-xl overflow-hidden border border-amber-900/20 bg-slate-200 h-48 flex items-center justify-center text-xs text-slate-700">
                {/* Replace with real map embed later */}
                {/* <span>Map placeholder – Lucknow, Uttar Pradesh, India</span> */}
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3559.123456!2d80.949914!3d26.846708!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x399bfdc123456789%3A0xabcdef123456789!2sLucknow%2C+Uttar+Pradesh%2C+India!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Lucknow Map"
                />

              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
