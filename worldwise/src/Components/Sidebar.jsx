import AppNav from "./AppNav";
import Logo from "./Logo";
import styles from "./Sidebar.module.css";
import { Outlet } from "react-router-dom";

function Sidebar() {
    return (
        <div className={styles.sidebar }>
            <Logo />
            <AppNav />

            <Outlet />

            <footer className={styles.footer}></footer>
            <p className={styles.copyright}>&copy; Copyright { new Date().getFullYear()} by Worldwise Inc</p>
        </div>
    )
}

export default Sidebar
