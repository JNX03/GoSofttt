// Simulated authentication functions (no real database)

// Check if user is authenticated
export function isAuthenticated(): boolean {
  if (typeof window === "undefined") return false

  const token = localStorage.getItem("ecotrack_auth_token")
  return !!token
}

// Simulate login
export async function simulateLogin(email: string, password: string): Promise<{ success: boolean; error?: string }> {
  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 1000))

  // For demo purposes, accept any email with a valid format and password length >= 6
  if (email && password.length >= 6) {
    // Store a fake token in localStorage
    localStorage.setItem("ecotrack_auth_token", "fake_jwt_token")
    localStorage.setItem(
      "ecotrack_user",
      JSON.stringify({
        name: email.split("@")[0],
        email,
        role: "user",
      }),
    )

    return { success: true }
  }

  return {
    success: false,
    error: "Invalid email or password. Please try again.",
  }
}

// Simulate registration
export async function simulateRegister(
  name: string,
  email: string,
  password: string,
): Promise<{ success: boolean; error?: string }> {
  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 1000))

  // For demo purposes, accept any valid inputs
  if (name && email && password.length >= 6) {
    // Store a fake token in localStorage
    localStorage.setItem("ecotrack_auth_token", "fake_jwt_token")
    localStorage.setItem(
      "ecotrack_user",
      JSON.stringify({
        name,
        email,
        role: "user",
      }),
    )

    return { success: true }
  }

  return {
    success: false,
    error: "Registration failed. Please check your information and try again.",
  }
}

// Logout
export function logout(): void {
  if (typeof window === "undefined") return

  localStorage.removeItem("ecotrack_auth_token")
  localStorage.removeItem("ecotrack_user")
}

// Get current user
export function getCurrentUser(): { name: string; email: string; role: string } | null {
  if (typeof window === "undefined") return null

  const userJson = localStorage.getItem("ecotrack_user")
  if (!userJson) return null

  try {
    return JSON.parse(userJson)
  } catch (error) {
    return null
  }
}
