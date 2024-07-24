"use client";

import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import FormCadastro from "./FormCadastro";
import FormLogin from "./FormLogin";

interface TabPanelProps {
	children?: React.ReactNode;
	index: number;
	value: number;
}

function CustomTabPanel(props: TabPanelProps) {
	const { children, value, index, ...other } = props;

	return (
		<div
			role="tabpanel"
			hidden={value !== index}
			id={`simple-tabpanel-${index}`}
			aria-labelledby={`simple-tab-${index}`}
			{...other}
		>
			{value === index && <Box sx={{ p: 3 }}>{children}</Box>}
		</div>
	);
}

function a11yProps(index: number) {
	return {
		id: `simple-tab-${index}`,
		"aria-controls": `simple-tabpanel-${index}`,
	};
}

export default function CadastroLogin() {
	const [value, setValue] = React.useState(0);

	const handleChange = (event: React.SyntheticEvent, newValue: number) => {
		setValue(newValue);
	};

	return (
		<Box sx={{}}>
			<CustomTabPanel value={value} index={0}>
				<FormLogin />
			</CustomTabPanel>

			<CustomTabPanel value={value} index={1}>
				<FormCadastro setValue={setValue} />
			</CustomTabPanel>

			<Tabs
				className="flex items-center justify-center w-fit mx-auto"
				value={value}
				onChange={handleChange}
				aria-label="basic tabs example"
			>
				<Tab label="Login" className=" " {...a11yProps(0)} />
				<Tab label="Cadastro" className="" {...a11yProps(1)} />
			</Tabs>
		</Box>
	);
}
