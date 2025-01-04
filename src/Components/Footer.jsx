

// Define the Item component to display footer links
const Item = ({ Links, title }) => {
  return (
    <ul>
      <h1 className="mb-1 font-semibold">{title}</h1>
      {Links.map((link) => (
        <li key={link.name}>
          <a
            className="text-sm leading-6 text-gray-400 duration-300 cursor-pointer hover:text-green-400"
            href={link.link}
          >
            {link.name}
          </a>
        </li>
      ))}
    </ul>
  );
};

// Define the ItemsContainer component to display multiple Item components
const ItemsContainer = () => {
  return (
    <div className="grid grid-cols-1 gap-5 px-5 py-16 ml-20 text-left sm:grid-cols-3 lg:grid-cols-5 sm:px-8">
      <h1 className="py-8 ml-0 text-3xl font-extrabold text-green-600">LOGO</h1>
      <Item Links={PRODUCTS} title="PRODUCTS" />
      <Item Links={RESOURCES} title="RESOURCES" />
      <Item Links={COMPANY} title="COMPANY" />
      <Item Links={SUPPORT} title="SUPPORT" />
    </div>
  );
};

// Define the SocialIcons component to display social media icons
const SocialIcons = ({ Icons }) => {
  return (
    <div className="text-green-500">
      {Icons.map((icon) => (
        <span
          key={icon.name}
          className="p-2 cursor-pointer inline-flex items-center rounded-full bg-gray-700 mx-1.5 text-xl hover:text-gray-100 hover:bg-green-500 duration-300"
        >
          <ion-icon name={icon.name}></ion-icon>
        </span>
      ))}
    </div>
  );
};

// Define the data for the footer links and social icons
export const PRODUCTS = [
  { name: "Features", link: "#" },
  { name: "Pricing", link: "#" },
];
export const RESOURCES = [
  { name: "Industries and tools", link: "#" },
  { name: "Use cases", link: "#" },
  { name: "Blog", link: "#" },
];
export const COMPANY = [
  { name: "About us", link: "#" },
  { name: "Careers", link: "#" },
  { name: "Customer Stories", link: "#" },
];
export const SUPPORT = [
  { name: "Documentation", link: "#" },
  { name: "Tutorials & guides", link: "#" },
  { name: "Webinars", link: "#" },
  { name: "Open-source", link: "#" },
];

export const Icons = [
  { name: "logo-facebook", link: "#" },
  { name: "logo-twitter", link: "#" },
  { name: "logo-github", link: "#" },
  { name: "logo-linkedin", link: "#" },
  { name: "logo-instagram", link: "#" },
];

// Define the Footer component
const Footer = () => {
  return (
    <footer className="mt-20 text-white bg-gray-900">
      <div className="md:flex md:justify-between md:items-center sm:px-12 px-4 bg-[#ffffff19] py-7">
        <h1 className="mb-6 text-3xl font-semibold lg:text-4xl md:mb-0 lg:leading-normal md:w-2/5">
          <span className="text-green-500">Join</span> Our News Letter..
        </h1>
        <div className="px-40">
          <input
            type="text"
            placeholder="                Enter Your email"
            className="text-gray-800 sm:w-72 w-full sm:mr-5 mr-1 lg:mb-0 mb-4 py-2.5 rounded-full px-2 focus:outline-none"
          />
          <button
            className="bg-green-800 font-semibold hover:bg-green-500 duration-300 px-5 py-2.5 font-[Poppins] rounded-full text-white md:w-auto w-full"
          >
            Submit
          </button>
        </div>
      </div>
      <ItemsContainer />
      <div
        className="grid grid-cols-1 gap-3 pt-2 pb-8 text-sm text-center text-gray-400 sm:grid-cols-2 lg:grid-cols-3"
      >
        <span>© 2024 Appy. All rights reserved.</span>
        <span>Terms · Privacy Policy</span>
        <SocialIcons Icons={Icons} />
      </div>
    </footer>
  );
};

export default Footer;
