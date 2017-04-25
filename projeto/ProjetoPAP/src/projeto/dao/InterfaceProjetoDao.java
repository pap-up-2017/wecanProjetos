package projeto.dao;

import java.util.List;

import projeto.entity.Projeto;
import projeto.entity.Usuario;


// interface para padronizar a forma que os daos serão criados.
public interface InterfaceProjetoDao<T> {
	public int salvar(T t);
	public List<T> listar();
	public T getObjById(int id);
	public void alterar(T t);
	public void excluir(T t);
	public List<T> listarMeusProjetos(String id);
	
}
