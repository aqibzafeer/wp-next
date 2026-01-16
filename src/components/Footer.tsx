export default function Footer() {
  return (
    <footer className="bg-text text-background py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="text-background font-semibold mb-4">About Us</h3>
            <p className="text-sm">Premium clothing and fashion store with quality products.</p>
          </div>
          <div>
            <h3 className="text-background font-semibold mb-4">Quick Links</h3>
            <ul className="text-sm space-y-2">
              <li><a href="/" className="hover:text-primary">Home</a></li>
              <li><a href="/products" className="hover:text-primary">Products</a></li>
              <li><a href="/about" className="hover:text-primary">About</a></li>
              <li><a href="/contact" className="hover:text-primary">Contact</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-background font-semibold mb-4">Categories</h3>
            <ul className="text-sm space-y-2">
              <li><a href="/products?category=Jeans" className="hover:text-primary">Jeans</a></li>
              <li><a href="/products?category=Shirt" className="hover:text-primary">Shirts</a></li>
              <li><a href="/products?category=Jacket" className="hover:text-primary">Jackets</a></li>
              <li><a href="/products?category=Shoes" className="hover:text-primary">Shoes</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-background font-semibold mb-4">Contact</h3>
            <p className="text-sm">Email: info@store.com</p>
            <p className="text-sm">Phone: +1-800-000-0000</p>
          </div>
        </div>
        <div className="border-t border-border pt-8 text-center text-sm">
          <p>&copy; 2026 Store. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
