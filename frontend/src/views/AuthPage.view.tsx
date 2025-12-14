import { useState } from "react";
import { useAuth } from "../context/AuthContext";

const AuthPage = () => {
  const { login, signUp } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (
    event: React.FormEvent<HTMLFormElement>,
    email: string,
    password: string
  ) => {
    event.preventDefault();
    await login(email, password);
  };

  const handleSignUp = async (
    event: React.FormEvent<HTMLFormElement>,
    email: string,
    password: string
  ) => {
    event.preventDefault();
    await signUp(email, password);
  };

  return (
    <div
      style={{
        padding: 20,
      }}
    >
      <div>
        <h3>First time here?</h3>
        <form
          onSubmit={(event) => handleSignUp(event, email, password)}
          style={{ display: "flex", flexDirection: "column", gap: 10 }}
        >
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
          <button type="submit">Sign in</button>
        </form>
      </div>
      <hr style={{ margin: "20px 0" }} />
      <div>
        <h3>Already have an account?</h3>
        <form
          onSubmit={(event) => handleLogin(event, email, password)}
          style={{ display: "flex", flexDirection: "column", gap: 10 }}
        >
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
          <button type="submit">Sign in</button>
        </form>
      </div>
    </div>
  );
};
export default AuthPage;
