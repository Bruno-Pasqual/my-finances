"use client";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { ReactNode } from "react";

export const theme = createTheme({
	palette: {
		background: {
			default: "#050C21",
			paper: "#1f1f1f",
		},
		primary: {
			main: "#10AC79",
		},
		action: {
			hover: "#060606",
		},
	},
});
