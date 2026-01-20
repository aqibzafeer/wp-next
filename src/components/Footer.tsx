import { footerData } from '@/lib/allData';

export default function Footer() {
  return (
    <footer className="bg-text text-background py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="text-background font-semibold mb-4">{footerData.about.title}</h3>
            <p className="text-sm">{footerData.about.description}</p>
          </div>

          <div>
            <h3 className="text-background font-semibold mb-4">{footerData.quickLinks.title}</h3>
            <ul className="text-sm space-y-2">
              {footerData.quickLinks.links.map((link) => (
                <li key={link.name}>
                  <a href={link.href} className="hover:text-primary">{link.name}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-background font-semibold mb-4">{footerData.categories.title}</h3>
            <ul className="text-sm space-y-2">
              {footerData.categories.links.map((link) => (
                <li key={link.name}>
                  <a href={link.href} className="hover:text-primary">{link.name}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-background font-semibold mb-4">{footerData.contact.title}</h3>
            <p className="text-sm">Email: {footerData.contact.email}</p>
            <p className="text-sm">Phone: {footerData.contact.phone}</p>
          </div>
        </div>

        <div className="border-t border-border pt-8 text-center text-sm">
          <p>{footerData.copyright}</p>
        </div>
      </div>
    </footer>
  );
}
