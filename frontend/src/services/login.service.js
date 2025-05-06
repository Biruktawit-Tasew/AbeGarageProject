const logIn = async (formData) => {
  try {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    };

    console.log("Request payload:", requestOptions.body);

    const response = await fetch(
      `${api_url}/api/employee/login`,
      requestOptions
    );

    // Check if response is OK (status 200-299)
    if (!response.ok) {
      const errorData = await response.text(); // Try to read response as text
      throw new Error(
        `Server responded with status ${response.status}: ${errorData}`
      );
    }

    return await response.json(); // Parse JSON here instead of in component
  } catch (error) {
    console.error("Login failed:", error);
    throw error; // Re-throw to let component handle it
  }
};

const loginService = {
  logIn,
  logOut,
};
// Export the functions
export default loginService;