package projeto.dao;

import projeto.entity.Cidade;
import projeto.entity.Competencia;
import projeto.entity.Estado;
import projeto.entity.InstituicaoEnsino;
import projeto.entity.Projeto;

public class FactoryDao {
	
	//EstadoDao
	public static InterfaceDao<Estado> createEstadoDao(){
		return new EstadoDao();
	}	
	
	//ProjetoDao
	public static InterfaceDao<Projeto> createProjetoDao(){
		return new ProjetoDao();
	}	
	
	//CidadeDao
	public static InterfaceDao<Cidade> createCidadeDao(){
		return new CidadeDao();
	}	
	
	//InstituicaoEnsinoDao
	public static InterfaceDao<InstituicaoEnsino> createInstituicaoEnsinoDao(){
		return new InstituicaoEnsinoDao();
	}

	public static InterfaceDao<Competencia> createCompetenciaDao() {
		// TODO Auto-generated method stub
		return new CompetenciaDao();
	}
}
