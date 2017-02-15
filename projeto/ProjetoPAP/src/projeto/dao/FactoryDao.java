package projeto.dao;

import projeto.entity.Cidade;
import projeto.entity.Competencia;
import projeto.entity.Curso;
import projeto.entity.Disciplina;
import projeto.entity.Estado;
import projeto.entity.InstituicaoEnsino;
import projeto.entity.Projeto;
import projeto.entity.TipoUsuario;
import projeto.entity.Usuario;

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
	
	//CompetenciaDao
	public static InterfaceDao<Competencia> createCompetenciaDao() {
		return new CompetenciaDao();
	}
	
	//DisciplinaDao
	public static InterfaceDao<Disciplina> createDisciplinaDao() {
		return new DisciplinaDao();
	}
	
	//CursoDao
	public static InterfaceDao<Curso> createCursoDao() {
		return new CursoDao();
	}
	
	//TipoUsuarioDao
	public static InterfaceDao<TipoUsuario> createTipoUsuarioDao() {
		return new TipoUsuarioDao();
	}
	
	//UsuarioDao
	public static InterfaceDao<Usuario> createUsuarioDao() {
		return new UsuarioDao();
	}
}
