import { createContext, useContext, useEffect, useState } from "react";
import { getCurrentUser } from "../services/auth.service";
import { getStreams } from "../admin/services/adminStreams.service";
import { getPlaces } from "../admin/services/adminPlaces.service";

const StudyContext = createContext();

export const StudyProvider = ({ children }) => {
  const [isEnquiryPopup, setIsEnquiryPopup] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const token = localStorage.getItem("token");
  const [streams, setStreams] = useState([]);
  const [places, setPlaces] = useState([]);

  const getUser = async () => {
    if (token) {
      await getCurrentUser()
        .then((response) => {
          if (response?.data?.status) {
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

  const handleLogOut = () => {
    setCurrentUser(null);
    localStorage.removeItem("token");
    window.location.reload();
  };

  useEffect(() => {
    getUser();
    getStatePlaces();
    getStateStreams();
  }, []);

  return (
    <StudyContext.Provider
      value={{
        isEnquiryPopup,
        setIsEnquiryPopup,
        currentUser,
        setCurrentUser,
        streams,
        places,
      }}
    >
      {children}
    </StudyContext.Provider>
  );
};

export const useStudy = () => useContext(StudyContext);
