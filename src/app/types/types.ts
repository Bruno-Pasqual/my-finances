export type NavlinkType = {
	label: string;
	icon: React.ReactElement;
	navigateTo: string;
};

export type InformacoesLogin = {
	email: string;
	senha: string;
};

export type InformacoesCadastro = {
	nome: string;
	email: string;
	senha: string[];
};

export type User = {
	id: number;
	nome: string;
	email: string;
	senha: string;
};

export type OperationResponse = {
	success: boolean;
	msg: string;
};

export type LoginResponse = {
	success: boolean;
	msg: string;
	session: any;
};

export type Transaction = {
	id: number;
	valor: number;
	descricao: string;
	titulo: string;
	userId: number;
	tipo: string;
};

export type infoTransaction = {
	valor: number;
	descricao: string;
	titulo: string;
	userId: number;
	tipo: string;
};
