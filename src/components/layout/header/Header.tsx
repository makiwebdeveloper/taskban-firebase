import { FC } from "react";
import styles from "./Header.module.scss";
import { BiUserCircle } from "react-icons/bi";
import { useAuth } from "../../../contexts/AuthContext";

const Header: FC = () => {
  const { currentUser } = useAuth();

  return (
    <div className={styles.header}>
      <div className="flex items-center gap-2">
        {currentUser?.displayName} <BiUserCircle className={styles.userIcon} />
      </div>
    </div>
  );
};

export default Header;
