import { createContext, useContext, useEffect, useState } from "react";
import { getCurrentUser } from "../services/auth.service";
import { getStreams } from "../admin/services/adminStreams.service";
import { getPlaces } from "../admin/services/adminPlaces.service";
import { getInstitute } from "../admin/services/AdminInstitute.service";
import { getNews } from "../admin/services/adminNews.service";
import { useLocation } from "react-router-dom";

const StudyContext = createContext();

export const StudyProvider = ({ children }) => {
  const [isEnquiryPopup, setIsEnquiryPopup] = useState(false);
  const [isOther, setIsOther] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const token = localStorage.getItem("token");
  const franchisetoken = localStorage.getItem("franchisetoken");
  const [streams, setStreams] = useState([]);
  const [places, setPlaces] = useState([]);
  const [universities, setUniversities] = useState({ data: [], loading: true });
  const [iti, setIti] = useState({ data: [], loading: true });
  const [collages, setCollages] = useState({ data: [], loading: true });
  const [news, setNews] = useState({ data: [], loading: true });
  const { pathname } = useLocation();

  const getUser = async () => {
    if (token || franchisetoken) {
      await getCurrentUser(token || franchisetoken)
        .then((response) => {
          if (response?.data?.status) {
            console.log(response?.data?.data);
            setCurrentUser(response?.data?.data);
          } else {
            handleLogOut();
          }
        })
        .catch((err) => {
          console.log(err);
          handleLogOut();
        });
    }
  };

  const getStateStreams = async () => {
    await getStreams()
      .then((response) => {
        if (response?.data?.status) {
          setStreams(response?.data?.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getStatePlaces = async () => {
    await getPlaces()
      .then((response) => {
        if (response?.data?.status) {
          setPlaces(response?.data?.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getInstitutes = async (role) => {
    await getInstitute(1, { role })
      .then((res) => {
        console.log(res);
        if (res?.data?.status) {
          if (role === "University") {
            setUniversities({ data: res?.data?.data, loading: false });
          } else if (role === "ITI") {
            setIti({ data: res?.data?.data, loading: false });
          } else if (role === "Collage") {
            setCollages({ data: res?.data?.data, loading: false });
          }
        } else {
          if (role === "University") {
            setUniversities({ data: [], loading: false });
          } else if (role === "ITI") {
            setIti({ data: [], loading: false });
          } else if (role === "Collage") {
            setCollages({ data: [], loading: false });
          }
        }
      })
      .catch((err) => {
        console.log(`Error in fetching for ${role} : ${err?.message}`);
        if (role === "University") {
          setUniversities({ data: [], loading: false });
        } else if (role === "ITI") {
          setIti({ data: [], loading: false });
        } else if (role === "Collage") {
          setCollages({ data: [], loading: false });
        }
      });
  };

  const getAllNews = async () => {
    await getNews(1, {})
      .then((res) => {
        console.log(res);
        if (res?.data?.status) {
          setNews({ data: res?.data?.data, loading: false });
        } else {
          setNews({ data: [], loading: false });
        }
      })
      .catch((err) => {
        console.log(`Error in fetching news: ${err?.message}`);
        setNews({ data: [], loading: false });
      });
  };

  const handleLogOut = () => {
    setCurrentUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("franchisetoken");
  };

  useEffect(() => {
    getUser();
    getStatePlaces();
    getStateStreams();
  }, []);

  useEffect(() => {
    if (pathname) {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  }, [pathname]);

  return (
    <StudyContext.Provider
      value={{
        handleLogOut,
        isEnquiryPopup,
        setIsEnquiryPopup,
        currentUser,
        setCurrentUser,
        streams,
        places,
        getInstitutes,
        universities,
        iti,
        collages,
        getAllNews,
        news,
        isOther,
        setIsOther,
      }}
    >
      {children}
    </StudyContext.Provider>
  );
};

export const useStudy = () => useContext(StudyContext);
