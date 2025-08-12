import { createContext, useState, useEffect, useContext } from 'react';

const BASE_URL = import.meta.env.VITE_BASE_URL

const ProfileContext = createContext();

export const useProfileContext = () => useContext(ProfileContext)

export const ProfileProvider = ({ children }) => {
  const [ profiles, setProfiles ] = useState([]);
  const [ loading, setLoading ] = useState(false);

  // GET profiles
  const fetchProfiles = async () => {
    setLoading(true);

    try {
      const { data } = await axios(`${BASE_URL}/perfil`)

      setProfiles(data);

    } catch (error) {
      console.error("Error fetching profiles: ", error);
    } finally {
      setLoading(false);
    }
  }

  // POST

  // PUT

  // DELETE

  useEffect(() => {
    fetchProfiles();
  }, []);

  return (
    <ProfileContext.Provider value={{ profiles, loading, fetchProfiles }}>
      {children}
    </ProfileContext.Provider>
  );
};
