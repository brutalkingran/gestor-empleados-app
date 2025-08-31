export const calculateAge = (birthDateString) => {
  // Parse the birth date string into a Date object
  // Assuming birthDateString is in 'YYYY-MM-DD' format for simplicity
  const birthDate = new Date(birthDateString);

  // Get the current date
  const today = new Date();

  // Calculate the initial age by subtracting birth year from current year
  let age = today.getFullYear() - birthDate.getFullYear();

  // Adjust age if the birthday has not yet occurred this year
  const monthDifference = today.getMonth() - birthDate.getMonth();
  const dayDifference = today.getDate() - birthDate.getDate();

  // If the current month is before the birth month, or
  // if the current month is the same as the birth month but the current day is before the birth day
  if (monthDifference < 0 || (monthDifference === 0 && dayDifference < 0)) {
    age--;
  }

  return age;
}