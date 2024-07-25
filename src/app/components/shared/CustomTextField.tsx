import styled from "@emotion/styled";
import { TextField } from "@mui/material";

export const CustomTextField = styled(TextField)({
	"& label": {
		color: "#b3b3b3",
	},
	"& label.Mui-focused": {
		color: "#ffffff",
	},
	"& .MuiOutlinedInput-root": {
		"& fieldset": {
			borderColor: "#b3b3b3",
		},
		"&:hover fieldset": {
			borderColor: "#ffffff",
		},
		"&.Mui-focused fieldset": {
			borderColor: "#ffffff",
		},
		color: "#ffffff",
	},
});
