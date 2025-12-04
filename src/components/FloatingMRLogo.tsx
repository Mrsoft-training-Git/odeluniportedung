import mrLogo from "@/assets/mr-logo.png";

const FloatingMRLogo = () => {
  return (
    <a
      href="https://www.m-rinternational.com/"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-4 right-4 z-50 transition-all duration-300 hover:scale-110"
      title="MR International"
    >
      <img
        src={mrLogo}
        alt="MR International"
        className="h-5 w-auto object-contain"
      />
    </a>
  );
};

export default FloatingMRLogo;
