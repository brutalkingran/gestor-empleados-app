import axios from 'axios';
import { createContext, useState, useEffect, useContext } from 'react';
import { toast } from 'react-toastify';

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
      const { data } = await axios(`${BASE_URL}/perfil`);

      setProfiles(data);

    } catch (error) {
      console.error("Error fetching profiles: ", error);
      toast.warn("Error fetching profiles");
    } finally {
      setLoading(false);
    }
  }

  // POST
  const addProfile = async ( profileData ) => {
    setLoading(true);

    try {
      const { data } = await axios.post(`${BASE_URL}/perfil`, profileData);

      setProfiles((prev) => [...prev, data]);

    } catch (error) {
      console.error("Error adding profiles: ", error);
      toast.warn("Error adding profile");
    } finally {
      setLoading(false);
      toast.info("Perfil añadido con éxito");
    }
  }

  // PUT
  const editProfile = async ( id, updatedData ) => {
    setLoading(true);

    try {
      const { data } = await axios.put(`${BASE_URL}/perfil/${id}`, updatedData);

      setProfiles((prev) => prev.map((profile) => profile.id === id ? data : profile));

    } catch (error) {
      console.error("Error editing profiles: ", error);
      toast.warn("Error editing profile");
    } finally {
      setLoading(false);
      toast.info("Perfil editado con éxito");
    }
  }

  // DELETE
  const deleteProfile = async ( id ) => {
    setLoading(true);

    try {
      const { data } = await axios.delete(`${BASE_URL}/perfil/${id}`);

      setProfiles((prev) => prev.filter((profile) => profile !== data));

    } catch (error) {
      console.error("Error deleting profiles: ", error);
      toast.warn("Error deleting profile");
    } finally {
      setLoading(false);
      toast.info("Perfil borrado con éxito");
    }
  }

  useEffect(() => {
    fetchProfiles();
  }, []);

  return (
    <ProfileContext.Provider value={{ profiles, loading, fetchProfiles, addProfile, editProfile, deleteProfile }}>
      {children}
    </ProfileContext.Provider>
  );
};
