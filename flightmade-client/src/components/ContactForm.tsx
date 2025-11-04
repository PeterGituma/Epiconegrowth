// "use client";

// import { useState } from "react";

// function Button(props: React.ButtonHTMLAttributes<HTMLButtonElement>) {
//   return (
//     <button
//       {...props}
//       className={`w-full px-5 py-3 rounded-xl bg-gradient-to-r from-indigo-700 to-indigo-900 text-white font-semibold shadow-md hover:from-indigo-800 hover:to-black transition duration-300 ${props.className || ""}`}
//     />
//   );
// }

// function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
//   return (
//     <input
//       {...props}
//       className={`border border-gray-300 rounded-xl px-4 py-3 w-full focus:ring-2 focus:ring-indigo-400 focus:outline-none ${props.className || ""}`}
//     />
//   );
// }



// function Textarea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
//   return (
//     <textarea
//       {...props}
//       className={`border border-gray-300 rounded-xl px-4 py-3 w-full focus:ring-2 focus:ring-indigo-400 focus:outline-none ${props.className || ""}`}
//     />
//   );
// }

// export default function ContactForm() {
//   const [name, setName] = useState("");
//   const [message, setMessage] = useState("");
//   const [email, setEmail] = useState("");

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     console.log({ name, message });
//     setName("");
//     setEmail("@example.com");
//     setMessage("");
//   };

//   return (
//     <section id="contact" className="relative py-16 bg-gradient-to-b from-gray-900 via-gray-800 to-black text-white">
//       <div className="max-w-2xl mx-auto bg-white/10 backdrop-blur-md rounded-2xl shadow-xl p-8 border border-white/20">
//         <h2 className="text-3xl font-extrabold mb-6 text-center">Contact Us</h2>
//         <p className="text-center text-gray-300 mb-8">
//           Have questions or need assistance? Send us a message and we’ll get back to you.
//         </p>

//         <form onSubmit={handleSubmit} className="space-y-4">
//           <Input
//             placeholder="Your name"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//           />

//           <Input
//             placeholder="YourEmail@example.com"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//           />

//           <Textarea
//             placeholder="Your message"
//             value={message}
//             onChange={(e) => setMessage(e.target.value)}
//             rows={4}
//           />

//           <Button type="submit">Send Message ✈️</Button>
//         </form>
//       </div>
//     </section>
//   );
// }

"use client";

import { useState } from "react";

function Button(props: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      className={`w-full px-5 py-3 rounded-xl bg-gradient-to-r from-indigo-700 to-indigo-900 text-white font-semibold shadow-md hover:from-indigo-800 hover:to-black transition duration-300 ${props.className || ""}`}
    />
  );
}

function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className={`border border-gray-300 rounded-xl px-4 py-3 w-full focus:ring-2 focus:ring-indigo-400 focus:outline-none ${props.className || ""}`}
    />
  );
}

function Textarea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      {...props}
      className={`border border-gray-300 rounded-xl px-4 py-3 w-full focus:ring-2 focus:ring-indigo-400 focus:outline-none ${props.className || ""}`}
    />
  );
}

export default function ContactForm() {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, message }),
    });

    if (res.ok) {
      alert("Message sent!");
      setName("");
      setEmail("");
      setMessage("");
    } else {
      alert("Something went wrong.");
    }

    setLoading(false);
  };

  return (
    <section id="contact" className="relative py-16 bg-gradient-to-b from-gray-900 via-gray-800 to-black text-white">
      <div className="max-w-2xl mx-auto bg-white/10 backdrop-blur-md rounded-2xl shadow-xl p-8 border border-white/20">
        <h2 className="text-3xl font-extrabold mb-6 text-center">Contact Us</h2>
        <p className="text-center text-gray-300 mb-8">
          Have questions or need assistance? Send us a message and we’ll get back to you.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            placeholder="Your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <Input
            placeholder="YourEmail@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <Textarea
            placeholder="Your message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={4}
          />

          <Button type="submit" disabled={loading}>
            {loading ? "Sending..." : "Send Message ✈️"}
          </Button>
        </form>
      </div>
    </section>
  );
}


