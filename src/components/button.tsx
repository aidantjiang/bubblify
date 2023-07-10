import Link from "next/link";

interface IProps {
  text: string;
  link?: boolean;
  url?: string;
}

const RetroButton = ({ text, link = false, url = "" }: IProps) => {
  const content = link ? (
    <Link style={{ textDecoration: "none" }} href={url}>
      {text}
    </Link>
  ) : (
    <p>{text}</p>
  );

  return <div className="retro-bold">{content}</div>;
};

export default RetroButton;
