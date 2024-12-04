import React, { useState, useEffect } from "react";
import { MdChevronLeft } from "react-icons/md";
import { MdOutlineDashboard } from "react-icons/md";
import { TbListDetails, TbSubtask } from "react-icons/tb";
import { SiTicktick } from "react-icons/si";
import { NavLink } from "react-router-dom";
import { RiCalendarTodoLine } from "react-icons/ri";

const Sidebar = () => {
    const menus = [
        { name: "Dashboard", link: "/", icon: MdOutlineDashboard },
        { name: "Task", link: "/task", icon: TbListDetails },
        { name: "Completed", link: "/completed", icon: SiTicktick },
        { name: "Todo", link: "/todo", icon: RiCalendarTodoLine },
    ];

    const [open, setOpen] = useState(true);
    const [isSmallScreen, setIsSmallScreen] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            const isSmall = window.innerWidth < 640;
            setIsSmallScreen(isSmall);
            if (isSmall) {
                setOpen(false); 
            }
        };

        handleResize(); 
        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return (
        <section className="flex gap-6">
            <div
                className={`bg-primaryColor border-r border-gray-500 min-h-screen sticky top-0 ${
                    open ? "w-64" : "w-16"
                } duration-500 text-textColor px-4 z-50`}
            >
                {/* Toggle Button (hidden for small screens) */}
                {!isSmallScreen && (
                    <div className={`py-3 flex justify-end ${!open && "rotate-180"}`}>
                        <MdChevronLeft
                            size={26}
                            className="cursor-pointer"
                            onClick={() => setOpen(!open)}
                        />
                    </div>
                )}

                {/* Top Task Management Section */}
                <div
                    className={`flex items-center gap-3 text-lg font-bold bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent p-2 mb-6 ${
                        open ? "justify-start" : "justify-center"
                    }`}
                >
                    {/* Icon with dynamic size */}
                    <TbSubtask
                        className="text-blue-500 flex-shrink-0"
                        style={{
                            fontSize: open ? "4rem" : "2.5rem", // 60px when open, 40px when closed
                        }}
                    />
                    {/* Task label shown only when open */}
                    {open && <span className="uppercase">Tasks</span>}
                </div>

                {/* Navigation Links */}
                <div className="flex flex-col gap-4 relative">
                    {menus?.map((menu, i) => (
                        <NavLink
                            to={menu?.link}
                            key={i}
                            className={({ isActive }) =>
                                `group flex items-center text-sm gap-3.5 font-medium p-2 rounded-md ${
                                    isActive
                                        ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white"
                                        : "hover:bg-gray-800 text-gray-300"
                                }`
                            }
                        >
                            <div>{React.createElement(menu?.icon, { size: "20" })}</div>
                            <h2
                                className={`whitespace-pre duration-500 ${
                                    !open && "opacity-0 translate-x-28 overflow-hidden"
                                }`}
                            >
                                {menu?.name}
                            </h2>
                            <h2
                                className={`${
                                    open && "hidden"
                                } absolute left-48 bg-white font-semibold whitespace-pre text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit z-40`}
                            >
                                {menu?.name}
                            </h2>
                        </NavLink>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Sidebar;
