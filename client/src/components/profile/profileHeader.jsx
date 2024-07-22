import React, { useEffect, useState } from "react"
import { useSelector } from "react-redux";
import defaultImg from '../../assets/images/imageDefault.png'


const profileHeader = () => {
  const profile = useSelector((state) => state.profile);
  
  const { userProfile, userImage } = profile.profile || {};
  
  const {firstname, lastname, middleInitial} = userProfile || {};
  const [profileHeaderData, setProfileHeaderData] = useState({
    firstname: '',
    lastname: '',
    middleInitial: '',
    srcImage: defaultImg
  });
  const srcImage = profileHeaderData.srcImage || defaultImg;
  useEffect(() => {
    if(profile){
      setProfileHeaderData({
        firstname: firstname || '',
        lastname: lastname || '',
        middleInitial: middleInitial || '',
      })
    }

  }, [profile])

  return (
    <div id="profile-header" className="w-full flex flex-row">
       <div className="w-[120px] h-[110px] flex justify-center items-center overflow-hidden rounded-full border-4 border-white shadow-lg bg-green-300">
        <img src={srcImage} alt="profilePic" className="w-full h-full object-cover" />
      </div>
      <div className="w-full pl-4">
        <h1 className="text-xl font-bold">{profileHeaderData.lastname}, {profileHeaderData.firstname} {profileHeaderData.middleInitial}.</h1>
      </div>
    </div>
  );
};

export default profileHeader;
