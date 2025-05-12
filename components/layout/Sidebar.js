import { usePathname } from "next/navigation"
import React, { useState } from "react";
import '../../public/assets/css/dashStyle.css'; 

export default function Sidebar() {
    const pathname = usePathname() 
  const [isSidebarExpanded, setSidebarExpanded] = useState(true);

  const toggleSidebar = () => {
    setSidebarExpanded(!isSidebarExpanded);
  };

    return (
        <>
    <div  className="sidebarAdmin">
         <div className={`d-flex ${isSidebarExpanded ? "expanded" : "collapsed"}`}>
      {/* Sidebar */}
      <Nav
        className={`bg-primary flex-column navigation ${
          isSidebarExpanded ? "active" : ""
        }`}
      >
        <Nav.Item className="mb-4 text-center">
          <Nav.Link href="#" className="text-white">
            <IonIcon icon={logoApple} className="me-2" />
            {isSidebarExpanded && <span>Brand Name</span>}
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link href="#" className="text-white">
            <IonIcon icon={homeOutline} className="me-2" />
            {isSidebarExpanded && <span>Dashboard</span>}
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link href="#" className="text-white">
            <IonIcon icon={peopleOutline} className="me-2" />
            {isSidebarExpanded && <span>Customers</span>}
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link href="#" className="text-white">
            <IonIcon icon={chatbubbleOutline} className="me-2" />
            {isSidebarExpanded && <span>Messages</span>}
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link href="#" className="text-white">
            <IonIcon icon={helpOutline} className="me-2" />
            {isSidebarExpanded && <span>Help</span>}
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link href="#" className="text-white">
            <IonIcon icon={settingsOutline} className="me-2" />
            {isSidebarExpanded && <span>Settings</span>}
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link href="#" className="text-white">
            <IonIcon icon={lockClosedOutline} className="me-2" />
            {isSidebarExpanded && <span>Password</span>}
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link href="#" className="text-white">
            <IonIcon icon={logOutOutline} className="me-2" />
            {isSidebarExpanded && <span>Sign Out</span>}
          </Nav.Link>
        </Nav.Item>
      </Nav>

      

    </div>
    </div>
        </>
    )
}
