'use client'

import React from 'react';

export default function ContactPage() {
  const [result, setResult] = React.useState("");
  const onSubmit = async (event) => {
    event.preventDefault();
    setResult("Sending....");
    const formData = new FormData(event.target);

    formData.append("access_key", process.env.NEXT_PUBLIC_WEB3FORMS_KEY);

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData
    });

    const data = await response.json();

    if (data.success) {
      setResult("Form Submitted Successfully");
      event.target.reset();
    } else {
      console.log("Error", data);
      setResult(data.message);
    }
  };
  return (
    <main className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 py-16 px-4">
      <section className="max-w-4xl mx-auto bg-white shadow-2xl rounded-3xl p-10 border border-orange-100">
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Contactez-nous
          </h1>
          <p className="text-gray-600 text-lg">
            Vous avez une question, une demande ou besoin d’assistance ? Écrivez-nous via ce formulaire ou contactez-nous directement.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Contact Info */}
          <div className="text-gray-700 space-y-6">
            <div>
              <h2 className="text-xl font-semibold mb-2">Adresse e-mail</h2>
              <p className="text-orange-600 font-medium">Contact@akaltrip.com</p>
            </div>
            <div>
              <h2 className="text-xl font-semibold mb-2">Téléphone</h2>
              <p className="text-orange-600 font-medium">+212 661-604747</p>
            </div>
          </div>

          {/* Contact Form */}
          <form
            onSubmit={onSubmit}
            method="POST"
            className="space-y-6"
          >
            {/* Replace with your own Web3Forms access key */}
            <input type="hidden" name="access_key" value="YOUR_WEB3FORMS_ACCESS_KEY" />

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nom complet
              </label>
              <input
                type="text"
                name="name"
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500"
                placeholder="Votre nom"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Adresse e-mail
              </label>
              <input
                type="email"
                name="email"
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500"
                placeholder="exemple@email.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Message
              </label>
              <textarea
                name="message"
                rows={5}
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500"
                placeholder="Votre message..."
              />
            </div>

            <button
              type="submit"
              className="bg-orange-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-orange-700 transition duration-300 shadow-md hover:shadow-lg"
            >
              Envoyer le message
            </button>
          </form>
          <span className=' self-end text-sm italic font-medium'>{result}</span>
        </div>
      </section>
    </main>
  );
}
