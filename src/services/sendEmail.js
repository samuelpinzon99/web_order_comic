export const send = async (mailData) => { 
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(mailData),
  };
  fetch("https://us-central1-admin-novoos.cloudfunctions.net/app/api/sendEmail", requestOptions)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
    })
    .catch((err) => {
      console.log(err.message);
    });
};