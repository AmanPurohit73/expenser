const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 py-4">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <p className="text-white text-lg font-medium">
          © {currentYear} Expense Manager. Made with ❤️ for better financial
          management.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
