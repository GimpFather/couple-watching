import { useState } from "react";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { EyeIcon, EyeSlashIcon } from "@phosphor-icons/react";
import NBButton from "~/components/NeoBrutalism/NBButton";
import NBTextField from "~/components/NeoBrutalism/NBTextField";
import { useAuth } from "~/context/auth/useAuth";
import showToast from "~/components/Toasts/showToast";
import messages from "~/locales/en.json";
import { playSound } from "~/hooks/useSound";

type AuthFormProps = {
	type: "register" | "login";
};

const AuthForm = ({ type }: AuthFormProps) => {
	const { login, signUp } = useAuth();

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [showPassword, setShowPassword] = useState(false);

	const isRegister = type === "register";
	const buttonText = isRegister
		? messages["AUTH.REGISTER.FORM.BUTTON.CREATE_ACCOUNT"]
		: messages["AUTH.LOGIN.FORM.BUTTON.LOG_IN"];
	const emailLabel = isRegister
		? messages["AUTH.REGISTER.FORM.EMAIL.LABEL"]
		: messages["AUTH.LOGIN.FORM.EMAIL.LABEL"];
	const passwordLabel = isRegister
		? messages["AUTH.REGISTER.FORM.PASSWORD.LABEL"]
		: messages["AUTH.LOGIN.FORM.PASSWORD.LABEL"];
	const emailPlaceholder = isRegister
		? messages["AUTH.REGISTER.FORM.EMAIL.PLACEHOLDER"]
		: messages["AUTH.LOGIN.FORM.EMAIL.PLACEHOLDER"];
	const passwordPlaceholder = isRegister
		? messages["AUTH.REGISTER.FORM.PASSWORD.PLACEHOLDER"]
		: messages["AUTH.LOGIN.FORM.PASSWORD.PLACEHOLDER"];

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		if (!email || !password) {
			showToast({
				title: "🤔 Buddy please.",
				description:
					"Have you ever thought about the importance of filling in all the fields?",
				color: "danger",
				sound: "MEME_ALERT_WHAT",
			});
			return;
		}
		if (isRegister) {
			await signUp(email, password);
		} else {
			await login(email, password);
		}
	};

	const handleShowPassword = () => {
		setShowPassword(!showPassword);
		playSound("NOTIFICATION_BUBBLE_POP");
	};

	return (
		<Stack gap="20px" component="form" onSubmit={handleSubmit}>
			<Stack gap="12px">
				<Stack>
					<Typography variant="bodyMedium">{emailLabel}</Typography>
					<NBTextField
						placeholder={emailPlaceholder}
						type="email"
						value={email}
						onChange={(event) => setEmail(event.target.value)}
					/>
				</Stack>
				<Stack>
					<Typography variant="bodyMedium">{passwordLabel}</Typography>
					<NBTextField
						placeholder={passwordPlaceholder}
						type={showPassword ? "text" : "password"}
						value={password}
						onChange={(event) => setPassword(event.target.value)}
						adornment={{
							position: "end",
							icon: !showPassword ? (
								<EyeIcon
									onClick={() => handleShowPassword()}
									cursor="pointer"
									size={20}
								/>
							) : (
								<EyeSlashIcon
									onClick={() => handleShowPassword()}
									cursor="pointer"
									size={20}
								/>
							),
						}}
					/>
				</Stack>
			</Stack>
			<NBButton type="submit">{buttonText}</NBButton>
		</Stack>
	);
};

export default AuthForm;
