import React from 'react';
import { Link } from 'react-router-dom';

// Social Icons - Updated Instagram path for better visibility
const InstagramIcon = () => (
  <svg
    className="w-5 h-5"
    fill="currentColor"
    viewBox="0 0 24 24"
    aria-hidden="true"
  >
    <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
  </svg>
);

const FacebookIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
  </svg>
);

const YouTubeIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
  </svg>
);

function Footer() {
  const currentYear = new Date().getFullYear();

  const footerSections = [
    {
      title: "Support",
      links: [
        { text: "Collection", url: "/products" },
        { text: "Contact", url: "/contact" }
      ]
    },
    {
      title: "Follow Us",
      isSocial: true,
      links: [
        {
          name: "Instagram",
          url: "https://www.instagram.com/creationempirebypriya",
          icon: <InstagramIcon />,
          handle: "@creationempirebypriya"
        },
        {
          name: "Facebook",
          url: "https://www.facebook.com/creationempire",
          icon: <FacebookIcon />,
          handle: "/creationempire"
        },
        {
          name: "YouTube",
          url: "https://youtube.com/@creationempire",
          icon: <YouTubeIcon />,
          handle: "Creation Empire TV"
        }
      ]
    }
  ];

  return (
    <footer className="bg-neutral-50 border-t border-gray-200/60 mt-24">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">

          {/* Brand */}
          <div className="lg:col-span-1 space-y-6 text-center lg:text-left">
            <Link to="/" className="inline-block">
              <h2 className="text-2xl tracking-[0.2em] font-light text-gray-900">
                CREATION EMPIRE
              </h2>
              <p className="text-xs tracking-widest mt-1 text-amber-600">
                BY PRIYA
              </p>
            </Link>
            <p className="text-sm text-gray-600 max-w-md mx-auto lg:mx-0">
              Where every stitch tells a story. Luxury fashion crafted for the modern woman who embraces her power with grace.
            </p>
            <div className="space-y-2 text-sm text-gray-600">
              <p>info@creationempire.com</p>
              <p>+91 79064 82210</p>
            </div>
          </div>

          {/* Dynamic Sections */}
          {footerSections.map((section) => (
            <div key={section.title} className="text-center lg:text-left">
              <h3 className="text-sm uppercase tracking-wider text-gray-900 font-medium mb-4">
                {section.title}
              </h3>

              {section.isSocial ? (
                <ul className="space-y-4">
                  {section.links.map((social, i) => (
                    <li key={i}>
                      <a
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center lg:justify-start gap-3 text-sm text-gray-700 hover:text-gray-900 transition-colors"
                      >
                        {/* THE ICON RENDERS HERE */}
                        <span className="flex-shrink-0">
                          {social.icon}
                        </span>
                        <div className="flex flex-col items-start">
                          <span className="font-medium leading-none">{social.name}</span>
                          <span className="text-[10px] text-gray-400 mt-1">{social.handle}</span>
                        </div>
                      </a>
                    </li>
                  ))}
                </ul>
              ) : (
                <ul className="space-y-3">
                  {section.links.map((link, i) => (
                    <li key={i}>
                      <Link
                        to={link.url}
                        className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
                      >
                        {link.text}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="mt-16 pt-8 border-t border-gray-200/60 flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
          <p className="text-xs text-gray-400">
            © {currentYear} Creation Empire by Priya. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;