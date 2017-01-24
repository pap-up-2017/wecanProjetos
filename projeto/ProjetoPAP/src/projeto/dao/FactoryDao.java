package projeto.dao;

import projeto.entity.Estado;
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
}
