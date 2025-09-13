# 🔗 SnapLink – Modern URL Shortener

A **full-stack URL shortener** built with **Next.js 13 (App Router)**, **NextAuth**, and **MongoDB**. SnapLink lets you **create, manage, and share** your own short links securely — all in one place.

---

## 🚀 Features

✅ **Secure Authentication** – User signup & login with **NextAuth + bcrypt**
✅ **Custom Short URLs** – Pick your own short names instead of random codes
✅ **Duplicate Prevention** – No conflicts, every short URL is unique
✅ **Link Dashboard** – Manage all your links after logging in
✅ **Persistent Storage** – MongoDB schema stores user + links
✅ **Session Handling** – Session includes user info + URL list
✅ **Real-time Feedback** – Toast notifications for success/errors

---

## ⚙️ Tech Stack

**Frontend:** ⚛️ Next.js 13, 🎨 TailwindCSS, 🔔 React-Toastify
**Backend:** 🔐 NextAuth, 🛠️ Next.js API Routes, 🐍 Mongoose
**Database:** 🍃 MongoDB (User schema with embedded link objects)

---

## 🌟 Why SnapLink?

Unlike basic shorteners, SnapLink gives each user their own **personal link dashboard**.
With authentication, secure storage, and unique short URLs, it’s not just a tool — it’s your **personalized link manager**.

---

## 🔮 Future Roadmap

✨ Analytics (click counts, traffic insights)
✨ Expiry dates for short links
✨ Public profile pages to share collections
✨ QR code generation for every link

---

## 📂 Project Highlights

* **Authentication Flow:** Uses NextAuth sessions to store user data (email, username, links).
* **Database Design:** MongoDB schema stores each user’s collection of links.
* **API Routes:** Protected routes ensure only logged-in users can generate/view links.
* **UI/UX:** Simple, clean, responsive interface with Tailwind.

---

### 💡 SnapLink is more than a shortener — it’s your **link hub**.

---

