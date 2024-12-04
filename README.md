Here’s an updated **GitHub README** with the provided links integrated:  

---

# Forever Clothing Store  

**Forever Clothing Store** is a modern e-commerce web application with an admin dashboard, designed for a seamless shopping and management experience. Built with **React.js**, **Express.js**, and **Node.js**, it integrates secure payment gateways like **Stripe** and **Razorpay**.  

## Live Links  

- [**Admin Dashboard**](https://forever-admin-alpha.vercel.app)  
- [**Clothing Store**](https://ecommerce-app-seven-blond.vercel.app)  
- [**Backend API**](https://forever-backend-dun.vercel.app)  

## Features  

### User Features  
- **Dynamic UI**: Fast, responsive, and user-friendly design built with **React.js**.  
- **Product Management**: Advanced search, sorting, and categorization for easy navigation.  
- **Secure Payment Options**: Integrated **Stripe** and **Razorpay** for safe transactions.  
- **Order Tracking**: View and manage order history with ease.  
- **Mobile-First Design**: Fully responsive for desktops, tablets, and smartphones.  

### Admin Dashboard  
- Manage products, orders, and user data.  
- Real-time insights and updates.  

### Backend Highlights  
- Built with **Express.js** and **Node.js** for robust server-side operations.  
- Connected to a **MongoDB Atlas** database for scalable data storage.
- Integrated with Cloudinary for efficient and scalable image storage and retrieval.
- Deployed on **Vercel** for reliable performance.  

## Tech Stack  
- **Frontend**: React.js, HTML, CSS  
- **Backend**: Node.js, Express.js
- **Image Storage**: Cloudinary
- **Database**: MongoDB Atlas  
- **Payment Gateways**: Stripe, Razorpay  
- **Deployment**: Vercel  

## Installation  

### Prerequisites  
Ensure you have the following installed:  
- **Node.js** (v14 or higher)  
- **npm** (v6 or higher)  

### Steps  
1. Clone the repository:  
   ```bash  
   git clone https://github.com/yourusername/forever-clothing-store.git  
   cd forever-clothing-store  
   ```  

2. Install dependencies for the frontend and backend:  
   ```bash  
   npm install  
   cd client  
   npm install  
   cd ..  
   ```  

3. Create a `.env` file in the root directory with the following environment variables:  
   ```env
   MONGODB_URI=<your-mongodb-atlas-uri>  
   CLOUDINARY_API_KEY=<your-cloudinary-api-key>  
   CLOUDINARY_API_SECRET=<your-cloudinary-api-secret-key>  
   CLOUDINARY_NAME=<your-cloudinary-cloud-name>  
   JWT_SECRET=<your-jwt-secret-key>  
   STRIPE_SECRET_KEY=<your-stripe-secret-key>  
   RAZORPAY_KEY_ID=<your-razorpay-key-id>  
   RAZORPAY_KEY_SECRET=<your-razorpay-key-secret>  
   ```  

4. Start the frontend:  
   ```bash  
   npm run dev  
   ```
5. Start the Backend:
   ```bash  
   npm run server  
   ```

5. Access the backend at `http://localhost:4000`, admin panel at `http://localhost:5174` and forever store at `http://localhost:5173`.  

## Contributing  
Contributions are welcome! Please fork the repository and submit a pull request with your improvements.  

## License  
This project is licensed under the [MIT License](LICENSE).  

---  

Enjoy shopping and managing with **Forever Clothing Store**! 🌟  
