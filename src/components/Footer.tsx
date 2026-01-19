export default function Footer() {
  return (
    <footer className="bg-text text-background py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
<div>
  <h3 className="text-background font-semibold mb-4">About Us</h3>
  <p className="text-sm">
    Azlan Garments is a premium fashion store dedicated to delivering high-quality garments that combine style, comfort, and durability. We believe fashion is more than just clothing—it’s a way to express confidence, individuality, and modern lifestyle.
  </p>
</div>

          <div>
            <h3 className="text-background font-semibold mb-4">Quick Links</h3>
            <ul className="text-sm space-y-2">
              <li><a href="/" className="hover:text-primary">Home</a></li>
              <li><a href="/shop" className="hover:text-primary">Products</a></li>
              <li><a href="/about" className="hover:text-primary">About</a></li>
              <li><a href="/contact" className="hover:text-primary">Contact</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-background font-semibold mb-4">Categories</h3>
            <ul className="text-sm space-y-2">
              <li><a href="/shop" className="hover:text-primary">Jeans</a></li>
              <li><a href="/shop" className="hover:text-primary">Shirts</a></li>
              <li><a href="/shop" className="hover:text-primary">Jackets</a></li>
              <li><a href="/shop" className="hover:text-primary">Shoes</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-background font-semibold mb-4">Contact</h3>
            <p className="text-sm">Email: aqib@azlangarments.live</p>
            <p className="text-sm">Phone: +92 302 508 9439</p>
          </div>
        </div>
        <div className="border-t border-border pt-8 text-center text-sm">
          <p>&copy; 2026 Azlan Garments. All rights reserved. (Developed by: Aqib Zafeer)</p>
        </div>
      </div>
    </footer>
  );
}
