import ChakraNextImage from "../ChakraNextImage";
import logo from "/public/imgs/logo-instituto-aurora.png";

type TranslationType = (param: string) => string;

const Logo = ({ t }: { t: TranslationType }) => {
  return (
    <ChakraNextImage
      w={{ base: "300px", md: 168 }}
      minW={"80px"}
      src={logo}
      alt={t("title")}
    />
  );
};

export default Logo;
