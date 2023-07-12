import styles from "./popup.module.css";
import Image from "next/image";

interface IProps {
  modalText: string[];
  //THIS SHOULD BE THE SETSSTATE THAT REVEALS THE MODAL
  //SEE BUTTON.TSX FOR REFERENCE
  change: () => void;
}

const PopUp = ({ modalText, change }: IProps) => {
  const modalHeader: string = modalText[0];
  const modalBody = [];
  for (let i = 1; i < modalText.length; i++) {
    modalBody.push(modalText[i]);
  }

  return (
    <div className={`${styles.blackMagic}`}>
      <div className={`${styles.flex}`}>
        <div className={`${styles.main}`}>
          <div className={`${styles.header} retro-bold`}>{modalHeader}</div>
          <div className={`${styles.body} ${styles.flex} retro-normal`}>
            {modalBody.map((text) => {
              return <div>{text}</div>;
            })}
          </div>
          <div
            className={`${styles.close}`}
            onClick={() => {
              change();
            }}
          >
            <Image
              src={"/../public/close.png"}
              alt={"close button"}
              width={20}
              height={20}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PopUp;
