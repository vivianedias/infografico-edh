import ChakraNextImage from "../ChakraNextImage";
import logo from "/public/imgs/logo-instituto-aurora.png";

type TranslationType = (param: string) => string;

const Logo = ({ t }: { t: TranslationType }) => {
  return <ChakraNextImage w={168} src={logo} alt={t("title")} />;
};

export default Logo;