import React from "react";
import { Search } from "@mui/icons-material";
import {
	Card,
	CardContent,
	IconButton,
	Skeleton,
	Stack,
	TextField,
	Typography,
} from "@mui/material";
import { useGetMovieDetails } from "./api/hooks/movies";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { SearchMovieInputs } from "./types/Inputs.types";

function App() {
	const [search, setSearch] = React.useState<string>("Fight Club");
	const { data: movieDetails, isLoading } = useGetMovieDetails(search);
	const { control, handleSubmit, watch } = useForm<SearchMovieInputs>();

	const onSubmit: SubmitHandler<SearchMovieInputs> = (data) => {
		setSearch(data.title);
	};

	return (
		<Stack alignItems="center" justifyContent="center" spacing={2}>
			<Stack direction="row" alignItems="center" spacing={2}>
				<form onSubmit={handleSubmit(onSubmit)}>
					<Controller
						name="title"
						control={control}
						render={({ field }) => (
							<TextField
								variant="standard"
								placeholder="Put there your movie title"
								{...field}
							/>
						)}
					/>
				</form>
				<IconButton
					disabled={!watch("title")}
					type="submit"
					onClick={handleSubmit(onSubmit)}
				>
					<Search
						sx={{ color: !watch("title") ? "#C6BFB5" : "primary.main" }}
					/>
				</IconButton>
			</Stack>
			{isLoading ? (
				<Skeleton height={300} width={300} />
			) : (
				<>
					{movieDetails && (
						<Stack spacing={1}>
							<Card
								sx={{
									maxWidth: 300,
									margin: "auto",
									borderRadius: 4,
									backgroundColor: "secondary.main",
									border: "3px solid #A5D2A6",
								}}
							>
								<CardContent>
									<Typography variant="h4">
										{movieDetails.title} ({movieDetails.year})
									</Typography>
									<Typography variant="subtitle1">
										{movieDetails.plot}
									</Typography>
								</CardContent>
							</Card>
							<img
								src={movieDetails.poster}
								style={{
									maxWidth: 300,
									borderRadius: "16px",
									border: "3px solid #A5D2A6",
								}}
							/>
						</Stack>
					)}
				</>
			)}
		</Stack>
	);
}

export default App;
