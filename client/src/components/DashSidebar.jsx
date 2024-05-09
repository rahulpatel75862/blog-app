import { Sidebar } from "flowbite-react";
import { HiArrowSmRight, HiUser } from "react-icons/hi";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {  signOutSucces } from "../redux/user/userSlice";
import { toast } from "react-toastify";
import {  useDispatch } from "react-redux";

const DashSidebar = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const [tab, setTab] = useState("");

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get("tab");
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);

  const  handleSignOut = async() => {
    try{
      const res = await fetch('/api/user/signout', {
        method: 'POST'
      });
      const data = await res.json();
      if(!res.ok){
        toast.error(`${data.message}`)
        return;
      }
      else{
        toast.success('Signed Out Successfully!!')
        dispatch(signOutSucces());
      }
    } catch(error){
      console.log(error.message);
    }
  }

  return (
    <Sidebar className="w-full md:w-56">
      <Sidebar.Items>
        <Sidebar.ItemGroup>
          <Link to="/dashboard?tab=profile">
            <Sidebar.Item
              active={tab === "profile"}
              icon={HiUser}
              label={"user"}
              labelColor="dark"
              as = 'div'
            >
              Profile
            </Sidebar.Item>
          </Link>
          <Sidebar.Item icon={HiArrowSmRight} className="cursor-pointer" onClick = {handleSignOut}>
            Sign Out
          </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
};

export default DashSidebar;
