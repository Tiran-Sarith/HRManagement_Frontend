import React from "react";

// Footer link section component
const Item = ({ Links, title }) => {
  return (
    <div>
      <h2 className="mb-3 text-md font-semibold text-white-500">{title}</h2>
      <ul>
        {Links.map((link) => (
          <li key={link.name}>
            <a
              className="block mb-2 text-sm text-gray-400 hover:text-green-400 transition-colors duration-300"
              href={link.link}
            >
              {link.name}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

// Container for all footer items
const ItemsContainer = () => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8 px-6 py-12">
      {/* Logo */}
      <div className="col-span-2 sm:col-span-1">
        <a
          href="/home"
          className="text-3xl font-extrabold text-green-700 font-rubikDirt"
        >
          INTELLISENSE
        </a>
      </div>

      <Item Links={SOCIAL} title="SOCIAL" />
      <Item Links={COMPANY} title="COMPANY" />
      <Item Links={SUPPORT} title="SUPPORT" />
    </div>
  );
};

// Social media icons
const SocialIcons = ({ Icons }) => {
  return (
    <div className="text-green-500">
      {Icons.map((icon) => (
        <a
          key={icon.name}
          href={icon.link}
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 cursor-pointer inline-flex items-center rounded-full bg-gray-700 mx-1.5 text-xl hover:text-gray-100 hover:bg-green-500 duration-300"
        >
          <ion-icon name={icon.name}></ion-icon>
        </a>
      ))}
    </div>
  );
};

// Footer content data

export const SOCIAL = [
  { name: "Facebook", link: "https://www.facebook.com/" },
  { name: "Twitter", link: "https://twitter.com/" },
  { name: "Github", link: "https://github.com/" },
  { name: "Linkedin", link: "https://www.linkedin.com/" },
  { name: "Instagram", link: "https://www.instagram.com/" },
];
export const COMPANY = [
  { name: "Home", link: "/home" },
  { name: "About us", link: "/aboutus" },
  { name: "Services", link: "/services" },
  { name: "Careers", link: "/career" },
  { name: "HR Login", link: "/hrlogin" },
];
export const SUPPORT = [
  { name: "Contact us", link: "/contact" },
  { name: "Talk to us", link: "/support" },

];

export const Icons = [
  { name: "logo-facebook", link: "https://www.facebook.com/" },
  { name: "logo-twitter", link: "https://twitter.com/" },
  { name: "logo-github", link: "https://github.com/" },
  { name: "logo-linkedin", link: "https://www.linkedin.com/" },
  { name: "logo-instagram", link: "https://www.instagram.com/" },
];

// Main Footer
const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <ItemsContainer />
      <div className="border-t border-gray-800 pt-6 pb-4 px-6 text-center text-sm text-gray-400">
        <div className="flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y-0">
          <span>© 2024 INTELLISENSE. All rights reserved.</span>
          <span>
            <a href="#" className="hover:text-green-400">Terms</a> ·{" "}
            <a href="#" className="hover:text-green-400">Privacy Policy</a>
          </span>
          <SocialIcons Icons={Icons} />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
