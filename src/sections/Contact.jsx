import { motion } from "framer-motion";
import { useState } from "react";
import emailjs from "@emailjs/browser";

function Contact() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });

  const [sending, setSending] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setSending(true);

    emailjs
      .send(
        "service_dalitech254",
        "template_cmy1x92",
        {
          from_name: form.name,
          from_phone: form.phone,
          from_email: form.email,
          message: form.message,
        },
        "BX9VRyGRBc_QEeQDI"
      )
      .then(() => {
        alert("Secure message sent successfully 🚀");

        setForm({
          name: "",
          phone: "",
          email: "",
          message: "",
        });

        setSending(false);
      })
      .catch((error) => {
        console.error(error);

        alert("Message failed to send.");

        setSending(false);
      });
  };

  return (
    <section className="py-20 px-6">

      {/* HEADER */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <h2 className="text-4xl md:text-5xl font-bold">
          Secure <span className="text-cyan-400 glow-text">Contact</span>
        </h2>

        <p className="text-gray-400 mt-4">
          Initiate encrypted communication with DALITECH CEH
        </p>
      </motion.div>

      {/* CONTACT CARD */}
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto glass-card p-8 relative overflow-hidden"
      >

        {/* GLOW EFFECT */}
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-purple-500/10 pointer-events-none"></div>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="grid gap-4 relative z-10">

          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Your Name"
            required
            className="p-4 bg-white/5 border border-white/10 rounded-lg outline-none text-white focus:border-cyan-400 transition"
          />

          <input
            type="text"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            placeholder="Your Phone Number"
            required
            className="p-4 bg-white/5 border border-white/10 rounded-lg outline-none text-white focus:border-cyan-400 transition"
          />

          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Your Email"
            required
            className="p-4 bg-white/5 border border-white/10 rounded-lg outline-none text-white focus:border-cyan-400 transition"
          />

          <textarea
            name="message"
            value={form.message}
            onChange={handleChange}
            placeholder="Your Message"
            rows="5"
            required
            className="p-4 bg-white/5 border border-white/10 rounded-lg outline-none text-white focus:border-cyan-400 transition resize-none"
          ></textarea>

          <button
            type="submit"
            disabled={sending}
            className="cyber-btn mt-2"
          >
            {sending ? "Encrypting & Sending..." : "Send Secure Message"}
          </button>

        </form>

        {/* CONTACT OPTIONS */}
        <div className="mt-8 flex flex-wrap gap-4 justify-center text-sm relative z-10">

          <a
            href="mailto:oumadalton409@gmail.com"
            className="glass-btn"
          >
            Email
          </a>

          <a
            href="https://wa.me/254745460866"
            target="_blank"
            rel="noreferrer"
            className="glass-btn"
          >
            WhatsApp
          </a>

          <a
            href="https://github.com/dalton2171"
            target="_blank"
            rel="noreferrer"
            className="glass-btn"
          >
            GitHub
          </a>

          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noreferrer"
            className="glass-btn"
          >
            LinkedIn
          </a>

        </div>

      </motion.div>
    </section>
  );
}

export default Contact;