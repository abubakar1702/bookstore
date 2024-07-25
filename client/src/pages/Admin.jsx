import { useState } from "react";
import { HiMenu } from "react-icons/hi";
import AddBookForm from "./AddBookForm";
import AuthorForm from "./AuthorForm";
import AddGenreForm from "./AddGenreForm";
import EditBook from "./EditBook";

const Admin = () => {
    const [navOpen, setNavOpen] = useState(false);
    const [selectedNavItem, setSelectedNavItem] = useState("addBook");

    const handleNavToggle = () => {
        setNavOpen(!navOpen);
    };

    const handleNavItemSelect = (item) => {
        setSelectedNavItem(item);
        setNavOpen(false);
    };

    return (
        <div>
            <HiMenu
                onClick={handleNavToggle}
                className="text-4xl ml-4 md:hidden cursor-pointer"
            />
            {navOpen && (
                <nav className="bg-blue-500">
                    <ul className="flex justify-center items-center space-x-6 p-2">
                        <li
                            className={`text-md text-white cursor-pointer ${
                                selectedNavItem === "addBook" ? "underline" : ""
                            }`}
                            onClick={() => handleNavItemSelect("addBook")}
                        >
                            Add Book
                        </li>
                        <li
                            className={`text-md text-white cursor-pointer ${
                                selectedNavItem === "addAuthor" ? "underline" : ""
                            }`}
                            onClick={() => handleNavItemSelect("addAuthor")}
                        >
                            Add Author
                        </li>
                        <li
                            className={`text-md text-white cursor-pointer ${
                                selectedNavItem === "addGenre" ? "underline" : ""
                            }`}
                            onClick={() => handleNavItemSelect("addGenre")}
                        >
                            Add Genre
                        </li>
                        <li
                            className={`text-md text-white cursor-pointer ${
                                selectedNavItem === "edit" ? "underline" : ""
                            }`}
                            onClick={() => handleNavItemSelect("edit")}
                        >
                            Add Genre
                        </li>
                    </ul>
                </nav>
            )}
            <nav className="bg-blue-500 hidden md:block">
                <ul className="flex justify-center items-center space-x-4 p-2">
                    <li
                        className={`text-lg text-white cursor-pointer ${
                            selectedNavItem === "addBook" ? "underline" : ""
                        }`}
                        onClick={() => handleNavItemSelect("addBook")}
                    >
                        Add Book
                    </li>
                    <li
                        className={`text-lg text-white cursor-pointer ${
                            selectedNavItem === "addAuthor" ? "underline" : ""
                        }`}
                        onClick={() => handleNavItemSelect("addAuthor")}
                    >
                        Add Author
                    </li>
                    <li
                        className={`text-lg text-white cursor-pointer ${
                            selectedNavItem === "addGenre" ? "underline" : ""
                        }`}
                        onClick={() => handleNavItemSelect("addGenre")}
                    >
                        Add Genre
                    </li>
                    <li
                        className={`text-lg text-white cursor-pointer ${
                            selectedNavItem === "edit" ? "underline" : ""
                        }`}
                        onClick={() => handleNavItemSelect("edit")}
                    >
                        Edit
                    </li>
                </ul>
            </nav>
            {selectedNavItem === "addBook" && <AddBookForm />}
            {selectedNavItem === "addAuthor" && <AuthorForm />}
            {selectedNavItem === "addGenre" && <AddGenreForm />}
            {selectedNavItem === "edit" && <EditBook />}
        </div>
    );
};

export default Admin;
