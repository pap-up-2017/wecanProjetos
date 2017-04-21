package projeto.dao;

import java.util.List;

import projeto.entity.Tarefa;


// interface para padronizar a forma que os daos serão criados.
public interface InterfaceDao<T> {
	public void salvar(T t);
	public List<T> listar();
	public T getObjById(int id);
	public void alterar(T t);
	public void excluir(T t);
}
