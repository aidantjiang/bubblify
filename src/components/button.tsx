import Link from "next/link";
import styles from "./button.module.css";

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
    <p className={styles.noStyling}>{text}</p>
  );

  return (
    <div className="retro-bold">
      <div className={styles.main}>{content}</div>
    </div>
  );
};

export default RetroButton;
