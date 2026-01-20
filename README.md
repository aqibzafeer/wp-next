# Azlan Garments - Next.js E-commerce Platform

A modern, full-stack e-commerce platform built with Next.js 16, TypeScript, and Tailwind CSS. This application integrates with WooCommerce for product management and Stripe for secure payment processing.

## 🚀 Features

### Core Functionality
- **Product Catalog**: Display products from WooCommerce with categories, images, and pricing
- **Shopping Cart**: Persistent cart with localStorage integration
- **Secure Checkout**: Multi-step checkout process with Stripe payment integration
- **Order Management**: WooCommerce order creation and management
- **Responsive Design**: Mobile-first design with Tailwind CSS
- **SEO Optimized**: Server-side rendering with Next.js App Router

### Technical Features
- **TypeScript**: Full type safety throughout the application
- **Server Components**: Optimized performance with Next.js 16
- **API Routes**: RESTful API endpoints for payments and orders
- **Error Handling**: Comprehensive error handling and user feedback
- **Caching**: Built-in caching for WooCommerce API responses
- **Security**: Input validation and secure payment processing

## 🛠️ Tech Stack

### Frontend
- **Next.js 16** - React framework with App Router
- **React 19** - UI library
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first CSS framework
- **React Icons** - Icon library

### Backend & APIs
- **WooCommerce REST API** - Product and order management
- **Stripe** - Payment processing
- **Upstash Redis** - Caching layer (optional)

### Development Tools
- **ESLint** - Code linting
- **PostCSS** - CSS processing
- **Babel** - JavaScript transpilation

## 📁 Project Structure

```
wp-next/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── api/               # API routes
│   │   │   ├── create-order/  # Order creation endpoint
│   │   │   ├── create-payment-intent/ # Stripe payment intent
│   │   │   └── webhooks/      # Webhook handlers
│   │   ├── (page).tsx         # Homepage
│   │   ├── about/             # About page
│   │   ├── cart/              # Shopping cart page
│   │   ├── checkout/          # Checkout process
│   │   ├── contact/           # Contact page
│   │   ├── shop/              # Product catalog
│   │   └── globals.css        # Global styles
│   ├── components/            # Reusable UI components
│   │   ├── Header.tsx         # Site navigation
│   │   ├── Footer.tsx         # Site footer
│   │   ├── ProductGrid.tsx    # Product display grid
│   │   ├── StripeCheckoutForm.tsx # Payment form
│   │   └── checkout/          # Checkout-specific components
│   ├── hooks/                 # Custom React hooks
│   │   ├── useWooProducts.ts  # Product fetching hook
│   │   ├── usePaymentIntent.ts # Payment processing hook
│   │   └── useOrderCreation.ts # Order creation hook
│   ├── lib/                   # Utility libraries
│   │   ├── cartContext.tsx    # Shopping cart state management
│   │   ├── stripe.ts          # Stripe configuration
│   │   ├── woocommerceAPI.ts  # WooCommerce API client
│   │   └── utils.ts           # Helper functions
│   ├── services/              # Business logic services
│   │   └── woocommerce.service.ts # WooCommerce service layer
│   └── types/                 # TypeScript type definitions
│       └── index.ts           # All type definitions
├── public/                    # Static assets
│   ├── manifest.json          # PWA manifest
│   ├── robots.txt             # Search engine crawling
│   └── sitemap.xml            # Site structure for SEO
├── docs/                      # Documentation
└── Configuration files
    ├── next.config.ts         # Next.js configuration
    ├── tailwind.config.ts     # Tailwind CSS configuration
    ├── tsconfig.json          # TypeScript configuration
    ├── package.json           # Dependencies and scripts
    └── eslint.config.mjs      # ESLint configuration
```

## 🔧 Installation & Setup

### Prerequisites
- Node.js 18+
- npm or yarn
- WordPress site with WooCommerce
- Stripe account

### 1. Clone the Repository
```bash
git clone <repository-url>
cd wp-next
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Configuration
Copy the example environment file and configure your credentials:

```bash
cp .env.example .env.local
```

Fill in the following environment variables:

```env
# WooCommerce API Configuration
NEXT_PUBLIC_WOOCOMMERCE_API_URL=https://your-wordpress-domain.com/wp-json/wc/v3
NEXT_PUBLIC_WOO_CUSTOMER_KEY=ck_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
NEXT_PUBLIC_WOO_CONSUMER_SECRET=cs_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

# Stripe Configuration
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
STRIPE_SECRET_KEY=sk_test_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

# Site Configuration
NEXT_PUBLIC_SITE_NAME=Azlan Garments
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### 4. WooCommerce Setup
1. Install WooCommerce on your WordPress site
2. Generate REST API keys in WooCommerce > Settings > Advanced > REST API
3. Ensure your products have images and proper pricing

### 5. Stripe Setup
1. Create a Stripe account at [stripe.com](https://stripe.com)
2. Get your publishable and secret keys from the dashboard
3. Configure webhooks for payment confirmations (optional)

### 6. Run the Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🚀 Deployment

### Build for Production
```bash
npm run build
npm start
```

### Environment Variables for Production
Ensure all environment variables are set in your production environment. For platforms like Vercel, Netlify, or Railway, add them in their respective dashboards.

### Recommended Hosting Platforms
- **Vercel** - Optimal for Next.js applications
- **Netlify** - Good alternative with form handling
- **Railway** - Full-stack deployment with databases

## 📊 API Integration Details

### WooCommerce Integration
- **Base URL**: Configurable via environment variables
- **Authentication**: Basic Auth with Consumer Key/Secret
- **Endpoints Used**:
  - `GET /products` - Fetch products
  - `GET /products/{id}` - Fetch single product
  - `GET /products/categories` - Fetch categories
  - `POST /orders` - Create orders
  - `GET /orders/{id}` - Fetch order details

### Stripe Integration
- **Payment Methods**: Card payments, automatic payment methods
- **Currency**: PKR (Pakistani Rupee)
- **Webhooks**: Configurable for payment status updates
- **Metadata**: Customer and order information stored with payments

## 🔒 Security Features

- **Input Validation**: All user inputs are validated
- **API Key Protection**: Sensitive keys stored server-side only
- **CORS Configuration**: Proper cross-origin resource sharing
- **Rate Limiting**: Configurable rate limiting for API endpoints
- **Secure Payments**: PCI-compliant payment processing via Stripe

## 🎨 Customization

### Styling
The application uses Tailwind CSS with custom CSS variables for theming. Key customization points:

- **Colors**: Defined in `tailwind.config.ts` and `globals.css`
- **Fonts**: Configurable via CSS custom properties
- **Layout**: Responsive grid system with mobile-first approach

### Components
All components are modular and reusable. Key components include:

- **ProductGrid**: Displays products in responsive grid
- **StripeCheckoutForm**: Handles payment processing
- **Header/Footer**: Site navigation and footer
- **HeroSection**: Landing page hero banners

## 🧪 Testing

### Manual Testing Checklist
- [ ] Product loading from WooCommerce
- [ ] Add to cart functionality
- [ ] Cart persistence across sessions
- [ ] Checkout process completion
- [ ] Payment processing with Stripe
- [ ] Order creation in WooCommerce
- [ ] Responsive design on mobile/desktop
- [ ] Form validation and error handling

### API Testing
Test the following endpoints:
- `/api/create-payment-intent` - Payment intent creation
- `/api/create-order` - Order creation
- `/api/webhooks/wordpress` - Webhook handling

## 🐛 Troubleshooting

### Common Issues

**Products not loading:**
- Check WooCommerce API credentials
- Verify API URL is accessible
- Check browser console for CORS errors

**Payment processing fails:**
- Verify Stripe keys are correct
- Check Stripe dashboard for error details
- Ensure proper webhook configuration

**Build errors:**
- Clear `.next` cache: `rm -rf .next`
- Reinstall dependencies: `rm -rf node_modules && npm install`
- Check TypeScript errors: `npm run lint`

### Debug Mode
Enable debug logging by setting:
```env
NODE_ENV=development
DEBUG=*
```

## 📈 Performance Optimization

### Current Optimizations
- **Server-Side Rendering**: Next.js App Router for optimal SEO
- **Image Optimization**: Next.js Image component with lazy loading
- **API Caching**: Built-in caching for WooCommerce responses
- **Code Splitting**: Automatic code splitting by Next.js
- **Bundle Analysis**: Analyze bundle size with `npm run build`

### Future Improvements
- Implement Redis caching for better performance
- Add service worker for offline functionality
- Implement pagination for large product catalogs
- Add image optimization and CDN integration

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-feature`
3. Commit changes: `git commit -am 'Add new feature'`
4. Push to branch: `git push origin feature/new-feature`
5. Submit a pull request

### Code Style
- Use TypeScript for all new code
- Follow ESLint configuration
- Use descriptive commit messages
- Add JSDoc comments for complex functions

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 📞 Support

For support and questions:
- Create an issue on GitHub
- Check the troubleshooting section above
- Review WooCommerce and Stripe documentation

## 🔄 Version History

### v0.1.0
- Initial release
- Basic e-commerce functionality
- WooCommerce and Stripe integration
- Responsive design implementation
- TypeScript implementation

---

**Built with ❤️ for Azlan Garments**