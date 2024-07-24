type NavlinkType = {
	label: string;
	icon: React.ReactElement;
	navigateTo: string;
};

type InformacoesLogin = {
	email: string;
	senha: string;
};

type InformacoesCadastro = {
	nome: string;
	email: string;
	senha: string[];
};

type User = {
	id: number;
	nome: string;
	email: string;
	senha: string;
};

type OperationResponse = {
	success: boolean;
	msg: string;
};

type LoginResponse = {
	success: boolean;
	msg: string;
	session: any;
};
