const fullName = document.querySelector("#name");
const email = document.querySelector("#email");
const button = document.querySelector("#submitButton");
const form = document.querySelector("#cs-form");
const GOOGLE_FORM_URL =
  "https://docs.google.com/forms/u/0/d/e/1FAIpQLSe2fvSvUvcl5C7TsO6AR2zc_hHB3HL-TowTHIKPBnzSzZn8qw/formResponse";

const handleSubmit = async (event) => {
  event.preventDefault();
  const nameValue = fullName.value;
  const emailValue = email.value;
  const formData = {
    "entry.578580099": nameValue,
    "entry.708670711": emailValue,
  };
  const appendedFormData = newFormData({ ...formData });

  try {
    button.disabled = true;
    button.textContent = "processing...";
    const response = await fetch(GOOGLE_FORM_URL, {
      method: "POST",
      mode: "no-cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: appendedFormData,
    });
    alert("Information successfully submitted! Thank you for your donation!");
  } catch (error) {
    alert("Something went wrong, please try again later.");
    console.log(error);
  } finally {
    button.disabled = false;
    button.textContent = "Submit";
    fullName.value = "";
    email.value = "";
  }
};

form.addEventListener("submit", handleSubmit);

const newFormData = (inputs) => {
  const formData = new FormData();
  const newArr = Object.entries(inputs);
  newArr.map((item) => {
    return formData.append(`${item[0]}`, item[1]);
  });
  return formData;
};