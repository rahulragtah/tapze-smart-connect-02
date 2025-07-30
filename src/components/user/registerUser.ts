// register.ts

type RegisterUserInput = {
  _token: string;
  first_name: string;
  last_name: string;
  email: string;
  contact: string;
  region_code: string;
  password: string;
  password_confirmation: string;
  term_policy_check: 'on' | 'off' | string;
};

export const registerUser = async (user: RegisterUserInput) => {
  const formData = new URLSearchParams();

  for (const [key, value] of Object.entries(user)) {
    formData.append(key, value);
  }

  try {
    const response = await fetch('https://dashboard.tapze.in/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: formData.toString(),
      credentials: 'include', // optional, if cookies/session needed
    });

    const responseText = await response.text();
    console.log('Server response:', responseText);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return responseText;
  } catch (error) {
    console.error('Error during registration:', error);
    throw error;
  }
};
