export const validateRegister = (FormData) => {
  const errors = {};
  const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;

  if (FormData.email && !emailRegex.test(FormData.email)) {
    errors.email = "Ingresa un email válido";
  }

  return errors;
};

export const validateLogin = (FormData) => {
  const errors = {};

  if (!FormData.username) {
    errors.username = "El campo es obligatorio";
  }

  return errors;
};

export const isWeekDay = (dataString) => {
  const date = new Date(dataString);
  const dayOfWeek = date.getDay()
  return dayOfWeek !== 6 && dayOfWeek !== 5
}

export const isValidTime = (timeString) => {
  const [hours, minutes] = timeString.split(":").map(Number);
  if(hours < 8 || hours > 17 || (hours === 17 && minutes > 0) ) {
    return false
  }
  return true
}