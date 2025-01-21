import FooterLink from "./FooterLink";
import LOGO from "@images/5th_avenue_logo.png";

function Footer() {
    return (
        <footer className="m-5">
            <div className="mt-5 grid sm:grid-cols-2 md:grid-cols-5 gap-5 border-b-4 border-orange pb-3">
                <h1 className="text-white col-span-2 text-3xl hover:text-orange">
                    <a href="#">5th Avenue Grill and Restobar</a>
                </h1>
                <div className="text-white">
                    <h3 className="text-orange text-2xl font-semibold">Us</h3>
                    <ul className="text-white">
                        <FooterLink to="#">Home</FooterLink>
                        <FooterLink to="#">Menu</FooterLink>
                        <FooterLink to="#">Register</FooterLink>
                        <FooterLink to="#">Login</FooterLink>
                        <FooterLink to="#">Reservation</FooterLink>
                    </ul>
                </div>
                <div className="text-white">
                    <h3 className="text-orange text-2xl font-semibold">
                        Follow Us
                    </h3>
                    <ul>
                        <FooterLink to="#">Facebook</FooterLink>
                    </ul>
                </div>
                <div className="text-white">
                    <h3 className="text-orange text-2xl font-semibold">
                        Legal
                    </h3>
                    <ul>
                        <FooterLink to="#">Privacy Policy</FooterLink>
                        <FooterLink to="#">Terms & Condition</FooterLink>
                    </ul>
                </div>
            </div>
            <div className="mt-2 flex flex-col gap-1 justify-start md:flex-row md:justify-between">
                <p className="text-white">
                    © 2024{" "}
                    <a href="#" className="text-orange hover:underline">
                        5th Avenue Grill and Restobar
                    </a>
                    . All Rights Reserved.
                </p>
                <ul className="text-white">
                    <li>
                        <a
                            href="#"
                            className="text-white text-lg hover:text-orange"
                        >
                            <i className="fa-brands fa-facebook"></i>
                        </a>
                    </li>
                </ul>
            </div>
        </footer>
    );
}

export default Footer;
