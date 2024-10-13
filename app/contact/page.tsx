import React from "react";
import { Mail, Phone, MapPin } from "lucide-react";

const ContactPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 to-indigo-900 text-white font-sans">
      <main className="container mx-auto px-4 py-16">
        <h2 className="text-4xl font-bold mb-12 text-center">Get in Touch</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-2xl font-semibold mb-4">Contact Information</h3>
            <div className="space-y-4">
              <p className="flex items-center">
                <Mail className="mr-2" />
                <a
                  href="mailto:info@musicstream.com"
                  className="hover:text-purple-300 transition-colors"
                >
                  info@jamroom.com
                </a>
              </p>
              <p className="flex items-center">
                <Phone className="mr-2" />
                <a
                  href="tel:+1234567890"
                  className="hover:text-purple-300 transition-colors"
                >
                  +91 82385 88952
                </a>
              </p>
              <p className="flex items-center">
                <MapPin className="mr-2" />
                <span>123 Music Street, Harmony City, 12345</span>
              </p>
            </div>
          </div>
          <div>
            <h3 className="text-2xl font-semibold mb-4">Send us a Message</h3>
            <form className="space-y-4">
              <div>
                <label htmlFor="name" className="block mb-1">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="w-full px-3 py-2 bg-white bg-opacity-10 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
                />
              </div>
              <div>
                <label htmlFor="email" className="block mb-1">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="w-full px-3 py-2 bg-white bg-opacity-10 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
                />
              </div>
              <div>
                <label htmlFor="message" className="block mb-1">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  className="w-full px-3 py-2 bg-white bg-opacity-10 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
                ></textarea>
              </div>
              <button
                type="submit"
                className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-full transition-colors"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ContactPage;
