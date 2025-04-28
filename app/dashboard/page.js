"use client"
import CounterUp from '@/components/elements/CounterUp'
import LayoutAdmin from "@/components/layout/LayoutAdmin"
import dynamic from 'next/dynamic'
import { useState } from 'react';
const Chart1 = dynamic(() => import('@/components/chart/Chart1'), {
    ssr: false,
})
export default function Dashboard() {
  const [isSidebarExpanded, setSidebarExpanded] = useState(true);

  const toggleSidebar = () => {
    setSidebarExpanded(!isSidebarExpanded);
  };

    return (
        <>

            <LayoutAdmin headerStyle={1} footerStyle={1}>
            <div className="main bg-light w-100">
        <button
          className="btn btn-primary m-3 toggle"
          onClick={toggleSidebar}
        >
          {isSidebarExpanded ? "Collapse" : "Expand"}
        </button>
        <div className="content p-3">
          <h1>Welcome to the Dashboard</h1>
          <p>This is the main content area.</p>
        </div>
      </div>
            </LayoutAdmin>
        </>
    )
}