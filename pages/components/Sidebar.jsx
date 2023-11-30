import { useState } from "react";
import Link from "next/link";

const Sidebar = () => {
  const [activeMainMenu, setActiveMainMenu] = useState("Dashboard");
  const [activeSubMenu, setActiveSubMenu] = useState(null);

  const handleMainMenuClick = (menuTitle) => {
    setActiveMainMenu(menuTitle);
    setActiveSubMenu(null); // Clear active sub-menu when a main menu item is clicked
  };

  const handleSubMenuClick = (menuTitle) => {
    setActiveSubMenu(menuTitle);
  };

  return (
    <div>
      <div className="sidebar px-4 py-4 py-md-4 me-0">
        <div className="d-flex flex-column h-100">
          <Link href="/dashboard" passHref className="mb-0 brand-icon">
            <img
              src="http://mines-manager.com/cpanel/images/logo_white.png"
              alt="Logo"
              width={50}
            />
            <span className="logo-text">Mines Manager</span>
          </Link>
          <ul className="menu-list flex-grow-1 mt-3">
            <li>
              <Link
                href="/dashboard"
                passHref
                className={`m-link ${
                  activeMainMenu === "Dashboard" ? "active" : ""
                }`}
                onClick={() => handleMainMenuClick("Dashboard")}
                title="Dashboard"
              >
                <i className="icofont-home fs-5" />
                <span>Dashboard</span>
              </Link>
            </li>
            <li className="collapsed">
              <Link
                href="#"
                passHref
                className={`m-link ${
                  activeMainMenu === "Authorization" ? "active" : ""
                }`}
                onClick={() => handleMainMenuClick("Authorization")}
                data-bs-toggle="collapse"
                data-bs-target="#authorization"
                title="Authorization"
              >
                <i className="icofont-ui-lock" />
                <span>Authorization</span>
                <span className="arrow icofont-dotted-down ms-auto text-end fs-5" />
              </Link>
              <ul
                className={`sub-menu collapse ${
                  activeMainMenu === "Authorization" ? "show" : ""
                }`}
                id="authorization"
              >
                <li>
                  <Link
                    href="/users"
                    passHref
                    className={`ms-link ${
                      activeSubMenu === "Users" ? "active" : ""
                    }`}
                    onClick={() => handleSubMenuClick("Users")}
                    title="Users"
                  >
                    <span>Users</span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/roles"
                    passHref
                    className={`ms-link ${
                      activeSubMenu === "Roles" ? "active" : ""
                    }`}
                    onClick={() => handleSubMenuClick("Roles")}
                    title="Roles"
                  >
                    <span>Roles</span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/permissions"
                    passHref
                    className={`ms-link ${
                      activeSubMenu === "Permissions" ? "active" : ""
                    }`}
                    onClick={() => handleSubMenuClick("Permissions")}
                    title="Permissions"
                  >
                    <span>Permissions</span>
                  </Link>
                </li>
                {/* Add similar logic for other sub-menu items */}
              </ul>
            </li>
            <li>
              <Link
                passHref
                className={`m-link ${
                  activeMainMenu === "Main Menu" ? "active" : ""
                }`}
                href="/mainmenu"
                onClick={() => handleMainMenuClick("Main Menu")}
                title="Main Menu"
              >
                <i className="icofont-card fs-5" />
                <span>Main Menu</span>
              </Link>
            </li>
            <li className="collapsed">
              <Link
                href="#"
                passHref
                className={`m-link ${
                  activeMainMenu === "Master Data" ? "active" : ""
                }`}
                onClick={() => handleMainMenuClick("Master Data")}
                data-bs-toggle="collapse"
                data-bs-target="#masterdata"
                title="Master Data"
              >
                <i className="icofont-database" />
                <span>Master Data</span>
                <span className="arrow icofont-dotted-down ms-auto text-end fs-5" />
              </Link>
              {/* Menu: Sub menu ul */}
              <ul
                className={`sub-menu collapse ${
                  activeMainMenu === "Master Data" ? "show" : ""
                }`}
                id="master_data"
                style={{}}
              >
                <li>
                  <Link
                    href="/database"
                    passHref
                    className={`ms-link ${
                      activeSubMenu === "Database" ? "active" : ""
                    }`}
                    onClick={() => handleSubMenuClick("Database")}
                    title="Database"
                  >
                    <span>Database</span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/individual"
                    passHref
                    className={`ms-link ${
                      activeSubMenu === "Individual" ? "active" : ""
                    }`}
                    onClick={() => handleSubMenuClick("Individual")}
                    title="Individual"
                  >
                    <span>Individual</span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/entity"
                    passHref
                    className={`ms-link ${
                      activeSubMenu === "Entity" ? "active" : ""
                    }`}
                    onClick={() => handleSubMenuClick("Entity")}
                    title="Entity"
                  >
                    <span>Entity</span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/usertype"
                    passHref
                    className={`ms-link ${
                      activeSubMenu === "User Type" ? "active" : ""
                    }`}
                    onClick={() => handleSubMenuClick("User Type")}
                    title="User Type"
                  >
                    <span>User Type</span>
                  </Link>
                </li>
              </ul>
            </li>
            <li>
              <Link
                 href="#"
                 passHref
                 className={`m-link ${
                   activeMainMenu === "Master Data" ? "active" : ""
                 }`}
                 onClick={() => handleMainMenuClick("Clear Catch")}
                 data-bs-toggle="collapse"
                 data-bs-target="#clearcatch"
                 title="Clear Catch"
              >
                <i className="icofont-cc fs-5" />
                <span>Clear Cache</span>
              </Link>
            </li>

            {/* Rest of your menu items */}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
