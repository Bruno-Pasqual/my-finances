import React from "react";
import { CircularProgress } from "@mui/material";

export default function Spinner() {
	return (
		<CircularProgress
			size={200}
			className="absolute left-2/4 top-1/2 transform -translate-x-1/2 -translate-y-1/2"
		/>
	);
}
