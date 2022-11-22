import ChakraNextImage from "./ChakraNextImage";
import logo from "/public/imgs/logo-instituto-aurora.png";

type TranslationType = (param: string) => string;

type LogoType = {
  t: TranslationType;
  w: string | Record<string, string | number>
}

const Logo = ({ t, w }: LogoType) => {
  return (
    <ChakraNextImage
      w={w}
      minW={"80px"}
      src={logo}
      alt={t("title")}
    />
  );
};

export default Logo;
