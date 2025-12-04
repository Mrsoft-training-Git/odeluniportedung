import mrLogo from "@/assets/mr-logo.png";

const FloatingMRLogo = () => {
  return (
    <a
      href="https://www.m-rinternational.com/"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 bg-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 p-2 border border-border/20"
      title="MR International"
    >
      <img
        src={mrLogo}
        alt="MR International"
        className="h-8 w-auto object-contain"
      />
    </a>
  );
};

export default FloatingMRLogo;
